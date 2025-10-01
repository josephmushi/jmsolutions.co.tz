import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plus, Minus, FileText, User, Phone, Hash } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LOGO_URL_PROFORMA = "https://storage.googleapis.com/hostinger-horizons-assets-prod/ca2aaa45-7d53-480b-8775-3b2d1e94564d/ab11aa3a68340f873746b07770fb857d.jpg";

const ProformaInvoicePage = ({ allProducts, companyName, logoUrl }) => {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerTin, setCustomerTin] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalWithVat, setTotalWithVat] = useState(0);

  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const handleQuantityChange = (productId, amount) => {
    setSelectedItems(prevItems => {
      const currentQuantity = prevItems[productId]?.quantity || 0;
      const newQuantity = Math.max(0, currentQuantity + amount);
      const product = allProducts.find(p => p.id === productId);
      if (!product) return prevItems;

      if (newQuantity === 0) {
        const { [productId]: _, ...rest } = prevItems;
        return rest;
      }

      return {
        ...prevItems,
        [productId]: {
          ...product,
          quantity: newQuantity,
          totalPrice: newQuantity * parsePrice(product.price)
        }
      };
    });
  };

  useEffect(() => {
    let currentGrandTotal = 0;
    Object.values(selectedItems).forEach(item => {
      currentGrandTotal += item.totalPrice;
    });
    setGrandTotal(currentGrandTotal);
    const currentVatAmount = currentGrandTotal * 0.18;
    setVatAmount(currentVatAmount);
    setTotalWithVat(currentGrandTotal + currentVatAmount);
  }, [selectedItems]);

  const generateProformaInvoice = () => {
    if (Object.keys(selectedItems).length === 0) {
      toast({ title: "No Items Selected", description: "Please select at least one item.", variant: "destructive" });
      return;
    }
    if (!customerName || !customerPhone) {
      toast({ title: "Customer Details Required", description: "Please enter customer name and phone number.", variant: "destructive" });
      return;
    }

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 80); 
    doc.text("PROFORMA INVOICE", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0,0,0);
    doc.text(`${companyName}`, 14, 30);
    doc.setFontSize(10);
    doc.text("P. O. Box 34529, Kinondoni, Dar es Salaam", 14, 35);
    doc.text("P. O. Box 259, Kizota, Igunga, Tabora", 14, 40);
    doc.text("Phone: +255 767 583 682 / +255 716 992 161 / +255 754 557 744", 14, 45);
    doc.text("Email: info@jmsolutions.co.tz", 14, 50);
    
    const today = new Date();
    doc.text(`Date: ${today.toLocaleDateString('en-GB')}`, 190, 30, null, null, "right");
    doc.text(`Proforma No: PI-${Date.now().toString().slice(-6)}`, 190, 35, null, null, "right");

    doc.setFontSize(12);
    doc.text("Bill To:", 14, 65);
    doc.setFontSize(10);
    doc.text(`Customer Name: ${customerName}`, 14, 70);
    doc.text(`Phone Number: ${customerPhone}`, 14, 75);
    if (customerTin) {
      doc.text(`TIN Number: ${customerTin}`, 14, 80);
    }

    const tableColumn = ["#", "Item Description", "Qty", "Unit Price (TSh)", "Total Price (TSh)"];
    const tableRows = [];

    Object.values(selectedItems).forEach((item, index) => {
      const itemData = [
        index + 1,
        item.name,
        item.quantity,
        parsePrice(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: customerTin ? 85 : 80,
      theme: 'grid',
      headStyles: { fillColor: [40, 40, 80] },
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 15, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 35, halign: 'right' },
      }
    });

    let finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(10);
    doc.text("Subtotal:", 140, finalY + 10, null, null, "right");
    doc.text(grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 190, finalY + 10, null, null, "right");
    doc.text("VAT (18%):", 140, finalY + 15, null, null, "right");
    doc.text(vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 190, finalY + 15, null, null, "right");
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Grand Total (TSh):", 140, finalY + 22, null, null, "right");
    doc.text(totalWithVat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 190, finalY + 22, null, null, "right");
    doc.setFont(undefined, 'normal');

    doc.setFontSize(10);
    doc.text("Terms & Conditions:", 14, finalY + 35);
    doc.text("1. Prices are subject to change without prior notice.", 14, finalY + 40);
    doc.text("2. This proforma invoice is valid for 7 days from the date of issue.", 14, finalY + 45);
    doc.text("3. Payment terms: 50% advance, 50% on delivery/completion.", 14, finalY + 50);

    doc.text("Thank you for your business!", 105, finalY + 65, null, null, "center");
    
    doc.save(`Proforma_Invoice_${customerName.replace(/\s/g, '_')}_${Date.now()}.pdf`);
    toast({ title: "Proforma Invoice Generated!", description: "PDF has been downloaded." });
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-custom">
      <Navbar companyName={companyName} logoUrl={LOGO_URL_PROFORMA} />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center text-primary">Generate Proforma Invoice</h1>
          <p className="text-xl text-foreground text-center mb-12 max-w-3xl mx-auto">
            Select products, specify quantities, and enter your details to generate a proforma invoice.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Select Products</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {allProducts.map(product => (
                  <motion.div 
                    key={product.id} 
                    className="p-4 border border-border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 bg-background/50 hover:shadow-md transition-shadow"
                    layout
                  >
                    <div className="flex-grow">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <p className="text-sm font-medium text-primary">{product.price}</p>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(product.id, -1)} disabled={!selectedItems[product.id] || selectedItems[product.id].quantity === 0}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={selectedItems[product.id]?.quantity || 0}
                        readOnly
                        className="w-16 p-2 text-center rounded-lg bg-background border-border focus:ring-2 focus:ring-primary outline-none transition-colors"
                      />
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(product.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 bg-card p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Customer Details</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="customerName" type="text" placeholder="Enter your full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                   <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="customerPhone" type="tel" placeholder="+255 XXX XXXXXX" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div>
                  <label htmlFor="customerTin" className="block text-sm font-medium text-foreground mb-1">TIN Number (Optional)</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="customerTin" type="text" placeholder="Enter your TIN number" value={customerTin} onChange={(e) => setCustomerTin(e.target.value)} className="pl-10" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-primary">Summary</h2>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium text-foreground">TSh {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (18%):</span>
                  <span className="font-medium text-foreground">TSh {vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Grand Total:</span>
                  <span>TSh {totalWithVat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Button onClick={generateProformaInvoice} size="lg" className="w-full pulse-glow">
                <FileText className="mr-2 h-5 w-5" /> Generate & Download PDF
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer companyName={companyName} logoUrl={LOGO_URL_PROFORMA} />
    </div>
  );
};

export default ProformaInvoicePage;
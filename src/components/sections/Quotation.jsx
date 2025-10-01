import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Minus, Printer, FileText, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getMockData } from '@/lib/mockData';
import Breadcrumb from '@/components/Breadcrumb';

const Quotation = () => {
    const { toast } = useToast();
    const [items, setItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const { products, services } = getMockData();
    const quoteRef = useRef(null);

    const addItem = (item) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (itemId) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prevItems.filter(i => i.id !== itemId);
        });
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const advancePayment = total * 0.5;

    const handlePrint = () => {
        if (!customerName.trim()) {
            toast({
                variant: 'destructive',
                title: "Customer Name Required",
                description: "Please enter the customer's name before generating the PDF.",
            });
            return;
        }

        const input = quoteRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const width = pdfWidth;
            const height = width / ratio;

            let position = 0;
            if (height > pdfHeight) {
              pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            } else {
              pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            }

            pdf.save(`Quotation-JMSolutions-${customerName.trim()}.pdf`);
        });
    };

    return (
        <section className="min-h-screen pt-8 pb-16">
            <div className="container mx-auto px-4">
                <Breadcrumb />
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-shadow">
                        Generate Your <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Quotation</span>
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Select the products and services you are interested in to create an instant price quotation.
                    </p>
                </motion.div>
                
                <div className="glass-effect rounded-2xl p-4 sm:p-6 mb-8">
                     <div className="flex items-center gap-2 p-3 mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
                        <AlertTriangle className="h-6 w-6" />
                        <p className="font-semibold">This quotation generator uses sample data. For a real quote, please contact us. The database is not yet connected.</p>
                     </div>
                </div>


                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Item Selection */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <div className="glass-effect rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Products</h2>
                            <div className="space-y-3 mb-6">
                                {products.map(p => (
                                    <div key={p.id} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{p.name}</p>
                                        </div>
                                        <Button size="sm" onClick={() => addItem(p)}>Add <Plus className="w-4 h-4 ml-2"/></Button>
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Services</h2>
                            <div className="space-y-3">
                                {services.map(s => (
                                    <div key={s.id} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{s.name}</p>
                                        </div>
                                        <Button size="sm" onClick={() => addItem(s)}>Add <Plus className="w-4 h-4 ml-2"/></Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quotation Preview */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <div className="glass-effect rounded-2xl p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><FileText className="mr-2"/>Your Quotation</h2>
                             <div className="mb-4">
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    id="customerName"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Enter customer's name"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            
                            <div ref={quoteRef} className="p-6 bg-white rounded-lg shadow-inner">
                                <div className="flex justify-between items-center border-b pb-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <img src="https://horizons-cdn.hostinger.com/7cae5046-15e2-41d9-a00a-2e6dad7000c2/c6773bc95688112dbd5cd64f5eef61e1.jpg" alt="Logo" className="h-10"/>
                                        <h3 className="font-bold text-xl text-gray-800">JMSolutions</h3>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-bold text-xl text-gray-800">Quotation</h3>
                                        <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                  <p className="font-semibold">To: {customerName || '____________________'}</p>
                                </div>

                                <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
                                    {items.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">Your selected items will appear here.</p>
                                    ) : (
                                        items.map(item => (
                                            <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-50">
                                                <div className="flex-grow">
                                                  <p className="font-medium">{item.name}</p>
                                                  <p className="text-xs text-gray-500">x {item.quantity}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700"><Minus className="w-4 h-4"/></button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {items.length > 0 && (
                                    <>
                                        <div className="border-t pt-4 mt-4">
                                            <div className="flex justify-end items-center bg-yellow-100 p-2 rounded-lg">
                                                <p className="w-32 text-right font-semibold text-yellow-800">Total (Est.):</p>
                                                <p className="w-24 text-right font-bold text-lg text-yellow-800">Contact Us</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 border-t pt-4 text-xs text-gray-600">
                                            <p className="font-bold">Payment Information:</p>
                                            <p>An advance payment may be required. Details will be provided upon final confirmation.</p>
                                            <p className="font-bold text-base text-center my-2 text-blue-700">Lipa Namba: 65896354</p>
                                        </div>
                                    </>
                                )}
                                <div className="text-center text-xs text-gray-400 mt-6">
                                    <p>JMSolutions - P.O. Box 1234, Dar es Salaam, Tanzania</p>
                                    <p>Thank you for your business!</p>
                                </div>
                            </div>

                            <Button onClick={handlePrint} className="w-full mt-6 bg-blue-600 hover:bg-blue-700" disabled={items.length === 0}>
                                <Printer className="mr-2 h-4 w-4" /> Print to PDF
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Quotation;
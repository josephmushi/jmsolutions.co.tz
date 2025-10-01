import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  ShoppingCart,
  Minus,
  Plus,
  Phone as PhoneIcon,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LOGO_URL_INQUIRY =
  "https://storage.googleapis.com/hostinger-horizons-assets-prod/ca2aaa45-7d53-480b-8775-3b2d1e94564d/ab11aa3a68340f873746b07770fb857d.jpg";
const MPESA_LIPA_NUMBER = "6759 1036"; // Replace with actual M-Pesa Lipa Number

const ProductInquiryPage = ({ products }) => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const decodedProductName = decodeURIComponent(productName);
    const selectedProduct = products.find((p) => p.name === decodedProductName);
    if (selectedProduct) {
      setProduct(selectedProduct);
      const priceValue = parseFloat(
        selectedProduct.price.replace(/[^0-9.-]+/g, "")
      );
      setTotalPrice(priceValue * quantity);
    } else {
      toast({
        title: "Product Not Found",
        description: "The product you are looking for does not exist.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [productName, products, quantity, toast, navigate]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(1, prevQuantity + amount);
      if (product) {
        const priceValue = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        setTotalPrice(priceValue * newQuantity);
      }
      return newQuantity;
    });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number so we can reach you.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inquiry Submitted!",
      description: `Thank you for your interest in ${
        product.name
      }. We will contact you shortly at ${phoneNumber} to finalize your order of ${quantity} item(s) for TSh ${totalPrice.toLocaleString()}.`,
    });

    console.log({
      productName: product.name,
      quantity,
      totalPrice,
      phoneNumber,
      paymentMethod: "M-Pesa (Advance)",
    });

    navigate("/");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar companyName="JMSolutions" logoUrl={LOGO_URL_INQUIRY} />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-md"
                alt={product.name}
                src="https://images.unsplash.com/photo-1631367771698-606007aecd52"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-primary">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              <p className="text-2xl font-semibold mb-6 text-primary">
                {`TSh ${numericPrice.toLocaleString()}`}
                <span className="text-sm text-muted-foreground"> / unit</span>
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium mb-1"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      readOnly
                      className="w-16 p-2 text-center rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-colors"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Phone Number (for M-Pesa & Contact)
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+255 XXX XXXXXX"
                      className="w-full p-3 pl-10 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Advance Payment via M-Pesa
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Lipa Namba:{" "}
                    <strong className="text-foreground">
                      {MPESA_LIPA_NUMBER}
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Account Name:{" "}
                    <strong className="text-foreground">
                      JM Branding and Packaging Solutions
                    </strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Please make an advance payment to confirm your order. We
                    will call you to verify.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">{`TSh ${totalPrice.toLocaleString()}`}</span>
                  </div>
                  <Button type="submit" size="lg" className="w-full pulse-glow">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Place Inquiry &
                    Confirm Payment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer companyName="JMSolutions" logoUrl={LOGO_URL_INQUIRY} />
    </div>
  );
};

export default ProductInquiryPage;

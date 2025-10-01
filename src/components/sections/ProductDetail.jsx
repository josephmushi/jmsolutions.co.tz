import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, CheckCircle, Star, ShoppingCart, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';
import Breadcrumb from '@/components/Breadcrumb';
import { supabase } from '@/lib/customSupabaseClient';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [product, setProduct] = useState(null);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const { data: productData, error: productError } = await supabase
                .from('products')
                .select('*')
                .eq('product_id', productId)
                .single();

            if (productError || !productData) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Product not found.',
                });
                navigate('/products');
                return;
            }

            setProduct(productData);

            const { data: featuresData, error: featuresError } = await supabase
                .from('product_features')
                .select('*')
                .eq('product_id', productData.id);

            if (featuresError) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching features',
                    description: featuresError.message,
                });
            } else {
                setFeatures(featuresData);
            }
            
            setLoading(false);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId, navigate, toast]);

    const handleAddToCart = () => {
        toast({
            title: 'Added to Cart! (Just Kidding!)',
            description: "🛒 This feature isn't implemented yet, but you can request it next! 🚀",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                 <Helmet>
                    <title>Product Not Found - JMSolutions</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-500 mb-4">Product Not Found</h1>
                <p className="text-lg text-gray-700 mb-8">The product you are looking for does not exist.</p>
                <Button onClick={() => navigate('/products')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Button>
            </div>
        );
    }
    
    return (
        <>
            <Helmet>
                <title>{product.name} - JMSolutions Products</title>
                <meta name="description" content={product.description} />
            </Helmet>
            <section className="min-h-screen pt-8 pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    
                    <Breadcrumb detailName={product.name} />

                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="p-4 bg-white/50 rounded-2xl shadow-2xl backdrop-blur-md">
                                <img class="w-[400px] h-auto object-cover rounded-xl" alt={product.name} src="https://images.unsplash.com/photo-1698368995651-ff7e3ebc468b" />
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{product.category}</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-shadow my-4">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-gray-600">({product.rating} / 5.0)</span>
                            </div>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {product.description}
                            </p>
                            
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {features.map((feature, index) => (
                                        <motion.li 
                                            key={index}
                                            className="flex items-start gap-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        >
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700">{feature.feature_text}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="glass-effect rounded-2xl p-6 mt-8">
                                <div className="flex justify-end items-center mb-4">
                                    <span className="text-green-600 font-semibold">In Stock</span>
                                </div>
                                <div className="flex gap-4">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover-lift" onClick={handleAddToCart}>
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                    <Link to="/quotation" className="w-full">
                                        <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Get a Quote
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetail;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumb = ({ detailName }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbItems = [
        { name: 'Home', path: '/' },
    ];
    
    const pageTitles = {
        'services': 'Services',
        'products': 'Products',
        'about': 'About',
        'vacancies': 'Vacancies',
        'contact': 'Contact',
        'login-register': 'Login / Register',
        'quotation': 'Quotation'
    };

    pathnames.forEach((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        if (pageTitles[value]) {
            breadcrumbItems.push({ name: pageTitles[value], path: to });
        }
    });

    if (detailName && pathnames.length > 1) {
        breadcrumbItems.push({ name: detailName, path: location.pathname });
    }
    
    return (
        <nav className="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {breadcrumbItems.map((item, index) => (
                    <li key={item.name} className="inline-flex items-center">
                        {index > 0 && (
                            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {index === breadcrumbItems.length - 1 ? (
                                <span className="font-semibold text-gray-700">{item.name}</span>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="hover:text-blue-600 hover:underline transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </motion.div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Briefcase, MapPin, Building, Clock, User, Mail, Phone, Upload, Send, RefreshCw, FileText, Award, File, X } from 'lucide-react';

const Vacancies = () => {
    const { toast } = useToast();
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const formRef = useRef(null);

    const initialFormState = {
        fullName: '',
        email: '',
        phone: '',
        position: '',
        cv: null,
        certificates: [],
        awards: null,
        otherDocs: null,
    };
    const [formData, setFormData] = useState(initialFormState);
    const [fileNames, setFileNames] = useState({ cv: '', certificates: [], awards: '', otherDocs: '' });

    useEffect(() => {
        const fetchVacancies = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('vacancies')
                .select('*')
                .order('posted_at', { ascending: false });

            if (error) {
                toast({ variant: 'destructive', title: 'Error fetching vacancies', description: error.message });
            } else {
                setVacancies(data);
            }
            setLoading(false);
        };
        fetchVacancies();
    }, [toast]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            if (name === 'certificates') {
                setFormData(prev => ({ ...prev, certificates: [...prev.certificates, ...files] }));
                setFileNames(prev => ({ ...prev, certificates: [...prev.certificates, ...Array.from(files).map(f => f.name)] }));
            } else {
                setFormData(prev => ({ ...prev, [name]: files[0] }));
                setFileNames(prev => ({ ...prev, [name]: files[0].name }));
            }
        }
    };
    
    const removeCertificate = (index) => {
        setFormData(prev => ({ ...prev, certificates: prev.certificates.filter((_, i) => i !== index)}));
        setFileNames(prev => ({ ...prev, certificates: prev.certificates.filter((_, i) => i !== index)}));
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setFileNames({ cv: '', certificates: [], awards: '', otherDocs: '' });
        if(formRef.current) {
            formRef.current.reset();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        // In a real app, you would handle file uploads to Supabase Storage here.
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSubmitting(false);
        toast({
            title: "Application Submitted!",
            description: "Thank you for applying. We will review your application and get back to you soon.",
        });
        handleReset();
    };

    return (
        <section className="min-h-screen pt-8 pb-16">
            <div className="container mx-auto px-4">
                <Breadcrumb />
                <motion.div
                    className="mb-12 text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-shadow">
                        Join Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
                    </h1>
                </motion.div>

                <div className="flex flex-col gap-12">
                    {/* Vacancies List */}
                    <motion.div
                        className="glass-effect rounded-2xl p-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Open Positions</h2>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b-2 border-gray-300">
                                        <tr>
                                            <th className="p-3 text-sm font-semibold text-gray-700"><Briefcase className="inline-block mr-2" size={16}/>Position</th>
                                            <th className="p-3 text-sm font-semibold text-gray-700"><Building className="inline-block mr-2" size={16}/>Department</th>
                                            <th className="p-3 text-sm font-semibold text-gray-700"><MapPin className="inline-block mr-2" size={16}/>Location</th>
                                            <th className="p-3 text-sm font-semibold text-gray-700"><Clock className="inline-block mr-2" size={16}/>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vacancies.map((job, index) => (
                                            <motion.tr 
                                                key={job.id} 
                                                className="border-b border-gray-200 hover:bg-white/20"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                            >
                                                <td className="p-3 font-medium text-gray-800">{job.title}</td>
                                                <td className="p-3 text-gray-600">{job.department}</td>
                                                <td className="p-3 text-gray-600">{job.location}</td>
                                                <td className="p-3"><span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{job.type}</span></td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                    
                    {/* Application Form */}
                    <motion.div
                        className="glass-effect rounded-2xl p-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Apply Now</h2>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} value={formData.fullName} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} value={formData.email} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} value={formData.phone} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                </div>
                            </div>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select name="position" onChange={handleInputChange} value={formData.position} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none">
                                    <option value="" disabled>Select a position</option>
                                    {vacancies.map(job => <option key={job.id} value={job.title}>{job.title}</option>)}
                                </select>
                            </div>
                            
                            <p className="text-sm font-semibold text-gray-600 pt-2">Upload Documents (PDF only)</p>

                            <div className="relative border border-gray-300 rounded-lg p-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <Upload className="w-5 h-5 text-gray-500"/>
                                    <span className="text-gray-700">{fileNames.cv || "Upload CV"}</span>
                                    <input type="file" name="cv" accept=".pdf" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                             <div className="relative border border-gray-300 rounded-lg p-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <FileText className="w-5 h-5 text-gray-500"/>
                                    <span className="text-gray-700">Upload Education Certificates</span>
                                    <input type="file" name="certificates" accept=".pdf" onChange={handleFileChange} multiple className="hidden" />
                                </label>
                            </div>
                            {fileNames.certificates.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {fileNames.certificates.map((name, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md text-sm">
                                            <span className="truncate">{name}</span>
                                            <button type="button" onClick={() => removeCertificate(index)} className="text-red-500 hover:text-red-700">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                             <div className="relative border border-gray-300 rounded-lg p-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <Award className="w-5 h-5 text-gray-500"/>
                                    <span className="text-gray-700">{fileNames.awards || "Attach Awards"}</span>
                                    <input type="file" name="awards" accept=".pdf" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                            <div className="relative border border-gray-300 rounded-lg p-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <File className="w-5 h-5 text-gray-500"/>
                                    <span className="text-gray-700">{fileNames.otherDocs || "Attach Other Docs"}</span>
                                    <input type="file" name="otherDocs" accept=".pdf" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover-lift">
                                    {submitting ? <Loader2 className="animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Submit Application</>}
                                </Button>
                                <Button type="button" variant="outline" onClick={handleReset} className="w-full border-gray-400 py-3 text-lg font-semibold rounded-lg">
                                    <RefreshCw className="w-5 h-5 mr-2" /> Reset
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Vacancies;
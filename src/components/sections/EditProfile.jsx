import React, { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, User, Phone, MapPin, Globe, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EditProfile = () => {
    const { user, profile, fetchProfile } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fname: profile?.fname || '',
        mname: profile?.mname || '',
        lname: profile?.lname || '',
        phone: profile?.phone || '',
        region: profile?.region || '',
        district: profile?.district || '',
        zipcode: profile?.zipcode || '',
        country: profile?.country || '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview] = useState(profile?.image_url || null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.gif'] },
        multiple: false,
    });


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = profile?.image_url;

        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile);

            if (uploadError) {
                toast({ variant: 'destructive', title: 'Upload failed', description: uploadError.message });
                setLoading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
            imageUrl = publicUrl;
        }

        const { error } = await supabase
            .from('JMUsers')
            .update({ ...formData, image_url: imageUrl })
            .eq('id', user.id);

        if (error) {
            toast({ variant: 'destructive', title: 'Update failed', description: error.message });
        } else {
            toast({ title: 'Success!', description: 'Your profile has been updated.' });
            await fetchProfile(user);
        }
        setLoading(false);
    };

    return (
        <section className="min-h-screen pt-8 pb-16">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-3xl mx-auto glass-effect rounded-2xl p-8 md:p-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Edit Your Profile</h1>

                    <div className="flex flex-col items-center mb-8 space-y-4">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                            <AvatarImage src={preview} alt={profile?.fname} />
                            <AvatarFallback className="text-4xl">
                                {profile?.fname?.[0]}{profile?.lname?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div {...getRootProps()} className="w-full max-w-sm p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors">
                            <input {...getInputProps()} />
                            <Upload className="mx-auto text-gray-400 w-8 h-8 mb-2" />
                            {isDragActive ?
                                <p>Drop the image here ...</p> :
                                <p>Drag 'n' drop a new photo here, or click to select</p>
                            }
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="mname" placeholder="Middle Name" value={formData.mname} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="region" placeholder="Region" value={formData.region} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover-lift" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default EditProfile;
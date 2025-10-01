import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, CheckCircle, HardDrive, Users, Wifi, Zap, Loader2, Shield, Eye, EyeOff, User, Lock, ShieldQuestion } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClientVisibilityManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clients').select('id, name, viewstatus');
    if (error) {
      toast({ variant: 'destructive', title: 'Error fetching clients', description: error.message });
    } else {
      setClients(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const toggleViewStatus = async (client) => {
    const newStatus = !client.viewstatus;
    const { error } = await supabase.from('clients').update({ viewstatus: newStatus }).eq('id', client.id);
    if (error) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } else {
      toast({ title: 'Success', description: `${client.name}'s visibility updated.` });
      setClients(clients.map(c => c.id === client.id ? { ...c, viewstatus: newStatus } : c));
    }
  };

  if (loading) {
    return <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />;
  }

  return (
    <div className="space-y-4">
      {clients.map(client => (
        <div key={client.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
          <Label htmlFor={`switch-${client.id}`} className="flex-grow text-gray-700 font-medium">{client.name}</Label>
          <div className="flex items-center gap-2">
            {client.viewstatus ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-red-500" />}
            <Switch
              id={`switch-${client.id}`}
              checked={client.viewstatus}
              onCheckedChange={() => toggleViewStatus(client)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const UserDash = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [dashboardFeatures, setDashboardFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userRole = profile?.role || 'guest';
  const availableRoles = ['guest', 'client', 'staff', 'admin', 'superuser'];

  useEffect(() => {
    const fetchDashboardFeatures = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('userdash')
        .select('*')
        .order('title', { ascending: true });

      if (error) {
        toast({ variant: 'destructive', title: 'Error fetching dashboard features', description: error.message });
        setDashboardFeatures([]);
      } else {
        setDashboardFeatures(data);
      }
      setLoading(false);
    };

    if (!authLoading) {
      fetchDashboardFeatures();
    }
  }, [authLoading, toast]);

  const handleFeatureClick = (feature) => {
    const pageMap = {
      'Edit Profile': '/edit-profile',
      'SME CRM': '/sme-crm',
      'Change Password': '/change-password',
      'Role Change': '/role-change',
    };

    if (pageMap[feature.title]) {
      navigate(pageMap[feature.title]);
      return;
    }
    
    if (feature.title === 'User Management' && userRole !== 'superuser') {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to manage users.',
      });
      return;
    }
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000,
    });
  };

  const handleRoleChangeRequest = (newRole) => {
    if (newRole !== userRole) {
      navigate('/role-change', { state: { requestedRole: newRole } });
    }
  };

  const getIcon = (iconName, colors) => {
    const iconClasses = `w-10 h-10 ${colors.text}`;
    const icons = {
      BarChart: <BarChart className={iconClasses} />,
      CheckCircle: <CheckCircle className={iconClasses} />,
      Zap: <Zap className={iconClasses} />,
      Wifi: <Wifi className={iconClasses} />,
      Users: <Users className={iconClasses} />,
      HardDrive: <HardDrive className={iconClasses} />,
      Shield: <Shield className={iconClasses} />,
      User: <User className={iconClasses} />,
      Lock: <Lock className={iconClasses} />,
      ShieldQuestion: <ShieldQuestion className={iconClasses} />,
    };
    return icons[iconName] || <Zap className={iconClasses} />;
  };

  const featureColors = [
    { bg: 'from-blue-400 to-blue-600', text: 'text-white' },
    { bg: 'from-green-400 to-green-600', text: 'text-white' },
    { bg: 'from-purple-400 to-purple-600', text: 'text-white' },
    { bg: 'from-yellow-400 to-yellow-600', text: 'text-white' },
    { bg: 'from-red-400 to-red-600', text: 'text-white' },
    { bg: 'from-indigo-400 to-indigo-600', text: 'text-white' },
    { bg: 'from-pink-400 to-pink-600', text: 'text-white' },
    { bg: 'from-cyan-400 to-cyan-600', text: 'text-white' },
  ];

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {profile?.fname} {profile?.lname}!
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Access Level:</span>
            <Select onValueChange={handleRoleChangeRequest} defaultValue={userRole}>
              <SelectTrigger className="w-[180px] capitalize">
                <SelectValue placeholder="Change Role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map(role => (
                  <SelectItem key={role} value={role} className="capitalize">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {dashboardFeatures.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardFeatures.map((feature, index) => {
              const colors = featureColors[index % featureColors.length];
              return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex"
              >
                <Card className={`hover-lift h-full w-full flex flex-col bg-gradient-to-br ${colors.bg} text-white shadow-lg`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    {getIcon(feature.icon, { text: 'text-white/70' })}
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-white/90 mb-4 flex-grow">{feature.description}</p>
                    {feature.title === 'Client Project Visibility' && userRole === 'superuser' ? (
                       <ClientVisibilityManager />
                    ) : (
                      <Button onClick={() => handleFeatureClick(feature)} variant="secondary" className="w-full mt-auto">
                        Manage
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center glass-effect rounded-2xl p-12"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No Features Available</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              There are currently no dashboard features available. Please check back later or contact an administrator.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UserDash;
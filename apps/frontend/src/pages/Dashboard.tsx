import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { useProfile, useEquipmentList, useCreateRequest } from '../hooks/useQueries';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user } = useAuth();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: equipmentData, isLoading: equipmentLoading, isError } = useEquipmentList();
  const createRequestMutation = useCreateRequest();

  const [requestNotes, setRequestNotes] = React.useState<Record<string, string>>({});

  if (profileLoading || equipmentLoading) {
    return (
      <div className="space-y-6 pb-20 px-8">
        <Skeleton className="h-20 w-3/4 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center pt-20">
        <GlassCard className="max-w-md text-center p-8 border-red-500/20">
          <h2 className="text-2xl font-light text-red-400 mb-4">Connection Error</h2>
          <p className="text-champagne/60 font-light text-sm">Failed to load equipment list. Please try again later.</p>
        </GlassCard>
      </div>
    );
  }

  const profile = profileData?.data?.profile || {};
  const equipment = equipmentData?.data?.equipment || [];

  const handleRequest = async (equipmentId: string) => {
    try {
      await createRequestMutation.mutateAsync({
        equipmentId,
        notes: requestNotes[equipmentId] || '',
      });
      alert('Request submitted successfully!');
      setRequestNotes(prev => ({ ...prev, [equipmentId]: '' }));
    } catch (err: any) {
      alert(err.message || 'Failed to submit request.');
    }
  };

  return (
    <div className="space-y-16 pb-24 px-4 md:px-8">
      <header className="mb-16 mt-8">
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-gradient">
          Welcome, {profile.name || user?.name || 'User'}.
        </h1>
        <p className="text-champagne/40 mt-4 font-light tracking-[0.2em] uppercase text-xs md:text-sm">
          School Equipment Lending Portal
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="text-xs font-light tracking-[0.3em] uppercase text-bronze">Available Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.length > 0 ? (
            equipment.map((item: any, index: number) => (
              <GlassCard key={item.id} delay={index * 0.1} className="flex flex-col justify-between p-8 border-bronze/5">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-light tracking-widest uppercase text-gold/60">{item.category}</span>
                    <span className={`text-[10px] font-light tracking-widest uppercase px-2 py-0.5 rounded-full ${item.isAvailable ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {item.isAvailable ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-champagne tracking-tight">{item.name}</h3>
                  <p className="text-sm text-champagne/40 font-light leading-relaxed">{item.description || 'No description provided.'}</p>
                  <p className="text-xs text-champagne/30 font-light">Condition: {item.condition}</p>
                </div>

                <div className="mt-8 space-y-4">
                  <input 
                    type="text"
                    placeholder="Add notes (optional)..."
                    value={requestNotes[item.id] || ''}
                    onChange={(e) => setRequestNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                    className="w-full bg-charcoal/30 border border-bronze/10 rounded-lg px-3 py-2 text-xs text-champagne placeholder:text-champagne/20 focus:outline-none focus:border-gold/30"
                  />
                  <Button 
                    className="w-full tracking-widest text-[10px] uppercase" 
                    size="sm"
                    disabled={!item.isAvailable || createRequestMutation.isPending}
                    onClick={() => handleRequest(item.id)}
                  >
                    {createRequestMutation.isPending ? 'Processing...' : 'Request Item'}
                  </Button>
                </div>
              </GlassCard>
            ))
          ) : (
            <p className="text-champagne/40 italic font-light col-span-full">No equipment found in the inventory.</p>
          )}
        </div>
      </section>
    </div>
  );
}

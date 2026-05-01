import { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useResources, useBookings, useCreateBooking } from '../../hooks/useQueries';
import { Skeleton } from '../../components/ui/Skeleton';

export function Bookings() {
  const { data: resourcesData } = useResources();
  const { data: bookingsData, isLoading: bookingsLoading } = useBookings();
  const createBooking = useCreateBooking();

  const [selectedResource, setSelectedResource] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedResource || !startTime || !endTime) {
      setError('Please fill in all fields.');
      return;
    }

    createBooking.mutate(
      { resourceId: selectedResource, startTime, endTime },
      {
        onSuccess: () => {
          setSelectedResource('');
          setStartTime('');
          setEndTime('');
        },
        onError: (err: any) => {
          setError(err.message || 'Failed to book resource. It might be overlapping.');
        }
      }
    );
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Resource Booking</h1>
        <p className="text-foreground/60 mt-2">Reserve study rooms and equipment securely.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard delay={0.1}>
            <h2 className="text-xl font-semibold mb-4">New Booking</h2>
            <form onSubmit={handleBook} className="space-y-4">
              {error && <p className="text-red-400 text-sm bg-red-400/10 p-2 rounded">{error}</p>}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Resource</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 text-white"
                  value={selectedResource}
                  onChange={(e) => setSelectedResource(e.target.value)}
                >
                  <option value="" className="bg-background">Choose...</option>
                  {resourcesData?.data?.resources?.map((r: any) => (
                    <option key={r.id} value={r.id} className="bg-background">{r.name} ({r.type})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <input 
                  type="datetime-local" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <input 
                  type="datetime-local" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 text-white"
                />
              </div>

              <Button type="submit" className="w-full" disabled={createBooking.isPending}>
                {createBooking.isPending ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </GlassCard>
        </div>

        <div className="lg:col-span-2">
          <GlassCard delay={0.2} className="h-full min-h-[400px]">
            <h2 className="text-xl font-semibold mb-4">Your Schedule</h2>
            {bookingsLoading ? (
              <div className="space-y-4"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div>
            ) : (
              <div className="space-y-4">
                {bookingsData?.data?.bookings?.map((b: any) => (
                  <div key={b.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">{b.resource?.name || 'Resource'}</p>
                      <p className="text-sm text-foreground/60">
                        {new Date(b.startTime).toLocaleString()} - {new Date(b.endTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-cyan/20 text-accent-cyan">
                      {b.status}
                    </span>
                  </div>
                ))}
                {bookingsData?.data?.bookings?.length === 0 && (
                  <p className="text-foreground/60 italic">You have no upcoming bookings.</p>
                )}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

import { GlassCard } from '../../components/ui/GlassCard';
import { useRequests } from '../../hooks/useQueries';
import { Skeleton } from '../../components/ui/Skeleton';

export function Requests() {
  const { data: requestsData, isLoading: requestsLoading, isError } = useRequests();

  if (requestsLoading) {
    return (
      <div className="space-y-6 pb-20 px-8">
        <Skeleton className="h-20 w-3/4 mb-12" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center pt-20">
        <GlassCard className="max-w-md text-center p-8 border-red-500/20">
          <h2 className="text-2xl font-light text-red-400 mb-4">Error</h2>
          <p className="text-champagne/60 font-light text-sm">Failed to load your requests. Please try again later.</p>
        </GlassCard>
      </div>
    );
  }

  const requests = requestsData?.data?.requests || [];

  return (
    <div className="space-y-16 pb-24 px-4 md:px-8">
      <header className="mb-16 mt-8">
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-gradient">Your Requests</h1>
        <p className="text-champagne/40 mt-4 font-light tracking-[0.2em] uppercase text-xs md:text-sm">Track your equipment lending history.</p>
      </header>

      <section className="space-y-8">
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((req: any, index: number) => (
              <GlassCard key={req.id} delay={index * 0.05} className="p-6 border-bronze/5 flex justify-between items-center group hover:bg-white/5 transition-all">
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-xl bg-charcoal/50 flex items-center justify-center border border-bronze/10 text-gold group-hover:border-gold/30 transition-colors">
                    ⬡
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-champagne tracking-tight">{req.equipment?.name}</h3>
                    <p className="text-xs text-champagne/30 font-light mt-1">Requested on {new Date(req.requestDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-light tracking-widest uppercase ${
                    req.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' :
                    req.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400' :
                    req.status === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {req.status}
                  </span>
                  {req.notes && <p className="text-[10px] text-champagne/20 font-light italic max-w-[200px] text-right truncate">"{req.notes}"</p>}
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-bronze/10 rounded-3xl">
              <p className="text-champagne/40 italic font-light">No requests found. Start by exploring the inventory.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

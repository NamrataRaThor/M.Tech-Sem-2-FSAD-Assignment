import { GlassCard } from '../components/ui/GlassCard';
import { Skeleton } from '../components/ui/Skeleton';
import { useProfile, useFeed, useBookings } from '../hooks/useQueries';

export function Dashboard() {
  const { data: profileData, isLoading: profileLoading, isError: profileError } = useProfile();
  const { data: feedData, isLoading: feedLoading, isError: feedError } = useFeed();
  const { data: bookingsData, isLoading: bookingsLoading, isError: bookingsError } = useBookings();

  if (profileLoading || feedLoading || bookingsLoading) {
    return (
      <div className="space-y-6 pb-20">
        <header className="mb-8 space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (profileError || feedError || bookingsError) {
    return (
      <div className="flex-1 flex items-center justify-center pt-20">
        <GlassCard className="max-w-md text-center p-8 border-red-500/20">
          <h2 className="text-2xl font-light text-red-400 mb-4">Connection Lost</h2>
          <p className="text-champagne/60 font-light text-sm">We couldn't connect to the StudySync servers. Please refresh the dream.</p>
          <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
            Reconnect
          </button>
        </GlassCard>
      </div>
    );
  }

  const profile = profileData?.data?.profile || {};
  const feed = feedData?.data || [];
  const bookings = bookingsData?.data?.bookings || [];
  const nextBooking = bookings.length > 0 ? bookings[0] : null;

  return (
    <div className="space-y-10 pb-20">
      <header className="mb-12">
        <h1 className="text-5xl font-extralight tracking-tight text-gradient">Good evening, {profile.userId || 'Student'}.</h1>
        <p className="text-champagne/40 mt-3 font-light tracking-widest uppercase text-xs">Architecting your study flow.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GlassCard delay={0.1} className="col-span-1 md:col-span-2 lg:col-span-2 h-72 border-bronze/10 flex flex-col justify-between p-10">
          <div>
            <h2 className="text-xs font-light tracking-[0.3em] uppercase text-bronze mb-8">Upcoming Session</h2>
            {nextBooking ? (
              <div className="space-y-4">
                <p className="text-4xl md:text-5xl font-extralight tracking-tight text-champagne">
                  {nextBooking.resource?.name || nextBooking.resourceId}
                </p>
                <p className="text-champagne/40 font-light tracking-wide">
                  {new Date(nextBooking.startTime).toLocaleString()} — {new Date(nextBooking.endTime).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-champagne/40 italic font-light">No upcoming sessions. Define your path.</p>
            )}
          </div>
        </GlassCard>
        
        <GlassCard delay={0.2} className="h-72 overflow-y-auto p-10">
          <h2 className="text-xs font-light tracking-[0.3em] uppercase text-gold mb-8">Activity Feed</h2>
          {feed.length > 0 ? (
            <ul className="space-y-6">
              {feed.slice(0, 5).map((activity: any) => (
                <li key={activity.id} className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                  <div>
                    <p className="text-sm font-light text-champagne/80">{activity.action}</p>
                    <p className="text-[10px] font-light tracking-widest uppercase text-champagne/30 mt-1">{new Date(activity.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-champagne/40 italic text-sm font-light">The silence of progress.</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

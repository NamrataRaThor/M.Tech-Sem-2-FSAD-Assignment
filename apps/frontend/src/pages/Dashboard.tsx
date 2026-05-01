import { GlassCard } from '../components/ui/GlassCard';
import { Skeleton } from '../components/ui/Skeleton';
import { useProfile, useFeed, useBookings } from '../hooks/useQueries';

export function Dashboard() {
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: feedData, isLoading: feedLoading } = useFeed();
  const { data: bookingsData, isLoading: bookingsLoading } = useBookings();

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

  const profile = profileData?.data?.profile || {};
  const feed = feedData?.data || [];
  const bookings = bookingsData?.data?.bookings || [];
  const nextBooking = bookings.length > 0 ? bookings[0] : null;

  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Good evening, {profile.userId || 'Student'}.</h1>
        <p className="text-foreground/60 mt-2">Here is your study overview.</p>
        {profile.bio && <p className="text-sm text-foreground/40 mt-1">Bio: {profile.bio}</p>}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard delay={0.1} className="col-span-1 md:col-span-2 lg:col-span-2 h-64 border-accent-cyan/20 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Session</h2>
            {nextBooking ? (
              <div className="space-y-2">
                <p className="text-3xl font-light">Resource: {nextBooking.resource?.name || nextBooking.resourceId}</p>
                <p className="text-foreground/60">
                  {new Date(nextBooking.startTime).toLocaleString()} - {new Date(nextBooking.endTime).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-foreground/60 italic">No upcoming sessions. Book a room to get started!</p>
            )}
          </div>
        </GlassCard>
        
        <GlassCard delay={0.2} className="h-64 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
          {feed.length > 0 ? (
            <ul className="space-y-4">
              {feed.slice(0, 5).map((activity: any) => (
                <li key={activity.id} className="flex items-center gap-3 border-b border-white/5 pb-2">
                  <div className="w-2 h-2 rounded-full bg-accent-purple" />
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-foreground/40">{new Date(activity.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/60 italic text-sm">No recent activity.</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

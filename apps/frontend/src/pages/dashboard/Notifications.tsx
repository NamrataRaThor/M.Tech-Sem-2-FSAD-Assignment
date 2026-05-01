import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useNotifications, useMarkAsRead } from '../../hooks/useQueries';
import { Skeleton } from '../../components/ui/Skeleton';

export function Notifications() {
  const { data, isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();

  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold">Notifications</h1>
          <p className="text-foreground/60 mt-2">Stay updated with your campus activities.</p>
        </div>
      </header>

      <GlassCard delay={0.1} className="min-h-[500px]">
        {isLoading ? (
          <div className="space-y-4"><Skeleton className="h-20" /><Skeleton className="h-20" /></div>
        ) : (
          <div className="space-y-4">
            {data?.data?.notifications?.map((notif: any) => (
              <div key={notif.id} className={`p-4 rounded-xl border flex justify-between items-start transition-colors ${notif.read ? 'bg-white/5 border-white/5 opacity-60' : 'bg-white/10 border-accent-pink/30'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${notif.type === 'ALERT' ? 'text-accent-pink' : 'text-accent-cyan'}`}>
                      {notif.type}
                    </span>
                    <span className="text-xs text-foreground/40">{new Date(notif.createdAt).toLocaleString()}</span>
                  </div>
                  <p>{notif.content}</p>
                </div>
                {!notif.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead.mutate(notif.id)}>
                    Mark Read
                  </Button>
                )}
              </div>
            ))}
            {data?.data?.notifications?.length === 0 && (
              <p className="text-foreground/60 italic text-center py-10">You're all caught up!</p>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

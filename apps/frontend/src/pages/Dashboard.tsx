import { GlassCard } from '../components/ui/GlassCard';

export function Dashboard() {
  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Good evening, Alex.</h1>
        <p className="text-foreground/60 mt-2">Here is your study overview.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard delay={0.1} className="col-span-1 md:col-span-2 lg:col-span-2 h-64 border-accent-cyan/20">
          <h2 className="text-xl font-semibold mb-4">Upcoming Session</h2>
          <div className="space-y-2">
            <p className="text-3xl font-light">Advanced Algorithms</p>
            <p className="text-foreground/60">Today at 8:00 PM • Library Room B</p>
          </div>
        </GlassCard>
        
        <GlassCard delay={0.2} className="h-64">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-pink" />
              <p className="text-sm">Group invite: Physics 101</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-purple" />
              <p className="text-sm">Room booked successfully</p>
            </li>
          </ul>
        </GlassCard>

        <GlassCard delay={0.3} className="h-80">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-foreground/60 italic text-sm">No recent activity.</p>
        </GlassCard>

        <GlassCard delay={0.4} className="h-80 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Study Groups</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="font-medium">Data Structures</p>
              <p className="text-xs text-foreground/50 mt-1">4 members</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="font-medium">Calculus III</p>
              <p className="text-xs text-foreground/50 mt-1">12 members</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

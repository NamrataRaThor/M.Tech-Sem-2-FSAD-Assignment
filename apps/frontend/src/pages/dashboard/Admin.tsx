import { GlassCard } from '../../components/ui/GlassCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const MOCK_SIGNUPS = [
  { month: 'Jan', users: 40 },
  { month: 'Feb', users: 85 },
  { month: 'Mar', users: 130 },
  { month: 'Apr', users: 210 },
  { month: 'May', users: 280 },
];

const MOCK_BOOKINGS = [
  { day: 'Mon', bookings: 12 },
  { day: 'Tue', bookings: 19 },
  { day: 'Wed', bookings: 30 },
  { day: 'Thu', bookings: 22 },
  { day: 'Fri', bookings: 28 },
  { day: 'Sat', bookings: 8 },
  { day: 'Sun', bookings: 5 },
];

const MOCK_BREAKDOWN = [
  { name: 'Study Rooms', value: 58 },
  { name: 'Equipment', value: 25 },
  { name: 'Lounges', value: 17 },
];

const PIE_COLORS = ['#a855f7', '#06b6d4', '#ec4899'];

export function Admin() {
  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
        <p className="text-foreground/60 mt-2">Platform insights at a glance.</p>
      </header>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '2,840', accent: 'from-accent-purple/30' },
          { label: 'Active Groups', value: '342', accent: 'from-accent-cyan/30' },
          { label: 'Bookings Today', value: '78', accent: 'from-accent-pink/30' },
          { label: 'Notifications Sent', value: '1,204', accent: 'from-white/10' },
        ].map((stat) => (
          <GlassCard key={stat.label} delay={0.1} className="h-28 flex flex-col justify-between relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} to-transparent pointer-events-none`} />
            <p className="text-sm text-foreground/60 relative z-10">{stat.label}</p>
            <p className="text-4xl font-bold relative z-10">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.2} className="h-72">
          <h2 className="text-lg font-semibold mb-4">User Signups Over Time</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SIGNUPS}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={3} fill="url(#userGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delay={0.3} className="h-72">
          <h2 className="text-lg font-semibold mb-4">Bookings This Week</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_BOOKINGS}>
                <XAxis dataKey="day" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Bar dataKey="bookings" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Pie + details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard delay={0.4} className="h-72 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4 w-full">Resource Breakdown</h2>
          <PieChart width={160} height={160}>
            <Pie data={MOCK_BREAKDOWN} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" stroke="none">
              {MOCK_BREAKDOWN.map((_, index) => (
                <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="flex gap-4 mt-2">
            {MOCK_BREAKDOWN.map((b, i) => (
              <div key={b.name} className="flex items-center gap-1.5 text-xs text-foreground/60">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                {b.name}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.5} className="lg:col-span-2 h-72">
          <h2 className="text-lg font-semibold mb-4">Platform Health</h2>
          <div className="space-y-4">
            {[
              { label: 'Auth Service', status: 'Healthy', color: 'bg-green-500' },
              { label: 'User Service', status: 'Healthy', color: 'bg-green-500' },
              { label: 'Group Service', status: 'Healthy', color: 'bg-green-500' },
              { label: 'Booking Service', status: 'Healthy', color: 'bg-green-500' },
              { label: 'Notification Service', status: 'Healthy', color: 'bg-green-500' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm">{s.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${s.color} shadow-[0_0_8px_rgba(34,197,94,0.6)]`} />
                  <span className="text-xs text-green-400">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

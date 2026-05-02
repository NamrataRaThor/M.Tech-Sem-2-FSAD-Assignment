import { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { useProfile, useUpdateProfile } from '../../hooks/useQueries';

export function Profile() {
  const { data, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [major, setMajor] = useState('');
  const [saved, setSaved] = useState(false);

  const profile = data?.data?.profile;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(
      { name: name || profile?.name, bio: bio || profile?.bio, major: major || profile?.major },
      { onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); } }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-20">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-foreground/60 mt-2">Manage your academic identity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar / Identity Card */}
        <GlassCard delay={0.1} className="flex flex-col items-center text-center gap-4 py-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-3xl font-bold text-background shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            {(profile?.name || 'S').charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-semibold">{profile?.name || 'Student'}</p>
            <p className="text-sm text-foreground/50">{profile?.major || 'No major set'}</p>
          </div>
          <div className="w-full border-t border-white/10 pt-4">
            <p className="text-sm text-foreground/60 italic">{profile?.bio || 'No bio yet.'}</p>
          </div>
        </GlassCard>

        {/* Edit Form */}
        <GlassCard delay={0.2} className="lg:col-span-2 p-8">
          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <input
                type="text"
                defaultValue={profile?.name || ''}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 text-white placeholder:text-white/30"
                placeholder="How should we call you?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                defaultValue={profile?.bio || ''}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 text-white placeholder:text-white/30 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Major / Department</label>
              <input
                type="text"
                defaultValue={profile?.major || ''}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 text-white placeholder:text-white/30"
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
              {saved && <span className="text-sm text-accent-cyan animate-fade-in">✓ Saved successfully!</span>}
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

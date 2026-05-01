import { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useGroups, useCreateGroup } from '../../hooks/useQueries';
import { Skeleton } from '../../components/ui/Skeleton';

export function Groups() {
  const { data, isLoading } = useGroups();
  const createGroup = useCreateGroup();
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName) return;
    createGroup.mutate({ name: newGroupName, description: 'A new study group.' }, {
      onSuccess: () => setNewGroupName('')
    });
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold">Study Groups</h1>
          <p className="text-foreground/60 mt-2">Manage your collaborative spaces.</p>
        </div>
      </header>

      <GlassCard delay={0.1} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input 
            type="text" 
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 text-white placeholder:text-white/30"
            placeholder="e.g. Advanced Calculus Study"
            disabled={createGroup.isPending}
          />
          <Button type="submit" disabled={createGroup.isPending}>
            {createGroup.isPending ? 'Creating...' : 'Create Group'}
          </Button>
        </form>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </>
        ) : (
          data?.data?.groups?.map((group: any) => (
            <GlassCard key={group.id} delay={0.2} className="h-48 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <p className="text-sm text-foreground/60 mt-1">{group.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-foreground/40">{group.members?.length || 0} Members</span>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </GlassCard>
          ))
        )}
        {data?.data?.groups?.length === 0 && (
          <p className="text-foreground/60 italic col-span-full">You haven't joined any groups yet.</p>
        )}
      </div>
    </div>
  );
}

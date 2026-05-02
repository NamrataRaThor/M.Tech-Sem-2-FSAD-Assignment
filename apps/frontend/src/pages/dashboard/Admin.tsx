import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useEquipmentList, useRequests, useUpdateRequestStatus, useCreateEquipment, useDeleteEquipment } from '../../hooks/useQueries';
import { Skeleton } from '../../components/ui/Skeleton';

export function Admin() {
  const { data: equipmentData, isLoading: equipmentLoading } = useEquipmentList();
  const { data: requestsData, isLoading: requestsLoading } = useRequests();
  const updateStatusMutation = useUpdateRequestStatus();
  const createEquipmentMutation = useCreateEquipment();
  const deleteEquipmentMutation = useDeleteEquipment();

  // Form state for new equipment
  const [newEquip, setNewEquip] = React.useState({ name: '', category: '', condition: 'New', description: '' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEquipmentMutation.mutateAsync(newEquip);
      setNewEquip({ name: '', category: '', condition: 'New', description: '' });
      alert('Equipment added!');
    } catch (err: any) {
      alert(err.message || 'Failed to add equipment.');
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteEquipmentMutation.mutateAsync(id);
    } catch (err: any) {
      alert(err.message || 'Failed to delete item.');
    }
  };

  if (equipmentLoading || requestsLoading) {
    return <div className="p-8 space-y-6"><Skeleton className="h-20 w-full mb-8" /><Skeleton className="h-64 w-full" /><Skeleton className="h-64 w-full" /></div>;
  }

  const equipment = equipmentData?.data?.equipment || [];
  const requests = requestsData?.data?.requests || [];

  return (
    <div className="space-y-16 pb-24 px-4 md:px-8">
      <header className="mb-16 mt-8">
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-gradient">Management</h1>
        <p className="text-champagne/40 mt-4 font-light tracking-[0.2em] uppercase text-xs md:text-sm">Admin & Staff Portal</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Equipment Management */}
        <section className="lg:col-span-2 space-y-8">
          <h2 className="text-xs font-light tracking-[0.3em] uppercase text-bronze">Inventory Control</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {equipment.length > 0 ? (
              equipment.map((item: any) => (
                <GlassCard key={item.id} className="p-6 border-bronze/5 flex justify-between items-center group hover:bg-white/5 transition-all">
                  <div>
                    <h3 className="text-lg font-light text-champagne tracking-tight">{item.name}</h3>
                    <p className="text-[10px] text-champagne/30 font-light uppercase tracking-widest">{item.category} • {item.condition}</p>
                  </div>
                  <button className="text-red-400/40 hover:text-red-400 text-[10px] uppercase tracking-widest transition-colors" onClick={() => handleDelete(item.id)}>Delete</button>
                </GlassCard>
              ))
            ) : (
              <p className="text-champagne/20 italic font-light">Inventory is empty.</p>
            )}
          </div>
        </section>

        {/* Add Equipment Form */}
        <aside className="space-y-8">
          <h2 className="text-xs font-light tracking-[0.3em] uppercase text-gold">Add New Item</h2>
          <GlassCard className="p-8 border-gold/10">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-bronze font-light">Name</label>
                <input 
                  placeholder="Equipment name..." 
                  className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 text-sm text-champagne placeholder:text-champagne/20 focus:outline-none focus:ring-1 focus:ring-gold/30"
                  value={newEquip.name}
                  onChange={e => setNewEquip({...newEquip, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-bronze font-light">Category</label>
                <input 
                  placeholder="Electronics, Sports, etc." 
                  className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 text-sm text-champagne placeholder:text-champagne/20 focus:outline-none focus:ring-1 focus:ring-gold/30"
                  value={newEquip.category}
                  onChange={e => setNewEquip({...newEquip, category: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-bronze font-light">Condition</label>
                <select 
                  className="w-full bg-charcoal/50 border border-bronze/20 rounded-xl px-4 py-3 text-sm text-champagne focus:outline-none appearance-none cursor-pointer"
                  value={newEquip.condition}
                  onChange={e => setNewEquip({...newEquip, condition: e.target.value})}
                >
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Worn">Worn</option>
                  <option value="Broken">Broken</option>
                </select>
              </div>
              <Button type="submit" className="w-full mt-4 tracking-[0.2em] uppercase text-xs" disabled={createEquipmentMutation.isPending}>
                {createEquipmentMutation.isPending ? 'Adding...' : 'Add to Inventory'}
              </Button>
            </form>
          </GlassCard>
        </aside>
      </div>

      {/* Request Management */}
      <section className="space-y-8 mt-16">
        <h2 className="text-xs font-light tracking-[0.3em] uppercase text-bronze">Active Requests</h2>
        <GlassCard className="p-0 overflow-hidden border-bronze/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-8 py-4 text-[10px] font-light tracking-widest uppercase text-champagne/30">User</th>
                  <th className="px-8 py-4 text-[10px] font-light tracking-widest uppercase text-champagne/30">Item</th>
                  <th className="px-8 py-4 text-[10px] font-light tracking-widest uppercase text-champagne/30">Status</th>
                  <th className="px-8 py-4 text-[10px] font-light tracking-widest uppercase text-champagne/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req: any) => (
                    <tr key={req.id} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-sm font-light text-champagne">{req.user?.name}</p>
                        <p className="text-[10px] text-champagne/30 font-light">{req.user?.email}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-light text-champagne">{req.equipment?.name}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-light tracking-widest uppercase ${
                          req.status === 'APPROVED' ? 'text-green-400' :
                          req.status === 'PENDING' ? 'text-yellow-400' :
                          req.status === 'REJECTED' ? 'text-red-400' :
                          'text-blue-400'
                        }`}>{req.status}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-4">
                          {req.status === 'PENDING' && (
                            <>
                              <button onClick={() => handleStatusUpdate(req.id, 'APPROVED')} className="text-[10px] uppercase tracking-widest text-green-400/60 hover:text-green-400 transition-colors">Approve</button>
                              <button onClick={() => handleStatusUpdate(req.id, 'REJECTED')} className="text-[10px] uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors">Reject</button>
                            </>
                          )}
                          {req.status === 'APPROVED' && (
                            <button onClick={() => handleStatusUpdate(req.id, 'RETURNED')} className="text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-colors">Mark Returned</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-champagne/20 italic font-light">No active requests.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

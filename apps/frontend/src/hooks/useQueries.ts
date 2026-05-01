import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

// --- AUTH / PROFILE ---
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/profile'),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.put('/users/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useFeed = () => {
  return useQuery({
    queryKey: ['feed'],
    queryFn: () => api.get('/users/feed'),
  });
};

// --- GROUPS ---
export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: () => api.get('/groups'),
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post('/groups', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

// --- BOOKINGS ---
export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: () => api.get('/bookings/resources'),
  });
};

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => api.get('/bookings'),
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post('/bookings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// --- NOTIFICATIONS ---
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/notifications'),
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

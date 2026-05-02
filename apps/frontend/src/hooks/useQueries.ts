import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

// --- AUTH / PROFILE ---
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/profile'),
    staleTime: 5 * 60 * 1000, // 5 minutes
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

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/auth/login', data),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/auth/signup', data),
  });
};

// --- EQUIPMENT ---
export const useEquipmentList = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: () => api.get('/equipment'),
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post('/equipment', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
    },
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => api.put(`/equipment/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
    },
  });
};

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/equipment/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
    },
  });
};

// --- REQUESTS ---
export const useRequests = () => {
  return useQuery({
    queryKey: ['requests'],
    queryFn: () => api.get('/requests'),
  });
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post('/requests', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => 
      api.patch(`/requests/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
};

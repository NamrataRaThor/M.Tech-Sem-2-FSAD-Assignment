# Performance Recommendations

To ensure StudySync Campus remains highly performant under load, particularly as the "Dream Edition" animations scale, the following architectural and code-level optimizations are recommended:

## 1. Frontend Optimizations

### 1.1 Animation Offloading
- **Current State**: The `AnimatedBackground.tsx` utilizes `framer-motion` to animate large SVG gradients and `div` elements.
- **Recommendation**: Heavy DOM-based animations can cause layout thrashing on lower-end devices. Migrate the ambient auroras to a **WebGL Canvas** using `react-three-fiber` or vanilla JS. Canvas rendering uses the GPU much more efficiently for fluid gradients than CSS/DOM transforms.

### 1.2 Bundle Size Reduction
- **Current State**: The application bundles `framer-motion`, `gsap`, and `recharts` globally.
- **Recommendation**: Implement **Code Splitting**. Use React's `lazy` and `Suspense` to load heavy libraries (like charts on the admin dashboard) only when the specific route is accessed.
  ```tsx
  const AdminCharts = React.lazy(() => import('./components/AdminCharts'));
  ```

### 1.3 Caching Strategy
- **Current State**: `useQueries.ts` relies on React Query's default `staleTime` (usually 0).
- **Recommendation**: Increase `staleTime` for immutable or slow-moving data (like User Profile or Group metadata) to reduce redundant API calls.
  ```typescript
  export const useProfile = () => useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/profile'),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  ```

## 2. Backend / API Optimizations

### 2.1 Database Indexing
- **Current State**: Prisma schemas handle basic relations.
- **Recommendation**: Ensure high-traffic query fields (like `userId` on Bookings, or `status` on Notifications) have explicit `@index` declarations in `schema.prisma` to prevent full table scans.

### 2.2 Rate Limiting
- **Current State**: Implemented on the Auth service.
- **Recommendation**: Extend the `express-rate-limit` middleware to the API Gateway to protect all downstream microservices from DDoS or rapid polling exhaustion.

### 2.3 Response Compression
- **Recommendation**: Ensure `compression` middleware is applied to the API Gateway to gzip JSON payloads before they are sent to the client, significantly reducing network transfer times.

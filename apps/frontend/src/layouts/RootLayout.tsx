import { Outlet } from 'react-router-dom';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Navbar } from '../components/ui/Navbar';

export function RootLayout() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

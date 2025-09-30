import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '@/pages/Home';
import Comparison from '@/pages/Comparison';
import { Users, GitCompare, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

function App() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Global notification component */}
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'bg-card text-card-foreground border border-border',
          duration: 4000,
        }} 
      />

      {/* Header and Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="GitPulse Logo" className="h-6 w-6" />
            <span className="font-bold text-lg">GitPulse</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link 
              to="/" 
              className={cn(
                'transition-colors hover:text-primary',
                isActive('/') ? 'text-primary' : 'text-foreground/60'
              )}
            >
              <Users className="inline-block w-4 h-4 mr-1.5" />
              Dashboard
            </Link>
            <Link 
              to="/comparison" 
              className={cn(
                'transition-colors hover:text-primary',
                isActive('/comparison') ? 'text-primary' : 'text-foreground/60'
              )}
            >
              <GitCompare className="inline-block w-4 h-4 mr-1.5" />
              Compare
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="container max-w-screen-2xl mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparison" element={<Comparison />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
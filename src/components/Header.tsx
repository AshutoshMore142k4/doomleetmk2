import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Sun, Moon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 56 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const displayName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User';

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-primary/10 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="container flex h-14 items-center gap-2 px-4">
        {/* Logo - always visible */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="GrindSDE" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-semibold tracking-tight hidden sm:inline">GrindSDE</span>
        </Link>

        {/* Scrollable nav links */}
        <nav className="flex-1 overflow-x-auto scrollbar-hide min-w-0">
          <div className="flex items-center gap-0.5 sm:gap-1 w-max">
            <Link 
              to="/problems" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              NeetCode
            </Link>
            <Link 
              to="/striver" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              Striver
            </Link>
            <Link 
              to="/templates" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              Templates
            </Link>
            <Link 
              to="/system-design" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              System Design
            </Link>
            <Link 
              to="/mapper" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              Mapper
            </Link>
            <Link 
              to="/compare" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              Compare
            </Link>
            <Link 
              to="/cheatsheet" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              Cheatsheet
            </Link>
            <Link 
              to="/system-design" 
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all whitespace-nowrap"
            >
              System Design
            </Link>
          </div>
        </nav>

        {/* Right-side actions - always visible */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleTheme}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/[0.06] transition-all"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Product Hunt badge - hidden on small screens */}
          <a
            href="https://www.producthunt.com/products/grindsde?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-grindsde"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex shrink-0"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1088652&theme=dark&t=1772481631610"
              alt="GrindSDE - Not your ordinary tech interview prep platform. | Product Hunt"
              width="150"
              height="33"
              className="h-[33px] w-auto"
            />
          </a>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 rounded-lg hover:bg-primary/[0.06] px-2 sm:px-3">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/80 backdrop-blur-2xl border-primary/15">
                <DropdownMenuItem onClick={handleSignOut} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link 
              to="/auth" 
              className="rounded-full bg-foreground text-background px-4 py-1.5 text-xs sm:text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

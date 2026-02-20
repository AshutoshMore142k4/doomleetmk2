import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Code2, Sun, Moon } from 'lucide-react';
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
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">DoomLeet</span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link 
            to="/problems" 
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all"
          >
            NeetCode
          </Link>
          <Link 
            to="/striver" 
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all"
          >
            Striver
          </Link>
          <Link 
            to="/templates" 
            className="hidden sm:inline-block px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all"
          >
            Templates
          </Link>

          <button
            onClick={toggleTheme}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/[0.06] transition-all"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
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
            <Button asChild size="sm" className="rounded-lg shadow-lg shadow-primary/20 px-2 sm:px-3 text-xs sm:text-sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

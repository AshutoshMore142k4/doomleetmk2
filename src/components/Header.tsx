import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Code2, Palette } from 'lucide-react';
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">DoomLeet</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link 
            to="/problems" 
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all"
          >
            NeetCode
          </Link>
          <Link 
            to="/striver" 
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-primary/[0.06] transition-all"
          >
            Striver
          </Link>

          <button
            onClick={toggleTheme}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/[0.06] transition-all"
            title={theme === 'mono' ? 'Switch to purple theme' : 'Switch to mono theme'}
          >
            <Palette className="h-4 w-4" />
          </button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 ml-1 rounded-lg hover:bg-primary/[0.06]">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
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
            <Button asChild size="sm" className="ml-1 rounded-lg shadow-lg shadow-primary/20">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

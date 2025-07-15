import { NavLink } from '@/components/ui/nav-link';
import { 
  Home, 
  LayoutDashboard, 
  User, 
  School, 
  Book, 
  Users,
  LogOut,
  Settings,
  ChevronDown,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useLogoutMutation } from '@/slices/usersApiSlice';
import { useTheme } from '@/lib/theme-context';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '@/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  roleNames: string[];
  userInfo: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Sidebar({ roleNames, userInfo }: SidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [logout] = useLogoutMutation();
  
  const isAdmin = roleNames.includes('admin');
  const isTeacher = roleNames.includes('teacher');
  const isStudent = roleNames.includes('student');

  const handleLogout = async () => {
    try {
      await logout();
      // You might want to add additional logout logic here
      dispatch(clearCredentials()); // Clear user info from Redux store
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const getUserInitials = () => {
    return userInfo?.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="flex flex-col h-full p-4">
      <div className="flex items-center h-16 mb-6">
        <h1 className="text-xl font-semibold">App Name</h1>
      </div>
      
      <div className="flex-1 space-y-1">
        {/* Common routes for all roles */}
        <NavLink to="/">
          <Home className="h-4 w-4" />
          Home
        </NavLink>

        {/* Admin specific routes */}
        {isAdmin && (
          <>
            <NavLink to="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink to="/users">
              <Users className="h-4 w-4" />
              User Management
            </NavLink>
          </>
        )}

        {/* Teacher specific routes */}
        {isTeacher && (
          <>
            <NavLink to="/courses">
              <Book className="h-4 w-4" />
              My Courses
            </NavLink>
            <NavLink to="/students">
              <Users className="h-4 w-4" />
              Students
            </NavLink>
          </>
        )}

        {/* Student specific routes */}
        {isStudent && (
          <>
            <NavLink to="/my-courses">
              <Book className="h-4 w-4" />
              My Courses
            </NavLink>
            <NavLink to="/grades">
              <School className="h-4 w-4" />
              Grades
            </NavLink>
          </>
        )}

        {/* Common routes */}
        <NavLink to="/profile">
          <User className="h-4 w-4" />
          Profile
        </NavLink>
      </div>

      {/* Bottom menu */}
      <div className="mt-auto space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 px-3 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userInfo?.avatar} alt={userInfo?.name} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start overflow-hidden">
                  <p className="text-sm font-medium truncate max-w-[150px]">
                    {userInfo?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {userInfo?.email}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56" 
            align="start" 
            side="top"
            collisionPadding={16}
          >
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer" 
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>Toggle Theme</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
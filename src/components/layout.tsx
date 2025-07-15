import { Outlet, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSelector } from 'react-redux';
// import { UserInfo } from '@/types'; // Import your UserInfo interface
// import { Sidebar } from '@/components/Sidebar';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { Sidebar } from './sidebar';
import type { UserInfo } from '@/types';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '@/slices/authSlice';
import { useLogoutMutation } from '@/slices/usersApiSlice';

export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const { userInfo } = useSelector((state: { auth: { userInfo: UserInfo } }) => state.auth);

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

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[250px]">
          <Sidebar
            roleNames={userInfo?.roleNames || []}
            userInfo={{
              name: userInfo?.name || '',
              email: userInfo?.email || '',
              avatar: '/avatars/01.png' // or userInfo?.avatar if you have it
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar - only show if user is authenticated */}
      {userInfo && (
        <aside className="hidden md:flex flex-col w-[250px] border-r fixed h-full">
          <Sidebar
            roleNames={userInfo?.roleNames || []}
            userInfo={{
              name: userInfo?.name || '',
              email: userInfo?.email || '',
              avatar: '/avatars/01.png' // or userInfo?.avatar if you have it
            }}
          />
        </aside>
      )}

      {/* Main content */}
      <div className={`flex-1 ${userInfo ? 'md:ml-[250px]' : ''} overflow-auto`}>
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              {/* Header content */}
            </div>

            {/* Avatar with dropdown - only show if user is authenticated */}
            {userInfo && (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt={userInfo.name} />
                        <AvatarFallback>
                          {userInfo.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userInfo.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userInfo.roleNames.join(', ')}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </header>
        <main className="container py-6 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
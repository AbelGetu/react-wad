import { Link, useMatch } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function NavLink({ 
  to, 
  children,
  className,
  ...props 
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const match = useMatch(to);
  
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        match
          ? 'bg-accent text-accent-foreground'
          : 'hover:bg-accent/50 hover:text-accent-foreground/80',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
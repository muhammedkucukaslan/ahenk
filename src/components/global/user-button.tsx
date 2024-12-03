import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import useSWR from 'swr';
import { fetcher } from '@/src/utils';
import Spinner from './spinner';
import CustomTooltip from './custom-tooltip';
import {
  AlertCircle,
  ChevronDown,
  LogOut,
  Moon,
  Settings,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { logout } from '@/src/features/auth/actions';
import { useRouter } from 'next/navigation';

const UserButton = () => {
  const { data: user, isLoading, error } = useSWR('/users', fetcher);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      router.push('/login');
    }
  };

  if (isLoading)
    return (
      <div className='h-10 w-10 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  if (error || !user) {
    console.error('Kullanıcı bilgileri çekilemedi: ', error);

    return (
      <CustomTooltip content='Kullanıcı bilgileri çekilemedi'>
        <AlertCircle size={18} className='text-destructive' />
      </CustomTooltip>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative cursor-pointer active:scale-90'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div className='w-3.5 h-3.5 absolute bottom-0 right-0 bg-secondary rounded-full justify-center flex items-center'>
            <ChevronDown size={12} className='text-secondary-foreground' />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuLabel className='text-muted-foreground font-normal -mt-4'>
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Ayarlar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Moon />
          Görünüm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Çıkış yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

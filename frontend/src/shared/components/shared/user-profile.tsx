import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { User } from '@/shared/services/auth/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

interface Props {
  user: User;
}

export const UserProfile = ({ user }: Props) => {
  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='h-16 w-16'>
          <AvatarImage src={user.avatarImg} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClickSignOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

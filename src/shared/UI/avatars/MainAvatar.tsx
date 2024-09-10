import { Avatar, AvatarFallback, AvatarImage } from '@/shadecn/components/ui/avatar';
import { cn } from '@/shadecn/lib/utils';

interface IProps {
  src: string;
  name?: string;
  className?: string;
}

const getFirstLetters = (text?: string): string => {
  if (!text) return;
  const wordArr = text.split(' ');
  return `${wordArr[0].charAt(0).toLocaleUpperCase()}${
    wordArr[1]?.charAt(0).toLocaleUpperCase() ?? ''
  }`;
};

export default function MainAvatar({
  src = null,
  name = 'C',
  className,
}: Readonly<IProps>): React.ReactElement {
  return (
    <Avatar className={cn('h-20 w-20 rounded-lg', className)}>
      <AvatarImage src={src} className="z-10 rounded-lg object-cover" />
      <AvatarFallback className="h-20 w-20 rounded-lg text-sm font-semibold text-slate-700">
        {getFirstLetters(name)}
      </AvatarFallback>
    </Avatar>
  );
}

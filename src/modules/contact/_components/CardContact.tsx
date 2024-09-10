import { truncateString } from '@app/utils/truncateString';
import MainAvatar from '@UI/avatars/MainAvatar';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface ICardContactProps {
  picture: string;
  name: string;
  phoneNumber: string;
  eMail: string;
}

export default function CardContact({ picture, name, phoneNumber, eMail }: ICardContactProps) {
  return (
    <div className="group min-w-40 rounded-xl bg-white p-5 shadow transition-shadow hover:shadow-xl">
      <div className="flex flex-col items-center justify-center">
        <MainAvatar src={picture} className="transition-transform group-hover:scale-105" />
        <p className="py-3 font-bold text-slate-900">{name}</p>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-2">
            <FaPhoneAlt
              className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
              size={30}
            />
            <p>{phoneNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail
              className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
              size={30}
            />
            {truncateString(eMail, 22)}
          </div>
        </div>
      </div>
    </div>
  );
}

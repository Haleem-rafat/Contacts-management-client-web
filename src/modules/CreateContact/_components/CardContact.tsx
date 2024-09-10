import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { truncateString } from '@app/utils/truncateString';
import MainAvatar from '@UI/avatars/MainAvatar';
import { IContactStore } from '@servicesTypes/contact.types';
import PopOverMenuContact from './PopOverMenuContact';

interface ICardContactProps {
  contact: IContactStore;
  setContactData: React.Dispatch<React.SetStateAction<IContactStore>>;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardContact({ contact, setContactData, setOpenSheet }: ICardContactProps) {
  return (
    <div className="group relative min-w-40 rounded-xl bg-white p-5 shadow transition-shadow hover:shadow-xl">
      <PopOverMenuContact
        contact={contact}
        setContactData={setContactData}
        setOpenSheet={setOpenSheet}
      />

      <div className="flex flex-col items-center justify-center">
        <MainAvatar src={contact?.img} className="transition-transform group-hover:scale-105" />
        <p className="py-3 font-bold text-slate-900">{contact?.userName}</p>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-2">
            <FaPhoneAlt
              className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
              size={30}
            />
            <p>{contact?.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail
              className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
              size={30}
            />
            {truncateString(contact?.email, 22)}
          </div>
        </div>
      </div>
    </div>
  );
}

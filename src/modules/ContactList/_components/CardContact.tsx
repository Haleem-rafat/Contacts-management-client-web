import { generatePath, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { truncateString } from '@app/utils/truncateString';
import { ROUTES } from '@constants/routes';
import MainAvatar from '@UI/avatars/MainAvatar';
import { toast } from 'react-toastify';

interface ICardContactProps {
  contactId: string;
  picture: string;
  name: string;
  phoneNumber: string;
  eMail: string;
}

export default function CardContact({
  contactId,
  picture,
  name,
  phoneNumber,
  eMail,
}: ICardContactProps) {
  const navigate = useNavigate();

  // this function to show an error when a contact does not have an ID.
  const handelNavigate = () => {
    if (contactId) {
      navigate(generatePath(ROUTES.CONTACT_DETAILS, { contactId }));
    } else {
      toast.error(
        'Ops, this contact not have an ID to go details page can try another contact card'
      );
    }
  };

  return (
    <button
      type="button"
      onClick={() => handelNavigate()}
      className="group min-w-40 rounded-xl bg-white p-5 shadow transition-shadow hover:shadow-xl">
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
    </button>
  );
}

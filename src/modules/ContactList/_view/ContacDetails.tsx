import { useNavigate, useParams } from 'react-router-dom';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

import contactService from '@services/contact.service';
import { IContact } from '@servicesTypes/contact.types';

import useSWR from 'swr';
import MainAvatar from '@UI/avatars/MainAvatar';
import { ROUTES } from '@constants/routes';
import ContacDetailsSkeletion from '../_components/ContacDetailsSkeletion';

export default function ContacDetails() {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const { data: contactDetailsData, isLoading: contactDetailsIsLoading } = useSWR(
    ['get-contact-details', contactId],
    () => contactId && contactService.getContactDetails(contactId).then((data) => data as IContact)
  );

  const contactDetails = contactDetailsData && contactDetailsData?.results[0];

  if (contactDetailsIsLoading) return <ContacDetailsSkeletion />;

  return (
    <div>
      <p className="flex items-center gap-2 pb-10 text-2xl font-semibold">
        <IoArrowBackCircleOutline
          size={30}
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.CONTACT)}
        />
        Contact Details <span className="self-end text-sm">(Story 2)</span>
      </p>
      <div className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow">
        <h2 className="under font-semibold">Contact info :</h2>
        <div className="flex flex-wrap gap-5">
          <div>
            <MainAvatar
              size="lg"
              src={contactDetails?.picture?.large}
              className="transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-2">
              <FaUser
                className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
                size={30}
              />
              <p> {contactDetails?.name.first + ' ' + contactDetails?.name?.last}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt
                className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
                size={30}
              />
              <p>{contactDetails?.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail
                className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
                size={30}
              />
              {contactDetails?.email}
            </div>
            <div className="flex items-center gap-2">
              <ImLocation
                className="rounded-lg bg-blue-400 p-1.5 text-white transition-colors group-hover:bg-blue-600"
                size={30}
              />
              {contactDetails?.location?.street?.number +
                contactDetails?.location?.street?.name +
                contactDetails?.location.country +
                contactDetails?.location.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

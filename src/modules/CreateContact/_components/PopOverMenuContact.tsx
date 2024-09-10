import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiOutlinePencil } from 'react-icons/hi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { IContactStore } from '@servicesTypes/contact.types';
import { deleteContact } from '@store/slices/contact.slice';
import { useDispatch } from 'react-redux';

interface IPopOverMenuContactProps {
  contact: IContactStore;
  setContactData: React.Dispatch<React.SetStateAction<IContactStore>>;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PopOverMenuContact({
  contact,
  setContactData,
  setOpenSheet,
}: IPopOverMenuContactProps) {
  const dispatch = useDispatch();

  const hnadelEditContact = () => {
    setContactData(contact);
    setOpenSheet(true);
  };

  const hnadelDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger className="absolute right-2">
          <button type="button">
            <BiDotsVerticalRounded size={35} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="z-[99] flex w-fit flex-col gap-y-2 rounded-2xl bg-white p-2 shadow">
          <button
            type="button"
            onClick={() => hnadelEditContact()}
            className="flex items-center gap-x-2 rounded-2xl p-2 text-sm font-semibold hover:bg-slate-100">
            <HiOutlinePencil size={20} />
            <p>Edit contact</p>
          </button>
          <button
            onClick={() => hnadelDeleteContact(contact.id)}
            type="button"
            className="flex cursor-pointer items-center gap-x-2 rounded-2xl p-2 text-sm font-semibold text-red-500 hover:bg-slate-100">
            <BsFillTrash3Fill size={20} />
            <p>Delete contact</p>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

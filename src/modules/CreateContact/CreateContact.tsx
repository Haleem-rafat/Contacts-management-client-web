import { useSelector } from 'react-redux';
import { selectContact } from '@store/slices/contact.slice';
import { Button } from '@components/ui/button';
import Box from '@assets/img/Box.svg';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@components/ui/sheet';
import { useEffect, useState } from 'react';
import { IContactStore } from '@servicesTypes/contact.types';
import { Input } from '@components/ui/input';
import CardContact from './_components/CardContact';
import CreateContactForm from './_components/CreateContactForm';

export default function CreateContact() {
  const contactList = useSelector(selectContact);

  const [openSheet, setOpenSheet] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactData, setContactData] = useState<IContactStore>();

  const filteredUsers = searchTerm
    ? contactList?.filter((contact) =>
        contact?.userName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : contactList;

  useEffect(() => {
    if (!openSheet) {
      setContactData(null);
    }
  }, [openSheet]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="pb-10 text-2xl font-semibold">
          Contact CRUD <span className="text-sm">(Story 3 with redux toolkit)</span>
        </p>
      </div>

      {/* search input and create Button*/}
      <div className="flex items-center justify-between pb-6">
        <Input
          type="text"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-fit rounded border p-2"
        />
        <div>
          <Button onClick={() => setOpenSheet(true)}>+ Add new contact</Button>
        </div>
      </div>

      {/* if no contacts are available */}
      {contactList?.length === 0 ? (
        <div className="mx-auto mt-20 flex flex-col items-center justify-center gap-2">
          <img src={Box} />
          <p className="font-semibold">No contact found</p>
          <p className="text-sm">Please create contact listing first</p>
        </div>
      ) : (
        // display filtered contacts
        <div className="grid grid-cols-1 gap-8 px-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredUsers?.map((contact) => (
            <CardContact
              key={contact.id}
              contact={contact}
              setContactData={setContactData}
              setOpenSheet={setOpenSheet}
            />
          ))}
        </div>
      )}

      <Sheet open={openSheet} onOpenChange={() => setOpenSheet(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{contactData ? 'Edit ' : 'Add new'} contact</SheetTitle>
            <SheetDescription>
              <CreateContactForm contactData={contactData} onClose={() => setOpenSheet(false)} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

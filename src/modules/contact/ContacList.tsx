import { useEffect, useState } from 'react';

import useSWR from 'swr';
import contactService from '@services/contact.service';
import { IContact, Result } from '@servicesTypes/contact.types';

import InfiniteScroll from 'react-infinite-scroll-component';
import CardContact from './_components/CardContact';
import CardContactSkeleton from './_components/CardContactSkeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ContacList() {
  const [page, setPage] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const fetchContact = () => {
    return contactService
      .getContactList({
        page,
        results: 200,
      })
      .then((data) => data as IContact);
  };

  const {
    data: contactData,
    isLoading: contactIsloading,
    mutate: contactMutate,
  } = useSWR(['get-contact-list', page], fetchContact);

  const {
    hasMore: contactsHasMore,
    handleLoadMore: contactsHandleLoadMore,
    dataList: contactsDataList,
  } = useInfiniteScroll({
    swrData: contactData,
    swrMutate: contactMutate,
    setPage,
    isLoading: contactIsloading,
  });

  const filteredContacts = selectedLetter
    ? contactsDataList.filter(
        (contact) => contact.name.first.charAt(0).toUpperCase() === selectedLetter
      )
    : contactsDataList;

  useEffect(() => {
    contactMutate();
  }, [selectedLetter, contactMutate]);

  const getButtonClassNames = (letter: string | null) =>
    `rounded-lg border px-3 py-2  ${
      selectedLetter === letter ? 'bg-blue-500 text-white' : 'bg-gray-200'
    }`;

  return (
    <div className="flex gap-1">
      {/* to filter contacts by the selected letter section */}
      <div className="flex h-[calc(100vh-150px)] flex-col gap-4 overflow-y-scroll">
        <button
          type="button"
          onClick={() => setSelectedLetter(null)}
          className={getButtonClassNames(null)}>
          All
        </button>
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => setSelectedLetter(letter)}
            className={getButtonClassNames(letter)}>
            {letter}
          </button>
        ))}
      </div>

      {/*  infinite scroll list contact with skeleton  */}
      <div id="scrollableDiv" className="h-[calc(100vh-150px)] overflow-auto">
        <InfiniteScroll
          dataLength={contactsDataList?.length || 0}
          next={contactsHandleLoadMore}
          hasMore={contactsHasMore}
          loader={<CardContactSkeleton count={4} />}
          scrollableTarget="scrollableDiv">
          <div className="grid grid-cols-1 gap-8 px-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {(filteredContacts as Result[])?.map((contact) => (
              <CardContact
                key={contact?.id.value}
                picture={contact?.picture.large}
                name={contact?.name.first + ' ' + contact?.name.last}
                phoneNumber={contact?.phone}
                eMail={contact?.email}
              />
            ))}
            {contactIsloading && <CardContactSkeleton />}
            {contactIsloading && <CardContactSkeleton />}
            {contactIsloading && <CardContactSkeleton />}
            {contactIsloading && <CardContactSkeleton />}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
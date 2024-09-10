import { useState } from 'react';

import useSWR from 'swr';
import contactService from '@services/contact.service';
import { IContact, Result } from '@servicesTypes/contact.types';

import InfiniteScroll from 'react-infinite-scroll-component';
import CardContactSkeleton from './_components/CardContactSkeleton';
import CardContact from './_components/CardContact';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ContacList() {
  const [page, setPage] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const fetchContact = () => {
    return contactService
      .getContactList({
        page,
        results: 50,
      })
      .then((data) => data as IContact);
  };

  const {
    data: contactData,
    isLoading: contactIsloading,
    mutate: contactMutate,
  } = useSWR(['get-contact-list', page, selectedLetter], fetchContact);

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
    ? contactsDataList
        // add a filter to only show contacts that have an ID because a lot of contacts don't have an ID.
        .filter((contact) => contact?.id?.value)
        .filter((contact) => contact.name.first.charAt(0).toUpperCase() === selectedLetter)
    : contactsDataList.filter((contact) => contact?.id?.value);

  const getButtonClassNames = (letter: string) =>
    `rounded-lg border px-3 py-2  ${
      selectedLetter === letter ? 'bg-blue-500 text-white' : 'bg-gray-200'
    }`;

  return (
    <>
      <p className="pb-10 text-2xl font-semibold">
        Contact List <span className="text-sm">(Story 1)</span>
      </p>
      <div className="flex gap-4">
        {/* to filter contacts by the selected letter section */}
        <div className="flex h-[calc(100vh-150px)] flex-col gap-4 overflow-y-scroll scrollbar-hide">
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
        <div id="scrollableDiv" className="h-[calc(100vh-150px)] overflow-auto scrollbar-hide">
          <InfiniteScroll
            dataLength={contactsDataList?.length || 0}
            next={contactsHandleLoadMore}
            hasMore={contactsHasMore}
            loader={<CardContactSkeleton count={12} />}
            scrollableTarget="scrollableDiv">
            <div className="grid grid-cols-1 gap-8 px-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {(filteredContacts as Result[])?.map((contact) => (
                <CardContact
                  key={contact?.id.value}
                  contactId={contact?.id.value}
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
    </>
  );
}

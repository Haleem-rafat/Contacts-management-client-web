import { IContact, Result } from '@servicesTypes/contact.types';
import { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';

interface IInfiniteScroll {
  swrData: IContact;
  swrMutate: KeyedMutator<IContact>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

function useInfiniteScroll({ swrData, swrMutate, setPage, isLoading }: IInfiniteScroll) {
  const [dataList, setDataList] = useState<Result[]>([]);

  const hasMore = swrData?.results?.length > 0;

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevIndex) => prevIndex + 1);
      swrMutate();
    }
  };

  useEffect(() => {
    if (swrData && swrData.results && !isLoading) {
      if (swrData.info.page === 1) {
        setDataList(swrData.results);
      } else if (swrData.info.page > 1) {
        setDataList((prevDataList) => [...prevDataList, ...(swrData?.results as Result[])]);
      }
    }
  }, [swrData, isLoading]);

  return {
    hasMore,
    handleLoadMore,
    dataList,
  };
}

export default useInfiniteScroll;

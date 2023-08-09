'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '@/src/components/BasicList/component';
import { getOwners } from '@/src/store/modules/owner/asyncThunks';
import { ListHeader } from '@/src/components/ListHeader/component';
import { Metadata } from '@/src/components/TotalResults/component';
import { CreateButton } from '@/src/components/Buttons/CreateButton/component';
import { isValid } from '@/src/utils/validators';
import { getRevenues } from '@/src/store/modules/revenue/asyncThunks';
import { RevenueCard } from '@/src/components/Revenues/RevenueCard/component';
import { RevenueActions } from '@/src/slices/revenue/revenueSlice';

export const RevenueList = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);
  const { metadata, data } = state.revenue.revenues;

  useEffect(() => {
    dispatch(
      getRevenues({
        initialDate: '2023-07-01',
        finalDate: '2023-07-31',
      }),
    );
    dispatch(getOwners());
  }, []);

  return (
    <>
      {isValid(metadata.totalResults) && (
        <ListHeader>
          <Metadata metadata={metadata} />
          <CreateButton
            createAction={() => {
              dispatch(RevenueActions.setIsOpenCreateRevenueDialog(true));
            }}
          />
        </ListHeader>
      )}

      <ItemList>
        {data.map((revenue) => (
          <RevenueCard key={revenue.id} revenue={revenue} />
        ))}
      </ItemList>
    </>
  );
};

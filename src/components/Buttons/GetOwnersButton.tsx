'use client';

import { getOwners } from '@/src/store/modules/owner/asyncThunks';
import { AppDispatch, useAppDispatch } from '@/src/store/store';

const GetOwnersButton = () => {
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        dispatch(getOwners());
      }}
    >
      Get Owners
    </button>
  );
};

export default GetOwnersButton;

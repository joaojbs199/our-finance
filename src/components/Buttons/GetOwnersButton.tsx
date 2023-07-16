'use client';

import { getOwners } from '@/src/store/modules/owner/asyncThunks';
import { AppDispatch, useAppDispatch } from '@/src/store/store';

const GetOwnersButton = () => {
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <button
      className="rounded border border-gray-200 p-1"
      onClick={() => {
        dispatch(getOwners());
      }}
    >
      Get Owners
    </button>
  );
};

export default GetOwnersButton;

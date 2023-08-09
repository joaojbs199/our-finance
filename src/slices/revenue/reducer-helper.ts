import { PartialRevenue } from '@/src/integration/data/models/apiResponse/revenues/interfaces';
import { IOpenRevenueDialogs } from '@/src/integration/data/models/flow/revenue/interfaces';
import { IRevenueState } from '@/src/store/interfaces';
import { Draft, PayloadAction } from '@reduxjs/toolkit';

type S = Draft<IRevenueState>;
type A<T> = PayloadAction<T>;

/**
 * Replaces the old revenue with the new one that was returned.
 * @param revenues Current revenues list in state.
 * @param updatedRevenue Returned revenue from update query.
 * @returns Updated revenue list.
 */
export const updateRevenues = (revenues: PartialRevenue[], updatedRevenue: PartialRevenue) => {
  const updatedRevenues: PartialRevenue[] = revenues.map((revenue) => {
    return revenue.id === updatedRevenue.id ? { ...updatedRevenue } : revenue;
  });

  return updatedRevenues;
};

export const updateIsOpenUpdateRevenueDialog = (state: S, action: A<IOpenRevenueDialogs>) => {
  const { isOpen, revenueId } = action.payload;
  return {
    ...state,
    uiState: {
      ...state.uiState,
      dialogs: {
        ...state.uiState.dialogs,
        updateRevenueDialog: {
          ...state.uiState.dialogs.updateRevenueDialog,
          isOpen,
          revenueId,
        },
      },
    },
  };
};

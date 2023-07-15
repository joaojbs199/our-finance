import { IOwnerState, initialUiState } from './interfaces';

export const initialOwnerState: IOwnerState = {
  uiState: {
    getOwners: initialUiState,
  },
  owners: [],
};

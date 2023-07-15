import { createSlice } from '@reduxjs/toolkit';
import { initialOwnerState } from '@/src/store/state';
import { getOwners } from '@/src/store/modules/owner/asyncThunks';

const ownerSlice = createSlice({
  name: 'owners',
  initialState: initialOwnerState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOwners.pending, (state) => {
        state.uiState.getOwners.isLoading = true;
        state.uiState.getOwners.error = { isError: false, errorMessage: '' };
      })
      .addCase(getOwners.fulfilled, (state, action) => {
        state.uiState.getOwners.isLoading = false;
        state.owners = action.payload;
      })
      .addCase(getOwners.rejected, (state, action) => {
        state.uiState.getOwners.isLoading = false;
        state.uiState.getOwners.error = {
          isError: true,
          errorMessage: action.error.message || 'Something went wrong',
        };
      });
  },
});

export default ownerSlice;

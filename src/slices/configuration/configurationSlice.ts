import { createSlice } from '@reduxjs/toolkit';
import { initialConfigurationState } from '@/src/store/state';
import { PayloadAction } from '@reduxjs/toolkit';

const configurationSlice = createSlice({
  name: 'configuration',
  initialState: initialConfigurationState,
  reducers: {
    setGlobalIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        globalLoading: action.payload,
      };
    },
  },
});

const { setGlobalIsLoading } = configurationSlice.actions;

export const ConfigurationActions = {
  setGlobalIsLoading,
};

export default configurationSlice;

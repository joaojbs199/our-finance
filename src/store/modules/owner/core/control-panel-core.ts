import { RootState } from '@/src/store/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getOwners } from '../asyncThunks';
import { connect, ConnectedProps } from 'react-redux';

export const mapStateToProps = (state: RootState) => ({
  uiState: state.owner.uiState,
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => ({
  getOwners: () => {
    dispatch(getOwners());
  },
});

export const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export type GetOwnersButtonProps = PropsFromRedux;

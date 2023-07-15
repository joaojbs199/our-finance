'use client';

import { GetOwnersButtonProps, connector } from '@/src/store/modules/owner/core/control-panel-core';

const GetOwnersButton = (props: GetOwnersButtonProps) => {
  const { getOwners } = props;
  return (
    <button
      onClick={() => {
        getOwners();
      }}
    >
      Get Owners
    </button>
  );
};

export default connector(GetOwnersButton);

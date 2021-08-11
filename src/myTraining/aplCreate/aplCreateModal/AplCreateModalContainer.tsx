import React from 'react';
import { observer } from 'mobx-react';
import { AlertWin } from 'shared';
import AlertWin2 from 'shared/ui/logic/AlertWin2';
import { useAplCreateModal } from './aplCreateModal.stores';
import { initAplCreateModal } from './aplCreateModal.models';
import {
  handleAlertOk,
  handleCloseAlertWin,
  handleCloseSaveWin,
  handleSaveOk,
} from './aplCreateModal.events';

function AplCreateModalContainer() {
  const {
    alertMessage,
    alertMessage2,
    alertWinOpen,
    alertWinOpen2,
    alertTitle,
    alertTitle2,
    alertType,
  } = useAplCreateModal() || initAplCreateModal();

  return (
    <>
      <AlertWin
        message={alertMessage}
        handleClose={handleCloseSaveWin}
        open={alertWinOpen}
        alertIcon="circle"
        title={alertTitle}
        type={alertType}
        handleOk={() => handleSaveOk(alertType)}
      />
      <AlertWin2
        message={alertMessage2}
        handleClose={handleCloseAlertWin}
        open={alertWinOpen2}
        alertIcon="triangle"
        title={alertTitle2}
        type="안내"
        handleOk={handleAlertOk}
      />
    </>
  );
}

export default observer(AplCreateModalContainer);

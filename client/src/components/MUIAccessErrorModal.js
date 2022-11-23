
import { useContext } from 'react'
import * as React from 'react';
import { AlertTitle ,Typography, Button,Modal,Alert,Box } from '@mui/material';
import { GlobalStoreContext } from '../store/index.js'


export default function MUIAccessErrorModal() {
  const { store } = useContext(GlobalStoreContext);

  let handleClose = ()=>{
    store.hideModals();
  }

return(
    <Modal
        id='error-style'
        open={store.isAccessErrorModalOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Alert severity ="warning">
            <AlertTitle>Error</AlertTitle>
            <div id='alert-style'> 
            <Typography component="h1" variant="h5"> {store.message} </Typography>
            <Button onClick={()=>handleClose()}variant="outlined" color="error">Close</Button>
            </div>
          </Alert>
        </Box>
      </Modal>

  );
}
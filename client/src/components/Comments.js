import React, { useContext, useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import { GlobalStoreContext } from '../store'
export const Comments = () => {
    const { store } = useContext(GlobalStoreContext);


    useEffect(() => {
        /// Published list
        store.loadIdNamePairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  return (
    <div className='comments'>
        <div className='comments-area'>
               
        </div>
        <TextField id="outlined-basic" label="Add Comment" variant="outlined" />
    </div>
  )
}

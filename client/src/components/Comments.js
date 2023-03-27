import React, { useContext, useEffect,useRef,useState } from 'react'
import TextField from '@mui/material/TextField';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Avatar from '@mui/material/Avatar';
import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export const Comments = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const {selection} = props;

  const theme = createTheme({
    palette: {
      primary:{
        main:'#7369ff'
      }
    },
  });

  useEffect(() => {
    store.scrollUp('comments');
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [store.currentList?store.currentList.comments.length: '']);
  const handleAddComment = (event) => {
    if (event.key === 'Enter') {
      if(event.target.value!=="") store.AddComment(event.target.value);
      }
  }
  let comments = "";
  if(store.currentList){
     comments= store.currentList.comments.map((comment,index=0)=>(
      <div key={index++} className='comment'>
        <Avatar sx={{ bgcolor: '#7369ff' }}>{comment.initials}</Avatar>
        <div style={{display:'flex' ,flexDirection:'column'}}> 
        <h4 style={{color:'#7369ff'}}>{comment.userName}</h4>
        <p className='comment-content'>{comment.comment}</p>
        </div>
      </div>
      ))
  }
  return (
    <div  className='comments'>
        <div id="comments" className='comments-area'>
               {comments}
        </div>
        { auth.loggedIn && store.currentList && store.currentList.published?
    <Box sx={{ display: 'flex', alignItems: 'flex-end' , }} className='comment-field'>
       <ThemeProvider theme={theme}>
        <Avatar sx={{ bgcolor: '#7369ff' }}>{auth.user.firstName[0]+auth.user.lastName[0]}</Avatar>
        <TextField
        onKeyPress={handleAddComment} 
        color="primary"  
        sx={{width:'70%'}} 
        id="input-with-sx" 
        label="Add a comment" 
        variant="standard" />
      </ThemeProvider>
    </Box> : ""
        }
    </div>
  )
}

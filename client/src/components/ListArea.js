import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import PublishedCard from './PublishedCard';
import { useHistory } from 'react-router-dom'
import PublishedArea from './PublishedArea';

export const ListArea = (props) => {

const { store } = useContext(GlobalStoreContext);
const [expanded, setExpanded] = React.useState(false);
const {parent}=props
store.history = useHistory();
let ListArea = "";

const handleChange = (panel,id) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
  store.clearTransaction();
  if(!store.currentList || store.currentList._id!== id){
    store.setPublishedList(id);
  }
};
if (store.PublishedPlaylists) {
  let playlists=store.PublishedPlaylists;
  if(store.search==="")playlists=[];
  if(store.search && store.search!==""){
    if(parent==="AllListScreen")playlists= playlists.filter( list => list.name.startsWith(store.search));
    if(parent==="UserScreen") playlists= playlists.filter( list => list.owner.startsWith(store.search));
  }
  switch (store.sortMethod) {
    case 'Name':
      playlists=store.SortName(playlists);
      break;
    case 'PublishedDate':
      playlists=store.SortPublishedDate(playlists);
      break;
    case 'Listens':
      playlists=store.SortMostListens(playlists);
      break;
    case 'Likes':
      playlists=store.SortMostLikes(playlists);
      break;
    case 'Dislikes':
      playlists=store.SortMostDislikes(playlists);
      break;
    default:
      break;
  }
ListArea= 
    <List sx={{width: '90%', left: '5%'}}>
    {playlists.map((list) => (   
    <Accordion 
    style={{backgroundColor: store.currentList && store.currentList._id===list._id? '#678983': list.published? '#f7e7b5':'#F0E9D2' , color:'black'}}
    key={list._id} 
    id='user-list' 
    expanded={store.currentList && store.currentList._id === list._id ? (expanded === 'panel'): false } 
    onChange={handleChange('panel',list._id)}
    >
    <AccordionSummary style={{display:'flex' , alignItems:'flex-end'}}  
    expandIcon={<KeyboardDoubleArrowDownIcon style={{marginBottom:'1rem', fontSize:'24pt'}} />} aria-controls="panel1bh-content" id="panel1bh-header">
      {list.published ? <PublishedCard  key={list._id} List={list} selected={false}/>:""}
    </AccordionSummary>
    <AccordionDetails>
      {list.published ? <PublishedArea key={list._id} userName={list.owner} id={list._id}/>:""}
    </AccordionDetails>
    </Accordion>
    ))}
    </List>}
return (
  <div className='list-area'>{ListArea}</div>
)
}

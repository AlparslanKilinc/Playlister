import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    // function prevent(event){
    //     event.preventDefault();
    //     event.stopPropagation();
    // }
    function handlePlay(event){
        event.stopPropagation();
        store.setPlay(index);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);
        console.log(draggedTo);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.preventDefault();
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }
    function handleDoubleClick(event) {
        store.showEditSongModal(index, song);
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={'song-card'}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handlePlay}
            onDoubleClick={handleDoubleClick}
        >
            <h5 style={{color: store.playIndex===index? 'red':''}} >
            {index + 1}. {song.title} by {song.artist}
            </h5>
              <Button
                id='delete-song-button'
                onClick={handleRemoveSong}
                variant="none">
                <ClearIcon />
              </Button>
        </div>
    );
}

export default SongCard;
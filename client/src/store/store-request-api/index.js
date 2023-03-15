import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'https://playlister-api.onrender.com/api',
})
// API Functions 
export const createPlaylist = (newListName, newSongs, email,newComments,Username) => {
    return api.post(`/playlist/`, {
        name: newListName,
        ownerEmail: email,
        owner:Username,
        date: new Date(),
        lastEdit: new Date(),
        published:false,
        publishedDate:"-1",
        listens:0,
        likes:0,
        dislikes:0,
        comments:newComments,
        songs: newSongs,
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getPlaylists = () => api.get(`/playlists/`)
export const updatePlaylistNameById = (id, playlist) => {return api.put(`/playlist/Name/${id}`, {playlist : playlist})}
export const updatePlaylistById = (id, playlist) => {return api.put(`/playlist/${id}`, {playlist : playlist})}
/// Public 
export const getPublishedPlaylists = () => api.get(`/PublishedPlaylists/`)
export const getPublishedPlaylistById = (id) => api.get(`/PublishedPlaylists/${id}`)
export const updatePublishedPlaylistComments = (id, playlist) => {return api.put(`/PublishedPlaylistsComments/${id}`,{playlist : playlist})}
export const updatePublishedPlaylistListens = (id, playlist) => {return api.put(`/PublishedPlaylistsListens/${id}`, {playlist : playlist})}
export const updatePublishedPlaylistByLike = (id, playlist) => {return api.put(`/PublishedPlaylistsLikes/${id}`, {playlist : playlist})}
export const updatePublishedPlaylistByDislike = (id, playlist) => {return api.put(`/PublishedPlaylistsDislikes/${id}`, {playlist : playlist})}

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylists,
    updatePlaylistById,
    getPublishedPlaylists,
    getPublishedPlaylistById,
    updatePublishedPlaylistComments,
    updatePublishedPlaylistByLike,
    updatePublishedPlaylistByDislike,
    updatePlaylistNameById,
    updatePublishedPlaylistListens,
}
export default apis

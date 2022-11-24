
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
/// Published
router.get('/PublishedPlaylists/', PlaylistController.getPublishedPlaylists)
router.get('/PublishedPlaylists/:id', PlaylistController.getPublishedPlaylistById)
router.put('/PublishedPlaylists/:id', PlaylistController.updatePublishedPlaylistById)
//// Search 
router.get('/playlists/:search', auth.verify, PlaylistController.SearchPlaylists)

module.exports = router
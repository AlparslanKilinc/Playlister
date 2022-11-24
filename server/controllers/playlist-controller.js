const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
const auth = require('../auth');
let Counter=0;

createPlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    let body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    /// Checking if Same name exists
    while(true){
    const list = await Playlist.findOne({name:body.name})
    if(list)body.name="Untitled"+Counter++;
    else break;
    }
    

    const playlist = new Playlist(body);
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

 
        
    User.findOne({ _id: req.userId }, (err, user) => {
        if (playlist.ownerEmail === user.email) {
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
        }else{
            console.log("incorrect ownerEmail!");
            return res.status(400).json({ 
                errorMessage: "User E-mail Does not  Match" 
            });
        }
    })
}

deletePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        list= JSON.stringify(playlist);
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    user.playlists=user.playlists.filter(list=>JSON.stringify(list)!==JSON.stringify(playlist._id));
                    user
                        .save()
                        .then(() => {
                            Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                                return res.status(200).json({playlist:Playlist});
        
                            }).catch(err => console.log(err))
                        });
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err , errorMessage:"Playlist Does Not Exists"});
        }
        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error", errorMessage:"Authentication Error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}

getPlaylists = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncFindList(email) {
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    let fields = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let field = {
                            _id: list._id,
                            name: list.name,
                            owner:list.owner,
                            date:list.date,
                            published:list.published,
                            listens:list.listens,
                            likes:list.likes,
                            dislikes:list.dislikes,
                        };
                        fields.push(field);
                    }
                    return res.status(200).json({ success: true, playlists: fields })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}

updatePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs;
                    list.ownerEmail=body.playlist.ownerEmail;
                    list.owner=body.playlist.owner;
                    list.date=body.playlist.date;
                    list.published=body.playlist.published;
                    list.listens=body.playlist.listens;
                    list.likes=body.playlist.likes;
                    list.dislikes=body.playlist.dislikes;
                    list.comments=body.playlist.comments;
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                list:list,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}

///// Published Methods
getPublishedPlaylists = async (req, res) => {
    async function asyncFindLists(email) {
        await Playlist.find({ published: true }, (err, playlists) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!playlists) {
                return res
                    .status(404)
                    .json({ success: false, error: 'Playlists not found' })
            }
            else {
                let fields = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let field = {
                        _id: list._id,
                        name: list.name,
                        owner:list.owner,
                        date:list.date,
                        published:list.published,
                        listens:list.listens,
                        likes:list.likes,
                        dislikes:list.dislikes,
                    };
                    fields.push(field);
                }
                return res.status(200).json({ success: true, playlists: fields})
            }
        }).catch(err => console.log(err))
    }
    asyncFindLists();
}

getPublishedPlaylistById = async (req, res) => {
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err , errorMessage:"Playlist Does Not Exists"});
        }
        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlist Not Found' })
        }
        // IS THIS LIST PUBLISHED?
        if(list.published){
            return res.status(200).json({ success: true, playlist: list})
        }else{
            return res
            .status(404)
            .json({ success: false, error: 'Playlist Is Not Published' })
        }
    }).catch(err => console.log(err))
}

updatePublishedPlaylistById = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Playlist.findOne({ _id: req.params.id }, (err,list) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        if(list.published){
                    /// Cannot be changed
                    list.name = list.name;
                    list.songs = list.songs;
                    list.ownerEmail=list.ownerEmail;
                    list.owner=list.owner;
                    list.date=list.date;
                    list.published=list.published;
                    /// Allowed to Change
                    list.listens=body.playlist.listens;
                    list.likes=body.playlist.likes;
                    list.dislikes=body.playlist.dislikes;
                    list.comments=body.playlist.comments;

                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                list:list,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
        }else{
            return res
            .status(404)
            .json({ success: false, error: 'Playlist Is Not Published' })
        }
            }).catch(err => console.log(err))
        }

//// Search 
SearchPlaylists = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncFindList(email) {
            let search=req.params.search;
            await Playlist.find(
                { 
                    ownerEmail: { $eq:email},
                    name: search
                }
                , (err, playlists) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    let fields = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let field = {
                            _id: list._id,
                            name: list.name,
                            owner:list.owner,
                            date:list.date,
                            published:list.published,
                            listens:list.listens,
                            likes:list.likes,
                            dislikes:list.dislikes,
                        };
                        fields.push(field);
                        console.log(fields);
                    }
                    
                    return res.status(200).json({ success: true, playlists: fields })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}



module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPublishedPlaylists,
    getPlaylists,
    updatePlaylist,
    getPublishedPlaylistById,
    updatePublishedPlaylistById,
    SearchPlaylists
}
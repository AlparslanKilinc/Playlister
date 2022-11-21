const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publishedSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        date: {type:String , required:true},
        listens:{type:Number , required:true},
        likes:{type:Number,required:true},
        dislikes:{type:Number,required:true},
        comments:{ type:[{
            comment:String,
            userName:String,
        }],required:true},

        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Published', publishedSchema)

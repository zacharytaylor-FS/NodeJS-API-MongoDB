const mongoose = require('mongoose');
require('dotenv').config()

const connection = async () =>{
    try {
        return await mongoose.connect(process.env.MONGODB), 
        console.log(`Real MongoDB is up and running`)
    } catch (error) {
        console.log(error)
    }
    
};

const savePost = async (newPost) => {
    console.log("Saving real posts")
    return await newPost.save()
}
const disconnect = async () => {
    console.log("Real Disconnect");
    await mongoose.connection.close()
}

module.exports = {connection, savePost, disconnect }
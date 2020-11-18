const mongoose = require('mongoose');


const handleConnection = async () => {
    mongoose.connection.on("error", function (err) {
        console.error('Failed to connect to MongoDB on startup ', err);
    });

    mongoose.connection.on('disconnected', async () => {
        console.log('Mongoose default connection to MongoDB disconnected');
        await connectToDb();
    });

    await connectToDb();
}


const connectToDb = async () => {
    try{
        console.log('Etablishe connexion...')
        await mongoose.connect(process.env.MONGODB_URL, { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true });
        console.log("done");
    }catch(error) {
        console.log(error);
    }
}


// const disconnectFromDb = async () => {
//     try{
//         await mongoose.disconnect();
//     }catch(error) {
//         console.log(error);
//     }
// }


module.exports.handleConnection = handleConnection;
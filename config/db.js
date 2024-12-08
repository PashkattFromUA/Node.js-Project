import mongoose from 'mongoose';

const DB_URI =
    'mongodb+srv://pashkattfromua:DyZzs41nMsK2Y9IK@cluster0.qdfze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.error(e);
    });

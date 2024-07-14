const mongoose = require('mongoose');

const MONGO_URL = `mongodb+srv://anas:${process.env.DB_PASSWORD}@cluster0.vcombk6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log('Database Connected Successfully');
}
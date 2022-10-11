import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gustavo:root@api.6wjyizz.mongodb.net/api-log");

let db = mongoose.connection;

export default db;
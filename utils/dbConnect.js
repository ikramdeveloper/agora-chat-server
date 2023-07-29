import mongoose from "mongoose";

mongoose.set("strictQuery", false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://jithinraja4:Jithin%4099@cluster0.fpop2.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected to MongoDB!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.error("MongoDB Connection Error:", err);
      throw err;
    });
};


const getDb=()=>{
  if(_db){
    return _db;
  }
  throw "No Db Found";
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;

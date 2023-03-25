const MongoClient = require('mongodb').MongoClient;

// Replace the following with your MongoDB connection string
const uri = "mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/NetflixDatabase?retryWrites=true&w=majority"		

const databaseName = "NetflixDatabase"
const collectionName = "NetflixCollection"

MongoClient.connect(uri, function(err, client) {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
  }
  console.log('Connected to MongoDB Atlas...');
  
  const collection = client.db(databaseName).collection(collectionName);
  
  // Add a new field to all existing documents in the collection
  collection.updateMany({}, { $set: { service: "Netflix" } }, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    client.close();
  });
});

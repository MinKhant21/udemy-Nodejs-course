const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _id;
const mongoConnect = callback => {
  MongoClient.connect(
  )
    .then(client => {
      _id = client.db('test')
      console.log('Connected!');
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};
const getDb = () => {
  if(_id){
    return _id
  }
  throw ('No db Found')
}

module.exports = { mongoConnect, getDb }; // Export the functions


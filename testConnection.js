import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MongoClient = mongodb.MongoClient;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterName = process.env.MONGODB_CLUSTER_NAME;

const uri = `mongodb+srv://${username}:${password}@${clusterName}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, connectTimeoutMS: 5000 });


client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  })
  .finally(() => {
    client.close();
  });


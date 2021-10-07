const csv = require("csv-parser");
const MongoClient = require("mongodb").MongoClient;

const connectToDb = async () => {
  return MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected");
      return client;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Could not connect to database.");
    });
};

const updateSnakeData = async () => {
  const client = await connectToDb();

  const db = client.db("Snakes");
  const australianSnakes = db.collection("Australia");

  console.log("Updating data...");

  try {
    await australianSnakes.updateMany(
      {},
      { $set: { partitionKey: "ss3A-demo" } }
    );
  } catch (error) {
    console.log("Error", error.message);
  }
  console.log("Updated successfully");
};

updateSnakeData();

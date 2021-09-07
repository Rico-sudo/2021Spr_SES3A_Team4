const csv = require("csv-parser");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const results = [];
const insertedClassIds = new Set();

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

const uploadToMongo = async (results) => {
  const client = await connectToDb();

  const db = client.db("Snakes");
  const australianSnakes = db.collection("Australia");

  console.log("Uploading data...");

  try {
    await australianSnakes.insertMany(results);
  } catch (error) {
    console.log("Error", error.message);
  }
  console.log("Uploaded successfully");
};

fs.createReadStream("./assets/dataset-metadata.csv")
  .pipe(csv())
  .on("data", (data) => {
    const isAustralian = data.country === "Australia";
    if (
      isAustralian &&
      (insertedClassIds.size === 0 || !insertedClassIds.has(data.class_id))
    ) {
      insertedClassIds.add(data.class_id);
      // Remove and rename fields
      results.push({
        scientificName: data.binomial,
        genus: data.genus,
        family: data.family,
        classId: data.class_id,
      });
    }
  })
  .on("end", () => {
    uploadToMongo(results);
  });

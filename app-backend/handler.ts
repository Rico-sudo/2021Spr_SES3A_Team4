import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db("Snakes");
  cachedDb = db;
  return db;
}

export async function hello(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  const snakes = await db.collection("Details").find({}).toArray();
  return {
    statusCode: 200,
    body: JSON.stringify(snakes),
  };
}

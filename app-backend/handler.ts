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

export async function autocompleteSearchAustralianSnakes(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  context.callbackWaitsForEmptyEventLoop = false;
  const { query } = event && event.queryStringParameters;

  try {
    const db = await connectToDatabase();
    const australianSnakes = await db.collection("Australia");

    const getAggregationPipeline = (path) => [
      {
        $search: {
          index: path,
          autocomplete: {
            query,
            path,
          },
        },
      },
      {
        $addFields: {
          score: { $meta: "searchScore" },
        },
      },
    ];

    // Autocomplete queries
    const searchGenus = australianSnakes
      .aggregate(getAggregationPipeline("genus"))
      .toArray();
    const searchFamily = australianSnakes
      .aggregate(getAggregationPipeline("family"))
      .toArray();
    const searchName = australianSnakes
      .aggregate(getAggregationPipeline("scientificName"))
      .toArray();

    const results = await Promise.all([searchGenus, searchFamily, searchName]);
    const sortedTop10Results = (results as any)
      .flat()
      .sort((a, b) => (a.score > b.score ? -1 : b.score > a.score ? 1 : 0))
      .slice(0, 10);

    return {
      statusCode: 200,
      body: JSON.stringify(sortedTop10Results),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
}

export async function getSnakeDetails(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  context.callbackWaitsForEmptyEventLoop = false;
  const { classId } = event && event.queryStringParameters;

  try {
    const db = await connectToDatabase();
    const australianSnakes = await db.collection("Australia");

    const snakeDetails = await australianSnakes.findOne({ classId });

    return {
      statusCode: 200,
      body: JSON.stringify(snakeDetails),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
}

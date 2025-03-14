import { SquareClient, SquareEnvironment } from "square";
import JSONBig from "json-bigint";

const environment = process.env.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox;
const token = process.env.SQUARE_ACCESS_TOKEN;

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)
  console.log('Coming from the front end', post_data);


  try {

    const client = new SquareClient({
      environment, token
    });

    let item = await client.catalog.object.get({
      objectId: post_data
    })

    return {
      status: 200,
      body: JSONBig.stringify(item)
    }

  }
  catch (error) {
    console.error("Error retrieving item", error)
    return {
      status: 500,
      body: {
        message: `An error occurred: ${error}`
      }
    }
  }

})
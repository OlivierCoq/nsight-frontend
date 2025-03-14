import { SquareClient, SquareEnvironment } from "square";
import JSONBig from "json-bigint";

const client = new SquareClient({
  environment: process.env.SQUARE_ENVIRONMENT == 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox, // Environment.Production or Environment.Sandbox for testing
  token: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)

  const card = await client.cards.create(post_data)

  if(!card.errors) {
    return {
      status: 200,
      body: {
        card: JSONBig.stringify(card),
      }
    }
  } else {
    return {
      status: 400,
      body: {
        message: "An error occurred while creating card."
      }
    }
  }


})
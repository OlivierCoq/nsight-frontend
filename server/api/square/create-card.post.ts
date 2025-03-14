import { SquareClient, SquareEnvironment } from "square"
import JSONBig from "json-bigint";
const client = new SquareClient({
  environment: process.env.SQUARE_ENVIRONMENT == 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox, // Environment.Production or Environment.Sandbox for testing
  token: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("body", post_data);

  const new_card = await client.cards.create(post_data)

  return {
    statusCode: 200,
    body: JSONBig.stringify(new_card),
  }

});

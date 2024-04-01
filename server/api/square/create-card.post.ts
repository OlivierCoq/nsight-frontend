import { Client, Environment, ApiError, CreateCardRequest } from "square";
import JSONBig from "json-bigint";
const square_client = new Client({
  environment: process.env.SQUARE_ENVIRONMENT == 'production' ? Environment.Production : Environment.Sandbox, // Environment.Production or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  // console.log("body", post_data);
  // typeoF body:
  // console.log("typeof body", typeof post_data);
  const body: CreateCardRequest = post_data;

  const { result, ...httpResponse } = await square_client.cardsApi.createCard(
    body
  );
  // console.log("createCard result", result);
  const response = JSONBig.parse(JSONBig.stringify(result));
  return response;
});

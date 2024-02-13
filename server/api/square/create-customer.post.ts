import { Client, Environment, ApiError } from "square";
const square_client = new Client({
  environment: Environment.Production, // or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  // handle POST requests for the `api/foo` endpoint

  // body
  const post_data = await readBody(event);
  // console.log("body", body);

  try {
    const { result, ...httpResponse } =
      await square_client.customersApi.createCustomer(post_data);
    // console.log("square customer result", result);

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errors = error.result;
      console.log("Square error", errors);
      // const { statusCode, headers } = error;
      return errors;
    }
  }
});

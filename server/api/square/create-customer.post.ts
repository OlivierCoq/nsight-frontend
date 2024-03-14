import { Client, Environment, ApiError, CreateCustomerRequest } from "square";
import JSONBig from "json-bigint";
const square_client = new Client({
  environment: Environment.Production, // or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  // console.log("body", post_data);
  // typeoF body:
  // console.log("typeof body", typeof post_data);
  const body: CreateCustomerRequest = post_data;

  try {
    const { result, ...httpResponse } =
      await square_client.customersApi.createCustomer(body);

    const response = JSONBig.parse(JSONBig.stringify(result));
    event.node.res.statusCode = 200;
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSONBig.stringify(response));
  } catch (error) {
    if (error instanceof ApiError) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errors = error.result;
      console.log("Square error", errors);
      // const { statusCode, headers } = error;

      return JSONBig.parse(errors);
    }
  }
});

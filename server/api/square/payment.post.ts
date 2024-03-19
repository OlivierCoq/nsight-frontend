import { Client, Environment, ApiError, CreatePaymentRequest } from "square";
import JSONBig from "json-bigint";
const square_client = new Client({
  environment: Environment.Sandbox, // Environment.Production or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  // console.log("body", post_data);
  // typeoF body:
  // console.log("typeof body", typeof post_data);
  const body: CreatePaymentRequest = post_data;

  const { result, ...httpResponse } =
    await square_client.paymentsApi.createPayment(body);
  // console.log("createPayment result", result);
  const response = JSONBig.parse(JSONBig.stringify(result));
  return response;

  // try {
  //   const { result, ...httpResponse } =
  //     await square_client.paymentsApi.createPayment(body);
  //   // console.log("createPayment result", result);

  //   // const response = JSONBig.parse(JSONBig.stringify(result));

  //   const response = JSONBig.parse(JSONBig.stringify(result));

  //   event.node.res.statusCode = 200;
  //   event.node.res.setHeader("Content-Type", "application/json");
  //   event.node.res.end(response);
  //   return response;
  // } catch (error) {
  //   if (error instanceof ApiError) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const errors = error.result;
  //     console.log("Square error", errors);
  //     // const { statusCode, headers } = error;

  //     return JSONBig.parse(errors);
  //   }
  // }
});

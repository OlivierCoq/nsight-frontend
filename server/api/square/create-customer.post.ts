import {
  Client,
  Environment,
  ApiError,
  CreateCustomerRequest,
  CreateCustomerResponse,
} from "square";
import JSONBig from "json-bigint";
const square_client = new Client({
  environment: Environment.Production, // or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  // body
  // console.log("event", event);
  // console.log("event.node.req", event.node.req);
  // console.log("event.node.res", event.node.res);

  const post_data = await readBody(event);
  // console.log("body", post_data);
  // typeoF body:
  // console.log("typeof body", typeof post_data);
  const body: CreateCustomerRequest = post_data;

  try {
    const { result, ...httpResponse } =
      await square_client.customersApi.createCustomer(body);
    // console.log("square customer result", result);
    // console.log("square customer httpResponse", httpResponse);

    // result.json(JSONBig.parse(result));
    // result.json(result);
    // console.log("square customer result", JSONBig.parse(result));
    // return JSONBig.parse(result);
    // return {
    //   data: JSONBig.parse(result),
    // };
    // console.log("event", event.res);
    // send to front
    // console.log("square customer result", JSONBig.parse(result));
    // console.log("square customer httpResponse", httpResponse);
    // console.log("square customer httpResponse", JSONBig.parse(httpResponse));
    // console.log("square customer result", result);
    const response: CreateCustomerResponse = JSONBig.parse(result);
    console.log("square customer response", response);

    // node send respons
    // return response; // return JSONBig.parse(httpResponse);
    event.node.res.statusCode = 200;
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSONBig.stringify(response));
    return response;
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

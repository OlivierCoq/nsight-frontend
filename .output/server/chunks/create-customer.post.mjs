import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { ApiError, Client, Environment } from 'square';
import JSONBig from 'json-bigint';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'node:fs';
import 'node:url';

const square_client = new Client({
  environment: Environment.Sandbox,
  // Environment.Production or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});
const createCustomer_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  const body = post_data;
  try {
    const { result, ...httpResponse } = await square_client.customersApi.createCustomer(body);
    const response = JSONBig.parse(JSONBig.stringify(result));
    event.node.res.statusCode = 200;
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSONBig.stringify(response));
  } catch (error) {
    if (error instanceof ApiError) {
      const errors = error.result;
      console.log("Square error", errors);
      return JSONBig.parse(errors);
    }
  }
});

export { createCustomer_post as default };
//# sourceMappingURL=create-customer.post.mjs.map

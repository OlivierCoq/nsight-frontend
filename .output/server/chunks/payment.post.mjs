import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { Client, Environment } from 'square';
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
const payment_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  const body = post_data;
  const { result, ...httpResponse } = await square_client.paymentsApi.createPayment(body);
  const response = JSONBig.parse(JSONBig.stringify(result));
  return response;
});

export { payment_post as default };
//# sourceMappingURL=payment.post.mjs.map

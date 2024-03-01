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
  // or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});
const listCatalog_get = defineEventHandler(async (event) => {
  await readBody(event);
  const { result, ...httpResponse } = await square_client.catalogApi.listCatalog();
  const response = JSONBig.parse(JSONBig.stringify(result));
  return response;
});

export { listCatalog_get as default };
//# sourceMappingURL=list-catalog.get.mjs.map

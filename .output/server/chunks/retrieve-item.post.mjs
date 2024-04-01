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
const retrieveItem_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const post_data = await readBody(event);
  const objectId = post_data, includeRelatedObjects = true, includeCategoryPathToRoot = true;
  const { result, ...httpResponse } = await square_client.catalogApi.retrieveCatalogObject(
    objectId,
    includeRelatedObjects,
    void 0,
    includeCategoryPathToRoot
  );
  const response = JSONBig.parse(JSONBig.stringify(result));
  if ((_c = (_b = (_a = response == null ? void 0 : response.object) == null ? void 0 : _a.itemData) == null ? void 0 : _b.imageIds) == null ? void 0 : _c.length) {
    response.object["images"] = [];
    response.object.itemData.imageIds.forEach((imageId) => {
      response.relatedObjects.forEach((relatedObject) => {
        if (relatedObject.id === imageId) {
          response.object["images"].push(relatedObject.imageData);
        }
      });
    });
  }
  if ((_f = (_e = (_d = response == null ? void 0 : response.object) == null ? void 0 : _d.itemData) == null ? void 0 : _e.variations) == null ? void 0 : _f.length) {
    (_h = (_g = response == null ? void 0 : response.object) == null ? void 0 : _g.itemData) == null ? void 0 : _h.variations.forEach((variation) => {
      var _a2;
      variation["images"] = [];
      (_a2 = variation.itemVariationData) == null ? void 0 : _a2.imageIds.forEach((imageId) => {
        response.relatedObjects.forEach((relatedObject) => {
          if (relatedObject.id === imageId) {
            variation["images"].push(relatedObject.imageData);
          }
        });
      });
    });
  }
  return {
    item: response.object,
    related: response.relatedObjects
  };
});

export { retrieveItem_post as default };
//# sourceMappingURL=retrieve-item.post.mjs.map

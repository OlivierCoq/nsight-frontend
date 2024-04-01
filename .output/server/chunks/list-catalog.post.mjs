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
const listCatalog_post = defineEventHandler(async (event) => {
  await readBody(event);
  const { result, ...httpResponse } = await square_client.catalogApi.listCatalog(void 0, "ITEM,ITEM_VARIATION,MODIFIER,MODIFIER_LIST,CATEGORY,TAX,IMAGE");
  const response = JSONBig.parse(JSONBig.stringify(result));
  const batchObjRequest = {
    objectIds: [],
    includeRelatedObjects: true,
    // Include images:
    catalogVersion: response.latestVersion
  };
  async function getProductObjects() {
    var _a;
    try {
      const listResponse = await square_client.catalogApi.listCatalog();
      for (const catalogObject of (_a = listResponse == null ? void 0 : listResponse.result) == null ? void 0 : _a.objects) {
        const objectId = catalogObject.id;
        const retrieveResponse = await square_client.catalogApi.retrieveCatalogObject(objectId);
        batchObjRequest.objectIds.push(objectId);
      }
    } catch (error) {
      console.error("Error fetching product images:", error);
    }
    const batchRetrieveResponse = await square_client.catalogApi.batchRetrieveCatalogObjects(batchObjRequest);
    return batchRetrieveResponse;
  }
  const objects = await getProductObjects();
  const processed = JSON.parse(objects.body);
  let items = [], categories = [];
  processed.objects.forEach((object) => {
    var _a, _b;
    if (object.type === "ITEM") {
      (_b = (_a = object.item_data) == null ? void 0 : _a.image_ids) == null ? void 0 : _b.forEach((imageId) => {
        const image = processed.related_objects.find((relatedObject) => relatedObject.id === imageId);
        if (image) {
          object["images"] = [];
          object["images"].push(image.image_data);
        }
      });
      items.push(object);
    }
    if (object.type === "CATEGORY") {
      categories.push(object);
    }
  });
  return {
    products: items,
    categories,
    res: JSONBig.parse(JSONBig.stringify(result))
  };
});

export { listCatalog_post as default };
//# sourceMappingURL=list-catalog.post.mjs.map

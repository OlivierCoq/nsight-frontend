import { Client, Environment, ApiError,  RetrieveCatalogObjectResponse } from "square";
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

  const objectId = post_data,
    includeRelatedObjects = true,
    includeCategoryPathToRoot = true

  const { result, ...httpResponse } =
    await square_client.catalogApi.retrieveCatalogObject(
      objectId,
      includeRelatedObjects,
      undefined,
      includeCategoryPathToRoot
    );
  // console.log("listCatalog result", result.object);
  const response = JSONBig.parse(JSONBig.stringify(result));

  return {
    item: response.object,
    related: response.relatedObjects,
  }

});

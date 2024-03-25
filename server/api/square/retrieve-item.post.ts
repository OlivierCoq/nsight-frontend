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
    catalogVersion = true,
    includeRelatedObjects = true,
    includeCategoryPathToRoot = true

  const { result, ...httpResponse } =
    await square_client.catalogApi.retrieveCatalogObject(
      objectId,
      includeRelatedObjects,
      undefined,
      includeCategoryPathToRoot,
    );
  // console.log("listCatalog result", result.object);
  const response = JSONBig.parse(JSONBig.stringify(result));

  // console.log('response', response)

  // map through item's image ids and retrieve the images from response.relatedObjects:
  if(response?.object?.itemData?.imageIds?.length) {
    response.object['images'] = []

    response.object.itemData.imageIds.forEach((imageId: string) => {
      response.relatedObjects.forEach((relatedObject: Object) => {
        if(relatedObject.id === imageId) {
          response.object['images'].push(relatedObject.imageData)
        }
      })
    })
  }

  // map through the image ids and retrieve the images from response.relatedObjects:
  if(response?.object?.itemData?.variations?.length) {

    response?.object?.itemData?.variations.forEach((variation: Object) => {
      // console.log('variation', variation)
      variation['images'] = []

      variation.itemVariationData?.imageIds.forEach((imageId: string) => {
        response.relatedObjects.forEach((relatedObject: Object) => {
          if(relatedObject.id === imageId) {
            variation['images'].push(relatedObject.imageData)
          }
        })
      })

    })
  }

  return {
    item: response.object,
    related: response.relatedObjects,
  }

});

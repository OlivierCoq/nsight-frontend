import { Client, Environment, ApiError, BatchRetrieveCatalogObjectsRequest } from "square";
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

  const { result, ...httpResponse } =
    await square_client.catalogApi.listCatalog();
  // console.log("listCatalog result", result);
  const response = JSONBig.parse(JSONBig.stringify(result));

  const batchObjRequest: BatchRetrieveCatalogObjectsRequest = { 
    objectIds: [],
    includeRelatedObjects: true
  }

async function getProductObjects() {
  try {
    const listResponse = await square_client.catalogApi.listCatalog();
    
    for (const catalogObject of listResponse.result.objects) {
      const objectId = catalogObject.id;
      const retrieveResponse = await square_client.catalogApi.retrieveCatalogObject(objectId);

      // console.log('Retrieve object response:', retrieveResponse.result.object) 
      batchObjRequest.objectIds.push(objectId);
    }
  } catch (error) {
    console.error('Error fetching product images:', error);
  }

  const batchRetrieveResponse = await square_client.catalogApi.batchRetrieveCatalogObjects(batchObjRequest);
  return batchRetrieveResponse;

}

const objects = await getProductObjects();
// console.log('Objects', objects.body)

const processed = JSON.parse(objects.body)

let items = [], categories = [] 

// create objects that merge related_objects and objects:
processed.objects.forEach((object: any) => {
  if(object.type === 'ITEM') {
    object.item_data?.image_ids?.forEach((imageId) => {
      const image = processed.related_objects.find((relatedObject) => relatedObject.id === imageId);
      if(image) {
        object['images'] = []
        object['images'].push(image.image_data)
      }
    })
    items.push(object)
  }
  if(object.type === 'CATEGORY') {
    categories.push(object)
  }
})

  return {
    products: items,
    categories: categories
  }
});

import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid";
import JSONBig from "json-bigint";

if (!process.env.SQUARE_ENVIRONMENT || !process.env.SQUARE_ACCESS_TOKEN) {
  throw new Error('Missing required environment variables SQUARE_ENVIRONMENT or SQUARE_ACCESS_TOKEN');
}

const square_client = new Client({
  environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)
  // console.log('Place order post_data', post_data)

    // No empty orders, please.
  if(!post_data?.order?.lineItems) {
    throw new Error('Missing required fields in post_data');
  }

  // idempotencyKey is required for all write operations.
  post_data.idempotencyKey = uuidv4();
  post_data.order.idempotencyKey = uuidv4();

  // Sanitize data. Square API requires quantity and basePriceMoney.amount to be strings.
  post_data.order.lineItems.forEach((lineItem: any) => {
    if (typeof lineItem.quantity !== 'number' || typeof lineItem.basePriceMoney.amount !== 'number') {
      throw new Error('Invalid data types in lineItem');
    }

    lineItem.quantity = lineItem.quantity.toString();
    lineItem.basePriceMoney.amount = lineItem.basePriceMoney.amount.toString();
    lineItem['catalogObjectId'] = lineItem.id
    // remove lineItem.name, because it's not a valid field for the Square API:
    delete lineItem.name
  });
  // Square API doesn't like BigInts, so we need to convert them to strings.
  const post_data_string = JSONBig.stringify(post_data.order, (_, v) => typeof v === 'bigint' ? v.toString() : v);

  console.log('post_data.order', post_data.order)

  // return false
  // Fire away!
  try {
    const response = await square_client.ordersApi.createOrder({
      idempotencyKey: uuidv4(),
      order: JSONBig.parse(post_data_string)
    })

    // console.log('response', response);

    return {
      statusCode: 200,
      data: JSONBig.parse(JSONBig.stringify(response))
    }
  } catch (error) {
    console.error('An error occurred:', error);
    
    // Depending on Nuxt 3's error handling mechanism, you might need to handle the error here
    // and ensure that a proper response is returned to the client, even if the error is thrown.
    // For example, you might need to return a specific status code (e.g., 500) along with the error message.
    
    return {
      statusCode: 500,
      data: {
        error: error?.message
      }
    }
  }

})
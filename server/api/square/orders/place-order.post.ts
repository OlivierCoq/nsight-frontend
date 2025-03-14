import { SquareClient, SquareEnvironment } from "square";
import JSONBig from "json-bigint";
import { v4 as uuidv4 } from "uuid";

const environment = process.env.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox;
const token = process.env.SQUARE_ACCESS_TOKEN;

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)
  console.log('Coming from the front end', post_data);

    const client = new SquareClient({ environment, token});

        // No empty orders, please.
    if(!post_data?.order?.lineItems) {
      throw new Error('Missing required fields in post_data');
    }

    // idempotencyKey is required for all write operations.
    post_data.idempotencyKey = uuidv4();
    post_data.order.idempotencyKey = uuidv4();

      // Sanitize data. Square API requires quantity to be strings.
    post_data.order.lineItems.forEach((lineItem: any) => {
      if (typeof lineItem.quantity !== 'number' || typeof lineItem.basePriceMoney.amount !== 'number') {
        throw new Error('Invalid data types in lineItem');
      }

      lineItem.quantity = lineItem.quantity.toString();
      // I keep geting this error: "Expected bigint. Received "1299"."

      lineItem.basePriceMoney.amount = BigInt(lineItem.basePriceMoney.amount);
      lineItem['catalogObjectId'] = lineItem.id
      // remove lineItem.name, because it's not a valid field for the Square API:
      delete lineItem.name
      if ( lineItem.parent_name ) { delete lineItem.parent_name }
    });

      // Square API doesn't like BigInts, so we need to convert them to strings.
    // const post_data_string = JSONBig.stringify(post_data.order, (_, v) => typeof v === 'bigint' ? v.toString() : v);
    


// Fire away!!
  try {
    const response = await client.orders.create({
      idempotencyKey: uuidv4(),
      order: post_data.order
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
        error: error 
      }
    }
  }

})
import { Client, Environment } from "square";
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
  // console.log('Pay order post_data', post_data)

  // return false

  try {
    const response = await square_client.paymentsApi.createPayment({
      sourceId: post_data.sourceId,
      customerId: post_data.customerId,
      locationId: post_data.locationId,
      idempotencyKey: post_data.idempotencyKey,
      orderId: post_data.order_id,
      amountMoney: {
        amount: post_data.amountMoney.amount,
        currency: post_data.amountMoney.currency
      }
    })

    // console.log('payment response', response);

    return {
      statusCode: 200,
      data: JSONBig.parse(JSONBig.stringify(response))
    }
  } catch (error) {
    // console.error('An error occurred:', error);

    return {
      statusCode: 500,
      data: {
        error: error?.message
      }
    }
  }
})
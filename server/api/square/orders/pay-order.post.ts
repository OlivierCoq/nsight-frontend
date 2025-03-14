import { SquareClient, SquareEnvironment } from "square";
import JSONBig from "json-bigint";

const environment = process.env.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox;
const token = process.env.SQUARE_ACCESS_TOKEN;

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)
  console.log('Pay Order Data front end', post_data);

  try {

    const client = new SquareClient({ environment, token});

    const response = await client.payments.create({
      idempotencyKey: post_data.idempotencyKey,
      sourceId: post_data.sourceId,
      customerId: post_data.customerId,
      locationId: post_data.locationId,
      
      orderId: post_data.order_id,
      amountMoney: {
        amount: BigInt(post_data.amountMoney.amount),
        currency: post_data.amountMoney.currency
      }
    })

    return {
      status: 200,
      body: JSONBig.parse(JSONBig.stringify(response))
    }


  }
  catch (error) {
    console.error("Error retrieving item", error)
    return {
      status: 500,
      body: {
        message: `An error occurred processing payment: ${error}`,
        errors: JSON.parse(error?.body)
      }
    }
  }

})
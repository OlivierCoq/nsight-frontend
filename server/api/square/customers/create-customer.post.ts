import { SquareClient, SquareEnvironment } from "square";
import JSONBig from "json-bigint";

const client = new SquareClient({
  environment: process.env.SQUARE_ENVIRONMENT == 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox, // Environment.Production or Environment.Sandbox for testing
  token: process.env.SQUARE_ACCESS_TOKEN,
});

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event)

  const customer = await client.customers.create(post_data)

  console.log('Customer Data front end', post_data);
  console.log('Customer Data back end', customer);
  console.log('Customer Data back end', JSONBig.stringify(customer));
  console.log('Customer Data back end', customer.errors);
  // console.log('Customer Data back end', customer.errors[0].detail);
  if(!customer.errors) {
    return {
      status: 200,
      body: {
        customer: JSONBig.stringify(customer),
      }
    }
  } else {
    return {
      status: 400,
      body: {
        message: "An error occurred while creating customer."
      }
    }
  }


})
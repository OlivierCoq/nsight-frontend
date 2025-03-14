// import { Client, Environment, CreateCheckoutRequest } from "square";
// import JSONBig from "json-bigint";

// if (!process.env.SQUARE_ENVIRONMENT || !process.env.SQUARE_ACCESS_TOKEN) {
//   throw new Error('Missing required environment variables SQUARE_ENVIRONMENT or SQUARE_ACCESS_TOKEN');
// }

// const square_client = new Client({
//   environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
// });

// export default defineEventHandler(async (event) => {
//   const post_data: CreateCheckoutRequest = await readBody(event);

//   if (!post_data?.order?.lineItems) {
//     throw new Error('Missing required fields in post_data');
//   }

//   post_data.order.lineItems.forEach((lineItem: any) => {
//     if (typeof lineItem.quantity !== 'number' || typeof lineItem.basePriceMoney.amount !== 'number') {
//       throw new Error('Invalid data types in lineItem');
//     }

//     lineItem.quantity = lineItem.quantity.toString();
//     lineItem.basePriceMoney.amount = lineItem.basePriceMoney.amount.toString();
//   });

//   const post_data_string = JSONBig.stringify(post_data.order, (_, v) => typeof v === 'bigint' ? v.toString() : v);

//   try {
//     const { result } = await square_client.checkoutApi.createPaymentLink({
//       idempotencyKey: post_data.idempotencyKey,
//       order: JSONBig.parse(post_data_string)
//     });

//     console.log('result', result);
    
//     return {
//       statusCode: 200,
//       data: JSONBig.parse(JSONBig.stringify(result))
//     };
//   } catch (error) {
//     console.error('An error occurred:', error);
    
//     // Depending on Nuxt 3's error handling mechanism, you might need to handle the error here
//     // and ensure that a proper response is returned to the client, even if the error is thrown.
//     // For example, you might need to return a specific status code (e.g., 500) along with the error message.
    
//     return {
//       statusCode: 500,
//       data: {
//         error: error.message
//       }
//     };
//   }
// });

export default defineEventHandler((event) => {
  return {
    hell: "world",
  };
});

// import {
//   createApp,
//   createRouter,
//   useBody,
//   useBase,
//   sendError,
//   createError,
// } from "h3";

// import { defineNuxtMiddleware } from "#app";

// const app = createApp({
//   debug: false,
//   onError: (error, event) => {
//     sendError(event, error);
//   },
// });

// const router = createRouter();

// // Square
// import { Client, Environment, ApiError } from "square";
// const client = new Client({
//   environment: Environment.Production, // or Environment.Sandbox for testing
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
// });

// // Health
// router.get("/test", (req, res) => {
//   res.send("Server is running!");
// });

// // Create Customer
// router.post("/create-customer", async (req, res) => {
//   console.log("local square endpoint is hit...");

//   try {
//     const { given_name, family_name, email_address, phone_number } = req.body;
//     const { result, ...httpResponse } =
//       await client.customersApi.createCustomer({
//         givenName: given_name,
//         familyName: family_name,
//         emailAddress: email_address,
//         phoneNumber: phone_number,
//       });
//     // console.log("square customer result", result);
//     res.json({
//       result,
//       httpResponse,
//     });
//   } catch (error) {
//     if (error instanceof ApiError) {
//       // @ts-expect-error: unused variables
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       const errors = error.result;
//       console.log("Square error", errors);
//       // const { statusCode, headers } = error;
//     }
//   }
// });

// app.use(router);

// export default defineNuxtMiddleware(app);

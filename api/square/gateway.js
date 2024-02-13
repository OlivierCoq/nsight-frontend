const express = require("express");
const { Client, Environment, ApiError } = require("square");

const app = express();
app.use(express.json());

// Square Client
const client = new Client({
  environment: Environment.Production, // or Environment.Sandbox for testing
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Create Customer
app.post("/create-customer", async (req, res) => {
  try {
    const { given_name, family_name, email_address, phone_number } = req.body;
    const { result } = await client.customersApi.createCustomer({
      givenName: given_name,
      familyName: family_name,
      emailAddress: email_address,
      phoneNumber: phone_number,
    });
    console.log("square customer result", result);
    res.json({ customer: result.customer });
  } catch (error) {
    res.json({ error: error.errors });
  }
});

module.exports = {
  path: "/api",
  handler: app,
};

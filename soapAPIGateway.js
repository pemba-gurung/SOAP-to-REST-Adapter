const express = require("express");
const soap = require("soap");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.LOCAL_PORT || 8090;

app.use(express.json());

//WSDL URL
const WSDL_URL =
  process.env.WSDL_URL || "http://www.dneonline.com/calculator.asmx?WSDL";
let wsdlServices = {};

soap.createClient(WSDL_URL, (err, client) => {
  if (err) {
    console.error("Error creating SOAP client:", err);
    return;
  }

  console.log("WSDL Description:", client.describe());
  wsdlServices.WSDL_Description = client.describe();
});

app.get("/", (req, resp) => {
  resp.status(200);
  return resp.json(wsdlServices);
});

// Endpoint to convert JSON request to SOAP request
app.post("/", (req, resp) => {
  const { method, params } = req.body;

  if (!method || !params) {
    return resp.status(400).json({ error: "Method and params are required" });
  }

  soap.createClient(WSDL_URL, (err, client) => {
    if (err) {
      return resp.status(500).json({ error: "Failed to create SOAP client" });
    }

    // Call the specified method with the provided parameters
    client[method](params, (err, result) => {
      if (err) {
        return resp.status(500).json({ error: "SOAP method call failed" });
      }
      return resp.json(result);
    });
  });
});

app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});

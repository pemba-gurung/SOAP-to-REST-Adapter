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

let services = {};
let restEndPoints = [];

// get soap services from WSDL
async function getSoapServices(wsdlUrl) {
  try {
    const client = await soap.createClientAsync(wsdlUrl);
    services = client.describe();
    console.log("SOAP services extracted:", services);
    return services;
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to create SOAP client: ${error.message}`)
    );
  }
}

// implement a recurisive function to traverse the tree structure of the object and create endpoints
function extractSoapDataForRoute(soapData, path = ["api"], result = []) {
  for (const [key, value] of Object.entries(soapData)) {
    const currentPath = [...path, key];

    // Base case: if the value is not an object or is null, stop recursion
    if (value === null || typeof value != "object") {
      return;
    }

    // Base case: if the key is 'input' or 'output', add the current path to the result
    if ("input" in value && "output" in value) {
      result.push("/" + currentPath.join("/"));
    } else if (value && typeof value === "object") {
      // Recurse into children
      extractSoapDataForRoute(value, currentPath, result);
    }
  }
  return result;
}

// use the js object returned by soap.WSDL to create a list of endpoints for those methods using recursive function
async function restEndPointGenerator() {
  try {
    services = await getSoapServices(WSDL_URL);
    restEndPoints = extractSoapDataForRoute(services);
  } catch (err) {
    console.error("Error generating REST endpoints:", err.message);
  }
}

restEndPointGenerator();

// get the list of endpoints to client
app.get("/", (req, resp) => {
  resp.status(200);
  return resp.send(`List of End Point for Available Service: ${restEndPoints}`);
});

// get the list of services in JSON format
app.get("/json", (req, resp) => {
  resp.status(200);
  return resp.send(services);
});

// get request and return the result of soap function
app.post("/api/:serviceName/:portName/:methodName", (req, resp) => {
  const { serviceName, portName, methodName } = req.params;
  console.log("Request received for service:", req.params);
  console.log(
    `Service: ${serviceName}, Port: ${portName}, Method: ${methodName}`
  );
  const parameters = req.body;

  if (!serviceName || !portName || !methodName) {
    return resp.status(400).json({ error: "Service, and port are required" });
  }

  // if (!parameters) {
  //   return resp.status(400).json({ error: "Parameters are required" });
  // }

  soap.createClient(WSDL_URL, (err, client) => {
    if (err) {
      return resp.status(500).json({ error: "Failed to create SOAP client" });
    }

    // Call the specified service, port and method with the provided parameters
    client[serviceName][portName][methodName](parameters, (err, result) => {
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

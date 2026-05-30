const swaggerAutogen = require("swagger-autogen")();

const isProd = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "Health Clinic API",
    description: "API documentation",
    version: "1.0.0",
  },
  host: isProd
    ? "health-clinic-app.onrender.com/"
    : "localhost:3000",
  schemes: isProd ? ["https"] : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
const swaggerAutogen = require("swagger-autogen")();

const isProd = process.env.NODE_ENV === "production";

// Modified by Raphael: Extended the endpoints mapping target to the index router file so it captures both patient and doctor sub-modules.
const doc = {
  info: {
    title: "Health Clinic API",
    description: "Health Clinic API allows you to manage patients, appointments, and medical records in a health clinic application.",
    version: "1.0.0",
  },
  host: isProd
    ? "health-clinic-app.onrender.com"
    : "localhost:3000",
  schemes: isProd ? ["https"] : ["http"],
  tags: [
    {
      name: "Patients",
      description: "Endpoints related to patient management",
    },
    {
      name: "Doctors",
      description: "Endpoints related to doctor management",
    },
    {
      name: "Appointments",
      description: "Endpoints related to appointment management",
    },
    {
      name: "Prescriptions",
      description: "Endpoints related to prescription management",
    }
  ]
};

const outputFile = "./swagger.json";
// Pointing to the main routing entry point file to parse all linked route collections automatically
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
const swaggerAutogen = require("swagger-autogen")();

const isProd = process.env.NODE_ENV === "production";

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
// Include the other routes files that needs to be in the documentation
const endpointsFiles = ["./routes/patientRoutes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
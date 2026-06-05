const swaggerAutogen = require("swagger-autogen")();

// Detect environment and set appropriate host
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const host = isProd ? 'health-clinic-app.onrender.com' : `localhost:${port}`;
const schemes = isProd ? ['https'] : ['http'];

const doc = {
  info: {
    title: "Health Clinic API",
    description: "Health Clinic API allows you to manage patients, appointments, and medical records in a health clinic application.",
    version: "1.0.0",
  },
  host: host,
  schemes: schemes,
  tags: [
    { name: "Patients", description: "Endpoints related to patient management" },
    { name: "Doctors", description: "Endpoints related to doctor management" },
    { name: "Appointments", description: "Endpoints related to appointment management" },
    { name: "Prescriptions", description: "Endpoints related to prescription management" }
  ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
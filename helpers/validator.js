// validator.js
// Raphael Daveal | Health Clinic App | CSE 341

const Validator = require('validatorjs');

const patientRules = {
    medicalRecordNumber: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    dateOfBirth: 'required|date',
    gender: 'required|in:male,female,other',
    contactEmail: 'required|email',
    emergencyPhone: 'required|string'
};

const doctorRules = {
    staffId: 'required|string',
    practitionerName: 'required|string',
    medicalSpecialty: 'required|string',
    consultationRoom: 'required|string',
    weeklyHours: 'required|numeric',
    contactEmail: 'required|email',
    isAcceptingPatients: 'required|boolean'
};

const appointmentRules = {
    doctorId: 'required|string',
    patientName: 'required|string',
    patientEmail: 'required|email',
    visitDate: 'required|date',
    timeSlot: 'required|string',
    checkInStatus: 'required|in:pending,checked-in,completed,cancelled',
    primarySymptomDescription: 'required|string'
};

const prescriptionRules = {
    rxNumber: 'required|string',
    patientRecordNumber: 'required|string',
    medicationName: 'required|string',
    dosageStrength: 'required|string',
    frequencyPerDay: 'required|numeric',
    refillsRemaining: 'required|numeric',
    specialInstructions: 'required|string'
};

const validate = (data, rules) => {
    const validation = new Validator(data, rules);
    return {
        passes: validation.passes(),
        errors: validation.errors.all()
    };
};

module.exports = {
    patientRules,
    doctorRules,
    appointmentRules,
    prescriptionRules,
    validate
};
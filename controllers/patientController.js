const Patient = require('../models/Patient');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

exports.createPatient = async (req, res) => {
    const { name, dateOfBirth, weight, height, bloodGroup, address, healthStatus ,staffUid} = req.body;
    const uid = uuidv4();
    const _id = uuidv4()
    try {
        const newPatient = new Patient({_id, uid, name, dateOfBirth, weight, height, bloodGroup, address, healthStatus, staffUid });
        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error });
    }
};

exports.getPatients = async (req, res) => {
    try {
        // Define the fields to be returned
        const fields = 'uid name dateOfBirth bloodGroup weight height staffUid address healthStatus';

        // Find all patients and select specific fields
        const patients = await Patient.find().select(fields);

        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Error fetching patients', error });
    }
};

exports.getPatientById = async (req, res) => {
    const { uid } = req.params;

    try {
        const patient = await Patient.findById(uid);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { uid } = req.params; // Assuming uid is passed as a URL parameter
        const patientData = req.body;

        // Validate UID
        if (!uid || typeof uid !== 'string') {
            return res.status(400).json({ message: 'Invalid patient ID' });
        }
        delete patientData._id;
        // Update the patient and return the updated document
        const updatedPatient = await Patient.findOneAndUpdate({ uid: uid }, patientData, { upsert: true });

        // Check if the patient was found and updated
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Error updating patient', error });
    }
};

exports.deletePatient = async (req, res) => {
    const { uid } = req.params;

    try {
        const patient = await Patient.findByIdAndDelete(uid);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error });
    }
};

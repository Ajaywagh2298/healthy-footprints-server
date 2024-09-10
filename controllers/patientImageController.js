const PatientImage = require('../models/PatientImage');
const AWS = require('aws-sdk');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const uid = uuidv4();
// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

// Multer middleware for image upload
const upload = multer({ dest: '/tmp/' });

exports.uploadImage = upload.single('image');

exports.createPatientImage = async (req, res) => {
    const { patientUid, type, reason, dateAndTime } = req.body;
    const imageFile = req.file;

    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${patientUid}/${imageFile.filename}`,
            Body: imageFile.buffer
        };
        const uploadResult = await s3.upload(params).promise();

        const newPatientImage = new PatientImage({
            uid,
            patientUid,
            imageUrl: uploadResult.Location,
            type,
            reason,
            dateAndTime
        });
        await newPatientImage.save();
        res.status(201).json({ message: 'Patient image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading patient image', error });
    }
};

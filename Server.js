const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/DBClient');
const bodyParser = require('body-parser')
dotenv.config();

const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const dailyRecordRoutes = require('./routes/dailyRecordRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const patientImageRoutes = require('./routes/patientImageRoutes');
const dietPlanRoutes = require('./routes/dietPlanRoutes');
const medicinePlanRoutes = require('./routes/medicinePlanRoutes');
const stockRoutes = require('./routes/stockRoutes');

connectDB();
const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use((err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.json({
//       message: err.message,
//       stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// });

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dailyRecords', dailyRecordRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/patientImages', patientImageRoutes);
app.use('/api/dietPlans', dietPlanRoutes);
app.use('/api/medicinePlans', medicinePlanRoutes);
app.use('/api/stocks', stockRoutes);


const PORT = process.env.HOST_PORT || 5000;

app.listen(PORT, console.log(`Server running on port - http://localhost:${PORT}`));
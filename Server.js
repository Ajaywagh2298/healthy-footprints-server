const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/DBClient');
const bodyParser = require('body-parser');
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
const ItemRoutes = require('./routes/itemRoutes');
const InventoryUseLogsRoute = require('./routes/inventoryRoute');

connectDB();
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://healthy-footprints-web.vercel.app',
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).send('Hey this is my API running 🥳');
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dailyRecords', dailyRecordRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/patientImages', patientImageRoutes);
app.use('/api/dietPlans', dietPlanRoutes);
app.use('/api/medicinePlans', medicinePlanRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/items', ItemRoutes);
app.use('/api/inventory', InventoryUseLogsRoute);

const PORT = process.env.HOST_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port - http://localhost:${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: "500: INTERNAL_SERVER_ERROR",
            code: "FUNCTION_INVOCATION_FAILED",
            id: "bom1::6d4v8-1725912118020-2f3bc51fbb3a",
            suggestion: "If you are a visitor, contact the website owner or try again later. If you are the owner, learn how to fix the error and check the logs."
        }
    });
});
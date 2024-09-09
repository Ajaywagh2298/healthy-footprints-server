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
const ItemRoutes = require('./routes/itemRoutes')
const InventoryUseLogs = require('./routes/inventoryRoute')

connectDB();
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://healthy-footprints-web.vercel.app',
    credentials: true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
}));
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dailyRecords', dailyRecordRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/patientImages', patientImageRoutes);
app.use('/api/dietPlans', dietPlanRoutes);
app.use('/api/medicinePlans', medicinePlanRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/items', ItemRoutes);
app.use('/api/inventory',InventoryUseLogs)


const PORT = process.env.HOST_PORT || 5000;

app.listen(PORT, console.log(`Server running on port - http://localhost:${PORT}`));
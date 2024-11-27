const express = require('express');
const app = express(); 
const port = 3000;
const sequelize =  require('./config/database.js');
const cors = require('cors')


const { Bus , Route, Driver }= require('./helper/association.js')
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// sequelize.authenticate()
// .then(() => {
//     console.log('Database connection has been established successfully');
// })
// .catch((err) => {
//     console.error('Unabble to connect to the database',err);
// });

app.use(cors())

// Import routes
const userRoutes = require('./routes/userRoutes.js')
const driverRoutes = require('./routes/driverRoutes')
const busRoutes = require('./routes/busRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const assigned_driverRoutes = require('./routes/assigned_driverRoutes')
const assigned_busRoutes = require('./routes/assigned_busRoutes.js')
const routeRoutes = require('./routes/routeRoutes')


// Mount routes
app.use('/users',userRoutes)
app.use('/drivers',driverRoutes)
app.use('/buses', busRoutes)
app.use('/bookings', bookingRoutes)
app.use('/assigned-drivers', assigned_driverRoutes)
app.use('/assigned-buses', assigned_busRoutes)
app.use('/routes', routeRoutes)


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
    
})

module.exports = app;

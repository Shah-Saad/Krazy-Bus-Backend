const express = require('express');
const app = express(); 
const port = 3000;
const sequelize =  require('./config/database.js');


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


// Import routes
const userRoutes = require('./routes/userRoutes.js')
const driverRoutes = require('./routes/driverRoutes')
const busRoutes = require('./routes/busRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const routeRoutes = require('./routes/routeRoutes')


// Mount routes
app.use('/users',userRoutes)
app.use('/drivers',driverRoutes)
app.use('/buses', busRoutes)
app.use('/bookings', bookingRoutes)
app.use('/payments', paymentRoutes)
app.use('/routes', routeRoutes)


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
    
})

module.exports = app;

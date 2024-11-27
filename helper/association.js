const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Driver = require('../models/Driver');
const Assigned_Driver = require('../models/Assigned_Driver');
const Assigned_Bus = require('../models/Assigned_Bus'); 
const Booking = require('../models/Booking'); 
const User = require('../models/User');

// Associations for Bus and Driver through AssignedDriver
Bus.belongsToMany(Driver, {
    through: Assigned_Driver,
    foreignKey: 'bus_id',
    otherKey: 'driver_id',
});
Driver.belongsToMany(Bus, {
    through: Assigned_Driver,
    foreignKey: 'driver_id',
    otherKey: 'bus_id',
});

// Associations for Bus and Route through AssignedBus
Bus.belongsToMany(Route, {
    through: Assigned_Bus,
    foreignKey: 'bus_id',
    otherKey: 'route_id',
});
Route.belongsToMany(Bus, {
    through: Assigned_Bus,
    foreignKey: 'route_id',
    otherKey: 'bus_id',
});

// Associations for Bus and User through Booking
Bus.belongsToMany(User, {
    through: Booking,
    foreignKey: 'bus_id',
    otherKey: 'user_id',
});
User.belongsToMany(Bus, {
    through: Booking,
    foreignKey: 'user_id',
    otherKey: 'bus_id',
});

// Explicit relationships for AssignedBus
Assigned_Bus.belongsTo(Bus, { foreignKey: 'bus_id' });
Assigned_Bus.belongsTo(Route, { foreignKey: 'route_id' });

Route.hasMany(Assigned_Bus, { foreignKey: 'route_id' });
Bus.hasMany(Assigned_Bus, { foreignKey: 'bus_id' });

// Explicit relationships for AssignedDriver
Assigned_Driver.belongsTo(Bus, { foreignKey: 'bus_id' });
Assigned_Driver.belongsTo(Driver, { foreignKey: 'driver_id' });

Bus.hasMany(Assigned_Driver, { foreignKey: 'bus_id' });
Driver.hasMany(Assigned_Driver, { foreignKey: 'driver_id' });

module.exports = {
    Bus,
    Route,
    Driver,
    Assigned_Driver,
    Assigned_Bus,
    Booking,
    User,
};

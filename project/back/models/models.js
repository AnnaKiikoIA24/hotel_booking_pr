const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('Users', {
    ID_User: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    First_Name: {type: DataTypes.STRING, allowNull: false},
    Middle_Name: {type: DataTypes.STRING, allowNull: true},
    Last_Name: {type: DataTypes.STRING, allowNull: false},
    Password: {type: DataTypes.STRING, allowNull: false},
    Email: {type: DataTypes.STRING, unique: true, allowNull: false},
    Phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    Credit_Card_Number: {type: DataTypes.CHAR, unique: true, allowNull: true},
    Blood_Type: {type: DataTypes.CHAR, allowNull: true},
    Birthday: {type: DataTypes.DATE, allowNull: false},
    Gender: {type: DataTypes.BOOLEAN, allowNull: false},
    ID_Ref_Role: {type: DataTypes.INTEGER, allowNull: false}
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt to be added to DB(by Sequelize module)

const UserRole = sequelize.define('Users_Roles', {
    ID_Role: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false, defaultValue: 'USER'},
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt


const Guest = sequelize.define('Guests', {
    ID_Guest: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    First_Name: {type: DataTypes.STRING, allowNull: false},
    Middle_Name: {type: DataTypes.STRING, allowNull: true},
    Last_Name: {type: DataTypes.STRING, allowNull: false},
    Passport_Number: {type: DataTypes.STRING, allowNull: false},
    Passport_Date: {type: DataTypes.DATE, allowNull: false},
    Phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    Gender: {type: DataTypes.BOOLEAN, allowNull: false},
    ID_Ref_User: {type: DataTypes.INTEGER, allowNull: true},
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt

const Apartment = sequelize.define('Apartments', {
    ID_Apart: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Floor: {type: DataTypes.INTEGER, allowNull: false},
    Number_Of_Apartment: {type: DataTypes.INTEGER, allowNull: false},
    ID_Ref_Apart_Class: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt

const ApartmentClass = sequelize.define('Apartments_Classes', {
    ID_Apart_Class: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Number_Of_Rooms: {type: DataTypes.INTEGER, allowNull: false},
    Max_Number_Of_Guests: {type: DataTypes.INTEGER, allowNull: false},
    Price: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt

const Booking = sequelize.define('Booking', {
    ID_Booking: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Ref_User :  {type: DataTypes.INTEGER, allowNull: false},
    ID_Ref_Apart: {type: DataTypes.INTEGER, allowNull: false},
    Start_Date: {type: DataTypes.DATE, allowNull: false},
    End_Date: {type: DataTypes.DATE, allowNull: false},
    Confirmed_Booking: {type: DataTypes.BOOLEAN, allowNull: false},
    Is_Paid: {type: DataTypes.BOOLEAN, allowNull: false},
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt

const LinkBookingGuest = sequelize.define('Link_Booking_Guests', {
    ID_Link_BG: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Ref_Booking: {type: DataTypes.INTEGER, allowNull: false},
    ID_Ref_Guest: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false, createdAt: false, updatedAt: false,})// If don't want createdAt&updatedAt

/*
const LinkBookingUser = sequelize.define('Link_Booking_Users', {
    ID_Link_BU: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //ID_Ref_Booking: {type: DataTypes.INTEGER, allowNull: false},
    //ID_Ref_User: {type: DataTypes.INTEGER, allowNull: false},
})
*/

UserRole.hasOne(User, { foreignKey: 'ID_Ref_Role', as: 'Users'})
User.belongsTo(UserRole, { foreignKey: 'ID_Ref_Role', as: 'UsersRoles'})

Guest.hasOne(User, { foreignKey: 'ID_Ref_User', as: 'Users'})
User.belongsTo(Guest, { foreignKey: 'ID_Ref_User', as: 'Guests'})

ApartmentClass.hasOne(Apartment, { foreignKey: 'ID_Ref_Apart_Class', as: 'Apartments', constraints: false })
Apartment.belongsTo(ApartmentClass, { foreignKey: 'ID_Ref_Apart_Class', as: 'Apartments_Classes', constraints: false })

User.hasMany(Booking, { foreignKey: 'ID_Ref_User', as: 'Bookings', constraints: false });
Booking.belongsTo(User, { foreignKey: 'ID_Ref_User', as: 'Users', constraints: false });

Apartment.hasOne(Booking, { foreignKey: 'ID_Ref_Apart', as: 'Bookings', constraints: false });
Booking.belongsTo(Apartment, { foreignKey: 'ID_Ref_Apart', as: 'Apartments', constraints: false });


Guest.belongsToMany(Booking, {through: LinkBookingGuest})
Booking.belongsToMany(Guest, {through: LinkBookingGuest})

//sequelize.sync({alter: true}) DO NOT USE

module.exports = {
    User, 
    UserRole,
    Apartment, 
    ApartmentClass, 
    Guest,
    Booking, 
    LinkBookingGuest, 

}
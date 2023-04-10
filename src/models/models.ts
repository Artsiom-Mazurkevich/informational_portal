// import { Sequelize, Model, DataTypes } from 'sequelize'
// import dotenv from 'dotenv'
// dotenv.config()
//
// const sequelize = new Sequelize(process.env.CONNECTION_DB_STRING || '', {
//     dialect: 'postgres',
//     logging: false,
//     ssl: true,
// })
//
// const Role = sequelize.define('role', {
//     role: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isIn: [['ADMIN', 'USER', 'MODERATOR']],
//         },
//     },
// })
//
// const Password = sequelize.define('password', {
//     password: { type: DataTypes.STRING, allowNull: false },
// })
//
// const User = sequelize.define('user', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING },
//     surname: { type: DataTypes.STRING },
//     email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
//     photo: { type: DataTypes.STRING },
//     phone: { type: DataTypes.STRING },
//     role_id: {
//         type: DataTypes.INTEGER,
//         defaultValue: 2,
//         references: {
//             model: Role,
//             key: 'id',
//         },
//     },
//     password_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Password,
//             key: 'id',
//         },
//     },
// })
//
// const Basket = sequelize.define('basket', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })
//
// const BasketDevice = sequelize.define('basket_device', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })
//
// const Device = sequelize.define('device', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true, allowNull: false },
//     price: { type: DataTypes.INTEGER, allowNull: false },
//     rating: { type: DataTypes.INTEGER, defaultValue: 0 },
//     img: { type: DataTypes.STRING, allowNull: false },
// })
//
// const Type = sequelize.define('type', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true, allowNull: false },
// })
// const Brand = sequelize.define('brand', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true, allowNull: false },
// })
//
// const Rating = sequelize.define('rating', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     rate: { type: DataTypes.INTEGER, allowNull: false },
// })
//
// const DeviceInfo = sequelize.define('device_info', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING, allowNull: false },
//     description: { type: DataTypes.STRING, allowNull: false },
// })
//
// const TypeBrand = sequelize.define('type_brand', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// User.hasOne(Password)
// Password.belongsTo(User)

// User.hasOne(Basket)
// Basket.belongsTo(User)
//
// User.hasMany(Rating)
// Rating.belongsTo(User)
//
// Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)
//
// Type.hasMany(Device)
// Device.belongsTo(Type)
//
// Brand.hasMany(Device)
// Device.belongsTo(Brand)
//
// Device.hasMany(Rating)
// Rating.belongsTo(Device)
//
// Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)
//
// Device.hasMany(DeviceInfo, { as: 'info' })
// DeviceInfo.belongsTo(Device)
//
// Type.belongsToMany(Brand, { through: TypeBrand })
// Brand.belongsToMany(Type, { through: TypeBrand })

// export const create = async () => {
//     try {
//         // Создание таблиц в базе данных
//         console.log('dfsihghiudkgsfhj')
//         await sequelize.sync({ force: true })
//     } catch (error) {
//         console.error('Ошибка:', error)
//     }
// }

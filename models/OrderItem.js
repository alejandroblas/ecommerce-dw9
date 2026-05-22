// models/OrderItem.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id:       { type: DataTypes.INTEGER,        primaryKey: true, autoIncrement: true },
  // En models/OrderItem.js — AGREGAR:
store_id: {type: DataTypes.INTEGER,allowNull: true,references: { model: 'stores', key: 'id' }},
  quantity: { type: DataTypes.INTEGER,        allowNull: false },
  // Precio al momento de la compra (snapshot)
  price:    { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = OrderItem;
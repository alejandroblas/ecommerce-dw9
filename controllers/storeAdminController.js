// controllers/storeAdminController.js  (1/3) — Dashboard y listado
const { Store, Product, Order, OrderItem } = require('../models');
const { Op } = require('sequelize');

// GET /store-admin/dashboard
const dashboard = async (req, res) => {
  const storeId = req.session.storeId;
  const store   = await Store.findByPk(storeId);

  // Ventas del mes actual
  const now        = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const items = await OrderItem.findAll({
    where: { store_id: storeId, createdAt: { [Op.gte]: monthStart } },
    include: [{ model: Order, as: 'order' }]
  });
  const monthSales  = items.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);
  const orderCount  = new Set(items.map(i => i.order_id)).size;
  const productCount= await Product.count({ where: { store_id: storeId } });

  res.render('store-admin/dashboard', { layout: false,
    store, monthSales: monthSales.toFixed(2), orderCount, productCount
  });
};

// GET /store-admin/products
const listProducts = async (req, res) => {
  const products = await Product.findAll({
    where: { store_id: req.session.storeId },
    order: [['createdAt', 'DESC']]
  });
  res.render('store-admin/products', { layout: false, products });
};
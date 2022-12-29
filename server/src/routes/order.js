const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const OrderController = require('../app/controllers/OrderController');

// All get Authorization

// new Order 
router.post('/new', isAuthenticatedUser, OrderController.newOrder);

// User Order User can Have Multi Order
router.get('/myOrders', isAuthenticatedUser, OrderController.myOrders);

// User Once Order
router.get('/me/:id', isAuthenticatedUser, OrderController.getSingleOrder);


// Update Status Order by Admin
router.put(
   '/admin/updateStatus/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   OrderController.updateStatusOrder,
);

// Delete Order of Admin
router.delete(
   '/admin/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   OrderController.deleteOrders,
);

// Get All Order by Admin
router.get(
   '/admin',
   isAuthenticatedUser,
   authorizeRole('admin'),
   OrderController.getAllOrder,
);

module.exports = router;

import express from 'express';
import { createOrder, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders (place demo order with validation & price recalculation)
router.post('/', createOrder);

// GET /api/orders/:id (fetch single demo order details)
router.get('/:id', getOrderById);

export default router;

import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products (supports ?pet=..., ?search=..., ?sort=..., ?featured=true)
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

export default router;

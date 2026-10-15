import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { readProductsFromFile } from './productController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ordersFilePath = path.join(__dirname, '../data/orders.json');

// Helper to safely read existing orders
const readOrdersFromFile = async () => {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist yet, return empty list
    return [];
  }
};

// Helper to save orders to file
const saveOrdersToFile = async (orders) => {
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
};

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { customer, items, notes } = req.body;

    // 1. Customer Details Validation
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: 'Customer information is required.'
      });
    }

    const { fullName, phone, email, address, city, state, pincode } = customer;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }

    // Phone validation: Indian standard 10 digits check (or international)
    const cleanedPhone = phone ? phone.replace(/[\s-]/g, '') : '';
    if (!cleanedPhone || cleanedPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({ success: false, message: 'Delivery address is required.' });
    }

    if (!city || !city.trim()) {
      return res.status(400).json({ success: false, message: 'City is required.' });
    }

    if (!state || !state.trim()) {
      return res.status(400).json({ success: false, message: 'State is required.' });
    }

    if (!pincode || !pincode.trim() || pincode.trim().length < 6) {
      return res.status(400).json({ success: false, message: 'A valid 6-digit PIN code is required.' });
    }

    // 2. Items Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one product.'
      });
    }

    // 3. Server-side Price Recalculation from Master Products JSON
    const masterProducts = await readProductsFromFile();
    const verifiedItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const product = masterProducts.find(p => p.id === item.id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID '${item.id}' is invalid or no longer available.`
        });
      }

      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const itemTotal = product.price * quantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        quantity: quantity,
        total: itemTotal
      });
    }

    // Free delivery above ₹999, else ₹99 delivery fee
    const deliveryFee = calculatedSubtotal >= 999 ? 0 : 99;
    const grandTotal = calculatedSubtotal + deliveryFee;

    // 4. Generate Unique Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PAW-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    const newOrder = {
      orderId,
      status: 'Confirmed (Demo Processing)',
      paymentMethod: 'Cash on Delivery (Demo Mode)',
      customer: {
        fullName: fullName.trim(),
        phone: cleanedPhone,
        email: email ? email.trim() : null,
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim()
      },
      items: verifiedItems,
      pricing: {
        currency: '₹',
        subtotal: calculatedSubtotal,
        deliveryFee: deliveryFee,
        grandTotal: grandTotal,
        isFreeDelivery: deliveryFee === 0
      },
      notes: notes || 'Demo educational order',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '3 - 5 Business Days'
    };

    // 5. Save order locally in backend/data/orders.json
    const orders = await readOrdersFromFile();
    orders.unshift(newOrder); // newest first
    await saveOrdersToFile(orders);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! This is an educational demo order.',
      data: newOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process order. Please try again.'
    });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await readOrdersFromFile();
    const order = orders.find(o => o.orderId === id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(`Error fetching order ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details.'
    });
  }
};

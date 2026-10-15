import express from 'express';
import { getEmergencyContacts } from '../controllers/emergencyController.js';

const router = express.Router();

// GET /api/emergency (returns emergency doctors and ambulance services)
router.get('/', getEmergencyContacts);

export default router;

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const emergencyFilePath = path.join(__dirname, '../data/emergencyContacts.json');

// GET /api/emergency
export const getEmergencyContacts = async (req, res) => {
  try {
    const rawData = await fs.readFile(emergencyFilePath, 'utf-8');
    const data = JSON.parse(rawData);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error reading emergency contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load emergency contacts.'
    });
  }
};

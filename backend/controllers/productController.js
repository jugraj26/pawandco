import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper to read products safely
export const readProductsFromFile = async () => {
  const data = await fs.readFile(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

// GET /api/products
// Supports: ?pet=dogs or ?category=dogs, ?search=..., ?sort=price-asc/price-desc, ?featured=true
export const getProducts = async (req, res) => {
  try {
    const products = await readProductsFromFile();
    const { pet, category, search, sort, featured } = req.query;

    let filtered = [...products];

    // Filter by pet category (e.g. ?pet=dogs or ?category=dogs)
    const categoryFilter = pet || category;
    if (categoryFilter && categoryFilter.toLowerCase() !== 'all') {
      const cleanCat = categoryFilter.toLowerCase();
      filtered = filtered.filter(p => p.category.toLowerCase() === cleanCat);
    }

    // Filter by search keyword
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      );
    }

    // Filter by featured status
    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured === true);
    }

    // Sort
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products. Please try again later.'
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await readProductsFromFile();
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(`Error fetching product ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching product details.'
    });
  }
};

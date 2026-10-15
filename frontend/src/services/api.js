// PAW & CO — API Client Service
// Uses browser Fetch API to communicate with Node/Express backend

const API_BASE = '/api';

/**
 * Fetch all products or filtered products
 * @param {Object} params - Query filters like { pet, search, sort, featured }
 */
export async function getProducts(params = {}) {
  const query = new URLSearchParams();

  if (params.pet) query.append('pet', params.pet);
  if (params.category) query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.sort) query.append('sort', params.sort);
  if (params.featured) query.append('featured', params.featured);

  const url = `${API_BASE}/products${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data || [];
}

/**
 * Fetch a single product by its unique ID
 * @param {string} id - Product ID (e.g. 'dog-1')
 */
export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Product not found`);
  }
  const data = await res.json();
  return data.data;
}

/**
 * Submit a customer order to the backend
 * @param {Object} orderPayload - { customer, items, notes }
 */
export async function createOrder(orderPayload) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderPayload)
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to place order');
  }
  return data;
}

/**
 * Fetch emergency veterinarian and ambulance contacts
 */
export async function getEmergencyContacts() {
  const res = await fetch(`${API_BASE}/emergency`);
  if (!res.ok) {
    throw new Error('Failed to load emergency directory');
  }
  const data = await res.json();
  return data.data;
}

/**
 * Backend health check
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}

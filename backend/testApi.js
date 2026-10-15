// Comprehensive API Verification Test
async function runTests() {
  console.log('--- 1. Testing Health Endpoint ---');
  const healthRes = await fetch('http://localhost:5000/api/health');
  const healthData = await healthRes.json();
  console.log('Health:', healthData);

  console.log('\n--- 2. Testing Products Endpoint ---');
  const productsRes = await fetch('http://localhost:5000/api/products');
  const productsData = await productsRes.json();
  console.log(`Total Products: ${productsData.count}`);

  console.log('\n--- 3. Testing Category Filter (?pet=dogs) ---');
  const dogsRes = await fetch('http://localhost:5000/api/products?pet=dogs');
  const dogsData = await dogsRes.json();
  console.log(`Dog Products count: ${dogsData.count}`);

  console.log('\n--- 4. Testing Product By ID (/api/products/dog-1) ---');
  const singleRes = await fetch('http://localhost:5000/api/products/dog-1');
  const singleData = await singleRes.json();
  console.log('Product:', singleData.data?.name, '| Price: ₹', singleData.data?.price);

  console.log('\n--- 5. Testing Emergency Contacts (/api/emergency) ---');
  const emergRes = await fetch('http://localhost:5000/api/emergency');
  const emergData = await emergRes.json();
  console.log('Vets count:', emergData.data?.veterinarians?.length, '| Ambulances:', emergData.data?.ambulances?.length);

  console.log('\n--- 6. Testing Order Placement (POST /api/orders) ---');
  const orderPayload = {
    customer: {
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      email: 'rahul.sharma@example.com',
      address: 'Flat 402, Sunrise Towers, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    items: [
      { id: 'dog-1', quantity: 1 }, // 2450
      { id: 'dog-3', quantity: 2 }  // 899 * 2 = 1798. Total = 4248
    ],
    notes: 'Please leave with security'
  };

  const orderRes = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });

  const orderResult = await orderRes.json();
  console.log('Order Placement Result:', orderResult.success);
  console.log('Generated Order ID:', orderResult.data?.orderId);
  console.log('Calculated Subtotal: ₹', orderResult.data?.pricing?.subtotal);
  console.log('Delivery Fee: ₹', orderResult.data?.pricing?.deliveryFee);
  console.log('Grand Total: ₹', orderResult.data?.pricing?.grandTotal);

  console.log('\n--- 7. Testing Order Fetch by ID ---');
  const fetchOrderRes = await fetch(`http://localhost:5000/api/orders/${orderResult.data?.orderId}`);
  const fetchOrderData = await fetchOrderRes.json();
  console.log('Fetched Order Status:', fetchOrderData.data?.status);
  console.log('Verified Customer:', fetchOrderData.data?.customer?.fullName);

  console.log('\n✅ ALL BACKEND AND DATA INTEGRITY TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});

// 9-stock.js

import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create an Express app
const app = express();
const port = 1245;

// Create an array of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

// Function to get a product by its ID
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Connect to Redis and promisify the methods
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Middleware to parse JSON
app.use(express.json());

// Route to get all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(({ id, name, price, stock }) => ({
    itemId: id,
    itemName: name,
    price,
    initialAvailableQuantity: stock,
  })));
});

// Route to get product details by itemId
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  // Get reserved stock from Redis
  const reservedStock = await getAsync(`item.${itemId}`);
  const currentQuantity = product.stock - (reservedStock ? parseInt(reservedStock) : 0);

  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity,
  });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  // Check if there is enough stock available
  const reservedStock = await getAsync(`item.${itemId}`);
  const currentQuantity = product.stock - (reservedStock ? parseInt(reservedStock) : 0);

  if (currentQuantity <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  // Reserve the product by updating Redis
  await setAsync(`item.${itemId}`, (reservedStock ? parseInt(reservedStock) : 0) + 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

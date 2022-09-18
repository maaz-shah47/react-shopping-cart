const data = require('./src/data.json');
const shortId = require('shortid');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});
mongoose.connect('mongodb://localhost:27017/react-shopping-cart');

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get('/api/products', async (req, res, next) => {
  const products = await Product.find({});
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
});

app.post('/api/products/seed', async (req, res) => {
  await Product.insertMany(data);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();

  res.send(savedProduct);
});

app.delete('/api/product/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log('Server is running at http://localhost:5000')
);

const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { type } = require('os');
require('dotenv').config();

const app = express();
const port = 3010 || process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('static'));

mongoose.connect(process.env.MONGO_URL ||  "mongodb+srv://dhairyajangirs73:dhairya123@cluster0.fe8x2.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log('Connected to MongoDB'); })
  .catch((err) => { console.error(err); });

// define menuItems schema
const menuItemsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: String,
  price: {type: Number, required: true},
});

const menuItemsModel = mongoose.model('menuItems', menuItemsSchema);

// update menu item
app.put('/menuItems/:id', async (req, res) => {
  try {
    const {name, price, description} = req.body;
    const updatedMenuItem = await menuItemsModel.findByIdAndUpdate(req.params.id, {name, price, description}, {new: true});
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

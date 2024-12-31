const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const connectWithRetry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    }
};

connectWithRetry();

const wishlistSchema = new mongoose.Schema({
    item: { type: String, required: true },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

app.get('/api/wishlist', async (req, res) => {
    try {
        const items = await Wishlist.find();
        res.send(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/wishlist', async (req, res) => {
    try {
        const newItem = new Wishlist({ item: req.body.item });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/wishlist/:id', async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.send({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

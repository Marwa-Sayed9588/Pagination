// server.js
const express = require('express');
const app = express();
const PORT = 4000;

// Sample data: an array of items (for example, users)
const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

app.use(express.static('public'));

// API to get paginated items
app.get('/api/items', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get page number from query
    const limit = parseInt(req.query.limit) || 10; // Items per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex);
    res.json({
        page,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / limit),
        items: paginatedItems,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

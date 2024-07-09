  const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const corsOptions = {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Addresskey', 'X-Content', 'X-Experience', 'X-Lat', 'X-Lng', 'X-Locale', 'X-Mp', 'X-Platform', 'X-Visitor-Id'],
    credentials: true
};

app.use(cors(corsOptions));
// app.use(cors());
app.use('/', (req, res) => {
    const url = req.url.substring(1);
    req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});  

/* -------------------------------------------------------------------------- */

/* const express = require('express');
const cors = require('cors');
const app = express();
const app2="out"
// Enable CORS with custom options
const corsOptions = {
    origin: 'http://localhost:1234', // Replace with your client's URL
    methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If your client needs to send credentials (cookies, auth headers)
};

app.use(cors(corsOptions));

// Your API routes and other middleware
app.get('/api/data', (req, res) => {
    // Handle GET requests
});

app.post('/api/search', (req, res) => {
    // Handle POST requests
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); */

/* ---------------------------------------------------------------- */

/* const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS with custom options
const corsOptions = {
    origin: 'http://localhost:1234', // Replace with your client's URL
    methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If your client needs to send credentials (cookies, auth headers)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Example API routes
app.get('/api/data', (req, res) => {
    // Handle GET requests
    res.send('GET request received');
});

app.post('/api/search', (req, res) => {
    console.log('POST request received at /api/search');
    // Handle POST requests
    res.send('POST request received');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); */

/*  PRECTICE COMPOENET ------------------------------------- */




/* ----------------------------------------------------------------- */

/* ----------------------------------------------------------------- */

/* const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();

// Enable CORS with custom options
const corsOptions = {
    origin: 'http://localhost:1234', // Replace with your client's URL
    methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If your client needs to send credentials (cookies, auth headers)
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON request bodies

// Example API route to handle POST requests
app.post('/api/search', async (req, res) => {
    try {
        const payload = req.body;
        const apiUrl = 'https://food.noon.com/_svc/mp-food-api-catalog/api/search';

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json'
            }
        });

        // Example: Send the response data back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors gracefully
    }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 */
/* ---------------------------------------------------------- */
/* 
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Enable CORS with custom options
const corsOptions = {
    origin: 'http://localhost:1234', // Replace with your client's URL
    methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If your client needs to send credentials (cookies, auth headers)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Example API routes
app.get('/api/data', (req, res) => {
    // Handle GET requests
    res.send('GET request received');
});

app.post('/api/search', (req, res) => {
    // Handle POST requests
    res.send('POST request received');
});

// Proxy setup for Noon API
app.use('/_svc/mp-food-api-catalog/api', createProxyMiddleware({
    target: 'https://food.noon.com',
    changeOrigin: true,
    pathRewrite: {
        '^/_svc/mp-food-api-catalog/api': '/_svc/mp-food-api-catalog/api'
    }
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 */

/* ---------------------------------------------------- */

/* const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:1234'
}));
app.use(express.json());

app.post('/_svc/mp-food-api-catalog/api/search', async (req, res) => {
    try {
        const response = await axios.post('https://food.noon.com/_svc/mp-food-api-catalog/api/search', req.body, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
 */

/* const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:1234'
}));
app.use(express.json());

app.post('/_svc/mp-food-api-catalog/api/search', async (req, res) => {
    try {
        const response = await axios.post('https://food.noon.com/_svc/mp-food-api-catalog/api/search', req.body, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
 */

/* const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true,
}));
app.use(express.json());

app.post('/_svc/mp-food-api-catalog/api/search', async (req, res) => {
    console.log('Received request at /_svc/mp-food-api-catalog/api/search');
    console.log('Request body:', req.body);
    try {
        const response = await axios.post('https://food.noon.com/_svc/mp-food-api-catalog/api/search', req.body, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
                'Content-Type': 'application/json',
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}); */

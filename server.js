/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json());

const allowedOrigins = ['https://bajaj-frontend-1t2d-noxfsgxbd-prasad217s-projects.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

const fullName = 'KARNAM NITHIN';
const dob = '30092003';
const email = 'karnamnithin@gmail.com';
const rollNumber = '21BAI1091';

function separateData(data) {
    const numbers = [];
    const alphabets = [];
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
        }
    });
    return { numbers, alphabets };
}

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ is_success: false, error: 'Invalid input' });
    }

    const { numbers, alphabets } = separateData(data);
    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    const response = {
        is_success: true,
        user_id: `${fullName.replace(/\s+/g, '_')}_${dob}`,
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };

    res.status(200).json(response);
});

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });

    ws.send('Hello! Message From Server!!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const user_id = "Karnam Nithin";
const email = "karnamnithin@gmail.com";
const roll_number = "21BAI1091";

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    // Input validation: Ensure 'data' is provided and is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. 'data' should be an array.",
      });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (
        typeof item === "string" &&
        item.length === 1 &&
        /[a-zA-Z]/.test(item)
      ) {
        alphabets.push(item);
        if (/[a-z]/.test(item)) {
          if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    });

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

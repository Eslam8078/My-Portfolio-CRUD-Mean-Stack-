const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/about', require('./models/about'));
app.use('/api/home', require('./models/home'));
app.use('/api/education', require('./models/education'));
app.use('/api/contact', require('./models/contact'));
app.use('/api/experience', require('./models/experience'));
app.use('/api/projects', require('./models/projects'));
app.use('/api/skills', require('./models/skills'));

mongoose.connect('mongodb://localhost:27017/testDB').then(() => console.log('Database connected')).catch(error => console.error('MongoDB Error:', error));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
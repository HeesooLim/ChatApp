const express = require('express');
const cors = require('cors');

const authRouthes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.get('/', (req, res) => {
    res.send('hello, world!');
});

app.use('/auth', authRouthes);

app.listen(PORT, () => console.log('Server running on port ' + PORT));

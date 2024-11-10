const cors = require('cors')
const express = require('express');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors())
app.use(express.json()); //parse the request body into a JavaScript object or the req.body would be undefined
app.use('/',userRoutes)

app.listen(5050, console.log('server live on 5050'))
// start: nodemon app.js
require ('dotenv').config ();
const bodyParser = require ('body-parser');
const express = require ('express');
const path = require ('path');
const logger = require ('morgan');
const otpservice = require ('./services/otpservice');

// This cors is added for testing purpose only
const cors = require ('cors');

const {Router} = require ('express');
const port = process.env.PORT;

const userRouter = require ('./routers/user');

const mentorRouter = require ('./routers/mentor');

const test_mentor = require ('./routers/test_mentor');

const parentRouter = require ('./routers/parent');

const videoRouter = require ('./routers/video');

const chatThreadRouter = require ('./routers/chat');

const TaskRouter = require ('./routers/task');

require ('./db/conn');
const testing = require ('./routers/testing');

const app = express ();

// Using cors over here
app.use (cors ());

app.use (logger ('dev'));

var multer = require ('multer');
// var upload = multer({ dest: './uploads' });

// app.use ('/', express.static (path.join (__dirname, 'static')));
app.use (express.static (path.join (__dirname, 'uploads')));

// app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));

app.use (bodyParser.json ());

app.use ('/api', userRouter);
app.use ('/api', mentorRouter);
app.use ('/api', test_mentor);
app.use ('/api', parentRouter);
app.use ('/api', videoRouter);
app.use ('/api', chatThreadRouter);
app.use ('/api', TaskRouter);
app.use ('/api', testing);

app.listen (port, () => {
  console.log (`Server up at ${port}`);
});

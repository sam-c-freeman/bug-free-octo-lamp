const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// const {cloudinary } = require('./utils/cloudinary.js');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const recipeRouter = require('./routes/recipes.router');
const cupboardRouter = require('./routes/cupboard.router.js');
const ingredientsRouter = require('./routes/ingredients.router.js');
const uploadRouter = require('./routes/upload.router');

// Body parser middleware
//updated this for Cloudinary

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/cupboard', cupboardRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/upload', uploadRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

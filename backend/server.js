```javascript
/**
 * Sets up the Express.js server.
 * @module server
 */

const express = require('express');
const supabase = require('./config/supabase');
const calculationRoutes = require('./routes/calculationRoutes');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

/**
 * Creates an Express.js application instance.
 * @returns {Express} The Express.js application instance.
 */
function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  app.use(limiter);

  app.use('/api', calculationRoutes);

  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  return app;
}

/**
 * Starts the Express.js server.
 * @param {Express} app The Express.js application instance.
 */
function startServer(app) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

/**
 * Initializes the Supabase client.
 * @returns {Promise<void>} A promise that resolves when the Supabase client is initialized.
 */
async function initSupabase() {
  try {
    await supabase.init({
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
    });
    console.log('Supabase client initialized');
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    process.exit(1);
  }
}

/**
 * Main function.
 * @returns {Promise<void>} A promise that resolves when the server is started.
 */
async function main() {
  await initSupabase();
  const app = createApp();
  startServer(app);
}

main();
```
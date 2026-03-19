```javascript
/**
 * Defines the routes for calculation-related requests.
 * @module backend/routes/calculationRoutes
 */

const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculationController');
const rateLimit = require('express-rate-limit');

/**
 * Rate limiting middleware to prevent excessive requests.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

/**
 * POST /api/calculate
 * Perform a calculation.
 * @param {number} req.body.num1 - The first number.
 * @param {number} req.body.num2 - The second number.
 * @param {string} req.body.operation - The operation to perform (e.g., '+', '-', '*', '/').
 * @returns {number} The result of the calculation.
 */
router.post('/api/calculate', limiter, async (req, res) => {
  try {
    const { num1, num2, operation } = req.body;
    if (!num1 || !num2 || !operation) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const result = await calculationController.calculate(num1, num2, operation);
    return res.json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * GET /api/history
 * Get calculation history.
 * @returns {array} An array of calculation history objects.
 */
router.get('/api/history', limiter, async (req, res) => {
  try {
    const history = await calculationController.getHistory();
    return res.json({ history });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
```
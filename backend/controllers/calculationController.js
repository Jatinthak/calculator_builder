```javascript
/**
 * Calculation Controller
 * Handles calculation-related requests
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseSecret = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

/**
 * Calculates the result of a mathematical operation
 * @param {number} num1 The first number
 * @param {number} num2 The second number
 * @param {string} operation The mathematical operation to perform
 * @returns {number} The result of the calculation
 */
function calculateResult(num1, num2, operation) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return num1 / num2;
    default:
      throw new Error('Invalid operation');
  }
}

/**
 * Handles the POST /api/calculate request
 * @param {express.Request} req The request object
 * @param {express.Response} res The response object
 */
async function calculate(req, res) {
  try {
    const { num1, num2, operation } = req.body;
    if (!num1 || !num2 || !operation) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({ error: 'Invalid number format' });
    }
    if (typeof operation !== 'string') {
      return res.status(400).json({ error: 'Invalid operation format' });
    }
    const result = calculateResult(num1, num2, operation);
    const id = uuidv4();
    const createdAt = new Date();
    const calculation = {
      id,
      num1,
      num2,
      operation,
      result,
      created_at: createdAt,
    };
    const { data, error } = await supabase
      .from('calculations')
      .insert([calculation]);
    if (error) {
      throw error;
    }
    return res.json({ result: data[0].result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Handles the GET /api/history request
 * @param {express.Request} req The request object
 * @param {express.Response} res The response object
 */
async function getHistory(req, res) {
  try {
    const { data, error } = await supabase
      .from('calculations')
      .select('id, num1, num2, operation, result, created_at');
    if (error) {
      throw error;
    }
    return res.json({ history: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  calculate,
  getHistory,
};
```
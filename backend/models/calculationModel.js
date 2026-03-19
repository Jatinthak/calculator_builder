```javascript
/**
 * Calculation model for the calculator application.
 * @module calculationModel
 */

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

/**
 * Create a new calculation.
 * @param {Object} calculation - The calculation to create.
 * @param {number} calculation.num1 - The first number.
 * @param {number} calculation.num2 - The second number.
 * @param {string} calculation.operation - The operation to perform.
 * @returns {Promise<Object>} The created calculation.
 */
async function createCalculation(calculation) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('calculations')
      .insert([
        {
          num1: calculation.num1,
          num2: calculation.num2,
          operation: calculation.operation,
          result: performCalculation(calculation.num1, calculation.num2, calculation.operation),
        },
      ]);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    throw new Error(`Failed to create calculation: ${error.message}`);
  }
}

/**
 * Get the calculation history.
 * @returns {Promise<Array<Object>>} The calculation history.
 */
async function getCalculationHistory() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('calculations').select('*');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to get calculation history: ${error.message}`);
  }
}

/**
 * Perform a calculation.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @param {string} operation - The operation to perform.
 * @returns {number} The result of the calculation.
 */
function performCalculation(num1, num2, operation) {
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
      throw new Error(`Invalid operation: ${operation}`);
  }
}

module.exports = {
  createCalculation,
  getCalculationHistory,
};
```
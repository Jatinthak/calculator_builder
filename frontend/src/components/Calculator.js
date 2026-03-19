```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Calculator component.
 * 
 * @returns {JSX.Element} The calculator component.
 */
function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the calculation.
   * 
   * @param {React.FormEvent<HTMLFormElement>} event The form event.
   */
  const handleCalculate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/calculate', {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operation,
      });

      setResult(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the change of the first number input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event The input event.
   */
  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  };

  /**
   * Handles the change of the second number input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event The input event.
   */
  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  };

  /**
   * Handles the change of the operation select.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} event The select event.
   */
  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  return (
    <div>
      <h1>Calculator</h1>
      <form onSubmit={handleCalculate}>
        <label>
          Number 1:
          <input type="number" value={num1} onChange={handleNum1Change} />
        </label>
        <br />
        <label>
          Operation:
          <select value={operation} onChange={handleOperationChange}>
            <option value="">Select an operation</option>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
        <br />
        <label>
          Number 2:
          <input type="number" value={num2} onChange={handleNum2Change} />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Calculate
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : result ? (
        <p>Result: {result}</p>
      ) : (
        <p>Please enter numbers and an operation to calculate.</p>
      )}
    </div>
  );
}

export default Calculator;
```
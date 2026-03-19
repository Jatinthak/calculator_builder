```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calculator from './components/Calculator';
import History from './components/History';

/**
 * The main App component.
 * @returns {JSX.Element} The App component.
 */
function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the calculation request.
   * @param {string} num1 The first number.
   * @param {string} num2 The second number.
   * @param {string} operation The operation to perform.
   */
  const handleCalculate = async (num1, num2, operation) => {
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
   * Fetches the calculation history.
   */
  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/history');
      setHistory(response.data.history);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>Calculator</h1>
      <Calculator
        num1={num1}
        setNum1={setNum1}
        num2={num2}
        setNum2={setNum2}
        operation={operation}
        setOperation={setOperation}
        handleCalculate={handleCalculate}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Result: {result}</p>
      )}
      <History history={history} />
    </div>
  );
}

export default App;
```
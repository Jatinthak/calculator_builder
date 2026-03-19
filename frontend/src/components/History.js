```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * History component for displaying calculation history.
 * @returns {JSX.Element} The History component.
 */
function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the calculation history from the backend API.
   * @async
   */
  const fetchHistory = async () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (history.length === 0) {
    return <div>No calculation history found.</div>;
  }

  return (
    <div>
      <h2>Calculation History</h2>
      <ul>
        {history.map((calculation, index) => (
          <li key={index}>
            {calculation.num1} {calculation.operation} {calculation.num2} = {calculation.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
```
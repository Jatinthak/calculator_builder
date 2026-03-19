```javascript
const request = require('supertest');
const app = require('../../backend/server');
const CalculationController = require('../../backend/controllers/calculationController');
const CalculationModel = require('../../backend/models/calculationModel');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const jwtSecret = process.env.JWT_SECRET;

/**
 * Test the calculation controller
 */
describe('Calculation Controller', () => {
  /**
   * Test the calculate method
   */
  it('should perform a calculation', async () => {
    const num1 = 10;
    const num2 = 5;
    const operation = 'add';
    const response = await request(app)
      .post('/api/calculate')
      .send({ num1, num2, operation });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(15);
  });

  /**
   * Test the calculate method with invalid operation
   */
  it('should return an error for invalid operation', async () => {
    const num1 = 10;
    const num2 = 5;
    const operation = 'invalid';
    const response = await request(app)
      .post('/api/calculate')
      .send({ num1, num2, operation });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid operation');
  });

  /**
   * Test the calculate method with missing parameters
   */
  it('should return an error for missing parameters', async () => {
    const num1 = 10;
    const response = await request(app)
      .post('/api/calculate')
      .send({ num1 });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing parameters');
  });

  /**
   * Test the get history method
   */
  it('should return the calculation history', async () => {
    const response = await request(app).get('/api/history');
    expect(response.status).toBe(200);
    expect(response.body.history).toBeInstanceOf(Array);
  });

  /**
   * Test the get history method with no calculations
   */
  it('should return an empty array for no calculations', async () => {
    // Clear the calculations table
    const supabase = require('../../config/supabase');
    await supabase.from('calculations').delete();
    const response = await request(app).get('/api/history');
    expect(response.status).toBe(200);
    expect(response.body.history).toEqual([]);
  });
});
```
```javascript
const { Calculation } = require('../../backend/models/calculationModel');
const supabase = require('../../backend/config/supabase');
const { v4: uuidv4 } = require('uuid');

/**
 * Test the calculation model
 */
describe('Calculation Model', () => {
  /**
   * Test the create calculation function
   */
  it('should create a new calculation', async () => {
    const calculation = {
      num1: 10,
      num2: 5,
      operation: 'add',
      result: 15,
    };

    const result = await Calculation.create(calculation);
    expect(result).toHaveProperty('id');
    expect(result.num1).toBe(calculation.num1);
    expect(result.num2).toBe(calculation.num2);
    expect(result.operation).toBe(calculation.operation);
    expect(result.result).toBe(calculation.result);
  });

  /**
   * Test the get all calculations function
   */
  it('should get all calculations', async () => {
    const calculation1 = {
      num1: 10,
      num2: 5,
      operation: 'add',
      result: 15,
    };

    const calculation2 = {
      num1: 20,
      num2: 10,
      operation: 'subtract',
      result: 10,
    };

    await Calculation.create(calculation1);
    await Calculation.create(calculation2);

    const results = await Calculation.getAll();
    expect(results.length).toBe(2);
    expect(results[0].num1).toBe(calculation1.num1);
    expect(results[0].num2).toBe(calculation1.num2);
    expect(results[0].operation).toBe(calculation1.operation);
    expect(results[0].result).toBe(calculation1.result);
    expect(results[1].num1).toBe(calculation2.num1);
    expect(results[1].num2).toBe(calculation2.num2);
    expect(results[1].operation).toBe(calculation2.operation);
    expect(results[1].result).toBe(calculation2.result);
  });

  /**
   * Test the get calculation by id function
   */
  it('should get a calculation by id', async () => {
    const calculation = {
      num1: 10,
      num2: 5,
      operation: 'add',
      result: 15,
    };

    const result = await Calculation.create(calculation);
    const getResult = await Calculation.getById(result.id);
    expect(getResult).toHaveProperty('id');
    expect(getResult.num1).toBe(calculation.num1);
    expect(getResult.num2).toBe(calculation.num2);
    expect(getResult.operation).toBe(calculation.operation);
    expect(getResult.result).toBe(calculation.result);
  });

  /**
   * Test the update calculation function
   */
  it('should update a calculation', async () => {
    const calculation = {
      num1: 10,
      num2: 5,
      operation: 'add',
      result: 15,
    };

    const result = await Calculation.create(calculation);
    const updatedCalculation = {
      num1: 20,
      num2: 10,
      operation: 'subtract',
      result: 10,
    };

    await Calculation.update(result.id, updatedCalculation);
    const getResult = await Calculation.getById(result.id);
    expect(getResult).toHaveProperty('id');
    expect(getResult.num1).toBe(updatedCalculation.num1);
    expect(getResult.num2).toBe(updatedCalculation.num2);
    expect(getResult.operation).toBe(updatedCalculation.operation);
    expect(getResult.result).toBe(updatedCalculation.result);
  });

  /**
   * Test the delete calculation function
   */
  it('should delete a calculation', async () => {
    const calculation = {
      num1: 10,
      num2: 5,
      operation: 'add',
      result: 15,
    };

    const result = await Calculation.create(calculation);
    await Calculation.delete(result.id);
    const getResult = await Calculation.getById(result.id);
    expect(getResult).toBeNull();
  });

  /**
   * Test the calculate function
   */
  it('should calculate the result of two numbers', async () => {
    const num1 = 10;
    const num2 = 5;
    const operation = 'add';
    const result = await Calculation.calculate(num1, num2, operation);
    expect(result).toBe(15);
  });

  /**
   * Test the calculate function with invalid operation
   */
  it('should throw an error for invalid operation', async () => {
    const num1 = 10;
    const num2 = 5;
    const operation = 'invalid';
    await expect(Calculation.calculate(num1, num2, operation)).rejects.toThrowError(
      'Invalid operation'
    );
  });
});

afterAll(async () => {
  await supabase.from('calculations').delete();
});
```
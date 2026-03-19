```javascript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Calculator from '../components/Calculator';

const server = setupServer(
  rest.post('/api/calculate', (req, res, ctx) => {
    return res(ctx.json({ result: 10 }));
  }),
  rest.get('/api/history', (req, res, ctx) => {
    return res(ctx.json({ history: [] }));
  }),
);

describe('Calculator component', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders the calculator component', () => {
    const { getByText } = render(<Calculator />);
    expect(getByText('Calculator')).toBeInTheDocument();
  });

  it('performs a calculation', async () => {
    const { getByPlaceholderText, getByText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '5' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'add' } });

    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Result: 10')).toBeInTheDocument());
  });

  it('displays an error message when the calculation fails', async () => {
    server.use(
      rest.post('/api/calculate', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Calculation failed' }));
      }),
    );

    const { getByPlaceholderText, getByText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '5' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'add' } });

    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Error: Calculation failed')).toBeInTheDocument());
  });

  it('displays a loading state while the calculation is in progress', async () => {
    server.use(
      rest.post('/api/calculate', (req, res, ctx) => {
        return res(ctx.delay('infinite'), ctx.json({ result: 10 }));
      }),
    );

    const { getByPlaceholderText, getByText } = render(<Calculator />);
    const num1Input = getByPlaceholderText('Number 1');
    const num2Input = getByPlaceholderText('Number 2');
    const operationSelect = getByText('Operation');
    const calculateButton = getByText('Calculate');

    fireEvent.change(num1Input, { target: { value: '5' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.change(operationSelect, { target: { value: 'add' } });

    fireEvent.click(calculateButton);

    await waitFor(() => expect(getByText('Calculating...')).toBeInTheDocument());
  });
});
```
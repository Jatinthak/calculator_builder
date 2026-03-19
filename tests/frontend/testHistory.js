```javascript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import History from '../components/History';
import axios from 'axios';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACKEND_URL}/api/history`, (req, res, ctx) => {
    return res(ctx.json([{ num1: 1, num2: 2, operation: '+', result: 3 }]));
  }),
  rest.get(`${process.env.REACT_APP_BACKEND_URL}/api/history`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
  }),
  rest.get(`${process.env.REACT_APP_BACKEND_URL}/api/history`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  })
);

describe('History component', () => {
  afterEach(() => server.resetHandlers());

  it('renders history list', async () => {
    const { getByText } = render(<History />);
    await waitFor(() => expect(getByText('1 + 2 = 3')).toBeInTheDocument());
  });

  it('renders error message on failed fetch', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/api/history`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
      })
    );
    const { getByText } = render(<History />);
    await waitFor(() => expect(getByText('Error fetching history')).toBeInTheDocument());
  });

  it('renders empty message on empty history', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/api/history`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    const { getByText } = render(<History />);
    await waitFor(() => expect(getByText('No history found')).toBeInTheDocument());
  });

  it('renders loading state while fetching history', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 1000)));
    const { getByText } = render(<History />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(getByText('No history found')).toBeInTheDocument());
  });
});
```
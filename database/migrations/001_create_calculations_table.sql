```sql
-- Create the calculations table
CREATE TABLE IF NOT EXISTS calculations (
  id UUID PRIMARY KEY,
  num1 DECIMAL(10, 2) NOT NULL,
  num2 DECIMAL(10, 2) NOT NULL,
  operation VARCHAR(10) NOT NULL CHECK (operation IN ('+', '-', '*', '/')),
  result DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the created_at column for efficient querying
CREATE INDEX idx_created_at ON calculations (created_at);

-- Create a unique constraint on the id column to prevent duplicate entries
ALTER TABLE calculations ADD CONSTRAINT unique_id UNIQUE (id);
```
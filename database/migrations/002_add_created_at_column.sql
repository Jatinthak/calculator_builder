```sql
-- Add created_at column to the calculations table
ALTER TABLE calculations
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
```
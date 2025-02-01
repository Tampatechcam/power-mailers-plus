/*
  # Add invoice fields to digital marketing campaigns

  1. Changes
    - Add invoice_number field
    - Add invoice_amount field
    - Add invoice_due_date field
    - Add invoice_paid field
    - Update sample data with invoice information
*/

-- Add invoice fields to digital_marketing_campaigns
ALTER TABLE digital_marketing_campaigns 
ADD COLUMN IF NOT EXISTS invoice_number VARCHAR(20),
ADD COLUMN IF NOT EXISTS invoice_amount DECIMAL(12, 2),
ADD COLUMN IF NOT EXISTS invoice_due_date DATE,
ADD COLUMN IF NOT EXISTS invoice_paid BOOLEAN DEFAULT false;

-- Update existing campaigns with sample invoice data
UPDATE digital_marketing_campaigns 
SET 
  invoice_number = 'INV-' || FLOOR(RANDOM() * 10000)::text,
  invoice_amount = digital_marketing_price,
  invoice_due_date = campaign_end + INTERVAL '30 days',
  invoice_paid = RANDOM() > 0.5;
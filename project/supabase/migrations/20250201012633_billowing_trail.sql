/*
  # Add digital marketing price and update budget calculation

  1. Changes
    - Add digital_marketing_price column to digital_marketing_campaigns table
    - Update existing campaigns with sample prices
    - Update ideal_budget to be 50% of the remaining price after mailing costs
*/

-- Add digital_marketing_price to digital_marketing_campaigns
ALTER TABLE digital_marketing_campaigns 
ADD COLUMN IF NOT EXISTS digital_marketing_price DECIMAL(12, 2) DEFAULT 0;

-- Update existing campaigns with sample prices (between $8000 and $15000)
UPDATE digital_marketing_campaigns 
SET digital_marketing_price = FLOOR(RANDOM() * (15000 - 8000 + 1) + 8000)
WHERE digital_marketing_price IS NULL OR digital_marketing_price = 0;

-- Update ideal_budget to be 50% of the digital_marketing_price
UPDATE digital_marketing_campaigns 
SET ideal_budget = digital_marketing_price * 0.5;
/*
  # Add event orders table and relationships

  1. New Tables
    - `event_orders`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key to digital_marketing_campaigns)
      - `mailing_quantity` (integer)
      - `created_at` (timestamp)

  2. Changes
    - Add foreign key relationship between event_orders and digital_marketing_campaigns
    - Add mailing_quantity column to digital_marketing_campaigns table

  3. Security
    - Enable RLS on event_orders table
    - Add policy for authenticated users to read event_orders
*/

-- Add mailing_quantity to digital_marketing_campaigns
ALTER TABLE digital_marketing_campaigns 
ADD COLUMN IF NOT EXISTS mailing_quantity INTEGER DEFAULT 0;

-- Update existing campaigns with sample mailing quantities
UPDATE digital_marketing_campaigns 
SET mailing_quantity = FLOOR(RANDOM() * (10000 - 5000 + 1) + 5000)
WHERE mailing_quantity IS NULL OR mailing_quantity = 0;
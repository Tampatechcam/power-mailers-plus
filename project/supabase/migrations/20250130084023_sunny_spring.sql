/*
  # Fix Database Schema

  1. New Tables
    - `events` - Stores event information
    - `digital_marketing_campaigns` - Stores campaign data
    - `products` - Stores product information
    - `advisors` - Stores advisor information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to view data

  3. Sample Data
    - Add initial data for testing
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS digital_marketing_campaigns CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS advisors CASCADE;

-- Create events table
CREATE TABLE events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    location TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create digital_marketing_campaigns table
CREATE TABLE digital_marketing_campaigns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    status TEXT NOT NULL,
    advisor_name TEXT NOT NULL,
    group_name TEXT NOT NULL,
    campaign_start DATE NOT NULL,
    campaign_end DATE NOT NULL,
    ideal_budget DECIMAL(12, 2),
    max_budget DECIMAL(12, 2),
    campaign_running BOOLEAN DEFAULT FALSE,
    tech_lander_ready BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create advisors table
CREATE TABLE advisors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    speaker_name TEXT,
    registration_phone_number TEXT,
    website_registration TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to view events"
    ON events FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to view campaigns"
    ON digital_marketing_campaigns FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to view products"
    ON products FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to view advisors"
    ON advisors FOR SELECT TO authenticated USING (true);

-- Insert sample data
INSERT INTO events (title, description, event_date, location, capacity)
VALUES 
    ('Retirement Planning Seminar', 'Learn essential strategies for a secure retirement', NOW() + INTERVAL '7 days', 'Grand Hotel Conference Center', 50),
    ('Estate Planning Workshop', 'Comprehensive workshop on estate planning', NOW() + INTERVAL '14 days', 'Financial District Meeting Hall', 30),
    ('Investment Strategies Symposium', 'Advanced investment techniques for advisors', NOW() + INTERVAL '21 days', 'Business Center Auditorium', 100);

INSERT INTO digital_marketing_campaigns (status, advisor_name, group_name, campaign_start, campaign_end, ideal_budget, max_budget, campaign_running)
VALUES 
    ('Active', 'John Smith', 'Retirement Planners', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 5000.00, 6000.00, true),
    ('Active', 'Sarah Johnson', 'Financial Advisors Group', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 4000.00, 4800.00, true);

INSERT INTO products (name, description, amount)
VALUES 
    ('Digital campaign', 'Full digital marketing campaign service', 4500.00),
    ('E-mail marketing service', 'Professional email marketing service', 300.00),
    ('Omnichannel Marketing', 'Comprehensive marketing package', 840.00);

INSERT INTO advisors (first_name, last_name, email, company_name, speaker_name, registration_phone_number, website_registration)
VALUES 
    ('John', 'Smith', 'john.smith@example.com', 'Retirement Planners LLC', 'John Smith', '555-0123', 'https://retirement-planners.com/register'),
    ('Sarah', 'Johnson', 'sarah.johnson@example.com', 'Financial Advisors Group', 'Sarah Johnson', '555-0124', 'https://financial-advisors.com/register'),
    ('Michael', 'Brown', 'michael.brown@example.com', 'Wealth Management Team', 'Michael Brown', '555-0125', 'https://wealth-management.com/register');
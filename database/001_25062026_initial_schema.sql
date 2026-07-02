-- ==========================================================
-- ToolBox Business Management System
-- Database Migration 001
-- Version : 1.0.0
-- Author  : Gary Lock & ChatGPT
-- Date    : 2026-06-25
--
-- Description:
-- Initial database schema for ToolBox.
-- Includes Customers, Leads, Quotes, Jobs,
-- Invoices, Expenses, Payments and Settings.
-- ==========================================================
-- ==========================================================
-- ToolBox Business Management System
-- Database Migration 001
-- Version : 1.0.0
-- Author  : Gary Lock & ChatGPT
-- Date    : 2026-06-25
--
-- Description:
-- Initial ToolBox database schema.
-- ==========================================================


-------------------------------------------------------------
-- Extensions
-------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-------------------------------------------------------------
-- Update Timestamp Trigger
-------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-------------------------------------------------------------
-- Generic Audit Columns
-------------------------------------------------------------
-- Every table will contain:
--
-- id
-- created_at
-- updated_at
-- created_by
-- updated_by
-- is_deleted
-- deleted_at
--
-------------------------------------------------------------
-------------------------------------------------------------
-- Customers
-------------------------------------------------------------

CREATE TABLE customers (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_number BIGSERIAL UNIQUE,

    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,

    company_name TEXT,

    mobile_phone TEXT,
    home_phone TEXT,

    email TEXT,

    address_line_1 TEXT,
    address_line_2 TEXT,

    suburb TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'VIC',
    postcode TEXT,

    notes TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ

);

-------------------------------------------------------------
-- Customer Indexes
-------------------------------------------------------------

CREATE INDEX idx_customers_last_name
ON customers(last_name);

CREATE INDEX idx_customers_mobile
ON customers(mobile_phone);

CREATE INDEX idx_customers_email
ON customers(email);

CREATE INDEX idx_customers_suburb
ON customers(suburb);

-------------------------------------------------------------
-- Customer Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_customers_updated

BEFORE UPDATE ON customers

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
---

CREATE TABLE properties (

id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

property_number BIGSERIAL UNIQUE,

customer_id UUID NOT NULL,

property_name TEXT,

address_line_1 TEXT NOT NULL,
address_line_2 TEXT,

suburb TEXT NOT NULL,
state TEXT NOT NULL DEFAULT 'VIC',
postcode TEXT,

latitude DOUBLE PRECISION,
longitude DOUBLE PRECISION,

access_notes TEXT,
gate_code TEXT,
alarm_code TEXT,

property_notes TEXT,

is_active BOOLEAN NOT NULL DEFAULT TRUE,

created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
deleted_at TIMESTAMPTZ,

CONSTRAINT fk_properties_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON DELETE CASCADE

);

---


CREATE INDEX idx_properties_customer
ON properties(customer_id);

CREATE INDEX idx_properties_suburb
ON properties(suburb);

CREATE INDEX idx_properties_postcode
ON properties(postcode);

---


CREATE TRIGGER trg_properties_updated

BEFORE UPDATE ON properties

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Opportunities
-------------------------------------------------------------

CREATE TABLE opportunities (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    opportunity_number BIGSERIAL UNIQUE,

    customer_id UUID NOT NULL,

    property_id UUID NOT NULL,

    title TEXT NOT NULL,

    description TEXT,

    source TEXT NOT NULL DEFAULT 'Phone',

    opportunity_status TEXT NOT NULL DEFAULT 'New'
        CHECK (
            opportunity_status IN (
                'New',
                'Contacted',
                'Site Visit Booked',
                'Quoted',
                'Won',
                'Lost',
                'Cancelled'
            )
        ),

    estimated_value NUMERIC(12,2),

    expected_start_date DATE,

    expected_completion_date DATE,

    probability INTEGER DEFAULT 50
        CHECK (probability >= 0 AND probability <= 100),

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_opportunity_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_opportunity_property
        FOREIGN KEY (property_id)
        REFERENCES properties(id)
        ON DELETE CASCADE

);

-------------------------------------------------------------
-- Opportunity Indexes
-------------------------------------------------------------

CREATE INDEX idx_opportunity_customer
ON opportunities(customer_id);

CREATE INDEX idx_opportunity_property
ON opportunities(property_id);

CREATE INDEX idx_opportunity_status
ON opportunities(opportunity_status);

-------------------------------------------------------------
-- Opportunity Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_opportunities_updated

BEFORE UPDATE ON opportunities

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Quotes
-------------------------------------------------------------

CREATE TABLE quotes (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    quote_number BIGSERIAL UNIQUE,

    opportunity_id UUID NOT NULL,

    version INTEGER NOT NULL DEFAULT 1,

    quote_status TEXT NOT NULL DEFAULT 'Draft'
        CHECK (
            quote_status IN (
                'Draft',
                'Sent',
                'Viewed',
                'Accepted',
                'Declined',
                'Expired',
                'Cancelled'
            )
        ),

    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,

    expiry_date DATE,

    labour_total NUMERIC(12,2) NOT NULL DEFAULT 0,

    materials_total NUMERIC(12,2) NOT NULL DEFAULT 0,

    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,

    gst NUMERIC(12,2) NOT NULL DEFAULT 0,

    total NUMERIC(12,2) NOT NULL DEFAULT 0,

    customer_notes TEXT,

    internal_notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_quote_opportunity
        FOREIGN KEY (opportunity_id)
        REFERENCES opportunities(id)
        ON DELETE CASCADE

);

-------------------------------------------------------------
-- Quote Indexes
-------------------------------------------------------------

CREATE INDEX idx_quotes_opportunity
ON quotes(opportunity_id);

CREATE INDEX idx_quotes_status
ON quotes(quote_status);

-------------------------------------------------------------
-- Quote Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_quotes_updated

BEFORE UPDATE ON quotes

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Quote Items
-------------------------------------------------------------

CREATE TABLE quote_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    quote_id UUID NOT NULL,

    line_number INTEGER NOT NULL,

    item_type TEXT NOT NULL DEFAULT 'Material'
        CHECK (
            item_type IN (
                'Labour',
                'Material',
                'Travel',
                'Equipment',
                'Discount',
                'Other'
            )
        ),

    description TEXT NOT NULL,

    quantity NUMERIC(10,2) NOT NULL DEFAULT 1,

    unit TEXT,

    unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,

    discount NUMERIC(12,2) NOT NULL DEFAULT 0,

    gst_rate NUMERIC(5,2) NOT NULL DEFAULT 10,

    line_total NUMERIC(12,2) NOT NULL DEFAULT 0,

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_quote_items_quote
        FOREIGN KEY (quote_id)
        REFERENCES quotes(id)
        ON DELETE CASCADE

);

-------------------------------------------------------------
-- Quote Item Indexes
-------------------------------------------------------------

CREATE INDEX idx_quote_items_quote
ON quote_items(quote_id);

CREATE INDEX idx_quote_items_line
ON quote_items(line_number);

-------------------------------------------------------------
-- Quote Item Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_quote_items_updated

BEFORE UPDATE ON quote_items

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Activities
-------------------------------------------------------------

CREATE TABLE activities (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    activity_number BIGSERIAL UNIQUE,

    customer_id UUID,

    property_id UUID,

    opportunity_id UUID,

    quote_id UUID,

    job_id UUID,

    invoice_id UUID,

    activity_type TEXT NOT NULL,

    subject TEXT NOT NULL,

    details TEXT,

    activity_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_activity_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_activity_property
        FOREIGN KEY (property_id)
        REFERENCES properties(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_activity_opportunity
        FOREIGN KEY (opportunity_id)
        REFERENCES opportunities(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_activity_quote
        FOREIGN KEY (quote_id)
        REFERENCES quotes(id)
        ON DELETE SET NULL

);

-------------------------------------------------------------
-- Activity Indexes
-------------------------------------------------------------

CREATE INDEX idx_activity_customer
ON activities(customer_id);

CREATE INDEX idx_activity_property
ON activities(property_id);

CREATE INDEX idx_activity_opportunity
ON activities(opportunity_id);

CREATE INDEX idx_activity_quote
ON activities(quote_id);

CREATE INDEX idx_activity_date
ON activities(activity_date);

-------------------------------------------------------------
-- Activity Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_activities_updated

BEFORE UPDATE ON activities

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Service Catalogue
-------------------------------------------------------------

CREATE TABLE service_catalogue (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    service_number BIGSERIAL UNIQUE,

    service_name TEXT NOT NULL,

    category TEXT,

    description TEXT,

    default_unit TEXT,

    default_rate NUMERIC(12,2),

    taxable BOOLEAN NOT NULL DEFAULT TRUE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ

);

-------------------------------------------------------------
-- Service Catalogue Indexes
-------------------------------------------------------------

CREATE INDEX idx_service_name
ON service_catalogue(service_name);

CREATE INDEX idx_service_category
ON service_catalogue(category);

-------------------------------------------------------------
-- Service Catalogue Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_service_catalogue_updated

BEFORE UPDATE ON service_catalogue

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Products
-------------------------------------------------------------

CREATE TABLE products (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_number BIGSERIAL UNIQUE,

    sku TEXT,

    product_name TEXT NOT NULL,

    category TEXT,

    description TEXT,

    supplier TEXT,

    unit TEXT,

    cost_price NUMERIC(12,2) NOT NULL DEFAULT 0,

    sell_price NUMERIC(12,2) NOT NULL DEFAULT 0,

    taxable BOOLEAN NOT NULL DEFAULT TRUE,

    track_inventory BOOLEAN NOT NULL DEFAULT FALSE,

    current_stock NUMERIC(12,2) DEFAULT 0,

    minimum_stock NUMERIC(12,2) DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ

);

-------------------------------------------------------------
-- Product Indexes
-------------------------------------------------------------

CREATE INDEX idx_products_name
ON products(product_name);

CREATE INDEX idx_products_category
ON products(category);

CREATE INDEX idx_products_supplier
ON products(supplier);

-------------------------------------------------------------
-- Product Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_products_updated

BEFORE UPDATE ON products

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-------------------------------------------------------------
-- Suppliers
-------------------------------------------------------------

CREATE TABLE suppliers (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    supplier_number BIGSERIAL UNIQUE,

    business_name TEXT NOT NULL,

    contact_name TEXT,

    phone TEXT,

    mobile TEXT,

    email TEXT,

    website TEXT,

    address_line_1 TEXT,

    address_line_2 TEXT,

    suburb TEXT,

    state TEXT DEFAULT 'VIC',

    postcode TEXT,

    abn TEXT,

    account_number TEXT,

    notes TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    deleted_at TIMESTAMPTZ

);

-------------------------------------------------------------
-- Supplier Indexes
-------------------------------------------------------------

CREATE INDEX idx_suppliers_business_name
ON suppliers(business_name);

CREATE INDEX idx_suppliers_email
ON suppliers(email);

-------------------------------------------------------------
-- Supplier Updated Timestamp Trigger
-------------------------------------------------------------

CREATE TRIGGER trg_suppliers_updated

BEFORE UPDATE ON suppliers

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();
-- Drop Tables if they exist
DROP TABLE IF EXISTS public.users, public.statements, public.vaultDocs, public.contributions;

-- Create Users Table
CREATE TABLE public.users (
  guid UUID PRIMARY KEY,
  member_id VARCHAR(50),
  ssn VARCHAR(11),
  dob DATE,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  class VARCHAR(50),
  isContractor BOOLEAN
);

-- Create Statements Table
CREATE TABLE public.statements (
  uuid UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(guid),
  benefit_from DATE,
  work_from DATE,
  payment_due DATE,
  total_contribution NUMERIC(10, 2),
  reserve NUMERIC(10, 2),
  amount_due NUMERIC(10, 2)
);

-- Create VaultDocs Table
CREATE TABLE public.vaultDocs (
  uuid UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(guid),
  category VARCHAR(50),
  url VARCHAR(255)
);

-- Create Contributions Table
CREATE TABLE public.contributions (
  uuid UUID PRIMARY KEY,
  user_id UUID REFERENCES public.users(guid),
  amount NUMERIC(10, 2),
  hours INTEGER,
  period DATE
);

-- Insert Users
INSERT INTO public.users (guid, member_id, ssn, dob, name, email, password, class, isContractor)
VALUES 
  ('b33ba87e-4832-4056-bbee-d7fdc90c71b9', 'M001', '123-45-6789', '1990-01-01', 'John Doe', 'john.doe@example.com', 'hashed_password1', 'participant', false),
  ('8c5b6ea1-a757-4f86-8a1a-7c80e497b543', 'M002', '987-65-4321', '1985-05-15', 'Jane Smith', 'jane.smith@example.com', 'hashed_password2', 'admin', false),
  ('0c198973-1b14-4228-813b-5ba1771a32e8', 'M003', '111-22-3333', '1978-09-30', 'Bob Johnson', 'bob.johnson@example.com', 'hashed_password3', 'vault', true);

-- Insert Statements
INSERT INTO public.statements (uuid, user_id, benefit_from, work_from, payment_due, total_contribution, reserve, amount_due)
VALUES
  ('87823b98-0eef-4a6c-aa34-915abb0b3a21', 'b33ba87e-4832-4056-bbee-d7fdc90c71b9', '2023-01-01', '2023-01-15', '2023-02-01', '1000.00', '200.00', '800.00'),
  ('1f5ce671-b036-48f7-990a-6ac49d110927', '8c5b6ea1-a757-4f86-8a1a-7c80e497b543', '2023-02-01', '2023-02-15', '2023-03-01', '1200.00', '300.00', '900.00');

-- Insert VaultDocs
INSERT INTO public.vaultDocs (uuid, user_id, category, url)
VALUES
  ('d22e7b87-6f7c-47ce-85e6-58f6947fb6c3', 'b33ba87e-4832-4056-bbee-d7fdc90c71b9', 'todo', 'https://example.com/todo-document'),
  ('b2efdb1a-5862-4b90-b24d-41b6f5c032f4', '0c198973-1b14-4228-813b-5ba1771a32e8', 'annuity', 'https://example.com/annuity-document');

-- Insert Contributions
INSERT INTO public.contributions (uuid, user_id, amount, hours, period)
VALUES
  ('b682e3a4-54fb-44d3-9867-317d29a5b014', '0c198973-1b14-4228-813b-5ba1771a32e8', '500.00', '40', '2023-01-01'),
  ('ba2d34f9-5ad7-4b5d-89f1-d30e7a6e6ccf', '0c198973-1b14-4228-813b-5ba1771a32e8', '700.00', '35', '2023-02-01');

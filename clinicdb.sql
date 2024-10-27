-- Drop existing tables if they exist to avoid duplication errors
DROP TABLE IF EXISTS Patient, Doctor, Nurse, Receptionist, Admin, Appointment, Billing, Employee;

-- Create Employee Table (Base table for all employees)
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    ssn CHAR(9) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role ENUM('doctor', 'nurse', 'receptionist', 'admin') NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10, 2)
);

-- Create Patient Table
CREATE TABLE Patient (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    ssn CHAR(9) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    address VARCHAR(255),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other')
);

-- Create Doctor Table
CREATE TABLE Doctor (
    doctor_id INT PRIMARY KEY,
    specialty VARCHAR(100),
    FOREIGN KEY (doctor_id) REFERENCES Employee(employee_id)
);

-- Create Nurse Table
CREATE TABLE Nurse (
    nurse_id INT PRIMARY KEY,
    department VARCHAR(100),
    FOREIGN KEY (nurse_id) REFERENCES Employee(employee_id)
);

-- Create Receptionist Table
CREATE TABLE Receptionist (
    receptionist_id INT PRIMARY KEY,
    shift VARCHAR(50),
    FOREIGN KEY (receptionist_id) REFERENCES Employee(employee_id)
);

-- Create Admin Table
CREATE TABLE Admin (
    admin_id INT PRIMARY KEY,
    office_location VARCHAR(100),
    FOREIGN KEY (admin_id) REFERENCES Employee(employee_id)
);

-- Create Appointment Table
CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATETIME,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

-- Create Billing Table
CREATE TABLE Billing (
    billing_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    amount DECIMAL(10, 2),
    billing_date DATE,
    paid BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

-- Insert dummy data with usernames and passwords for testing
-- Dummy Doctor login (employee_id 201)
INSERT INTO Employee (ssn, first_name, last_name, username, password, role, phone, email, hire_date, salary) 
VALUES ('123456789', 'John', 'Doe', 'jdoe', 'testpassword', 'doctor', '555-1234', 'jdoe@example.com', '2022-01-15', 90000);

-- Link this doctor to the Doctor table
INSERT INTO Doctor (doctor_id, specialty) VALUES (201, 'Cardiology');

-- Dummy Patient login
INSERT INTO Patient (ssn, first_name, last_name, username, password, phone, email, address, date_of_birth, gender)
VALUES ('987654321', 'Jane', 'Smith', 'jsmith', 'patientpass', '555-9876', 'jsmith@example.com', '456 Wellness Ave', '1985-05-15', 'female');

-- Dummy Nurse login
INSERT INTO Employee (ssn, first_name, last_name, username, password, role, phone, email, hire_date, salary) 
VALUES ('112233445', 'Sarah', 'Brown', 'sbrown', 'nursepass', 'nurse', '555-2233', 'sbrown@example.com', '2023-04-01', 60000);

INSERT INTO Nurse (nurse_id, department) VALUES (202, 'Pediatrics');

-- Dummy Receptionist login
INSERT INTO Employee (ssn, first_name, last_name, username, password, role, phone, email, hire_date, salary) 
VALUES ('998877665', 'Tom', 'Wilson', 'twilson', 'receptionpass', 'receptionist', '555-3344', 'twilson@example.com', '2021-09-21', 40000);

INSERT INTO Receptionist (receptionist_id, shift) VALUES (203, 'Morning');

-- Dummy Admin login
INSERT INTO Employee (ssn, first_name, last_name, username, password, role, phone, email, hire_date, salary) 
VALUES ('776655443', 'Alice', 'Johnson', 'ajohnson', 'adminpass', 'admin', '555-4455', 'ajohnson@example.com', '2020-11-13', 100000);

INSERT INTO Admin (admin_id, office_location) VALUES (204, 'Head Office');

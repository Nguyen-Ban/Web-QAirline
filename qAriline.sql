-- Tạo cơ sở dữ liệu QAirline
CREATE DATABASE QAirline;

-- Sử dụng cơ sở dữ liệu QAirline
USE QAirline;

-- Tạo bảng Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,   -- Mã hóa mật khẩu
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng Planes
CREATE TABLE Planes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    seat_capacity INT NOT NULL,
    plane_code VARCHAR(10) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng Seats
CREATE TABLE Seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plane_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    class ENUM('economy', 'business', 'first') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plane_id) REFERENCES Planes(id) ON DELETE CASCADE
);

-- Tạo bảng Flights
CREATE TABLE Flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(10) NOT NULL UNIQUE,
    plane_id INT,
    departure VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    status ENUM('scheduled', 'delayed', 'onair', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plane_id) REFERENCES Planes(id) ON DELETE SET NULL
);

-- Tạo bảng Reservations
CREATE TABLE Reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    seat_id INT NOT NULL,
    reservation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES Flights(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES Seats(id) ON DELETE CASCADE
);

-- Tạo bảng FlightPrices
CREATE TABLE FlightPrices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_id INT NOT NULL,
    class ENUM('economy', 'business', 'first') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    seat_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (flight_id) REFERENCES Flights(id) ON DELETE CASCADE
);

-- Tạo bảng Posts
CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,         
    category ENUM('introduction', 'news', 'promotion', 'notification') NOT NULL,
    description TEXT NOT NULL,           
    detail TEXT NOT NULL,              
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


SHOW TABLES;

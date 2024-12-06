USE QAirline;
-- Thêm dữ liệu vào bảng Users
INSERT INTO Users (username, password, email, role)
VALUES 
    ('customer', '$2b$10$5urAupL5o2pmpawI6IEC.OklVKG506GLghWbN.IHFJJ8Uu0GyjuCu', 'customer@gmail.com', 'customer'),
    ('user', '$2b$10$sV3NXdCsUwsjLT..iDnQQ.upMoBQiiZGsreWQOXjR792qV2UTZBmG', 'admin@gmail.com', 'admin');

-- Thêm dữ liệu vào bảng Planes
INSERT INTO Planes (model, manufacturer, seat_capacity, plane_code)
VALUES 
    ('Boeing 737', 'Boeing', 180, 'B737-800'),
    ('Airbus A320', 'Airbus', 160, 'A320-200'),
    ('Boeing 787', 'Boeing', 250, 'B787-900');

-- Thêm dữ liệu vào bảng Seats
INSERT INTO Seats (plane_id, seat_number, class)
VALUES 
    (1, '1A', 'first'), 
    (1, '1B', 'first'),
    (1, '10A', 'business'),
    (1, '10B', 'business'),
    (1, '20A', 'economy'),
    (1, '20B', 'economy'),
    (2, '1A', 'first'),
    (2, '1B', 'first'),
    (2, '10A', 'business'),
    (2, '10B', 'business'),
    (2, '20A', 'economy'),
    (2, '20B', 'economy');

-- Thêm dữ liệu vào bảng Flights
INSERT INTO Flights (flight_number, plane_id, departure, destination, departure_time, arrival_time, status)
VALUES 
    ('VN101', 1, 'Ho Chi Minh City', 'Hanoi', '2024-12-10 08:00:00', '2024-12-10 10:00:00', 'scheduled'),
    ('VN102', 2, 'Hanoi', 'Da Nang', '2024-12-11 14:00:00', '2024-12-11 15:30:00', 'scheduled'),
    ('VN103', 3, 'Da Nang', 'Ho Chi Minh City', '2024-12-12 18:00:00', '2024-12-12 20:00:00', 'delayed');

-- Thêm dữ liệu vào bảng Reservations
INSERT INTO Reservations (user_id, flight_id, seat_id, status)
VALUES 
    (1, 1, 1, 'confirmed'),
    (1, 2, 4, 'confirmed'),
    (2, 3, 7, 'confirmed');

-- Thêm dữ liệu vào bảng FlightPrices
INSERT INTO FlightPrices (flight_id, class, price)
VALUES 
    (1, 'economy', 100.00),
    (1, 'business', 300.00),
    (1, 'first', 500.00),
    (2, 'economy', 90.00),
    (2, 'business', 250.00),
    (2, 'first', 450.00),
    (3, 'economy', 120.00),
    (3, 'business', 350.00),
    (3, 'first', 550.00);

-- Thêm dữ liệu vào bảng Posts
INSERT INTO Posts (title, category, description, detail)
VALUES 
    ('Flight Deals This Month', 'promotion', 'Get the best deals for flights this month!', 'Details about flight deals.'),
    ('New Routes to Europe', 'news', 'We are now flying to more cities in Europe.', 'Details about new routes to Europe.'),
    ('Company Introduction', 'introduction', 'Learn more about our airline company.', 'Introduction details.'),
    ('Important Update on Flight Schedules', 'notification', 'Changes in flight schedules due to weather conditions.', 'Details on the updated schedule.');

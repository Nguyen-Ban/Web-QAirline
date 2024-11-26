const Flight = require('../models/flight');
const Reservation = require('../models/reservation');
const Plane = require('../models/plane');

// Khách hàng - Xem tất cả chuyến bay
exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.findAll();
        res.json(flights);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Khách hàng - Tìm kiếm chuyến bay
exports.searchFlights = async (req, res) => {
    const { departure, destination } = req.query;
    try {
        const flights = await Flight.findAll({
            where: { departure, destination }
        });
        res.json(flights);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Khách hàng - Đặt vé
exports.bookTicket = async (req, res) => {
    try {
        const reservation = await Reservation.create({ ...req.body, userId: req.userId });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Khách hàng - Hủy vé
exports.cancelTicket = async (req, res) => {
    try {
        const reservation = await Reservation.destroy({
            where: { id: req.params.id, userId: req.userId }
        });
        reservation
            ? res.json({ message: 'Reservation cancelled' })
            : res.status(404).json({ error: 'Reservation not found' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Khách hàng - Xem các chuyến bay đã đặt
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({ where: { userId: req.userId } });
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Quản trị viên - Đăng thông tin máy bay
exports.createPlane = async (req, res) => {
    try {
        const plane = await Plane.create(req.body);
        res.status(201).json(plane);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Quản trị viên - Nhập dữ liệu chuyến bay
exports.createFlight = async (req, res) => {
    try {
        const flight = await Flight.create(req.body);
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Quản trị viên - Xem và thống kê dữ liệu
exports.getFlightsStats = async (req, res) => {
    try {
        const flights = await Flight.findAll();
        res.json({ totalFlights: flights.length, flights });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Quản trị viên - Thay đổi giờ khởi hành (delay)
exports.delayFlight = async (req, res) => {
    const { newDepartureTime } = req.body;
    try {
        const flight = await Flight.findByPk(req.params.id);
        if (flight) {
            flight.departure_time = newDepartureTime;
            await flight.save();
            res.json({ message: 'Flight delayed', flight });
        } else {
            res.status(404).json({ error: 'Flight not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

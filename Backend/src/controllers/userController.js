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
        if (!departure || !destination) {
            return res.status(400).json({ error: 'Departure and destination are required' });
        }

        const flights = await Flight.findAll({
            where: { departure, destination },
            include: [
                {
                    model: Plane,
                    attributes: ['model', 'manufacturer', 'seatCapacity'],
                },
                {
                    model: flightPrice,
                    attributes: ['class', 'price'],
                },
            ],
            attributes: [
                'id',
                'flight_number',
                'departure',
                'destination',
                'departure_time',
                'arrival_time',
                'status',
            ]
        });

        if (flights.length === 0) {
            return res.status(404).json({ error: 'No flights found' });
        }

        const formattedFlights = flights.map((flight) => ({
            id: flight.id,
            flightNumber: flight.flight_number,
            departure: flight.departure,
            destination: flight.destination,
            departureTime: flight.departure_time,
            arrivalTime: flight.arrival_time,
            status: flight.status,
            plane: flight.Plane,
            prices: flight.FlightPrices,
        }));


        res.json(formattedFlights);
    } catch (error) {
        res.status(400).json({ error: error.message });
        return res.status(400).json({ error: error.message });
    }
};

// Quản trị viên - Nhập dữ liệu chuyến bay
exports.createFlight = async (req, res) => {
    try {
        const { flightCode, planeCode, departure, destination, departureTime, arrivalTime, flightStatus } = req.body;
        const flight = await Flight.create({
            flightNumber: flightCode,
            planeId: planeCode,
            departure,
            destination,
            departureTime,
            arrivalTime,
            status: flightStatus
        });
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

exports.updateFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { flightCode, planeCode, departure, destination, departureTime, arrivalTime, flightStatus } = req.body;
        const [update] = await Flight.update({
            flightNumber: flightCode,
            planeId: planeCode,
            departure,
            destination,
            departureTime,
            arrivalTime,
            status: flightStatus
        }, { where: { id } });
        if (update) {
            const updatedFlight = await Flight.findByPk(id);
            res.json({ message: 'Flight updated', updatedFlight });
        } else {
            res.status(404).json({ error: 'Flight not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Flight.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Flight deleted' });
        } else {
            res.status(404).json({ error: 'Flight not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPlanes = async (req, res) => {
    try {
      const planes = await Plane.findAll();
      res.json(planes);
    } catch (error) {
      console.error("Error fetching planes:", error);
      res.status(400).json({ error: error.message });
    }
};

// Quản trị viên - Đăng thông tin máy bay
exports.createPlane = async (req, res) => {
    try {
        const { planeCode, model, manufacturer, seatCapacity } = req.body;
        const plane = await Plane.create({
            id: planeCode,
            model,
            manufacturer,
            seatCapacity
        });
        res.status(201).json(plane);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePlane = async (req, res) => {
    try {
        const { id } = req.params;
        const { model, manufacturer, seatCapacity } = req.body;
        const [update] = await Plane.update({
            model,
            manufacturer,
            seatCapacity
        }, { where: { id } });
        if (update) {
            const updatedPlane = await Plane.findByPk(id);
            res.json({ message: 'Plane updated', updatedPlane });
        } else {
            res.status(404).json({ error: 'Plane not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePlane = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Plane.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Plane deleted' });
        } else {
            res.status(404).json({ error: 'Plane not found' });
        }
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
const Flight = require('../models/flight');
const Reservation = require('../models/reservation');
const Plane = require('../models/plane');
const FlightPrice = require('../models/flightPrice'); //추가함
const Post = require('../models/post')
const { Op } = require('sequelize');  //추가함

// Khách hàng - Xem tất cả chuyến bay
exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.findAll({
            include: [
                {
                    model: Plane,
                    attributes: ['model', 'manufacturer', 'seatCapacity'],
                },
                {
                    model: FlightPrice,
                    attributes: ['class', 'price', 'seatCount'],
                },
            ],
            attributes: [
                'id',
                'flightNumber',
                'departure',
                'destination',
                'departureTime',
                'arrivalTime',
                'status',
            ]
        });

        const formattedFlights = flights.map((flight) => ({
            id: flight.id,
            flightNumber: flight.flightNumber,
            departure: flight.departure,
            destination: flight.destination,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            status: flight.status,
            plane: flight.Plane,
            prices: flight.FlightPrices.map((price) => ({
                class: price.class,
                price: price.price,
                seatCount: price.seatCount,
            })),  // 수정함
        }));

        res.json(formattedFlights);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.searchFlights = async (req, res) => {
    const { departure, destination, departureDate, returnDate, tripType } = req.query;

    try {
        // Validate required parameters
        if (!departure || !destination) {
            return res.status(400).json({ error: 'Departure and destination are required' });
        }

        // Prepare date-based conditions
        const whereConditions = [];

        // Outbound flight condition
        const outboundCondition = {
            departure,
            destination,
            ...(departureDate && {
                departure_time: {
                    [Op.between]: [
                        new Date(departureDate),
                        new Date(new Date(departureDate).setHours(23, 59, 59))
                    ]
                }
            })
        };
        whereConditions.push(outboundCondition);

        // Round trip condition
        if (tripType === 'roundtrip' && returnDate) {
            const returnCondition = {
                departure: destination,
                destination: departure,
                departure_time: {
                    [Op.between]: [
                        new Date(returnDate),
                        new Date(new Date(returnDate).setHours(23, 59, 59))
                    ]
                }
            };
            whereConditions.push(returnCondition);
        }

        // Fetch flights
        const flightPromises = whereConditions.map(condition =>
            Flight.findAll({
                where: { departure, destination },
                include: [
                    {
                        model: Plane,
                        attributes: ['model', 'manufacturer', 'seatCapacity'],
                    },
                    {
                        model: FlightPrice,
                        attributes: ['class', 'price'],
                    },
                ],
                attributes: [
                    'id',
                    'flightNumber',
                    'departure',
                    'destination',
                    'departureTime',
                    'arrivalTime',
                    'status',
                ]
            })
        );

        const flightsResults = await Promise.all(flightPromises);

        // Flatten and format results
        const formattedFlights = flightsResults.flat().map((flight) => ({
            id: flight.id,
            flightNumber: flight.flightNumber,
            departure: flight.departure,
            destination: flight.destination,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            status: flight.status,
            plane: flight.Plane,
            prices: flight.FlightPrices,
        }));

        if (formattedFlights.length === 0) {
            return res.status(404).json({ error: 'No flights found' });
        }

        res.json(formattedFlights);
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

// Quản trị viên - Xem bài viết
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, category, description, detail } = req.body;
        const post = await Post.create({
            title,
            category,
            description,
            detail
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, detail } = req.body;
        const [update] = await Post.update({
            title,
            category,
            description,
            detail
        }, { where: { postId: id } });
        if (update) {
            const updatedPost = await Post.findByPk(id);
            res.json({ message: 'Post updated', updatedPost });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Post.destroy({ where: { postId: id } });
        if (deleted) {
            res.json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
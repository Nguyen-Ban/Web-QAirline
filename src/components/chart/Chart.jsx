import './chart.css';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {name: "Not Departed", total: 3},
    {name: "Delayed", total: 1},
    {name: "In Flight", total: 5},
    {name: "Arrived", total: 10}
];


const Chart = () => {
    return (
        <div className="chart">
            <div className="title">Flights Status</div>
            <ResponsiveContainer width="100%" aspect={2 / 1}>
                <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart
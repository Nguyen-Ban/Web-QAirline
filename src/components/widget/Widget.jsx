import './widget.css';

const Widget = ({ type }) => {
    let data;
    if (type === 'airplanes') {
        data = {
            title: "Available airplanes"
        }
    } else if (type === 'flights') {
        data = {
            title: "Available flights"
        }
    } else if (type === 'bookings') {
        data = {
            title: "Total bookings"
        }
    }
    return (
        <div className="widget">
            <div className="left">logo</div>
            <div className="right">{data.title}</div>
        </div>
    )
}

export default Widget;
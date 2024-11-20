import "./passengerTable.css";

const PassengerTable = () => {
  return (
    <div className="passenger-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Day of Birth</th>
            <th>Gender</th>
            <th>Flight</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Mr.Darshan Bhasme</td>
            <td>2003-09-28</td>
            <td>Male</td>
            <td>VN972: Mumbai to Hanoi</td>
            <td>7774012809</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Miss.Aara Galkwad</td>
            <td>2002-11-10</td>
            <td>Female</td>

            <td>VN972: Mumbai to Hanoi</td>
            <td>9021817579</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mr.Sanat Pillai</td>
            <td>2004-11-14</td>
            <td>Male</td>

            <td>VN972: Mumbai to Hanoi</td>
            <td>7547546729</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PassengerTable;

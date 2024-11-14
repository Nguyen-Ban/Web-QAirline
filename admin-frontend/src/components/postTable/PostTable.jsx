import { Link } from "react-router-dom";
import "./postTable.css";

const PostTable = () => {
  return (
    <div className="post-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Winter Travel Discounts</td>
            <td>Promotion</td>
            <td>
              Special 20% discount on flights and complimentary upgrades for
              winter travel.{" "}
            </td>
            <td>
              <Link to="/add-post">
                <div>Edit</div>
              </Link>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>About QAirline</td>
            <td>Introduction</td>
            <td>
              Overview of QAirline's history, mission, and commitment to global
              connectivity.{" "}
            </td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Updated Baggage Policy</td>
            <td>Announcement</td>
            <td>
              New baggage allowance policy effective January 1, 2024, for all
              passengers.
            </td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>New Direct Flights to Tokyo</td>
            <td>News</td>
            <td>
              Launch of non-stop flights from Los Angeles to Tokyo starting
              March 2024.
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;

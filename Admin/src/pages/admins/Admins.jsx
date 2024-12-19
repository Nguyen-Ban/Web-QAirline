import PageHeader from "../../components/ui/pageHeader/PageHeader";
import UserTable from "../../components/admins/AdminsTable";

const Users = () => {
  return (
    <div className="users">
      <PageHeader
        title="ADMINS"
        buttonText="Add admin"
        buttonLink="/admins/add"
      />
      <UserTable />
    </div>
  );
};

export default Users;

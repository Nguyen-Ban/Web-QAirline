import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchPostsAPI, deletePostAPI } from "../../services/api.service";

const PostTable = () => {
  const columns = [
    { header: "#", field: null, render: (_, __, index) => index + 1 },
    { header: "Title", field: "title" },
    { header: "Category", field: "category" },
    { header: "Description", field: "description" },
  ];

  return (
    <DataTable
      columns={columns}
      fetchData={fetchPostsAPI}
      onDelete={deletePostAPI}
      editUrl="/edit-post"
    />
  );
};

export default PostTable;

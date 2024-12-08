import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchPostsAPI, deletePostAPI } from "../../services/API/Posts";

const PostTable = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <DataTable
      columns={columns}
      api={fetchPostsAPI} // Truyền API lấy dữ liệu
      onDelete={deletePostAPI} // Truyền API xóa dữ liệu
      editUrl="/posts/edit" // URL chỉnh sửa bài viết
    />
  );
};

export default PostTable;

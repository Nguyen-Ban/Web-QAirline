import PostTable from "../../components/posts/PostTable";
import "./posts.css";
import PageHeader from "../../components/ui/pageHeader/PageHeader";
import { Link } from "react-router-dom";

const Posts = () => {
  return (
    <div className="posts">
      <PageHeader title="POSTS" buttonText="Add new" buttonLink="/posts/add" />
      <PostTable />
    </div>
  );
};

export default Posts;

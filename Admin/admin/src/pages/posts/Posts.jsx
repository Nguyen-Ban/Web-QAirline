import PostTable from "../../components/posts/PostTable";
import "./posts.css";
import PageHeader from "../../components/ui/pageHeader/PageHeader";

const Posts = () => {
  return (
    <div className="posts">
      <PageHeader title="POSTS" buttonText="Add new" buttonLink="/add-post" />
      <PostTable />
    </div>
  );
};

export default Posts;

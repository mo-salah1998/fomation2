import { useDispatch } from "react-redux";
import AddPostForm from "./components/AddPostForm";
import PostsList from "./components/PostsList";
import { useEffect } from "react";
import { fetchPosts } from "./redux/postsSlices";
import { fetchUsers } from "./redux/usersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;

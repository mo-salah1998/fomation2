import {useSelector} from "react-redux";
import {selectAllPosts} from "../redux/OldpostsSlices";
import ReactionButtons from "./ReactionButtons";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  console.log(posts)
  // Ensure posts is an array before processing
  const orderedPosts = Array.isArray(posts?.posts) ? posts?.posts.slice().sort((a, b) => b.date.localeCompare(a.date)) : [];

  const renderedPosts = orderedPosts.map((post) => (
    <article
      key={post.id}
      className="p-6 mb-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
    >
      <h3 className="mb-2 text-2xl font-semibold text-gray-800">{post.title}</h3>
      <p className="mb-4 text-gray-600">{post.content.substring(0, 100)}...</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2 postCredit">
          <PostAuthor userId={post.author._id} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
      </div>
    </article>
  ));

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-4xl font-bold text-[#F16E00] mb-8">Posts</h2>
      {renderedPosts.length > 0 ? renderedPosts : <p>No posts available.</p>}
    </section>
  );
};
export default PostsList

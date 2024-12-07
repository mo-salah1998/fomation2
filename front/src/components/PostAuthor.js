import { useSelector } from "react-redux";
import { selectAllUsers } from "../redux/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers)
  const safeUsers = Array.isArray(users) ? users : [];
  
  console.log('Post Author ID:', userId);
  console.log('Users:', safeUsers);

  const author = safeUsers.find(user => user._id === userId);

  return <span>by {author ? `${author.firstName} ${author.lastName}`: 'Unknown author'}</span>
}
export default PostAuthor

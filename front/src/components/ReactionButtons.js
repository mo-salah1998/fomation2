import { useDispatch } from "react-redux";
import { reactionAdded } from "../redux/OldpostsSlices";

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="inline-flex ml-1 items-center px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full shadow-sm hover:bg-gray-200 hover:text-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#F16E00]"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
export default ReactionButtons

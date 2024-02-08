import { useContext, useEffect } from "react"
import PAppBar from "../components/AppBar";
import PostCard from "../components/PostCard";
import PostContext from "../components/PostContext";
import "./styles.css";

const Post = () => {
  const {post, setPost, list_post} = useContext(PostContext);
  useEffect(()=>{
    list_post()
  },[]);

  return (
    <div>
      <PAppBar />
      <div className="mediaMain">
        <div className="mediaBox">
          {post.map((item, idx)=>{
            return (
              <PostCard key={idx} props={item}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Post

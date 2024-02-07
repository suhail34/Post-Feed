import axios from "axios";
import { useState, createContext } from "react";

const PostContext = createContext();

export const PostContextProvider = ({children}) => {
  let obj = {username:"", content:"", comments:[]};
  const [post, setPost] = useState([obj]);
  const list_post = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/api/post/list", {withCredentials: true});
      setPost(resp.data.posts);
    } catch(err) {
      setPost(["Error while Loading the post refresh the or login again"]);
      console.log(err)
    }
  }

  return (
    <>
      <PostContext.Provider value={{post, setPost, list_post}}>
        {children}
      </PostContext.Provider>
    </>
  )
}

export default PostContext;

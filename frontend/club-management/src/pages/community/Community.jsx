import { useEffect, useState } from "react";
import ArticleList from "../../components/Post"
import axios from "axios";

export default function Community() {
  const [posts, setPosts] = useState([]);
  useEffect(
    ()=>{ const response = 
axios.get(
  "http://127.0.0.1:8000/community/posts/"
)
.then(
  (response) =>{
    setPosts(response.data)
    console.log(response.data)
  }
).catch(
  (err)=>{
    console.log("ERROR")
  }
)
    }, []
  )
    return (
      <>
        {posts.map((blg) => {
          return <ArticleList blog={blg} />;
        })}
      </>
    );
  }
import React from "react";
import { useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import EditBlogPost from "./views/edit"
import { BrowserRouter, Route } from "react-router-dom";

function App() {

  const [blog, setBlog] = useState([])
  const [editPost, setEditPost] = useState(null)
  const [editCover, setEditCover] = useState(null)

  const updated =(val)=>{
    setBlog(val)
  }

  const editedpost =(editVal)=>{
    setEditPost(editVal)
  }

  const editedImgcover = (cover) =>{
    setEditCover(cover)
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact render={(routerProps)=> <Home {...routerProps} data={updated} /> }/>
      <Route path="/blog/:id" render={(routerProps)=> <Blog {...routerProps} editedImg={editCover} edited={editPost} data={blog} /> }/>
      <Route path="/new" exact render = {(routerProps)=> <NewBlogPost {...routerProps}  /> }/>
      <Route path="/edit/:id" exact render={(routerProps)=> <EditBlogPost {...routerProps} data={blog} edited={editedpost} editedImg={editedImgcover}/> }/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route } from "react-router-dom";

function App() {

  const [blog, setBlog] = useState([])

  const updated =(val)=>{
    setBlog(val)
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact render={(routerProps)=> <Home {...routerProps} data={updated} /> }/>
      <Route path="/blog/:id" render={(routerProps)=> <Blog {...routerProps} data={blog} /> }/>
      <Route path="/new" exact component={NewBlogPost} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

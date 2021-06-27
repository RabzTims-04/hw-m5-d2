import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
import { BACKEND_URL } from "../../../const/env";
export default class BlogList extends Component {

  state ={
    blogs:[]
  }

  url = 'https://m5-blogpost.herokuapp.com/blogs'

  componentDidMount = ()=>{
    this.fetchBlogs()
  }

  fetchBlogs = async ()=>{
    console.log(BACKEND_URL);
    try {
      const response = await fetch(this.url)
      const blogsData = await response.json()
      this.props.data(blogsData)
      
      if(response.ok){
        this.setState({
          blogs:blogsData
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Row>
        {this.state.blogs.map((blog) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={blog._id} {...blog} />
          </Col>
        ))}
      </Row>
    );
  }
}

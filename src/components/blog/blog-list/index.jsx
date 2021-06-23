import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
export default class BlogList extends Component {

  state ={
    blogs:[]
  }

  componentDidMount = ()=>{
    this.fetchBlogs()
  }

  fetchBlogs = async ()=>{
    try {
      const response = await fetch("http://localhost:3001/blogs")
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

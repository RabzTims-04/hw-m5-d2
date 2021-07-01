import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";

const {REACT_APP_BACKEND_URL} = process.env
export default class BlogList extends Component {

  state ={
    blogs:[]
  }

  url = `${REACT_APP_BACKEND_URL}/blogs`

  componentDidMount = ()=>{
    this.fetchBlogs()
  }

  fetchBlogs = async ()=>{
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

import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
 class NewBlogPost extends Component {
  /* constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
  } */

  state={
    blog:{
	    "category": "",
	    "title": "",
	    "cover":"",
      "content":"",
	    "readTime": {
	      "value": 1,
	      "unit": ""
	    },
	    "author": {
	      "name": "",
	      "avatar":""
	    }
    }
  }

  postBlog = async (e)=>{
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3001/blogs",{
        method:'POST',
        headers:{
          "content-type": "application/json"
        },
        body:JSON.stringify(this.state.blog)
      })

      if(response.ok){
        alert('Data successfully posted :)')
        this.setState({
          blog:{

            "category": "",
            "title": "",
            "cover":"",
            "content":"",
            "readTime": {
              "value": 1,
              "unit": "hours"
            },
            "author": {
              "name": "",
              "avatar":""
            }
          }
        })
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={(e)=>this.postBlog(e)}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
            id="title"
            value={this.state.blog.title}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                title: e.target.value
              }
            })}
            size="lg" 
            required
            placeholder="Title" />
          </Form.Group>

          <Form.Group  className="mt-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
            required 
            type="text"
            id="cover"
            value={this.state.blog.cover}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                cover: e.target.value
              }
            })}
            size="lg" 
            placeholder="Link" />
          </Form.Group>

        <div className="d-flex flex-row">
        <div>
          <Form.Group  className="mt-3">
            <Form.Label>Read Time</Form.Label>
            <Form.Control 
            type="number"
            id="value"
            required
            value={this.state.blog.readTime.value}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                readTime:{
                  ...this.state.blog.readTime,
                  value: e.target.value
                }                   
              }
            })}
            size="lg" 
             />
          </Form.Group>
         </div>
         <div>
         <Form.Group className="mt-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control 
            id="unit"
            required
            value={this.state.blog.readTime.unit}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                readTime:{
                  ...this.state.blog.readTime,
                  unit: e.target.value
                }                   
              }
            })}
            size="lg" 
            as="select">
              <option>hours</option>
              <option>minutes</option>
              <option>seconds</option>
            </Form.Control>
          </Form.Group>
         </div>
        </div>

          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
            id="category"
            required
            value={this.state.blog.category}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                category: e.target.value                  
              }
            })}
            size="lg" 
            as="select">
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control 
            id="name"
            required
            value={this.state.blog.author.name}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                author:{
                  ...this.state.blog.author,
                  name: e.target.value
                }                   
              }
            })}
            size="lg" 
            placeholder="Name" />
          </Form.Group>

          <Form.Group  className="mt-3">
            <Form.Label>Author's Image</Form.Label>
            <Form.Control 
            type="text"
            id="avatar"
            required
            value={this.state.blog.author.avatar}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                author:{
                  ...this.state.blog.author,
                  avatar: e.target.value
                }                   
              }
            })}
            size="lg" 
            placeholder="Link" />
          </Form.Group>

          <Form.Group  className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              required
              id="content"
              /* onChange={(e)=> console.log(e)} */
               value={this.state.blog.content}
              onChange={(e)=> this.setState({
                blog:{
                  ...this.state.blog,
                  content: e                  
                }
              })}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default NewBlogPost

import React, { Component } from "react";
import { createRef } from "react";
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

  ref = createRef()
  avatarRef = createRef()
  state={
    blog:{
	    "category": "",
	    "title": "",
	    "cover":"https://avatarfiles.alphacoders.com/896/thumb-89615.png",
      "content":"",
	    /* "readTime": {
	      "value": 1,
	      "unit": ""
	    }, */
	    "author": {
	      "name": "",
	      "avatar":"https://avatarfiles.alphacoders.com/896/thumb-89615.png"
	    }
    }
  }

  postBlog = async (e)=>{
    e.preventDefault()
    let formData = new FormData()
    let avatarFormData = new FormData()
    avatarFormData.append('avatar', this.state.blog.author.image)
    formData.append('cover', this.state.blog.image)  
    try {
      const response = await fetch("http://localhost:3001/blogs",{
        method:'POST',
        headers:{
          "content-type": "application/json"
        },
        body:JSON.stringify({
          category:this.state.blog.category,
          title:this.state.blog.title,
          cover:this.state.blog.cover,
          content:this.state.blog.content,
          /* readTime:{
            value:this.state.blog.readTime.value,
            unit: this.state.blog.readTime.unit
          }, */
          author:{
            name:this.state.blog.author.name,
            avatar: this.state.blog.author.avatar
          }
        })
      })
      const addedPost = await response.json()
      const blogId = await addedPost._id

      if(response.ok){
        if(this.state.blog.author.image){
          try {
            const postavatar = await fetch("http://localhost:3001/blogs/" + blogId + '/uploadAvatar',{
              method:'POST',
              body: avatarFormData,
            })
            console.log(await postavatar.json());
            if(postavatar.ok){
              const avatarData = await postavatar.json()
              console.log(avatarData);
            }
            
          } catch (error) {
            console.log('error uploading avatar image');
          }
        }
        if(this.state.blog.image){
          try {
            const postCover = await fetch("http://localhost:3001/blogs/" + blogId + '/uploadCover',{
              method:'POST',
              body: formData,
            })
            console.log(await postCover.json());
            if(postCover.ok){
              const coverData = await postCover.json()
              console.log(coverData);
            }
            
          } catch (error) {
            console.log('error uploading cover image');
          }
        }
        alert('Data successfully posted :)')
        this.setState({
          blog:{

            "category": "",
            "title": "",
            "cover":"",
            "content":"",
            /* "readTime": {
              "value": 1,
              "unit": "hours"
            }, */
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

          <label className="p-0 d-flex mt-2" for="image">                                     
            <input 
              onClick={(e)=> {e.stopPropagation()
                      return true}}  
              hidden
              type="file"
              id="image"
              ref={this.ref}
              /* id="image" */
              onChange={(e) => {this.setState({
                        blog:{...this.state.blog, 
                        image: e.target.files[0]}
                      })
                      console.log(e.target.files[0])}}
            />
          </label> 
          <Button
            onClick={()=> this.ref.current.click()}
            variant="dark"
            className="mt-3"
          >
            Upload Cover
          </Button>          

        {/* <div className="d-flex flex-row">
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
        </div> */}

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

          <label className="p-0 d-flex mt-2" for="avatarImage"> 
          <input 
              onClick={(e)=> {e.stopPropagation()
                      return true}}  
              /* style={{display:'none'}} */
              ref={this.avatarRef}
              hidden
              type="file"
              id="avatarImage"
              onChange={(e) => {this.setState({
                        blog:{...this.state.blog, 
                        author:{...this.state.blog.author,
                          image: e.target.files[0]}
                        }
                      })
                      console.log(e.target.files[0])}}
            />
          </label> 

          <Button
            onClick={()=> this.avatarRef.current.click()}
            variant="dark"
            className="mt-3"
          >
            Upload Avatar
          </Button> 

         {/*  <Form.Group  className="mt-3">
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
          </Form.Group> */}

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

          {/* <Form.Group  className="mt-3 invisible">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
            type="text"
            id="cover"           
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                cover: 'https://avatarfiles.alphacoders.com/896/thumb-89615.png'
              }
            })}
            size="lg" 
            placeholder="Link" />
          </Form.Group> */}

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

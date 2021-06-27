import React, { Component } from "react";
import striptags from "striptags";
import { Container, Image, Button, Form, Tabs, Tab, Card } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author";
/* import { AvatarGenerator } from 'random-avatar-generator'; */
import "./styles.css";
class Blog extends Component {
  state = {
    deletedComment:'',
    readTime:0,
    editComments:{
      'author':'',
      'text':''
    },
    commentPost:{
      'author':'',
      'text':''
    },
    comments:[],
    blog: {},
    loading: true,
  };

    componentDidUpdate =(prevProps, prevState)=>{
      console.log('this state deletedCOMMENTS', this.state.deletedComment);
      console.log('PREVSTATE COMMENTS', prevState.comments);
     if((prevState.commentPost.author !== this.state.commentPost.author) || (prevState.commentPost.text !== this.state.commentPost.text) || (this.state.deletedComment && !this.state.comments.includes(this.state.deletedComment._id))){
      this.setState({
        ...this.state,
        deletedComment:''
      })
      this.fetchComments()
    } 
  } 

 /*  AvatarGenerator = ()=>{
    const generator = new AvatarGenerator()
    console.log(generator);
    return generator.generateRandomAvatar() 
  } */

  htmlToSummary = async () => {
    if(this.state.blog){      
      console.log(await this.state.blog);
      let summary = await striptags(this.state.blog.content);
      console.log('Summary1',summary);
      const wordCount = await summary.length;
      console.log('wordCount',wordCount);
      const readingTime = await Math.floor(wordCount / 228) + 1
      console.log('readingTime', readingTime);
      this.setState({
        ...this.state,
        readTime:readingTime
      })
    }
  }

  fetchComments = async ()=>{
    console.log('comments ID',this.props.match.params.id);
    try {
      const url = `http://localhost:3001/blogs/${this.props.match.params.id}/comments`
      const response = await fetch(url)
      const data = await response.json()
      if(response.ok){
        this.setState({
          ...this.state,
          comments:data.reverse()
        })
      }
      else{
        console.log('there is error in fetching comments');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  commentInputHandle = (e)=>{
    const id= e.target.id
    this.setState({
      ...this.state,
      commentPost:{
        ...this.state.commentPost,
        [id]: e.target.value
      }
    })
  }

  postComment = async ()=>{
    try {
      const url =`http://localhost:3001/blogs/${this.props.match.params.id}/comments`
      const response = await fetch(url, {
        method:'POST',
        body:JSON.stringify(this.state.commentPost),
        headers:{
          'content-type': 'application/json'
        }
      })
      const data = await response.json()
      if(response.ok){
        alert('comment posted successfully')
        this.setState({
          ...this.state,
          commentPost:{
            'author':'',
            'text':''
          }
        })
      }
      else{
        console.log('error while posting new comment');
      }
    } catch (error) {
      console.log(error);
    }
  }

  id = this.props.match.params.id
  componentDidMount() {
    this.fetchComments()
    const { id } = this.props.match.params;
    console.log('edit',this.props.edited);
    console.log('id', id);
    console.log(this.props.data);
    const blog = this.props.data.find((post) => post._id.toString() === id);
     if(this.props.edited){
      this.setState({
        ...this.state,
        blog: this.props.edited,
        loading:false
      })
    }
    else if (!this.props.edited && blog) {
      this.setState({
        ...this.state, 
        blog, 
        loading: false });
    } else {
      console.log('error');
    }
    this.htmlToSummary()
  }

  editComment = async (e)=>{
    try {
      const url = `http://localhost:3001/blogs/${this.props.match.params.id}/comments/${e.currentTarget.id}`
      const response = await fetch(url,{
        method:'PUT',
        body:JSON.stringify(this.state.editComments),
        headers:{
          'content-type':'application/json'
        }
      })
      const data = await response.json()
      if (response.ok) {
        alert('comment edited successfully')
        this.setState({
          
        })
      } else {
        console.log('error editing comment');        
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteComment = async (e)=>{
    console.log('current',e.currentTarget.id);
    console.log('id',e.target.id);
    try {
      const url = `http://localhost:3001/blogs/${this.props.match.params.id}/comments/${e.currentTarget.id}`
      const response = await fetch(url,{
        method:'DELETE'
      })
      console.log(await response);
      const data = await response.json()
      if(response.ok){
        alert('comment deleted successfully')
        this.setState({
          ...this.state,
          deletedComment: data
        })
      }
      else{
        console.log('comment cannot be deleted');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  deleteBlog = async (e)=>{
    try {
      const response = await fetch(`http://localhost:3001/blogs/${this.props.match.params.id}`,{
        method:"DELETE"
      })
      if(response.ok){
        alert('successfully deleted')
      }
      else{
        console.log('error in deleting');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  currentTime =(dataTime) =>{
    let time = new Date(dataTime).toLocaleTimeString()
    console.log('time',time);
    return time
}

  currentDate =(dataDate) =>{
    let date = new Date(dataDate).toLocaleDateString()
    console.log('date',date);
    return date
}

  render() {
    let { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{this.currentDate(blog.createdAt)}</div>
                <div>{this.currentTime(blog.createdAt)}</div>
                <div>{`${this.state.readTime} ${this.state.readTime === 1? 'minute': 'minutes'} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <div className="d-flex justify-content-between mt-5 pt-5">
              <div>
                  <Link to={`/edit/${this.id}`}>
                    <Button
                      variant="secondary">
                        Edit Post
                      </Button>
                  </Link> 
              </div>
              <div>
                  <Link to="/">
                    <Button
                      onClick={(e)=>this.deleteBlog(e)} 
                      variant="danger">
                        Delete
                      </Button>
                  </Link> 
              </div>
            </div> 

            {/* Comments section */}

            <div className="mt-5 blog-comments">
                <Tabs defaultActiveKey="Comments" id="uncontrolled-tab-example">
                  <Tab eventKey="Comments" title="Comments">
                      <div className="mt-5">                                             
                        <div>
                            <Form.Group className="my-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            id="author"
                            required
                            value={this.state.commentPost.author}
                            onChange={(e)=> this.commentInputHandle(e)}
                            size="lg" 
                            placeholder="Author Name" />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                            id="text"
                            value={this.state.commentPost.text}
                            onChange={(e)=> this.commentInputHandle(e)}
                            as="textarea"
                            placeholder="Comment" 
                            rows={3} />
                          </Form.Group>

                        </div>
                        <Button
                            onClick={(e)=> this.postComment(e)}
                            className="mt-4 mb-4" 
                            variant="primary">
                                Post Comment
                        </Button>

                        <hr/>

                        <div className="mt-5">
                          <h6>{this.state.comments.length} {this.state.comments.length === 1?'Comment':'Comments'}</h6>
                          {this.state.comments.length ? this.state.comments.map( comment =>
                              <div key="comment._id" className="mb-3">
                                <Card>
                                  <Card.Header>
                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <h5>By: {comment.author}</h5>
                                      </div>                                      
                                      <div>
                                        <svg id={comment._id} onClick={(e)=>this.deleteComment(e)} style={{color:'red'}} focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                      </div>
                                    </div>                                   
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="d-flex flex-row justify-content-between">
                                      <div className="d-flex">
                                        <div className="pr-5">
                                          <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${comment._id}`} alt="avatar"/>
                                        </div>
                                        <div>
                                          <Card.Text>{comment.text}</Card.Text>
                                        </div>
                                      </div>
                                      <div className="">
                                          <svg onClick={(e)=>this.editComment(e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                          <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                                          </svg> 
                                      </div>
                                    </div>                                
                                  </Card.Body>
                                </Card>
                              </div>
                            )
                          :<p>Be first to comment</p>}
                        </div>
                      </div>
                  </Tab>

                  <Tab eventKey="profile" title="Profile">
                  
                  </Tab>
                  <Tab eventKey="contact" title="Contact" disabled>
                  
                  </Tab>
                </Tabs>
          </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);

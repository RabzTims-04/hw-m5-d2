import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author";
import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    comments:[],
    blog: {},
    loading: true,
  };

   /* componentDidUpdate =()=>{
    if(this.props.edited.length>0){
      this.setState({
        blog: this.props.edited,
        loading:false
      })
    }
  }  */

  fetchComments = async ()=>{
    console.log('comments ID',this.props.match.params.id);
    try {
      const url = `http://localhost:3001/blogs/${this.props.match.params.id}/comments`
      const response = await fetch(url)
      const data = await response.json()
      if(response.ok){
        this.setState({
          ...this.state,
          comments:data
        })
      }
      else{
        console.log('there is error in fetching comments');
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
    const { loading, blog } = this.state;
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
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
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
            <div className="mt-5">
              {this.state.comments.length? this.state.comments.map( comment =>
                <>
                  <p>{comment.text}</p>
                  <span>{comment.author}</span>
                </>
              )
            :<p>Be first to comment</p>}
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);

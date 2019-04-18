import React from 'react';
import { Button } from 'semantic-ui-react'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.successfulSubmit = this.successfulSubmit.bind(this);
  }

  handleChange(e) {
   this.setState({ text: e.currentTarget.value })
 }

 successfulSubmit({comment}) {
   this.setState({text: ''});
 }

//need to add args here
 submitComment() {
   this.props.createComment(this.props.commentableClass, this.props.commentableId, this.state.text).then(
     this.successfulSubmit
   );
  }

  render () {
      return (
        <div className="comment-form">
          <input type="text" onChange={this.handleChange} value={this.state.text} placeholder="Add a comment..."></input>
          <Button compact size='small' baisc color="orange" onClick={()=>this.submitComment()}>Comment</Button>
        </div>
      );
  }

}

export default CommentForm;

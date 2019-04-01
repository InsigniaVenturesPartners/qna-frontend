import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import AnswerVoteButtonContainer from '../answer_vote_button/answer_vote_button_container'

import CommentListContainer from '../comment_list/comment_list_container'
import CommentFormContainer from '../comment_form/comment_form_container'
import AnswerEditFormContainer from '../answer_form/answer_edit_form_container'
import { Button } from 'semantic-ui-react'

import '../../static/css/answer.css'
import '../../static/css/comment.css'

class AnswerItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {commentOpen: false, editOpen: false};
    this.comments = this.comments.bind(this)
  }

  componentWillMount() {
    this.props.requestAnswer(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.comments != nextProps.comments) {
      this.props.requestAnswer(this.props.id);
    }
  }

  openEditForm = () => {
    this.setState({editOpen: true});
  }

  closeEditForm = () => {
    this.setState({editOpen: false});
  }

  comments(id, commentIds) {
    if(this.state.commentOpen) {
      return (<div className="comments">
        <CommentFormContainer commentableId={id} commentableClass="Answer"/>
      <CommentListContainer commentIds={commentIds} commentableId={id} type={"answer"} />
      </div>);
    }
    return null;
  }

  render () {
    const { answer, voteOnAnswer, user } = this.props;

    if (Object.keys(answer).length === 0) {
      return(<img src="https://image.ibb.co/iYo1yw/Screen_Shot_2017_09_28_at_6_43_28_PM.png" alt={`loading-image`}  className="loading-image" />);
    } else {
      const {id, body, author, time_posted_ago, upvoterIds, upvoted, downvoted, commentIds} = answer;
      let answerBody;

      if(downvoted) {
        answerBody = <div><h2></h2>You downvoted this answer.<h3>Downvoting low-quality content improves Quera for everyone.</h3></div>
      } else {
        if(this.state.editOpen) {
          answerBody = <AnswerEditFormContainer answerId={id} body={body} closeEditForm={this.closeEditForm}/>
        } else {
          answerBody = ReactHtmlParser(body)
        }
      }

      const editButton = answer.author.id === user.id ?
        <Button basic color="orange" className="edit-answer-button" onClick={this.openEditForm.bind(this)}>
          <div>Edit Answer</div>
        </Button> : null;

      return (
        <div className="answer-item">
          <div className="answer-header">
            <img src={author.pro_pic_url} alt={`${author.name}'s picture`}  className="answerer-pro-pic" />
            <div className="answer-details">
              <h1>{author.name}</h1>
              <h2>Answered {time_posted_ago}</h2>
            </div>
          </div>
          <div className="answer-body">{answerBody}</div>
          <div className="answer-buttons">
            <AnswerVoteButtonContainer id={id} upvoterIds={upvoterIds} upvoted={upvoted} downvoted={downvoted}/>
            <button className="comments-button" onClick={()=>this.setState({commentOpen: !this.state.commentOpen})}>Comments {commentIds.length}</button>

            {editButton}
          </div>
          {this.comments(id, commentIds)}
        </div>
      );
    }
  }
}

export default AnswerItem;

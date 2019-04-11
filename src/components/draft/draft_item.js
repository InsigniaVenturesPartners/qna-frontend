import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import AnswerVoteButtonContainer from '../answer_vote_button/answer_vote_button_container'

import CommentListContainer from '../comment_list/comment_list_container'
import CommentFormContainer from '../comment_form/comment_form_container'
import DraftFormContainer from '../draft/draft_form_container'
import { Button } from 'semantic-ui-react'

import '../../static/css/answer.css'
import '../../static/css/comment.css'

class AnswerItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {commentOpen: false, editOpen: false}
  }

  componentWillMount() {
    // this.props.requestAnswer(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.comments != nextProps.comments) {
    //   this.props.requestAnswer(this.props.id);
    // }
  }

  openEditForm = () => {
    this.setState({editOpen: true});
  }

  closeEditForm = () => {
    this.setState({editOpen: false});
  }

  render () {
    const { draft, voteOnAnswer, user } = this.props;

    if (Object.keys(draft).length === 0) {
      return(<img src="https://image.ibb.co/iYo1yw/Screen_Shot_2017_09_28_at_6_43_28_PM.png" alt={`loading-image`}  className="loading-image" />);
    } else {
      const {id, body, author, time_posted_ago, question} = draft;
      let answerBody;

      if(this.state.editOpen) {
        answerBody = <DraftFormContainer draft={draft} questionId={question.id} body={body} closeEditForm={this.closeEditForm}/>
      } else {
        answerBody = ReactHtmlParser(body)
      }


      const editButton = draft.author.id === user.id ?
        <Button compact size="small" basic color="orange" className="edit-answer-button" onClick={this.openEditForm.bind(this)}>
          <div>Edit Draft</div>
        </Button> : null;

      return (
        <div className="answer-item">
          <div className="answer-body">{answerBody}</div>
          <div className="answer-buttons">
            {editButton}
          </div>
        </div>
      );
    }
  }
}

export default AnswerItem;

import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router';

import AnswerVoteButtonContainer from '../answer_vote_button/answer_vote_button_container';



class AnswerDetail extends React.Component {
  componentWillMount() {
    this.props.requestAnswer(this.props.id);
    window.scrollTo(0, 0);
  }

  render () {
    const { answer } = this.props;

    if (Object.keys(answer).length === 0) {
      return(<img src="https://image.ibb.co/iYo1yw/Screen_Shot_2017_09_28_at_6_43_28_PM.png" alt={`loading`}  className="loading-image" />);
    } else {
      const {id, body, author, time_posted_ago, upvoterIds, question} = answer;
      return (
        <div className="answer-detail-view">
          <Link to={`/questions/${question.id}`}  >{question.body}</Link>
          <div className="answer-header">
            <img src={author.pro_pic_url} alt={`${author.name}`}  className="answerer-pro-pic" />
            <div className="answer-details">
              <h1>{author.name}</h1>
              <h2>Answered {time_posted_ago}</h2>
            </div>
          </div>

          <div className="answer-body">{ReactHtmlParser(body)}</div>
          <AnswerVoteButtonContainer id={id} upvoterIds={upvoterIds}/>

        </div>


      );
    }
  }
}

export default AnswerDetail;

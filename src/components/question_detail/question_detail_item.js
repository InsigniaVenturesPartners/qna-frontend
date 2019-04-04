import React from 'react';
import {Link} from 'react-router';

import AnswerItemContainer from '../answer_list/answer_item_container';
import AnswerFormContainer from '../answer_form/answer_form_container';

import QuestionButtonsContainer from '../question_buttons/question_buttons_container';

import '../../static/css/question_detail.css'

class QuestionDetailItem extends React.Component {
  render () {
    const { question } = this.props;
    const { id, body, followerIds, answerIds, tags, followed, downvoted} = question;
    const answerItems = answerIds.map(id => (
      <AnswerItemContainer
        key={ "answer-" + id }
        id={id}
        />
      )
    );
    if(answerItems.length === 0) {
      return (
        <div className="question-detail-item">
          <h2 className="question-header">{body}</h2>
          <h3 className="no-answers-message">No answers for this question written yet!</h3>
          <AnswerFormContainer questionId={id} />
        </div>
      );
    } else {
      const tagItems = tags.map(tag => <Link key={ "topic-tag-" + tag[0] } to={`/topics/${tag[0]}`} >{tag[1]}</Link>);
      return (
        <div className="question-detail-item">
          <h2 className="question-header">{body}</h2>
          <div className="tags">
            {tagItems}
          </div>
            <QuestionButtonsContainer id={id} followerIds={followerIds} followed={followed} downvoted={downvoted}/>

          <div className="answer-list">{answerItems}</div>
        </div>
      )
    }

  }

}

export default QuestionDetailItem;

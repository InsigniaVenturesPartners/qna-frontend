import React from 'react'

import QuestionItemContainer from '../question/question_item_container'

import '../../static/css/answer.css';

class HomeItem extends React.Component {
  render () {
    const { questions } = this.props;

    const questionItems = questions.sort(function(a, b) {
      const answerCount1 =  a.answerIds.length;
      const answerCount2 =  b.answerIds.length;

      if((answerCount1>0 && answerCount2>0) || (answerCount1===0 && answerCount2===0)) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      } else if(answerCount1>answerCount2) {
        return -1;
      } else {
        return 1;
      }
    }).map(question => (
      <QuestionItemContainer
        key={ "question-" + question.id }
        id={question.id}
        />
      ));

    return (
      <div className="home-item">

        {questionItems}

      </div>
    );
  }
}

export default HomeItem;

import React from 'react';

import QuestionListItem from './question_list_item'

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from 'semantic-ui-react'

import '../../static/css/question_list.css';

class QuestionList extends React.Component {
  componentWillMount() {
    this.props.requestQuestions();
  }

  render() {
    const {questions} = this.props;
    if(Object.keys(questions).length === 0) {
      return (
        <div id="questions-container">
          <Header as='h1'>No questions</Header>
        </div>
      )
    } else {
      const questionItems = questions.map( question => (
        <QuestionListItem key={ "question-" + question.id } question={question}/>
      )).reverse();
      return(
        <div className="questions-container">
          <h1>
            <FontAwesomeIcon icon={faStar} className="highlight"  />
            Top Questions for You
          </h1>
          <div className="question-list">
            {questionItems}
          </div>
        </div>
      );

    }
  }
}

export default QuestionList;

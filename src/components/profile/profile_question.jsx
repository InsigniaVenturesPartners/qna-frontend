import React from 'react'

import QuestionListItem from '../question_list/question_list_item'

import { Header } from 'semantic-ui-react';
import ProfilePageContainer from './profile_page_container';

class ProfileQuestion extends React.Component {
  componentWillMount() {
    this.props.requestQuestions();
  }

  render () {
    const { questions } = this.props;
    const questionItems = questions.map( question => (
      <QuestionListItem key={ "profile-question-" + question.id } question={question}/>
      )).reverse();

    const singleOrPluralText = questions.length <= 1 ? "Question" : "Questions"
    const headerText = `${questions.length} ${singleOrPluralText}`

    if(questions.length === 0) {
      return null
    }

    return (
      <div>
        <ProfilePageContainer/>
        <div id="questions-container">
          <Header as='h1'>{headerText}</Header>

          <ul className="question-list">
            {questionItems}
          </ul>
        </div>

      </div>
    );
  }
}

export default ProfileQuestion;


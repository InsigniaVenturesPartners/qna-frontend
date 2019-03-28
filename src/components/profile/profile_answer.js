import React from 'react'
import { Header } from 'semantic-ui-react';

import QuestionItemContainer from '../question/question_item_container'
import ProfilePageContainer from './profile_page_container';

class ProfileAnswer extends React.Component {
  componentWillMount() {
    this.props.requestAnswers();
  }

  render () {
    const { answers } = this.props;

    const questionItems = answers.map(answer => (
      <QuestionItemContainer
        key={ "question-" + answer.question.id }
        id={answer.question.id}
        answerId={answer.id}
        />
    ))

    const singleOrPluralText = answers.length <= 1 ? "Answer" : `Answers`
    const headerText = `${answers.length} ${singleOrPluralText}`

    return (
      <div>
        <ProfilePageContainer/>
      <div id="answers-container">
        <Header as='h1'>{headerText}</Header>

        <ul className="question-list">
          {questionItems}
        </ul>
      </div>
      </div>
    );
  }
}

export default ProfileAnswer;


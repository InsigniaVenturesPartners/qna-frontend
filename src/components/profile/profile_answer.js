import React from 'react'
import { Link } from 'react-router'

import { Container, Header } from 'semantic-ui-react';

import AnswerItemContainer from '../answer_list/answer_item_container'
import TopicSearchContainer from '../topic_search/topic_search_container'
import FollowTopicButtonContainer from '../follow_topic_button/follow_topic_button_container'

import QuestionItemContainer from '../question/question_item_container'
import ProfilePageContainer from './profile_page_container';


class ProfileAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

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


    if(answers.length === 0) {
       return null
    }

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


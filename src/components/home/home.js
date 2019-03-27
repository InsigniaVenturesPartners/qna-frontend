import React from 'react';

import HomeItem from './home_item'
import CreateQuestionFormContainer from '../create_question_form/create_question_form_container';

class Home extends React.Component {
  componentWillMount() {
    this.props.requestQuestions();
  }

  render() {
    const { questions } = this.props
    const homeItems = <HomeItem key={ "question-1" } questions={questions}/>

    return(
      <div>
      <CreateQuestionFormContainer/>
      <div id="topics-container">
        <ul className="topic-list">
          {homeItems}
        </ul>
      </div>
      </div>
    );
  }
}

export default Home;

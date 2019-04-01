import React from 'react';

import HomeItem from './home_item'
import CreateQuestionFormContainer from '../create_question_form/create_question_form_container';

import '../../static/css/home.css';

class Home extends React.Component {
  render() {
    const { questions } = this.props
    const homeItems = <HomeItem key={ "question-1" } questions={questions}/>

    return(
      <div>
        <CreateQuestionFormContainer/>
        <div id="home-container">
          <div className="item-list">
            {homeItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

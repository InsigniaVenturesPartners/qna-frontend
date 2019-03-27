import React from 'react';

import HomeItem from './home_item'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.requestQuestions();
  }

  render() {
    const { questions } = this.props
    const homeItems = <HomeItem key={ "question-1" } questions={questions}/>

    return(
      <div id="topics-container">
        <ul className="topic-list">
          {homeItems}
        </ul>
      </div>
    );
  }
}

export default Home;

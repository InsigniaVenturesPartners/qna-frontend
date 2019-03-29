import React from 'react'

import QuestionSearchInput from './question_search_input'
import QuestionSearchItem from './question_search_item'

import '../../static/css/question_search.css'

class QuestionSearch extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const {questions, query, updateFilter} = this.props
    //fetch only 10 search results
    const fewerQuestions = questions.slice(0,10);
    const QuestionItems = fewerQuestions.map(question => (
      <QuestionSearchItem key={"question-search-item-" + question.id} question={question} updateFilter={updateFilter} query={query}/>
    ));

    return (
      <div className="question-search">
        <QuestionSearchInput
          className="search-input"
          query={query}
          updateFilter={updateFilter}
        />

        <div className="question-search-list">
           {QuestionItems}
        </div>
      </div>
    );

  }
}


export default QuestionSearch;

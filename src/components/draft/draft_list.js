import React from 'react'
import { Link } from 'react-router'
import { Header } from 'semantic-ui-react'

import DraftItemContainer from './draft_item_container'

import '../../static/css/answer.css'
import '../../static/css/draft_list.css'

class DraftList extends React.Component {
  componentWillMount() {
    this.props.requestDrafts()
  }

  render () {
    const { drafts } = this.props;

    const questionItems = drafts.map(draft => (
      <div className="draft-question-list" key={"draft-question-" + draft.question.id}>
        <div className="draft-question-item">
          <Link to={`/questions/${draft.question.id}`} className="question-header">{draft.question.body}</Link>
          <div className="answer-list">
            <DraftItemContainer id={draft.id}/>
          </div>
        </div>
      </div>
    ))

    const singleOrPluralText = drafts.length <= 1 ? "Draft" : `Drafts`
    const headerText = `${drafts.length} ${singleOrPluralText}`

    return (
      <div id="answers-container">
        <Header as='h1'>{headerText}</Header>
        {questionItems}
      </div>
    );
  }
}

export default DraftList;


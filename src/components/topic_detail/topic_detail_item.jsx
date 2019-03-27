import React from 'react';

import QuestionItemContainer from '../question/question_item_container';
import FollowTopicButtonContainer from '../follow_topic_button/follow_topic_button_container'

class TopicDetailItem extends React.Component {
  render () {
    const { topic } = this.props;
    const { id, name, description, num_followers, questionIds, followerIds, followed, pic_url} = topic;

    let questionItems = questionIds.map(id => (
      <QuestionItemContainer
        key={ "question-" + id }
        id={ id }
        />
      )
    );

    if(questionItems.length === 0) {
      questionItems = <div className="no-topic-questions">No questions have been written for this topic yet </div>;
    }

    return (
      <div className="topic-detail-item">
        <div className="topic-header">
          <div className="topic-header-pic">
            <img src={pic_url} alt={`${topic.name}'s picture`}  className="user-pro-pic" />
          </div>
          <h1>{name}</h1>
          <FollowTopicButtonContainer id={id} followerIds={followerIds} followed={followed}/>
        </div>

        <ul className="question-list">{questionItems}</ul>
      </div>
    );

  }
}

export default TopicDetailItem;

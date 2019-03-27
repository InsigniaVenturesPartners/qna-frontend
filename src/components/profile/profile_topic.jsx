import React from 'react';
import { Link } from 'react-router';

import FollowTopicButtonContainer from '../follow_topic_button/follow_topic_button_container'
import ProfilePageContainer from './profile_page_container';

class ProfileTopic extends React.Component {
  componentWillMount() {
    this.props.requestTopics();
  }

  render () {
    const { topics } = this.props;

    const topicItems = topics.map( topic => (
      <li className="profile-question-list-item" key={ "topic-" + topic.id }>
        <div>
          <img src={topic.pic_url} alt="topic-pic-url"/>
        </div>
        <Link to={`/topics/${topic.id}`}>{topic.name}</Link>
        <FollowTopicButtonContainer id={topic.id} followerIds={topic.followerIds} followed={topic.followed}/>
      </li>
    ));

    return (
      <div>
        <ProfilePageContainer/>
       <li className="profile-topic-list-item">
        <h2>Following Topics</h2>
        <ul className="profile-question-list">{topicItems}</ul>
      </li>

      </div>
    );

  }
}

export default ProfileTopic;


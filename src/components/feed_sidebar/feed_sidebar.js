import React from 'react';
import {Link, withRouter} from 'react-router';

class FeedSidebar extends React.Component {
  componentWillMount() {
    this.props.requestTopics();
  }

  render() {
    const {topics, location} = this.props;
    const pathname = location.pathname;

    if(pathname === "/" || pathname.startsWith("/topics")) {
      const topicItems = topics.map( topic => (
          <li key={ "topic-" + topic.id }>
            <Link to={`/topics/${topic.id}`}>
              <div className="feed-sidebar-topic-pic">
                <img src={topic.pic_url} alt="topic-pic-url"/>
              </div>
              <div className="feed-sidebar-topic-label">
                {topic.name}
              </div>
            </Link>
          </li>
          ));

      return(
        <div className="feed-sidebar">
          <div className="feed-sidebar-header">
          </div>
          <ul className="sidebar-topic-list">
            {topicItems}
          </ul>
        </div>
      );
    } else if(pathname.startsWith("/profile")) {
      const sideBarList = ["topics", "questions", "answers"];
      const sideBarItems = sideBarList.map(sideBarItem => (
            <li key={sideBarItem}>
              <Link to={`/profile/${sideBarItem}`}>
                <div className="feed-sidebar-topic-label">
                  {sideBarItem.charAt(0).toUpperCase() + sideBarItem.slice(1)}
                </div>
              </Link>
            </li>
          ));

      return(
        <div className="feed-sidebar">
          <div className="feed-sidebar-header">
          </div>
          <ul className="sidebar-topic-list">
            {sideBarItems}
          </ul>
        </div>
      );
    } else {
      return null
    }
  }
}

export default withRouter(FeedSidebar);

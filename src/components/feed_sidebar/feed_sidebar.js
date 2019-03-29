import React from 'react';
import {Link, withRouter} from 'react-router';

import '../../static/css/sidebar.css';
import '../../static/css/button.css';

class FeedSidebar extends React.Component {
  componentWillMount() {
    this.props.requestTopics();
  }

  render() {
    const {topics, location} = this.props;
    const pathname = location.pathname;
    let itemList;

    if(pathname === "/" || pathname.startsWith("/topics")) {
      itemList = topics.map( topic => (
          <div className="sidebar-item" key={ "topic-" + topic.id }>
            <Link to={`/topics/${topic.id}`}>
              <div className="feed-sidebar-topic-pic">
                <img src={topic.pic_url} alt="topic-pic-url"/>
              </div>
              <div className="feed-sidebar-topic-label">
                {topic.name}
              </div>
            </Link>
          </div>
          ));
    } else if(pathname.startsWith("/profile")) {
      const sideBarList = ["topics", "questions", "answers"];
      itemList = sideBarList.map(sideBarItem => (
            <div className="sidebar-item" key={sideBarItem}>
              <Link to={`/profile/${sideBarItem}`}>
                <div className="feed-sidebar-topic-label">
                  {sideBarItem.charAt(0).toUpperCase() + sideBarItem.slice(1)}
                </div>
              </Link>
            </div>
          ));
    } else {
      itemList = null
    }

    if(pathname.startsWith("/answer")) {
      return null
    }

    return(
      <div className="feed-sidebar">
        <div className="feed-sidebar-header">
        </div>
        <div className="sidebar-topic-list">
          {itemList}
        </div>
      </div>
    );
  }
}

export default withRouter(FeedSidebar);

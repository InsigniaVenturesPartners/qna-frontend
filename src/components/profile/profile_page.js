import React from 'react';

class ProfilePage extends React.Component {
  render () {
    const { user } = this.props;

    return (
      <div id="topics-container">
        <ul className="topic-list">
          <div className="profile-greeting">
            <div className="profile-header">
              <img src={user.pro_pic_url} alt={`${user.name}`}  className="user-pro-pic" />
              <h2>{user.name}</h2>
            </div>
          </div>
        </ul>
      </div>
    );

  }
}

export default ProfilePage;


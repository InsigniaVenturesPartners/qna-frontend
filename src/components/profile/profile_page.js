import React from 'react';
import '../../static/css/profile_page.css'

class ProfilePage extends React.Component {
  render () {
    const { user } = this.props;

    return (
      <div id="profile-container">
        <div className="profile-header">
          <img src={user.pro_pic_url} alt={`${user.name}`}  className="user-pro-pic" />
          <h2>{user.name}</h2>
        </div>
      </div>
    );

  }
}

export default ProfilePage;


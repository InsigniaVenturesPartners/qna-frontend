import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { GoogleLogin } from 'react-google-login'
import { ENV } from '../env/env'

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidMount() {
    if(!this.props.isLoggedIn) {
        this.props.actionConfAndInit()
    }
  }

  onSave(event) {
    event.preventDefault();
  }

  handleSuccess() {
    this.props.loggedIn()
  }

  handleFailure(response) {
    console.log(response);
  }

  render () {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else if(sessionStorage.getItem('access_token')) {
      return null;
    } else {
      return (
        <div className="login-container d-flex justify-content-center align-items-center">
          <div className="login-form">
            <div className="login-header">
              <h1>Insignia Community</h1>
              <h2>A place to share knowledge</h2>
            </div>
            <div className="login-btn">
              <GoogleLogin
                  clientId={ENV.GOOGLE_CLIENT_ID}
                  buttonText="Continue with Google"
                  className="google-button"
                  onSuccess={this.handleSuccess}
                  onFailure={this.handleFailure}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    appInitialized: state.initialized,
    isLoggedIn: state.auth.isLoggedIn,
    currentURL: ownProps.location.pathname,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, {
  loggedIn: actions.loggedIn,
  actionConfAndInit: actions.configAndInitialize
})(AuthContainer)


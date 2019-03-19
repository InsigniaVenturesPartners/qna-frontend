import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ReactGA from 'react-ga'
// import { GOOGLE_ANALYTICS_TRACKING_ID } from '../util/constant'
import { GoogleLogin } from 'react-google-login'
import { ENV } from '../env/env'

class AuthContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    // componentDidMount() {
    //     this.props.actionConfAndInit()
    // }

    componentWillUpdate () {
        if (this.props.isLoggedIn) {
            let gaUserId = this.props.currentUser.name.split(' ').join('') + '-' + this.props.currentUser.id
            ReactGA.set({ userId: gaUserId })
            ReactGA.pageview(window.location.pathname + window.location.search)
        }
    }

    onSave(event) {
        event.preventDefault();
    }

    handleSuccess(response) {
      this.props.loggedIn(response)
    }

    handleFailure(response) {
      console.log(response);
    }

    render () {
        if (this.props.isLoggedIn || sessionStorage.getItem('access_token')) {
            return this.props.children
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
    loggedIn: actions.loggedIn
})(AuthContainer)


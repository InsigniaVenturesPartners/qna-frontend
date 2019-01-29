import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ReactGA from 'react-ga'
// import { GOOGLE_ANALYTICS_TRACKING_ID } from '../util/constant'

class GoogleAuthContainer extends React.Component {
    componentDidMount () {
        this.props.actionConfAndInit()
        // ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID)
    }

    componentWillUpdate () {
        if (this.props.isLoggedIn) {
            let gaUserId = this.props.currentUser.name.split(' ').join('') + '-' + this.props.currentUser.id
            ReactGA.set({ userId: gaUserId })
            ReactGA.pageview(window.location.pathname + window.location.search)
        }
    }

    render () {
        if (this.props.isLoggedIn) {
            return this.props.children
        } else {
            return null
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
    actionConfAndInit: actions.configAndInitialize
})(GoogleAuthContainer)


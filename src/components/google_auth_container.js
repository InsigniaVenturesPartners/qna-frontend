import React from 'react'
import { connect } from 'react-redux'

class GoogleAuthContainer extends React.Component {

    render () {
        return (
            <div></div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    return {
        appInitialized: ""
    }
}

export default connect(mapStateToProps, {
    actionConfAndInit: ""
})(GoogleAuthContainer)

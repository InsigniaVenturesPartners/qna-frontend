import React from 'react';
import { connect } from 'react-redux'
import '../static/css/style.css';

const App = (props) => {
    return (
        <div>

        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        currentURL: ownProps.location.pathname
    };
}

export default connect(mapStateToProps)(App)

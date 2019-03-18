import React from 'react';
import { Container } from 'semantic-ui-react'

import { connect } from 'react-redux'

import '../static/css/style.css';

const App = (props) => {
    return (
        <div>
            <Container className='body'>
                {props.children}
            </Container>
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        currentURL: ownProps.location.pathname
    };
}

export default connect(mapStateToProps)(App)

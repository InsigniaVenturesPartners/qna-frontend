import React from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import Header from './header';
import '../static/css/style.css';

const App = (props) => {
    return (
        <div>
          <div className='top-header'>
            <Header path={props.currentURL}/>
          </div>
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

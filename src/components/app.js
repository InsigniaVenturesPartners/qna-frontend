import React from 'react';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import Header from './header'
import FeedSidebarContainer from './feed_sidebar/feed_sidebar_container';

import '../static/css/style.css'

const App = (props) => {
    return (
        <div className="app-container">
          <div className="ribbon ribbon-main">BETA</div>

          <Header path={props.currentURL}/>
          <FeedSidebarContainer/>

          <Container className="body">
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

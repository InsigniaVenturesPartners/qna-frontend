import React, { Component } from 'react';
import { Container, Grid, Header, Icon,} from 'semantic-ui-react';
import {connect} from 'react-redux'
import * as actions from '../actions';
import {browserHistory} from 'react-router';


class Unauthorized extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.current_user.access_token !== nextProps.current_user.access_token) {
            browserHistory.goBack();
            return true;
        }
        return false;
    }

    render() {
        return (
            <Container>
                <Grid columns={1}>
                    <Grid.Column>
                        <Header textAlign='center' style={{fontSize: '8em', marginTop:100}}>401</Header>
                        <Header textAlign='center' size='huge'>
                            Unauthorized
                            <Header.Subheader>
                                You are not authorized to access the documents requested.
                                <p>You have yet to log in or your session has expired.</p>
                                <p>Click to refresh</p>
                                <Icon link name='refresh' size='massive'
                                      onClick={() => {
                                          this.props.actionConfAndInit();
                                      }}
                                />
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        current_user: "",
    };
}

export default connect(mapStateToProps, {
    actionConfAndInit: actions.configAndInitialize,
})(Unauthorized)

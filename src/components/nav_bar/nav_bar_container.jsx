import { connect } from 'react-redux';
import NavBar from './nav_bar';

import { createQuestion } from '../../actions/question_actions';
import { logOut } from '../../actions';

// Actions

const mapStateToProps = (state) => {
	user: state.auth.currentUser
};

const mapDispatchToProps = dispatch => ({
  createQuestion: (body) => dispatch(createQuestion(body)),
  logOut: () => dispatch(logOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

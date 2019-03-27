import { connect } from 'react-redux';
import AnswerForm from './answer_form';

import { withRouter } from 'react-router';

// Actions
import { createAnswer } from '../../actions/answer_actions';

const mapStateToProps = (state, ownProps) => ({
  questionId: ownProps.questionId,
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  createAnswer: (body, question_id) => dispatch(createAnswer(body, question_id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerForm));

import { connect } from 'react-redux';

import QuestionForm from './create_question_form';

// Actions
import { createQuestion } from '../../actions/question_actions';

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser
  }
};


const mapDispatchToProps = dispatch => ({
  createQuestion: (body) => dispatch(createQuestion(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm);

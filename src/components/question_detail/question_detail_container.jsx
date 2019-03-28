import { connect } from 'react-redux';
import { selectQuestion } from '../../reducers/selectors';
import QuestionDetail from './question_detail';

// Actions
import { fetchQuestion, voteOnQuestion, followQuestion, unfollowQuestion } from '../../actions/question_actions';

const mapStateToProps = (state, ownProps) => {
  const questionId = parseInt(ownProps.params.id, 10);
  const question = selectQuestion(state, questionId);
  const tags = question.tags;
  return {
    questionId,
    question,
    tags
  }
};

const mapDispatchToProps = dispatch => ({
  requestQuestion: (id) => dispatch(fetchQuestion(id)),
  voteOnQuestion: (id, type) => dispatch(voteOnQuestion(id, type)),
  followQuestion: (id) => dispatch(followQuestion(id)),
  unfollowQuestion: (id) => dispatch(unfollowQuestion(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetail);

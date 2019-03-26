import { connect } from 'react-redux';
import { allTopics, allQuestions } from '../../reducers/selectors';
import Home from './home';

// Actions
import { fetchTopics } from '../../actions/topic_actions';
import { fetchQuestions } from '../../actions/question_actions';
import { fetchAnswers } from '../../actions/answer_actions';
import { voteOnAnswer } from '../../actions/answer_actions';

const mapStateToProps = state => ({
  topics: allTopics(state),
  questions: allQuestions(state),
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  requestQuestions: () => dispatch(fetchQuestions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

import { connect } from 'react-redux';
import { selectAnswer } from '../../reducers/selectors';
import AnswerDetail from './answer_detail';

// Actions
import { fetchAnswer } from '../../actions/answer_actions';

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.params.id, 10);
  const answer = selectAnswer(state, id);
  return {
    id,
    answer
  }
};

const mapDispatchToProps = dispatch => ({
  requestAnswer: (id) => dispatch(fetchAnswer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerDetail);

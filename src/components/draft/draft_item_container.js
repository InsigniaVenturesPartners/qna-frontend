import { connect } from 'react-redux'
import { selectDraft } from '../../reducers/selectors'
import DraftItem from './draft_item'

// Actions
import { fetchAnswer, editAnswer, voteOnAnswer } from '../../actions/answer_actions';

const mapStateToProps = (state, ownProps) => ({
  draft: selectDraft(state, ownProps.id),
  id: ownProps.id,
  errors: state.errors,
  user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestAnswer: (id) => dispatch(fetchAnswer(id)),
  editAnswer: (body, answerId) => dispatch(editAnswer(body, answerId)),
  voteOnAnswer: (id, type) => dispatch(voteOnAnswer(id, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftItem);

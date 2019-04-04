import { connect } from 'react-redux'
import DraftForm from './draft_form'

import { withRouter } from 'react-router'

// Actions
import { saveDraft } from '../../actions/draft_actions'
import { submitDraftAsAnswer } from '../../actions/answer_actions'

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  questionId: ownProps.questionId,
  body: ownProps.body,
  current_user: state.auth.currentUser

});

const mapDispatchToProps = dispatch => ({
  submitAnswer: (body, draft) => dispatch(submitDraftAsAnswer(body, draft)),
  saveDraft: (body, questionId) => dispatch(saveDraft(body, questionId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftForm));

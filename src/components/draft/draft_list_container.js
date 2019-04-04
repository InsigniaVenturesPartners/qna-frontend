import { connect } from 'react-redux'
import DraftList from './draft_list'

// Actions
import { fetchDrafts } from '../../actions/draft_actions'
import { allDrafts } from '../../reducers/selectors'

const mapStateToProps = (state) => ({
  drafts: allDrafts(state),
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	requestDrafts: () => dispatch(fetchDrafts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftList);
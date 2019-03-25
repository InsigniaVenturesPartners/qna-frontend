import { connect } from 'react-redux';

import { updateFilter } from '../../actions/filter_actions';
import { asSortedArray } from '../../reducers/selectors';
import QuestionSearch from './question_search';

const mapStateToProps = state => ({
  questions: state.questions,
  // query: state.filters.query
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionSearch);

import { connect } from 'react-redux';
import { selectTopic } from '../../reducers/selectors';
import TopicDetail from './topic_detail';

// Actions
import { fetchTopic } from '../../actions/topic_actions';

const mapStateToProps = (state, ownProps) => {
  const topic_id = parseInt(ownProps.params.id);
  const topic = selectTopic(state, topic_id);
  return {
    topic_id,
    topic
  }
};

const mapDispatchToProps = dispatch => ({
  requestTopic: (id) => dispatch(fetchTopic(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDetail);

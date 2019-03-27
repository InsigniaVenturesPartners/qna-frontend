import { connect } from 'react-redux';
import { selectDetailTopic } from '../../reducers/selectors';
import TopicDetail from './topic_detail';

// Actions
import { fetchTopic } from '../../actions/topic_actions';

const mapStateToProps = (state, ownProps) => {
  const topicId = parseInt(ownProps.params.id, 10);
  const topic = selectDetailTopic(state, topicId);
  return {
    topicId,
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

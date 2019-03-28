import { connect } from 'react-redux';
import ProfilePage from './profile_page';

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.currentUser,
  id: ownProps.id,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
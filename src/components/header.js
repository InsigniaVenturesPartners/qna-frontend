import { connect } from 'react-redux'
import React from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router'

import Checkbox from 'muicss/lib/react/checkbox'
import { Button, Container } from 'semantic-ui-react'

import { createQuestion, fetchQuestions } from '../actions/question_actions'
import { logOut } from '../actions';
import { allTopics, allQuestions } from '../reducers/selectors'

import { customStyles, cancelStyles } from './create_question_form/create_question_form'
import QuestionSearchContainer from './question_search/question_search_container'

import { faHome, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../static/css/header.css'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      createModalIsOpen: false,
      successModalIsOpen: false,
      question: "",
      askedQuestion: {},
      checkedTopics: new Map()
    };

    this.setQuestion = this.setQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this)

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  componentWillMount() {
    this.props.requestQuestions();
    Modal.setAppElement('body');
  }

  openModal(modalName) {
    let desiredState = {question: ""};
    desiredState[modalName+"ModalIsOpen"] = true;
    this.setState(desiredState);
  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal(modalName) {
    let desiredState = {};
    desiredState[modalName+"ModalIsOpen"] = false;
    this.setState(desiredState);
  }

  setQuestion(e) {
    let question = e.target.value ? e.target.value : "";
    question = question.charAt(0).toUpperCase() + question.slice(1);
    this.setState({ question });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createQuestion(this.state.question, Array.from(this.state.checkedTopics.keys())).then(
      question => this.handleSuccessfulSubmit(question.question.data)
    );
  }

  handleSuccessfulSubmit(question) {
    this.closeModal("create");
    this.setState({askedQuestion: question, question: "", checkedTopics: new Map()})
    this.openModal("success")
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedTopics.set(item, isChecked) }));
  }

  handleSignOut(e) {
    e.preventDefault()
    this.props.logOut()
  }

  render() {
    const {user, topics} = this.props
    const topicItems = topics.map( topic => (
          <Checkbox key={"checkbox-topic-" + topic.id} name={topic.name} label={topic.name} checked={this.state.checkedTopics.get(topic.name)} onChange={this.handleChange}/>
        ));

    return(
      <div>
      <div className="nav-bar desktop-only">
        <div className="nav-bar-items ">
          <div id="nav-home" className={"nav-link " + (this.props.path === "/" ? "highlighted" : "")} >
            <Link to={`/`}>
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
          </div>

          <div id="nav-answer" className={"nav-link " + (this.props.path === "/answer" ? "highlighted" : "")}>
            <Link to={`/answer`}>
            <FontAwesomeIcon icon={faEdit} />
              Answer
            </Link>
          </div>

          <div className="nav-search">
            <QuestionSearchContainer />
          </div>

          <div id="nav-pro-pic-container">
            <Link to={`/profile`}>
              <img src={user.pro_pic_url} alt={`${user.name}'s`}  className="nav-pro-pic" />
            </Link>
          </div>
          <Button color='orange' type='submit'
            onClick={(() => this.openModal("create"))}>
            Ask Question
          </Button>

          <Button color='orange' type='submit'
            onClick={this.handleSignOut}>
            Sign Out
          </Button>


        </div>
        <Modal
          isOpen={this.state.createModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={()=>this.closeModal("create")}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className="question-modal-header">
            <img src={user.pro_pic_url} alt={`${user.name}`}  className="user-pro-pic" />
            <span id="modal-username">{user.name} asks</span>
          </div>

          <input onChange={this.setQuestion} placeholder="What is your question?" value={this.state.question} autoFocus={true}/>
          <div className="topic-modal">
            <div className="topic-modal-header">
              <h1>Select any topics that describe your question</h1>
            </div>

            <div className="topic-modal-list">
              <div className="question-form-topic-list">
                {topicItems}
              </div>
            </div>
          </div>

          <div className="question-modal-footer">
            <button id="cancel-button" onClick={()=>this.closeModal("create")}>Cancel</button>
            <button id="ask-question-button" onClick={this.handleSubmit}>Ask Question</button>
          </div>
        </Modal>


        <Modal
            id="cancel-modal"
            className="cancel-modal"
            isOpen={this.state.successModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={()=>this.closeModal("success")}
            style={cancelStyles}
            contentLabel="Example Modal"
          >
          <p>You asked: <Link onClick={()=>this.closeModal("success")} to={`/questions/${this.state.askedQuestion.id}`}>{this.state.askedQuestion.body}</Link>
          </p>
          <i className="fa fa-times" onClick={()=>this.closeModal("success")}/>


        </Modal>
      </div>

      <div className="nav-bar-mobile-wrapper">
          <div className="nav-bar mobile-only">
            <div className="nav-bar-items ">
              <div id="nav-home" className={"nav-link " + (this.props.path === "/" ? "highlighted" : "")} >
                <Link to={`/`}>
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </Link>
              </div>


              <div id="nav-answer" className={"nav-link " + (this.props.path === "/answer" ? "highlighted" : "")}>
                <Link to={`/answer`}>
                <FontAwesomeIcon icon={faEdit} />
                  Answer
                </Link>
              </div>


              <Button compact size="small" color='orange' type='submit' className="ask-question-button"
                onClick={(() => this.openModal("create"))}>
                Ask Question
              </Button>
            </div>
          </div>

          <div className="nav-bar mobile-only">
            <div className="nav-bar-items">
              <div className="nav-search">
                <QuestionSearchContainer />
              </div>

              <div id="nav-pro-pic-container">
                <Link to={`/profile`}>
                  <img src={user.pro_pic_url} alt={`${user.name}'s`}  className="nav-pro-pic" />
                </Link>
              </div>

              
              <Button compact size="small" color='orange' type='submit'
                onClick={this.handleSignOut}>
                Sign Out
              </Button>
    

            </div>
          </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
	topics: allTopics(state),
  questions: allQuestions(state),
  user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  createQuestion: (body, topics) => dispatch(createQuestion(body, topics)),
  requestQuestions: () => dispatch(fetchQuestions()),
  logOut: () => dispatch(logOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

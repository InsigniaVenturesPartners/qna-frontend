import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import { Link } from 'react-router-dom';
import { customStyles, cancelStyles } from '../create_question_form/create_question_form';
import QuestionSearchContainer from '../question_search/question_search_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createModalIsOpen: false,
      successModalIsOpen: false,
      question: "",
      asked_question: {}
    };

    this.setQuestion = this.setQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this)

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.props.createQuestion(this.state.question).then(
      question => this.handleSuccessfulSubmit(question.question)
    );
  }

  handleSuccessfulSubmit(question) {
    this.closeModal("create");
    this.setState({asked_question: question, question: ""})
    this.openModal("success")
  }

  handleSignOut(e) {
    e.preventDefault()
    this.props.logOut()
  }

  render() {
    const {user} = this.props
    return(
      <div className="nav-bar">
        <ul className="nav-bar-items">
          <li id="nav-logo">
            {/*
            TODO


            <Link to={`/`}>
              Insignia Community
            </Link>
            */}
            </li>

          <li id="nav-home" className={"nav-link " + (this.props.location.pathname == "/" ? "highlighted" : "")} >
          {/*
            <Link to={`/`}>
              <i className="fa fa-home"></i>
              Home
            </Link>
            */}
          </li>



          <li id="nav-answer" className={"nav-link " + (this.props.location.pathname == "/questions" ? "highlighted" : "")}>
            {/*
            <Link to={`/questions`}>
              <i className="fa fa-pencil-square-o"></i>
              Answer</Link>
              */}
          </li>

          <li id="nav-search">
            <QuestionSearchContainer />
            </li>

          <li id="nav-pro-pic">

            <img src="" alt=""  className="nav-pro-pic" />
          }
          </li>


          <li id="nav-ask-question"><button onClick={()=>this.openModal("create")}>Ask Question</button></li>


          <li id="nav-sign-out">
            <button id="sign-out" onClick={this.handleSignOut}>Sign Out</button>
            </li>
        </ul>
        <Modal
          isOpen={this.state.createModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={()=>this.closeModal("create")}
          style={customStyles}
          contentLabel="Example Modal"
        >

        <div className="question-modal-header">
          <img src="" alt=""  className="user-pro-pic" />
          <span id="modal-username">User asks</span>
        </div>


        <input onChange={this.setQuestion} placeholder="What is your question?" value={this.state.question}/>

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
          <p>You asked:
          {/*
            <Link onClick={()=>this.closeModal("success")} to={`/questions/${this.state.asked_question.id}`}>{this.state.asked_question.body}</Link>
          */}
          </p>
            <i className="fa fa-times" onClick={()=>this.closeModal("success")}/>


        </Modal>
      </div>
    );
  }
}

export default NavBar;

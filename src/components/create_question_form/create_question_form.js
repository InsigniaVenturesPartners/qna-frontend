import React from 'react'
import Modal from 'react-modal'
import {Link} from 'react-router'

import Checkbox from 'muicss/lib/react/checkbox';

export const customStyles = {
    overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.65)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '100%',
    maxWidth              : '623px',
    heigth                : '50%',
    padding : '0'  }
};

export const cancelStyles = {
  overlay : {
  position          : 'fixed',
  top               : 0,
  left              : 0,
  right             : 0,
  bottom            : 0,
  backgroundColor   : 'rgba(0, 0, 0, 0.65)'
},
  content : {
    top                   : '15%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '100%',
    maxWidth              : '300px',
    background            :  '#FFF4C8',

    padding : '10px'  }
};

class CreateQuestionForm extends React.Component {
  constructor() {
    super();

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

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal(modalName) {
    let desiredState = {};
    desiredState[modalName+"ModalIsOpen"] = true;
    this.setState(desiredState);
  }

  afterOpenModal(modalName) {
    // references are now sync'd and can be accessed.
    // this.background.style.color = 'white';
  }

  closeModal(modalName) {
    let desiredState = {question: ""};
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

  render() {
    const {user, topics} = this.props

    const topicItems = topics.map( topic => (
        <Checkbox key={"checkbox-topic-" + topic.id} name={topic.name} label={topic.name} checked={this.state.checkedTopics.get(topic.name)} onChange={this.handleChange}/>
      ));

    return (
      <div className="greeting">
        <div className="greeting-header">
          <img src={user.pro_pic_url} alt={`${user.name}`}  className="user-pro-pic" />
          <span>{user.name}</span>
        </div>

        <button onClick={()=>this.openModal("create")}>What is your question?</button>

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
    );
  }
}

export default CreateQuestionForm

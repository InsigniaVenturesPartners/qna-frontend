import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import RichTextEditor from 'react-rte'

import Autolinker from 'autolinker'

import QuestionEditContainer from '../question/question_edit_form_container';
import { Button } from 'semantic-ui-react'

import '../../static/css/answer_form.css'

class AnswerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', open: false, isDraft: props.isDraft, timePostedAgo: '', value: RichTextEditor.createEmptyValue() };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.successfulSubmit = this.successfulSubmit.bind(this);
    this.customLinkReplace = this.customLinkReplace.bind(this)
    this.openAnswerForm = this.openAnswerForm.bind(this)
  }

  getDraft() {
    if(this.props.isDraft) {
      let {value} = this.state;
      this.props.fetchQuestionDraft(this.props.questionId).then(response => {
        const draft = response.draft.data
        this.setState({ text: draft.body, timePostedAgo: draft.time_posted_ago, value: value.setContentFromString(draft.body, 'html' ) })
      });
    }
  }


  onChange = (value) => {
    this.setState({value});

    const textValue = value.toString('html')
    // const newValue = Autolinker.link(textValue, {
    //     stripPrefix: false,
    //     stripTrailingSlash: false,
    //     replaceFn: this.customLinkReplace.bind(this, textValue)
    // })
    this.setState({ text: textValue})
  }

  customLinkReplace (value, match) {
    const offset = match.getOffset()
    const length = match.getAnchorText().length
    const whitespaceIdx = value[offset + length]
    // Generate link when user adds space after typing the URL
    return (/\s+/.test(whitespaceIdx))
  }

  openAnswerForm() {
    this.getDraft()
    this.setState({open: true})
  }

  successfulSubmit({answer}) {
    browserHistory.push(`/answers/${answer.data.id}`);
  }

  submitAnswer() {
    this.props.createAnswer(this.state.text, this.props.questionId).then(
      this.successfulSubmit
    );
  }

  submitDraft() {
    this.props.saveDraft(this.state.text, this.props.questionId)
    this.setState({open: false, isDraft: true})
  }

  render () {
    const { questionId, body, authorId, isDraft } = this.props
    const author = this.props.currentUser;
    const answerButtonText = this.state.isDraft ? "Edit Draft" : "Answer";
    const lastSavedDraft = this.state.isDraft ? <p className="draft-time-posted">(Last saved {this.state.timePostedAgo})</p>  : '';

    if (this.state.open) {
      return (
        <div className="answer-form-container">
     
          <div className="answer-form-button">
            <Button basic color="orange"  onClick={()=>this.setState({open: true})}>
              {answerButtonText}
            </Button>
          { authorId === author.id &&
              <QuestionEditContainer questionId={questionId} body={body}/> }
          </div>
    
          <div className="answer-form">
            <div className="answer-header">
              <img src={author.pro_pic_url} alt={`${author.name}'s picture`}  className="answerer-pro-pic" />
              <div className="answer-details">
                <h1>{author.name}</h1>
              </div>
            </div>
            <RichTextEditor
              value={this.state.value}
              onChange={this.onChange}
            />

          {/*  <ReactQuill value={this.state.text}
                        onChange={this.handleChange}
                        modules={modules}
                        placeholder={"Write your answer"}/> */}


            <div className="answer-form-footer">
              <Button color="orange" className="submit-button" onClick={()=>this.submitAnswer()}>
                Submit
              </Button>

              <button id="answer-save-draft" className="draft-link-button" onClick={()=>this.submitDraft()}>
                Save Draft
              </button>
              {lastSavedDraft}
            </div>
          </div>
        </div>

      );
    } else {
      return (
        <div className="answer-form-button">
          <Button basic color="orange" className="write-answer-button" onClick={this.openAnswerForm}>
            {answerButtonText}
          </Button>

          { authorId === author.id &&
              <QuestionEditContainer questionId={questionId} body={body}/> }
        </div>

      );
    }
  }
}

const modules = {
  toolbar: [
    ["bold", "italic"], // toggled buttons
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["image", "link"] // misc
  ]
};


export default AnswerForm;
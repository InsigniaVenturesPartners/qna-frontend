import React from 'react'
import {browserHistory} from 'react-router'
import RichTextEditor from 'react-rte'
import Autolinker from 'autolinker'
import { Button } from 'semantic-ui-react'

class DraftForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.body, open: false, value: RichTextEditor.createEmptyValue()};

    this.submitAnswer = this.submitAnswer.bind(this);
    this.successfulSubmit = this.successfulSubmit.bind(this);
    this.customLinkReplace = this.customLinkReplace.bind(this)
  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateStateFromProps(newProps);
  }

  updateStateFromProps = (props) => {
    let {body} = props;
    let {value} = this.state;
    this.setState({
      value: value.setContentFromString(body, 'html' ),
    });
  }

  onChange = (value) => {
    this.setState({value});

    const textValue = value.toString('html')
    this.setState({ text: textValue})
  }

  customLinkReplace (value, match) {
    const offset = match.getOffset()
    const length = match.getAnchorText().length
    const whitespaceIdx = value[offset + length]
    // Generate link when user adds space after typing the URL
    return (/\s+/.test(whitespaceIdx))
  }

  successfulSubmit() {
    this.props.closeEditForm();
  }

  submitAnswer() {
    this.props.submitAnswer(this.state.text, this.props.questionId).then(
      browserHistory.push(`/profile/answers`)
    )
  }

  saveDraft = () => {
    this.props.saveDraft(this.state.text, this.props.questionId).then(
      this.successfulSubmit
    );
  }

  render () {
    return (
      <div className="answer-form-container">
        <div className="answer-form">
            <RichTextEditor
              value={this.state.value}
              onChange={this.onChange}
            />
          <div className="answer-form-footer">
            <Button color="orange" className="submit-button" onClick={()=>this.submitAnswer()}>
              Submit
            </Button>
            <button id="answer-save-draft" className="draft-link-button" onClick={()=>this.saveDraft()}>
              Save Draft
            </button>
          </div>
        </div>
      </div>

    );
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

export default DraftForm;

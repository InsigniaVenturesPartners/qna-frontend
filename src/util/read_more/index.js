import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser'
import { convertNodeToElement } from 'react-html-parser'

class ReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charLimit: props.charLimit
    };
    this.initialState = this.state;
  }

  getReadMoreContent() {
    const { charLimit } = this.state;
    const { children, readMoreText, readLessText } = this.props;

    if (children.length > charLimit) {
      const childNode = ReactHtmlParser(children)[0].props.children[0]
      const firstChild = typeof childNode === "string" ? childNode : childNode.props.children[0];
      const parsedBody = firstChild.length < charLimit ? ReactHtmlParser(children)[0] : firstChild.substr(0, charLimit) + "..."
      return (<span className="short-text">
        {parsedBody}
        <span
          className="readMoreText"
          style={{ color: '#007bff', cursor: 'pointer' }}
          role="presentation"
          onClick={this.showLongText.bind(this)}
        >
          {readMoreText}
        </span>
      </span>);
    } else if (children.length < charLimit) {
      return (<span className="short-text">
        {ReactHtmlParser(children)}
      </span>);
    }

    return (<span className="short-text">
      {ReactHtmlParser(children)}
      {/*
      <span
        className="readMoreText"
        style={{ color: '#007bff', cursor: 'pointer' }}
        role="presentation"
        onClick={this.showShortText.bind(this)}
      >
        {readLessText}
      </span>
      */}
    </span>);
  };

  showLongText() {
    const { children } = this.props;
    this.setState({ charLimit: children.length });
    this.getReadMoreContent();
  }

  showShortText() {
    this.setState(this.initialState);
    this.getReadMoreContent();
  }

  render() {
    return (
      <div>
        {this.getReadMoreContent()}
      </div>
    );
  }
}

ReadMore.propTypes = {
  charLimit: PropTypes.number,
  readMoreText: PropTypes.string,
  readLessText: PropTypes.string,
  children: PropTypes.string.isRequired
};
ReadMore.defaultProps = {
  charLimit: 150,
  readMoreText: 'Read more',
  readLessText: 'Read less'
};
export default ReadMore;
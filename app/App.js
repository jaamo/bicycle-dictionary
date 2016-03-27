var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({

  getInitialState: function () {
    return {
      messages: Store.getMessages(),
      keyword: ''
    };
  },

  componentWillMount: function () {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function () {
    this.setState({
      messages: Store.getMessages()
    });
  },

  searchMessages: function (event) {
    event.preventDefault();
    var input = this.refs.keyword;
    actions.searchMessages(input.value);
    console.log("Start search.");
    this.setState({
      keyword: ''
    });
  },

  updateKeyword: function (event) {
    console.log("update kw");
    this.setState({
      keyword: event.target.value
    });
  },

  renderMessages: function (message) {
    return (
      <div>{message[0]}: {message[1]}</div>
    );
  },

	render: function() {

		return (
			<div>
        {this.state.messages.map(this.renderMessages)}
        <form onSubmit={this.searchMessages}>
          <input ref="keyword" type="text" value={this.state.keyword} onChange={this.updateKeyword}/>
        </form>
      </div>
		);

	}

});

module.exports = App;

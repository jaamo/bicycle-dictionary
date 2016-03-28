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

  componentDidMount: function () {
    this.refs.keyword.focus();
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
    //event.preventDefault();
    var input = this.refs.keyword;
    actions.searchMessages(input.value);
    console.log("Start search.");
    // this.setState({
    //   keyword: ''
    // });
  },

  updateKeyword: function (event) {

    this.setState({
      keyword: event.target.value
    });

    if (event.target.value.length > 2) {
      this.searchMessages();
    } else {
      actions.clearSearch();
    }

  },

  renderMessages: function (message) {
    return (
      <div className="word">
        <div className="word__left">
          {message[0]}
        </div>
        <div className="word__right">
          {message[1]}
        </div>
      </div>
    );
  },

	render: function() {

		return (
			<div className="app">
        <h1>{'Polkupyorasanakirja'}</h1>
        <h2>Suomi - englanti - suomi</h2>
        <form onSubmit={function(e){e.preventDefault()}}>
          <input ref="keyword" placeholder="" type="text" value={this.state.keyword} onChange={this.updateKeyword}/>
        </form>
        {this.state.messages.map(this.renderMessages)}
      </div>
		);

	}

});

module.exports = App;

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      messages: Store.getMessages(),
      keyword: ''
    };
  },

  componentWillMount: function componentWillMount() {
    Store.addChangeListener(this.changeState);
  },

  componentWillUnmount: function componentWillUnmount() {
    Store.removeChangeListener(this.changeState);
  },

  changeState: function changeState() {
    this.setState({
      messages: Store.getMessages()
    });
  },

  searchMessages: function searchMessages(event) {
    //event.preventDefault();
    var input = this.refs.keyword;
    actions.searchMessages(input.value);
    console.log("Start search.");
    // this.setState({
    //   keyword: ''
    // });
  },

  updateKeyword: function updateKeyword(event) {

    this.setState({
      keyword: event.target.value
    });

    if (this.state.keyword.length > 2) {
      this.searchMessages();
    }
  },

  renderMessages: function renderMessages(message) {
    return React.createElement(
      'div',
      { className: 'word' },
      React.createElement(
        'div',
        { className: 'word__left' },
        message[0],
        ': ',
        message[1]
      )
    );
  },

  render: function render() {

    return React.createElement(
      'div',
      { className: 'app' },
      React.createElement(
        'form',
        { onSubmit: this.searchMessages },
        React.createElement('input', { ref: 'keyword', placeholder: '', type: 'text', value: this.state.keyword, onChange: this.updateKeyword })
      ),
      this.state.messages.map(this.renderMessages)
    );
  }

});

module.exports = App;

},{"./Store.js":"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/Store.js","./actions.js":"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/actions.js","react":"react"}],"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({

  // The dictionary.
  messages: [["ohjaustangonkannatin", "stem"], ["satula", "saddle"]],

  // Filtered dictionary.
  filteredMessages: [],

  // Available actions.
  actions: [actions.searchMessages],

  /**
   * Search dictionary by given keyword.
   * @param  {[type]} keyword [description]
   * @return {[type]}         [description]
   */
  searchMessages: function searchMessages(keyword) {

    console.log("Search with keyword: " + keyword);

    // Clean the result list.
    this.filteredMessages = [];

    // Filter original list by the keyword.
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i][0].indexOf(keyword) != -1 || this.messages[i][1].indexOf(keyword) != -1) {
        this.filteredMessages.push(this.messages[i]);
      }
    }

    this.emitChange();
  },

  exports: {
    getMessages: function getMessages() {
      return this.filteredMessages;
    }
  }
});

},{"./actions.js":"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/actions.js","flux-react":"flux-react"}],"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['searchMessages']);

},{"flux-react":"flux-react"}],"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/specs/App-spec.js":[function(require,module,exports){
"use strict";

var App = require('./../app/App.js');
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

describe("App", function () {

  it("should be wrapped with a div", function () {
    var app = TestUtils.renderIntoDocument(React.createElement(App, null));
    expect(app.getDOMNode().tagName).toEqual('DIV');
  });
});

},{"./../app/App.js":"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/App.js","react/addons":"react/addons"}]},{},["/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/specs/App-spec.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvQXBwLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL1N0b3JlLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL2FjdGlvbnMuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9zcGVjcy9BcHAtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM3QixhQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDSDs7QUFFRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDOztBQUVELHNCQUFvQixFQUFFLGdDQUFZO0FBQ2hDLFNBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDOUM7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QUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM5QztLQUNGOztBQUVELFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUVuQjs7QUFFRCxTQUFPLEVBQUU7QUFDUCxlQUFXLEVBQUUsdUJBQVk7QUFDdkIsYUFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDOUI7R0FDRjtDQUNGLENBQUMsQ0FBQzs7Ozs7QUNqREgsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUVqQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDbEMsZ0JBQWdCLENBQ2pCLENBQUMsQ0FBQzs7Ozs7QUNKSCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNyQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7O0FBRXZDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBVzs7QUFFekIsSUFBRSxDQUFDLDhCQUE4QixFQUFFLFlBQVc7QUFDNUMsUUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLG9CQUFDLEdBQUcsT0FBRSxDQUFDLENBQUM7QUFDL0MsVUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDakQsQ0FBQyxDQUFDO0NBRUosQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogU3RvcmUuZ2V0TWVzc2FnZXMoKSxcbiAgICAgIGtleXdvcmQ6ICcnXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlczogU3RvcmUuZ2V0TWVzc2FnZXMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHNlYXJjaE1lc3NhZ2VzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLmtleXdvcmQ7XG4gICAgYWN0aW9ucy5zZWFyY2hNZXNzYWdlcyhpbnB1dC52YWx1ZSk7XG4gICAgY29uc29sZS5sb2coXCJTdGFydCBzZWFyY2guXCIpO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAga2V5d29yZDogJydcbiAgICAvLyB9KTtcbiAgfSxcblxuICB1cGRhdGVLZXl3b3JkOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAga2V5d29yZDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5rZXl3b3JkLmxlbmd0aCA+IDIpIHtcbiAgICAgIHRoaXMuc2VhcmNoTWVzc2FnZXMoKTtcbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXJNZXNzYWdlczogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29yZF9fbGVmdFwiPlxuICAgICAgICAgIHttZXNzYWdlWzBdfToge21lc3NhZ2VbMV19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYXBwXCI+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnNlYXJjaE1lc3NhZ2VzfT5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwia2V5d29yZFwiIHBsYWNlaG9sZGVyPVwiXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5rZXl3b3JkfSBvbkNoYW5nZT17dGhpcy51cGRhdGVLZXl3b3JkfS8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKHRoaXMucmVuZGVyTWVzc2FnZXMpfVxuICAgICAgPC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcblxuICAvLyBUaGUgZGljdGlvbmFyeS5cbiAgbWVzc2FnZXM6IFtcbiAgICBbXCJvaGphdXN0YW5nb25rYW5uYXRpblwiLCBcInN0ZW1cIl0sXG4gICAgW1wic2F0dWxhXCIsIFwic2FkZGxlXCJdXG4gIF0sXG5cbiAgLy8gRmlsdGVyZWQgZGljdGlvbmFyeS5cbiAgZmlsdGVyZWRNZXNzYWdlczogW1xuXG4gIF0sXG5cbiAgLy8gQXZhaWxhYmxlIGFjdGlvbnMuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzXG4gIF0sXG5cbiAgLyoqXG4gICAqIFNlYXJjaCBkaWN0aW9uYXJ5IGJ5IGdpdmVuIGtleXdvcmQuXG4gICAqIEBwYXJhbSAge1t0eXBlXX0ga2V5d29yZCBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBzZWFyY2hNZXNzYWdlczogZnVuY3Rpb24oa2V5d29yZCkge1xuXG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggd2l0aCBrZXl3b3JkOiBcIiArIGtleXdvcmQpO1xuXG4gICAgLy8gQ2xlYW4gdGhlIHJlc3VsdCBsaXN0LlxuICAgIHRoaXMuZmlsdGVyZWRNZXNzYWdlcyA9IFtdO1xuXG4gICAgLy8gRmlsdGVyIG9yaWdpbmFsIGxpc3QgYnkgdGhlIGtleXdvcmQuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlc1tpXVswXS5pbmRleE9mKGtleXdvcmQpICE9IC0xIHx8IHRoaXMubWVzc2FnZXNbaV1bMV0uaW5kZXhPZihrZXl3b3JkKSAhPSAtMSkge1xuICAgICAgICB0aGlzLmZpbHRlcmVkTWVzc2FnZXMucHVzaCh0aGlzLm1lc3NhZ2VzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcblxuICB9LFxuXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRNZXNzYWdlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRNZXNzYWdlcztcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ3NlYXJjaE1lc3NhZ2VzJ1xuXSk7XG4iLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi8uLi9hcHAvQXBwLmpzJyk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3QvYWRkb25zXCIpO1xudmFyIFRlc3RVdGlscyA9IFJlYWN0LmFkZG9ucy5UZXN0VXRpbHM7XG5cbmRlc2NyaWJlKFwiQXBwXCIsIGZ1bmN0aW9uKCkge1xuXG4gIGl0KFwic2hvdWxkIGJlIHdyYXBwZWQgd2l0aCBhIGRpdlwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXBwID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudCg8QXBwLz4pO1xuICAgIGV4cGVjdChhcHAuZ2V0RE9NTm9kZSgpLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICB9KTtcblxufSk7XG4iXX0=

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

  componentDidMount: function componentDidMount() {
    this.refs.keyword.focus();
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

    if (event.target.value.length > 2) {
      this.searchMessages();
    } else {
      actions.clearSearch();
    }
  },

  renderMessages: function renderMessages(message) {
    return React.createElement(
      'div',
      { className: 'word' },
      React.createElement(
        'div',
        { className: 'word__left' },
        message[0]
      ),
      React.createElement(
        'div',
        { className: 'word__right' },
        message[1]
      )
    );
  },

  render: function render() {

    return React.createElement(
      'div',
      { className: 'app' },
      React.createElement(
        'h1',
        null,
        'Polkupyorasanakirja'
      ),
      React.createElement(
        'h2',
        null,
        'Suomi - englanti - suomi'
      ),
      React.createElement(
        'form',
        { onSubmit: function (e) {
            e.preventDefault();
          } },
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
  actions: [actions.searchMessages, actions.clearSearch],

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

  /**
   * Clear search to initial state.
   */
  clearSearch: function clearSearch() {
    this.filteredMessages = [];
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

module.exports = flux.createActions(['searchMessages', 'clearSearch']);

},{"flux-react":"flux-react"}],"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');
React.render(React.createElement(App, null), document.getElementById('app'));

},{"./App.js":"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/App.js","react":"react"}]},{},["/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvQXBwLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL1N0b3JlLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL2FjdGlvbnMuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM3QixhQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDSDs7QUFFRCxtQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUMzQjs7QUFFRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDOztBQUVELHNC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cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZXM6IFN0b3JlLmdldE1lc3NhZ2VzKCksXG4gICAgICBrZXl3b3JkOiAnJ1xuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlZnMua2V5d29yZC5mb2N1cygpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpXG4gICAgfSk7XG4gIH0sXG5cbiAgc2VhcmNoTWVzc2FnZXM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMua2V5d29yZDtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzKGlucHV0LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IHNlYXJjaC5cIik7XG4gICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICBrZXl3b3JkOiAnJ1xuICAgIC8vIH0pO1xuICB9LFxuXG4gIHVwZGF0ZUtleXdvcmQ6IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBrZXl3b3JkOiBldmVudC50YXJnZXQudmFsdWVcbiAgICB9KTtcblxuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID4gMikge1xuICAgICAgdGhpcy5zZWFyY2hNZXNzYWdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb25zLmNsZWFyU2VhcmNoKCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgcmVuZGVyTWVzc2FnZXM6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29yZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRfX2xlZnRcIj5cbiAgICAgICAgICB7bWVzc2FnZVswXX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29yZF9fcmlnaHRcIj5cbiAgICAgICAgICB7bWVzc2FnZVsxXX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgPGgxPnsnUG9sa3VweW9yYXNhbmFraXJqYSd9PC9oMT5cbiAgICAgICAgPGgyPlN1b21pIC0gZW5nbGFudGkgLSBzdW9taTwvaDI+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCl9fT5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwia2V5d29yZFwiIHBsYWNlaG9sZGVyPVwiXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5rZXl3b3JkfSBvbkNoYW5nZT17dGhpcy51cGRhdGVLZXl3b3JkfS8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKHRoaXMucmVuZGVyTWVzc2FnZXMpfVxuICAgICAgPC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcblxuICAvLyBUaGUgZGljdGlvbmFyeS5cbiAgbWVzc2FnZXM6IFtcbiAgICBbXCJvaGphdXN0YW5nb25rYW5uYXRpblwiLCBcInN0ZW1cIl0sXG4gICAgW1wic2F0dWxhXCIsIFwic2FkZGxlXCJdXG4gIF0sXG5cbiAgLy8gRmlsdGVyZWQgZGljdGlvbmFyeS5cbiAgZmlsdGVyZWRNZXNzYWdlczogW1xuXG4gIF0sXG5cbiAgLy8gQXZhaWxhYmxlIGFjdGlvbnMuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzLFxuICAgIGFjdGlvbnMuY2xlYXJTZWFyY2hcbiAgXSxcblxuICAvKipcbiAgICogU2VhcmNoIGRpY3Rpb25hcnkgYnkgZ2l2ZW4ga2V5d29yZC5cbiAgICogQHBhcmFtICB7W3R5cGVdfSBrZXl3b3JkIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHNlYXJjaE1lc3NhZ2VzOiBmdW5jdGlvbihrZXl3b3JkKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCB3aXRoIGtleXdvcmQ6IFwiICsga2V5d29yZCk7XG5cbiAgICAvLyBDbGVhbiB0aGUgcmVzdWx0IGxpc3QuXG4gICAgdGhpcy5maWx0ZXJlZE1lc3NhZ2VzID0gW107XG5cbiAgICAvLyBGaWx0ZXIgb3JpZ2luYWwgbGlzdCBieSB0aGUga2V5d29yZC5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VzW2ldWzBdLmluZGV4T2Yoa2V5d29yZCkgIT0gLTEgfHwgdGhpcy5tZXNzYWdlc1tpXVsxXS5pbmRleE9mKGtleXdvcmQpICE9IC0xKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRNZXNzYWdlcy5wdXNoKHRoaXMubWVzc2FnZXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuXG4gIH0sXG5cblxuICAvKipcbiAgICogQ2xlYXIgc2VhcmNoIHRvIGluaXRpYWwgc3RhdGUuXG4gICAqL1xuICBjbGVhclNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkTWVzc2FnZXMgPSBbXTtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRNZXNzYWdlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRNZXNzYWdlcztcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ3NlYXJjaE1lc3NhZ2VzJyxcbiAgJ2NsZWFyU2VhcmNoJ1xuXSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19

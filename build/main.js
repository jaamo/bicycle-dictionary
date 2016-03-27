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
    event.preventDefault();
    var input = this.refs.keyword;
    actions.searchMessages(input.value);
    console.log("Start search.");
    this.setState({
      keyword: ''
    });
  },

  updateKeyword: function updateKeyword(event) {
    console.log("update kw");
    this.setState({
      keyword: event.target.value
    });
  },

  renderMessages: function renderMessages(message) {
    return React.createElement(
      'div',
      null,
      message[0],
      ': ',
      message[1]
    );
  },

  render: function render() {

    return React.createElement(
      'div',
      null,
      this.state.messages.map(this.renderMessages),
      React.createElement(
        'form',
        { onSubmit: this.searchMessages },
        React.createElement('input', { ref: 'keyword', type: 'text', value: this.state.keyword, onChange: this.updateKeyword })
      )
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

},{"flux-react":"flux-react"}],"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');
React.render(React.createElement(App, null), document.body);

},{"./App.js":"/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/App.js","react":"react"}]},{},["/Volumes/Jytky/Omat/Dropbox/documents/projektit/internet/reactest/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvQXBwLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL1N0b3JlLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL2FjdGlvbnMuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM3QixhQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDSDs7QUFFRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDOztBQUVELHNCQUFvQixFQUFFLGdDQUFZO0FBQ2hDLFNBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDOUM7O0FBRUQs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RCxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FFbkI7O0FBRUQsU0FBTyxFQUFFO0FBQ1AsZUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQzlCO0dBQ0Y7Q0FDRixDQUFDLENBQUM7Ozs7O0FDakRILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLGdCQUFnQixDQUNqQixDQUFDLENBQUM7Ozs7O0FDSkgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsT0FBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZXM6IFN0b3JlLmdldE1lc3NhZ2VzKCksXG4gICAgICBrZXl3b3JkOiAnJ1xuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbWVzc2FnZXM6IFN0b3JlLmdldE1lc3NhZ2VzKClcbiAgICB9KTtcbiAgfSxcblxuICBzZWFyY2hNZXNzYWdlczogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMua2V5d29yZDtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzKGlucHV0LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IHNlYXJjaC5cIik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBrZXl3b3JkOiAnJ1xuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZUtleXdvcmQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIGt3XCIpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAga2V5d29yZDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyTWVzc2FnZXM6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+e21lc3NhZ2VbMF19OiB7bWVzc2FnZVsxXX08L2Rpdj5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cbiAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKHRoaXMucmVuZGVyTWVzc2FnZXMpfVxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5zZWFyY2hNZXNzYWdlc30+XG4gICAgICAgICAgPGlucHV0IHJlZj1cImtleXdvcmRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLmtleXdvcmR9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZUtleXdvcmR9Lz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcblxuICAvLyBUaGUgZGljdGlvbmFyeS5cbiAgbWVzc2FnZXM6IFtcbiAgICBbXCJvaGphdXN0YW5nb25rYW5uYXRpblwiLCBcInN0ZW1cIl0sXG4gICAgW1wic2F0dWxhXCIsIFwic2FkZGxlXCJdXG4gIF0sXG5cbiAgLy8gRmlsdGVyZWQgZGljdGlvbmFyeS5cbiAgZmlsdGVyZWRNZXNzYWdlczogW1xuXG4gIF0sXG5cbiAgLy8gQXZhaWxhYmxlIGFjdGlvbnMuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzXG4gIF0sXG5cbiAgLyoqXG4gICAqIFNlYXJjaCBkaWN0aW9uYXJ5IGJ5IGdpdmVuIGtleXdvcmQuXG4gICAqIEBwYXJhbSAge1t0eXBlXX0ga2V5d29yZCBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBzZWFyY2hNZXNzYWdlczogZnVuY3Rpb24oa2V5d29yZCkge1xuXG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggd2l0aCBrZXl3b3JkOiBcIiArIGtleXdvcmQpO1xuXG4gICAgLy8gQ2xlYW4gdGhlIHJlc3VsdCBsaXN0LlxuICAgIHRoaXMuZmlsdGVyZWRNZXNzYWdlcyA9IFtdO1xuXG4gICAgLy8gRmlsdGVyIG9yaWdpbmFsIGxpc3QgYnkgdGhlIGtleXdvcmQuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlc1tpXVswXS5pbmRleE9mKGtleXdvcmQpICE9IC0xIHx8IHRoaXMubWVzc2FnZXNbaV1bMV0uaW5kZXhPZihrZXl3b3JkKSAhPSAtMSkge1xuICAgICAgICB0aGlzLmZpbHRlcmVkTWVzc2FnZXMucHVzaCh0aGlzLm1lc3NhZ2VzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcblxuICB9LFxuXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRNZXNzYWdlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRNZXNzYWdlcztcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ3NlYXJjaE1lc3NhZ2VzJ1xuXSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5ib2R5KTtcbiJdfQ==

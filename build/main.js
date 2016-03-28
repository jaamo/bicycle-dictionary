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
        'Polkupyöräsanakirja'
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
  messages: [

  // Materials
  ["alumiini", "aluminium"], ["teräs", "steel"], ["hiilikuitu", "carbon"],

  // Base
  ["runko", "frame"], ["haarukka", "fork"], ["joustohaarukka", "suspension fork"],

  // Tires
  ["rengas", "tire/tyre"], ["vanne", "rim"], ["sisäkumi", "inner tube"], ["pinna", "spoke"],

  // Drivetrain
  ["kampi", "crank"], ["poljin", "pedal"], ["ketju", "chain"], ["vaihtaja", "derailleur"], ["etuvaihtaja", "front derailleur"], ["takavaihtaja", "rear derailleur"],

  // Steering
  ["ohjaustanko", "handlebar"], ["ohjaustangonkannatin", "stem"],

  // Other
  ["laakeri", "bearing"], ["satula", "saddle"], ["soittokello", "bell"],

  // Brakes
  ["levyjarrut", "hydraulic brakes"], ["jarrut", "brakes"], ["jarrukahva", "brake lever"]

  // Tools

  ],

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvQXBwLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL1N0b3JlLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL2FjdGlvbnMuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM3QixhQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDSDs7QUFFRCxtQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUMzQjs7QUFFRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDOztBQUVELHNCQUFvQixFQUFFLGdDQUFZO0FBQ2hDLFNBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDOUM7O0FBRUQsYUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtLQUM5QixDQUFDLENBQUM7R0FDSjs7QUFFRCxnQkFBYyxFQUFFLHdCQUFVLEtBQUssRUFBRTs7QUFFL0IsUUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDOUIsV0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7OztHQUk5Qjs7QUFFRCxlQUFhLEVBQUUsdUJBQVUsS0FBSyxFQUFFOztBQUU5QixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osYUFBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztLQUM1QixDQUFDLENBQUM7O0FBRUgsUUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLFVBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2QixNQUFNO0FBQ0wsYUFBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3ZCO0dBRUY7O0FBRUQsZ0JBQWMsRUFBRSx3QkFBVSxPQUFPLEVBQUU7QUFDakMsV0FDRTs7UUFBSyxTQUFTLEVBQUMsTUFBTTtNQUNuQjs7VUFBSyxTQUFTLEVBQUMsWUFBWTtRQUN4QixPQUFPLENBQUMsQ0FBQyxDQUFDO09BQ1A7TUFDTjs7VUFBSyxTQUFTLEVBQUMsYUFBYTtRQUN6QixPQUFPLENBQUMsQ0FBQyxDQUFDO09BQ1A7S0FDRixDQUNOO0dBQ0g7O0FBRUYsUUFBTSxFQUFFLGtCQUFXOztBQUVsQixXQUNDOztRQUFLLFNBQVMsRUFBQyxLQUFLO01BQ2Y7OztRQUFLLHFCQUFxQjtPQUFNO01BQ2hDOzs7O09BQWlDO01BQ2pDOztVQUFNLFFBQVEsRUFBRSxVQUFTLENBQUMsRUFBQztBQUFDLGFBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtXQUFDLEFBQUM7UUFDOUMsK0JBQU8sR0FBRyxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUMsR0FBRTtPQUNyRztNQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQ3pDLENBQ1I7R0FFRjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7O0FDckZyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDakMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUV0QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7OztBQUdoQyxVQUFRLEVBQUU7OztBQUdSLEdBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUN6QixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFDbEIsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDOzs7QUFHeEIsR0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQ2xCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxFQUNwQixDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDOzs7QUFHckMsR0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEVBQ3ZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUNoQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsRUFDMUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDOzs7QUFHbEIsR0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQ2xCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUNuQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFDbEIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLEVBQzFCLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLEVBQ25DLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDOzs7QUFJbkMsR0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQzVCLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDOzs7QUFHaEMsR0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQ3RCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUNwQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7OztBQUd2QixHQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxFQUNsQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFDcEIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDOzs7O0dBSTlCOzs7QUFHRCxrQkFBZ0IsRUFBRSxFQUVqQjs7O0FBR0QsU0FBTyxFQUFFLENBQ1AsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FDcEI7Ozs7Ozs7QUFPRCxnQkFBYyxFQUFFLHdCQUFTLE9BQU8sRUFBRTs7QUFFaEMsV0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxPQUFPLENBQUMsQ0FBQzs7O0FBRy9DLFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7OztBQUczQixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUM1RixZQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM5QztLQUNGOztBQUVELFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUVuQjs7Ozs7QUFNRCxhQUFXLEVBQUUsdUJBQVc7QUFDcEIsUUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUMzQixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDckI7O0FBRUQsU0FBTyxFQUFFO0FBQ1AsZUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQzlCO0dBQ0Y7Q0FDRixDQUFDLENBQUM7Ozs7O0FDbkdILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLGdCQUFnQixFQUNoQixhQUFhLENBQ2QsQ0FBQyxDQUFDOzs7OztBQ0xILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxHQUFHLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpLFxuICAgICAga2V5d29yZDogJydcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZWZzLmtleXdvcmQuZm9jdXMoKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlczogU3RvcmUuZ2V0TWVzc2FnZXMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHNlYXJjaE1lc3NhZ2VzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLmtleXdvcmQ7XG4gICAgYWN0aW9ucy5zZWFyY2hNZXNzYWdlcyhpbnB1dC52YWx1ZSk7XG4gICAgY29uc29sZS5sb2coXCJTdGFydCBzZWFyY2guXCIpO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAga2V5d29yZDogJydcbiAgICAvLyB9KTtcbiAgfSxcblxuICB1cGRhdGVLZXl3b3JkOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAga2V5d29yZDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDIpIHtcbiAgICAgIHRoaXMuc2VhcmNoTWVzc2FnZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9ucy5jbGVhclNlYXJjaCgpO1xuICAgIH1cblxuICB9LFxuXG4gIHJlbmRlck1lc3NhZ2VzOiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JkX19sZWZ0XCI+XG4gICAgICAgICAge21lc3NhZ2VbMF19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRfX3JpZ2h0XCI+XG4gICAgICAgICAge21lc3NhZ2VbMV19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYXBwXCI+XG4gICAgICAgIDxoMT57J1BvbGt1cHnDtnLDpHNhbmFraXJqYSd9PC9oMT5cbiAgICAgICAgPGgyPlN1b21pIC0gZW5nbGFudGkgLSBzdW9taTwvaDI+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCl9fT5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwia2V5d29yZFwiIHBsYWNlaG9sZGVyPVwiXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5rZXl3b3JkfSBvbkNoYW5nZT17dGhpcy51cGRhdGVLZXl3b3JkfS8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKHRoaXMucmVuZGVyTWVzc2FnZXMpfVxuICAgICAgPC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcblxuICAvLyBUaGUgZGljdGlvbmFyeS5cbiAgbWVzc2FnZXM6IFtcblxuICAgIC8vIE1hdGVyaWFsc1xuICAgIFtcImFsdW1paW5pXCIsIFwiYWx1bWluaXVtXCJdLFxuICAgIFtcInRlcsOkc1wiLCBcInN0ZWVsXCJdLFxuICAgIFtcImhpaWxpa3VpdHVcIiwgXCJjYXJib25cIl0sXG5cbiAgICAvLyBCYXNlXG4gICAgW1wicnVua29cIiwgXCJmcmFtZVwiXSxcbiAgICBbXCJoYWFydWtrYVwiLCBcImZvcmtcIl0sXG4gICAgW1wiam91c3RvaGFhcnVra2FcIiwgXCJzdXNwZW5zaW9uIGZvcmtcIl0sXG5cbiAgICAvLyBUaXJlc1xuICAgIFtcInJlbmdhc1wiLCBcInRpcmUvdHlyZVwiXSxcbiAgICBbXCJ2YW5uZVwiLCBcInJpbVwiXSxcbiAgICBbXCJzaXPDpGt1bWlcIiwgXCJpbm5lciB0dWJlXCJdLFxuICAgIFtcInBpbm5hXCIsIFwic3Bva2VcIl0sXG5cbiAgICAvLyBEcml2ZXRyYWluXG4gICAgW1wia2FtcGlcIiwgXCJjcmFua1wiXSxcbiAgICBbXCJwb2xqaW5cIiwgXCJwZWRhbFwiXSxcbiAgICBbXCJrZXRqdVwiLCBcImNoYWluXCJdLFxuICAgIFtcInZhaWh0YWphXCIsIFwiZGVyYWlsbGV1clwiXSxcbiAgICBbXCJldHV2YWlodGFqYVwiLCBcImZyb250IGRlcmFpbGxldXJcIl0sXG4gICAgW1widGFrYXZhaWh0YWphXCIsIFwicmVhciBkZXJhaWxsZXVyXCJdLFxuXG5cbiAgICAvLyBTdGVlcmluZ1xuICAgIFtcIm9oamF1c3RhbmtvXCIsIFwiaGFuZGxlYmFyXCJdLFxuICAgIFtcIm9oamF1c3Rhbmdvbmthbm5hdGluXCIsIFwic3RlbVwiXSxcblxuICAgIC8vIE90aGVyXG4gICAgW1wibGFha2VyaVwiLCBcImJlYXJpbmdcIl0sXG4gICAgW1wic2F0dWxhXCIsIFwic2FkZGxlXCJdLFxuICAgIFtcInNvaXR0b2tlbGxvXCIsIFwiYmVsbFwiXSxcblxuICAgIC8vIEJyYWtlc1xuICAgIFtcImxldnlqYXJydXRcIiwgXCJoeWRyYXVsaWMgYnJha2VzXCJdLFxuICAgIFtcImphcnJ1dFwiLCBcImJyYWtlc1wiXSxcbiAgICBbXCJqYXJydWthaHZhXCIsIFwiYnJha2UgbGV2ZXJcIl1cblxuICAgIC8vIFRvb2xzXG5cbiAgXSxcblxuICAvLyBGaWx0ZXJlZCBkaWN0aW9uYXJ5LlxuICBmaWx0ZXJlZE1lc3NhZ2VzOiBbXG5cbiAgXSxcblxuICAvLyBBdmFpbGFibGUgYWN0aW9ucy5cbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuc2VhcmNoTWVzc2FnZXMsXG4gICAgYWN0aW9ucy5jbGVhclNlYXJjaFxuICBdLFxuXG4gIC8qKlxuICAgKiBTZWFyY2ggZGljdGlvbmFyeSBieSBnaXZlbiBrZXl3b3JkLlxuICAgKiBAcGFyYW0gIHtbdHlwZV19IGtleXdvcmQgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgc2VhcmNoTWVzc2FnZXM6IGZ1bmN0aW9uKGtleXdvcmQpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIHdpdGgga2V5d29yZDogXCIgKyBrZXl3b3JkKTtcblxuICAgIC8vIENsZWFuIHRoZSByZXN1bHQgbGlzdC5cbiAgICB0aGlzLmZpbHRlcmVkTWVzc2FnZXMgPSBbXTtcblxuICAgIC8vIEZpbHRlciBvcmlnaW5hbCBsaXN0IGJ5IHRoZSBrZXl3b3JkLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tZXNzYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMubWVzc2FnZXNbaV1bMF0uaW5kZXhPZihrZXl3b3JkKSAhPSAtMSB8fCB0aGlzLm1lc3NhZ2VzW2ldWzFdLmluZGV4T2Yoa2V5d29yZCkgIT0gLTEpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJlZE1lc3NhZ2VzLnB1c2godGhpcy5tZXNzYWdlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG5cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBDbGVhciBzZWFyY2ggdG8gaW5pdGlhbCBzdGF0ZS5cbiAgICovXG4gIGNsZWFyU2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRNZXNzYWdlcyA9IFtdO1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG5cbiAgZXhwb3J0czoge1xuICAgIGdldE1lc3NhZ2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE1lc3NhZ2VzO1xuICAgIH1cbiAgfVxufSk7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAnc2VhcmNoTWVzc2FnZXMnLFxuICAnY2xlYXJTZWFyY2gnXG5dKTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iXX0=

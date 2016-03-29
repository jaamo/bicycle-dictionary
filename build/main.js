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
    var input = this.refs.keyword;
    actions.searchMessages(input.value);
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
  ["alumiini", "aluminium"], ["alumiini", "alloy"], ["teräs", "steel"], ["hiilikuitu", "carbon"],

  // Bike types
  ["polkupyörä", "bicycle"], ["taittopyörä", "folding bicycle"], ["kaupunkipyörä", "city bicycle"], ["sinkula", "single speed bicycle"], ["aika-ajopyörä", "time trial bicycle"], ["aika-ajopyörä", "tt-bicycle"], ["maantiepyörä", "road bicycle"], ["cyclocross-pyörä", "cyclocross bicycle"], ["läskipyörä", "fatbike"], ["maastopyörä", "mountain bicycle"], ["kolmipyörä", "tricycle"], ["yksipyöräinen", "unicycle"], ["laatikkopyörä", "box bicycle"], ["sähköpyörä", "electric bicycle"], ["sähköpyörä", "e-bicycle"], ["nojapyörä", "recumbent bicycle"], ["nojapyörä", "recumbent tricycle"], ["tandempyörä", "tandem bicycle"], ["tandempyörä", "twin"], ["retkipyörä", "touring bicycle"], ["ratapyörä", "track bicycle"],

  // Frame parts
  ["yläputki", "top tube"], ["alaputki", "down tube"], ["emäputki", "head tube"], ["haarukanpää (etu)", "front dropout"], ["haarukanpää (taka)", "rear dropout"], ["takahaarukan yläputki", "seat stay"], ["takahaarukan alaputki", "chain stay"],

  //["", "dropout"],

  // Base
  ["runko", "frame"], ["haarukka", "fork"], ["joustohaarukka", "suspension fork"], ["jousitus", "suspension"], ["jousitus", "shock absorber"],

  // Tires
  ["rengas", "tire/tyre"], ["vanne", "rim"], ["sisärengas", "inner tube"], ["pinna", "spoke"], ["kiekko", "wheel"], ["napa", "wheel hub"], ["pikalinkku", "quick release skewer"], ["nastarengas", "studded tyre"], ["vannenauha", "rim tape"], ["vannenauha", "rim strip"], ["venttiili", "valve"], ["rihtaus", "truing"], ["pinnojen ruuvi", "spoke nipple"],

  // Drivetrain
  ["kampi", "crank"], ["kampi", "crankarm"], ["poljin", "pedal"], ["klossi", "cleat"], ["lukkopoljin", "clipless pedal"], ["lukkopoljin", "clip-in pedal"], ["lukkopoljin", "step-in pedal"], ["varvaskoukku", "toe clip"], ["ketju", "chain"], ["vaihtaja", "derailleur"], ["etuvaihtaja", "front derailleur"], ["takavaihtaja", "rear derailleur"], ["takavaihtajan korvake", "derailleur hanger"], ["vaihdevivut", "derailleur shifters"], ["vaihdevivut", "gear control"], ["vaihdevivut", "gear levers"], ["ratas", "cog"], ["ratas", "sprocket"], ["eturatas", "chain ring"], ["vapaaratas", "freehub"], ["kaapeli", "cable"], ["keskiö", "bottom bracket"], ["kampisarja", "chainset"], ["kampisarja", "crankset"], ["rataspakka", "cassette"], ["rataspakka", "rear cogs"], ["rataspakan lukkorengas", "lockring"], ["vaijerin suojus", "cable housing"], ["vaijerin suojus", "outer cable"], ["vaijeri", "cable"],

  // Steering
  ["ohjaustanko", "handlebar"], ["ohjaustangonkannatin", "stem"], ["tankoteippi", "bar tape"], ["ohjainlaakeri", "headset"],

  // Other
  ["laakeri", "bearing"], ["satula", "saddle"], ["satulakiskot", "seat rails"], ["satulaputki", "seat tube"], ["satulatolpan kiristin", "seatpost clamp"], ["satulatolpan kiristin", "seatpost binder"], ["satulatolppa", "seat post"], ["soittokello", "bell"], ["juomapulloteline", "water bottle cage"], ["vaijerilukko", "cable lock"], ["lokasuojat", "mudguards"],

  // Brakes
  ["levyjarrut", "hydraulic brakes"], ["jarrut", "brakes"], ["jarrukahva", "brake lever"], ["jarrupala", "brake pad"], ["jarrupala", "brake shoe"], ["jarrulevy", "disc brake rotor"], ["jarrusatula", "brake caliper"], ["jarruvaijeri", "brake cable"],

  // Accessories
  ["pyöräilykypärä", "bicycle helmet"], ["satulalaukku", "seatbag"], ["satulalaukku", "saddlebag"], ["satulalaukku", "seat wedge"], ["tukijalka", "kickstand"], ["tukijalka", "center stand"], ["tukijalka", "rear stand"], ["tukijalka", "stand"], ["tavarateline", "luggage carrier"], ["tavarateline", "pannier rack"], ["tavarateline", "rack"], ["pyöräilypaita", "cycling jersey"],

  // Tools
  ["kammen ulosvetäjä", "crank puller"], ["kammen ulosvetäjä", "crank extractor"], ["ketjuruoska", "chain whip"], ["ketjunkatkaisin", "chain breaker"], ["ketjunkatkaisin", "chain rivet extractor"], ["ketjuöljy", "chain lube"], ["kuusiokoloavain", "hex key / allen key"], ["pinna-avain", "spoke key"], ["rengasrauta", "tyre lever"], ["rengasrauta", "tyre iron"], ["voiteluaine", "lubricant"], ["pumppu", "pump"],

  // Not bike related
  ["ilmanvastus", "air resistance"], ["peesaus", "drafting"], ["peesaus", "slipstreaming"], ["peesaus", "sitting on the wheel"]],

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvQXBwLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL1N0b3JlLmpzIiwiL1ZvbHVtZXMvSnl0a3kvT21hdC9Ecm9wYm94L2RvY3VtZW50cy9wcm9qZWt0aXQvaW50ZXJuZXQvcmVhY3Rlc3QvYXBwL2FjdGlvbnMuanMiLCIvVm9sdW1lcy9KeXRreS9PbWF0L0Ryb3Bib3gvZG9jdW1lbnRzL3Byb2pla3RpdC9pbnRlcm5ldC9yZWFjdGVzdC9hcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUUxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM3QixhQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDSDs7QUFFRCxtQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUMzQjs7QUFFRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDOztBQUVELHNC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QUFFLHVCQUFZO0FBQ3ZCLGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQzlCO0dBQ0Y7Q0FDRixDQUFDLENBQUM7Ozs7O0FDck5ILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLGdCQUFnQixFQUNoQixhQUFhLENBQ2QsQ0FBQyxDQUFDOzs7OztBQ0xILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxHQUFHLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpLFxuICAgICAga2V5d29yZDogJydcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZWZzLmtleXdvcmQuZm9jdXMoKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlczogU3RvcmUuZ2V0TWVzc2FnZXMoKVxuICAgIH0pO1xuICB9LFxuXG4gIHNlYXJjaE1lc3NhZ2VzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMua2V5d29yZDtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzKGlucHV0LnZhbHVlKTtcbiAgfSxcblxuICB1cGRhdGVLZXl3b3JkOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAga2V5d29yZDogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDIpIHtcbiAgICAgIHRoaXMuc2VhcmNoTWVzc2FnZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9ucy5jbGVhclNlYXJjaCgpO1xuICAgIH1cblxuICB9LFxuXG4gIHJlbmRlck1lc3NhZ2VzOiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3JkX19sZWZ0XCI+XG4gICAgICAgICAge21lc3NhZ2VbMF19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvcmRfX3JpZ2h0XCI+XG4gICAgICAgICAge21lc3NhZ2VbMV19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYXBwXCI+XG4gICAgICAgIDxoMT57J1BvbGt1cHnDtnLDpHNhbmFraXJqYSd9PC9oMT5cbiAgICAgICAgPGgyPlN1b21pIC0gZW5nbGFudGkgLSBzdW9taTwvaDI+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCl9fT5cbiAgICAgICAgICA8aW5wdXQgcmVmPVwia2V5d29yZFwiIHBsYWNlaG9sZGVyPVwiXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5rZXl3b3JkfSBvbkNoYW5nZT17dGhpcy51cGRhdGVLZXl3b3JkfS8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZXMubWFwKHRoaXMucmVuZGVyTWVzc2FnZXMpfVxuICAgICAgPC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcblxuICAvLyBUaGUgZGljdGlvbmFyeS5cbiAgbWVzc2FnZXM6IFtcblxuICAgIC8vIE1hdGVyaWFsc1xuICAgIFtcImFsdW1paW5pXCIsIFwiYWx1bWluaXVtXCJdLFxuICAgIFtcImFsdW1paW5pXCIsIFwiYWxsb3lcIl0sXG4gICAgW1widGVyw6RzXCIsIFwic3RlZWxcIl0sXG4gICAgW1wiaGlpbGlrdWl0dVwiLCBcImNhcmJvblwiXSxcblxuICAgIC8vIEJpa2UgdHlwZXNcbiAgICBbXCJwb2xrdXB5w7Zyw6RcIiwgXCJiaWN5Y2xlXCJdLFxuICAgIFtcInRhaXR0b3B5w7Zyw6RcIiwgXCJmb2xkaW5nIGJpY3ljbGVcIl0sXG4gICAgW1wia2F1cHVua2lwecO2csOkXCIsIFwiY2l0eSBiaWN5Y2xlXCJdLFxuICAgIFtcInNpbmt1bGFcIiwgXCJzaW5nbGUgc3BlZWQgYmljeWNsZVwiXSxcbiAgICBbXCJhaWthLWFqb3B5w7Zyw6RcIiwgXCJ0aW1lIHRyaWFsIGJpY3ljbGVcIl0sXG4gICAgW1wiYWlrYS1ham9wecO2csOkXCIsIFwidHQtYmljeWNsZVwiXSxcbiAgICBbXCJtYWFudGllcHnDtnLDpFwiLCBcInJvYWQgYmljeWNsZVwiXSxcbiAgICBbXCJjeWNsb2Nyb3NzLXB5w7Zyw6RcIiwgXCJjeWNsb2Nyb3NzIGJpY3ljbGVcIl0sXG4gICAgW1wibMOkc2tpcHnDtnLDpFwiLCBcImZhdGJpa2VcIl0sXG4gICAgW1wibWFhc3RvcHnDtnLDpFwiLCBcIm1vdW50YWluIGJpY3ljbGVcIl0sXG4gICAgW1wia29sbWlwecO2csOkXCIsIFwidHJpY3ljbGVcIl0sXG4gICAgW1wieWtzaXB5w7Zyw6RpbmVuXCIsIFwidW5pY3ljbGVcIl0sXG4gICAgW1wibGFhdGlra29wecO2csOkXCIsIFwiYm94IGJpY3ljbGVcIl0sXG4gICAgW1wic8OkaGvDtnB5w7Zyw6RcIiwgXCJlbGVjdHJpYyBiaWN5Y2xlXCJdLFxuICAgIFtcInPDpGhrw7ZwecO2csOkXCIsIFwiZS1iaWN5Y2xlXCJdLFxuICAgIFtcIm5vamFwecO2csOkXCIsIFwicmVjdW1iZW50IGJpY3ljbGVcIl0sXG4gICAgW1wibm9qYXB5w7Zyw6RcIiwgXCJyZWN1bWJlbnQgdHJpY3ljbGVcIl0sXG4gICAgW1widGFuZGVtcHnDtnLDpFwiLCBcInRhbmRlbSBiaWN5Y2xlXCJdLFxuICAgIFtcInRhbmRlbXB5w7Zyw6RcIiwgXCJ0d2luXCJdLFxuICAgIFtcInJldGtpcHnDtnLDpFwiLCBcInRvdXJpbmcgYmljeWNsZVwiXSxcbiAgICBbXCJyYXRhcHnDtnLDpFwiLCBcInRyYWNrIGJpY3ljbGVcIl0sXG5cbiAgICAvLyBGcmFtZSBwYXJ0c1xuICAgIFtcInlsw6RwdXRraVwiLCBcInRvcCB0dWJlXCJdLFxuICAgIFtcImFsYXB1dGtpXCIsIFwiZG93biB0dWJlXCJdLFxuICAgIFtcImVtw6RwdXRraVwiLCBcImhlYWQgdHViZVwiXSxcbiAgICBbXCJoYWFydWthbnDDpMOkIChldHUpXCIsIFwiZnJvbnQgZHJvcG91dFwiXSxcbiAgICBbXCJoYWFydWthbnDDpMOkICh0YWthKVwiLCBcInJlYXIgZHJvcG91dFwiXSxcbiAgICBbXCJ0YWthaGFhcnVrYW4geWzDpHB1dGtpXCIsIFwic2VhdCBzdGF5XCJdLFxuICAgIFtcInRha2FoYWFydWthbiBhbGFwdXRraVwiLCBcImNoYWluIHN0YXlcIl0sXG5cbiAgICAvL1tcIlwiLCBcImRyb3BvdXRcIl0sXG5cbiAgICAvLyBCYXNlXG4gICAgW1wicnVua29cIiwgXCJmcmFtZVwiXSxcbiAgICBbXCJoYWFydWtrYVwiLCBcImZvcmtcIl0sXG4gICAgW1wiam91c3RvaGFhcnVra2FcIiwgXCJzdXNwZW5zaW9uIGZvcmtcIl0sXG4gICAgW1wiam91c2l0dXNcIiwgXCJzdXNwZW5zaW9uXCJdLFxuICAgIFtcImpvdXNpdHVzXCIsIFwic2hvY2sgYWJzb3JiZXJcIl0sXG5cbiAgICAvLyBUaXJlc1xuICAgIFtcInJlbmdhc1wiLCBcInRpcmUvdHlyZVwiXSxcbiAgICBbXCJ2YW5uZVwiLCBcInJpbVwiXSxcbiAgICBbXCJzaXPDpHJlbmdhc1wiLCBcImlubmVyIHR1YmVcIl0sXG4gICAgW1wicGlubmFcIiwgXCJzcG9rZVwiXSxcbiAgICBbXCJraWVra29cIiwgXCJ3aGVlbFwiXSxcbiAgICBbXCJuYXBhXCIsIFwid2hlZWwgaHViXCJdLFxuICAgIFtcInBpa2FsaW5ra3VcIiwgXCJxdWljayByZWxlYXNlIHNrZXdlclwiXSxcbiAgICBbXCJuYXN0YXJlbmdhc1wiLCBcInN0dWRkZWQgdHlyZVwiXSxcbiAgICBbXCJ2YW5uZW5hdWhhXCIsIFwicmltIHRhcGVcIl0sXG4gICAgW1widmFubmVuYXVoYVwiLCBcInJpbSBzdHJpcFwiXSxcbiAgICBbXCJ2ZW50dGlpbGlcIiwgXCJ2YWx2ZVwiXSxcbiAgICBbXCJyaWh0YXVzXCIsIFwidHJ1aW5nXCJdLFxuICAgIFtcInBpbm5vamVuIHJ1dXZpXCIsIFwic3Bva2UgbmlwcGxlXCJdLFxuXG4gICAgLy8gRHJpdmV0cmFpblxuICAgIFtcImthbXBpXCIsIFwiY3JhbmtcIl0sXG4gICAgW1wia2FtcGlcIiwgXCJjcmFua2FybVwiXSxcbiAgICBbXCJwb2xqaW5cIiwgXCJwZWRhbFwiXSxcbiAgICBbXCJrbG9zc2lcIiwgXCJjbGVhdFwiXSxcbiAgICBbXCJsdWtrb3BvbGppblwiLCBcImNsaXBsZXNzIHBlZGFsXCJdLFxuICAgIFtcImx1a2tvcG9samluXCIsIFwiY2xpcC1pbiBwZWRhbFwiXSxcbiAgICBbXCJsdWtrb3BvbGppblwiLCBcInN0ZXAtaW4gcGVkYWxcIl0sXG4gICAgW1widmFydmFza291a2t1XCIsIFwidG9lIGNsaXBcIl0sXG4gICAgW1wia2V0anVcIiwgXCJjaGFpblwiXSxcbiAgICBbXCJ2YWlodGFqYVwiLCBcImRlcmFpbGxldXJcIl0sXG4gICAgW1wiZXR1dmFpaHRhamFcIiwgXCJmcm9udCBkZXJhaWxsZXVyXCJdLFxuICAgIFtcInRha2F2YWlodGFqYVwiLCBcInJlYXIgZGVyYWlsbGV1clwiXSxcbiAgICBbXCJ0YWthdmFpaHRhamFuIGtvcnZha2VcIiwgXCJkZXJhaWxsZXVyIGhhbmdlclwiXSxcbiAgICBbXCJ2YWloZGV2aXZ1dFwiLCBcImRlcmFpbGxldXIgc2hpZnRlcnNcIl0sXG4gICAgW1widmFpaGRldml2dXRcIiwgXCJnZWFyIGNvbnRyb2xcIl0sXG4gICAgW1widmFpaGRldml2dXRcIiwgXCJnZWFyIGxldmVyc1wiXSxcbiAgICBbXCJyYXRhc1wiLCBcImNvZ1wiXSxcbiAgICBbXCJyYXRhc1wiLCBcInNwcm9ja2V0XCJdLFxuICAgIFtcImV0dXJhdGFzXCIsIFwiY2hhaW4gcmluZ1wiXSxcbiAgICBbXCJ2YXBhYXJhdGFzXCIsIFwiZnJlZWh1YlwiXSxcbiAgICBbXCJrYWFwZWxpXCIsIFwiY2FibGVcIl0sXG4gICAgW1wia2Vza2nDtlwiLCBcImJvdHRvbSBicmFja2V0XCJdLFxuICAgIFtcImthbXBpc2FyamFcIiwgXCJjaGFpbnNldFwiXSxcbiAgICBbXCJrYW1waXNhcmphXCIsIFwiY3JhbmtzZXRcIl0sXG4gICAgW1wicmF0YXNwYWtrYVwiLCBcImNhc3NldHRlXCJdLFxuICAgIFtcInJhdGFzcGFra2FcIiwgXCJyZWFyIGNvZ3NcIl0sXG4gICAgW1wicmF0YXNwYWthbiBsdWtrb3Jlbmdhc1wiLCBcImxvY2tyaW5nXCJdLFxuICAgIFtcInZhaWplcmluIHN1b2p1c1wiLCBcImNhYmxlIGhvdXNpbmdcIl0sXG4gICAgW1widmFpamVyaW4gc3VvanVzXCIsIFwib3V0ZXIgY2FibGVcIl0sXG4gICAgW1widmFpamVyaVwiLCBcImNhYmxlXCJdLFxuXG4gICAgLy8gU3RlZXJpbmdcbiAgICBbXCJvaGphdXN0YW5rb1wiLCBcImhhbmRsZWJhclwiXSxcbiAgICBbXCJvaGphdXN0YW5nb25rYW5uYXRpblwiLCBcInN0ZW1cIl0sXG4gICAgW1widGFua290ZWlwcGlcIiwgXCJiYXIgdGFwZVwiXSxcbiAgICBbXCJvaGphaW5sYWFrZXJpXCIsIFwiaGVhZHNldFwiXSxcblxuICAgIC8vIE90aGVyXG4gICAgW1wibGFha2VyaVwiLCBcImJlYXJpbmdcIl0sXG4gICAgW1wic2F0dWxhXCIsIFwic2FkZGxlXCJdLFxuICAgIFtcInNhdHVsYWtpc2tvdFwiLCBcInNlYXQgcmFpbHNcIl0sXG4gICAgW1wic2F0dWxhcHV0a2lcIiwgXCJzZWF0IHR1YmVcIl0sXG4gICAgW1wic2F0dWxhdG9scGFuIGtpcmlzdGluXCIsIFwic2VhdHBvc3QgY2xhbXBcIl0sXG4gICAgW1wic2F0dWxhdG9scGFuIGtpcmlzdGluXCIsIFwic2VhdHBvc3QgYmluZGVyXCJdLFxuICAgIFtcInNhdHVsYXRvbHBwYVwiLCBcInNlYXQgcG9zdFwiXSxcbiAgICBbXCJzb2l0dG9rZWxsb1wiLCBcImJlbGxcIl0sXG4gICAgW1wianVvbWFwdWxsb3RlbGluZVwiLCBcIndhdGVyIGJvdHRsZSBjYWdlXCJdLFxuICAgIFtcInZhaWplcmlsdWtrb1wiLCBcImNhYmxlIGxvY2tcIl0sXG4gICAgW1wibG9rYXN1b2phdFwiLCBcIm11ZGd1YXJkc1wiXSxcblxuICAgIC8vIEJyYWtlc1xuICAgIFtcImxldnlqYXJydXRcIiwgXCJoeWRyYXVsaWMgYnJha2VzXCJdLFxuICAgIFtcImphcnJ1dFwiLCBcImJyYWtlc1wiXSxcbiAgICBbXCJqYXJydWthaHZhXCIsIFwiYnJha2UgbGV2ZXJcIl0sXG4gICAgW1wiamFycnVwYWxhXCIsIFwiYnJha2UgcGFkXCJdLFxuICAgIFtcImphcnJ1cGFsYVwiLCBcImJyYWtlIHNob2VcIl0sXG4gICAgW1wiamFycnVsZXZ5XCIsIFwiZGlzYyBicmFrZSByb3RvclwiXSxcbiAgICBbXCJqYXJydXNhdHVsYVwiLCBcImJyYWtlIGNhbGlwZXJcIl0sXG4gICAgW1wiamFycnV2YWlqZXJpXCIsIFwiYnJha2UgY2FibGVcIl0sXG5cbiAgICAvLyBBY2Nlc3Nvcmllc1xuICAgIFtcInB5w7Zyw6RpbHlreXDDpHLDpFwiLCBcImJpY3ljbGUgaGVsbWV0XCJdLFxuICAgIFtcInNhdHVsYWxhdWtrdVwiLCBcInNlYXRiYWdcIl0sXG4gICAgW1wic2F0dWxhbGF1a2t1XCIsIFwic2FkZGxlYmFnXCJdLFxuICAgIFtcInNhdHVsYWxhdWtrdVwiLCBcInNlYXQgd2VkZ2VcIl0sXG4gICAgW1widHVraWphbGthXCIsIFwia2lja3N0YW5kXCJdLFxuICAgIFtcInR1a2lqYWxrYVwiLCBcImNlbnRlciBzdGFuZFwiXSxcbiAgICBbXCJ0dWtpamFsa2FcIiwgXCJyZWFyIHN0YW5kXCJdLFxuICAgIFtcInR1a2lqYWxrYVwiLCBcInN0YW5kXCJdLFxuICAgIFtcInRhdmFyYXRlbGluZVwiLCBcImx1Z2dhZ2UgY2FycmllclwiXSxcbiAgICBbXCJ0YXZhcmF0ZWxpbmVcIiwgXCJwYW5uaWVyIHJhY2tcIl0sXG4gICAgW1widGF2YXJhdGVsaW5lXCIsIFwicmFja1wiXSxcbiAgICBbXCJwecO2csOkaWx5cGFpdGFcIiwgXCJjeWNsaW5nIGplcnNleVwiXSxcblxuICAgIC8vIFRvb2xzXG4gICAgW1wia2FtbWVuIHVsb3N2ZXTDpGrDpFwiLCBcImNyYW5rIHB1bGxlclwiXSxcbiAgICBbXCJrYW1tZW4gdWxvc3ZldMOkasOkXCIsIFwiY3JhbmsgZXh0cmFjdG9yXCJdLFxuICAgIFtcImtldGp1cnVvc2thXCIsIFwiY2hhaW4gd2hpcFwiXSxcbiAgICBbXCJrZXRqdW5rYXRrYWlzaW5cIiwgXCJjaGFpbiBicmVha2VyXCJdLFxuICAgIFtcImtldGp1bmthdGthaXNpblwiLCBcImNoYWluIHJpdmV0IGV4dHJhY3RvclwiXSxcbiAgICBbXCJrZXRqdcO2bGp5XCIsIFwiY2hhaW4gbHViZVwiXSxcbiAgICBbXCJrdXVzaW9rb2xvYXZhaW5cIiwgXCJoZXgga2V5IC8gYWxsZW4ga2V5XCJdLFxuICAgIFtcInBpbm5hLWF2YWluXCIsIFwic3Bva2Uga2V5XCJdLFxuICAgIFtcInJlbmdhc3JhdXRhXCIsIFwidHlyZSBsZXZlclwiXSxcbiAgICBbXCJyZW5nYXNyYXV0YVwiLCBcInR5cmUgaXJvblwiXSxcbiAgICBbXCJ2b2l0ZWx1YWluZVwiLCBcImx1YnJpY2FudFwiXSxcbiAgICBbXCJwdW1wcHVcIiwgXCJwdW1wXCJdLFxuXG4gICAgLy8gTm90IGJpa2UgcmVsYXRlZFxuICAgIFtcImlsbWFudmFzdHVzXCIsIFwiYWlyIHJlc2lzdGFuY2VcIl0sXG4gICAgW1wicGVlc2F1c1wiLCBcImRyYWZ0aW5nXCJdLFxuICAgIFtcInBlZXNhdXNcIiwgXCJzbGlwc3RyZWFtaW5nXCJdLFxuICAgIFtcInBlZXNhdXNcIiwgXCJzaXR0aW5nIG9uIHRoZSB3aGVlbFwiXVxuXG4gIF0sXG5cbiAgLy8gRmlsdGVyZWQgZGljdGlvbmFyeS5cbiAgZmlsdGVyZWRNZXNzYWdlczogW1xuXG4gIF0sXG5cbiAgLy8gQXZhaWxhYmxlIGFjdGlvbnMuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLnNlYXJjaE1lc3NhZ2VzLFxuICAgIGFjdGlvbnMuY2xlYXJTZWFyY2hcbiAgXSxcblxuICAvKipcbiAgICogU2VhcmNoIGRpY3Rpb25hcnkgYnkgZ2l2ZW4ga2V5d29yZC5cbiAgICogQHBhcmFtICB7W3R5cGVdfSBrZXl3b3JkIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHNlYXJjaE1lc3NhZ2VzOiBmdW5jdGlvbihrZXl3b3JkKSB7XG5cbiAgICAvLyBDbGVhbiB0aGUgcmVzdWx0IGxpc3QuXG4gICAgdGhpcy5maWx0ZXJlZE1lc3NhZ2VzID0gW107XG5cbiAgICAvLyBGaWx0ZXIgb3JpZ2luYWwgbGlzdCBieSB0aGUga2V5d29yZC5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLm1lc3NhZ2VzW2ldWzBdLmluZGV4T2Yoa2V5d29yZCkgIT0gLTEgfHwgdGhpcy5tZXNzYWdlc1tpXVsxXS5pbmRleE9mKGtleXdvcmQpICE9IC0xKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRNZXNzYWdlcy5wdXNoKHRoaXMubWVzc2FnZXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuXG4gIH0sXG5cblxuICAvKipcbiAgICogQ2xlYXIgc2VhcmNoIHRvIGluaXRpYWwgc3RhdGUuXG4gICAqL1xuICBjbGVhclNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkTWVzc2FnZXMgPSBbXTtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRNZXNzYWdlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRNZXNzYWdlcztcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ3NlYXJjaE1lc3NhZ2VzJyxcbiAgJ2NsZWFyU2VhcmNoJ1xuXSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19

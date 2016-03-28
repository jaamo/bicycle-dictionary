var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({

  // The dictionary.
  messages: [

    // Materials
    ["alumiini", "aluminium"],
    ["teräs", "steel"],
    ["hiilikuitu", "carbon"],

    // Base
    ["runko", "frame"],
    ["haarukka", "fork"],
    ["joustohaarukka", "suspension fork"],

    // Tires
    ["rengas", "tire/tyre"],
    ["vanne", "rim"],
    ["sisäkumi", "inner tube"],
    ["pinna", "spoke"],

    // Drivetrain
    ["kampi", "crank"],
    ["poljin", "pedal"],
    ["ketju", "chain"],
    ["vaihtaja", "derailleur"],
    ["etuvaihtaja", "front derailleur"],
    ["takavaihtaja", "rear derailleur"],


    // Steering
    ["ohjaustanko", "handlebar"],
    ["ohjaustangonkannatin", "stem"],

    // Other
    ["laakeri", "bearing"],
    ["satula", "saddle"],
    ["soittokello", "bell"],

    // Brakes
    ["levyjarrut", "hydraulic brakes"],
    ["jarrut", "brakes"],
    ["jarrukahva", "brake lever"]

    // Tools

  ],

  // Filtered dictionary.
  filteredMessages: [

  ],

  // Available actions.
  actions: [
    actions.searchMessages,
    actions.clearSearch
  ],

  /**
   * Search dictionary by given keyword.
   * @param  {[type]} keyword [description]
   * @return {[type]}         [description]
   */
  searchMessages: function(keyword) {

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
  clearSearch: function() {
      this.filteredMessages = [];
      this.emitChange();
  },

  exports: {
    getMessages: function () {
      return this.filteredMessages;
    }
  }
});

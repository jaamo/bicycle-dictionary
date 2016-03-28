var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({

  // The dictionary.
  messages: [
    ["ohjaustangonkannatin", "stem"],
    ["satula", "saddle"]
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

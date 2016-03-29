var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({

  // The dictionary.
  messages: [

    // Materials
    ["alumiini", "aluminium"],
    ["alumiini", "alloy"],
    ["teräs", "steel"],
    ["hiilikuitu", "carbon"],

    // Bike types
    ["polkupyörä", "bicycle"],
    ["taittopyörä", "folding bicycle"],
    ["kaupunkipyörä", "city bicycle"],
    ["sinkula", "single speed bicycle"],
    ["aika-ajopyörä", "time trial bicycle"],
    ["aika-ajopyörä", "tt-bicycle"],
    ["maantiepyörä", "road bicycle"],
    ["cyclocross-pyörä", "cyclocross bicycle"],
    ["läskipyörä", "fatbike"],
    ["maastopyörä", "mountain bicycle"],
    ["kolmipyörä", "tricycle"],
    ["yksipyöräinen", "unicycle"],
    ["laatikkopyörä", "box bicycle"],
    ["sähköpyörä", "electric bicycle"],
    ["sähköpyörä", "e-bicycle"],
    ["nojapyörä", "recumbent bicycle"],
    ["nojapyörä", "recumbent tricycle"],
    ["tandempyörä", "tandem bicycle"],
    ["tandempyörä", "twin"],
    ["retkipyörä", "touring bicycle"],
    ["ratapyörä", "track bicycle"],

    // Frame parts
    ["yläputki", "top tube"],
    ["alaputki", "down tube"],
    ["emäputki", "head tube"],
    ["haarukanpää (etu)", "front dropout"],
    ["haarukanpää (taka)", "rear dropout"],
    ["takahaarukan yläputki", "seat stay"],
    ["takahaarukan alaputki", "chain stay"],

    //["", "dropout"],

    // Base
    ["runko", "frame"],
    ["haarukka", "fork"],
    ["joustohaarukka", "suspension fork"],
    ["jousitus", "suspension"],
    ["jousitus", "shock absorber"],

    // Tires
    ["rengas", "tire/tyre"],
    ["vanne", "rim"],
    ["sisärengas", "inner tube"],
    ["pinna", "spoke"],
    ["kiekko", "wheel"],
    ["napa", "wheel hub"],
    ["pikalinkku", "quick release skewer"],
    ["nastarengas", "studded tyre"],
    ["vannenauha", "rim tape"],
    ["vannenauha", "rim strip"],
    ["venttiili", "valve"],
    ["rihtaus", "truing"],
    ["pinnojen ruuvi", "spoke nipple"],

    // Drivetrain
    ["kampi", "crank"],
    ["kampi", "crankarm"],
    ["poljin", "pedal"],
    ["klossi", "cleat"],
    ["lukkopoljin", "clipless pedal"],
    ["lukkopoljin", "clip-in pedal"],
    ["lukkopoljin", "step-in pedal"],
    ["varvaskoukku", "toe clip"],
    ["ketju", "chain"],
    ["vaihtaja", "derailleur"],
    ["etuvaihtaja", "front derailleur"],
    ["takavaihtaja", "rear derailleur"],
    ["takavaihtajan korvake", "derailleur hanger"],
    ["vaihdevivut", "derailleur shifters"],
    ["vaihdevivut", "gear control"],
    ["vaihdevivut", "gear levers"],
    ["ratas", "cog"],
    ["ratas", "sprocket"],
    ["eturatas", "chain ring"],
    ["vapaaratas", "freehub"],
    ["kaapeli", "cable"],
    ["keskiö", "bottom bracket"],
    ["kampisarja", "chainset"],
    ["kampisarja", "crankset"],
    ["rataspakka", "cassette"],
    ["rataspakka", "rear cogs"],
    ["rataspakan lukkorengas", "lockring"],
    ["vaijerin suojus", "cable housing"],
    ["vaijerin suojus", "outer cable"],
    ["vaijeri", "cable"],

    // Steering
    ["ohjaustanko", "handlebar"],
    ["ohjaustangonkannatin", "stem"],
    ["tankoteippi", "bar tape"],
    ["ohjainlaakeri", "headset"],

    // Other
    ["laakeri", "bearing"],
    ["satula", "saddle"],
    ["satulakiskot", "seat rails"],
    ["satulaputki", "seat tube"],
    ["satulatolpan kiristin", "seatpost clamp"],
    ["satulatolpan kiristin", "seatpost binder"],
    ["satulatolppa", "seat post"],
    ["soittokello", "bell"],
    ["juomapulloteline", "water bottle cage"],
    ["vaijerilukko", "cable lock"],
    ["lokasuojat", "mudguards"],

    // Brakes
    ["levyjarrut", "hydraulic brakes"],
    ["jarrut", "brakes"],
    ["jarrukahva", "brake lever"],
    ["jarrupala", "brake pad"],
    ["jarrupala", "brake shoe"],
    ["jarrulevy", "disc brake rotor"],
    ["jarrusatula", "brake caliper"],
    ["jarruvaijeri", "brake cable"],

    // Accessories
    ["pyöräilykypärä", "bicycle helmet"],
    ["satulalaukku", "seatbag"],
    ["satulalaukku", "saddlebag"],
    ["satulalaukku", "seat wedge"],
    ["tukijalka", "kickstand"],
    ["tukijalka", "center stand"],
    ["tukijalka", "rear stand"],
    ["tukijalka", "stand"],
    ["tavarateline", "luggage carrier"],
    ["tavarateline", "pannier rack"],
    ["tavarateline", "rack"],
    ["pyöräilypaita", "cycling jersey"],

    // Tools
    ["kammen ulosvetäjä", "crank puller"],
    ["kammen ulosvetäjä", "crank extractor"],
    ["ketjuruoska", "chain whip"],
    ["ketjunkatkaisin", "chain breaker"],
    ["ketjunkatkaisin", "chain rivet extractor"],
    ["ketjuöljy", "chain lube"],
    ["kuusiokoloavain", "hex key / allen key"],
    ["pinna-avain", "spoke key"],
    ["rengasrauta", "tyre lever"],
    ["rengasrauta", "tyre iron"],
    ["voiteluaine", "lubricant"],
    ["pumppu", "pump"],

    // Not bike related
    ["ilmanvastus", "air resistance"],
    ["peesaus", "drafting"],
    ["peesaus", "slipstreaming"],
    ["peesaus", "sitting on the wheel"]

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

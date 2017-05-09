var expand;



nextAvailableId = function(participants) {

  var ids = participants.map(function(p) {
    return p.get("id");
  });

  return Math.max.apply(null, ids) + 1
};

expand = function(interaction) {
  participants = interaction.get("participants").withStoichiometry();

  var clones = [];

  participants.each(function(p) {

    for (var i = 0; i < p.get("stoichiometry"); i++) {
      var clone = p.clone();
      clone.set("id", nextAvailableId(participants) + i);
      clone.set("clone?", true);
      clone.set("fromParticipant", p);
      interaction.get("participants").add(clone);
    }

  });


  interaction.set("expanded?", true);

  // console.log("returning", interaction);

  return interaction;

}

module.exports = expand;

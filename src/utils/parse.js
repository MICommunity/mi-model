var interactions, interactors, participants;

participants = function(json) {
  return _.find(json, function(d) {
    return d.object === "interaction";
  }).participants;
};

interactions = function(json) {
  return _.filter(json, function(d) {
    return d.object === "interaction";
  });
};

interactors = function(json) {
  return _.filter(json, function(d) {
    return d.object === "interactor";
  });
};

module.exports = {participants: participants, interactions: interactions, interactors: interactors}

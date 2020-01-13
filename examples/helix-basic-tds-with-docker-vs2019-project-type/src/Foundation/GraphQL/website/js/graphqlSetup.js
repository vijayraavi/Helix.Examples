const graph = graphql("/api/basiccompany?sc_apikey={FB719F13-EDF3-42B3-B250-CA0B9507AA95}",
  {
    alwaysAutodeclare: true,
    asJSON: true,
    debug: true
  });

const reactor = new Reactor();
reactor.registerEvent('fetchGraphQlEvent');

reactor.addEventListener('fetchGraphQlEvent', function () {
  graph.commit('fetchGraphQl').then(function(response) {
    console.log(response);
  });
});



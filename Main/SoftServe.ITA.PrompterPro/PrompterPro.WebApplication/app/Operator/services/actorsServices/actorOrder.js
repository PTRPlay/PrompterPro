app.service("actorOrder",
    function() {
        return function(actor) {
            return actor.Title;
        };
    });
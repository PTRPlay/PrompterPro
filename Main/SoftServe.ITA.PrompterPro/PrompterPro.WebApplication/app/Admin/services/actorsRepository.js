app.service("actorsRepository", [
    "$http",
    "$q",
    function ($http, $q) {
        var self = this;

        self.actors = {
            get: function (id) {
                var deferred = $q.defer();
                $http.get("api/Actor?id" + id)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            getall: function () {
                var deferred = $q.defer();
                $http.get("api/Actor/")
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            post: function (actor) {
                var deferred = $q.defer();
                $http.post("api/Actor",
                    actor)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            del: function (id) {
                var deferred = $q.defer();
                $http.delete("api/Actor?id=" + id)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            put: function (actor) {
                var deferred = $q.defer();
                $http.put("api/Actor?id=" + actor.Id, actor)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }

        }

        return self;
    }
])
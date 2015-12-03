app.service("actorRepository", [
    "$http",
    "$q",
    function ($http, $q) {
        var obj = this;
        
        obj.get = function (id) {
            var deferred = $q.defer();
            $http.get("api/Actor?id" + id)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        obj.getall = function () {
            var deferred = $q.defer();
            $http.get("api/Actor/")
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        obj.post = function (actor) {
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
        };

        obj.del = function (id) {
            var deferred = $q.defer();
            $http.delete("api/Actor?id=" + id)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        obj.put = function (actor) {
            var deferred = $q.defer();
            $http.put("api/Actor?id=" + actor.Id, actor)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        return obj;
    }
])
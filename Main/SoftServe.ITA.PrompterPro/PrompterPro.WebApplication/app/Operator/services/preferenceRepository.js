﻿app.service("preferenceRepository", [
    "$http",
    "$q",
    function ($http, $q) {
        return {
            get: function (actorId, scriptId) {
                var deferred = $q.defer();
                $http.get("api/preference?id=" + actorId + "+" + scriptId)
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
                $http.get("api/preference/")
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            post: function (preference) {
                var deferred = $q.defer();
                $http.post("api/preference/", preference)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        alert(error);
                    });
                return deferred.promise;
            },


            del: function (id) {
                var deferred = $q.defer();
                $http.delete("api/preference?id=" + id)
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            put: function (preference) {
                var deferred = $q.defer();
                $http.put("api/preference?id=" + preference.Id, preference) // maybe should add id
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }

        }
    }
]);
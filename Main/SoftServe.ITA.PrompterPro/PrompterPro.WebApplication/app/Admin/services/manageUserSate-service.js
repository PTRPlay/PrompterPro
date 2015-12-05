app.factory('manageUserSate', [
    'entityState', function (entityState) {
        return {
            setAddedState: function (user) {
                user.EntityState = entityState.Added;
            },

            setDeletedState: function (user) {
                user.EntityState = entityState.Modified; // deleting,maybe change here
                if (user.Disabled !== undefined)
                    user.Disabled = true;
            },

            setModifiedState: function (user) {
                user.EntityState = entityState.Modified;
            },

            setUsualState: function (user) {
                user.EntityState = 2; //
            }
        }
    }
]);
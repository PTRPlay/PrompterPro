app.factory('manageUserSate', [
    'entityState', function (entityState) {
        return {
            setAddedState: function (user) {
                user.EntityState = entityState.Added;
                user.inAction = true;
            },

            setDeletedState: function (user) {
                user.EntityState = entityState.Modified; // deleting,maybe change here
                user.inAction = true;
                if (user.Disabled !== undefined)
                    user.Disabled = true;
            },

            setModifiedState: function (user) {
                user.EntityState = entityState.Modified;
                user.inAction = true;
            },

            setUsualState: function (user) {
                user.EntityState = 2; 
                user.inAction = false;
            }
        }
    }
]);
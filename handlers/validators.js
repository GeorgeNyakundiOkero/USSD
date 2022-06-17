module.exports = {
    ensureAuthenticated: function(req, res, next) {
            if(req.isAuthenticated()) {
                return next();
            }
            console.log('Please Log In');
            req.flash('error_msg', 'Please Log In');
            res.redirect('/users/login');
    },
    isAdmin: function(req, res, next) {
        if(req.user.userType){
            return next();
        }
        console.log('restricted Access');
        req.flash('error_msg', 'Restricted access');
        res.redirect('/admin/wait');
    }
}
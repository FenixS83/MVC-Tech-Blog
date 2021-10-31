$(function () {
    const logoutBtn = $("#logout");
// function for logging out of session
    const logout = async () => {
        const response = await $.ajax({
            url: '/api/user/logout',
            method: 'POST'
        }).done(function() {
            location.replace("/login");
        });
    };

    logoutBtn.click(function(e) {
        e.preventDefault();
        logout();
    })



});
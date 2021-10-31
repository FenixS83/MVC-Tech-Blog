$(function () {

    const userLogin = $("#user-login");
    const passwordLogin = $("#password-login");
    const loginBtn = $("#login");
    const emailSignup = $("#email-signup")
    const userSignup = $("#name-signup");
    const passwordSignup = $("#password-signup");
    const signupBtn = $("#signup");
// function for logging in
    const loginHandler = async () => {
        const email = userLogin.val().trim();
        const password = passwordLogin.val().trim();

        $.ajax({
            method: "POST",
            url: "/api/user/login",
            data: { email: email, password: password },
            error: function () {
                alert("login failed!")
            },
            complete: function () {
                location.replace("/");
            },
        });
    };
// function for creating account
    const signupHandler = async () => {
        const email = emailSignup.val().trim();
        const userName = userSignup.val().trim();
        const password = passwordSignup.val().trim();

        console.log(email, userName, password)

        $.ajax({
            method: "POST",
            url: "/api/user/",
            data: { email: email, userName: userName, password: password },
            error: function () {
                alert("login failed!")
            },
            complete: function () {
                location.replace("/");
            },
        });
    };


    loginBtn.click(function (e) {
        e.preventDefault();
        loginHandler();
    });

    signupBtn.click(function (e) {
        e.preventDefault();
        signupHandler();
    });

});
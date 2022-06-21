import { web } from './helpers/helpers.js';
new Vue({
    el: '#login-page',
    data() {
        return {
            test: 'hello world',
            usernameInput: '',
            passwordInput: '',
            data: false,
            testing: false,
            responseData: false,
            loginToken: false,
        }
    },
    mounted() {
        console.log(typeof localStorage.getItem("user_id"))
        //this.fetch('test.php', 'get');
        //const args = new FormData();
        if (localStorage.getItem("user_id")) {
            console.log('user_id exists')
            let uid = parseInt(localStorage.getItem("user_id"))
            let token = localStorage.getItem("token")
            console.log(typeof uid);
            console.log(token);
            //args.append('id', uid);
            //args.append("token", token);
            web("http://localhost/quiz/index.php?q=isUserLoggedIn", "post", { id: uid, token: token }).then((response) => {
                if (response.result) window.location.href = "quiz.html";
            })
        } 
    },
    methods: {
        fetch(url, method, formData = false) {
            const vm = this;
            console.log('data')
            console.log(formData);
            return false
            if (method == "get") {
                fetch(url)
                .then(response => response.json())
                .then(data => (console.log(data), vm.data = data))
            }
            if (method == "post") {
                fetch(url, {
                method: 'POST', // or 'PUT'
                body: formData,
                })
                .then(response => (console.log(response), console.log(response.json())))
                .then(data => {
                console.log('Success:', vm.data = data);
                })
                .catch((error) => {
                console.error('Error:', vm.data = error);
                });
            }
        },
        saveLogin() {
            const vm = this;
            //args.append('loginUsername', vm.usernameInput);
            //args.loginUsername = vm.usernameInput
            //args.append('loginPassword', vm.passwordInput);
            //args.loginPassword = vm.passwordInput;

            //this.fetch('http://localhost/Quiz/login.php?action=login', 'post', args);
           this.response =  web('http://localhost/Quiz/login.php?action=login', 'post', { loginUsername: vm.usernameInput, loginPassword: vm.passwordInput }).then((data) => (vm.loginToken = data.token, data))
           .then((data) => (localStorage.setItem('user_id', data.user_id) ,localStorage.setItem('token', data.token),console.log("in then func"), window.location.href = "quiz.html" ))
           .catch((error) => {
            console.error('Error:', vm.data = error);
            });
        }
    }
});


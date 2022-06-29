import { web } from "./helpers/helpers.js";
new Vue({
    el: '#register-page',
    data() {
        return {
            test: 'hello world',
            usernameInput: '',
            passwordInput: '',
            responseData: false,
            errorUsername: false,
            user: ''
        }
    },
    mounted() {
        //this.fetch('test.php', 'get');
        if (localStorage.getItem("user_id")) {
            web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get").then((response) => vm.user = response.users_list[0]);
        }
    },
    methods: {
        fetch(url, method, formData = false) {
            const vm = this;
            
            if (method == "get") {
                fetch(url)
                .then(response => response.json())
                .then(data => (console.log(data), vm.data = data))
            }
            if (method == "post") {
                return fetch(url, {
                method: 'POST', // or 'PUT'
                body: formData,
                })
                .then(response => (console.log(response), response.json()))
                .then(data => {
                console.log('Success:', vm.data = data);
                return data;
                })
                .catch((error) => {
                console.error('Error:', vm.data = error);
                });
            }
        },
        register() {
            const args = new FormData();
            const vm = this;
            args.append('registerUsername', vm.usernameInput);
            args.append('registerPassword', vm.passwordInput);
            this.fetch('http://localhost/Quiz/register.php?action=register', 'post', args)
            .then((response) => vm.responseData = response)
            .then((data) => { 
                if (data.error) vm.errorUsername = data.error;
                
                else if (data.result) {
                    localStorage.setItem("user_id", data.result.user_id);
                    localStorage.setItem("token", data.result.token);
                    window.location.href = "quiz.html";
                } 
               
            });
        }
    }
});

new Vue({
    el: '#login-page',
    data() {
        return {
            test: 'hello world',
            usernameInput: '',
            passwordInput: '',
            data: false
        }
    },
    mounted() {
        //this.fetch('test.php', 'get');
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
            const args = new FormData();
            const vm = this;
            args.append('loginUsername', vm.usernameInput);
            args.append('loginPassword', vm.passwordInput);
            this.fetch('http://localhost/Quiz/login.php?action=login', 'post', args);
        }
    }
});


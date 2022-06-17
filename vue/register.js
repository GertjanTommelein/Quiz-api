new Vue({
    el: '#register-page',
    data() {
        return {
            test: 'hello world',
            usernameInput: '',
            passwordInput: '',
            responseData: false
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
        register() {
            const args = new FormData();
            const vm = this;
            args.append('registerUsername', vm.usernameInput);
            args.append('registerPassword', vm.passwordInput);
            this.fetch('http://localhost/Quiz/register.php?action=register', 'post', args);
        }
    }
});

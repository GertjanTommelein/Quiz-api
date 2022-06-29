Vue.component('v-footer',{
    template: `
        <footer id="footer" style="position: absolute;bottom: 0;width: 100%;">
            <div class="footer-wrapper">
                
            </div>
            <div class="copyright" style="padding:10px;background-color: #337a9a;color: white;text-align:center;">
                <p>&copy; Quiz 2022 | Developed by Gertjan Tommelein</p>
            </div>
        </footer>   
    `,
    props: {
        active: String,
        username: String
    },
    data () {
        return {
            user: ''
        }
    },
    mounted () {
        
        const vm = this;
        if (localStorage.getItem("user_id")) {
          // web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get").then((response) => vm.user = response.users_list[0].username);
        }
    },
    methods: {
        logout() {
            console.log('logged out');
            localStorage.clear();
            window.location.href="loginForm.html"
        }
    }
});
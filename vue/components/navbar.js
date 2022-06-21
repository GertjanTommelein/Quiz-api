Vue.component('navigation',{
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Quiz</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ user }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a @click="logout" class="dropdown-item" href="#">Logout</a>
                    </div>
                </li>
                <a :class="['nav-item nav-link', active == 'Home' ?  'active' : '']" href="http://localhost/Quiz/presentation/quiz.html">Home</a>
                <a :class="['nav-item nav-link', active == 'Create' ?  'active' : '']" href="http://localhost/Quiz/presentation/create.html">Create</a>
                <a :class="['nav-item nav-link', active == 'Play' ?  'active' : '']" href="http://localhost/Quiz/presentation/play.html">Play</a>
            </div>
        </div>
    </nav>
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
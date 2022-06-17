Vue.component('navigation',{
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Quiz</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a :class="['nav-item nav-link', active == 'Home' ?  'active' : '']" href="#">Home</a>
                <a :class="['nav-item nav-link', active == 'Create' ?  'active' : '']" href="http://localhost/Quiz/presentation/create.html">Create</a>
                <a :class="['nav-item nav-link', active == 'Play' ?  'active' : '']" href="http://localhost/Quiz/presentation/play.html">Play</a>
            </div>
        </div>
    </nav>
    `,
    props: {
        active: String
    }
});
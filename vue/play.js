import {web} from './helpers/helpers.js';
new Vue({
    el: '#play-page',
    data() {
        return {
            responseData: false,
            result: false,
            quizData: false,
            data: false
        }
    },
    mounted() {
        //this.fetch("index.php?q=users", "get");
        //this.quizData = this.fetch("index.php?q=quiz", "get");
        this.quizData = web("index.php?q=quiz", "get");
    },
    methods: {

    },
});
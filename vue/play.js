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
        const vm = this;
        //this.fetch("index.php?q=users", "get");
        //this.quizData = this.fetch("index.php?q=quiz", "get");
        web("index.php?q=quiz", "get").then((data) => vm.quizData = data);
    },
    methods: {

    },
});
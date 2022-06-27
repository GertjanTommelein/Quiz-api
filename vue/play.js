import {web} from './helpers/helpers.js';
new Vue({
    el: '#play-page',
    data() {
        return {
            responseData: false,
            result: false,
            quizData: false,
            data: false,
            quizQuestion: '',
            index: 0
        }
    },
    mounted() {
        const vm = this;
        let url = new URL(window.location.href);
        let paramId = url.searchParams.get("id");
        //this.fetch("index.php?q=users", "get");
        //this.quizData = this.fetch("index.php?q=quiz", "get");
        web("index.php?q=quiz&id=" + paramId, "get").then((data) => vm.quizData = data).then(() => vm.quizQuestion =  vm.quizData[0].questions[0]);
    },
    methods: {

    },
});
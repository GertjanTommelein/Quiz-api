new Vue({
    el: '#quiz-page',
    data() {
        return {
            quizTitleInput: '',
            quizDescriptionInput: '',
            quizQuestionInput: '',
            quizAnswer1Input: '',
            quizAnswer2Input: '',
            quizAnswer3Input: '',
            quizAnswer4Input: '',
            quizCorrectAnswerInput: '',
            responseData: false,
            result: false,
            showQuizForm: false,
            quizData: false
        }
    },
    mounted() {
        this.fetch("index.php?q=users", "get");
        this.quizData = this.fetch("index.php?q=quiz", "get");
    },
    methods: {
        fetch(url, method, formData = false) {
            const vm = this;
            const baseUrl = "http://localhost/Quiz/";
          if (method == "get") {
                fetch(baseUrl + url)
                .then(response => response.json())
                .then(data => (console.log(data), vm.result = data))
            }
            if (method == "post") {
                fetch(url, {
                method: 'POST', // or 'PUT'
                body: formData,
                })
                .then(response => (console.log(response), console.log(response.json())))
                .then(data => {
                console.log('Success:', vm.data = data);
                return data;
                })
                .catch((error) => {
                console.error('Error:', vm.data = error);
                });
            }
        },
        createQuiz() {
            const vm = this;
            const args = {
                quizTitle: vm.quizTitleInput,
                quizDescription: vm.quizDescriptionInput,
                quizQuestion: vm.quizQuestionInput,
                quizAnswer1: vm.quizAnswer1Input,
                quizAnswer2: vm.quizAnswer2Input,
                quizAnswer3: vm.quizAnswer3Input,
                quizAnswer4: vm.quizAnswer4Input,
            }
            this.fetch("")
        } 
    },
});
import { web } from "./helpers/helpers.js";

new Vue({
    el: '#quiz-page',
    data() {
        return {
            quizTitleInput: 'test',
            quizDescriptionInput: 'test',
            quizQuestionInput: 'test',
            quizAnswer1Input: 'test',
            quizAnswer2Input: 'test',
            quizAnswer3Input: 'test',
            quizAnswer4Input: 'test',
            quizCorrectAnswerInput: 'test',
            responseData: false,
            result: false,
            showQuizForm: false,
            quizData: false,
            user: false
        }
    },
    mounted() {
        const vm = this;
        this.fetch("index.php?q=users", "get");
        this.quizData = this.fetch("index.php?q=quiz", "get");
        if (localStorage.getItem("user_id")) {
            web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get").then((response) => vm.user = response.users_list[0]);
        } else {
            window.location.href = "loginForm.html"
        }

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
            console.log('in create func')
            const vm = this;
            let arr = [
                { 
                    question: vm.quizQuestionInput,
                    choices:[
                        { answer: vm.quizAnswer1Input, correct: 0 },
                        { answer: vm.quizAnswer2Input, correct: 0 },
                        { answer: vm.quizAnswer3Input, correct: 0 },
                        { answer: vm.quizAnswer4Input, correct: 0 },
                    ]
                }
            ];
            const args = {
                id: parseInt(localStorage.getItem("user_id")),
                quizTitle: vm.quizTitleInput,
                quizDescription: vm.quizDescriptionInput,
                quizQuestions: arr
            }
            web("http://localhost/Quiz/index.php?q=createQuiz", "post", args);
        },
        deleteQuiz(id, index) {
            const vm = this;
            web("index.php?q=deleteQuiz&id=" + id, "get");
            vm.result.quiz_list.splice(index,1)
        },
        editQuiz(quizId) {
            window.location.href= "edit_quiz.html?id=" + quizId
        },
        playQuiz(quizId) {
            window.location.href= "play.html?id=" + quizId
        }
    },
});
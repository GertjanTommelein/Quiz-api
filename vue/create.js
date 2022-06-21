import { web } from './helpers/helpers.js';
import { test } from './helpers/helpers.js';
new Vue({
    el: '#create-page',
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
            quizData: false,
            quizSuccess: false,
            correctAnswer: ''
        }
    },
    mounted() {
       web("index.php?q=quiz", "get").then((data) => this.quizData = data);
    },
    methods: {
        createQuiz() {
            console.log('in create func')
            const vm = this;
            let arr = [
                { 
                    question: vm.quizQuestionInput,
                    choices:[
                        { answer: vm.quizAnswer1Input, correct: parseInt(vm.correctAnswer) == 1 ? 1 : 0 },
                        { answer: vm.quizAnswer2Input, correct: parseInt(vm.correctAnswer) == 2 ? 1 : 0 },
                        { answer: vm.quizAnswer3Input, correct: parseInt(vm.correctAnswer) == 3 ? 1 : 0 },
                        { answer: vm.quizAnswer4Input, correct: parseInt(vm.correctAnswer) == 4 ? 1 : 0 },
                    ]
                }
            ];
            const args = {
                id: parseInt(localStorage.getItem("user_id")),
                quizTitle: vm.quizTitleInput,
                quizDescription: vm.quizDescriptionInput,
                quizQuestions: arr
            }
            web("http://localhost/Quiz/index.php?q=createQuiz", "post", args).then(() => {
                vm.quizSuccess = true
                setTimeout(function() {
                    vm.quizSuccess = false
                }, 8000);
            });
        }
    }
});
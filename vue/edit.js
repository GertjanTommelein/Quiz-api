import { web } from './helpers/helpers.js';
import { test } from './helpers/helpers.js';
new Vue({
    el: '#edit-page',
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
        const vm = this
        let url = new URL(window.location.href);
        let paramId = url.searchParams.get("id");

       web("index.php?q=quiz&id=" + paramId , "get").then((data) => this.quizData = data)
       .then(() => {
        console.log(vm.quizData[0].questions);
            vm.quizTitleInput = vm.quizData[0].title
            vm.quizDescriptionInput = vm.quizData[0].description
            vm.quizQuestionInput = vm.quizData[0].questions[0].question
            vm.quizAnswer1Input = vm.quizData[0].questions[0].choices[0].title
            vm.quizAnswer2Input = vm.quizData[0].questions[0].choices[1].title
            vm.quizAnswer3Input = vm.quizData[0].questions[0].choices[2].title
            vm.quizAnswer4Input = vm.quizData[0].questions[0].choices[3].title
            vm.correctAnswer = vm.quizData[0].questions[0].choices.findIndex((choice) => choice.correct == 1) + 1
       });
    },
    methods: {
        updateQuiz() {
            const vm = this;
            let arr = [
                { 
                    id: vm.quizData[0].questions[0].id,
                    title: vm.quizQuestionInput,
                    choices:[
                        { id: vm.quizData[0].questions[0].choices[0].id, answer: vm.quizAnswer1Input, correct: parseInt(vm.correctAnswer) == 1 ? 1 : 0 },
                        { id: vm.quizData[0].questions[0].choices[1].id, answer: vm.quizAnswer2Input, correct: parseInt(vm.correctAnswer) == 2 ? 1 : 0 },
                        { id: vm.quizData[0].questions[0].choices[2].id, answer: vm.quizAnswer3Input, correct: parseInt(vm.correctAnswer) == 3 ? 1 : 0 },
                        { id: vm.quizData[0].questions[0].choices[3].id, answer: vm.quizAnswer4Input, correct: parseInt(vm.correctAnswer) == 4 ? 1 : 0 },
                    ]
                }
            ];
            const args = {
                id: vm.quizData[0].id,
                title: vm.quizTitleInput,
                description: vm.quizDescriptionInput,
                questions: arr
            }
            web("http://localhost/Quiz/index.php?q=updateQuiz", "post", args).then(() => {
                vm.quizSuccess = true
                setTimeout(function() {
                    vm.quizSuccess = false
                }, 8000);
            });
        }
    }
});
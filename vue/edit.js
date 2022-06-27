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
            correctAnswer: '',
            questions: [],
            correctChoice: 0
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
            // vm.quizQuestionInput = vm.quizData[0].questions[0].question
            // vm.quizAnswer1Input = vm.quizData[0].questions[0].choices[0].title
            // vm.quizAnswer2Input = vm.quizData[0].questions[0].choices[1].title
            // vm.quizAnswer3Input = vm.quizData[0].questions[0].choices[2].title
            // vm.quizAnswer4Input = vm.quizData[0].questions[0].choices[3].title
            //vm.correctAnswer = vm.quizData[0].questions[0].choices.findIndex((choice) => choice.correct == 1) + 1
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
        },
        addQuestion(questions) {
            const vm = this;
            if (this.$refs.quizQuestion.classList.contains('error') || this.$refs.quizAnswer1.classList.contains('error') || this.$refs.quizAnswer2.classList.contains('error') || this.$refs.quizAnswer3.classList.contains('error') || this.$refs.quizAnswer4.classList.contains('error')) return false
            if (!this.quizQuestionInput || !this.quizAnswer1Input || !this.quizAnswer2Input || !this.quizAnswer3Input || !this.quizAnswer4Input) return false
            if (this.correctAnswer == 0) return false
            const question = 
                { 
                    question: vm.quizQuestionInput,
                    correctChoice: vm.correctAnswer,
                    choices:[
                        { answer: vm.quizAnswer1Input, correct: parseInt(vm.correctAnswer) == 1 ? 1 : 0 },
                        { answer: vm.quizAnswer2Input, correct: parseInt(vm.correctAnswer) == 2 ? 1 : 0 },
                        { answer: vm.quizAnswer3Input, correct: parseInt(vm.correctAnswer) == 3 ? 1 : 0 },
                        { answer: vm.quizAnswer4Input, correct: parseInt(vm.correctAnswer) == 4 ? 1 : 0 },
                    ]
                }
            questions.push(question);
            this.quizQuestionInput = ''
            this.quizAnswer1Input = ''
            this.quizAnswer2Input = ''
            this.quizAnswer3Input = ''
            this.quizAnswer4Input = ''
            this.correctAnswer = 0
            this.$refs.quizQuestion.classList.remove('.error')
            this.$refs.quizAnswer1.classList.remove('.error')
            this.$refs.quizAnswer2.classList.remove('.error')
            this.$refs.quizAnswer3.classList.remove('.error')
            this.$refs.quizAnswer4.classList.remove('.error')
        },
        checkCorrectAnswer(question) {
            const vm = this;
            console.log(question);
            for (let i=0; question.choices.length; i++) {
                question.choices[i].correct = parseInt(vm.correctAnswer) == i+1 ? 1 : 0
            }
        }
    }
});
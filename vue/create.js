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
            correctAnswer: 0,
            step: 0,
            questions: [],
            user: ''
        }
    },
    mounted() {
        const vm = this;
       web("index.php?q=quiz", "get").then((data) => this.quizData = data);
       if (localStorage.getItem("user_id")) {
        web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get").then((response) => vm.user = response.users_list[0]);
        } else {
            window.location.href = "loginForm.html"
        }
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
                quizQuestions: vm.questions
            }
            web("http://localhost/Quiz/index.php?q=createQuiz", "post", args).then(() => {
                vm.quizSuccess = true
                setTimeout(function() {
                    vm.quizSuccess = false
                }, 8000);
            });
        },
        nextStep() {
            if (this.step == 0 && this.$refs.quizTitle.classList.contains('error') || this.quizTitleInput == '') {

            }
            else this.step = this.step + 1;
        },
        previousStep() {
            
            if (this.step !== 0) this.step = this.step - 1;
            
        },
        addQuestion() {
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
            this.questions.push(question);
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
            for (let i=0; question.choices.length; i++) {
                question.choices[i].correct = parseInt(question.correctChoice) == i+1 ? 1 : 0
            }
        }
    },
    watch: {
        quizTitleInput() {
            if (this.quizTitleInput == '' || this.quizTitleInput.length < 3) this.$refs.quizTitle.classList.add('error')
            else this.$refs.quizTitle.classList.remove('error')
            console.log('in func')
        },
        quizQuestionInput() {
            if (this.quizQuestionInput == '' || this.quizQuestionInput.length < 3) {
                this.$refs.quizQuestion.classList.add('error')
            } else this.$refs.quizQuestion.classList.remove('error')
        },
        quizAnswer1Input() {
            if (this.quizAnswer1Input == '' || this.quizAnswer1Input.length < 3) this.$refs.quizAnswer1.classList.add('error')
            else this.$refs.quizAnswer1.classList.remove('error')
        },
        quizAnswer2Input() {
            if (this.quizAnswer2Input == '' || this.quizAnswer2Input.length < 3) this.$refs.quizAnswer2.classList.add('error')
            else this.$refs.quizAnswer2.classList.remove('error')
        },
        quizAnswer3Input() {
            if (this.quizAnswer3Input == '' || this.quizAnswer3Input.length < 3) this.$refs.quizAnswer3.classList.add('error')
            else this.$refs.quizAnswer3.classList.remove('error')
        },
        quizAnswer4Input() {
            if (this.quizAnswer4Input == '' || this.quizAnswer4Input.length < 3) this.$refs.quizAnswer4.classList.add('error')
            else this.$refs.quizAnswer4.classList.remove('error')
        }
    }
});
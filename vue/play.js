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
            index: 0,
            userAnswer: 0,
            userAnswers: [],
            totalQuestions: 0,
            currentQuestionIndex: 1,
            showScoreScreen: false,
            score: [],
            correctUserAnswers: 0,
            user: ''
        }
    },
    mounted() {
        const vm = this;
        let url = new URL(window.location.href);
        let paramId = url.searchParams.get("id");
        if (!paramId) window.location.href = "quiz.html"
        //this.fetch("index.php?q=users", "get");
        //this.quizData = this.fetch("index.php?q=quiz", "get");
        web("index.php?q=quiz&id=" + paramId, "get").then((data) => vm.quizData = data).then(() => {
            vm.quizQuestion =  vm.quizData[0].questions[0]
            vm.totalQuestions = vm.quizData[0].questions.length
        });
        if (localStorage.getItem("user_id")) {
            web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get").then((response) => vm.user = response.users_list[0]);
        } else {
            window.location.href = "loginForm.html"
        }
        
    },
    methods: {
        next() {
            this.userAnswers.push(this.userAnswer);
            this.userAnswer = 0
            for (let i=0; i<this.$refs.choices.children.length; i++) {
                this.$refs.choices.children[i].classList.remove('selected');
            }
            this.currentQuestionIndex = this.currentQuestionIndex + 1
            this.quizQuestion = this.quizData[0].questions[this.currentQuestionIndex -1]
        },
        selectedChoice(event, index) {
            for (let i=0; i<this.$refs.choices.children.length; i++) {
                this.$refs.choices.children[i].classList.remove('selected');
            }
            this.userAnswer = index;
            event.target.classList.add('selected')   
        },
        goToScore() {
            if (this.userAnswers.length !== this.totalQuestions) {
                this.userAnswers.push(this.userAnswer);
                this.userAnswer = 0
                for (let i=0; i<this.$refs.choices.children.length; i++) {
                    this.$refs.choices.children[i].classList.remove('selected');
                }
            }
                this.showScoreScreen = true;
                let newScore;
                
                for( let i=0; i < this.quizData[0].questions.length; i++) {
                    if (this.quizData[0].questions[i].choices[this.userAnswers[i]].correct) {
                        this.correctUserAnswers = this.correctUserAnswers + 1
                        newScore = { question: i ,correct: true }
                    } else {
                        newScore = { question: i, correct: false }
                    }
                    this.score.push(newScore);
                }
            
            
        },
        goToHome() {
            window.location.href = "quiz.html"
        },
        resetQuiz() {
            this.showScoreScreen = false
            this.userAnswer = 0
            this.userAnswers = []
            this.correctUserAnswers = 0
            this.score = []
            this.currentQuestionIndex = 1
            this.quizQuestion = this.quizData[0].questions[0]
        }
    },
});
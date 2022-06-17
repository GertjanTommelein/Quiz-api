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
            quizData: false
        }
    },
    mounted() {
       web("index.php?q=quiz", "get").then((data) => this.quizData = data);
    }
});
import { web } from "./helpers/helpers.js";

new Vue({
    el: '#home',
    data() {
        return {
            user: false
        }
    },
    mounted() {
        const vm = this;
        if (localStorage.getItem("user_id")) {
            web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get").then((response) => vm.user = response.users_list[0]);
        }

    },
});
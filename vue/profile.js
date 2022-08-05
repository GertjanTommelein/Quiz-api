import { web } from "./helpers/helpers.js";

new Vue({
    el: '#profile-page',
    data() {
        return {
            user: false,
            image: false,
            data: false,
            key: 0
        }
    },
    mounted() {
        var vm = this;
        if (localStorage.getItem("user_id")) {
            web("index.php?q=users&id=" + localStorage.getItem("user_id"), "get")
            .then((response) => vm.user = response.users_list[0])
            .then(() => {
                if (this.user.avatar) {
                    console.log('LOGGING IN FETCH')
                    console.log(this.$refs.fileInput)
                   // this.$refs.fileInput.value = this.user.avatar
                }
            });
        }

    },
    methods: {
        saveImage(event) {
            const vm = this;
            console.log('logging even')
            console.log(event.target)
            console.log()
            const files = this.$refs.fileInput.files[0];
            console.log('LOGGING SAVEIMAGE')
            console.log(files)

            const formData = new FormData(); 
            console.log(event)
            console.log(files);
            formData.append('file', vm.$refs.fileInput.files[0]);
            formData.append('userId', localStorage.getItem("user_id"));
            this.fetch("http://localhost/Quiz/index.php?q=uploadAvatar", "post", formData).then((response) => vm.data = response);
            setTimeout(() => {
                vm.key++
            },100)
        },
        previewImage() {
            const vm = this
            const reader = new FileReader();
            const preview = this.$refs.preview;
            const images = document.querySelectorAll('body img');
            const navImg = document.createElement('img')
            if (images.length) images.forEach((image) => image.remove())
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add('img-fluid')
                img.style.width = "200px;"
                document.querySelector('.preview-box').appendChild(img);
                preview.style.maxWidth = '200px;'
                navImg.src = e.target.result
            }
            const files = this.$refs.fileInput.files[0]
            const navAvatar = vm.$refs.navigation.$refs.navAvatar
            const navImgContainer = this.$refs.navigation.$refs.navImgContainer
            navImg.classList.add('img-fluid')
            navImgContainer.appendChild(navImg)
                
            reader.readAsDataURL(files);
        },
        fetch(url, method, formData = false) {
            const vm = this;
            const baseUrl = "http://localhost/Quiz/";
          if (method == "get") {
                fetch(url)
                .then(response => response.json())
                .then(data => (console.log(data), vm.result = data))
            }
            if (method == "post") {
               return fetch(url, {
                method: 'POST', // or 'PUT'
                body: formData,
                })
                .then(response => (response.json()))
                .then(data => {
                console.log('Success:', vm.data = data);
                return data;
                })
                .catch((error) => {
                console.error('Error:', vm.data = error);
                });
            }
        },
    }
});

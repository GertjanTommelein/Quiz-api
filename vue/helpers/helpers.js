export function web (url, method, formData = false) {
    const baseUrl = "http://localhost/Quiz/";
    if (method == "get") {
        return fetch(baseUrl + url)
        .then(response => response.json())
        .then(data => data)
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    if (method == "post") {
        fetch(url, {
        method: 'POST', // or 'PUT'
        body: formData,
        })
        .then(response => (console.log(response), console.log(response.json())))
        .then(data => {
        console.log('Success:',data);
        return data;
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
}
export function test() {
    console.log("test func");
    return "testing this func";
}
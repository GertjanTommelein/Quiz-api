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
        return fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(formData)
        })
        .then(response =>  response.json())
        .then(data => (console.log('Success:' + data), data))
        .catch((error) => {
        console.error('Error:', error);
        });
    }
}
export function test() {
    console.log("test func");
    return "testing this func";
}
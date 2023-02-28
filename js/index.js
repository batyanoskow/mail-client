(() => {
    let message = document.querySelector(".wrapper__text");
    let file = document.querySelector(".file-input__input");
    let submitButton = document.querySelector(".wrapper__button");
    let serverAdress = "https://send-emails-server.onrender.com";
    let submitButtonDiv = document.querySelector(".wrapper__button div");
    submitButton.addEventListener("click", function (e) {
        (!file.value || !message.value) ? console.log("no") : sendMessage(message , file);
       async function sendMessage(mes , path){
        submitButtonDiv.classList.add("sending")
            const formData = new FormData()
            formData.append("file" , path.files[0]);
            try {
                await fetch(`${serverAdress}/api/sendemails`, {
                    method: 'POST',
                    headers : {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    },
                    body: formData
                }).then(response => {
                  console.log('Файл успішно завантажено на сервер');
                  submitButtonDiv.classList.remove("sending");
                  submitButtonDiv.classList.add("fa-check");
                  submitButtonDiv.innerHTML = "";
                  submitButtonDiv.classList.add("fa-solid");
                  

                  setTimeout(() => { submitButtonDiv.classList.remove("fa-check"); submitButtonDiv.classList.remove("fa-solid"); submitButtonDiv.innerHTML = "SEND"} ,3000)
                  
                })
                .catch(error => {
                  console.error('Помилка при завантаженні файлу на сервер:', error);
                });
            }catch(e){
                console.log(e)
            }
         
        }

 }
);

})();


  

  





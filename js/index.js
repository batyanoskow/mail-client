
(() => {
    let message = document.querySelector(".wrapper__text");
    let messageText = document.getElementById("text");
    let file = document.querySelector(".file-input__input");
    let submitButton = document.querySelector(".wrapper__button");
    let serverAdress = "https://send-emails-list.onrender.com";
    let submitButtonDiv = document.querySelector(".wrapper__button div");
    submitButton.addEventListener("click", function (e) {
        (!file.value || !messageText.innerText) ? console.log("no") : sendMessage(message , file);
        async function sendMessage(mes , path){
        submitButtonDiv.classList.add("sending")
            const formData = new FormData();
            formData.append('html', `<div>${message.innerHTML}</div>`);
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
  
    let textCss = () => {
        let buttons = document.querySelectorAll(".btn");
        for(let i= 0;i < buttons.length;i++){
            buttons[i].addEventListener("click", function (e) {
                let selection = window.getSelection();
                let prop = e.target.getAttribute("css");
                if(prop === "color"){
                    let newColor;
                    if (selection.toString() != "") {   
                             var range = selection.getRangeAt(0);
                             var span = document.createElement("span");
                             range.surroundContents(span);
                             e.target.oninput = (e)=>{
                               newColor = e.target.value;
                               span.style[prop]  = newColor;
                             }
                    }
                    else {
                        e.target.oninput = (e)=>{
                            newColor = e.target.value;
                            messageText.style[prop]  = newColor;
                          }
                    }
                }
                else
                {
                
                  messageText.style[prop] =  e.target.getAttribute("value")
                 
                }
            });
        }
    }
    textCss()
})();


  

  





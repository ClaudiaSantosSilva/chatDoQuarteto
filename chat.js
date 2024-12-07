// function identificarIdUsuario(){
//     const querystring = containerUsuario.search;
//     const params = new URLSearchParams(querystring);
//     let id = parseInt(params.get("id")); 
// }
// console.log(identificarIdUsuario())

const containerGChat = document.createElement("div");
containerGChat.setAttribute("id", "containerGChat");
let main =
  document.body.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
main.appendChild(containerGChat);

const containerDonoPagina = document.createElement("div")
containerDonoPagina.classList.add("containerDonoPagina")
containerGChat.appendChild(containerDonoPagina)

const containerMensagens = document.createElement("div")
containerMensagens.classList.add("containerMensagens")
containerGChat.appendChild(containerMensagens)

const containerCriarMsg = document.createElement("div")
containerCriarMsg.classList.add("containerCriarMsg")
containerGChat.appendChild(containerCriarMsg)

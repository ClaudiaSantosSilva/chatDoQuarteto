//CLASSES
class User {
  constructor(idUsuario, nomeUsuario, profilePictureURL) {
    this.id = idUsuario;
    this.name = nomeUsuario;
    this.profilePictureURL = profilePictureURL;
  }
  get nameInitial() {
    return this.name.charAt(0).toUpperCase();
  }

  generateURL() {
    return `chat.html?id=${this.id}`;
  }
}

class Message {
  constructor(content, authorId) {
    this.content = content;
    this.authorId = authorId;
    this.createdAt = new Date();
  }
}

//LOCAL STORAGE
function salvarNoLocalStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function obterDoLocalStorage(chave) {
  const valor = localStorage.getItem(chave);
  return valor ? JSON.parse(valor) : [];
}

//IDENTIFICAR ID DO USUARIO DONO DA PAGINA DO CHAT, CLICADO NA LISTA USUARIOS

function identificarIdUsuario() {
  let urlLimpa = window.location.search;
  let idUsuario = new URLSearchParams(urlLimpa);
  let id = idUsuario.get("id");
  return id;
}

function identificarUsuario() {
  let usuarios = obterDoLocalStorage("usuarios").map(
    (objeto) => new User(objeto.id, objeto.name, objeto.profilePictureURL)
  );
  let id = identificarIdUsuario();
  let usuario = usuarios.find((u) => u.id === id);
  if (usuario) {
    console.log(usuario);
    return usuario;
  } else {
    window.location.href = "index.html";
  }
}

const containerGChat = document.createElement("div");
containerGChat.setAttribute("id", "containerGChat");
let main =
  document.body.firstElementChild.nextElementSibling.nextElementSibling
    .nextElementSibling;
main.appendChild(containerGChat);

function definirDonoChat() {
  const containerDonoPagina = document.createElement("div");
  containerDonoPagina.classList.add("containerDonoPagina");
  let usuario = identificarUsuario();
  // containerDonoPagina.textContent = usuario.profilePictureURL + usuario.name;
  containerGChat.appendChild(containerDonoPagina);

  const containerUsuario = document.createElement("div");
  containerUsuario.setAttribute("id", "containerUsuario");
  containerDonoPagina.appendChild(containerUsuario);

  //console.log(usuario.generateURL());
  if (usuario.profilePictureURL) {
    const containerProfilePic = document.createElement("img");
    containerProfilePic.setAttribute("src", usuario.profilePictureURL);
    containerProfilePic.classList.add("profilePic");
    containerUsuario.appendChild(containerProfilePic);
  } else {
    const containerNameInitial = document.createElement("div");
    containerNameInitial.classList.add("firstCharName");
    containerNameInitial.innerHTML = usuario.nameInitial;
    containerUsuario.appendChild(containerNameInitial);
  }

  const containerNome = document.createElement("div");
  containerNome.setAttribute("id", "containerNome");
  let identificacaoUsuario = document.createElement("span");
  identificacaoUsuario.innerHTML = usuario.name;
  containerNome.appendChild(identificacaoUsuario);
  containerUsuario.appendChild(containerNome);
  //containerG.appendChild(containerUsuario);
}
definirDonoChat();

const containerMensagens = document.createElement("div");
containerMensagens.classList.add("containerMensagens");
containerGChat.appendChild(containerMensagens);

const containerCriarMsg = document.createElement("div");
containerCriarMsg.classList.add("containerCriarMsg");
containerGChat.appendChild(containerCriarMsg);

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

function obterIdDonoPagina() {
  let urlLimpa = window.location.search;
  let idUsuario = new URLSearchParams(urlLimpa);
  let id = idUsuario.get("id");
  return id;
}

function identificarUsuario() {
  //obtenho o usuario com base em seu id identificado acima
  let usuarios = obterDoLocalStorage("usuarios").map(
    (objeto) => new User(objeto.id, objeto.name, objeto.profilePictureURL)
  );
  let id = obterIdDonoPagina();
  let usuario = usuarios.find((u) => u.id === id);
  if (usuario) {
    //console.log(usuario);
    return usuario;
  } else {
    window.location.href = "index.html"; //se o usuario não existir, volta para a lista
  }
}

const containerGChat = document.createElement("div");
containerGChat.setAttribute("id", "containerGChat");
let main = document.getElementById("mainPaginaChat");
main.appendChild(containerGChat);

function mostrarDonoChat() {
  const containerDonoPagina = document.createElement("div");
  containerDonoPagina.classList.add("containerDonoPagina");
  let usuario = identificarUsuario();
  containerGChat.appendChild(containerDonoPagina);

  const containerUsuario = document.createElement("div");
  containerUsuario.setAttribute("id", "containerUsuario");
  containerDonoPagina.appendChild(containerUsuario);

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
mostrarDonoChat();

const containerMensagens = document.createElement("div"); //container para visualizar mensagens
containerMensagens.classList.add("containerMensagens");
containerGChat.appendChild(containerMensagens);

const containerCriarMsg = document.createElement("div"); //div do input
containerCriarMsg.classList.add("containerCriarMsg");
containerGChat.appendChild(containerCriarMsg);

const campoEscreverMsg = document.querySelector(".novaMensagem"); //input
containerCriarMsg.appendChild(campoEscreverMsg);

function capturarMensagem() {
  const novaMensagem = campoEscreverMsg.value;
  const mensagem = new Message(novaMensagem, obterIdDonoPagina());
  if (mensagem && mensagem.length !== 0) {
    const mensagens = obterDoLocalStorage("mensagens") || [];
    mensagens.push(mensagem);
    salvarNoLocalStorage("mensagens", mensagens);
  }
}

function mostrarMensagem() {
  const mensagens = obterDoLocalStorage("mensagens");
  let usuarios = obterDoLocalStorage("usuarios").map(
    (objeto) => new User(objeto.id, objeto.name, objeto.profilePictureURL)
  );

  containerMensagens.innerHTML = " ";

  mensagens.forEach((mensagem) => {
    let usuario = usuarios.find((u) => u.id === mensagem.authorId);

    const divUsuario = document.createElement("div"); // recebe tudo relacionado a cada usuario: foto, nome, msg e data.
    divUsuario.classList.add("divUsuario");

    const divDadosUsuario = document.createElement("div"); // div para foto e nome do usuario
    divDadosUsuario.classList.add("divDadosUsuario");

    if (usuario.profilePictureURL) {
      const containerProfilePic = document.createElement("img");
      containerProfilePic.setAttribute("src", usuario.profilePictureURL);
      containerProfilePic.classList.add("profilePic");
      divDadosUsuario.appendChild(containerProfilePic);
    } else {
      const containerNameInitial = document.createElement("div");
      containerNameInitial.classList.add("firstCharName");
      containerNameInitial.innerHTML = usuario.nameInitial;
      divDadosUsuario.appendChild(containerNameInitial);
    }

    let identificacaoUsuario = document.createElement("span");
    identificacaoUsuario.innerHTML = usuario.name;
    divDadosUsuario.appendChild(identificacaoUsuario);

    divUsuario.appendChild(divDadosUsuario); //divUsuario recebendo todos os dados do usuario

    const espacoMensagem = document.createElement("div"); //lugar da mensagem digitada na tela
    espacoMensagem.classList.add("espacoMensagem");
    espacoMensagem.textContent = mensagem.content;
    divUsuario.appendChild(espacoMensagem);

    const espacoData = document.createElement("div"); //lugar para a hora
    espacoData.classList.add("espacoData");
    espacoData.textContent = mensagem.createdAt;
    divUsuario.appendChild(espacoData);

    containerMensagens.appendChild(divUsuario);

    if (obterIdDonoPagina() !== mensagem.authorId) {
      divUsuario.classList.replace("divUsuario", "divOutroUsuario");
    }
    campoEscreverMsg.value = " ";
  });
}

window.addEventListener("storage", mostrarMensagem);
//mostrarMensagem();

function handleEnter(evento, callback) {
  if (evento.code === "Enter") {
    callback();
  }
}

campoEscreverMsg.addEventListener("keydown", (evento) => {
  handleEnter(evento, capturarMensagem);
  console.log(evento);
});

campoEscreverMsg.addEventListener("keydown", (evento) => {
  handleEnter(evento, mostrarMensagem);
});

mostrarMensagem();

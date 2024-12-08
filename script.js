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

//VERIFICAR OU CRIAR USUARIOS

function haUsuariosLocalStorage() {
  let usuarios = obterDoLocalStorage("usuarios").map(
    (objeto) => new User(objeto.id, objeto.name, objeto.profilePictureURL)
  );
  if (!usuarios.length) {
    let usuarios = [
      new User("1", "Claudia", undefined),
      new User("2", "Juliana", "images/juliana.jpg"),
      new User("3", "Pedro", "images/pedro.jpg"),
      new User("4", "Arthur", "images/arthur.jpg"),
      new User("5", "Richard", undefined),
    ];

    //console.log(usuarios);
    salvarNoLocalStorage("usuarios", usuarios);
  }
}
haUsuariosLocalStorage();

const containerG = document.createElement("div");
containerG.setAttribute("id", "containerG");
let main = document.getElementById("mainPaginaUsuarios");
  //document.body.firstElementChild.nextElementSibling.nextElementSibling;
main.appendChild(containerG);

let usuarios = obterDoLocalStorage("usuarios").map(
  (usuario) => new User(usuario.id, usuario.name, usuario.profilePictureURL)
);
function exibirListaPerfis() {
  usuarios.forEach((usuario) => {
    const containerUsuario = document.createElement("div");
    containerUsuario.addEventListener("click", () => {
      window.location.href = usuario.generateURL();
    });
    containerUsuario.setAttribute("id", "containerUsuario");

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
    containerG.appendChild(containerUsuario);
  });
}

exibirListaPerfis();

//CLASSES


//LOCAL STORAGE


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
main.appendChild(containerG);

let usuarios = obterDoLocalStorage("usuarios").map(
  (usuario) => new User(usuario.id, usuario.name, usuario.profilePictureURL)
);
function exibirListaPerfis() {
  usuarios.forEach((usuario) => {
    const containerUsuario = document.createElement("div");
    // containerUsuario.addEventListener("click", () => { //encaminha para pagina do usuario clicado
    //   window.location.href = usuario.generateURL();
    // });
    containerUsuario.onclick = ()=> {
      //encaminha para pagina do usuario clicado
      window.location.href = usuario.generateURL();
    };
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

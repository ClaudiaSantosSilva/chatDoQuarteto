//CLASSES
class User {
  constructor(idUsuario, nomeUsuario, profilePictureURL) {
    this.id = idUsuario;
    this.name = nomeUsuario;
    this.profilePictureURL = profilePictureURL;
  }
  get nameInitial() {
    if (profilePictureURL===" "){
        return this.name.charAt(0).toUpperCase()
    };
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
    (objeto) =>
      new User(
        objeto.id,
        objeto.name,
        objeto.profilePictureURL 
      )
  );
  if (!usuarios.length) {
    let usuarios = [
      new User("1", "Claudia", " "),
      new User("2", "Juliana", "images/juliana.jpg"),
      new User("3", "Pedro", "images/pedro.jpg"),
      new User("4", "Arthur", "images/arthur.jpg"),
      new User("5", "Richard", " "),
    ];

    console.log(usuarios);
    salvarNoLocalStorage("usuarios", usuarios);
  }
}
haUsuariosLocalStorage();

function exibirListaPerfis(){
    
}

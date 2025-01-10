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
  constructor(content, authorId, createdAt) {
    this.content = content;
    this.authorId = authorId;
    if (createdAt) {
      this.createdAt = createdAt;
    } else {
      this.createdAt = new Date();
    }
  }
}

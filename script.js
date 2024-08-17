const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("form button[type=submit]");
const iTitle = document.querySelector("#title");
const iAuthor = document.querySelector("#author");
const iPages = document.querySelector("#pages");
const cRead = document.querySelector("#read");
const bookshelf = document.querySelector("#bookshelf");

const addBookButton = document.querySelector("#add-book");
const closeButton = document.querySelector("form button[type=button]");

this.addEventListener("load", () => {
  generateFakeData();
  generateBook();
});

addBookButton.addEventListener("click", () => {
  resetInput();
  dialog.show();
});

closeButton.addEventListener("click", () => dialog.close());
submitButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
  const newBook = new Book(
    iTitle.value,
    iAuthor.value,
    iPages.value,
    cRead.checked
  );
  myLibrary.push(newBook);

  generateBook();
}

function generateBook() {
  bookshelf.textContent = "";

  myLibrary.map((book, index) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const read = document.createElement("div");
    const buttons = document.createElement("div");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? "Already Read" : "Not read yet";

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read);

    buttons.classList.add("buttons");
    const toggleRead = document.createElement("button");
    const deleteBook = document.createElement("button");

    toggleRead.textContent = book.read ? "Not read yet?" : "Mark as read";
    deleteBook.innerHTML = '<i class="ti ti-trash"></i> Delete';

    toggleRead.addEventListener("click", () => {
      book.toggleRead();
      generateBook();
    });
    deleteBook.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      div.remove();
    });

    buttons.appendChild(toggleRead);
    buttons.appendChild(deleteBook);

    div.appendChild(buttons);

    bookshelf.appendChild(div);
  });
}

function generateFakeData() {
  myLibrary.push(new Book("Goblin", "J.K. Russel", 298, true));
  myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 208, true));
  myLibrary.push(
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false)
  );
  myLibrary.push(new Book("1984", "George Orwell", 328, true));
  myLibrary.push(new Book("Brave New World", "Aldous Huxley", 268, false));
  myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, true));
}

function resetInput() {
  iTitle.value = "";
  iAuthor.value = "";
  iPages.value = "";
  cRead.checked = false;
}

import { Book, library } from "./objects";

//create a library app with buttons that allow you to
//add new books to the "library" array then call upon them

//call DOM

function createElement(type, textContent, className, id) {
  const div = document.createElement(type);
  if (type !== "input") {
    div.textContent = textContent;
  } else {
    div.value = textContent;
  }
  div.className = className;
  div.id = id;
  return div;
}

const declared = (function () {
  const addNewBookButton = document.querySelector("add-new-book-button");
  const buttonsContainer = document.querySelector(".button-container");
  const bookDisplayContainer = document.querySelector(".middle");

  //default books
  const book = new Book(
    "Harry Potter and The Chamber of Secrets",
    "J.K. Rolling",
    251,
  );
  const book2 = new Book(
    "Harry Potter and The Goblet of Fire",
    "J.K. Rolling",
    636,
  );
  const book3 = new Book("Cast-fire", "Some Author?", 400);

  library.push(book);
  library.push(book2);
  library.push(book3);

  return {
    library,
    addNewBookButton,
    buttonsContainer,
    bookDisplayContainer,
  };
})();

// We want to have the user click a button on the webpage
//and add a new empty book
//a title, author, and the number of pages,
//then that info will be saved as an object, then
//that object will be added to the library array.

function clickEvents() {
  declared.buttonsContainer.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("add-new-book-button")) {
      // create new book objects and push to library array

      //empty book
      const newBook = new Book("Book Title", "Book Author", 0);
      declared.library.push(newBook);

      updateBookDisplay();
      // Create new div and then new rows inside div item

      //turn variables into new book objects
      console.log(declared.library);
    }
  });
}

const removeBook = (title) => {
  declared.library = declared.library.filter((book) => book.title !== title);
  updateBookDisplay();
};

// A function to update the display based on the library array
// By creating divs, cells and buttons dynamically
function updateBookDisplay() {
  viewBooks();
}

clickEvents();
updateBookDisplay();

function viewBooks() {
  declared.bookDisplayContainer.textContent = "";
  declared.library.forEach((book, index) => {
    const newDiv = createElement("div", "", "book-container", `Id${index}`);
    const buttonDiv = createElement("div", "", "buttons-container");

    const bookTitle = createElement("div", book.title, "bookTexts");
    const bookAuthor = createElement("div", book.author, "bookTexts");
    const bookPages = createElement("div", book.pages, "bookTexts");

    const titleText = createElement("div", "TITLE", "textTop");
    const authorText = createElement("div", "AUTHOR", "textTop");
    const pagesText = createElement("div", "PAGES", "textTop");

    const deleteButton = createElement("button", "Delete Book", "deleteButton");
    const toggleButton = createElement("button", "Wasn't Read", "toggleButton");
    const editButton = createElement(
      "button",
      "Edit Book",
      "editButton",
      `${index}`,
    );

    deleteButton.addEventListener("click", () => {
      removeBook(book.title);
    });

    editButton.addEventListener("click", () => {
      editBook(editButton.id);
    });

    buttonDiv.appendChild(toggleButton);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    newDiv.appendChild(titleText);
    newDiv.appendChild(bookTitle);
    newDiv.appendChild(authorText);
    newDiv.appendChild(bookAuthor);
    newDiv.appendChild(pagesText);
    newDiv.appendChild(bookPages);
    newDiv.appendChild(buttonDiv);
    declared.bookDisplayContainer.appendChild(newDiv);
  });
}

function editBook(index) {
  const bookContainer = document.getElementById(`Id${index}`);
  bookContainer.innerHTML = "";

  const editTemplate = document.getElementById("edit-template");
  const template = editTemplate.content.cloneNode(true);

  const title = template.getElementById("title");
  const author = template.getElementById("author");
  const pages = template.getElementById("pages");
  const saveButton = template.getElementById("save-button");

  title.value = library[index].title;
  author.value = library[index].author;
  pages.value = library[index].pages;

  saveButton.addEventListener("click", () => {
    if (!title.checkValidity()) {
      alert("Title field cannot be blank.");
      return;
    } else if (!author.checkValidity()) {
      alert("Author field cannot be blank.");
      return;
    } else if (!pages.checkValidity()) {
      alert("Pages field cannot be blank.");
      return;
    } else {
      library[index].title = title.value;
      library[index].author = author.value;
      library[index].pages = pages.value;
      updateBookDisplay();
    }
  });

  bookContainer.appendChild(template);

  console.log(bookContainer);
}

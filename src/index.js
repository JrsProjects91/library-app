//create a library app with buttons that allow you to
//add new books to the "library" array then call upon them 

//call DOM

//create a book constructor function 
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

const declared = (function() {

    const bookButton = document.querySelector("button");
    const buttonsContainer = document.querySelector(".button-container");
    const bookDisplayContainer = document.querySelector(".middle");
    //create the empty library array
    let library = [];

    //default books
    const book = new Book("Harry Potter and The Chamber of Secrets", "J.K. Rolling", 345)
    const book2 = new Book("Harry Potter and The Goblet of Fire", "J.K. Rolling", 345)
    const book3 = new Book("Castfire", "Jim Reagis", 400)

    library.push(book);
    library.push(book2);
    library.push(book3);

    return {
        library,
        bookButton,
        buttonsContainer,
        bookDisplayContainer,
    }
})();




// We want to have the user click a button on the webpage
//and open up a promp that will ask the user for
//a title, author, and the number of pages,
//then that info will be saved as an object, then
//that object will be added to the library array.

function clickEvents() {
    declared.buttonsContainer.addEventListener("mousedown", function(e) {
        if (e.target.classList.contains("bookButton")) {
            // Save user inputs to temp variables
            let title = prompt("What is the book's title?");
            let author = prompt("Who is the author?");
            let pages = prompt("How many pages does the book contain?");

            // create new book objects and push to library array
            const book = new Book(title, author, pages);
            declared.library.push(book);

            updateBookDisplay();
            // Create new div and then new rows inside div item

            //turn variables into new book objects
            console.log(declared.library);
    
        }
    })
}

const removeBook = (title) => {
    declared.library = declared.library.filter(book => book.title !== title);
    updateBookDisplay();
}

// A function to update the display based on the library array
// By creating divs, cells and buttons dynamically
function updateBookDisplay() {
    declared.bookDisplayContainer.textContent = "";
    declared.library.forEach(book => {
        const newDiv = document.createElement("div");
        const buttonDiv = document.createElement("div");

        newDiv.classList.add("bookclass");
        const titleFlex = document.createElement("div");
        const authorFlex = document.createElement("div");
        const pagesFlex = document.createElement("div");

        const titleFlexTop = document.createElement("div");
        const authorFlexTop = document.createElement("div");
        const pagesFlexTop = document.createElement("div");
        titleFlexTop.innerHTML = "TITLE";
        authorFlexTop.innerHTML = "AUTHOR";
        pagesFlexTop.innerHTML = "PAGES";
        let deleteButton = document.createElement("button");
        let toggleButton = document.createElement("button");
        toggleButton.innerHTML = "Was Book Read";
        deleteButton.innerHTML = "Delete Book";
        deleteButton.classList.add("deleteButton");
        toggleButton.classList.add("toggleButton")
        titleFlexTop.classList.add("textTop");
        authorFlexTop.classList.add("textTop");
        pagesFlexTop.classList.add("textTop");
        titleFlex.classList.add("bookTexts");
        authorFlex.classList.add("bookTexts");
        pagesFlex.classList.add("bookTexts");
        titleFlex.innerHTML = book.title;
        authorFlex.innerHTML = book.author;
        pagesFlex.innerHTML = book.pages;
        deleteButton.addEventListener('click', () => {
            removeBook(book.title);
        })
        buttonDiv.classList.add("buttonDiv");
        buttonDiv.appendChild(toggleButton);
        buttonDiv.appendChild(deleteButton);
        newDiv.appendChild(titleFlexTop);
        newDiv.appendChild(titleFlex);
        newDiv.appendChild(authorFlexTop);
        newDiv.appendChild(authorFlex);
        newDiv.appendChild(pagesFlexTop);
        newDiv.appendChild(pagesFlex);
        newDiv.appendChild(buttonDiv);
        declared.bookDisplayContainer.appendChild(newDiv);

    });
}

clickEvents();
updateBookDisplay();

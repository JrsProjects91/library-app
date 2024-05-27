//create empty library array
export let library = [];

//create a book constructor function
export function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

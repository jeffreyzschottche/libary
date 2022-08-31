let addBookButton = document.querySelector('#addNewBook');
let bookGrid = document.querySelector('.books');

class newBooks {
    constructor(author, title, pages, url, readBool) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.url = url;
      this.readBool = readBool;
    }
    hasRead(){
        if (document.querySelector('select[name="readit"]').value === 'Yes') {
            return true;
        } else {
            return false;
        }
    }
  }
  
  // Usage:
  let newBook = new newBooks("A hitchhickers guide to the galaxy","Douglas Adams",224,"https://media.s-bol.com/NO9wjnv9Z09p/550x832.jpg", true);
  console.log(newBook);


  // dummy book
let bookArray = [
    // {
    //     newBook.title,
    //     author: "Douglas Adams",
    //     pages: 224,
    //     url: "https://media.s-bol.com/NO9wjnv9Z09p/550x832.jpg",
    //     readBool: true,
    // }
    newBook
];

if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(bookArray));
}

// // constructor maken voor een boek
// // pushen naar array als object
// function Book(title, author, pages, ) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
// }

// // prototype voor read value boolean
// Book.prototype.hasRead = function () {
//     if (document.querySelector('select[name="readit"]').value === 'Yes') {
//         return true;
//     } else {
//         return false;
//     }
// }

addBookButton.addEventListener('click', () => {
    // get input values
    let bookTitle = document.querySelector('input[name="booktitle"]');
    let bookAuthor = document.querySelector('input[name="author"]');
    let bookPages = document.querySelector('input[name="pages"]');
    let bookURL = document.querySelector('input[name="imageURL"]');

    if (bookTitle.value < 1 || bookAuthor.value < 1 || bookPages.value < 1) {
        alert('please fill in information about the book');
        return;
    } else {
        // check if book has been read and if their added a URL 
        const book = new newBooks(bookTitle.value, bookAuthor.value, bookPages.value);
        if (bookURL.value.length > 0) {
            book.url = bookURL.value;
        }
        if (book.hasRead() == true) {
            book.readBool = true;
        } else {
            book.readBool = false;
        }

        // bookArray.push(book);

        // get & set localstorage bookArr
        // check if localStoragee is already there, otherwise create it.
        // if(localStorage.getItem('books'))
        let localBooks = JSON.parse(localStorage.getItem('books'));
        localBooks.push(book);
        localStorage.setItem('books', JSON.stringify(localBooks));




        // hide modal after submit
        let modal = document.querySelector('#addBookModal');
        modal.style.display = 'none';
        let modal2 = document.querySelector('.modal-backdrop');
        modal2.style.display = 'none';

        // call function to load all books
        renderBooks();
        window.location.reload();
    }
})





function renderBooks() {
    // GET array and empty bookgrid so books arent doubles
    let localBooks = JSON.parse(localStorage.getItem('books'));
    bookGrid.innerHTML = '';


    localBooks.forEach(book => {

        // create div element
        let divBook = document.createElement('div');
        divBook.classList.add('bookParent');
        let titleBook = document.createElement('h1');
        let authorBook = document.createElement('h2');
        let pagesBook = document.createElement('p');
        let imgBook = document.createElement('img');
        let readBook = document.createElement('select');
        let deleteBook = document.createElement('button');
        deleteBook.classList.add('btn');
        deleteBook.classList.add('btn-danger');
        deleteBook.onclick = deleteBookFromLS;
        deleteBook.innerHTML = 'Delete Book';
        let readBookOption = document.createElement('option');
        let readBookOption2 = document.createElement('option');
        readBookOption.text = 'Read the book';
        readBookOption2.text = 'Did not read the book';

        titleBook.textContent = book.title;
        authorBook.textContent = book.author;
        pagesBook.textContent = `Pages : ${book.pages}`;

        // make book value read or not read
        if (book.readBool == true) {
            readBook.add(readBookOption);
            readBook.add(readBookOption2);
        } else {
            readBook.add(readBookOption2);
            readBook.add(readBookOption);
        }

        // check if book starts with https:// oor with www.
        let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(book.url)) {
            // if not dummy book
            imgBook.src = 'http://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png';
        } else {
            imgBook.src = book.url;
        }

        divBook.append(titleBook, authorBook, imgBook, pagesBook, readBook, deleteBook);
        bookGrid.append(divBook);

    });
}


function deleteBookFromLS() {
    // get title from book trough button
    let parentBook = this.parentNode.querySelector("h1").innerHTML;

    // search ls array for parentBook, delete from array, place array back, reload page.
    let localBooks = JSON.parse(localStorage.getItem('books'));

    // find index of book in array
    const indexOfObject = localBooks.findIndex(book => {
        return book.title === parentBook;
    });

    // delete from array and set ls back
    localBooks.splice(indexOfObject, 1);
    localStorage.setItem('books', JSON.stringify(localBooks));

    // reload window to show ls
    window.location.reload();
}
let addBookButton = document.querySelector('#addNewBook');

let bookArray = [
    {
        title: "A hitchhickers guide to the galaxy",
        author: "Douglas Adams",
        pages: 224,
        url: "https://media.s-bol.com/NO9wjnv9Z09p/550x832.jpg",
        readBool: true,
    }
];



// constructor maken voor een boek
// pushen naar array als object
function Book(title, author, pages,){
   this.title = title;
   this.author = author;
   this.pages = pages;
}

// prototype voor read value boolean
Book.prototype.hasRead = function(){
    if(document.querySelector('select[name="readit"]').value === 'Yes'){
        return true;
    }else{
        return false;
    }
}



addBookButton.addEventListener('click', () => {
    let bookTitle = document.querySelector('input[name="booktitle"]');
    let bookAuthor = document.querySelector('input[name="author"]');
    let bookPages = document.querySelector('input[name="pages"]');
    let bookURL = document.querySelector('input[name="imageURL"]');
    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
    if(bookURL.value.length > 0){
        book.url = bookURL.value;
    }
    if(book.hasRead() == true){
        book.readBool = true;
    }else{
        book.readBool = false;
    }
    // console.log(book);
    bookArray.push(book);
    // console.log(bookArray);
    renderBooks();
    let modal = document.querySelector('#addBookModal');
    modal.style.display = 'none';
})




// op pagina laden boeken renderen in grid
// bij nieuw toegevoegde ook renderen / sturen naar grid

function renderBooks(){
    bookArray.forEach((book) => {
        alert(book.title);
    })
}
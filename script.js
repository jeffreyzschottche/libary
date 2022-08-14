let addBookButton = document.querySelector('#addNewBook');

addBookButton.addEventListener('click', () => {
    alert('hi');
    let author = document.querySelector('input[name="booktitle"]');
    alert(author.value);
})
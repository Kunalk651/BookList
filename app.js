// Book Class: Reprsents Books
class book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: Handle UI Tasks
class UI{
    static displayBook(){
        const books = Store.getBook();

        books.forEach(book =>UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        // Vanish Alert
        setTimeout(()=>document.querySelector('.alert').remove(),2000);
    }

    static deleteBook(te){
        if(te.classList.contains('delete')){
            te.parentElement.parentElement.remove();
        }
    }
}

//Storage Class:Handles Storage
class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))

    }
    static removeBook(isbn){
        const books = Store.getBook();
        console.log(books);
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event:Display Books
document.addEventListener('DOMContentLoaded',UI.displayBook);

//Event:Add Books
document.querySelector('#book-form').addEventListener('submit', e =>{
    // Prevent Actual submit
e.preventDefault();  
    // Get Form Value
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;

//Validation 
if(title === '' && author === '' && isbn === ''){
   UI.showAlert('Please Fill In The All Fields!','danger')
}else{
    
// Instantiate book
const books = new book(title,author,isbn);

// add book to UI
UI.addBookToList(books);

//add book to storage
Store.addBook(books);

// show success message
UI.showAlert('Book Added!','success')

// clear fields
document.getElementById('book-form').reset();
}

});

//Event:Delete Books
document.querySelector('#book-list').addEventListener('click',e =>
{
    // Remove books from UI
    UI.deleteBook(e.target);
    // Remove books from Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show success massege
    UI.showAlert('Book Deleted!','warning')

});

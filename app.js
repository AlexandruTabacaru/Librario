let myLibrary = [];
const table=document.querySelector('.book-table-list');
const totalBooks=document.querySelector('.header-counter-total');
var form=document.querySelector('.book-adder-form');
const addBook=document.querySelector('#submit')
const isItRead=document.querySelector('#readStatus');
const clearAll=document.getElementById('totalRemover');
const totalUnreadBooks=document.querySelector('.header-counter-unread');
const totalReadBooks=document.querySelector('.header-counter-read');

totalUnreadBooks.innerText=`BOOKS UNREAD: 0`;
totalReadBooks.innerText=`BOOKS READ: 0`;
var libraryIndex=0;

function Book(title, author, pages, readStatus, summary){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStatus=readStatus;
    this.summary=summary;
    myLibrary.push(this);
    this.index=libraryIndex; 
    createBook(this);     
    libraryIndex++;
}

console.log(libraryIndex);
totalBooks.innerText=`TOTAL: ${myLibrary.length}`;

form.addEventListener('submit', function(e){    
 
    let book=new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, form.elements[3].checked, form.elements[4].value);
   // console.log(myLibrary);
    totalBooks.innerText=`TOTAL: ${myLibrary.length}`;
    display(book);
    //WE DISABLE PREVENT DEFAULT IN ORDER SO THAT THE PAGE GETS RELOADED, SUCH THAT THE BOOKS GAIN AN INDEX IN THE ARRAY IN CASE THEY ARE REMOVED
    //e.preventDefault();
    form.reset();
})



function display(book){
  
    //actual display using DOM methods 
    //console.log(book);
    var bookRow=document.createElement('tr');
    var title = document.createElement('td');
    var author= document.createElement('td');
    var pages=document.createElement('td');
    var readStatus=document.createElement('td');
    var summary=document.createElement('td');
    var readBtn=document.createElement('button');
    deleteBtn=document.createElement('button');
    deleteBtn.innerText="remove";
    deleteBtn.setAttribute('data-index',book.index)
    if (!book.readStatus || book.readStatus=="not read") {readBtn.innerText="not read";
    }else readBtn.innerText="read";

    readStatus.appendChild(readBtn);
    pages.innerText=book.pages;
    title.innerText=book.title;
    author.innerText=book.author;
    summary.innerText=book.summary;
    bookRow.appendChild(title);
    bookRow.appendChild(author);
    bookRow.appendChild(pages);
    bookRow.appendChild(readStatus);
    bookRow.appendChild(summary);
    bookRow.appendChild(deleteBtn);
    table.appendChild(bookRow);

    //delete a book in the DOM, but also remove it from the array so it's stored correctly

    deleteBtn.addEventListener('click', function(e){
        table.removeChild(e.target.parentElement);
        console.log(this);
        if(myLibrary.length==1){myLibrary=[];}
        console.log(myLibrary.indexOf(book))
        if(myLibrary.indexOf(book)!=-1) myLibrary.splice(myLibrary.indexOf(book),1)
        console.log(myLibrary);
        localStorage.setItem('totalBooks',JSON.stringify(myLibrary.length));
        localStorage.setItem('mylibrary', JSON.stringify(myLibrary));
        totalBooks.innerText=`TOTAL: ${myLibrary.length}`;
    })

    // change a book's status
    readBtn.addEventListener('click', function(){
        //console.log(readBtn.innerText);
        console.log(book.readStatus);
        if(readBtn.innerText==="read") {readBtn.innerText="not read";
        book.readStatus="not read";}
        else if (readBtn.innerText==="not read") {readBtn.innerText="read";
        book.readStatus="read";}
        localStorage.setItem('mylibrary', JSON.stringify(myLibrary));
    })
    

}

clearAll.addEventListener('click', function(){
    table.innerHTML=`
    <tr>
            <th>Title</th>
            <th>Author</th> 
            <th>Pages</th>
            <th>Status</th>
            <th>Summary</th>
            <th id="remove">Remove</th>
     </tr>`;
    myLibrary=[];
    localStorage.setItem('totalBooks',JSON.stringify(myLibrary.length));
    totalBooks.innerText=`TOTAL: 0`;
    localStorage.setItem('mylibrary', JSON.stringify(myLibrary))
    
})

//why
console.log(Book.prototype);
   
//storing part
function getBooks(){
    if(localStorage.getItem('mylibrary') === null){
        myLibrary=[];
    }else{
        myLibrary= JSON.parse(localStorage.getItem('mylibrary'));
    }
    totalBooks.innerText=`TOTAL: ${JSON.parse(localStorage.getItem('totalBooks'))}`
    return myLibrary;
}


function createBook(book) {
    const myLibrary=getBooks();
    myLibrary.push(book);
    localStorage.setItem('mylibrary', JSON.stringify(myLibrary))
    localStorage.setItem('totalBooks',JSON.stringify(myLibrary.length));
}

window.addEventListener('DOMContentLoaded', function(){
    getBooks();
    myLibrary.forEach(display);
});


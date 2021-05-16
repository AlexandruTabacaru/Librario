let myLibrary = [];
const table=document.querySelector('.book-table-list');
const totalBooks=document.querySelector('.header-counter-total');
var form=document.querySelector('.book-adder-form');
const addBook=document.querySelector('#submit')
const isItRead=document.querySelector('#readStatus');


function Book(title, author, pages, readStatus, summary){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStatus=readStatus;
    this.summary=summary;
    myLibrary.push(this);
      
    //DISPLAYING A BOOK IN THE TABLE
    
    {
            var bookRow=document.createElement('tr');
            var title = document.createElement('td');
            var author= document.createElement('td');
            var pages=document.createElement('td');
            var readStatus=document.createElement('td');
            var summary=document.createElement('td');
            var readBtn=document.createElement('button');
            var deleteBtn=document.createElement('button');
            deleteBtn.innerText="remove";
        
            if (!this.readStatus || this.readStatus=="not read") {readBtn.innerText="not read";
            }else readBtn.innerText="read";

            readStatus.appendChild(readBtn);
            pages.innerText=this.pages;
            title.innerText=this.title;
            author.innerText=this.author;
            summary.innerText=this.summary;
            bookRow.appendChild(title);
            bookRow.appendChild(author);
            bookRow.appendChild(pages);
            bookRow.appendChild(readStatus);
            bookRow.appendChild(summary);
            bookRow.appendChild(deleteBtn);
            table.appendChild(bookRow);
            deleteBtn.addEventListener('click', function(e){
                table.removeChild(e.target.parentElement);
            })
    }

    readBtn.addEventListener('click', function(){
        console.log(readBtn.innerText);
        if(readBtn.innerText==="read") readBtn.innerText="not read";
        else if (readBtn.innerText==="not read") {readBtn.innerText="read";}
    })
}

form.addEventListener('submit', function(e){    
 
        book=new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, form.elements[3].checked, form.elements[4].value);
       // console.log(myLibrary);
        
        e.preventDefault();
        
     })
totalBooks.innerText+=myLibrary.length;



const hobbit=new Book('hobbit', 'idk', 140, 'not read');
const richDad=new Book('richDad', 'Robert Kyiosaki', 270, 'read', 'a great book about finance');
const harryPotter=new Book('harry potter', 'JK ROWLING', 9999, 'not read', 'magic stuff');


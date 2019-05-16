/******************************************
Treehouse FSJS Techdegree:
Heinz Araque
05/15/2019
project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

document.addEventListener('DOMContentLoaded', () => {

   // Create Global Variable that holds the Li items and how many items per page.
   const studentItems = document.querySelectorAll('.student-list li');
   const itemsPerPage = 10;

   
   /*
     CREATE THE SEARCH ELEMENT & FUNCTIONALITY
   */

   // Select where the element is going to be inserted.
   const pageHeader = document.querySelector('.page-header');

   // Create the div element.
   const searchDiv = document.createElement('div');
   // Give it its proper class.
   searchDiv.className = 'student-search';

   // Create the input element.
   const searchInput = document.createElement('input');
   // Create the button element.
   const searchButton = document.createElement('button');

   // Add placeholder to the input element.
   searchInput.placeholder = 'Search for students...'
   //  Add text content to the button element.
   searchButton.textContent = 'Search';

   // Append both elements into the newly created searchDiv.
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);

   // Insert into the DOM before the reference (first child of pageHeader).
   pageHeader.appendChild( searchDiv );

   // Create a keyup & click event listeners
   searchInput.addEventListener('keyup', ()=> {
      search(studentItems, searchInput.value.toLowerCase());
   });
   searchButton.addEventListener('click', ()=> {
      search(studentItems, searchInput.value.toLowerCase());
   });

   // Create a function that will filter through names
   function search(list, text) {
      // Select where are we going to be placing the students.
      const page = document.querySelector('.page');
      // Select the names of all the students.
      const studentNames = document.querySelectorAll('.student-details h3');
      // Select the pagination.
      const pagination = document.querySelector('.pagination');
      // Create an empty array to hold the found students.
      const foundStudents = [];
      
     
      
      // Create a for loop to compare the passed input value to each name using indexOf
      for(let i = 0; i < studentNames.length; i++){
         // Hold the first index at which a given element can be found.
         const student = studentNames[i].textContent.indexOf(text);

         // If search left empty restart program and break!
         if(text === ""){
            page.removeChild(pagination);
            showPage(list, 1);
            appendPageLinks(list);
            break;
         }

         // If index not equal to -1 one exists.
         if(student >= 0){
            list[i].style.display = 'block';
            foundStudents.push(list[i]);
         }
         // else index = -1 it does hide
         else if(student < 0){
            list[i].style.display = 'none';
         }
      }
      
      // Show the student results in multiples of itemsPerPage(which is 10).
      showPage(foundStudents, 1);
      
      // If pagination exists, remove it and add updated one.
      if(pagination.parentNode){
         page.removeChild(pagination);
         appendPageLinks(foundStudents);
      }

      // Locate the repeated span and delete it.
      const preSpan = document.querySelector('.noResults');
      if(preSpan){
         page.removeChild(preSpan);
      }

      // If no search results display "No Results" message. 
      if(foundStudents.length === 0 && text != ""){
         const span =  document.createElement('span');
         span.textContent = "No Results";
         span.className = "noResults";
         // Select the pagination.
         const pagination = document.querySelector('.pagination');
         page.insertBefore(span, pagination);
      }
   }  


   /*
     DONE
   */

   // Function to display 10 students based on the index number passed to the function.
  function showPage(list, page){
      // Store the index where we begin the display of students.
      const startIndex = (page * itemsPerPage) - itemsPerPage;
      // Store the index where the display ends.
      const endIndex = page * itemsPerPage;

      // Create a for loop to hide all the students at first.
      for(let i = 0; i < list.length; i++){
         list[i].style.display = 'none'
      }

      // For loop to display the students based on the page we currently are (page 2 show from 10 to 20).
      for(let i = startIndex; i >= startIndex && i < endIndex; i++){
         //  If the list of students ends before reaching the end of the for loop, break it!
         if(!list[i]) {
            break;
         }
         // Change the display property so they become visible again.
         list[i].style.display = 'block';
      }     
   }
  
   function appendPageLinks(list) {
      // Store and round up the amount of pages we are going to be needing to paginate all the student in multiples of 10.
      const numberOfPages = Math.ceil(list.length / itemsPerPage);
      // Select where are we going to be placing the students.
      const page = document.querySelector('.page');

      // Create the div element where our pagination numbers are going to live.
      const div = document.createElement('div');
      // Assign the class of pagination to the div.
      div.className = "pagination";

      // Create the ul element where all the li are going to be.
      const ul = document.createElement('ul');   

      // For loop to create each li individually.
      for(let i = 1; i <= numberOfPages; i++){
         // Create the li & a elements.
         const li = document.createElement('li');
         const a = document.createElement('a');

         // add the href property of # and text content of the value of i (could be 1, 2 ,3 etc);
         a.href = "#";
         a.textContent = i;

         // Set the first a element class to active by default.
         if(i === 1){
            a.className = 'active';
         }

         // Add click event listeners to each individual a.
         a.addEventListener('click', (e) => {
            // Prevent from reloading the page every time an action takes place.
            e.preventDefault();
            
            // Select all the a in the ul
            const a = document.querySelectorAll('.pagination ul li a');
            // For loop to change every a element's class to empty string.
            for(let r = 0; r < a.length; r++){
               a[r].classList.remove('active');
            }

            // Setting the clicked a class to active.
            a[i-1].classList.add('active');
            // Run the show page function to display the students based on the i number we passed.
            showPage(list, i)
         });

         // Append all together.
         li.appendChild(a);
         ul.appendChild(li);
      }  
      
      div.appendChild(ul);
      page.appendChild(div);

   }
   
   showPage(studentItems, 1);
   appendPageLinks(studentItems);

});

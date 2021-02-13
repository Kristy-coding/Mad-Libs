


// when the user clicks a template button, the title of the button is captured and a story is created in the data base
// and the user is routed to /dashboar/id where this is a sinlge story (title) and a number of word posts being made to that story
// fetch POST request 
// const title = button title 

// const unicorn_title = document.getElementById('first-template').value
// console.log(unicorn_title)

// const coding_template_title = document.getElementById('coding-template-button').value
// console.log(coding_template_title)

//let title = document.querySelector('button').value
  // to make a request to the database to post this new blog we need to supply the title, blog_text, and the user_id ... the user id will be grabbed from the session which we already told this api route to do 

function createStoryHandler(event) {
    event.preventDefault();

    title = event.target.value

    // if (unicorn_title){
    //     title = unicorn_title
    // } 
//    if(coding_template_title){
//         title = coding_template_title
//     }

   console.log(title)
//   const title = document.getElementById('first-template').value

//   const coding_template_title = document.getElementById('coding-template-button').value
//     // to make a request to the database to post this new blog we need to supply the title, blog_text, and the user_id ... the user id will be grabbed from the session which we already told this api route to do 
    
//    console.log(title)
  
   fetch("/api/story", { 
      
    // Adding method type 
    method: "POST", 
      
    // Adding body or contents to send 
    body: JSON.stringify({ 
        title: title 
    }), 
      
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
}) 
  
        // Converting to JSON 
        .then(response => response.json()) 
        
        // Displaying results to console 
        .then(dbStoryData => {
            
            var id = dbStoryData.id 
            //console.log(dbStoryData.id)
            document.location.replace(`/dashboard/story/${JSON.stringify(id)}`)

            //${JSON.stringify(dbStoryData.id)}
        
        
        }); 
      
}


document.querySelector('.choose-template-list').addEventListener('click', createStoryHandler);

// document.getElementById('coding-template-button').addEventListener('click', createStoryHandler);

// document.getElementById('first-template').addEventListener('click', createStoryHandler);



 

 


  
  


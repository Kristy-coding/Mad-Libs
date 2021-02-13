
let buttons = document.querySelector('.delete-story-btn')
 const id = document.querySelectorAll('button').value
 console.log(id)

async function deleteStoryHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard')
//     // grabbing the id form the url 
   
    
//       const response = await fetch(`/api/story/${id}`, {
//         method: 'DELETE'
//       });
    
//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert(response.statusText);
//       }
  
  }
  
  document.querySelectorAll('button').addEventListener('click', deleteStoryHandler);
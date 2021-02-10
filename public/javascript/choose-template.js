


// when the user clicks a template button, the title of the button is captured and a story is created in the data base
// and the user is routed to /dashboar/id where this is a sinlge story (title) and a number of word posts being made to that story
// fetch POST request 
// const title = button title  




async function createStoryHandler(event) {
    event.preventDefault();


  const title = document.getElementById('first-template').value
    // to make a request to the database to post this new blog we need to supply the title, blog_text, and the user_id ... the user id will be grabbed from the session which we already told this api route to do 
    
   console.log(title)
  

    ////On form submission, this will grab the story titlefrom the button click and send them with a POST request to /api/posts.... /api/posts endpoint requires a third property: user ID can be obtained from the session

    const response = await fetch(`/api/story`, {

      method: 'POST',
      body: JSON.stringify({
        title
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
        // if the response from the database is good then we are redirected to the dashboard where we can see our new post was created/ added to the database and displayed on the dashboard 
        //console.log(response)
        
      //document.location.replace(`/dashboard/story/id`);
      

    } else {
      alert(response.statusText);
    }
   
}

// function getStoryId() {
//     router.get('/dashboard/story/id', (req, res) => {
//         //console.log(req.session)
        
//         Story.findAll({
//             where: {
//                 title: title
//             },
//             include: [
//               {
//                 model: Word,
//                 include: {
//                   model: User,
//                   attributes: ['username']
//                 }
//               },
//               {
//                 model: User,
//                 attributes: ['username']
//               }
//             ]
//           })
//             .then(dbStoryData => {
//                 console.log(dbStoryData)
           
//             // const posts = dbPostData.map(post => post.get({ plain: true }));
            
//             // res.render('first-template', { posts, loggedIn: req.session.loggedIn });
//             })
//             .catch(err => {
//               console.log(err);
//               res.status(500).json(err);
//         });
//     });
// }
  
  document.querySelector('.choose-template-list').addEventListener('click', createStoryHandler);



  module.exports = router;
  


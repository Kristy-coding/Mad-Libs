
const unicornArray = ["plural noun","adjective", "plural noun (animals)","plural noun", "adjective","color","adjective", "noun", "plural noun", "adjective", "verb", "plural noun", "verb ending in -ed", "verb", "noun", "adjective"]

const codingArray = ["this", "is", "the", "code", "array"]

let array = ""

// we can enter all the template arrays here and then say 
// if title = unicorns then set arry= to unicorns array, if title = coding mad libs then use coding arry 
var title = document.querySelector(".inserted-title").textContent
console.log(title) 


function chooseArray () {
      if (title.includes('Bootcamp Experience')){
            array = codingArray
      }

      if (title.includes('Unicorn Poops')){
          array = unicornArray
      }

      console.log(array)
}

chooseArray();

console.log(array)

var input_container = document.querySelector('.word-input');
var generate_button = document.querySelector('.generate-button');
//var part_of_speech = document.querySelector('input').placeholder
// on page load initiate the placeholder text with the first index of the array 

var index = 0
var part_of_speech = array[index];
//var part_of_speech = unicornArray[index];
//console.log(part_of_speech)

//grab placeholder text
var input_box = document.querySelector('input')
input_box.placeholder = part_of_speech


// grab input box (innerhtml)

// grabbing the story id from the url (the number at the end of the url is the id of the story)
var story_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1]
    //console.log(story_id)



// function chooseArray(){
//       if (title.includes("Unicorn Poops")){
//         array = unicornArray
//         //console.log(array)
//         //console.log("hi")
//       }
//       //if(title.includes other titels from the group set them equal )
// }       

      async function addWordHandler(event) {

          event.preventDefault();
          
          

          var word = document.querySelector('input').value;

          //clear input box after value is captured in word 
          input_box.value = ""
          //console.log(word)

          // for (var i = 0; i < unicornArray.length; i++) {
              
          //     // placeholder text gets put in 
          //     // then on submit a word get added to the data base for this story via a fetch post request
          //     // when the array ends, a button pops up to 'finish- template', on click we grab the story form the databse(findOne where id = id in url) which nows has a bunch of words associated with it and loop through the array of associated words backwards? depending on how they end up in the database and render them to the hardcoded templat word[0],word[1] etc. 
          // }   
              if (word && part_of_speech && story_id) {
                  const response = await fetch('/api/word', {
                    method: 'POST',
                    body: JSON.stringify({
                      the_word: word,
                      part_of_speech: part_of_speech,
                      story_id: story_id,
                      
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                
                  if (response.ok) {
                  // word get added to the database then reload the page so we can fill in the next word 
                  
                  console.log('response ok')
                          if(index < array.length -1 ){
                              index++
                              console.log(index);
                              part_of_speech = array[index];
                              input_box.placeholder = part_of_speech
                              
                              //var part_of_speech = unicornArray[index];
                              console.log(part_of_speech);
                              
                              
                          } else {

                              input_container.classList.add('hide');
                              generate_button.classList.remove('hide');
                              console.log('template finished!')
                              
                              // make generate template button visible (take hide off)
                              // on button click grag the story id and change location to dashboard/story/id/generate where the id is the `${story_id}`
                              // on this routes make a fetch request to find one and res.render(/completed- template, {story})
                              // this time the {story} will have all the info we need about the words 
                              
                          }
                        
                          
                    //document.location.reload();
                  } else {
                    alert(response.statusText);
                  }
              }
       }


function generateTemplate () {

    document.location.replace(`/dashboard/story/generate/${story_id}`)

}

 
 

 document.querySelector('.generate-button').addEventListener('click', generateTemplate)



document.querySelector('.input-button').addEventListener('click', addWordHandler);
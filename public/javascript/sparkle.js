 
window.addEventListener('DOMContentLoaded', () => {
 document.getElementById("sparkle").sparkle({
    position: "beforeend",
    count: 3,
    size: {
      width: "15px",
      height: "15px"
    },
    minAge: 2000,
    maxAge: 5000,
    starsource: `
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 15 15" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" x
        mlns:xlink="http://www.w3.org/1999/xlink" 
        xml:space="preserve" 
        xmlns:serif="http://www.serif.com/" 
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <path d="M1.125,4.95l4.462,0l1.913,-3.825l0.637,3.825l5.738,0l-4.463,3.188l0.638,5.737l-3.187,-3.825l-4.463,3.825l1.913,-5.737l-3.188,-3.188Z" 
          style="fill:#fff;">
          </path>
        </svg>`
 });
});
//   window.addEventListener('DOMContentLoaded', () => {
//     document.querySelector("#sparkle").sparkle();
// });
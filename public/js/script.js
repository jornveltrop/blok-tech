// Preview uploaded profilePic
function previewProfilePic() {
  const prPic = document.querySelector("#prPic");

  prPic.addEventListener("change", setPreviewProfilePic);
  
  function setPreviewProfilePic() {
    profilePic.src=URL.createObjectURL(event.target.files[0]);
  };
};


// Toggle favorite
function toggleFavorite() {
  const starUnfilled = document.querySelector(".profile header ul a:first-of-type");
  const starFilled = document.querySelector(".profile header ul a:last-of-type");

  starUnfilled.addEventListener("click", toggleFavorite);
  starFilled.addEventListener("click", toggleFavorite);

  function toggleFavorite() {
    starFilled.classList.toggle("display");
    starUnfilled.classList.toggle("display");
  };
};


// Activate scripts
if (document.URL.indexOf("/profile/") > -1 ) { 
  toggleFavorite();
};

if (document.URL.indexOf("/addProfile") > -1 ) { 
  previewProfilePic();
  toggleFavorite();
};
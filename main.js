const loadingImage = document.getElementById("loadingImage");
const input = document.querySelector('input');
const form = document.querySelector('form');
const imagesSection = document.querySelector('.images');
const API_URL = 'https://pixabay.com/api/?key=643054-e578de7a4f0d5d79c4f1f23fe&image_type=photo';

loadingImage.style.display = 'none';
form.addEventListener('submit', formSubmitted);

function formSubmitted(e) {
  e.preventDefault();
  const searchWord = input.value;
  search(searchWord).then(displayImages);
}

function search(searchWord) {
  const url = `${API_URL}&q=${searchWord}`;
  loadingImage.style.display = '';
  imagesSection.innerHTML = '';
  return fetch(url)
    .then(res => res.json())
    .then(result => {
      loadingImage.style.display = 'none';
      return result.hits;
    })
    .catch(err => {
      loadingImage.style.display = 'none';
      alert(err)
    })
}

function displayImages(pictures) {

  if (pictures.length > 0) {
    pictures.forEach(picture => {
      const img = new Image();
      const imageElement = document.createElement('img');
      imageElement.src = picture.previewURL;
      imagesSection.appendChild(imageElement);
    });
  } else {
    imagesSection.innerHTML = '<p>Sorry, there are no images to show!<p/>'
  }
}


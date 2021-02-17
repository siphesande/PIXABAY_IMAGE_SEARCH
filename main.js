const loadingImage = document.getElementById("loadingImage");
const sliding = document.getElementById('slides');
const sliding_images = document.getElementById('slides');
const next_image = document.getElementById('next');
const prev_images = document.getElementById('prev');

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
  //sliding_images.style.display = 'none';
  
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
      //imagesSection.appendChild(imageElement);
      sliding.appendChild(imageElement);
    });
  } else {
    imagesSection.innerHTML = '<p>Sorry, there are no images to show!<p/>'
  }
}





const slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    dot = document.querySelector('.dots');

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      index = 0,
      allowShift = true;
  
  wrapper.classList.add('loaded');
  
  for (let j = 0; j < slidesLength; j++) {
      let dotItem = document.createElement('i');
      dotItem.dataset.id = j ;
      dot.appendChild(dotItem);
  }
  
  document.querySelector('.dots i:first-child').classList.add('active');

  
  function appendAfter(n, original, appendTo) {
      for(let i = 0; i < n; i++) {
          let clone = original[i].cloneNode(true);
          appendTo.appendChild(clone);
      }
  }
  appendAfter(4, slides, items);
  
  items.insertBefore(slides[slidesLength - 1].cloneNode(true), slides[0]);
  
  // Mouse events
//   items.onmousedown = dragStart;
  
//   // Touch events
//   items.addEventListener('touchstart', dragStart);
//   items.addEventListener('touchend', dragEnd);
//   items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir ==1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
      
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize ) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    deleteDots();
    dot.children[index].classList.add('active');
    allowShift = true;
  }
  
  dot.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() !== 'i') return;
    checkDots(e);
  });
  function checkDots(e) {          
      items.classList.add('shifting');
      deleteDots();
      e.target.classList.add('active');
      items.style.left = -(1 * (slideSize * e.target.dataset.id)) + "px";
    index = e.target.dataset.id;
  }
  
  function deleteDots(e) {
    let dotElements = document.querySelectorAll('.dots i');
    for (let i = 0; i < dotElements.length; i++) {
      dotElements[i].classList.remove('active');
    }
  }
  
}

slide(slider, sliderItems, prev, next);

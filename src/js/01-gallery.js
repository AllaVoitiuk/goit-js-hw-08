// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

let instance;
const galleryContainer = document.querySelector(".gallery");
const cardGallery = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend',cardGallery);
galleryContainer.addEventListener ("click", onGalleryContainerClick);

function createGalleryMarkup(items) {
    return items
    .map (({preview,original,description}) => {
        return `<div class="gallery__item">
        <a class="gallery__link" href=${original} target="_self">
          <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}/>
        </a>
      </div>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  
  const original = event.target.dataset.source;
  const description = event.target.alt;  

  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
      return; 
  }
  instance = basicLightbox.create(`
  <img src=${original} alt=${description} width="800" height="600"> `)
    
  instance.show();

  document.addEventListener("keydown", onKeyEsc);  
}

function onKeyEsc (event) {
  console.log("event.key: " + event.key);
   if (event.key === 'Escape') {
    
    instance.close();
    document.removeEventListener("keydown", onKeyEsc);
      
  }
}
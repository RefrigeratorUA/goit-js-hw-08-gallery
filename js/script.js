import gallery from "../gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".js-lightbox .lightbox__overlay"),
  btnCloseModal: document.querySelector("button[data-action=close-lightbox]"),
  galleryImage: document.querySelector(".lightbox__image"),
};

let currentItemModal;

// refs.galleryList.insertAdjacentHTML("beforeend", creatGalleryMarkup(gallery));
refs.galleryList.innerHTML = creatGalleryMarkup(gallery);

refs.galleryList.addEventListener("click", onClickGalleryItem);

function creatGalleryMarkup(array) {
  return array
    .map(
      ({ original, description, preview }) =>
        `<li class="gallery__item">
        <a class="gallery__link"
        href="${original}"
        >
        <img
        class="gallery__image"
        src="${preview}" 
        data-source="${original}" 
                    alt="${description}"
                    />
            </a>
            </li>`
    )
    .join("");
}

function onClickGalleryItem(e) {
  e.preventDefault();
  refs.galleryList.removeEventListener("click", onClickGalleryItem);

  const isClickOnItem = e.target.classList.contains("gallery__image");
  if (!isClickOnItem) return;

  refs.lightBox.classList.add("is-open");

  currentItemModal = e.target;
  changeImgAttributes(currentItemModal);

  refs.btnCloseModal.addEventListener("click", hideModal);
  refs.overlay.addEventListener("click", hideModal);
  document.body.addEventListener("keydown", onKeyDown);
}

function hideModal(e) {
  refs.btnCloseModal.removeEventListener("click", hideModal);
  refs.overlay.removeEventListener("click", hideModal);
  document.body.removeEventListener("keydown", onKeyDown);

  refs.lightBox.classList.remove("is-open");

  currentItemModal = undefined;
  changeImgAttributes(currentItemModal);

  refs.galleryList.addEventListener("click", onClickGalleryItem);
}

function onKeyDown(e) {
  if (e.code === "Escape") return hideModal();

  const currentListItemRef = currentItemModal.closest("li");

  if (e.code === "ArrowLeft") onPressArrowLeft(currentListItemRef);
  else if (e.code === "ArrowRight") onPressArrowRight(currentListItemRef);
}

function changeImgAttributes(imageRef) {
  if (imageRef) {
    refs.galleryImage.src = imageRef.dataset.source;
    refs.galleryImage.alt = imageRef.alt;
  } else {
    refs.galleryImage.src = "";
    refs.galleryImage.alt = "";
  }
}

function onPressArrowLeft(parentListItemRef) {
  const leftItemModal = parentListItemRef.previousSibling
    ? parentListItemRef.previousSibling
    : refs.galleryList.lastChild;

  currentItemModal = leftItemModal.querySelector("img");
  changeImgAttributes(currentItemModal);
}

function onPressArrowRight(parentListItemRef) {
  const rightItemModal = parentListItemRef.nextSibling
    ? parentListItemRef.nextSibling
    : refs.galleryList.firstChild;

  currentItemModal = rightItemModal.querySelector("img");
  changeImgAttributes(currentItemModal);
}

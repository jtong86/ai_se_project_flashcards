import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplateEl = document.querySelector("#deck-template");
const deckListEl = document.querySelector(".gallery__list");
const mainContentEl = document.querySelector(".page__main-content");

const homeSectionEl = document.querySelector(".gallery");
const carouselSectionEl = document.querySelector(".carousel");
const notFoundSectionEl = document.querySelector(".not-found");
const aboutSectionEl = document.querySelector(".about");

function createDeckEl(item) {
  const cloneEl = deckTemplateEl.content
    .querySelector("li")
    .cloneNode(true);

  const deckEl = cloneEl.querySelector(".card");
  const titleEl = cloneEl.querySelector(".card__title");
  const cardCountEl = cloneEl.querySelector(".card__card-count");
  const deleteBtnEl = cloneEl.querySelector(".card__delete-btn");
  const deleteIconEl = cloneEl.querySelector(".card__delete-icon");
  const deckLinkEl = cloneEl.querySelector(".card__link");

  titleEl.textContent = item.name;
  cardCountEl.textContent = `${item.cards.length} Cards`;

  const colorName = hexToString(item.color);

  deckEl.classList.remove("card_color_green");
  deckEl.classList.add(`card_color_${colorName}`);

  deckLinkEl.href = `#carousel/${item.id}`;

  deckLinkEl.setAttribute(
    "aria-label",
    `Open ${item.name} deck`
  );

  deleteBtnEl.setAttribute(
    "aria-label",
    `Delete ${item.name} deck`
  );

  deleteIconEl.setAttribute(
    "alt",
    `Trash icon for ${item.name} deck`
  );

  deleteBtnEl.addEventListener("click", () => {
    cloneEl.remove();
  });

  return cloneEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckListEl.prepend(deckEl);
}

decks.forEach(renderDeckEl);

function hideAllSections() {
  homeSectionEl.style.display = "none";
  carouselSectionEl.style.display = "none";
  notFoundSectionEl.style.display = "none";
  aboutSectionEl.style.display = "none";
}

function router() {
  const hash = window.location.hash.slice(1);

  hideAllSections();

  mainContentEl.classList.remove(
    "page__main-content_location_carousel"
  );

  if (hash === "" || hash === "home") {
    homeSectionEl.style.display = "block";
  } else if (hash === "about") {
    aboutSectionEl.style.display = "block";
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      carouselSectionEl.style.display = "flex";

      mainContentEl.classList.add(
        "page__main-content_location_carousel"
      );

      renderCarouselView(currentDeck);
    } else {
      notFoundSectionEl.style.display = "block";
    }
  } else {
    notFoundSectionEl.style.display = "block";
  }
}

router();

window.addEventListener("hashchange", router);
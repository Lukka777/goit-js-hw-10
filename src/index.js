import './sass/main.scss';
import menuFood from './menu.json';
import { Theme } from './js/theme';
import { createElemWithClasses } from './js/helpers';

const ulMenu = document.querySelector('.js-menu');

menuFood.forEach(data => {
  const liElem = createElemWithClasses('li', ['menu__item']);
  const articleElem = createElemWithClasses('article', ['card']);

  const imgElem = createElemWithClasses('img', ['card__image']);
  imgElem.src = data.image;
  imgElem.alt = data.name;

  const cardContent = createElemWithClasses('div', ['card__content']);
  const cardName = createElemWithClasses('h2', ['card__name']);

  const cardPrice = createElemWithClasses('p', ['card__price']);
  const priceIcon = createElemWithClasses('i', ['material-icons']);
  priceIcon.innerText = 'monetization_on';
  cardPrice.append(priceIcon, `${data.price} кредитов`);

  const cardDescription = createElemWithClasses('p', ['card__descr']);
  cardDescription.innerText = data.description;

  const tagList = createElemWithClasses('ul', ['tag-list']);
  data.ingredients.forEach(ingridient => {
    const ingridientElem = createElemWithClasses('li', ['tag-list__item']);
    ingridientElem.innerText = ingridient;
    tagList.append(ingridientElem);
  });

  const cardButton = createElemWithClasses('button', ['card__button', 'button']);
  const cardButtonIcon = createElemWithClasses('i', ['material-icons', 'button__icon']);
  cardButtonIcon.innerText = 'shopping_cart';
  cardButton.append(cardButtonIcon, 'В корзину');

  cardContent.append(cardName, cardPrice, cardDescription, tagList);
  articleElem.append(imgElem, cardContent, cardButton);
  liElem.append(articleElem);
  ulMenu.append(liElem);
});

const inputSelector = document.querySelector('.theme-switch__toggle');
inputSelector.addEventListener('change', event => {
  document.body.classList.add(event.target.checked ? Theme.DARK : Theme.LIGHT);
  document.body.classList.remove(!event.target.checked ? Theme.DARK : Theme.LIGHT);
  localStorage.setItem('Theme', event.target.checked ? Theme.DARK : Theme.LIGHT);
});

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('Theme');
  inputSelector.checked = theme === Theme.DARK;
  document.body.classList.add(theme);
});
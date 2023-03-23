const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

// cart
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');

const openModal = () => {
	modalCart.classList.add('show');
}
const closeModal = () => {
	modalCart.classList.remove('show');
}

buttonCart.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
	if (event.code === "Escape" && modalCart.classList.contains('show')) {
		closeModal();
	}
});

// плавная прокрутка и закрытие переменных от конфликтьа с любым кодом
(function () {
	const scrollLinks = document.querySelectorAll('a.scroll-link');
	for (let i = 0; i < scrollLinks.length; i++) {
		scrollLinks[i].addEventListener('click', function (event) {
			event.preventDefault();
			const id = scrollLinks[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		});
	}
})()

//
{
	// const scrollLinks = document.querySelectorAll('a.scroll-link');
	// for (let i = 0; i < scrollLinks.length; i++) {
	// 	scrollLinks[i].addEventListener('click', function (event) {
	// 		event.preventDefault();
	// 		const id = scrollLinks[i].getAttribute('href');
	// 		document.querySelector(id).scrollIntoView({
	// 			behavior: 'smooth',
	// 			block: 'start',
	// 		})
	// 	});
	// }
	const scrollLinks = document.querySelectorAll('a.scroll-link');
	for (const scrollLink of scrollLinks) {
		scrollLink.addEventListener('click', function (event) {
			event.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		});
	}
}


// goods

const more = document.querySelector('.more');
const navigationLinks = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async function () {
	const result = await fetch('db/db.json');
	if (!result.ok) {
		throw 'Ошибочка вышла' + result.status
	}
	return result.json();
}
getGoods().then(function (data) { });

// variant
// fetch('db/db.json')
// 	.then(function (response) { return response.json() })
// 	.then(function (data) { console.log(data); })

// Создание карточки товара
// ClaasName = все затирает

const createCard = (objCard) => {
	console.log(objCard);
	const card = document.createElement('div');
	card.className = 'col-lg-3 colsm-6';
	card.innerHTML = `
		<div class="goods-card">
		${objCard.label ?
			`<span class="label">${objCard.label}</span>` :
			''}
			<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
			<h3 class="goods-title">${objCard.name}</h3>
			<p class="goods-description">${objCard.description}</p>
			<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
				<span class="button-price">$ ${objCard.price}</span>
			</button>
		</div>
	`;

	return card
}

const renderCards = (arr) => {
	longGoodsList.textContent = '';
	const cards = arr.map(createCard);
	cards.forEach(card => {
		longGoodsList.append(...cards)
	});
	document.body.classList.add('show-goods');
}

more.addEventListener('click', function (event) {
	event.preventDefault();
	getGoods().then(renderCards);
})

// Фильтрация

const filterCards = function (field, value) {
	getGoods()
		.then(function (data) {
			const filteredGoods = data.filter(function (good) {
				return good[field] === value;
			});
			return filteredGoods;
		})
		.then(renderCards);
}

navigationLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value)

	});
});

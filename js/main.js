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
// {
// 	const scrollLinks = document.querySelectorAll('a.scroll-link');
// 	for (let i = 0; i < scrollLinks.length; i++) {
// 		scrollLinks[i].addEventListener('click', function (event) {
// 			event.preventDefault();
// 			const id = scrollLinks[i].getAttribute('href');
// 			document.querySelector(id).scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'start',
// 			})
// 		});
// 	}
// }

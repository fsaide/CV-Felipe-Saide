document.addEventListener('DOMContentLoaded', () => {
	document.body.classList.add('js');

	const animatedElements = document.querySelectorAll('.sidebar, .section');
	const observer = new IntersectionObserver((entries, currentObserver) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				currentObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	animatedElements.forEach(element => observer.observe(element));
});

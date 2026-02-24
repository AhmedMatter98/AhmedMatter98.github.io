// Fade-in sections on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.3 };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Animate skill bars
const skillFills = document.querySelectorAll('.skill-fill');
window.addEventListener('scroll', () => {
  skillFills.forEach(fill => {
    const sectionTop = fill.parentElement.parentElement.offsetTop;
    if(window.scrollY + window.innerHeight > sectionTop + 50){
      fill.style.width = fill.dataset.level;
    }
  });
});

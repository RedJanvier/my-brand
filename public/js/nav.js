document.querySelectorAll('.navbar__links a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelector('.navbar__links a.active')?.classList.remove('active');
    link.classList.add('active');
  });
});
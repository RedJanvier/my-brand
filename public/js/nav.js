document.querySelectorAll('.navbar__links a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelector('.navbar__links a.active')?.classList.remove('active');
    link.classList.add('active');
  });
});

const roles = ['Architect', 'Tester', 'Designer', 'Developer'];
let i = 0;

const animationChangeDelay = 3000;
const animationLength = 200;

function animateRoles() {
  setTimeout(function () {
    document.querySelector('.current-role').style.top = '0';
    document.querySelector('.current-role').style.opacity = '1';
  }, animationLength);
  
  setTimeout(function () {
    document.querySelector('.current-role').style.top = '-35px';
    document.querySelector('.current-role').style.opacity = '0';
  }, animationChangeDelay - animationLength);
}

setInterval(function () {
  document.querySelector('#role').innerHTML = `<span class="current-role">${roles[i]}</span>`;
  
  animateRoles();

  i = (i == roles.length - 1) ? 0 : i + 1;
}, animationChangeDelay);

animateRoles();

const columns = document.querySelectorAll('.card.straight:not(.fixed) .card__column');
columns.forEach(column => {
  column.addEventListener('mouseenter', e => {
    e.target.closest('.card.straight').querySelectorAll('.card__column').forEach((x) => x.classList.add('dim'));
    e.target.classList.remove('dim');
  });

  column.addEventListener('mouseleave', e => {
    e.target.closest('.card.straight').querySelectorAll('.card__column').forEach((x) => x.classList.remove('dim'));
  });
});

document.addEventListener('scroll', () => {
  const y = document.querySelector('body').scrollWidth;
  console.log(y);
  if (y >= 3601) {
    document.querySelectorAll('.tools:not(.animate)').forEach((tools) => {
      tools.classList.add('animate');
    });
  }
});

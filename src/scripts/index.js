console.log('hello')

const iconMenu = document.querySelector('.label_checkbox');

if (iconMenu) {
  const menuBody = document.querySelector('.burger__list');
  
  iconMenu.addEventListener('click', (e) => {
    menuBody.classList.toggle('_active');
  })
}
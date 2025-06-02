let scrollPosition = 0;
let menuOuvert = false;

const menu_bg = document.getElementById('vertical_header_bg');
const menu = document.getElementById('vertical_header');
const menu_content = document.getElementById('phone_header_box');
const ligneGauche = document.getElementById('Ligne_x5F_gauche');
const ligneDroite = document.getElementById('Ligne_x5F_droite');

function ouvrir_menu() {
  menuOuvert = true;
  scrollPosition = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.overflowY = 'scroll';
  document.body.style.width = '100%';

  document.body.classList.add('no-scroll');
  menu_bg.classList.add('active');
  menu.style.transform = 'translateX(0px)';
  menu.style.borderLeft = '1px solid #F5F5F5';
  setTimeout(() => {
    menu_content.classList.add("visible");
    document.querySelector('#phone_header_box_ul ul').classList.add('active');
  }, 100);

  [ligneGauche, ligneDroite].forEach((ligne) => {
    const length = ligne.getTotalLength();
    ligne.style.transition = 'none';
    ligne.style.strokeDasharray = length;
    ligne.style.strokeDashoffset = length;
    void ligne.getBoundingClientRect();
    ligne.style.transition = 'stroke-dashoffset 1.5s ease-in-out 0.3s';
    ligne.style.strokeDashoffset = '0';
  });

}

function fermer_menu() {
  menuOuvert = false;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.overflowY = '';
  document.body.style.width = '';

  window.scrollTo(0, scrollPosition);

  document.body.classList.remove('no-scroll');

  menu_bg.classList.remove('active');
  menu.style.transform = 'translateX(100%)';
  menu.style.borderLeft = '0px solid #F5F5F5';

  menu_content.classList.remove("visible");

  document.querySelector('#phone_header_box_ul ul').classList.remove('active');

  [ligneGauche, ligneDroite].forEach((ligne) => {
    const length = ligne.getTotalLength();
    ligne.style.transition = 'none';
    ligne.style.strokeDashoffset = length;
  });
}

function retour_menu() {
  window.location.href = 'index.html';
}

// Fermeture du menu si on clique sur le fond flou
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuOuvert) {
    fermer_menu();
  }
});

// Fermeture du menu si on appuie sur "Échap"
document.getElementById('vertical_header_bg').addEventListener('click', (event) => {
  if (event.target.id === 'vertical_header_bg' && menuOuvert) {
    fermer_menu();
  }
});
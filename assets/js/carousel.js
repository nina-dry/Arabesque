let categorieImageActuelle = null;
let imageAgrandieActuelle = 0;

// Initialiser un carousel
function initCarousel(categorie) {
  const categorieCarousel = carousels[categorie];
  const imgPrincipale = document.getElementById(`img-principale-${categorie}`);
  const miniaturesContainer = document.getElementById(`miniatures-${categorie}`);
    
  if (!imgPrincipale || !miniaturesContainer) {
    return;
  }
    
  // Définir l'image principale
  imgPrincipale.src = categorieCarousel.images[categorieCarousel.current];
  imgPrincipale.onclick = () => ouvrirVisionneuse(categorie, categorieCarousel.current);
  
  // Créer les miniatures
  miniaturesContainer.innerHTML = '';
  categorieCarousel.images.forEach((src, index) => {
    const miniature = document.createElement('div');
    miniature.className = `miniature ${index === categorieCarousel.current ? 'active' : ''}`;
    miniature.innerHTML = `<img src="${src}" alt="Miniature ${index + 1}">`;
    miniature.onclick = () => selectionnerImage(categorie, index);
    miniaturesContainer.appendChild(miniature);
  });
  
  updateBoutonsNavigation(categorie);
}

// Sélectionner une image
function selectionnerImage(categorie, index) {
  const categorieCarousel = carousels[categorie];
  categorieCarousel.current = index;
  
  const imagePrincipale = document.getElementById(`img-principale-${categorie}`);
  imagePrincipale.src = categorieCarousel.images[index];
  imagePrincipale.onclick = () => ouvrirVisionneuse(categorie, index);
  
  const miniatures = document.querySelectorAll(`#miniatures-${categorie} .miniature`);
  miniatures.forEach((miniature, i) => {
    if (i === index) {
      miniature.classList.add('active');
    } else {
      miniature.classList.remove('active');
    }
  });
  
  miniatures[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  
  updateBoutonsNavigation(categorie);
}

// Naviguer dans le carousel
function naviguerCarousel(categorie, direction) {
  const categorieCarousel = carousels[categorie];
  const nouvelIndex = categorieCarousel.current + direction;
  
  if (nouvelIndex >= 0 && nouvelIndex < categorieCarousel.images.length) {
    selectionnerImage(categorie, nouvelIndex);
  }
}

// Mettre à jour les boutons de navigation
function updateBoutonsNavigation(categorie) {
  const categorieCarousel = carousels[categorie];
  const btnPrecedent = document.getElementById(`principal-precedent-${categorie}`);
  const btnSuivant = document.getElementById(`principal-suivant-${categorie}`);

  if (!btnPrecedent || !btnSuivant) {
    console.warn(`Boutons de navigation manquants pour ${categorie}`);
    return;
  }

  btnPrecedent.disabled = categorieCarousel.current === 0;
  btnSuivant.disabled = categorieCarousel.current >= categorieCarousel.images.length - 1;
}

// Ouvrir la visionneuse
function ouvrirVisionneuse(categorie, imageIndex) {
  categorieImageActuelle = categorie;
  imageAgrandieActuelle = imageIndex;
  
  const imgVisionneuse = document.getElementById('img-visionneuse');
  const imgVisionneuseAgrandie = document.getElementById('img-visionneuse-agrandie');
  
  imgVisionneuseAgrandie.src = carousels[categorie].images[imageIndex];
  imgVisionneuse.classList.add('active');
  
  updateVisionneuseBoutons();
  
  document.body.style.overflow = 'hidden';
}

// Fermer la visionneuse
function fermerVisionneuse() {
  const imgVisionneuse = document.getElementById('img-visionneuse');
  imgVisionneuse.classList.remove('active');
  
  document.body.style.overflow = '';
}

// Naviguer dans la visionneuse
function naviguerVisionneuse(direction) {
  if (!categorieImageActuelle) return;
  
  const categorieCarousel = carousels[categorieImageActuelle];
  imageAgrandieActuelle = Math.max(0, Math.min(imageAgrandieActuelle + direction, categorieCarousel.images.length - 1));
  
  const imgVisionneuseAgrandie = document.getElementById('img-visionneuse-agrandie');
  imgVisionneuseAgrandie.src = categorieCarousel.images[imageAgrandieActuelle];
  
  updateVisionneuseBoutons();
}

// Mettre à jour les boutons de la visionneuse
function updateVisionneuseBoutons() {
  const prevBtn = document.getElementById('btn-img-visionneuse prec');
  const nextBtn = document.getElementById('btn-img-visionneuse suiv');
  const categorieCarousel = carousels[categorieImageActuelle];
  
  prevBtn.disabled = imageAgrandieActuelle === 0;
  nextBtn.disabled = imageAgrandieActuelle >= categorieCarousel.images.length - 1;
}

// Fermer la visionneuse avec Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    fermerVisionneuse();
  } else if (e.key === 'ArrowLeft') {
    if (document.getElementById('img-visionneuse').classList.contains('active')) {
      naviguerVisionneuse(-1);
    }
  } else if (e.key === 'ArrowRight') {
    if (document.getElementById('img-visionneuse').classList.contains('active')) {
      naviguerVisionneuse(1);
    }
  }
});

// Initialiser tous les carousels au chargement
window.addEventListener('load', () => {
  setTimeout(() => {
    Object.keys(carousels).forEach(category => {
      initCarousel(category);
    });
  }, 100);
});
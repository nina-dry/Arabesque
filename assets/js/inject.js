fetch('../components/header.html')
    .then(r => r.text())
    .then(data => { document.getElementById('header').innerHTML = data; });

fetch('../components/navigation.html')
    .then(r => r.text())
    .then(data => { document.getElementById('navigation').innerHTML = data; });

function injectCarousel(categorie) {
  const container = document.querySelector(`[data-carousel="${categorie}"]`);
  const titreCategorie = (categorie) => {
    if (!categorie) return
    const avecEspaces = categorie.replace(/([A-Z])/g, ' $1').trim();
    return avecEspaces.charAt(0).toUpperCase() + avecEspaces.slice(1);
  }
  
  if (!container) return;
  container.innerHTML = `
    <div class="categorie-header">
        <div class="categorie-icone">
            <img src="../assets/images/logos/logo_arabesque.png"/>
        </div>
        <div>
        <h2 class="categorie-titre">${titreCategorie(categorie)}</h2>
        </div>
    </div>
    <div class="carousel-container">
      <div class="img-principale-container">
        <button class="nav-principale-btn prec" id="principal-precedent-${categorie}" onclick="naviguerCarousel('${categorie}', -1)">←</button>
        <img class="img-principale" id="img-principale-${categorie}" style="cursor: pointer;">
        <button class="nav-principale-btn suiv" id="principal-suivant-${categorie}" onclick="naviguerCarousel('${categorie}', 1)">→</button>
      </div>
      <div class="miniatures-container" id="miniatures-${categorie}"></div>
    </div>
  `;
  
    const imgPrincipale = document.getElementById(`img-principale-${categorie}`);
    if (imgPrincipale) {
        imgPrincipale.onclick = () => {
        const currentIndex = carousels[categorie].current;
        ouvrirVisionneuse(categorie, currentIndex);
        };
    }
}

function injectVisionneuse() {
  if (document.getElementById('img-visionneuse')) return;
  
  const visionneuse = document.createElement('div');
  visionneuse.id = 'img-visionneuse';
  visionneuse.className = 'visionneuse';
  visionneuse.innerHTML = `
    <button class="btn-fermer-visionneuse" onclick="fermerVisionneuse()">×</button>
    <button id="btn-img-visionneuse prec" class="btn-img-visionneuse prec" onclick="naviguerVisionneuse(-1)">←</button>
    <img id="img-visionneuse-agrandie" src="" alt="Image agrandie">
    <button id="btn-img-visionneuse suiv" class="btn-img-visionneuse suiv" onclick="naviguerVisionneuse(1)">→</button>
  `;
  
  visionneuse.addEventListener('click', (e) => {
    if (e.target.id === 'img-visionneuse') {
      fermerVisionneuse();
    }
  });
  
  document.body.appendChild(visionneuse);
}
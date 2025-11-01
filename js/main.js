const products = [
  {id:1, title:'Front Brake Disc', category:'brake', img:'img/product-disc.svg', desc:'High-carbon alloy brake disc, balanced and pre-scored for consistent bedding.'},
  {id:2, title:'Suspension Arm', category:'suspension', img:'img/product-arm.svg', desc:'Forged suspension arm with reinforced mounting points.'},
  {id:3, title:'Engine Mount', category:'engine', img:'img/product-mount.svg', desc:'Vibration-damped engine mount with high-temperature elastomer.'},
  {id:4, title:'Alternator Pulley', category:'electrical', img:'img/product-pulley.svg', desc:'Precision pulley for latest alternator assemblies.'},
  {id:5, title:'Brake Pad Set', category:'brake', img:'img/product-pad.svg', desc:'Low-dust compound pads for long life and stable braking.'},
  {id:6, title:'Connecting Rod', category:'engine', img:'img/product-rod.svg', desc:'Lightweight alloy connecting rod machined for balance.'}
];

// Helper for selecting single element
function el(q){return document.querySelector(q)}

// Render grid for product listings
function renderGrid(targetId, items){
  const grid = el('#'+targetId);
  if(!grid) return;
  grid.innerHTML = '';
  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card fade-up';
    card.innerHTML = `
      <img loading="lazy" src="${p.img}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div style="margin-top:.7rem">
        <a class="btn" href="contact.html?product=${encodeURIComponent(p.title)}">Enquire</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  // Render featured + all products if container present
  renderGrid('featured-grid', products.slice(0,4));
  renderGrid('product-grid', products);

  // Product filter & search
  const filter = el('#category-filter');
  if(filter){
    filter.addEventListener('change', (e)=>{
      const val = e.target.value;
      const search = el('#search').value.toLowerCase();
      const filtered = products.filter(p=>(val==='all' || p.category===val) && p.title.toLowerCase().includes(search));
      renderGrid('product-grid', filtered);
    });
    el('#search').addEventListener('input', (e)=>{
      const val = filter.value;
      const q = e.target.value.toLowerCase();
      const filtered = products.filter(p=>(val==='all' || p.category===val) && p.title.toLowerCase().includes(q));
      renderGrid('product-grid', filtered);
    });
  }

  // Hamburger + overlay logic for mobile nav
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  if(hamburger){
    hamburger.addEventListener('click', ()=>{
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', ()=>{
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Fade-up animation on scroll for all sections/cards
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.2});
  fadeElements.forEach(el=>observer.observe(el));

  // Mobile-specific slide-in animation for hero sections
  const heroSection = document.querySelector('.hero, .about-hero');
  if(heroSection && window.innerWidth <= 768){
    heroSection.style.opacity = 0;
    heroSection.style.transform = 'translateX(100%)';
    setTimeout(()=>{
      heroSection.style.transition = 'all 1s ease';
      heroSection.style.opacity = 1;
      heroSection.style.transform = 'translateX(0)';
    }, 300);
  }
});

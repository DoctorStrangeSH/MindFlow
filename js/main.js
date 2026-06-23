// Рендеринг динамических секций из данных
document.addEventListener('DOMContentLoaded', () => {
  renderPricing();
  renderTestimonials();
  renderFAQ();
});

// Тарифы
function renderPricing() {
  const container = document.getElementById('pricing-cards');
  if (!container) return;

  container.innerHTML = siteData.pricing.map(plan => `
    <div class="col">
      <div class="card h-100 ${plan.popular ? 'border-primary shadow position-relative' : 'border-0 shadow-sm'}">
        ${plan.popular ? `
          <span class="badge bg-primary position-absolute top-0 start-50 translate-middle px-3 py-2 rounded-pill">
            <i class="bi bi-star-fill me-1"></i>Популярный
          </span>
        ` : ''}
        <div class="card-body p-4 text-center">
          <h5 class="card-title fw-bold">${plan.name}</h5>
          <p class="text-secondary small mb-3">${plan.desc}</p>
          <div class="mb-3">
            <span class="display-5 fw-bold">${plan.price}</span>
            <span class="text-secondary">/мес</span>
          </div>
          <ul class="list-unstyled text-start mb-4">
            ${plan.features.map(f => `
              <li class="mb-2"><i class="bi bi-check2 text-success me-2"></i>${f}</li>
            `).join('')}
            ${plan.disabledFeatures.map(f => `
              <li class="text-muted"><i class="bi bi-x text-secondary me-2"></i>${f}</li>
            `).join('')}
          </ul>
          <a href="#contact" class="btn ${plan.btnClass} rounded-pill w-100">${plan.btnText}</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Отзывы + индикаторы
function renderTestimonials() {
  const slidesContainer = document.getElementById('testimonials-slides');
  const indicatorsContainer = document.getElementById('testimonials-indicators');
  if (!slidesContainer || !indicatorsContainer) return;

  slidesContainer.innerHTML = siteData.testimonials.map((t, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <div class="text-center px-3 mx-auto" style="max-width: 700px;">
        <img 
          src="https://placehold.co/80x80/e9ecef/6c757d?text=${t.initials}" 
          alt="${t.name}" 
          class="rounded-circle mb-3 shadow-sm"
          width="80" height="80"
        >
        <blockquote class="blockquote">
          <p class="mb-3 fs-5">${t.text}</p>
        </blockquote>
        <p class="fw-bold mb-1">${t.name}</p>
        <p class="text-secondary small">${t.role}</p>
        <div class="text-warning mb-3">
          ${'<i class="bi bi-star-fill"></i>'.repeat(5)}
        </div>
      </div>
    </div>
  `).join('');

  indicatorsContainer.innerHTML = siteData.testimonials.map((_, i) => `
    <button type="button" data-bs-target="#testimonialsCarousel" data-bs-slide-to="${i}" 
            class="${i === 0 ? 'active' : ''} bg-dark" aria-label="Слайд ${i + 1}"></button>
  `).join('');
}

// FAQ
function renderFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  container.innerHTML = siteData.faq.map((item, i) => `
    <div class="accordion-item border-0 mb-3 shadow-sm rounded-3">
      <h3 class="accordion-header">
        <button class="accordion-button collapsed rounded-3" type="button" 
                data-bs-toggle="collapse" data-bs-target="#faq${i}" 
                aria-expanded="false" aria-controls="faq${i}">
          ${item.q}
        </button>
      </h3>
      <div id="faq${i}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-secondary">${item.a}</div>
      </div>
    </div>
  `).join('');
}
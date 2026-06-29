// ============================================
// MindFlow — Основной JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderFeatures();
  renderHowItWorks();
  renderPricing();
  renderTestimonials();
  renderFAQ();
  setupContactForm();
  setupNavbarScroll();
  setupSmoothScroll();
});

// ============================================
// 1. Возможности
// ============================================
function renderFeatures() {
  const container = document.getElementById('features-cards');
  if (!container || !siteData.features) return;

  container.innerHTML = siteData.features.map((feature, i) => `
    <div class="col-md-4" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
      <div class="card h-100 border-0 shadow-sm text-center p-4">
        <div class="card-icon bg-${feature.color} bg-opacity-10 text-${feature.color} rounded-3 d-inline-flex align-items-center justify-content-center mx-auto mb-3" 
             style="width: 64px; height: 64px;" role="img" aria-label="${feature.title}">
          <i class="bi ${feature.icon} fs-3"></i>
        </div>
        <div class="card-body">
          <h5 class="card-title fw-bold">${feature.title}</h5>
          <p class="card-text text-secondary">${feature.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 2. Как это работает
// ============================================
function renderHowItWorks() {
  const container = document.getElementById('how-it-works-steps');
  if (!container || !siteData.howItWorks) return;

  container.innerHTML = siteData.howItWorks.map((step, i) => `
    <div class="step-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
      <div class="step-number" aria-hidden="true">${step.step}</div>
      <h5 class="fw-bold mb-2">${step.title}</h5>
      <p class="text-secondary mb-0">${step.description}</p>
    </div>
  `).join('');
}

// ============================================
// 3. Тарифы
// ============================================
function renderPricing() {
  const container = document.getElementById('pricing-cards');
  if (!container || !siteData.pricing) return;

  container.innerHTML = siteData.pricing.map((plan, i) => `
    <div class="pricing-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
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
              <li class="mb-2">
                <i class="bi bi-check2 text-success me-2"></i>${f}
              </li>
            `).join('')}
            ${plan.disabledFeatures.map(f => `
              <li class="text-muted">
                <i class="bi bi-x text-secondary me-2"></i>${f}
              </li>
            `).join('')}
          </ul>
          <a href="#contact" class="btn ${plan.btnClass} rounded-pill w-100">${plan.btnText}</a>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 4. Отзывы
// ============================================
function renderTestimonials() {
  const slidesContainer = document.getElementById('testimonials-slides');
  const indicatorsContainer = document.getElementById('testimonials-indicators');
  if (!slidesContainer || !indicatorsContainer || !siteData.testimonials) return;

  slidesContainer.innerHTML = siteData.testimonials.map((t, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <div class="text-center px-3 mx-auto" style="max-width: 700px;">
        <img src="https://placehold.co/80x80/e9ecef/6c757d?text=${t.initials}" 
             alt="${t.name}" class="rounded-circle mb-3 shadow-sm" width="80" height="80" loading="lazy">
        <blockquote class="blockquote">
          <p class="mb-3 fs-5">${t.text}</p>
        </blockquote>
        <p class="fw-bold mb-1">${t.name}</p>
        <p class="text-secondary small">${t.role}</p>
        <div class="text-warning mb-3" aria-label="Рейтинг ${t.rating} из 5 звёзд">
          ${'<i class="bi bi-star-fill"></i>'.repeat(t.rating || 5)}
        </div>
      </div>
    </div>
  `).join('');

  indicatorsContainer.innerHTML = siteData.testimonials.map((_, i) => `
    <button type="button" data-bs-target="#testimonialsCarousel" data-bs-slide-to="${i}" 
            class="${i === 0 ? 'active' : ''}" aria-label="Отзыв ${i + 1}"></button>
  `).join('');
}

// ============================================
// 5. FAQ
// ============================================
function renderFAQ() {
  const container = document.getElementById('faq-list');
  if (!container || !siteData.faq) return;

  container.innerHTML = siteData.faq.map((item, i) => `
    <div class="accordion-item border-0 mb-3 shadow-sm rounded-3" data-aos="fade-up" data-aos-delay="${i * 50}">
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

  // Добавляем родительский id для аккордеона
  container.id = 'faqAccordion';
}

// ============================================
// 6. Форма обратной связи
// ============================================
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Валидация на фронте
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        if (input.value.length > 0) {
          input.classList.add('is-invalid');
        }
      }
    });

    input.addEventListener('blur', () => {
      if (input.value.length > 0 && !input.checkValidity()) {
        input.classList.add('is-invalid');
      }
    });
  });

  // Отправка формы
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Проверяем валидность
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    const originalHTML = btn.innerHTML;
    
    // Состояние загрузки
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Отправка...';
    btn.disabled = true;
    status.style.display = 'none';
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        // Успех
        status.style.display = 'block';
        status.className = 'text-center small mt-3 text-success';
        status.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Сообщение отправлено! Мы свяжемся с тобой в течение часа.';
        form.reset();
        inputs.forEach(input => input.classList.remove('is-valid', 'is-invalid'));
        form.classList.remove('was-validated');
        
        // Автоскрытие через 5 секунд
        setTimeout(() => {
          status.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Ошибка сервера');
      }
    } catch (error) {
      // Ошибка
      status.style.display = 'block';
      status.className = 'text-center small mt-3 text-danger';
      status.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-1"></i>Что-то пошло не так. Попробуй ещё раз или напиши на hello@mindflow.app';
    } finally {
      // Возвращаем кнопку
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

// ============================================
// 7. Навбар — тень при скролле
// ============================================
function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow');
    } else {
      navbar.classList.remove('shadow');
    }
  });
}

// ============================================
// 8. Плавный скролл с учётом высоты навбара
// ============================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Пропускаем модальные окна и carousel controls
      if (href === '#' || this.hasAttribute('data-bs-toggle') || this.hasAttribute('data-bs-slide')) return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (!target) return;
      
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Закрываем мобильное меню при клике
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}
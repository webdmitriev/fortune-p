document.addEventListener("DOMContentLoaded", () => {

  // rating
  document.querySelectorAll('.rating-stars').forEach((el, index) => {
    const rating = parseFloat(el.dataset.rating) || 0;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    const starPath = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

    let html = '';

    // Полные звезды
    for (let i = 0; i < full; i++) {
      html += `<svg class="full" viewBox="0 0 24 24"><path d="${starPath}"/></svg>`;
    }

    // Половинка
    if (half) {
      const gradId = `half-grad-${index}`;
      html += `
      <svg class="half" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="${gradId}">
            <stop offset="50%" stop-color="#f3bb44"/>
            <stop offset="50%" stop-color="#C7C7C7"/>
          </linearGradient>
        </defs>
        <path d="${starPath}" fill="url(#${gradId})"/>
      </svg>
    `;
    }

    // Пустые
    for (let i = 0; i < empty; i++) {
      html += `<svg class="empty" viewBox="0 0 24 24"><path d="${starPath}"/></svg>`;
    }

    el.innerHTML = html + ` <p>${rating}</p>`;
  });

});

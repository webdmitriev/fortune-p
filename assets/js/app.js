document.addEventListener("DOMContentLoaded", () => {

  // ratings
  function initRatingStars() {
    if (window.innerWidth <= 768) return;

    document.querySelectorAll('.rating-stars').forEach((el, index) => {
      const rating = parseFloat(el.dataset.rating) || 0;
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;

      const starPath = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

      let html = '';

      for (let i = 0; i < full; i++) {
        html += `<svg class="full" viewBox="0 0 24 24"><path d="${starPath}"/></svg>`;
      }

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

      for (let i = 0; i < empty; i++) {
        html += `<svg class="empty" viewBox="0 0 24 24"><path d="${starPath}"/></svg>`;
      }

      el.innerHTML = html + ` <p>${rating}</p>`;
    });
  }
  window.addEventListener('resize', initRatingStars);

  // table filter
  if (document.querySelector('.btn-dots')) {
    document.querySelector('.btn-dots').addEventListener("click", function (e) {
      const parent = e.currentTarget.parentNode;
      parent.querySelector(".table-filter-items").classList.toggle("active")
    })
  }

  const filterItems = document.querySelectorAll('.table-container .table-filter-items .table-filter-item');
  if (filterItems.length > 0) {
    filterItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        filterItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        const parent = e.currentTarget.parentNode;
        parent.classList.toggle("active")
      });
    });
  }

  // get data table
  getTableData();

  function getTableData() {
    const url = "https://webdmitriev.firebaseio.com/fortune-p.json";

    const badgeStatus = [
      '',
      '<div class="badge badge-purpure">Эксклюзив</div>',
      '<div class="badge badge-green">Без депозита</div>',
      '<div class="badge badge-red">Нет бонуса</div>',
    ];


    function tableLineHTML(image, verified, rating, comments, bonus, gift, link) {
      return `
      <div class="table-line">
        <div class="table-line__image">
          <img src="${image}" alt="Fortune P" />
          ${verified ? '<div class="verified"></div>' : ''}
        </div>
        <div class="table-line__rating">
          <a href="#" class="rating-stars" data-rating="${rating}"></a>
          <div class="comments">${comments}</div>
        </div>
        <div class="table-line__badge">
          ${badgeStatus[bonus]}
          ${gift ? `<div class="gift">${gift}</div>` : ''}
        </div>
        <div class="table-line__controls">
          <button class="btn">ОБЗОР</button>
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn btn-green">САЙТ</a>
        </div>
      </div>
    `;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const tableBody = document.querySelector('.table-container .table-body');
        tableBody.innerHTML = '';

        Object.values(data).forEach((item) => {
          tableBody.insertAdjacentHTML(
            'beforeend',
            tableLineHTML(item.image, item.verified, item.rating, item.comments, item.bonus, item.gift, item.link)
          );
        });

        initRatingStars()
      })
      .catch((error) => {
        console.error(error);
      });
  }


});

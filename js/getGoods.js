/*jshint esversion: 6 */

const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  const more = document.querySelector('.more');

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list');

    goodsContainer.innerHTML = '';

    goods.forEach((good) => {
      const goodBlock = document.createElement('div');

      goodBlock.classList.add('col-lg-3');
      goodBlock.classList.add('col-sm-6');

      goodBlock.innerHTML = `
        <div div class="goods-card" >
          <span class="label ${good.label ? 'null' : 'd-none'}">${good.label}</span>
          <img src="db/${good.img}" alt="${good.name}" class="goods-image" />
          <h3 class="goods-title">${good.name}</h3>
          <p class="goods-description">${good.description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
            <span class="button-price">$${good.price}</span>
          </button>
        </div>
        `;

      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value, category) => {
    fetch('/db/db.json') //обращаемся к файлу db.json
      .then((res) => res.json())
      //res or response
      //then отрабатывает тогда, когда данные от cервера точно пришли
      //res возвращаем объект, к которому применили метод json
      .then((data) => {
        const array = category ? data.filter((item) => item[category] === value) : data;
        //использовали тернарный оператор для усрощения записи условия

        localStorage.setItem('goods', JSON.stringify(array));
        // json переведет данные в строку, а после в localStorage поместится JSON.stringify(data)

        if (window.location.pathname !== '/goods.html') {
          //чтобы страница не перезагружалась на такую же
          window.location.href = '/goods.html'; //переход на другой html документ
        } else {
          renderGoods(array);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); //блочим стандартное поведение ссылок
      const linkValue = link.textContent; //достаем текстовое содержиние
      const category = link.dataset.field; //достаем data-атрибут

      getData(linkValue, category);
    });
  });

  if (
    localStorage.getItem('goods') && window.location.pathname === '/goods.html'
  ) {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }

  if (more) {
    more.addEventListener('click', (e) => {
      getData();
    });
  }
};

getGoods();
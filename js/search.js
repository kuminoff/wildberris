/*jshint esversion: 6 */
const search = function () {
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

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
        <button class="button goods-card-btn add-to-cart" data-id="007">
          <span class="button-price">$${good.price}</span>
        </button>
      </div>
      `;

      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value) => {
    fetch('/db/db.json') //обращаемся к файлу db.json
      .then((res) => res.json())
      //then отрабатывает тогда, когда данные от вервера точно пришли
      //res возвращаем объект, к которому применили метод json

      .then((data) => {
        const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()));
        //toLowerCase нижний регистр 
        //когда передираем data мы получаем каждый этирируемый элемент
        //includes ищет в одной строке другую подстроку

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

  searchBtn.addEventListener('click', () => {
    getData(input.value);
  });
};

search();

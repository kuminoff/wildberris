/*jshint esversion: 6 */
const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = cart.querySelector('.modal-close');
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');

  console.log(cartTable);

  const addToCard = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));
    const clikedGood = goods.find(good => good.id === id);
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    if (cart.some(good => good.id === clikedGood.id)) {
      cart.map(good => {
        if (good.id === clikedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clikedGood.count = 1;
      cart.push(clikedGood);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    goods.forEach(good => {
      console.log(good);
    });

    cartBtn.addEventListener('click', () => {
      const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      renderCartGoods(cartArray);
      cart.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      cart.style.display = '';
    });

    if (goodsContainer) {
      goodsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.add-to-cart')) {
          const buttonToCart = event.target.closest('.add-to-cart');
          const goodId = buttonToCart.dataset.id;
          addToCard(goodId);
        }
      });
    }
  };
};

cart();

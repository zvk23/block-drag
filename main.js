document.addEventListener('DOMContentLoaded', function () {
  const block = document.querySelector('.js-block');
  const button = document.querySelector('.js-button');

  button.addEventListener("click", function() {
    block.classList.toggle('block_visible')
  })

  function blockDragHandle() {
    let isBlockCapture = false;

    block.addEventListener('mousedown', function() {
      isBlockCapture = true;
    })

    block.addEventListener('mouseup', function() {
      isBlockCapture = false;
    })

    block.addEventListener('mouseleave', function() {
      isBlockCapture = false;
    })

    block.addEventListener('mousemove', function(e) {
      if (!isBlockCapture) {
        return;
      }

      const { x, y } = block.getBoundingClientRect();
      const newX = `${x + e.movementX}px`;
      const newY = `${y + e.movementY}px`;

      block.style.left = newX;
      block.style.top = newY;
      localStorage.setItem('blockCoords', JSON.stringify({ x: newX, y: newY }));
    })
  }

  function parsePositionFromLocalStorage() {
    const coords = JSON.parse(localStorage.getItem('blockCoords'));

    if (!coords) {
      return;
    }

    block.style.left = coords.x;
    block.style.top = coords.y;
  }

  parsePositionFromLocalStorage();
  blockDragHandle();
})
document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.js-button');
  let isBlockCapture = false;
  let activeBlock = null; 
  const blocksList = []

  function saveBlocksPosition() {
    localStorage.setItem('blocks', JSON.stringify(blocksList));
  }

  document.addEventListener('mousemove', function(e) {
    if (!isBlockCapture || !activeBlock) {
      return;
    }

    const { x, y } = activeBlock.getBoundingClientRect();
    
    const newX = `${x + e.movementX}px`;
    const newY = `${y + e.movementY}px`;

    activeBlock.style.left = newX;
    activeBlock.style.top = newY;
  })

  function createBlock(coords) {
    const div = document.createElement('div');
    const x = coords ? coords.x : '10px';
    const y = coords ? coords.y : '10px';

    div.classList.add('block');
    div.setAttribute('id', blocksList.length);
    div.style.left = x;
    div.style.top = y;
    document.body.appendChild(div);
    blocksList.push({x, y})
    return div;
  }

  button.addEventListener("click", () => {
    const newBlock = createBlock();
    blockDragHandler(newBlock);
  });

  function blockDragHandler(block) {
    block.addEventListener('mousedown', function() {
      isBlockCapture = true;
      block.style.zIndex = 1;
      activeBlock = block;
    })

    block.addEventListener('mouseup', function() {
      isBlockCapture = false;
      block.style.zIndex = 0;
      activeBlock = null;
      const { x, y } = block.getBoundingClientRect();
      blocksList[block.id] = { x: `${x}px`, y: `${y}px` };
      saveBlocksPosition();
    })
  }

  function addBlocksFromLocalStortage() {
    const savedBlocks = JSON.parse(localStorage.getItem('blocks'));
    if (!savedBlocks) {
      return;
    }

    savedBlocks.forEach(block => {
      const createdBlock = createBlock(block);
      blockDragHandler(createdBlock);
    })
  }

  addBlocksFromLocalStortage()
})
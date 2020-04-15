const camera = {
    rotation: {
      x: 0,
      y: 0
    },
    translationX: 0,
    translationY: 0,
    translationZ: 0
  };

  function initInteraction(canvas) {
    const mouse = {
      pos: { x : 0, y : 0},
      leftButtonDown: false
    };
    function toPos(event) {
      //convert to local coordinates
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
    canvas.addEventListener('mousedown', function(event) {
      mouse.pos = toPos(event);
      mouse.leftButtonDown = event.button === 0;
    });
    canvas.addEventListener('mousemove', function(event) {
      const pos = toPos(event);
      const delta = { x : mouse.pos.x - pos.x, y: mouse.pos.y - pos.y };
      //TASK 0-1 add delta mouse to camera.rotation if the left mouse button is pressed
      if (mouse.leftButtonDown) {
        //add the relative movement of the mouse to the rotation variables
            camera.rotation.x += delta.x;
            camera.rotation.y += delta.y;
      }
      mouse.pos = pos;
    });
    canvas.addEventListener('mouseup', function(event) {
      mouse.pos = toPos(event);
      mouse.leftButtonDown = false;
    });
    //register globally
    document.addEventListener('keypress', function(event) {
      //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
      if (event.code === 'KeyR') {
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.translationX = 0;
        camera.translationY = 0;
        camera.translationZ = 0;
      }
  
      if (event.code === 'KeyW') {
        camera.translationX += .1;
      }
  
      if (event.code === 'KeyS') {
        camera.translationX -= .1;
      }
  
      if (event.code === 'KeyA') {
        camera.translationY += .1;
      }
  
      if (event.code === 'KeyD') {
        camera.translationY -= .1;
      }
  
      if (event.code === 'KeyQ') {
        camera.translationZ += .1;
      }
  
      if (event.code === 'KeyE') {
        camera.translationZ -= .1;
      }
  
    });
  }
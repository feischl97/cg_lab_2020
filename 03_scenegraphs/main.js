/**
 * Created by Marc Streit on 01.04.2016.
 */

/**
 * the OpenGL context
 * @type {WebGLRenderingContext}
 */
var gl = null;
/**
 * our shader program
 * @type {WebGLProgram}
 */
var shaderProgram = null;

var canvasWidth = 1800;
var canvasHeight = 800;
var aspectRatio = canvasWidth / canvasHeight;

//rendering context
var context;

//camera and projection settings
var fieldOfViewInRadians = convertDegreeToRadians(60);
var animatedAngle;

var tankATransformationNode, tankATopTransformationNode, tankABarrelTransformatioNode, bulletTransformationNode;
var tankATransformationMatrix, topATransformationMatrix, bulletTransformationMatrix;

var tankBTransformationNode, tankBTopTransformationNode, tankBBarrelTransformationNode;
var tankBTransformationMatrix, topBTransformationMatrix, barrelBTransformationMatrix;
var bDegree =0;

var timeInSeconds;
var firstScene=10,secondScene=20,thirdScene=30;



//load the shader resources using a utility function
loadResources({
  vs: 'shader/simple.vs.glsl',
  fs: 'shader/simple.fs.glsl',
  //TASK 5-3
  staticcolorvs: 'shader/static_color.vs.glsl'
}).then(function (resources /*an object containing our keys with the loaded resources*/) {
  init(resources);

  //render one frame
  render(0);
});

/**
 * initializes OpenGL context, compile shader, and load buffers
 */
function init(resources) {

  //create a GL context
  gl = createContext(canvasWidth, canvasHeight);

  //in WebGL / OpenGL3 we have to create and use our own shaders for the programmable pipeline
  //create the shader program
  shaderProgram = createProgram(gl, resources.vs, resources.fs);



  initTankBuffer();
  initTopBuffer();
  initBarrelBuffer();
  initBottomBuffer();
  initBulletBuffer();


  rootNode = new SGNode();





  //init Tank A Matrices
  tankATransformationMatrix = mat4.multiply(mat4.create(), glm.translate(-6,0,-4),glm.rotateY(-150));
  topATransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), glm.translate(-.33,0.3,0));
  bulletTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), mat4.create());

  //init Tank A nodes
  tankATransformationNode = new TransformationSGNode(tankATransformationMatrix);
  tankATopTransformationNode = new TransformationSGNode(  topATransformationMatrix);
  tankABarrelTransformatioNode = new TransformationSGNode(mat4.multiply(mat4.create(), mat4.create(), glm.translate(0.8,0,0)));
  bulletTransformationNode = new TransformationSGNode(bulletTransformationMatrix);
  bulletTransformationNode.append(new BulletRenderNode());
  tankABarrelTransformatioNode.append(bulletTransformationNode);
  tankATransformationNode.setMatrix(tankATransformationMatrix);

  //creating Tank A
  createTank(tankATransformationNode,tankATopTransformationNode,tankABarrelTransformatioNode);
  rootNode.append(tankATransformationNode);

  //init TankB Matrices
  tankBTransformationMatrix = mat4.multiply(mat4.create(), glm.translate(2,0,0),mat4.create());
  topBTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(),glm.translate(-.33,0.3,0));
  barrelBTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), glm.translate(0.8,0,0));

  //init Tank B Nodes
  tankBTransformationNode = new TransformationSGNode(tankBTransformationMatrix);
  tankBTopTransformationNode = new TransformationSGNode(topBTransformationMatrix);
  tankBBarrelTransformationNode = new TransformationSGNode( barrelBTransformationMatrix);
  tankBTransformationNode.setMatrix(tankBTransformationMatrix);

  //creating Tank B
  createTank(tankBTransformationNode,tankBTopTransformationNode,tankBBarrelTransformationNode);
  rootNode.append(tankBTransformationNode);


  // add camera listeners
  initInteraction(gl.canvas);
}

function createTank(tankTransformationNode,topTransformationNode,barrelTransformationNode){



  tank = new TankRenderNode();
  tankTransformationNode.append(tank);

  var bottomTransformationMatrix = mat4.multiply(mat4.create(), mat4.create(), glm.translate(0,-0.17,0));
  var bottomTransformationNode = new TransformationSGNode(bottomTransformationMatrix);

  tankTransformationNode.append(bottomTransformationNode);
  bottomTransformationNode.append(new BottomRenderNode());

  topTransformationNode.append(new TopRenderNode());
  tankTransformationNode.append(topTransformationNode);

  barrelTransformationNode.append(new BarrelRenderNode());
  topTransformationNode.append(barrelTransformationNode);
}




function initTankBuffer(){
  tankVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tankVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, tankVertices, gl.STATIC_DRAW);

  tankColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tankColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, tankColors, gl.STATIC_DRAW);

  tankIndexBuffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tankIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tankIndices), gl.STATIC_DRAW);

}

function initTopBuffer(){
  topVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, topVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, topVertices, gl.STATIC_DRAW);

  topColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, topColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, topColors, gl.STATIC_DRAW);

  topIndexBuffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, topIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(topIndices), gl.STATIC_DRAW);
}

function initBarrelBuffer(){
  barrelVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, barrelVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, barrelVertices, gl.STATIC_DRAW);

  barrelColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, barrelColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, barrelColors, gl.STATIC_DRAW);

  barrelIndexBuffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, barrelIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(barrelIndices), gl.STATIC_DRAW);
}

function initBottomBuffer(){
  bottomVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bottomVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bottomVertices, gl.STATIC_DRAW);

  bottomColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bottomColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bottomColors, gl.STATIC_DRAW);

  bottomIndexBuffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bottomIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bottomIndices), gl.STATIC_DRAW);
}

function initBulletBuffer(){
  bulletVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bulletVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bulletVertices, gl.STATIC_DRAW);

  bulletColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bulletColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bulletColors, gl.STATIC_DRAW);

  bulletIndexBuffer = gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bulletIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bulletIndices), gl.STATIC_DRAW);
}

/**
 * render one frame
 */
function render(timeInMilliseconds) {

  //set background color to light gray
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  //clear the buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //TASK 0-1
  //enable depth test to let objects in front occluse objects further away
  gl.enable(gl.DEPTH_TEST);

  //TASK 1-1
  gl.enable(gl.BLEND);
  //TASK 1-2
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  //activate this shader program
  gl.useProgram(shaderProgram);


  timeInSeconds = timeInMilliseconds/1000;


    if(timeInSeconds<1){
      tankBTransformationMatrix = mat4.multiply(mat4.create(),tankBTransformationMatrix,glm.translate(0.005,0,0));
      tankBTransformationNode.setMatrix(tankBTransformationMatrix);
    }
    else if(timeInSeconds<4){
      tankBTransformationMatrix = mat4.multiply(mat4.create(),tankBTransformationMatrix,glm.rotateY(0.5));
      tankBTransformationMatrix = mat4.multiply(mat4.create(),tankBTransformationMatrix,glm.translate(0.005,0,0));
      tankBTransformationNode.setMatrix(tankBTransformationMatrix);
    }
    else if(timeInSeconds<8){
      tankBTransformationMatrix = mat4.multiply(mat4.create(),tankBTransformationMatrix,glm.rotateY(-0.5));
      tankBTransformationMatrix = mat4.multiply(mat4.create(),tankBTransformationMatrix,glm.translate(0.005,0,0));
      tankBTransformationNode.setMatrix(tankBTransformationMatrix);
    }
    else if(timeInSeconds>9 && timeInSeconds<11){
      topBTransformationMatrix = mat4.multiply(mat4.create(),topBTransformationMatrix,glm.rotateY(-0.3));
      tankBTopTransformationNode.setMatrix(topBTransformationMatrix);
    }
    else if(timeInSeconds>11.5 && timeInSeconds<13){
      barrelBTransformationMatrix = mat4.multiply(mat4.create(),barrelBTransformationMatrix,glm.rotateZ(0.05));
      barrelBTransformationMatrix= mat4.multiply(mat4.create(),barrelBTransformationMatrix,glm.translate(0,0.0008,0));
      tankBBarrelTransformationNode.setMatrix(barrelBTransformationMatrix);
    }
    else if(timeInSeconds>13.5 && timeInSeconds<16.5){
      tankATransformationMatrix = mat4.multiply(mat4.create(),tankATransformationMatrix,glm.translate(0.007,0,0));
      tankATransformationNode.setMatrix(tankATransformationMatrix);
    }else if(timeInSeconds>16.5 && timeInSeconds<20.5){
      tankATransformationMatrix = mat4.multiply(mat4.create(),tankATransformationMatrix,glm.rotateY(0.5));
      tankATransformationMatrix = mat4.multiply(mat4.create(),tankATransformationMatrix,glm.translate(0.007,0,0));
      tankATransformationNode.setMatrix(tankATransformationMatrix);
    }else if(timeInSeconds>20.5 && timeInSeconds<22){
      tankATransformationMatrix = mat4.multiply(mat4.create(),tankATransformationMatrix,glm.translate(0.007,0,0));
      tankATransformationNode.setMatrix(tankATransformationMatrix);
    }else if(timeInSeconds> 22.5 && timeInSeconds<24.3){
      topATransformationMatrix = mat4.multiply(mat4.create(),topATransformationMatrix,glm.rotateY(0.25));
      tankATopTransformationNode.setMatrix(topATransformationMatrix);
    }else if(timeInSeconds> 25){
      bulletTransformationMatrix = mat4.multiply(mat4.create(),bulletTransformationMatrix,glm.translate(0.03,0,0));
      bulletTransformationNode.setMatrix(bulletTransformationMatrix);
    }

    if(timeInSeconds> 13.3){
        if(bDegree<180){
          topBTransformationMatrix = mat4.multiply(mat4.create(),topBTransformationMatrix,glm.rotateY(-0.1));
          bDegree++;
        }else if(bDegree<360){
          topBTransformationMatrix = mat4.multiply(mat4.create(),topBTransformationMatrix,glm.rotateY(0.1));
          bDegree++;
        }else{
          bDegree =0;
        }
          tankBTopTransformationNode.setMatrix(topBTransformationMatrix);
    }



  context = createSceneGraphContext(gl, shaderProgram);

  context.sceneMatrix = mat4.multiply(mat4.create(),
  glm.rotateY(camera.rotation.x),
  glm.rotateX(camera.rotation.y));
  
context.sceneMatrix = mat4.translate(context.sceneMatrix, context.sceneMatrix, vec3.fromValues(camera.translationY, camera.translationZ, camera.translationX));

  rootNode.render(context);



  //request another render call as soon as possible
  requestAnimationFrame(render);

  //animate based on elapsed time
  animatedAngle = timeInMilliseconds/10;
}


function setUpModelViewMatrix(sceneMatrix, viewMatrix) {
  var modelViewMatrix = mat4.multiply(mat4.create(), viewMatrix, sceneMatrix);
  gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, modelViewMatrix);
}

/**
 * returns a new rendering context
 * @param gl the gl context
 * @param shader the shader program
 * @returns {ISceneGraphContext}
 */
function createSceneGraphContext(gl, shader) {

  //create a default projection matrix
  projectionMatrix = mat4.perspective(mat4.create(), fieldOfViewInRadians, aspectRatio, 0.01, 10);
  gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'u_projection'), false, projectionMatrix);

  return {
    gl: gl,
    sceneMatrix: mat4.create(),
    viewMatrix: calculateViewMatrix(),
    projectionMatrix: projectionMatrix,
    shader: shader
  };
}

function calculateViewMatrix() {
  //compute the camera's matrix
  var eye = [0,4,5];
  var center = [0,0,0];
  var up = [0,1,0];
  viewMatrix = mat4.lookAt(mat4.create(), eye, center, up);
  return viewMatrix;
}

class BottomRenderNode extends SGNode{
  render(context){
    //setting the model view and projection for the shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);


    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, bottomVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, bottomColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    //set alpha value for blending
    //TASK 1-3
    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 0.5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bottomIndexBuffer);
    gl.drawElements(gl.TRIANGLES, bottomIndices.length, gl.UNSIGNED_SHORT, 0);

    //render children
    super.render(context);
  }
}


class TankRenderNode extends SGNode{
  render(context){
    //setting the model view and projection for the shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);


    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, tankVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, tankColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    //set alpha value for blending
    //TASK 1-3
    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 0.5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tankIndexBuffer);
    gl.drawElements(gl.TRIANGLES, tankIndices.length, gl.UNSIGNED_SHORT, 0);

    //render children
    super.render(context);
  }
}

class TopRenderNode extends SGNode{
  render(context){
    //setting the model view and projection for the shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);


    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, topVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, topColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    //set alpha value for blending
    //TASK 1-3
    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 0.5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, topIndexBuffer);
    gl.drawElements(gl.TRIANGLES, topIndices.length, gl.UNSIGNED_SHORT, 0);

    //render children
    super.render(context);
  }
}

class BarrelRenderNode extends SGNode{
  render(context){
    //setting the model view and projection for the shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);


    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, barrelVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, barrelColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    //set alpha value for blending
    //TASK 1-3
    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 0.5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, barrelIndexBuffer);
    gl.drawElements(gl.TRIANGLES, barrelIndices.length, gl.UNSIGNED_SHORT, 0);

    //render children
    super.render(context);
  }
}

class BulletRenderNode extends SGNode{
  render(context){
    //setting the model view and projection for the shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);


    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, bulletVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, bulletColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    //set alpha value for blending
    //TASK 1-3
    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 0.5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bulletIndexBuffer);
    gl.drawElements(gl.TRIANGLES, bulletIndices.length, gl.UNSIGNED_SHORT, 0);

    //render children
    super.render(context);
  }
}




function convertDegreeToRadians(degree) {
  return degree * Math.PI / 180
}

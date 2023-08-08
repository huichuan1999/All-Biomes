let physics;
let tailPhysics;
let stars = [];
let angStars = [];
let numStars = 3;
let particleGrabRadius = 30;

let handParticles = [];
let handAttractions = [];
const pinchThreshold = 50;
let canvas;

let draggedParticle = null;
//let lockedParticle = null; // To store the particle that is being dragged
let attraction;

function setup() {
  let canvasWidth = Math.min(windowWidth, 2400);//动态设置画布宽度
  let canvasHeight = canvasWidth/4; // 对应的高度
  canvas = createCanvas(canvasWidth, canvasHeight);
  //canvas = createCanvas(2400,600);
  canvas.id("canvas");

  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  //physics.setDrag(0.001);

  tailPhysics = new VerletPhysics2D();
  tailPhysics.setWorldBounds(new Rect(0, 0, width, height));
  let gb = new GravityBehavior(new Vec2D(0, 0.1));// add gravity to tails
  tailPhysics.addBehavior(gb);
  tailPhysics.setDrag(0.1);

  attraction = new AttractionBehavior(new Vec2D(0, 0), 500, 0.5, 0.2);//整体的环境吸引力
  physics.addBehavior(attraction);

  colorMode(HSB, 255);

  createStars();
  createTreeCell();

}

function draw() {
  clear();
  stroke(255);
  noFill();
  rect(0, 0, width, height);
  physics.update();
  tailPhysics.update();
  
  //draw hand landmarks
  if (detections != undefined) {
    if (detections.multiHandLandmarks != undefined) {

      //draw landmarks 
      drawLines([0, 5, 9, 13, 17, 0]);//palm
      drawLines([0, 1, 2, 3, 4]);//thumb
      drawLines([5, 6, 7, 8]);//index finger
      drawLines([9, 10, 11, 12]);//middle finger
      drawLines([13, 14, 15, 16]);//ring finger
      drawLines([17, 18, 19, 20]);//pinky

      drawLandmarks([0, 1], 0);//palm base
      drawLandmarks([1, 5], 60);//thumb
      drawLandmarks([5, 9], 120);//index finger
      drawLandmarks([9, 13], 180);//middle finger
      drawLandmarks([13, 17], 240);//ring finger
      drawLandmarks([17, 21], 300);//pinky
    }
  }

  drawStars();
  drawTreeCell();

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function keyPressed() {
  //press the space to reload
  if (keyCode === 32) {
    location.reload();
  }
}
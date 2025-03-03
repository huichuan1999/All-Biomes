let detections ={};
const videoElement = document.getElementById('video');

function gotHands(results) {
  detections = results;
}

// const hands = new Hands({locateFile: (file) => {
//   return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
// }});
const hands = new Hands({locateFile: (file) => {
  return `./libraries/mediapipe-hands/${file}`;
}});
hands.setOptions({
  runningMode: "VIDEO",
  delegate: "GPU",
  maxNumHands: 1, // the max number of hands
  modelComplexity: 1, //maybe change to 0
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(gotHands);


const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1920,
  height: 1920/(2.5/1)
  // width: window.innerWidth,
  // height: window.innerHeight
});
camera.start();
let stars = [];
let angStars = [];
let numStars = 3;

function createStars() {
    for (let i = 0; i < numStars; i++) {
        let centerX = random(width / 6, width - width / 6);
        let centerY = random(height / 6, height - height / 6);
        angStars.push(random(3, 7));
        let star = new Star(centerX, centerY, angStars[i], random(10, 20), random(30, 50));
        stars.push(star);
    }
}

function drawStars(){

    
  for (let star of stars) {
    star.draw();
  }

  // console.log(physics.behaviors, physics);

  //Add pinch interaction
  const landmarkIndices = [8, 4];
  const landmarkCoordinates = getLandmarkCoordinates(landmarkIndices, detections);

  if (landmarkCoordinates[8] && landmarkCoordinates[4]) {
    const distance = calculateDistance(landmarkCoordinates[8], landmarkCoordinates[4]);

    if (distance < pinchThreshold) {
      // The pinch action occurs 捏合动作发生
      const midpoint = {
        x: (landmarkCoordinates[8].x + landmarkCoordinates[4].x) / 2,
        y: (landmarkCoordinates[8].y + landmarkCoordinates[4].y) / 2
      };
      fill(255);
      noStroke();
      ellipse(midpoint.x, midpoint.y, 20, 20);

      // 更新吸引行为的中心
      attraction.setAttractor(new Vec2D(midpoint.x, midpoint.y));
      attraction.setStrength(0.1);
      //捏合交互
      // for (let star of stars) {
      //   //for (let point of star.points) { 
      //     let d = dist(midpoint.x, midpoint.y, star.centerPoint.x, star.centerPoint.y);
      //     if (d < particleGrabRadius) {
      //       // star.centerPoint.lock();
      //       // star.centerPoint.x = midpoint.x;
      //       // star.centerPoint.y = midpoint.y;
      //       // star.centerPoint.unlock();
      //       draggedParticle = star.centerPoint;
      //       draggedParticle.set(midpoint.x, midpoint.y,);
      //       //break;
      //     }
      //   //}
      // }
    }
    else {
      draggedParticle = null;
      attraction.setStrength(0); //将吸引行为设置为0
    }
  }else{
    attraction.setStrength(0);
  }

}
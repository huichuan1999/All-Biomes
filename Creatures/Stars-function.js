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
//draw tails
    for (let s of tailPhysics.springs) {
        line(s.a.x, s.a.y, s.b.x, s.b.y);
    }

}
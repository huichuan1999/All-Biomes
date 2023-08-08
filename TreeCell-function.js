let trees = [];
function createTreeCell() {
    let gridWidth = width / 2;
    let gridHeight = height / 2;//几行几列就改成几

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            let x = gridWidth * i + gridWidth / 2;
            let y = gridHeight * j + gridHeight / 2;

            let totalLevels = floor(random(2, 5));
            let branchCount = floor(random(2, 4));
            let tree = new Tree(x, y, random(20, 100), branchCount, tailPhysics, totalLevels);
            //tree.lockRoot(x, y);
            trees.push(tree);
        }
    }
}

function drawTreeCell() {

    for (let tree of trees) {
        tree.show();
    }

    for (let s of tailPhysics.springs) {
        line(s.a.x, s.a.y, s.b.x, s.b.y);
    }

    
  //If detected hand
  const allLandmarkIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const allLandmarkCoordinates = getLandmarkCoordinates(allLandmarkIndices, detections);
  for (let i = 0; i < handParticles.length; i++) {
    const index = allLandmarkIndices[i];
    if (index == 8 || index == 4) {
      continue; // // Skip keys with index 8 (index finger) or 4 (thumb)
    }
    const coord = allLandmarkCoordinates[index];
    if (coord) {
      handParticles[i].updatePosition(coord.x, coord.y);
    }
  }

  if (handParticles.length === 0) {
    addHandParticle(allLandmarkCoordinates);
  }

  for (let i = 0; i < handParticles.length; i++) {

    if (tailPhysics.behaviors.length < tailPhysics.particles.length + 19) {//记得加上Branch的排斥力behavior
      handAttractions[i].attractor.set(handParticles[i].getPosition());

      tailPhysics.addBehavior(handAttractions[i]);
    } else {

      handAttractions[i].attractor.set(handParticles[i].getPosition());
    }
  }

}
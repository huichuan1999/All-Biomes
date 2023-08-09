let trees = [];
function createTreeCell() {

  const treeCount = 5; // 假设您想要5棵树
    const spacing = width / treeCount; // 计算画布宽度与树数量之间的间距

    for (let i = 0; i < treeCount; i++) {
        let x = spacing * i + spacing / 2; // 计算每棵树的x坐标
        let y = height+50; // 将y设置为画布的底部减去100的偏移量

        let totalLevels = floor(random(2, 5));
        let branchCount = floor(random(2, 4));
        let tree = new Tree(x, y, random(50, 100), branchCount, tailPhysics, totalLevels);
        trees.push(tree);
    }


  //创建一个网格的tree
    // let gridWidth = width / 2;
    // let gridHeight = height / 2;//几行几列就改成几

    // for (let i = 0; i < 2; i++) {
    //     for (let j = 0; j < 2; j++) {
    //         let x = gridWidth * i + gridWidth / 2;
    //         let y = gridHeight * j + gridHeight / 2;

    //         let totalLevels = floor(random(2, 5));
    //         let branchCount = floor(random(2, 4));
    //         let tree = new Tree(x, y, random(20, 100), branchCount, tailPhysics, totalLevels);
    //         //tree.lockRoot(x, y);
    //         trees.push(tree);
    //     }
    // }
}

function drawTreeCell() {

    for (let tree of trees) {
        tree.show();
    }

    for (let s of tailPhysics.springs) {
        line(s.a.x, s.a.y, s.b.x, s.b.y);
    }

}
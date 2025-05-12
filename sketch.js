let facemesh;
let video;
let predictions = [];
const pointsToConnect = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 
  375, 291
];

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0); // 紅色線條
    strokeWeight(5); // 線條粗細為 5

    // 使用 line 指令將所有點串接在一起
    for (let i = 0; i < pointsToConnect.length - 1; i++) {
      const [x1, y1] = keypoints[pointsToConnect[i]];
      const [x2, y2] = keypoints[pointsToConnect[i + 1]];
      line(x1, y1, x2, y2);
    }

    // 將最後一個點與第一個點連接，形成閉合的形狀
    const [xStart, yStart] = keypoints[pointsToConnect[0]];
    const [xEnd, yEnd] = keypoints[pointsToConnect[pointsToConnect.length - 1]];
    line(xEnd, yEnd, xStart, yStart);
  }
}

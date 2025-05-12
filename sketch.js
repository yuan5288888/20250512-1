let facemesh;
let video;
let predictions = [];
const pointsToConnect = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 
  375, 291
];

const additionalPointsToConnect = [
  133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155
];

const newPointsToConnect = [
  263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249
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

    // 繪製第一組點
    for (let i = 0; i < pointsToConnect.length - 1; i++) {
      const [x1, y1] = keypoints[pointsToConnect[i]];
      const [x2, y2] = keypoints[pointsToConnect[i + 1]];
      line(x1, y1, x2, y2);
    }
    const [xStart, yStart] = keypoints[pointsToConnect[0]];
    const [xEnd, yEnd] = keypoints[pointsToConnect[pointsToConnect.length - 1]];
    line(xEnd, yEnd, xStart, yStart);

    // 繪製新增的點集
    for (let i = 0; i < additionalPointsToConnect.length - 1; i++) {
      const [x1, y1] = keypoints[additionalPointsToConnect[i]];
      const [x2, y2] = keypoints[additionalPointsToConnect[i + 1]];
      line(x1, y1, x2, y2);
    }
    const [xStart2, yStart2] = keypoints[additionalPointsToConnect[0]];
    const [xEnd2, yEnd2] = keypoints[additionalPointsToConnect[additionalPointsToConnect.length - 1]];
    line(xEnd2, yEnd2, xStart2, yStart2);

    // 繪製新加入的點集
    for (let i = 0; i < newPointsToConnect.length - 1; i++) {
      const [x1, y1] = keypoints[newPointsToConnect[i]];
      const [x2, y2] = keypoints[newPointsToConnect[i + 1]];
      line(x1, y1, x2, y2);
    }
    const [xStart3, yStart3] = keypoints[newPointsToConnect[0]];
    const [xEnd3, yEnd3] = keypoints[newPointsToConnect[newPointsToConnect.length - 1]];
    line(xEnd3, yEnd3, xStart3, yStart3);
  }
}

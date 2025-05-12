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
  video = createCapture(VIDEO);
  video.size(640, 480);
  createCanvas(640, 480);
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
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0);
    strokeWeight(5);

    const drawLines = (points) => {
      for (let i = 0; i < points.length - 1; i++) {
        if (keypoints[points[i]] && keypoints[points[i + 1]]) {
          const [x1, y1] = keypoints[points[i]];
          const [x2, y2] = keypoints[points[i + 1]];
          line(x1, y1, x2, y2);
        }
      }
      if (keypoints[points[0]] && keypoints[points[points.length - 1]]) {
        const [xStart, yStart] = keypoints[points[0]];
        const [xEnd, yEnd] = keypoints[points[points.length - 1]];
        line(xEnd, yEnd, xStart, yStart);
      }
    };

    drawLines(pointsToConnect);
    drawLines(additionalPointsToConnect);
    drawLines(newPointsToConnect);
  }
}

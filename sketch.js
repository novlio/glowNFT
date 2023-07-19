P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 10,
  quality: 0.6,
});
let img;
let t = 0; // time variable
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // create initial canvas
  canvas.parent('canvasContainer');
  background(200);
}

function draw() {
  if (img) {
    let r = map(sin(t), -1, 1, 0, 255);
    let g = map(sin(t + PI/2), -1, 1, 0, 255);
    let b = map(sin(t + PI), -1, 1, 0, 255);
    tint(r, g, b); // apply a slow, oscillating color tint to the image

    image(img, 0, 0, width, height);
  
    let x = random(width);
    let y = random(height);
    let c = get(x, y);
    fill(c);
    noStroke();
    ellipse(x, y, 5);

    t += 0.035; // increase time
  }
}

function loadNewImage() {
  let url = document.getElementById('imgUrl').value;
  loadImage(url, newImg => {
    img = newImg;
    let imgAspectRatio = img.width / img.height;
    let windowAspectRatio = windowWidth / windowHeight;
    if (imgAspectRatio > windowAspectRatio) {
      // If image is wider than the window, fit to window width
      img.resize(windowWidth, 0);
    } else {
      // If image is taller than the window, fit to window height
      img.resize(0, windowHeight);
    }
    resizeCanvas(img.width, img.height); // resize canvas to match image size
  });
}

// you can put it in the mousePressed function,
// or keyPressed for example
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}

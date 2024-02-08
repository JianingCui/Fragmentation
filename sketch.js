let img;
let cols = 50;
let rows = 50;
let imgPieces = [];

function preload() {
  //img = loadImage('01.png');
  img = loadImage('02.jpeg');
  //img = loadImage('03.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 计算等比缩放后的图片宽度和高度
  let scaleFactor = width / img.width;
  let scaledWidth = img.width * scaleFactor * 0.6;
  let scaledHeight = img.height * scaleFactor * 0.6;

  // 计算图片在画布中央的位置
  let x = (width - scaledWidth) / 2;
  let y = (height - scaledHeight) / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let w = scaledWidth / cols;
      let h = scaledHeight / rows;

      let piece = img.get(i * (img.width / cols), j * (img.height / rows), img.width / cols, img.height / rows);
      imgPieces.push(new ImagePiece(x + i * w, y + j * h, w, h, piece));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < imgPieces.length; i++) {
    imgPieces[i].move();
    imgPieces[i].display();
  }
}

class ImagePiece {
  constructor(x, y, w, h, imgPiece) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgPiece = imgPiece;
    this.horizontalMove = random(0, 1) > 0.5;
    this.xSpeed = random(-0.1, 0.1);
    this.ySpeed = random(-0.1, 0.1);
  }

  display() {
    image(this.imgPiece, this.x, this.y, this.w, this.h);
  }

  move() {
    if (this.horizontalMove) {
      this.x += this.xSpeed;

      if (this.x < 0 || this.x > width - this.w) {
        this.xSpeed *= -1;
      }
    } else {
      this.y += this.ySpeed;

      if (this.y < 0 || this.y > height - this.h) {
        this.ySpeed *= -1;
      }
    }
  }
}

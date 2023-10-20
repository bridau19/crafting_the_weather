// hierarchy: snow, rain, sun, wind, cloud

// index = 0: pop art sun glare
// index = 1: epileptic snow
// index = 2: make it rain
// index = 3: windy hex
// index = 4: perlin clouds

let index;

async function getWeather() {
  let response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,rain,snowfall,cloudcover,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=1"
  );
  let data = await response.json();

  let temp = data.current.temperature_2m;
  document.querySelector("#temp").textContent = temp;

  is_day = data.current.is_day;
  cloud = data.current.cloudcover;
  snowfall = data.current.snowfall;
  rain = data.current.rain;
  wind = data.current.windspeed_10m;

  if ((is_day = 1)) {
    document.body.style.backgroundColor = "#e4ebf0";
    document.body.style.color = "#454457";
  } else {
    document.body.style.backgroundColor = "#454457";
    document.body.style.color = "#e4ebf0";
  }

  if (snowfall) {
    index = 1;
    document.querySelector("#weather").textContent = "snowy";
  } else if (rain) {
    index = 2;
    document.querySelector("#weather").textContent = "rainy";
  } else if (cloud <= 30) {
    index = 0;
    document.querySelector("#weather").textContent = "sunny";
  } else if (wind >= 7) {
    index = 3;
    document.querySelector("#weather").textContent = "windy";
  } else if (cloud > 30) {
    index = 4;
    document.querySelector("#weather").textContent = "cloudy";
  } else {
    index = 4;
    document.querySelector("#weather").textContent = "beautiful";
  }

  let selection = document.getElementById("feeling");

  if (selection.value != 5) {
    index = selection.value;
  }

  if (index == 0) {
    // pop art sun glare
    const s = (sketch) => {
      let w = sketch.min(sketch.windowWidth, sketch.windowHeight);
      let x = w / 2;
      let y = w / 2;

      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      };

      sketch.draw = () => {
        let s = sketch.random(w / 2);
        sketch.background(250, 130, 110);
        sketch.noStroke();
        sketch.fill(255, 190, 0, sketch.random(80, 255));
        sketch.ellipse(x, y, s, s);
        sketch.ellipse(x, y, s * 2, s * 2);
        sketch.ellipse(
          x,
          y,
          s + sketch.random(w / 2),
          s + sketch.random(w / 2)
        );
        sketch.frameRate(4);
      };
    };
    let myp5 = new p5(s, "p5sketch");
    document.getElementById("submit").addEventListener("click", function () {
      document.getElementById(myp5.canvas.id).remove();
    });
  } else if (index == 1) {
    // epileptic snow
    const s = (sketch) => {
      let w = sketch.min(sketch.windowWidth, sketch.windowHeight);

      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      };

      sketch.draw = () => {
        sketch.background(110, 100, 140);
        sketch.noStroke();
        sketch.fill(255, 255, 255, sketch.random(20, 255));
        let x = sketch.random(w);
        let y = sketch.random(w);
        let s = sketch.random(w / 4);
        sketch.ellipse(x, y, s, s);
        sketch.ellipse(x + sketch.random(w), y + sketch.random(w), s, s);
        sketch.ellipse(x + sketch.random(w), y + sketch.random(w), s, s);
        sketch.ellipse(x + sketch.random(w), y + sketch.random(w), s, s);
        sketch.ellipse(x + sketch.random(w), y + sketch.random(w), s, s);
        sketch.ellipse(x + sketch.random(w), y + sketch.random(w), s, s);
        sketch.ellipse(x + sketch.random(w), y + sketch.random(w), s, s);

        sketch.frameRate(20);

        sketch.stroke(255, 95, 0);
        sketch.strokeWeight(2);
        sketch.noFill();
      };
    };
    let myp5 = new p5(s, "p5sketch");
    document.getElementById("submit").addEventListener("click", function () {
      document.getElementById(myp5.canvas.id).remove();
    });
  } else if (index == 2) {
    // make it rain
    const s = (sketch) => {
      let w = sketch.min(sketch.windowWidth, sketch.windowHeight);
      let rainDrops = 100;
      let rainDrop = [];

      class Rain {
        constructor() {
          this.x = sketch.random(sketch.width);
          this.y = sketch.random(-sketch.windowHeight, -100);
          this.size = 85;
          this.speed = sketch.random(3, 15);
        }

        // Add a method to display raindrops
        show() {
          sketch.stroke(161, 184, 202);
          sketch.strokeWeight(4);
          sketch.line(this.x, this.y, this.x, this.y + this.size);
        }

        // Add a method to make rain fall
        shower() {
          this.y = this.y + this.speed;

          if (this.y > sketch.height) {
            this.y = sketch.random(-sketch.windowHeight, -100);
            // Update x-position to follow mouseX for a smaller waterfall effect
            if (sketch.mouseX >= 50 && sketch.mouseX <= sketch.width - 50) {
              this.x = sketch.random(sketch.mouseX - 50, sketch.mouseX + 50);
            } else {
              this.x = sketch.random(sketch.width);
            }
          }
        }
      }

      function updateRainDrops() {
        for (let i = 0; i < rainDrops; i++) {
          rainDrop[i].show();
          rainDrop[i].shower();
        }
      }

      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);

        for (let i = 0; i < rainDrops; i++) {
          rainDrop[i] = new Rain();
        }
      };

      sketch.draw = () => {
        sketch.draw = () => {
          sketch.background(220, 234, 250);
          updateRainDrops();
        };
      };
    };
    let myp5 = new p5(s, "p5sketch");
    document.getElementById("submit").addEventListener("click", function () {
      document.getElementById(myp5.canvas.id).remove();
    });
  } else if (index == 3) {
    // windy hex
    const s = (sketch) => {
      let w = sketch.min(sketch.windowWidth, sketch.windowHeight);
      let s = 400;
      let growAmount = 1;
      let grow = true;
      let hexx = 100;
      let hexy = 200;
      let hexSpeedX = 1;
      let hexSpeedY = 1;
      let gridWidth = sketch.windowWidth;
      let gridHeight = sketch.windowHeight;
      let hexagonSize = w / 10;

      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      };

      function makeGrid() {
        let count = 0;
        for (y = 0; y < gridHeight; y += hexagonSize / 2.3) {
          for (x = 0; x < gridWidth; x += hexagonSize * 1.5) {
            drawHexagon(
              x + hexagonSize * (count % 2 == 0) * 0.75,
              y,
              hexagonSize / 2
            );
          }
          count++;
        }
      }

      function drawHexagon(cX, cY, r) {
        sketch.beginShape();
        for (let a = 0; a < sketch.TAU; a += sketch.TAU / 6) {
          sketch.vertex(cX + r * sketch.cos(a), cY + r * sketch.sin(a));
        }
        sketch.endShape(sketch.CLOSE);
      }

      sketch.draw = () => {
        sketch.background(65, 105, 225);
        sketch.noStroke();
        sketch.fill(176, 196, 222, 80);

        drawHexagon(hexx, hexy, s);

        if (hexx > sketch.width - 50) {
          hexSpeedX = -3;
          hexSpeedY = sketch.random(-3, 5);
        } else if (hexx < 50) {
          hexSpeedX = 3;
          hexSpeedY = sketch.random(-3, 10);
        }

        if (hexy > sketch.height - 50) {
          hexSpeedY = -3;
          hexSpeedX = sketch.random(-3, 5);
        } else if (hexy < 50) {
          hexSpeedY = 3;
          hexSpeedX = sketch.random(-3, 10);
        }

        hexx = hexx + hexSpeedX;
        hexy = hexy + hexSpeedY;

        if (s > w / 2) {
          grow = false;
        }
        if (s < w / 16) {
          grow = true;
        }

        if (grow == true) {
          s += growAmount;
        } else {
          s -= growAmount;
        }

        sketch.stroke(176, 196, 222);
        sketch.strokeWeight(1);
        sketch.noFill();

        makeGrid();
      };
    };
    let myp5 = new p5(s, "p5sketch");
    document.getElementById("submit").addEventListener("click", function () {
      document.getElementById(myp5.canvas.id).remove();
    });
  } else if (index == 4) {
    // perlin clouds
    const s = (sketch) => {
      let w = sketch.min(sketch.windowWidth, sketch.windowHeight);

      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      };

      sketch.draw = () => {
        sketch.colorMode(sketch.HSB);
        sketch.noStroke();

        for (var i = 0; i < 200; i++) {
          for (var j = 0; j < 200; j++) {
            var ran = sketch.noise(i / 30, j / 20);
            var col = sketch.map(ran, 0, 1, 0, 100);
            sketch.fill(220, col, 100);
            sketch.rect(i * 8, j * 8, 8, 8);
          }
        }
      };
    };
    let myp5 = new p5(s, "p5sketch");
    document.getElementById("submit").addEventListener("click", function () {
      document.getElementById(myp5.canvas.id).remove();
    });
  }
}
getWeather();

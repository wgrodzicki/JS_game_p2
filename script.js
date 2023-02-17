const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1920;
const CANVAS_HEIGHT = canvas.height = 1080;
let gameSpeed = 5; // Set the speed of the backgrounds

const slider = document.getElementById("slider"); // Get the slider from HTML
slider.value = gameSpeed; // Set initial slider value to gameSpeed
const showGameSpeed = document.getElementById("showGameSpeed"); // Get the span element from HTML (inside the text showing gameSpeed)
showGameSpeed.innerHTML = gameSpeed; // Set initial span to the gameSpeed
slider.addEventListener("change", function(event) { // React when user clicks on the slider
    gameSpeed = event.target.value; // Set gameSpeed to the slider value
    showGameSpeed.innerHTML = gameSpeed; // Display gameSpeed in the span element
});

// Get 5 background layers
const backgroundLayer1 = new Image(); // Create a new <img> element in HTML
backgroundLayer1.src = "resources/1_sky.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "resources/2_ruins.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "resources/3_hills&trees.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "resources/4_ruins2.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "resources/5_ruins.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "resources/6_statue.png";
const backgroundLayer7 = new Image();
backgroundLayer7.src = "resources/7_stones&grass.png";

// Execute the code only when all elements have fully loaded
window.addEventListener("load", function() {
    class Layer { // New class (blueprint for objects)
        constructor(image, speedModifier) {
            this.x = 0; // Horizontal coordinate
            this.y = 0; // Vertical coordinate
            this.width = 1920; // Width of the image
            this.height = 1080; // Height of the image
            this.image = image; // Set this property to the argument passed to the constructor
            this.speedModifier = speedModifier; // Set this property to the argument passed to the constructor
            this.speed = gameSpeed * this.speedModifier; // This will allow to pass different speedModifier to each object (layer)
        } // Obligatory method to create new objects with properties for those objects
        update() { // Method to loop the images next to each other
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) { // When the 1st image has passed completely
                this.x = 0; // Set it to initial position (2nd image will fill the gap)
            }
            this.x = this.x - this.speed; // Move both images accounting for gameSpeed
        }
        draw() { // Draw both images at their coordinates
            context.drawImage(this.image, this.x, this.y, this.width, this.height); // 1st image starts at position 0
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); // 2nd image is just next to it
        }
    }
    
    // Create layers using the class above
    const layer1 = new Layer(backgroundLayer1, 0.4);
    const layer2 = new Layer(backgroundLayer2, 0.5);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.7);
    const layer5 = new Layer(backgroundLayer5, 0.8);
    const layer6 = new Layer(backgroundLayer6, 0.9);
    const layer7 = new Layer(backgroundLayer7, 1.0);
    
    const backgrounds = [layer1, layer2, layer3, layer4, layer5, layer6, layer7]; // Put all layers in one array
    
    // Create animation loop that draws images with every frame
    function animate() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clear previous image to avoid overlapping
        // Use custom class methods to update and draw each layer
        for (let i = 0; i < backgrounds.length; i++) {
            backgrounds[i].update();
            backgrounds[i].draw();
        }
        requestAnimationFrame(animate); // Call the parent function recursively, looping the animation
    }
    animate();
});
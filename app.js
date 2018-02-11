
var DAMPING = 0.999;
function Particle(x, y) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
}
Particle.prototype.integrate = function () {
    var velocityX = (this.x - this.oldX) * DAMPING;
    var velocityY = (this.y - this.oldY) * DAMPING;
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += velocityX;
    this.y += velocityY;
};
Particle.prototype.attract = function (x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    this.x += dx / distance;
    this.y += dy / distance;
};
Particle.prototype.draw = function () {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
};
var display = document.getElementById('display');
var ctx = display.getContext('2d');
var particles = [];
var width = display.width = window.innerWidth;
var height = display.height = window.innerHeight;
var mouse = { x: width * 0.5, y: height * 0.5 };
for (var i = 0; i < 200; i++) {
    particles[i] = new Particle(Math.random() * width, Math.random() * height);
}
display.addEventListener('mousemove', onMousemove);
function onMousemove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
requestAnimationFrame(frame);
function frame() {
    requestAnimationFrame(frame);
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
        particles[i].attract(mouse.x, mouse.y);
        particles[i].integrate();
        particles[i].draw();
    }
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('nav').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('nav').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}
var layoutMobile = false;
var contentWrap = document.getElementById("contentWrap");
var detailsUl = document.getElementById("detailsUl");
var maxSlider = 0;
var countSlider = 0;
window.onload = function(){
  if(window.innerWidth < 1000){
    layoutMobile = true;
  } else {
    layoutMobile = false;
  }
}

window.onresize = function(){
  if(window.innerWidth < 1000){
    layoutMobile = true;
  } else {
    layoutMobile = false;
    detailsDefault();
  }
};


function detailsDefault(){
  var btn = document.getElementById("openMobile").children[0];
  var arrow = btn.children[0];
  arrow.setAttribute("class", "cw0 trans5");
  btn.setAttribute("onclick", "showDetails('open', this)");
  contentWrap.setAttribute("style", " ");
  detailsUl.setAttribute("style", " ");
}


function showDetails(c, t){
  if(c === 'open'){
    t.setAttribute("onclick", "showDetails('close', this)");
    t.children[0].setAttribute("class", "cw180 trans5");
    contentWrap.style.height = 0;
    detailsUl.style.height = "auto";
  } else {
    t.setAttribute("onclick", "showDetails('open', this)");
    t.children[0].setAttribute("class", "cw0 trans5");
    contentWrap.style.height = "60%";
    detailsUl.style.height = 0;
  }
}

function popPreview(c,n, t){
  var num = n;
  t.setAttribute("onclick", " ");
  var wr = document.getElementById("holder");
  if(c === "open"){
    sliderPreview(num);
    wr.style.opacity = "1";
    setTimeout(function(){
      wr.setAttribute("class", "trans5 displayFlex");
    },600);
  } else {
    clearSlider();
    wr.style.opacity = "0";
    setTimeout(function(){
      wr.setAttribute("class", "trans5 displayNone");
    },600);
  }
  setTimeout(function(){
    t.setAttribute("onclick", "popPreview('"+c+"',"+n+", this)");
  },1000);
}

function sliderPreview(n){
  var slider = document.getElementById('sliderWrapper'),
      bullets = document.getElementById('bulletsSlider'),
      nextBtn = 0,
      prevBtn = 0,
      wLi = 100 / n,
      wBullets = n * 40,
      leftBullets = wBullets/2;
  maxSlider = n * 100;
  slider.style.width = maxSlider + "%";
  bullets.style.width = wBullets + "px";
  bullets.style.left = "calc(50% - " + leftBullets + "px";
  for (var i = 0; i < n; i++) {
    var slide = document.createElement("LI"),
        bullet = document.createElement("LI"),
        span = document.createElement("SPAN");
    span.setAttribute("class", "displayFlex trans5");
    bullet.setAttribute("onclick", "bulletSlider("+i+")");
    bullet.appendChild(span);
    slide.setAttribute("class", "slide");
    slide.style.width = wLi+"%";
    slider.appendChild(slide);
    bullets.appendChild(bullet);
  }
}


function arrowsSlider(c){
  var slider = document.getElementById('sliderWrapper');
  var maxToSlide = maxSlider - 100;
  if(c === 'next'){
    countSlider += 100;
    if(countSlider >= maxSlider) countSlider = 0;
    slider.style.left = "-"+countSlider+"%";
  } else {
    countSlider -= 100;
    if(countSlider < 0) countSlider = maxToSlide;
    slider.style.left = "-"+countSlider+"%";
  }
}

function bulletSlider(n){
  var slider = document.getElementById('sliderWrapper');
  slider.style.left = "-"+(n*100)+"%";
  countSlider = n * 100;
}

function clearSlider(){
  var slider = document.getElementById('sliderWrapper');
  var bullets = document.getElementById('bulletsSlider');
  slider.setAttribute("style", " ");
  slider.innerHTML = null;
  bullets.innerHTML = null;
  countSlider = 0;
  maxSlider = 0;
}

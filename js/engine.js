/* -------------------------------------------
version: 1.0
last modified: 03.07.2018
author: Joshua Sirianni
-------------------------------------------- */

//ANIMATIONS//
//----initialize some properties//

//----set default state of wordmark//
anime({
  targets: '.wordmark',
  width: '80vw',
  top: '40vh',
  left: '10vw',
  duration: 0,
  opacity: 1
});

//----set default state of curtain//
/*  targets: '.curtain',
  opacity: 0,
  delay: 2500,
  duration: 500,
  easing: 'easeInOutSine'
});

anime({
  targets: '.curtain',
  delay: 2500,
  duration: 1,
  top: '100vh',
});*/


//----main wordmark animation timeline//
var wordmarkTimeline = anime.timeline();
wordmarkTimeline

//----draw outline//
.add ({
  targets: '.outline',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 300,
  delay: function(el, i) { return i * 120 },
  direction: 'alternate',
  loop: false
})

//----draw fill//
.add ({
  targets: '.fill',
  strokeDashoffset: {
    value: [anime.setDashoffset, 0],
    duration: 300,
    delay: function(el, i, t) { return 400 + ( i * 125 ); },
    easing: 'easeOutQuart',
  },
  stroke: {
    value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
    duration: 300,
	delay: 300,
    easing: 'easeInQuad'
  },
  offset: 0
})

//----shrink animation div to final size//
.add ({
  targets: '#wordmark-animation-line',
  width: '200px',
  duration: 150,
  easing: 'easeInOutSine'
})

//----move wordmark to final position in nav//
.add ({
  targets: '.wordmark',
  top: '30px',
  duration: 150,
  easing: 'easeInOutSine',
  opacity: [
  { value: 0, delay: 50, easing:'easeInOutSine'}
]
})
.add({
  targets: '.curtain',
  opacity: 0,
  duration: 500,
  easing: 'easeInOutSine'
})
.add({
  targets: '.curtain',
  duration: 1,
  width: '0vw',
  height: '0vh'
});

//SMOOTHSCROLL TRANSITION//
$(function(){
  'use strict';
  var $page = $('#main'),
      options = {
        debug: false,
        prefetch: true,
        cacheLength: 0,
        blacklist: ".nosmooth",
        onStart: {
          duration: 800, // Duration of our animation
          render: function ($container) {
            // CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        },
        onAfter:function($container) {
          $container.onPageLoad();
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});

//RELOAD WRAPPER (Any Script inside this function will reload following page transition)//
(function($) {
  $.fn.onPageLoad = function() {

      $('.materialboxed').materialbox();

    //FULLPAGE

    //----Check if fullpage needs to be reloaded
    if (typeof $.fn.fullpage.destroy == 'function') {
        $.fn.fullpage.destroy('all');
    }

    //----Fullpage Configuration
      $('#fullpage').fullpage({

        dragAndMove: true,
        dragAndMoveKey: 'am9zaHVhc2lyaWFubmkuY29tXzJBdlpISmhaMEZ1WkUxdmRtVT1TeEE=',

        //----Navigation
        anchors: ['project1', 'project2', 'project3', 'project4'],
        sectionsColor: ['white', 'white', 'white', 'white'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['International Car Sales', 'Second page', 'Third and last page'],

        //----Scrolling
        scrollingSpeed: 800,
        easingcss3: 'cubic-bezier(.42, 0, .58, 1)',
        loopBottom: true
      });


//NAVIGATION ANIMATIONS//

var navCubeHome = document.querySelector('.nav-cube-white');

var navCubeHomeAnimation = anime({
  targets: navCubeHome,
  scale: 4,
	rotate: 90,
  duration: 600,
  autoplay: false
});

function enterButton() {
  if (navCubeHomeAnimation.reversed) navCubeHomeAnimation.reverse();
  navCubeHomeAnimation.play();
}

function leaveButton() {
  if (!navCubeHomeAnimation.reversed) navCubeHomeAnimation.reverse();
  navCubeHomeAnimation.play();
}

navCubeHome.addEventListener('mouseenter', enterButton, false);
navCubeHome.addEventListener('mouseleave', leaveButton, false);

var navCubeAbout = document.querySelector('.nav-cube-black');

var navcubeAboutAnimation = anime({
  targets: navCubeAbout,
  scale: 4,
	rotate: -90,
  duration: 600,
  autoplay: false,
	background: '#000'
});

  function enterButton2() {
    if (navcubeAboutAnimation.reversed) navcubeAboutAnimation.reverse();
    navcubeAboutAnimation.play();
  }

  function leaveButton2() {
    if (!navcubeAboutAnimation.reversed) navcubeAboutAnimation.reverse();
    navcubeAboutAnimation.play();
  }

  navCubeAbout.addEventListener('mouseenter', enterButton2, false);
  navCubeAbout.addEventListener('mouseleave', leaveButton2, false);



//PARALLAX INTERACTION/////////////////////////////////////////////////

  var scene = document.getElementById('p1scene');
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });

  var scene = document.getElementById('p2scene');
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });

  var scene = document.getElementById('p3scene');
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });

  var scene = document.getElementById('p4scene');
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });

  window.onscroll = function() {
    $('#element:visible').attr("src", "../img/support3-myr.gif");
  }
  window.onscroll = function() {
    $('#element2:visible').attr("src", "../img/support4-sb.gif");
  }

};
}(jQuery));

//call plug-ins function when page loads
$(document).ready(function() {
  $('body').onPageLoad();
});

var Banner = function() {

    function get(element) {
      return document.getElementById(element);
    }

    var that = this,
        container = get('container'),
        speedLine = get('speedline'),
        common = get('common'),
        elipseBg = get('elipse-background'),
        note1 = get('note1'),
        text1 = get('text1'),
        elipse2 = get('elipse2'),
        text2 = get('text2'),
        elipse3 = get('frame3_elipse'),
        conditions = get('conditions'),
        resetArrow = get('resetArrow'),
        resetCont = get('resetCont');

    var showFrame = function(id) {
      console.log('Showing frame ' + id);
        switch(id) {

            case 1:
              hide(elipse3, 0.1)
              hide(conditions, 0.05)
              hide(resetCont, 0.1)
              show(elipseBg, 0.15)
              show(speedLine, 0.5)
              show(note1, 0.15)
              show(text1, 0.2)
              show(common, 0.2)
              holdFrame(2, 5)
              break;

            case 2:
              hide(note1, 0.1)
              hide(text1, 0.1)
              show(elipse2, 0.1)
              show(text2, 0.1)
              holdFrame(3, 5)
              break;

            case 3:
              hide(elipse2, 0.1)
              hide(text2, 0.1)
              show(elipse3, 0.1)
              show(conditions, 0.05)
              show(resetCont, 2.2)
              holdFrame(4, 5)
              break;
        }

      resetCont.addEventListener("click", function(event) {
         showFrame(1);
      });

    }

    function setClass(element, time, state) {
        var delay = time * 1000;
        window.setTimeout(function(){
            element.className = state;
        }, delay);
    }

    function show(element, time) {
        setClass(element, time, "show");
    }

    function hide(element, time) {
        setClass(element, time, "hide");
    }

    var holdFrame = function(frame, time) {
        var delay = time * 1000;
        window.setTimeout(function(){
          showFrame(frame);
        }, delay);
    }

    this.init = function() {
        showFrame(1);
    };

    resetCont.addEventListener('mouseover', function(event) {
      TweenLite.to(resetArrow, 0.5, {css:{rotation: '-180deg'}});
    });
    resetCont.addEventListener('mouseout', function(event) {
      TweenLite.to(resetArrow, 0.5, {css:{rotation: '180deg'}});
    });

    function reset() {
        container.replaceChild(_resetCont, resetCont);
        resetCont = get('resetCont');
        setElements();
        that.showFrame(1);
    }

};

var myBanner = new Banner;

window.onload = function() {
  if (Enabler.isInitialized()) {
      enablerInitHandler();
  } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT,
enablerInitHandler);
  }
}

function enablerInitHandler() {
    myBanner.init();
}

function getOpacity(element) {
    if(element.currentStyle) {
        return element.currentStyle['opacity'];
    } else if(getComputedStyle(element)) {
        return getComputedStyle(element).opacity;
    }
}

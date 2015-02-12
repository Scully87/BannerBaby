var Banner = function() {

  function get(element) {
    return document.getElementById(element);
  }

  var container = get('container'),
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

    this.showFrame = function(id) {
      console.log('Showing frame ' + id);
        switch(id) {

            case 1:
              show(elipseBg, 0.15)
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
              hide(elipseBg, 0.01)
              show(elipse3, 0.1)
              show(conditions, 0.05)
              show(resetCont, 2.2)
              holdFrame(4, 5)
              break;
        }
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

    var that = this;
    var holdFrame = function(frame, time) {
        var delay = time * 1000;
        window.setTimeout(function(){
            that.showFrame(frame);
        }, delay);
    }

    this.init = function() {
        this.showFrame(1);
    };

  resetCont.addEventListener('mouseover', function(event) {
    TweenLite.to(resetArrow, 0.5, {css:{rotation: '-180deg'}});
  });
  resetCont.addEventListener('mouseout', function(event) {
    TweenLite.to(resetArrow, 0.5, {css:{rotation: '180deg'}});
  });

};

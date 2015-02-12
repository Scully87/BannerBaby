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

    var showFrame = function(id) {
      console.log('Showing frame ' + id);
        switch(id) {

            case 1:
              hide(elipse3, 0.1)
              hide(conditions, 0.05)
              hide(resetCont, 0.1)
              show(elipseBg, 0.15)
              show(note1, 0.15)
              show(text1, 0.2)
              show(common, 0.2)
              holdFrame(2, 5)
              break;

            case 2:
              hide(elipseBg, 0.01)
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

    function storeElementData(element, arr) {

            arr = typeof arr !== "undefined" ? arr : [];
            arr["id"] = element.id;
            if(element.currentStyle) {

            arr["style"] =  {
                              top: element.currentStyle['top'],
                              left: element.currentStyle['left'],
                              height: element.currentStyle['height']
                            };

            } else if(getComputedStyle(element)) {

            arr["style"] =  {
                              top: getComputedStyle(element).top,
                              left: getComputedStyle(element).left,
                              height: getComputedStyle(element).height,
                              opacity: getComputedStyle(element).opacity
                            };
            }

            if (element.children.length > 0) {
                    arr["children"] = [];
                    for(var i = 0; i < element.children.length; i++) {
                            arr["children"][i] = storeElementData(element.children[i], arr["children"][i]);
                    }
            }

            return arr;
    }

    function reset(arr) {

            if(arr["id"] !== "") {
              var style = "";
              for(var prop in arr["style"]) {
                  style += prop + ":" + arr["style"][prop] + ";";
              }
              TweenLite.killTweensOf(arr['id']);
              document.getElementById(arr["id"]).setAttribute("style", style);
            }
            if(arr["children"]) {
                for (var i = 0; i < arr["children"].length; i++) {
                  reset(arr["children"][i]);
                }
            }
    }

};


//initializing new banner
var myBanner = new Banner;

// If true, start function. If false, listen for INIT.
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

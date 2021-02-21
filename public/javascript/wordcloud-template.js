WordCloud(document.getElementById("my_canvas"), { list: list });

//What is word cloud
var WordCloud = function WordCloud(elements, options) {
  if (!isSupported) {
    return;
  }
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  elements.forEach(function (el, i) {
    if (typeof el === "string") {
      elements[i] = document.getElementById(el);
      if (!elements[i]) {
        throw new Error("The element id specified is not found.");
      }
    } else if (!el.tagName && !el.appendChild) {
      throw new Error(
        "You must pass valid HTML elements, or ID of the element."
      );
    }
  });

  var start = function start() {
    // For dimensions, clearCanvas etc.,
    // we only care about the first element.
    var canvas = elements[0];
    if (canvas.getContext) {
      ngx = Math.ceil(canvas.width / g);
      ngy = Math.ceil(canvas.height / g);
    } else {
      var rect = canvas.getBoundingClientRect();
      ngx = Math.ceil(rect.width / g);
      ngy = Math.ceil(rect.height / g);
    }
    // Sending a wordcloudstart event which cause the previous loop to stop.
    // Do nothing if the event is canceled.
    if (!sendEvent("wordcloudstart", true)) {
      return;
    }
    // Determine the center of the word cloud
    center = settings.origin
      ? [settings.origin[0] / g, settings.origin[1] / g]
      : [ngx / 2, ngy / 2];
    // Maxium radius to look for space
    maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));
    /* Clear the canvas only if the clearCanvas is set,
       if not, update the grid to the current canvas state */
    grid = [];
    var gx, gy, i;
    if (!canvas.getContext || settings.clearCanvas) {
      elements.forEach(function (el) {
        if (el.getContext) {
          var ctx = el.getContext("2d");
          ctx.fillStyle = settings.backgroundColor;
          ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
          ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
        } else {
          el.textContent = "";
          el.style.backgroundColor = settings.backgroundColor;
          el.style.position = "relative";
        }
      });
      /* fill the grid with empty state */
      gx = ngx;
      while (gx--) {
        grid[gx] = [];
        gy = ngy;
        while (gy--) {
          grid[gx][gy] = true;
        }
      }
    } else {
      /* Determine bgPixel by creating
         another canvas and fill the specified background color. */
      var bctx = document.createElement("canvas").getContext("2d");
      bctx.fillStyle = settings.backgroundColor;
      bctx.fillRect(0, 0, 1, 1);
      var bgPixel = bctx.getImageData(0, 0, 1, 1).data;
      /* Read back the pixels of the canvas we got to tell which part of the
         canvas is empty.
         (no clearCanvas only works with a canvas, not divs) */
      var imageData = canvas
        .getContext("2d")
        .getImageData(0, 0, ngx * g, ngy * g).data;
      gx = ngx;
      var x, y;
      while (gx--) {
        grid[gx] = [];
        gy = ngy;
        while (gy--) {
          y = g;
          /* eslint no-labels: ["error", { "allowLoop": true }] */
          singleGridLoop: while (y--) {
            x = g;
            while (x--) {
              i = 4;
              while (i--) {
                if (
                  imageData[((gy * g + y) * ngx * g + (gx * g + x)) * 4 + i] !==
                  bgPixel[i]
                ) {
                  grid[gx][gy] = false;
                  break singleGridLoop;
                }
              }
            }
          }
          if (grid[gx][gy] !== false) {
            grid[gx][gy] = true;
          }
        }
      }
      imageData = bctx = bgPixel = undefined;
    }
    // fill the infoGrid with empty state if we need it
    if (settings.hover || settings.click) {
      interactive = true;
      /* fill the grid with empty state */
      gx = ngx + 1;
      while (gx--) {
        infoGrid[gx] = [];
      }
      if (settings.hover) {
        canvas.addEventListener("mousemove", wordcloudhover);
      }
      if (settings.click) {
        canvas.addEventListener("click", wordcloudclick);
        canvas.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
      }
      canvas.addEventListener("wordcloudstart", function stopInteraction() {
        canvas.removeEventListener("wordcloudstart", stopInteraction);
        canvas.removeEventListener("mousemove", wordcloudhover);
        canvas.removeEventListener("click", wordcloudclick);
        hovered = undefined;
      });
    }
    i = 0;
    var loopingFunction, stoppingFunction;
    if (settings.wait !== 0) {
      loopingFunction = window.setTimeout;
      stoppingFunction = window.clearTimeout;
    } else {
      loopingFunction = window.setImmediate;
      stoppingFunction = window.clearImmediate;
    }
    var addEventListener = function addEventListener(type, listener) {
      elements.forEach(function (el) {
        el.addEventListener(type, listener);
      }, this);
    };
    var removeEventListener = function removeEventListener(type, listener) {
      elements.forEach(function (el) {
        el.removeEventListener(type, listener);
      }, this);
    };
    var anotherWordCloudStart = function anotherWordCloudStart() {
      removeEventListener("wordcloudstart", anotherWordCloudStart);
      stoppingFunction(timer);
    };
    addEventListener("wordcloudstart", anotherWordCloudStart);
    var timer = loopingFunction(function loop() {
      if (i >= settings.list.length) {
        stoppingFunction(timer);
        sendEvent("wordcloudstop", false);
        removeEventListener("wordcloudstart", anotherWordCloudStart);
        return;
      }
      escapeTime = new Date().getTime();
      var drawn = putWord(settings.list[i]);
      var canceled = !sendEvent("wordclouddrawn", true, {
        item: settings.list[i],
        drawn: drawn,
      });
      if (exceedTime() || canceled) {
        stoppingFunction(timer);
        settings.abort();
        sendEvent("wordcloudabort", false);
        sendEvent("wordcloudstop", false);
        removeEventListener("wordcloudstart", anotherWordCloudStart);
        return;
      }
      i++;
      timer = loopingFunction(loop, settings.wait);
    }, settings.wait);
  };
  // All set, start the drawing
  start();
};

WordCloud.isSupported = isSupported;
WordCloud.minFontSize = minFontSize;

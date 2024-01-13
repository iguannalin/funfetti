window.addEventListener("load", () => {
  function getRandomInt(min, base) {
    min = Math.ceil(min);
    base = Math.floor(base);
    return Math.floor(Math.random() * (base - min) + min); // The baseimum is exclusive and the minimum is inclusive
  }
  let os = 200;
  let time = 250;
  let wx = 0;
  let wy = 0;
  let windows = 5;

  // get window position code from -- https://stackoverflow.com/a/17980638
  function get_window_x_pos()
  {
    let winx;
    if(window.screenX)
        winx=window.screenX;
    else if(window.screenLeft)
        winx=window.screenLeft;
    return winx;
  }
  function get_window_y_pos()
  {
    let winy;
    if(window.screenY)
        winy=window.screenY;
    else if(window.screenTop)
        winy=window.screenTop;
    return winy;
  }

  setInterval(() => {
    let x = get_window_x_pos();
    let y = get_window_y_pos();
    wx = x; wy = y;
  }, 100);
  
  function createWindow(base) {
    const randomColor = Math.random()<0.2?'limegreen':(Math.random()>0.2?'fuchsia':(Math.random()>0.2?'yellow':'mediumblue'));
    const text = `<!DOCTYPE html><html><head><title>keep</title><style>body {margin: 0 auto;}</style></head> <body><div id="container"></div></body>
    <script>
    const max = ${Math.max(base-150,0)};
    let wtop = window.screenY ? window.screenY : window.screenTop || 0;
    let wleft = window.screenX ? window.screenX : window.screenLeft || 0;
    let mvdown = false;
    const mv = Math.random>0.5?-0.25:0.25;
    function confall() {
      document.body.style.backgroundColor="${randomColor}";
      if (wtop<=max) mvdown = true;
      if (mvdown) wtop +=1;
      else wtop -=1;
      wleft+=mv;
      window.moveTo(wleft,wtop);
      // console.log({wtop,max});
    }
    setInterval(confall,Math.random()*10);
    setTimeout(window.close, 2000);
    </script></html>`;
    const blob = new Blob([text], {type: "text/html"});
    const blobUrl = URL.createObjectURL(blob);
    const wLeft = wx + getRandomInt(window.innerWidth-100, window.innerWidth+100);
    window.open(blobUrl, '_blank', `popup,width=${10},height=${10},left=${wLeft},top=${base}`);
    window.URL.revokeObjectURL(blobUrl);
  }
  
  setInterval(() => {
    const wbase = getRandomInt(wy+window.innerHeight+500, wy+100);
    for (let i = 0; i < windows; i++) createWindow(wbase);
  }, 1500);
});
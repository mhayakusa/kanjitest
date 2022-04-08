    var img = null;
    var pimg = null;
    var kanjiCubes = [];
    var teihen_x = 100;
    var teihen_y = 600;
    var drop_color = ['pink', 'skyblue', 'green', 'gray', 'tomato', 'navy', 'violet'];
    var hen = 40;
    var jiku = [[0, 0, 0], [1000, 0, 0], [0, 1000, 0], [0, 0, 1000]];
    var kyori = 800;
    var scrn = 50;
    var shiten = [460, 800, 800];
    var foucas = [hen * 12, hen * 12, 0];
    var sin_a = 0;
    var sin_b = 0;
    var cos_a = 0;
    var cos_b = 0;
    var genkai = 100;
    var plane = [];
    var cube = [];
    var CubeDatas=[];
    var T0 =[];
    var T1 =[];
    var T2 =[];
    var T3 =[];
    var T4 =[];
    var kdata = [];
    var a1=0;
    
    var moji_num = '{{ mojinum}}';
    var tmpdata = '{{ geocode}}';

    data_list = tmpdata.split("],");

      for(let i=0;i< data_list.length;i++){
        if (data_list[i] != ""){
          tmpdata = data_list[i].replace(/\[|\]/g,"")
          tmpdata = tmpdata.replace(/ /g,"")
          tmplist = tmpdata.split(",").map(Number);
          //console.log("tmplist:",typeof tmplist);
          kdata.push(tmplist);
        }
      }
      
    console.log("procstart:",moji_num,kdata.length);

  //var kdata = [[0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,1,0],[0,1,1,0,0,0,1,1,0],[0,1,1,0,0,0,0,0,0],[0,1,1,0,0,0,1,1,0],[0,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,0,0,0],[0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1]];

  //console.log("data2:",kdata.length,kdata);
  
  //  var kdata = [];
  
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    //      window.requestAnimationFrame(draw);
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    cube = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    plane = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    hen = 40;

    //let button = document.getElementById('xxx');
    //button.onclick = butotnClick;

    get_kanji_cubes(kdata,kanjiCubes);
    
    draw_kdata(kdata,shiten,kanjiCubes);
    
    moveCount = 0
    timerId = setInterval(moveKanji,1000);

    function init_shiten() {
         shiten = [460, 600, 500];
    };
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
//         ctx.translate(50+i*50,50)
       ctx.arc(x,y,  10, 0, Math.PI * 2, false);
       ctx.fillStyle = "#0095DD";
       ctx.fill();
       ctx.closePath();
       x += dx;
       y += dy;
    }
    function draw_polygon(x0,y0,x1,y1,x2,y2,x3,y3,color){

      //ctx.fillStyle = 'rgb(0,0, 255)';
      ctx.fillStyle =color
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.lineTo(x3,y3);
      ctx.closePath();
      ctx.fill();
//        ctx.stroke();
    }
    function get_kanji_cubes(kdata){  //漢字のピットマップの全ての頂点の座標を計算したKanjiCubes を作成する
  
      kanjiCubes=[];
      let th = kdata.length;
      for (let yy = 0; yy < th;yy++){
          let tw = kdata[yy].length;
          for (let xx= 0;xx < tw ; xx++){
              let start1 = [xx*hen,(th-1-yy)*hen,0];
              workCube =[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
              createCube(start1,hen,workCube);
              //document.write(String(workCube[0][0]));
              kanjiCubes.push(workCube);
          }
      }

    }
    function dsp_cube(plane,xx,yy,kdata){  //一つの立方体を書く（Planeは8つの頂点の座標を持つ）
//        console.log(plane[4][0],plane[4][1],plane[5][0],plane[5][1],plane[6][0],plane[6][1]);

      for (ii =0;ii < 8 ; ii++){
      //    a = string(plane[ii][0]);
            plane[ii][1] = 600 - plane[ii][1]
      }
      let ih = kdata.length;
      let iw = kdata[0].length;
      let idx = yy * ih + xx ;
              let tCube = kanjiCubes [idx];
      //正面判断
      //console.log("iw",iw,"xx",xx);
      if (shiten[1] > hen){
        draw_polygon(plane[4][0],plane[4][1],plane[5][0],plane[5][1],plane[6][0],plane[6][1],plane[7][0],plane[7][1],'blue');
      }
      if (shiten[1] < 0) {
        draw_polygon(plane[0][0],plane[0][1],plane[1][0],plane[1][1],plane[2][0],plane[2][1],plane[3][0],plane[3][1],'skyblue');
      }
      //右面
      if ((xx < iw - 1 && kdata [yy] [xx + 1] == 0 )|| xx == iw -1) {
              draw_polygon (plane [2] [0], plane [2] [1], plane [3] [0], plane [3] [1], plane [7] [0], plane [7] [1], plane [6] [0], plane [6] [1], 'pink');
          //右下のある？
          //if (kdata [yy+1] [xx + 1] == 0){
          //  let idx2 = (yy+1) * ih + (xx+1) ;
                  //  let tCube = kanjiCubes [idx2];
            //draw_polygon (plane [2] [0], plane [2] [1], plane [3] [0], plane [3] [1], plane [7] [0], plane [7] [1], plane [6] [0], plane [6] [1], 'gray');
          //}
        }
      //上下面
      //if (tCube[3][1] < shiten[1]){
      if (tCube[3][1] < shiten[1]){
          if ((yy > 0 && kdata [yy - 1] [xx] == 0) || yy == 0) {
          
                draw_polygon (plane [0] [0], plane [0] [1], plane [3] [0], plane [3] [1], plane [7] [0], plane [7] [1], plane [4] [0], plane [4] [1],'tomato');
          };
      }
      if (tCube[0][1] > shiten[1]){
        if (kdata [yy + 1] [xx] == 0) {
                draw_polygon (plane [1] [0], plane [1] [1], plane [2] [0], plane [2] [1], plane [6] [0], plane [6] [1], plane [5] [0], plane [5] [1],'green');
            console.log("sita;",shiten[0],shiten[1],"x,y",xx,yy,tCube[0][0],tCube[0][1])
          };
      }
    }
    function createCube(kiten, hen, cube) {
        for (var ii = 0; ii < 8; ii++) {
            if (ii % 4  < 2) {
                cube [ii] [0] = kiten [0];
            }
            else {
                cube [ii] [0] = kiten [0] + hen;
            }
            if (ii < 4) {
                cube [ii] [2] = kiten [2];
            }
            else {
                cube [ii] [2] = kiten [2] + hen;
            }
            if (ii % 4 == 1 || ii % 4 == 2) {
                cube [ii] [1] = kiten [1];
            }
            else {
                cube [ii] [1] = kiten [1] + hen;
            }
        }	    

    }
    function cacl_parm() {
        var bunbo1 =  Math.sqrt (Math.pow (shiten [0] - foucas [0], 2) + Math.pow (shiten [2] - foucas [2], 2));
        var bunbo2 =  Math.sqrt ((Math.pow (shiten [0] - foucas [0], 2) + Math.pow (shiten [1] - foucas [1], 2)) + Math.pow (shiten [2] - foucas [2], 2));
        if (bunbo1 == 0) {
              bunbo1 = 1;
          }
        if (bunbo2 == 0) {
              bunbo2 = 0;
      }
        sin_a = (foucas [0] - shiten [0]) / bunbo1;
        cos_a = (shiten [2] - foucas [2]) / bunbo1;
        sin_b = (shiten [1] - foucas [1]) / bunbo2;
        cos_b = bunbo1 / bunbo2;
        T0 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [-(1) * shiten [0], -(1) * shiten [1], -(1) * shiten [2], 1]];
        T1 = [[cos_a, sin_a * sin_b, sin_a * cos_b, 0], [0, cos_b, -(1) * sin_b, 0], [sin_a, (-(1) * cos_a) * sin_b, (-(1) * cos_a) * cos_b, 0], [(-(1) * shiten [0]) * cos_a - shiten [2] * sin_a, (((-(1) * shiten [0]) * sin_a) * sin_b - shiten [1] * cos_b) + (shiten [2] * cos_a) * sin_b, (((-(1) * shiten [0]) * sin_a) * cos_a + shiten [1] * sin_b) + (shiten [2] * cos_a) * cos_b, 1]];
        T2 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, -(1), 0]];
        T3 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0.1, 0.1], [0, 0, -(100), 0]];
        T4 = [[300, 0, 0, 0], [0, 300, 0, 0], [0, 0, 300, 0], [300, 400, 0, 1]];
    }

    function draw_kdata(kdata,shiten,kanjiCubes){ //漢字のビットマップから立体座標に変換したCubeDatasを元に描画する

      cacl_parm ();  //視点が変化するので変換行列を作成しなおす

      let tCube=[];
      let iw = kdata.length;
      let ih = kdata[0].length;
      for (let yy = kdata.length -1 ; yy >= 0 ; yy--) {
              for (let xx = 0; xx < kdata[yy].length; xx++) {
                  if (kdata [yy] [xx] != 0) {
                      let idx = yy * ih + xx ;
                      let tCube = kanjiCubes [idx]; // 1つの立方体の8頂点の座標をコピー
              //console.log(kanjiCubes.length,"idx",idx,"tCube",tCube)
                      syazou (tCube);
                      dsp_cube (plane, xx, yy,kdata);
                  }
              }
          }
      };
      function syazou(cube) {
          plane = [];
        //console.log("cube:",cube);
  
          for (let xx = 0 ; xx < cube.length; xx++) {
              let xyz = cube[xx];
              if (xyz.length == 3) {
                  xyz.push (1);
              }
              var ary2 = calcMatrix4 (xyz, T0);
              var ary2 = calcMatrix4 (ary2, T1);
              ary3 = calcMatrix4 (ary2, T2);
              ary3 = calcMatrix4 (ary3, T4);
              var tx = Math.floor(ary3 [0] / ary3 [3] - 100);
              var ty = Math.floor (ary3 [1] / ary3 [3]);
//                console.log(tx,ty)
              plane.push ([tx, ty]);
          }
      };
    function calcMatrix4(aray1,aray2){
        
   //   console.log("matrix:",aray1,aray2)
      res = [];
      if (typeof aray1[0] === 'object'){
          //2次元
          var jigen = 2;
          var row1 = aray1.length;
          var col1 = aray1[0].length;
      } else {
          var jigen = 1;
          var col1 = aray1.length;
          var row1 = 1;
      }

      var row2 = aray2.length;  
      var col2 = aray2[0].length;

      for (ii=0;ii< row1;ii++){
          if (jigen > 1){
              res[0] = [];
          } 
          for (jj=0;jj< col2;jj++){
              if (jigen = 1){
                  res[jj] = 0;
              } else {
                  res[ii][jj] = 0;
              }
              for (kk=0;kk< col1;kk++){
                  if (jigen = 1){
                      res[jj] +=  aray1[kk] * aray2[kk][jj]
                  } else {
                      res[ii][jj] +=  aray1[ii][kk] * aray2[kk][jj]
                  }
              }
          }
      } 
     // console.log(res)
      return res;
    }
    function moveKanji(){
      var r = 1000;
      
      a1 += 3;
      if (moveCount > 20){ 
        clearInterval(timerId);
      }
      moveCount += 1;

      radian1 = a1 * ( Math.PI / 180 )
      x = Math.floor(r * Math.sin(radian1));
      y = Math.floor(r * Math.cos(radian1));
      shiten[0] = x;
      shiten[1] = y; 
      shiten[2] = 300;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw_kdata(kdata,shiten,kanjiCubes);
      
      //console.log("aa",shiten[0],shiten[1],shiten[2]);

    }
    function  demo_click(){
      var r = 1500;
      var a1 = 30;
      //canvas.delete('all')
      for (ii=0; ii < 20; ii++){
        a1 += 2;
        x = int(r * Math.sin(Math.radians(a1)));
        y = int(r * Math.cos(Math.radians(a1)));
        shiten[0] = x;
        shiten[1] = y; 
        shiten[2] = 200;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dsp_obje(kanjiCubes);
        if (ii == 0){ 
          time.sleep(2);
        }
        else{
          time.sleep(0.3);
        }
      }
      time.sleep(2)

      for (dtime= 0;dtime < 20; dtime++ ){
        shiten[1] += 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dsp_obje(kanjiCubes);

        time.sleep(0.3);
        time.sleep(3);
      }

      r = 1000;

      for (ii = 0;ii<50 ; ii++){
        x = int(r * Math.sin(Math.radians(ii)));
      //y = int(r * math.cos(math.radians(a1)))
        shiten[0] = x;
        shiten[1] = 1200; 
        shiten[2] = 180;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dsp_obje(kanjiCubes);

        if (ii == 0) {
          time.sleep(2);
        }
        else {
          time.sleep(0.3);

        }
      }
      a1 = 1;
      r0 = shiten[0];
      r2 = shiten[2];
      for (dtime=0; dtime < 10; dtime++){
        a1 += 1;
        shiten[2] = shiten[2] + int(r2 * math.sin(math.radians(a1)));
        shiten[0] = int(r0 * math.cos(math.radians(a1)));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dsp_obje(kanjiCubes);
        time.sleep(0.3);
      }
    }
    function get_nextkanji(){
//          alert('Click');

      var xhr = new XMLHttpRequest();
//          xhr.open("POST", '/linetest', true);
      xhr.open('GET', '/linetest', true);

      mojiNum = Number(moji_num);
      if (mojiNum < 10){
          mojiNum = mojiNum + 1;
          moji_num = String(moji_num);
      }
      else {
        moji_num = "1";
      }
      sendmoji = "mojinum=" + moji_num;
      //xhr.send("foo=bar&lorem=ipsum")
      xhr.send(sendmoji);
      
      console.log("syorisareru?")

      xhr.onload = function () {
        console.log("modorimasita")
// リクエストの終了。ここの処理を実行します。
      };
// xhr.send(new Int8Array());
// xhr.send(document);
    }

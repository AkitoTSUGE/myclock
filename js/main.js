'use strict';

(() => {
  class ClockDrawer {
    constructor(canvas2) {//このクラスを呼び出すときの引数はこのコンストラクター内ではcanvas2と呼ぶよ
      this.ctx1 = canvas2.getContext('2d');
      this.width = canvas2.width;
      this.height = canvas2.height; 
    }

    draw(angle2, func) {//この関数を呼び出すときの１番目の引数をこの関数内ではangle2と呼び、２番目の引数をfuncと呼ぶよ。
      this.ctx1.save();

      this.ctx1.translate(this.width / 2, this.height / 2);
      this.ctx1.rotate(Math.PI / 180 * angle2);

      this.ctx1.beginPath();
      func(this.ctx1);//func（drawを呼び出すときの2番目の引数）とはこのクラス内のctx1のことだよ
      this.ctx1.stroke();
      this.ctx1.restore();
    }
    clear() {
      this.ctx1.clearRect(0, 0, this.width, this.height);
    }
  }

  class Clock {
    constructor(drawer) {
      console.log(drawer)
      this.r = 140;
      this.drawer = drawer;
    }

    drawFace() {
      this.drawer.draw(0, ctx => {
        // ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(241, 247, 162, 0.767)';
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let angle1 = 0; angle1 < 360; angle1 += 6) {
        this.drawer.draw(angle1, ctx2 => {//draw関数の１番目の引数はこの関数内ではangle1と呼び、２番目の引数はctx2と呼ぶよという意味
          ctx2.moveTo(0, -this.r);
          if (angle1 % 30 === 0) {
            ctx2.lineWidth = 2;
            // ctx2.moveTo(0, -90)
            ctx2.lineTo(0, -this.r + 10); 
            ctx2.font = '24px serif';
            ctx2.textAlign = 'center';
            // ctx2.fillStyle = 'black';
            ctx2.fillText(angle1 / 30 || 12, 0, -this.r + 33);//0がfalseと評価されるので、||(「もしくは」の論理演算子)を使うことで、0の時に12を表示できる。
          } else {
            // ctx2.moveTo(0, -90)
            ctx2.lineTo(0, -this.r + 5);
          }
        });
      }
    }

    drawHands() {
      //時針
      this.drawer.draw(this.h * 30 + this.m * 0.5, ctx3 => {
        ctx3.lineWidth = 6;
        // ctx3.lineCap = 'round'
        ctx3.moveTo(0, 10);
        ctx3.lineTo(0, -this.r + 50);
      });
      //分針
      this.drawer.draw(this.m * 6, ctx4 => {
        ctx4.lineWidth = 4;
        // ctx4.lineCap = 'round'
        ctx4.moveTo(0, 10);
        ctx4.lineTo(0, -this.r +20);
      });
      //秒針
      this.drawer.draw(this.s * 6, ctx5 => {
        ctx5.lineWidth = 1.5
        ctx5.strokeStyle = 'red'
        ctx5.moveTo(0, 20);
        ctx5.lineTo(0, -this.r + 20);
      });
    }

    update() {
      this.h = (new Date()).getHours();
      this.m = (new Date()).getMinutes();
      this.s = (new Date()).getSeconds();
    }


    run() {
      this.update()

      this.drawer.clear();
      this.drawFace();
      // console.log(drawer)
      this.drawHands();

      setTimeout(() => {
        this.run();
      }, 100);
    }
  }

  const canvas1 = document.querySelector('canvas');
      if (typeof canvas1.getContext === 'undefined') {
        return;
      }

  const clock = new Clock(new ClockDrawer(canvas1));

  clock.run();
})();


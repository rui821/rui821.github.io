var $v = jQuery.noConflict();

(function($v) {
$v(function() {
    demo_wav2();
});

function demo_wav2() {
    function e2() {
        demo_obj = document.getElementById("canvas_ye"),
        demo_cntxt4 = demo_obj.getContext("2d"),
        demo_h = 90, //高さ
        demo_w = 700, //横幅
        demo_h_half = Math.floor(demo_h / 2), //少数切捨
        demo_draw2()
    }
	
    function demo_draw2() {
        demo_cntxt4.clearRect(0, 0, demo_w, demo_h), //座標領域のクリア
        demo_cntxt4.fillStyle = "#e3c627", //塗りの色
        demo_cntxt4.globalAlpha = 1, //塗りの透明度
        demo_cntxt4.beginPath(), //パスを開始

        demo_anime2(demo_draw2.t), //アニメの描画

        demo_cntxt4.lineTo(demo_w + 30, demo_h), //lineTo：線の終点
        demo_cntxt4.lineTo(0, demo_h), //lineTo：線の終点
        demo_cntxt4.closePath(), //パスを閉じる
        demo_cntxt4.fill() //fillStyleの反映

        // カウントアップやら値のセット
        demo_draw2.seconds = demo_draw2.seconds + 0.004, //波の流れの速さが変わる
        demo_draw2.t = demo_draw2.seconds * Math.PI, //円周率

        setTimeout(demo_draw2, 10) //波のコマの長さms
    }

    function demo_anime2(e2) {
        var a = e2
          , o = Math.sin(a);
        for (demo_cntxt4.moveTo(0, u * o + demo_h_half), i = 0; i <= demo_w + 10; i += 10) //moveTo：始点の移動
            a = e2 + i / u,
            o = Math.sin(a) / 3,
            demo_cntxt4.lineTo(i, u * o + demo_h_half) //lineTo：線の終点
    }

    //初期値
    var u = 100; //波の高さ
    demo_draw2.seconds = 0,
    demo_draw2.t = 0,
    e2()
}
})($v);
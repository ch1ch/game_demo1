/**
 * Created by fu on 16/1/5.
 */
var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            //scale: 0.5,
            rotation: 0 //旋转
        });
        this.addChild(this.bgSprite, 0);

        this.addSushi();

        return true;
    },

    addSushi : function() {

        var sushi = new cc.Sprite(res.Monster1_png);
        var size = cc.winSize;

        var x = sushi.width/2+size.width/2*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });

        this.addChild(sushi,5);
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});
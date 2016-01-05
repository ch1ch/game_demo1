/**
 * Created by fu on 16/1/4.
 */
var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Hello World", "", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        this.addChild(helloLabel);

        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0)

        //add start menu
        var startItem = new cc.MenuItemImage(
            res.Start_png,
            res.Start_png,
            function () {
                cc.log("Menu is clicked!");
                cc.director.runScene( new PlayScene() );
                //cc.director用来获取导演单例实体，cc.TransitionPageTurn创建了一个翻页效果的场景切换动画，当然你也可以不使用转场动画。直接传入new SecondScene()
            }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});
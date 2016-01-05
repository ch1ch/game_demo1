/**
 * Created by fu on 16/1/5.
 */
var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    SushiSprites:null,
    ctor:function () {
        this._super();
        this.SushiSprites = [];
        var size = cc.winSize;

        // add bg
        this.bgSprite = new cc.Sprite(res.Map_png);
        //this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
            rotation: 0 //旋转
        });
        this.addChild(this.bgSprite, 0);

        //this.addSushi();

        //this.Tuoluo();

        this.schedule(this.update,2.5,16*1024,1);
        //schedule(callback_fn, interval, repeat, delay)
        //callback_fn：调用的方法名
        //interval：间隔多久再进行调用
        //repeat：重复的次数
        //delay：延迟多久再进行调用

        return true;
    },

    update : function() {
        this.addSushi();
        this.removeSushi();
    },


    addSushi : function() {
        var randomMon=cc.random0To1();
        if(randomMon>0.5){
            var sushi = new cc.Sprite(res.Monster1_png);
        }else{
            var sushi = new cc.Sprite(res.Monster2_png);
        }
        var size = cc.winSize;

        //var x = sushi.width/2+size.width/2*cc.random0To1();
        var x = size.width*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });
        this.addChild(sushi,5);

        var dorpAction = cc.MoveTo.create(2, cc.p(sushi.x,-sushi.height));
        sushi.runAction(dorpAction);
        this.SushiSprites.push(sushi);
    },

    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            cc.log("removeSushi.........");
            if(0 == this.SushiSprites[i].y) {
                cc.log("==============remove:"+i);
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },

    Tuoluo:function(){
        cc.inputManager.setAccelerometerInterval(1/30);
        cc.inputManager.setAccelerometerEnabled(true);
        cc.eventManager.addListener({
            event: cc.EventListener.ACCELERATION,
            callback: function(accelEvent, event){
                var target = event.getCurrentTarget();
                cc.log('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );
                alert('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );
                var w = winSize.width;
                var h = winSize.height;

                var x = w * accelEvent.x + w/2;
                var y = h * accelEvent.y + h/2;

                // Low pass filter
                x = x*0.2 + target.prevX*0.8;
                y = y*0.2 + target.prevY*0.8;

                target.prevX = x;
                target.prevY = y;
                target.sprite.x = x;
                target.sprite.y = y ;

            }
        }, this);

    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});
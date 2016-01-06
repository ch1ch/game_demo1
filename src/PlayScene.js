/**
 * Created by fu on 16/1/5.
 */
var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    SushiSprites:null,

    scoreLabel:null,
    score:0,
    timeoutLabel:null,
    timeout:60,

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


        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
        this.scoreLabel.attr({
            x:size.width / 2 + 100,
            y:size.height - 20
        });
        this.addChild(this.scoreLabel, 5);

        // timeout 60
        this.timeoutLabel = cc.LabelTTF.create("" + this.timeout, "Arial", 30);
        this.timeoutLabel.x = 20;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);

        cc.spriteFrameCache.addSpriteFrames(res.Monster1all_plist);
        this.schedule(this.timer,1,this.timeout,1);
        //this.Tuoluo();



        this.schedule(this.update,0.5,16*1024,1);
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

    addScore:function(){
        this.score +=1;
        this.scoreLabel.setString("score:" + this.score);
    },

    timer : function() {

        if (this.timeout == 0) {
            //cc.log('游戏结束');
            var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
            titleLabel.attr({
                x:size.width / 2 ,
                y:size.height / 2
            });
            gameOver.addChild(titleLabel, 5);
            var TryAgainItem = new cc.MenuItemFont(
                "Try Again",
                function () {
                    cc.log("Menu is clicked!");
                    var transition= cc.TransitionFade(1, new PlayScene(),cc.color(255,255,255,255));
                    cc.director.runScene(transition);
                }, this);
            TryAgainItem.attr({
                x: size.width/2,
                y: size.height / 2 - 60,
                anchorX: 0.5,
                anchorY: 0.5
            });

            var menu = new cc.Menu(TryAgainItem);
            menu.x = 0;
            menu.y = 0;
            gameOver.addChild(menu, 1);
            this.getParent().addChild(gameOver);

            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }

        this.timeout -=1;
        this.timeoutLabel.setString("" + this.timeout);

    },


    addSushi : function() {
        var randomMon=cc.random0To1();
        //if(randomMon>0.5){
        //    var sushi = new SushiSprite(res.Monster1_png);
        //}else{
        //    var sushi = new SushiSprite(res.Monster2_png);
        //}
        var sushi = new SushiSprite(res.Monster1_png);
        var size = cc.winSize;

        //var x = sushi.width/2+size.width/2*cc.random0To1();
        var x = size.width*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });
        this.addChild(sushi,5);

        var dorpAction = cc.MoveTo.create(1.0, cc.p(sushi.x,-sushi.height));
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
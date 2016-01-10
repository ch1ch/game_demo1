/**
 * Created by fu on 16-1-7.
 */
/**
 * Created by fu on 16/1/5.
 */
var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    SushiSprites:null,
    scoreLabel:null,
    scoreLabel2:null,
    scoreLabel3:null,
    scoreLabel4:null,
    score:0,
    timeoutLabel:null,
    timeout:6000,
    prevX:0,
    prevY:0,
    prevZ:0,

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
            //scale: 1,
            rotation: 0 //旋转
        });
        this.addChild(this.bgSprite, 0);


        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 30);
        this.scoreLabel.attr({
            x:size.width / 2 + 100,
            y:size.height - 20
        });
        this.addChild(this.scoreLabel, 5);

        //window.scoreLabel=this.scoreLabel;

        this.scoreLabel2 = new cc.LabelTTF("score:0", "Arial", 30);
        this.scoreLabel2.attr({
            x:size.width / 2 + 100,
            y:size.height - 80
        });
        this.addChild(this.scoreLabel2, 5);

        this.scoreLabel3 = new cc.LabelTTF("score:0", "Arial", 30);
        this.scoreLabel3.attr({
            x:size.width / 2 + 100,
            y:size.height - 120
        });
        this.addChild(this.scoreLabel3, 5);

        this.scoreLabel4 = new cc.LabelTTF("score:0", "Arial", 30);
        this.scoreLabel4.attr({
            x:size.width / 2 + 100,
            y:size.height - 160
        });
        this.addChild(this.scoreLabel4, 5);

        // timeout 60
        this.timeoutLabel = cc.LabelTTF.create("" + this.timeout, "Arial", 30);
        this.timeoutLabel.x = 20;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);

        cc.spriteFrameCache.addSpriteFrames(res.Monster1all_plist);
        this.schedule(this.timer,1,this.timeout,1);


        this.Tuoluo();

        this.addAim();


        this.AddDeMon();

//        this.schedule(this.update,0.5,16*1024,1);
        this.schedule(this.accupdate,3,16*1024,1);
        //schedule(callback_fn, interval, repeat, delay)
        //callback_fn：调用的方法名
        //interval：间隔多久再进行调用
        //repeat：重复的次数
        //delay：延迟多久再进行调用

        return true;
    },

    accupdate : function() {

    },

    ShowAcc:function(str){
        this.score +=1;
        this.scoreLabel.setString("score:" + str);
    },

    AddDeMon:function(){
        if (window.DeviceMotionEvent) {
            //window.addEventListener('devicemotion', deviceMotionHandler, false);
            window.addEventListener("deviceorientation", orientationHandler, false);
        } else {
            this.layer.scoreLabel.setString("This device doesn't support accelerators");
            // This device doesn't support accelerators
        }

        function orientationHandler(event) {

            var xx;

            if(event.alpha){
                xx=event.alpha.toFixed(2);
                xx=xx>180?360-xx:(-xx);
            }else{
                xx=0;
            }


            this.layer.scoreLabel.setString("score:" +(this.layer.preX-xx ));

            var bgx =this.layer.bgSprite.x;
            var bgy =this.layer.bgSprite.y;

            if(Math.abs(this.layer.preX - xx)>0.1) {
                this.layer.bgSprite.attr({
                    //x: bgx+cc.winSize.width*(( this.layer.prevY-yy).toFixed(2)),
                    x: bgx + (( this.layer.preX - xx) * cc.winSize.width / 12),
                    y: bgy
                });
            }

            this.layer.preX=xx;


            //document.getElementById("alpha").innerHTML = event.alpha;
            //document.getElementById("beta").innerHTML = event.beta;
            //document.getElementById("gamma").innerHTML = event.gamma;
            //document.getElementById("heading").innerHTML = event.webkitCompassHeading;
            //document.getElementById("accuracy").innerHTML = event.webkitCompassAccuracy;

        }

        function deviceMotionHandler(e) {
            var acceleration = e.accelerationIncludingGravity;

            var accelerationX = acceleration.x;
            var accelerationY=acceleration.y;
            var accelerationZ = acceleration.z;

            if (e.rotationRate) {
                var rotation = e.rotationRate;

                cc.log(e);

                //var rotationAlpha = rotation.alpha;
                //var rotationBeta = rotation.beta;
                //var rotationGamma = rotation.gamma;
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
                cc.log(accelEvent);
                //cc.log('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );
//                alert('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );
//                cc.log(this);
//                target.ShowAcc(accelEvent.x);
                x = accelEvent.x;
                y = accelEvent.y;
                z = accelEvent.z;

                var bgx =target.bgSprite.x;
                var bgy =target.bgSprite.y;
//                cc.log(bgLocation);

                //if(target.prevX-x>0.02 ||target.prevX-x<-0.02){
                //    target.bgSprite.attr({
                //        x: bgx+cc.winSize.width*(( target.prevX-x).toFixed(2)),
                //        y: bgy,
                //    });
                //}

                if(target.prevZ-z>0.02 ||target.prevZ-z<-0.02){
                    target.bgSprite.attr({
                        y: bgy+cc.winSize.width*(( target.prevZ-z).toFixed(2))
                    });
                }

                //target.scoreLabel2.setString("x++:" +((target.prevX).toFixed(2))+"  new x:"+((x).toFixed(2))+"  the :"+((x - target.prevX).toFixed(2)));

                //target.scoreLabel3.setString("y++:" +((target.prevY).toFixed(2))+"  new y:"+((y).toFixed(2))+"  the :"+((y - target.prevY).toFixed(2)))


                target.scoreLabel4.setString("Z++:" +((target.prevZ).toFixed(2))+"  new z:"+((z).toFixed(2))+"  the :"+((z - target.prevZ).toFixed(2)));

                //target.ShowAcc( target.bgSprite.x);

                //if(x - target.prevX>0.2){
                //
                //    console.log("x轴加速计");
                //}
                //if(y - target.prevY>0.4){
                //    console.log("y轴加速计");
                //}
                //if(z - target.prevZ>0.6){
                //    console.log("z轴加速计");
                //}
                //target.prevX = x;
                //target.prevY = y;
                target.prevZ = z;
//
//
            }
        }, this);

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


    addAim : function() {

        var aim = new AimSprite(res.Aim_png);
        var size = cc.winSize;

        //var x = sushi.width/2+size.width/2*cc.random0To1();
        var x = size.width/2;
        var y=size.height/2;
        aim.attr({
            x: x,
            y:y
        });
        this.addChild(aim,5);
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


});
var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        window.layer=layer;
        this.addChild(layer);
    }


});

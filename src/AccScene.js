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
    oldtime:0,
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
        //alert(this.bgSprite.y);
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

        //中心准心
        this.addAim();

        //增加怪物
        this.addMonster();

        //屏幕箭头
        this.addArrow();

        //判断屏幕位移
        this.AddDeMon();

//       this.schedule(this.update,0.5,16*1024,1);
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
            var now=new Date();
            this.layer.scoreLabel.setString("time:" +now.getTime());
            if(now- this.layer.oldtime<100){
                return;
            }
            var xx,yy;
            var bgy =this.layer.bgSprite.y;
            var bgx =this.layer.bgSprite.x;

            if(event.alpha){
                xx=event.alpha.toFixed(2);
                xx=xx>180?360-xx:(-xx);
                yy=event.beta.toFixed(2);
                yy=yy>180?360-yy:(-yy);
            }else{
                xx=0;
            }

            var speed_x=20;
            var speed_y=6;
            //越大越移动幅度小

            this.layer.scoreLabel2.setString("x:" +((this.layer.preX-xx ).toFixed(2))+" bgx=: "+bgx);
            this.layer.scoreLabel3.setString("y:" +((this.layer.preY-yy ).toFixed(2))+" bgy=: "+bgy);

            if((bgx + (( this.layer.preX - xx) * cc.winSize.width / speed_x))>cc.winSize.width*2)
            {
              xx=this.layer.preX;
            }


            if((bgx + (( this.layer.preX - xx) * cc.winSize.width / speed_x))<cc.winSize.width*(-1.5))
            {
              xx=this.layer.preX;
            }

            if((bgy + (( this.layer.preY - yy) * cc.winSize.height / speed_y))>cc.winSize.height*1)
            {
              // yy=this.layer.preY;
            }

            if((bgy + (( this.layer.preY - yy) * cc.winSize.height / speed_y))<cc.winSize.height*(-1))
            {
              // yy=this.layer.preY;
            }

            if(Math.abs(this.layer.preX - xx)>0.001) {
                this.layer.bgSprite.attr({
                    x: bgx + (( this.layer.preX - xx) * cc.winSize.width / speed_x),
                    y: bgy
                });
            }
            bgx =this.layer.bgSprite.x;
            if(Math.abs(this.layer.preY - yy)>0.001) {
                this.layer.bgSprite.attr({
                    x: bgx,
                    y: bgy + ((yy- this.layer.preY) * cc.winSize.width / speed_y)
                });
            }

            this.layer.preX=xx;
            this.layer.preY=yy;
            this.layer.oldtime=now;

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
//                cc.log(accelEvent);
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


                target.scoreLabel4.setString("y++:" +((target.prevZ).toFixed(2))+"  new z:"+((z).toFixed(2))+"  the :"+((z - target.prevZ).toFixed(2)));

                //target.ShowAcc( target.bgSprite.x);

                //target.prevX = x;
                //target.prevY = y;
                target.prevZ = z;

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

    addMonster:function(){
        var randomMon=cc.random0To1()-0.5;
        var randomx=cc.random0To1()-0.5;
        //if(randomMon>0.5){
        //    var sushi = new SushiSprite(res.Monster1_png);
        //}else{
        //    var sushi = new SushiSprite(res.Monster2_png);
        //}
        var mons = new MonSprite(res.Monster1_png);
        var size = cc.winSize;

        //var x = sushi.width/2+size.width/2*cc.random0To1();
        var bgy =this.bgSprite.height;
        var bgx =this.bgSprite.width;

        var x = bgx*0.5;
        var y=bgy*0.5;  
        //var y=(bgy*0.5-size.height*0.5)+
        var x=bgx*0.5+bgx*randomx;
        var y=bgy*0.5+bgy*randomMon;
        //alert("x = "+x+" y = "+y);
        mons.attr({
            x: x,
            y:y
        });
        //cc.log(x+"  -- "+y);
        //alert(x+"  -- "+y);
        //cc.log(this);
        this.bgSprite.addChild(mons,5,5);
    },

    addArrow:function(){
        var Arrow =new cc.Sprite(res.Map_png);
        var bgy =this.bgSprite.height;
        var bgx =this.bgSprite.width;
        var size = cc.winSize;
        var mon=this.bgSprite.getChildByTag(5);
        var monx=mon.x;
        var mony=mon.y;
        var xpointleft=bgx*0.5-size.width*0.5;
        var xpointright=bgx-xpointleft;
        var ypointup=bgy*0.5-size.height*0.5;
        var ypointdown=bgy-ypointup;
        cc.log(monx+"  -- "+mony);

        if(monx<xpointleft){
            if(mony<ypointup){
                Arrow =new cc.Sprite(res.Arrow10_png);
            }else if(mony>ypointdown){
                Arrow =new cc.Sprite(res.Arrow7_png);
            }else{
                Arrow =new cc.Sprite(res.Arrow9_png);
            }
        }else if(monx>xpointright){
            if(mony<ypointup){
                Arrow =new cc.Sprite(res.Arrow1_png);
            }else if(mony>ypointdown){
                Arrow =new cc.Sprite(res.Arrow4_png);
            }else{
                Arrow =new cc.Sprite(res.Arrow3_png);
            }
        }else{
            if(mony<ypointup){
                Arrow =new cc.Sprite(res.Arrow0_png);
            }else if(mony>ypointdown){
                Arrow =new cc.Sprite(res.Arrow6_png);
            }
        };
        var x = size.width/2;
        var y=size.height/2;
        Arrow.attr({
            x: x,
            y:y
        });
        cc.log(Arrow);
        this.addChild(Arrow,15,15);

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

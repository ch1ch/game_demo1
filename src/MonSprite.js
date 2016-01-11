/**
 * Created by fu on 16/1/6.
 */
var MonSprite = cc.Sprite.extend({
    disappearAction:null,//消失动画

    onEnter:function () {
        cc.log("onEnter");
        this._super();

        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
        this.addTouchEventListenser();
        //表示对生成的消失动画增加一次引用,
        // 上面创建的disappearAction是自动释放的，我们需要为它增加一次引用，以避免它被回收
        //在我们不需要的时候对它执行release()方法,释放对它的引用。避免内存泄露。
        // 在使用Cocos2d-JS的jsb模式时，部分情况是需要我们手动管理内存的。
    },

    onExit:function () {
        cc.log("onExit");
        this.disappearAction.release();
        this._super();
    },

    addTouchEventListenser:function() {
        this.touchListener = cc.EventListener.create({
            //创建了一个Touch事件监听器touchListener
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //定义这个监听器监听的类型
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //设置是否吃掉事件，事件被吃掉后不会递给下一层监听器
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                //获取到触摸点的坐标pos
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                var size = cc.winSize;
                var bgx=window.layer.bgSprite.x;
                var bgy=window.layer.bgSprite.y;
                var bgw=window.layer.bgSprite.width;
                var bgh=window.layer.bgSprite.height;
                pos.x=pos.x+(bgw*0.5-size.width*1)+bgx;
                pos.y=pos.y+(bgh*0.5-size.height*1)+bgy;
                //alert(target);
                //获取当前事件的接受者
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    //判断当前的是否点击到了SushiSprite
                    cc.log("touched");

                    target.removeTouchEventListenser();
                    //在SushiSprite被点中后，`removeTouchEventListenser()`移除注册的touch事件避免被再次点击。
                    //响应精灵点中
                    cc.log("pos.x="+pos.x+",pos.y="+pos.y);

                    target.stopAllActions();
                    // stopAllActions()`停止SUshiSprite正在播放的动作。`cc.Sequence`是按序列播放动作。`

                    var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create( ac, cc.CallFunc.create(function () {
                        // cc.CallFunc`是Cocos2d-JS中提供的动画播放结束的处理回调。

                        //target.getParent().removeSushiByindex(target.index - 1);
                        target.removeFromParent();
                       window.layer.addMonster();
                        // 上面的代码通过cc.Sequence创建了Sushi消失的动作序列，并在动作结束后从层上移除SushiSprite.
                    },target) );

                    target.runAction(seqAc);

                    return true;
                }else{
                    var temp=target.getBoundingBox();
                    alert("xxxpos.x="+pos.x+",pos.y="+pos.y+"  tt== x "+temp.x+"  == y "+temp.y);
                }
                return false;
            }
            //还可以添加onTouchMoved/onTouchEnded方法监听touch移动和结束的回调。
            // 如果onTouchBegan返回false后onTouchMoved/onTouchEnded不会执行。
        });
        cc.eventManager.addListener(this.touchListener, this);
        //注册监听器到事件管理器。

    },

    removeTouchEventListenser:function(){
        cc.eventManager.removeListener(this.touchListener);
    },

    createDisappearAction : function() {
        var frames = [];
        for (var i = 1; i < 7; i++) {
            var str = "monster1_"+i+".png"
            //cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.05);
        var action = new cc.Animate(animation);

        return action;
    }


});
/**
 * Created by fu on 16/1/6.
 */
var AimSprite = cc.Sprite.extend({


    onEnter:function () {
        cc.log("onEnter");
        this._super();
        this.addTouchEventListenser();
        //表示对生成的消失动画增加一次引用,
        // 上面创建的disappearAction是自动释放的，我们需要为它增加一次引用，以避免它被回收
        //在我们不需要的时候对它执行release()方法,释放对它的引用。避免内存泄露。
        // 在使用Cocos2d-JS的jsb模式时，部分情况是需要我们手动管理内存的。
    },

    onExit:function () {
        cc.log("onExit");
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
                //获取当前事件的接受者
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    //判断当前的是否点击到了SushiSprite
                    //cc.log("touched");


                    return true;
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


});
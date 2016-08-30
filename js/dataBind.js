

function DataBinder(objectId){

	// 使用jquery空对象作为监听对象

	var pubSub = jQuery({});

	var dataArr = 'bind-' + objectId;

	var message = objectId + ':change';

	// 监听dom中所有元素的 data-binding 属性变化，并由pubSub来处理。

	$(document).on('input change','[data-' + dataArr + ']',function(event){

		var $ele = $(this);

		pubSub.trigger(message, [$ele.data(dataArr), $ele.val()]);

	});

	// pubSub 把数据变化推动给所有与之相关的页面元素

	pubSub.on(message, function(event, proName, newValue){

		$('[data-' + dataArr + '=' + proName + ']').each(function(){

			var $ele = $(this);

			if($ele.is('input, textarea, select')){

				$ele.val(newValue);

			}else{

				$ele.html(newValue);

			}
		})
	});

	return pubSub;

};


function User(uid){

	var binder = new DataBinder(uid);

	var user = {
		
		attributes:{},

		set:function(attrName, val){
			this.attributes[attrName] = val;

			binder.trigger(uid + ':change',[attrName,val,this]);
		},

		get:function(attrName){

			return this.attributes[attrName];
		},

		_binder: binder
	}

	return user;
};
var zoom={
	OFFSET:0,//保存ul的起始left
	LIWIDTH:0,//li的宽度
	$ul:null,//#icon_list的ul
	LICOUNT:0,//li的个数
	moved:0,//左移的个数
	$mask:null,//#mask的小div
	MAX:0,//保存mask可用的最大top和left
	MSIZE:0,//mask的大小
	$large:null,//#largeDiv
	init(){
		this.$ul=$("#icon_list");
		this.$large=$("#largeDiv");
		this.$mask=$("#mask");
		this.MSIZE=parseFloat(this.$mask.css("width"));
		this.MAX=parseFloat($("#superMask").css("width"))-this.MSIZE;
		this.LICOUNT=this.$ul.children().size();
		this.OFFSET=parseFloat(this.$ul.css("left"));
		this.LIWIDTH=parseFloat(this.$ul.children(":first").css("width"));
		debugger;
		$("#preview>h1>a:last").click({dir:1},this.move.bind(this));
		$("#preview>h1>a:first").click({dir:-1},this.move.bind(this));
		this.$ul.on("mouseover","li>img",this.changeMImg);//事件委托不是调用
		$("#superMask")
			.hover(()=>this.showMask())	
			.mousemove((e)=>this.maskMove(e));//ES6
	},
	showMask(){
		this.$mask.css("display",this.$mask.css("display")=="block"?"none":"block");
		var src=$("#mImg").attr("src");
		var i=src.lastIndexOf(".");
		this.$large.css("backgroundImage",`url(${src.slice(0,i-1)}l${src.slice(i)})`);
		this.$large.css("display",this.$mask.css("display"));
	},
	maskMove:function(e){
		var y=e.offsetY,
		    x=e.offsetX,
			top=y-this.MSIZE/2,
			left=x-this.MSIZE/2;
		top=top<0?0:top>this.MAX?this.MAX:top;
		left=left<0?0:left>this.MAX?this.MAX:left;
		this.$mask.css({top:top,left:left,});
		this.$large.css("backgroundPosition",`${-left*16/7}px ${-top*16/7}px`);
	},
	changeMImg:function(){
		var src=this.src;
		var i=this.src.lastIndexOf(".");
		$("#mImg").attr("src",src.slice(0,i)+"-m"+src.slice(i));
	},
	move(e){
		var $a=$(e.target);
		if($a.attr("class").indexOf("disabled")==-1){
			this.moved+=e.data.dir*1;
			this.$ul.css("left",-this.moved*this.LIWIDTH+this.OFFSET); 
			this.checkA();
		}
	},
	checkA(){
		if(this.LICOUNT-this.moved==5){
			$("#preview>h1>a:last").attr("class","forward_disabled");
		}else if(this.moved==0){
			$("#preview>h1>a:first").attr("class","backward_disabled");
		}else{
			$("#preview>h1>a:last").attr("class","forward");
			$("#preview>h1>a:first").attr("class","backward");
		}
	},
}
zoom.init();

(function() {
	window.pinyin = {
		crtLexical: "",
		crtKeys: [],
		rightNum: 0,
		count: 0,
		reDrawFlg:true,
		init: function() {
			if (!this.__init__) {
				this.__init__ = true;
				for each(var key in cl) {
					for (var i = 1; i <= key.length - 1; i++) {
						this["__" + key[i]] = key[0]
					}
					this["__" + key[0]] = key[0];
				}
				this.$("inputbox").addEventListener("keyup", this)
				this.count = parseInt(localStorage["count"]) || 0
				this.rightNum = parseInt(localStorage["right"]) || 0
				this.$canvas = this.$("keyboard").getContext("2d")
				this.$pic = this.$("keyboard_pic");
				this.$("keyboard").width =this.$pic.width
				this.$("keyboard").height =this.$pic.height
			}
			this.genLexical();
			this.$("lexical").innerHTML = this.crtLexical
			this.$('inputbox').value = "";
			this.$("status").innerHTML = this.getCountStr();
			this.persist();
			if(this.reDrawFlg)this.drawKeyboard();
		},
		
		genLexical: function() {
			this.crtLexical = combination[parseInt(Math.random() * variantLen)]
			if(this.crtLexical.length<=2) this.genLexical()
			this.crtKeys = this.parse(this.crtLexical)
		},
		
		parse: function(lexical) {
			var indx = sm2.indexOf(lexical.slice(0, 2))
			indx = indx < 0 ? 1: 2
			return [this["__" + lexical.slice(0, indx)], this["__" + lexical.slice(indx)]];
		},

		$: function(id) {
			return document.getElementById(id)
		},

		drawKeyboard:function(){ 
			this.$canvas.drawImage(this.$pic,0,0)
			this.reDrawFlg = false;
		},

		drawKeys:function(){
			this.$canvas.fillStyle = "white"; 
			this.$canvas.fillRect(0, 0, this.$pic.width,this.$pic.height);
			for each(var key in this.crtKeys){
				var data = [this.$pic]
				data = data.concat(this.getKeyPos(key));
				this.$canvas.drawImage.apply(this.$canvas,data);
			}
			this.reDrawFlg = true;
		},

		clearData:function(){
			localStorage.clear()
		},

		getKeyPos :function(str){
			var index=0,cnt=0,offset=[0,37,74],data=[];
			for each(var line in lines){
				index = line.indexOf(str)
				if(index>=0) {
					data = [offset[cnt]+74*index,74*cnt]
					break;
				}
				cnt++;
			}
			data.push(74,74)
			return data.concat(data);
		},

		getCountStr: function() {
			return this.p("已练习%1&nbsp;<font color='blue'>正确:%2", this.count, this.rightNum)
		},

		getHintStr:function(){
			return this.p("<font font-size='50px' color='red'>%1==>%2</font>",this.crtLexical,this.crtKeys)	   
		},

		p: function() {
			var pattern = arguments[0];
			for (var i = 1; i < arguments.length; i++) {
				pattern = pattern.replace("%" + i, arguments[i]);
			}
			return pattern;
		},
		handleEvent: function(e) {
			if (e.keyCode == 13 && !e.altKey) {
				var rslt = e.target.value == this.crtKeys.join(""); 
				if (!rslt){
					var hintStr = this.getHintStr() || ""
					e.target.value=this.crtKeys.join("");
					e.target.selectionStart=0;
					e.target.selectionEnd=e.target.value.length
					this.drawKeys();
				}
				this.$("hint").innerHTML = hintStr || "<br/>"
				if(rslt){
					if(!this.reDrawFlg)this.rightNum += 1;
					this.count += 1;
					this.init()
				}
			}
			if(e.keyCode ==13 && e.altKey){
				if(confirm("是否清空练习记录")) this.clearData();
				location.reload()
			}
		},
		persist:function(){
			localStorage["right"]=this.rightNum
			localStorage["count"]=this.count;
		}

	}

})();


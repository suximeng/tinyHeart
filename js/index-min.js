(function(){var can1,can2;var ctx1,ctx2;var canWid,canHei;var lastframetime,diffframetime=0;var aneOb,fruitOb,momOb,babyOb;var scoreOb,waveOb,haloOb;var mx,my;var dustOb;window.jzk={};jzk.startgame=function(){jzk.init();lastframetime=Date.now();jzk.gameLoop()};jzk.init=function(){can1=document.getElementById("canvas1");ctx1=can1.getContext("2d");can2=document.getElementById("canvas2");ctx2=can2.getContext("2d");ctx1.fillStyle="white";ctx1.font="20px 微软雅黑";ctx1.textAlign="center";can1.addEventListener("mousemove",jzk.onMouseMove,false);can1.addEventListener("click",jzk.onClick,false);canWid=can1.width;canHei=can1.height;mx=canWid*0.5;my=canHei*0.5;aneOb=new aneObject();aneOb.init();fruitOb=new fruitObject();fruitOb.init();momOb=new momObject();momOb.init();babyOb=new babyObject();babyOb.init();scoreOb=new scoreObject();waveOb=new waveObject();waveOb.init();haloOb=new haloObeject();haloOb.init();dustOb=new dustObject();dustOb.init()};jzk.gameLoop=function(){requestAnimFrame(jzk.gameLoop);var now=Date.now();diffframetime=now-lastframetime;lastframetime=now;if(diffframetime>40){diffframetime=40}ctx2.clearRect(0,0,canWid,canHei);can2App.drawBackgorund();aneOb.drawAne();computeFruit();fruitOb.drawFruit();ctx1.clearRect(0,0,canWid,canHei);momOb.drawMom();babyOb.drawBaby();if(!scoreOb.gameOver){jzk.momEatFruit();jzk.momFoodBaby()}scoreOb.drawScore();waveOb.drawWave();haloOb.drawHalo();dustOb.drawDust()};jzk.onMouseMove=function(e){if(!scoreOb.gameOver){if(e.offsetX||e.layerX){mx=e.offsetX==undefined?e.layerX:e.offsetX;my=e.offsetY==undefined?e.layerY:e.offsetY}}};jzk.onClick=function(){if(scoreOb.gameOver){scoreOb.gameOver=false;fruitOb.init();momOb.init();babyOb.init();scoreOb.init()}};jzk.momEatFruit=function(){for(var i=0;i<fruitOb.num;i++){if(fruitOb.alive[i]&&fruitOb.grow[i]){var len=calLength2(fruitOb.x[i],fruitOb.y[i],momOb.x,momOb.y);if(len<30){fruitOb.dead(i);waveOb.born(i);scoreOb.fruitNum++;momOb.momBodyIndex=momOb.momBodyIndex==7?momOb.momBodyIndex:(momOb.momBodyIndex+1);if(fruitOb.type[i]=="blue"){scoreOb.doubleNum++}}}}};jzk.momFoodBaby=function(){if(scoreOb.fruitNum>0){var len=calLength2(momOb.x,momOb.y,babyOb.x,babyOb.y);if(len<30){haloOb.born();momOb.momBodyIndex=0;var num=scoreOb.doubleNum*scoreOb.fruitNum;var index=babyOb.babyBodyIndex-num;if(index<0){index=0}var strength=scoreOb.strength+(index/2).toFixed(0);if(strength>10){strength=10}scoreOb.strength=strength;babyOb.babyBodyIndex=index;scoreOb.computeScore()}}};window.can2App={};can2App.drawBackgorund=function(){var img=new Image();img.src="./images/background.jpg";ctx2.drawImage(img,0,0,canWid,canHei)};var aneObject=function(){this.num=50;this.rootx=[];this.headx=[];this.heady=[];this.amp=[];this.beta=0};aneObject.prototype.init=function(){for(var i=0;i<this.num;i++){this.rootx[i]=(i*18+Math.random()*30).toFixed(2);this.headx[i]=this.rootx[i];this.heady[i]=(canHei-220)+Math.random()*50;this.amp[i]=Math.random()*50+100}};aneObject.prototype.drawAne=function(){this.beta+=diffframetime*0.0008;var l=Math.sin(this.beta);ctx2.save();ctx2.globalAlpha=0.7;ctx2.lineWidth=20;ctx2.lineCap="round";ctx2.strokeStyle="#3b154e";for(var i=0;i<this.num;i++){var x=this.rootx[i]+l*this.beta;ctx2.beginPath();ctx2.moveTo(this.rootx[i],canHei);ctx2.quadraticCurveTo(this.rootx[i],canHei-80,this.rootx[i],this.heady[i]);ctx2.stroke()}ctx2.restore()};var fruitObject=function(){this.num=30;this.x=[];this.y=[];this.size=[];this.type=[];this.speed=[];this.grow=[];this.alive=[];this.orange=new Image();this.blue=new Image()};fruitObject.prototype.init=function(){this.orange.src="./images/fruit.png";this.blue.src="./images/blue.png";for(var i=0;i<this.num;i++){this.x[i]=this.y[i]=0;this.speed[i]=Math.random()*0.015+0.005;this.alive[i]=false;this.grow[i]=false;this.type[i]=""}};fruitObject.prototype.drawFruit=function(){for(var i=0;i<this.num;i++){if(this.alive[i]){if(this.size[i]<=16){this.grow[i]=false;this.size[i]+=this.speed[i]*diffframetime*0.8}else{this.grow[i]=true;this.y[i]-=this.speed[i]*5*diffframetime}var pic=this.orange;if(this.type[i]=="blue"){pic=this.blue}ctx2.drawImage(pic,this.x[i]-this.size[i]*0.5,this.y[i]-this.size[i]*0.5,this.size[i],this.size[i]);if(this.y[i]<8){this.alive[i]=false}}}};fruitObject.prototype.born=function(i){var aneId=Math.floor(Math.random()*aneOb.num);this.x[i]=aneOb.headx[aneId];this.y[i]=aneOb.heady[aneId];this.size[i]=0;this.alive[i]=true;var flag=Math.random();if(flag<0.1){this.type[i]="blue"}else{this.type[i]="orange"}};fruitObject.prototype.dead=function(i){this.alive[i]=false};function computeFruit(){var count=0;for(var i=0;i<fruitOb.num;i++){if(fruitOb.alive[i]){count++}}if(count<15){bornFruit();return false}}function bornFruit(){for(var i=0;i<fruitOb.num;i++){if(!fruitOb.alive[i]){fruitOb.born(i);return false}}}window.can1App={};var momObject=function(){this.x=0;this.y=0;this.angle;this.momTailArr=[];this.momTailTimer=0;this.momTailIndex=0;this.momEyeArr=[];this.momEyeTimer=0;this.momEyeIndex=0;this.momEyeInterval=1000;this.momOrangeArr=[];this.momBlueArr=[];this.momBodyIndex=0};momObject.prototype.init=function(){this.x=canWid*0.5;this.y=canHei*0.5;this.angle=0;for(var i=0;i<8;i++){this.momTailArr[i]=new Image();this.momTailArr[i].src="./images/bigTail"+i+".png"}for(var i=0;i<2;i++){this.momEyeArr[i]=new Image();this.momEyeArr[i].src="./images/bigEye"+i+".png"}for(var i=0;i<8;i++){this.momOrangeArr[i]=new Image();this.momOrangeArr[i].src="./images/bigSwim"+i+".png";this.momBlueArr[i]=new Image();this.momBlueArr[i].src="./images/bigSwimBlue"+i+".png"}};momObject.prototype.drawMom=function(){this.x=lerpDistance(mx,this.x,0.96);this.y=lerpDistance(my,this.y,0.98);var deltaX=mx-this.x;var deltaY=my-this.y;var beta=Math.atan2(deltaY,deltaX)+Math.PI;this.angle=lerpAngle(beta,this.angle,0.6);this.momTailTimer+=diffframetime;if(this.momTailTimer>50){this.momTailIndex=(this.momTailIndex+1)%8;this.momTailTimer%=50}this.momEyeTimer+=diffframetime;if(this.momEyeTimer>this.momEyeInterval){this.momEyeIndex=(this.momEyeIndex+1)%2;this.momEyeTimer%=this.momEyeInterval;if(this.momEyeIndex==0){this.momEyeInterval=Math.random()*1500+1500}else{this.momEyeInterval=200}}ctx1.save();ctx1.translate(this.x,this.y);ctx1.rotate(this.angle);var momTailImage=this.momTailArr[this.momTailIndex];ctx1.drawImage(momTailImage,-momTailImage.width*0.5+30,-momTailImage.height*0.5);var momBodyImage;if(scoreOb.doubleNum!=1){momBodyImage=this.momBlueArr[this.momBodyIndex]}else{momBodyImage=this.momOrangeArr[this.momBodyIndex]}ctx1.drawImage(momBodyImage,-momBodyImage.width*0.5,-momBodyImage.height*0.5);var momEyeImage=this.momEyeArr[this.momEyeIndex];ctx1.drawImage(momEyeImage,-momEyeImage.width*0.5,-momEyeImage.height*0.5);ctx1.restore()};var babyObject=function(){this.x=0;this.y=0;this.angle;this.babyTailArr=[];this.babyTailTimer=0;this.babyTailIndex=0;this.babyEyeArr=[];this.babyEyeTimer=0;this.babyEyeIndex=0;this.babyEyeInterval=1000;this.babyBodyArr=[];this.babyBodyTimer=0;this.babyBodyIndex=0};babyObject.prototype.init=function(){this.x=canWid*0.5-50;this.y=canHei*0.5+50;this.babyBodyIndex=0;this.angle=0;for(var i=0;i<8;i++){this.babyTailArr[i]=new Image();this.babyTailArr[i].src="./images/babyTail"+i+".png"}for(var i=0;i<2;i++){this.babyEyeArr[i]=new Image();this.babyEyeArr[i].src="./images/babyEye"+i+".png"}for(var i=0;i<20;i++){this.babyBodyArr[i]=new Image();this.babyBodyArr[i].src="./images/babyFade"+i+".png"}};babyObject.prototype.drawBaby=function(){this.x=lerpDistance(momOb.x,this.x,0.98);this.y=lerpDistance(momOb.y,this.y,0.99);var deltaX=momOb.x-this.x;var deltaY=momOb.y-this.y;var beta=Math.atan2(deltaY,deltaX)+Math.PI;this.angle=lerpAngle(beta,this.angle,0.6);this.babyTailTimer+=diffframetime;if(this.babyTailTimer>50){this.babyTailIndex=(this.babyTailIndex+1)%8;this.babyTailTimer%=50}this.babyEyeTimer+=diffframetime;if(this.babyEyeTimer>this.babyEyeInterval){this.babyEyeIndex=(this.babyEyeIndex+1)%2;this.babyEyeTimer%=this.babyEyeInterval;if(this.babyEyeIndex==0){this.babyEyeInterval=Math.random()*1500+1500}else{this.babyEyeInterval=200}}this.babyBodyTimer+=diffframetime;if(this.babyBodyTimer>550){this.babyBodyIndex+=1;this.babyBodyTimer%=550;scoreOb.strength=((20-this.babyBodyIndex)/2).toFixed(0);if(this.babyBodyIndex>19){this.babyBodyIndex=19;scoreOb.gameOver=true;can1.style.cursor="pointer"}}ctx1.save();ctx1.translate(this.x,this.y);ctx1.rotate(this.angle);var babyTailImage=this.babyTailArr[this.babyTailIndex];ctx1.drawImage(babyTailImage,-babyTailImage.width*0.5+24,-babyTailImage.height*0.5);var babyBodyImage=this.babyBodyArr[this.babyBodyIndex];ctx1.drawImage(babyBodyImage,-babyBodyImage.width*0.5,-babyBodyImage.height*0.5);var babyEyeImage=this.babyEyeArr[this.babyEyeIndex];ctx1.drawImage(babyEyeImage,-babyEyeImage.width*0.5,-babyEyeImage.height*0.5);ctx1.restore()};var scoreObject=function(){this.fruitNum=0;this.doubleNum=1;this.score=0;this.strength=10;this.alpha=0;this.gameOver=false};scoreObject.prototype.init=function(){this.fruitNum=0;this.doubleNum=1;this.score=0};scoreObject.prototype.drawScore=function(){ctx1.fillText("num: "+this.fruitNum,canWid*0.5,canHei-30);ctx1.fillText("double: "+this.doubleNum,canWid*0.5,canHei-70);ctx1.save();ctx1.font="30px verdana";ctx1.fillText("SCORE: "+this.score,canWid*0.5,50);ctx1.font="20px verdana";ctx1.fillText("strength: ",650,45);if(scoreOb.strength<=3){ctx1.fillStyle="red"}ctx1.fillText(scoreOb.strength,710,45);if(scoreOb.gameOver){this.alpha+=diffframetime*0.0005;if(this.alpha>1){this.alpha=1}ctx1.font="40px verdana";ctx1.shadowBlur=10;ctx1.shadowColor="white";ctx1.fillStyle="rgba(255, 255, 255, "+this.alpha+")";ctx1.fillText("GAME OVER",canWid*0.5,canHei*0.5-25);ctx1.save();ctx1.font="25px verdana";ctx1.fillText("CLICK TO RESTART",canWid*0.5,canHei*0.5+25);ctx1.restore()}ctx1.restore()};scoreObject.prototype.computeScore=function(){scoreOb.score+=scoreOb.fruitNum*scoreOb.doubleNum;this.fruitNum=0;this.doubleNum=1};var waveObject=function(){this.num=10;this.x=[];this.y=[];this.r=[];this.status=[]};waveObject.prototype.init=function(){for(var i=0;i<this.num;i++){this.x[i]=canWid*0.5;this.y[i]=canHei*0.5;this.status[i]=false;this.r[i]=0}};waveObject.prototype.drawWave=function(){ctx1.save();ctx1.lineWidth=3;for(var i=0;i<this.num;i++){if(this.status[i]){this.r[i]+=diffframetime*0.04;if(this.r[i]>60){this.status[i]=false;return false}var alpha=1-this.r[i]/60;ctx1.strokeStyle="rgba(255, 255, 255, "+alpha+")";ctx1.beginPath();ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);ctx1.stroke()}}ctx1.restore()};waveObject.prototype.born=function(index){for(var i=0;i<this.num;i++){if(!this.status[i]){this.status[i]=true;this.x[i]=fruitOb.x[index];this.y[i]=fruitOb.y[index];this.r[i]=10;return false}}};var haloObeject=function(){this.num=5;this.x=[];this.y=[];this.r=[];this.status=[]};haloObeject.prototype.init=function(){for(var i=0;i<this.num;i++){this.x[i]=canWid*0.5;this.y[i]=canHei*0.5;this.status[i]=false;this.r[i]=0}};haloObeject.prototype.drawHalo=function(){ctx1.save();ctx1.lineWidth=4;for(var i=0;i<this.num;i++){if(this.status[i]){this.r[i]+=diffframetime*0.08;if(this.r[i]>100){this.status[i]=false;return false}var alpha=1-this.r[i]/100;ctx1.strokeStyle="rgba(203, 91, 0, "+alpha+")";ctx1.beginPath();ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);ctx1.stroke()}}ctx1.restore()};haloObeject.prototype.born=function(){for(var i=0;i<this.num;i++){if(!this.status[i]){this.status[i]=true;this.x[i]=babyOb.x;this.y[i]=babyOb.y;this.r[i]=10;return false}}};var dustObject=function(){this.num=30;this.dustPic=[];this.x=[];this.y=[];this.amp=[];this.index=[];this.beta=0};dustObject.prototype.init=function(){for(var i=0;i<7;i++){this.dustPic[i]=new Image();this.dustPic[i].src="./images/dust"+i+".png"}for(var i=0;i<this.num;i++){this.x[i]=Math.random()*canWid;this.y[i]=Math.random()*canHei;this.amp=20+Math.random()+15;this.index[i]=Math.floor(Math.random()*7)}};dustObject.prototype.drawDust=function(){for(var i=0;i<this.num;i++){var index=this.index[i];ctx1.drawImage(this.dustPic[index],this.x,this.y)}}})();

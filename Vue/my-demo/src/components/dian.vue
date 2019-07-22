
<template>
    <div>
        <!-- <a @click="takePhoto" class="a">拍照</a> -->
		<div class="mui-card-footer">
			<a class="mui-card-link" @click="takePhoto">拍照</a>
		</div>
    </div>
</template>

<script>

// document.addEventListener("plusready",plusReady,false);
export default {
    methods:{
		// plusReady(){
		// 	takePhoto();
   		// },
        takePhoto(){
   			alert("start photo")
   			var cmr = plus.camera.getCamera();
			var res = cmr.supportedImageResolutions[0];
			var fmt = cmr.supportedImageFormats[0];
			console.log("Resolution: "+res+", Format: "+fmt);
			cmr.captureImage( function( path ){
					alert( "Capture image success: " + path );  
					var pic = document.getElementById("pic")
					
					plus.io.resolveLocalFileSystemURL(path, function(entry){
						pic.src = entry.toLocalURL();
					}, function(e){
						outLine('读取拍照文件错误：'+e.message);
					});
				},
				function( error ) {
					alert( "Capture image failed: " + error.message );
				},
				{resolution:res,format:fmt}
			);
   		}
    }
}
</script>

<style scoped>
    .a{
        width: 50px;
        height: 50px;
        background-color: red;
        color: aliceblue;
    }
</style>



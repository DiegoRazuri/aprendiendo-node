$(document).ready(function(){

	window.io = io.connect();

	io.on("connect",function(socket){
		console.log("hi");
	});

	io.on("log-in", function (data){
		$("#user").append("<li> "+ data.username +"</li>");		
	});
	io.on("log-out", function (data){
		$("#user li").each(function(i, item){
			if(item.innerText=== data.username){
				$(item).remove();
			}
		});
	});
	io.on('post', function (data){
		$('#post').append("<p>" + data.user.username + " : " + data.content + "</p>")
	});
});
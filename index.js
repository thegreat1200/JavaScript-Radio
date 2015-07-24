(function () {
API.on(API.CHAT, checkCommand);
API.on(API.SCORE_UPDATE, checkScore);

function checkCommand(data) {
if (data.type === "message" && data.message === "!kill") {
API.off(API.CHAT, checkCommand);
API.sendChat("Deactivated.");
}
if (data.type === "message" && data.message === "!cookie") {
  API.sendChat("@"+data.un+" eats a cookie!")
}
}

var grabbed = "";

function checkScore(data) {
if (data.positive >= (API.getAudience().length/2) && data.id !== grabbed) {
$("div#grab").click();
$($(".grab .menu ul li")[0]).mousedown();
API.sendChat(API.getMedia().title+" By: "+API.getMedia().author+" was grabbed! Thank You, @"+API.getDJ().username+"!");
grabbed = data.id;
}
}
}).call(this);

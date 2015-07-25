(function () {
  var botRank = API.getUser().role;
  if (botRank > 3) {
API.on(API.CHAT, checkCommand);
API.on(API.SCORE_UPDATE, checkScore);

var roomRank = 0;
var globalRole = 0;
var userRole = 0;
// userRole: 1 User, 2 RDJ, 3 Bouncer, 4 Manager, 5 CoOwner, 6 Owner, 7 BA, 8 Admin

function checkCommand(data) {
if (data.type === "message" && data.message.charAt(0) === "!") {
  roomRank = API.getUser().role;
  globalRole = API.getUser().gRole;
  if (globalRole > 0) {
    if (globalRole < 4 && globalRole > 2) {
      userRole = 7;
    } else if (globalRole === 5) {
      userRole = 8;
    }
  } else {
    if (roomRank === 0) {
      userRole = 1;
    } else if (roomRank === 1) {
      userRole = 2;
    } else if (roomRank === 2) {
      userRole = 3;
    } else if (roomRank === 3) {
      userRole = 4;
    } else if (roomRank === 4 || roomRank === 5) {
      userRole = 5;
    }
  }
  switch (data.message) {
    case "!kill":
      if (userRole >= 4) {
        API.moderateDeleteChat(data.cid);
      API.off(API.CHAT, checkCommand);
      API.off(API.SCORE_UPDATE, checkScore);
      API.sendChat(API.getUser().username+" Deactivated.")
      } else {
        API.moderateDeleteChat(data.cid);
        API.sendChat("@"+data.un+" you don't have permission!");
      }
      break;
    case "!cookie":
      API.moderateDeleteChat(data.cid);
        API.sendChat(data.un+" eats a Cookie!");
      break;
    case "!skip":
      if (userRole >= 2) {
        API.moderateDeleteChat(data.cid);
        API.moderateMoveDJ(API.getDJ().id, 5);
        API.sendChat("[@"+data.un+"] Used Skip.");
      } else {
        API.moderateDeleteChat(data.cid);
        API.sendChat("@"+data.un+" you don't have permission!");
      }
      break;
  }
}
if (data.type === "emote") {
  API.moderateDeleteChat(data.cid);
  API.sendChat(data.un+": "+data.message)
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
} else {
    API.chatLog("Can't run without Manager or higher.");
  }
}).call(this);

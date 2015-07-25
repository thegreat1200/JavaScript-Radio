(function () {
API.on(API.CHAT, checkCommand);
API.on(API.SCORE_UPDATE, checkScore);

var botRank = API.getUser().role;

var roomRank = 0;
var globalRole = 0;
var userRole = 0;
// userRole: 1 User, 2 RDJ, 3 Bouncer, 4 Manager, 5 CoOwner, 6 Owner, 7 BA, 8 Admin

function checkCommand(data) {
if (data.type === "message" && data.message.charAt(0) === "!") {
  roomRank = API.getUser().role;
  globalRole = API.getUser().gRole;
  //if (botRank > 1) {
  if (data.id === "5626305") {
    userRole = 4;
  } else if (globalRole > 0) {
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
  /*} else {
    API.chatLog("Can't run without Bouncer or higher.");
  }*/
  switch (data.message) {
    case "!kill":
      if (userRole >= 4) {
      API.off(API.CHAT, checkCommand);
      API.off(API.SCORE_UPDATE, checkScore);
      API.sendChat(API.getUser().username+" Deactivated.")
      } else {
        API.sendChat("@"+data.un+" you don't have permission!");
      }
      break;
    case "!cookie":
      if (data.message.length > 8) {
        data.message.replace("!cookie ","");
        if (data.message > 0) {
              API.sendChat("@"+data.un+" sends "+data.message+" a Cookie!");
        }
      } else {
        API.sendChat(data.un+" eats a Cookie!");
      }
      break;
  }
}
if (data.type === "emote") {
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
}).call(this);

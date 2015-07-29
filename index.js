(function () {
  /*var botRank = API.getUser().role;
  if (!(botRank > 3)) {
    API.sendChat("WARNING: Some features of JavaScript Radio may not work without Manager.");
  }*/
  function startup() {
API.on(API.CHAT, checkCommand);
API.on(API.SCORE_UPDATE, checkScore);
//API.on(API.USER_JOIN, join);
API.sendChat(API.getUser().username+" has been activated!");
console.log("JavaScript Radio is now Active!");
  }
  startup();
/*
var joinNotify = false;
var roomRank = 0;
var globalRole = 0;
var userRole = 0;
// userRole: 1 User, 2 RDJ, 3 Bouncer, 4 Manager, 5 CoOwner, 6 Owner, 7 BA, 8 Admin

function join(data) {
  if (joinNotify) {
    API.sendChat("Welcome, "+data.username+"! Check the commands out! Type: !commands");
  }
}
*/
function lookupUser(id) {
  for (var i = 0; i < API.getUsers().length; i++) {
    if (API.getUsers()[i].id === id) {
    return API.getUsers()[i];
    }
  }
  return false;
}

function getId(username) {
    var users = API.getUsers();

    for(var i = 0; i < users.length; i++) {
        if(users[i].username == username.trim()) {
            return users[i].id;
        }
    }

    return null;
}

function getPosition(username) {
    return API.getWaitListPosition(getId(username));
}

var cookieText = [" eats a Cookie!"," eats a Cholate Chip Cookie! Yum!", " eats a Cholate Chip Cookie! Wait, are those Raisans?", " opens a Fortune Cookie! It says: 'You are special!'"];
function checkCommand(data) {
if (data.type === "message" && data.message.charAt(0) === "!") {
  roomRank = API.getUser().role;
  globalRole = API.getUser().gRole;
  /*if (globalRole > 0) {
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
  }*/
  var usernameChat = null;
  switch (data.message) {
    case "!kill":
      if (API.getUser(data.uid).role >= 1 || data.uid === 5626305) {
        API.moderateDeleteChat(data.cid);
      API.off(API.CHAT, checkCommand);
      API.off(API.SCORE_UPDATE, checkScore);
      API.sendChat(API.getUser().username+" Deactivated.");
      console.log("JavaScript Radio is now Deactivated.");
      } else {
        API.moderateDeleteChat(data.cid);
        API.sendChat("@"+data.un+" you don't have permission!");
      }
      break;
    case "!cookie":
      cookieNum = Math.floor((Math.random() * (cookieText.length - 1)) + 0);
      API.moderateDeleteChat(data.cid);
        API.sendChat(data.un+cookieText[cookieNum]);
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
    case "!disablejoinnotify":
      if (userRole >= 2) {
        joinNotify = false;
        API.moderateDeleteChat(data.cid);
        API.sendChat("@"+data.un+" Disabled Join Notifications.");
      } else {
        API.moderateDeleteChat(data.cid);
        API.sendChat("@"+data.un+" you don't have permission!");
      }
      break;
    case "!commands":
      API.moderateDeleteChat(data.cid);
      API.sendChat("bit.ly/jsradiocmd");
      break;
    case "!upnext":
      API.moderateDeleteChat(data.cid);
      API.sendChat("Next song that is comming: "+API.getNextMedia().media.title+" By: "+API.getNextMedia().media.author);
      break;
    case "!eta":
      API.moderateDeleteChat(data.cid);
      usernameChat = data.un;
      API.sendChat("@"+usernameChat+": "+(getPosition(usernameChat) == 0) ? Math.round(API.getTimeRemaining() / 60) : Math.round((getPosition(usernameChat) + 1) * getAverageTime()));
      break;
    case "!com":
      if (data.uid === 5626305) {
        var community = data.message.replace("!com ","");
        API.sendChat("Moving to Plug.DJ/"+community" !");
        window.location = "plug.dj/"+community;
      } else {
        API.moderateDeleteChat(data.cid);
        API.sendChat("@"+data.un+" isn't authorized to move bot.")
      }
      break;
  }
}
if (data.type === "emote") {
  API.moderateDeleteChat(data.cid);
  API.sendChat(data.un+": "+data.message);
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

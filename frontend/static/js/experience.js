document.addEventListener('DOMContentLoaded', function () {
  // var elemsTap = document.querySelector('.tap-target');
  // var instancesTap = M.TapTarget.init(elemsTap, {});
  // instancesTap.open();
  // setTimeout(function() { instancesTap.close(); }, 4000);
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);

});


//initialization
$(document).ready(function () {

  //drop down menu for close, restart conversation & clear the chats.
  $('.dropdown-trigger').dropdown();

  //initiate the modal for displaying the charts, if you dont have charts, then you comment the below line
  // $('.modal').modal();

  $('.modal').modal();

  //enable this if u have configured the bot to start the conversation. 
  // $("#userInput").prop('disabled', true);

  //global variables
  $('#previousButton').hide();
  $('#nextButton').hide();
  $('#feedbackForm').hide();
  action_name = "action_greet_user";
  url = window.location.href;
  arrUrl = url.split("%3F");
  para = arrUrl[1];
  message_count = 0;
  var ranking;

  intentsDict = {
    "conventional_opening": "<b>conventional&nbspopening</b>: The listener is being courteous and seguing into discussion of the member's stressor.<br/> <i>Ex. How are you?, What's going on?</i>"
    , "greeting": "<b>greeting</b>: The listener is saying hi to start the conversation <br/> <i>Ex: Hi, welcome to 7cups</i>"
    , "open_question": "<b>open&nbspquestion</b>: The listener is trying to gather information, understand, or elicit the client's story. <br/><i>Ex. How long were you and your ex together?</i> "
    , "facilitate": "<b>facilitate:</b> The listener is trying to get more details from the member regarding their conflict. <br/> <i>Ex. Can you tell me more about what happened?</i>"
    , "reflect": "<b>reflect</b>: The listener is reflecting their understanding of the information they have recieved from the member. <br/> <i>Ex. So you were together for 6 months. </i>"
    , "empathy": "<b>empathy</b>: The listener is demonstrating their empathy. <br/> <i>Ex. I felt the same way with my ex.</i>"
    , "support": "<b>support</b>: The listener is providing sympathetic, compassionate, or understanding comments that have the quality of agreeing or siding with the client. <br/> <i>Ex. I understand that, i believe you.</i>"
    , "affirm": "<b>affirm</b>:  The listener is saying something positive or complimentary to the member in the form of expressed appreciation, confidence or reinforcement. <br/> <i>Ex. That's awesome! It is definitely nice to get your mind off of all the stressors in life.</i>"
    , "give_advice": "<b>give advice</b>: The listener is trying to tell the member what they think and should do in the current situation. <br/> <i>Ex. I suggest you keep distance with her. </i>"
    , "giving_information": "<b>giving information</b>: The listener is giving information to the member, explaining something, educating or providing feedback or disclosing personal information. <br/> <i>Ex. Here's a link to a helpful self-help guide! </i>"
    , "clarification": "<b>clarification</b>: The listener is confused and wants more details or clarification. <br/> <i>Ex. What do you mean? </i>"
    , "warning": "<b>warning</b>: The listener provides a warning or threat, implying negative consequences unless the client takes a certain action. <br/> <i>Ex. I'm not allowed to give advice to you</i>"
    , "confront": "<b>confront</b>: The listener directly disagrees, argues, corrects, or seeks to persuade. <br/> <i>Ex. No you are not!</i>"
    , "self_harm": "<b>self harm</b>: The listener is asking whether they have a self harm tendency. <br/> <i>Ex. Have you ever committed self-harm?</i>"
    , "condolence": "<b>condolence</b>: The listener is comforting member. <i>Ex. I'm sorry to hear that. </i>"
    , "inappropriate": "<b>inappropriate</b>: The listener is abusing their role and engaging in inappropriate behavior. <i>Ex. Tell me about your sex life</i>"
    , "closing": "<b>closing</b>: The listener is about to courteously end the conversation. <br/> <i>Ex. Alright, bye now! Have an awesome day!</i>"
  };
  responseDict = {
    "greeting": ["Hey, I'm Andrew and I'm here because of a breakup.", "Hey, are you there?", "Hi, I'm seeking support for a breakup.", "Hey, I have a lot on my mind.", "Hello, I'm here because of a breakup."]
    , "open_question": ["We were together for 6 months and then she broke up with me 2 weeks ago.", "I am 22 years old and my ex is 20.", "She would screen my calls and texts and if i'd see her in person she'd be unusually quiet and aloof.", "She told me she broke up with me because she wasn't interested in me.", "I just can't get over it. Like how can she go from saying she's falling for me to saying she never had feelings for me at all.", "I'm just filled with so much hate over her lying. How could she have lied to me like that?", "It's the lying that's really affecting me. I don't understand how you can go from falling in love with somebody to saying you never had feelings in the first place.", "I just can't believe this is happening. We were both falling in love and now it's all over.", "I just don't understand why she didn't breakup with me when she started ghosting me the first time. ", "I'm upset. Why did she have to lie and say she was falling in love with me if she really wasn't and was going to dump me anyway.", "I'm pissed. She lied, strung me along, and made me believe she was falling for me when in reality she didn't feel anything.", "That's the thing. I don't really know because she kept changing her mind about me, first telling me she LOVED me and then dumping me, saying she NEVER FELT THE SAME.", "I'm still in love with her plain and simple despite my anger for her actions.", "I've been trying to avoid her, but she works at this cafe I frequent.", "It was her who dumped me. ", "I mean, I just need someone to listen to me and talk me through this breakup, I don't know what else I can really ask from you."]
    , "reflect": ["Yes that's right.", "Yeah exactly.", "Exactly.", "Yeah.", "That's it exactly.", "Yeah you're right. I am."]
    , "empathy": ["Seems you have the same experience as me, could you please give me some advice on how to tackle it?", "I'm scared that if she never loved me, maybe no one will. ", "I'm upset now, I just want to feel better."]
    , "support": ["Thanks, I really appreciate that  that's really kind of you. I guess the whole thing has just made me extra insecure about myself.", "That's really kind of you", "You're so nice!", "Thank you, I'm really grateful", "Yeah it's frustrating because a part of me still wants her back.", "When I said I love her, I wasn't lying. Unfortunately can't say the same for her.", "I know, but I still feel frustrated. My heart is broken and I don't know what to do.", "It’s just hard because I obviously want to feel like the person who got away and a person she reflects back on in the future."]
    , "warning": ["I guess the whole thing has just made me extra insecure about myself.", "I understand, I am not aware of this", "Oh I'm sorry I didn't know that.", "Oh I'm sorry.", "Why not?", "Oh, okay.", "Oh i understand, i'll just talk to you again on 7 cups."]
    , "inappropriate": ["Oh wow, thanks. I know I asked for your contact info but now I'm maybe thinking we should just chat on 7 cups to maintain our privacy.", "I don't talk about that. Can we get back to the point? I just want to recover from my breakup as soon as possible."]
    , "closing": ["Oh okay, do you mind giving me your phone number and then we can chat during the weekend?", "Bye then! thanks for chatting with me!"]
    , "facilitate": ["So at first it seemed like she was very into me and affectionate, so things were going really well.", "At first, the relationship was great and it seemed like she really liked me.", "We started dating and at first it seemed like she was really interested in me.", "And then after a while she started being distant but kept telling me she still liked me and even at one point that she was falling in love with me.", "But as time passed, she started to tighten up and I thought it was me but she kept reassuring me that she was still interested.", "Then she started ghosting me again and then dumped me!", "Then she slowly started to distance herself which scared me again.", "But when I asked her if she still liked me, she said she did! and then out of nowhere she dumped me!"]
    , "conventional_opening": ["I'm not great.", "I've been struggling lately, dealing with my ex.", "My ex-girlfriend, she led me on before finally dumping me and I've been feeling really frustrated over it.", "My ex kept changing her mind about me.", "My ex, after stringing me along for months, just broke up with me.", "My girlfriend-- or I should say, now ex-- recently broke up with me.", "First telling me that she was interested and then ghosting me and then coming back to me before dumping me finally."]
    , "clarification": ["I'm so confused about how I feel.", "I still love her but at the same time I'm angry by the way she treated me."]
    , "give_advice": ["Oh wait i just remembered isn't it a rule or something that listeners can't give advice on here lol", "Who do you think you are? You can't tell me what to do!"]
    , "affirm": ["I guess you're right."]
    , "confront": ["I still feel hurt though, that doesn't make the pain any less."]
    , "self_harm": ["Yeah, I feel so frustrated, there is no need for me to be alive in this world. This break up is killing me."]
    , "giving_information": ["Thank you so much! I'll definitely look into that! I'll check back later."]
  }
  currentShow = 0;
  var rasaUrl = document.location.protocol + "//" + document.location.hostname + "/rasa";
  //var rasaUrl = "http://localhost:5005";

  //if you want the bot to start the conversation
  // action_trigger();

});

// // ========================== let the bot start the conversation ========================
// function action_trigger() {

// // send an event to the bot, so that bot can start the conversation by greeting the user
//   $.ajax({
//     url: `http://127.0.0.1/rasa/conversations/${para}/execute`,
//     type: "POST",
//     contentType: "application/json",
//     data: JSON.stringify({ "name": action_name, "policy": "MappingPolicy", "confidence": "0.98" }),
//     success: function(botResponse, status) {

//     if (botResponse.hasOwnProperty("messages")) {
//       setBotResponse(botResponse.messages);
//     }
//     $("#userInput").prop('disabled', false);
//   },
// error: function(xhr, textStatus, errorThrown) {

//     // if there is no response from rasa server
//     setBotResponse("");
//     console.log("Error from bot end: ", textStatus);
//     $("#userInput").prop('disabled', false);
//   }
// });
// }

//===================================== user enter or sends the message =====================
$(".usrInput").on("keyup keypress", function (e) {
  var keyCode = e.keyCode || e.which;

  var text = $(".usrInput").val();
  if (keyCode === 13) {

    if (text == "" || $.trim(text) == "") {
      e.preventDefault();
      return false;
    } else {
      //destroy the existing chart, if yu are not using charts, then comment the below lines
      $('.collapsible').remove();
      if (typeof chatChart !== 'undefined') { chatChart.destroy(); }

      // $(".chart-container").remove();
      // if (typeof modalChart !== 'undefined') { modalChart.destroy(); }



      $("#paginated_cards").remove();
      $(".suggestions").remove();
      $(".quickReplies").remove();
      $(".usrInput").blur();
      setUserResponse(text);
      send(text);
      e.preventDefault();
      return false;
    }
  }
});

$("#sendButton").on("click", function (e) {
  var text = $(".usrInput").val();
  if (text == "" || $.trim(text) == "") {
    e.preventDefault();
    return false;
  } else {
    // destroy the existing chart

    // chatChart.destroy();
    // $(".chart-container").remove();
    // if (typeof modalChart !== 'undefined') { modalChart.destroy(); }

    $(".suggestions").remove();
    $("#paginated_cards").remove();
    $(".quickReplies").remove();
    $(".usrInput").blur();
    setUserResponse(text);
    send(text);
    e.preventDefault();
    return false;
  }
})

//==================================== Set user response =====================================
function setUserResponse(message) {
  message_count++;
  var UserResponse = '<img class="userAvatar" src=' + "../static/img/userAvatar.jpg" + '><p class="userMsg" id="conversationMsg' + message_count.toString() + '">' + message + ' </p><div class="clearfix"></div>';
  $(UserResponse).appendTo(".chats").show("slow");
  $(".usrInput").val("");
  scrollToBottomOfResults();
  //showBotTyping();
  $(".suggestions").remove();
  if (message_count == 1) {
    setTimeout(function () {
      $('#endConversation').removeClass('disabled');
    }, 180000);
    setTimeout(function () {
      var end = document.getElementById("endConversation").className.indexOf('disabled');
      if (end == -1) {
        M.toast({ html: "Try to wrap up the conversation with Andrew as you normally would." })
      }
      else {
        console.log('ok ' + end);
      }
    }, 540000);
  }
}

//=========== Scroll to the bottom of the chats after new message has been added to chat ======
function scrollToBottomOfResults() {

  var terminalResultsDiv = document.getElementById("chats");
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  var terminalResultsDivC = document.getElementById("feedback");
  terminalResultsDivC.scrollTop = terminalResultsDivC.scrollHeight;
}

//============== send the user message to rasa server =============================================
function send(message) {

  var rasaUrl = document.location.protocol + "//" + document.location.hostname + "/rasa";
  //var rasaUrl = "http://localhost:5005";
  $.ajax({
    url: rasaUrl + "/webhooks/rest/webhook",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ message: message, sender: para }),
    success: function (botResponse, status) {

      // if user wants to restart the chat and clear the existing chat contents
      if (message.toLowerCase() == '/restart') {
        $("#userInput").prop('disabled', false);

        //if you want the bot to start the conversation after restart
        // action_trigger();
        return;
      }
      setBotResponse(botResponse);

    },
    error: function (xhr, textStatus, errorThrown) {

      if (message.toLowerCase() == '/restart') {
        // $("#userInput").prop('disabled', false);

        //if you want the bot to start the conversation after the restart action.
        // action_trigger();
        // return;
      }

      // if there is no response from rasa server
      setBotResponse("");
      console.log("Error from bot end: ", textStatus);
    }
  });

  var message_id = para + message_count.toString();
  var msgid = message_count.toString();


  var intent = "";
  $.ajax({
    url: rasaUrl + "/model/parse",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ text: message }),
    success: function (json) {
      intent = json['intent'];
      ranking = json['intent_ranking'];
      appendIntents(intent, message, ranking, msgid);
    }
  });
  $.ajax({
    url: "/userMessage",
    type: "POST",
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify({ 'message_id': message_id, 'message': message, 'chatroom_id': para, 'message_type': 0, 'sender_id': para }),
    success: function () {
    }
  });
}

//===================append Intents and scores to interface ===================================

function appendIntents(intent, message, ranking, msgid) {
  var divid = 'msg' + msgid;
  var tempdiv = "<div class='codesign' id='" + divid + "'> </div>";
  $(tempdiv).appendTo(".feedback");
  divid = '#' + divid;
  $(divid).hide();
  var listenerMessage = '<h6>Your message</h6> <div class="lmsg"> <p class="listenerMsg">' + message + '</p> </div> <div class="selectIntents"> <p> The chatbot interpreted the intent of your message as "' + intent['name'].toString() + '" with the confidence as ' + Number(intent['confidence']).toFixed(2) + '/1.00. </p></div>';
  $(listenerMessage).appendTo(divid);
  var currentIntent = '<input type="text" class="hiddenInput" name="currentIntent' + msgid + '" id="currentIntent' + msgid + '" style="height:1px;display:none;">';
  $(currentIntent).appendTo(divid);
  $('#currentIntent' + msgid).val(intent['name'].toString());
  var intentCard = '<div class="intentCard"><div class="card"><div class="card-content">' + intentsDict[intent['name']] + '</div> </div> </div>';
  $(intentCard).appendTo(divid);
  var isCorrect = "<div class=isCorrect><p> Did this capture your intention?</p></div>";
  $(isCorrect).appendTo(divid);
  var choiceButton = '<div class="choiceButton"> <input type="text" class="hiddenInput" name="yesno' + msgid + '" id="yesno' + msgid + '" style="height:1px;display:none;"> <br/> <button class="yesintent btn" id="yesIntent' + msgid + '" onclick="yesintent(' + msgid + ')" type="button" style="background-color:white;border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee"> Yes </button>  <button class="nointent btn" id="noIntent' + msgid + '" onclick="nointent(' + msgid + ')" type="button" style="background-color:white;border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee"> No </button> </div>';
  $(choiceButton).appendTo(divid);
  var selectDesc = "<div class='yesDesc' id='yesDesc" + msgid + "'> <p style='float:left; width: 100%;'>To confirm, press the Next button. </p> </div> <div class='noDesc' id='noDesc" + msgid + "'> <p style='float:left; width: 100%;'> Please select one intent from below. If none of the following captured your intention or you have an idea for a better intent, please click the \"add new intent\".</p> </div>";
  $(selectDesc).appendTo(divid);
  var intentRanking = "<div class='intentOption' id='intentOption" + msgid + "'> <div class='input-field col s12' style='float:left;width:100%;'> <select name='intentselect" + msgid + "' id='intentsselect" + msgid + "'>";
  for (i = 0; i < ranking.length; i++) {
    if (Number(ranking[i]['confidence']).toFixed(2) >= 0.01) {
      if (ranking[i]['name'] == 'give_advice' || ranking[i]['name'] == 'self_harm') {
        continue;
      } else {
        intentRanking += "<option value='" + ranking[i]['name'] + "'>" + intentsDict[ranking[i]['name']] + '  (confidence=' + Number(ranking[i]['confidence']).toFixed(2) + ")</option>";
      }
    }
  }
  intentRanking += "<option id='add_new" + msgid + "' value='Add_More'>NONE OF THIS APPLIES</option></select> </div>";
  intentRanking += '<div onclick="addNewIntents(' + msgid + ')"><i class="material-icons" style="vertical-align:middle" >add</i> <a style="color:black">Add New Intent</a> </div></div>';
  $(intentRanking).appendTo(divid);
  var otherIntent = "<div class='otherIntent' id='otherIntent" + msgid + "'><div class='card'><div class='input-field col s6' style='width:50%;position:relative;left:10px;'> <input placeholder='Ex.greeting' name='newIntent" + msgid + "' id='newIntent" + msgid + "' type='text'><label for='newIntent" + msgid + "' class='active' style='left:0;'>New Intent Name</label></div> <div class='input-field col s12'><textarea placeholder='Ex.The listener is saying hi to start the conversation.' class='materialize-textarea' name='newExplaination" + msgid + "' id='newExplaination" + msgid + "' style='width:90%;position:relative;left:10px;'></textarea> <label for='newExplaination" + msgid + "' class='active'>Please describe your new intent</label></div> </div> </div>";
  $(otherIntent).appendTo(divid);
}
//====================================== add new intents ===========================================
// function addOneNewIntent(msgid) {
//   var valueSelect=$("#intentsselect"+msgid+" option:selected").val(); 
//   if(valueSelect=='Add_More') {
//     $('#otherIntent'+msgid).show();
//     var terminalResultsDivC = document.getElementById("feedback");
//     terminalResultsDivC.scrollTop = terminalResultsDivC.scrollHeight;
//   }
// }

function addNewIntents(msgid) {
  //$('#intentsselect'+msgid).val("Add_More");
  var valueSelect = $("#intentsselect" + msgid + " option:selected").val();
  //$('#intentOption'+msgid).hide();
  $('#otherIntent' + msgid).show();
  var terminalResultsDivC = document.getElementById("feedback");
  terminalResultsDivC.scrollTop = terminalResultsDivC.scrollHeight;
}

//====================================== append Actions to the interface ===========================
function appendActions(botmessage, msg_type, msgid, ranking) {
  var rasaUrl = document.location.protocol + "//" + document.location.hostname + "/rasa";
  if (msg_type == 0) {
    var divid = 'msg' + msgid;
    var tempdiv = "<div class='codesign' id='" + divid + "'> </div>";
    $(tempdiv).appendTo(".feedback");
    divid = '#' + divid;
    $(divid).hide();
    var botMessage = '<h6>Chatbot response</h6> <div class="bmsg"> <p class="chatbotResponse">' + botmessage + '</p> </div> <div class="selectResponse"> <p> Is the chatbot\'s reply reasonable? </p></div>';
    $(botMessage).appendTo(divid);
    var isResonable = '<div class="choiceButton"> <input type="text" class="hiddenInput" name="yesno' + msgid + '" id="yesno' + msgid + '" style="height:1px;display:none;"> <br/> <button class="yesaction btn" id="yesAction' + msgid + '" onclick="yesaction(' + msgid + ')" type="button" style="background-color:white;border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee"> Yes </button>  <button class="noaction btn" id="noAction' + msgid + '" onclick="noaction(' + msgid + ')" type="button" style="background-color:white;border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee"> No </button> </div>';
    $(isResonable).appendTo(divid);
    var yesGuide = "<div class='yesGuide' id='yesGuide" + msgid + "'><p style='float:left; width: 100%;'>If , press the Next button. </p> </div>";
    $(yesGuide).appendTo(divid);
    var noGuide = "<div class='noGuide' id='noGuide" + msgid + "'><p style='float:left; width: 100%;'>Please select a more reasonable reply from below. </p> </div>";
    $(noGuide).appendTo(divid);
    //var rasaUrl = "http://localhost:5005"
    $.ajax({
      url: rasaUrl + "/conversations/" + para + "/predict",
      type: "POST",
      contentType: "application/json",
      success: function (json) {
        var actionRanking = '<div class="actionOption" id="actionOption' + msgid + '"> <div class="input-field col s12" style="float:left;width:100%;"> <select name="actionselect' + msgid + '" style="overflow:scroll;"> ';
        for (i = 0; i < 10; i++) {
          console.log(ranking[i]['name']);
          for (j = 0; j < responseDict[ranking[i]['name']].length; j++) {
            actionRanking += "<option value='" + responseDict[ranking[i]['name']][j] + "'>" + responseDict[ranking[i]['name']][j] + "</option>";
          }
        }
        actionRanking += "<option value='None_of_this'>NONE OF THIS APPLIES</option>";
        actionRanking += "</select> </div> </div>";
        $(actionRanking).appendTo(divid);
        $('select').formSelect();
        var otherResponseNo = "<div class='otherResponse' id='otherResponseNo" + msgid + "'><p>How else could the chatbot reply to your message?</p> </div>";
        $(otherResponseNo).appendTo(divid);
        var otherResponseYes = "<div class='otherResponse' id='otherResponseYes" + msgid + "'><p>Please give us more variations on the current response.</p>  </div>";
        $(otherResponseYes).appendTo(divid);
        var textArea = "<div class='otherResponse' id='otherResponse" + msgid + "'> <textarea class='materialize-textarea' placeholder=' Ex. Hi, I\’m Andrew, I\’m here to seek help.' name='other" + msgid + "' id='other" + msgid + "' style='float:left;width:100%;'></textarea></div>";
        $(textArea).appendTo(divid);
      }
    });
  }
}
//=================== next previous and submit button ==================================================
$("#nextButton").on("click", function (e) {
  var currentDiv = '#msg' + currentShow.toString();
  currentShow++;
  if (currentShow > 1) {
    $('#previousButton').show();
  }
  else {
    $('#previousButton').hide();
  }
  $(currentDiv).hide();
  var nextDiv = '#msg' + currentShow.toString();
  $(nextDiv).show();
  var widgetMsg = document.getElementById("conversationMsg" + currentShow.toString());
  widgetMsg.scrollIntoView();
  if (message_count != 0) {
    if (currentShow == message_count) {
      $('#submitButton').show();
      $('#nextButton').hide();
    }
    else {
      $('#nextButton').show();
      $('#submitButton').hide();
    }
  }
})

$("#previousButton").on("click", function (e) {
  var currentDiv = '#msg' + currentShow.toString();
  currentShow--;
  if (currentShow > 1) {
    $('#previousButton').show();
  }
  else {
    $('#previousButton').hide();
  }
  $(currentDiv).hide();
  var previousDiv = '#msg' + currentShow.toString();
  $(previousDiv).show();
  var widgetMsg = document.getElementById("conversationMsg" + currentShow.toString());
  widgetMsg.scrollIntoView();
  if (message_count != 0) {
    if (currentShow == message_count) {
      $('#submitButton').show();
      $('#nextButton').hide();
    }
    else {
      $('#nextButton').show();
      $('#submitButton').hide();
    }
  }
})

$("#submitButton").on("click", function (e) {
  $('#submitButton').hide();
  $('#nextButton').hide();
  $('#previousButton').hide();
  var form_data = $("#feedbackForm").serialize();
  var formdata = form_data.split('&');
  var form_dict = { 'userid': para };
  for (i = 0; i < formdata.length; i++) {
    var tmp = formdata[i].split('=');
    form_dict[tmp[0]] = tmp[1];
  }
  $.ajax({
    url: "/submitCodesign",
    type: "POST",
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify(form_dict),
    success: function () {
      $('#feedbackForm').hide();
      $('#goodbye').show();
    }
  });
})


//=================== set bot response in the chats ===========================================
function setBotResponse(response) {

  //display bot response after 500 milliseconds
  setTimeout(function () {
    //hideBotTyping();

    if (response.length < 1) {
      //if there is no response from Rasa, send  fallback message to the user
      var fallbackMsg = "I am facing some issues, please try again later!!!";

      var BotResponse = '<img class="botAvatar" src="../static/img/andrew_avatar.png"/><p class="botMsg">' + fallbackMsg + '</p><div class="clearfix"></div>';

      $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
    } else {

      //if we get response from Rasa
      for (i = 0; i < response.length; i++) {
        var msg_type = 0
        botmessage = response[i];


        //check if the response contains "text"
        if (response[i].hasOwnProperty("text")) {
          message_count++;
          response[i].count = message_count;
          var botTyping = '<div id="chatbotTyping' + message_count.toString() + '"><img class="botAvatar" src="../static/img/andrew_avatar.png"/><div class="botTyping">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div> </div>'
          $(botTyping).appendTo(".chats");
          $('#chatbotTyping' + message_count.toString()).hide(0).delay(1500 * i).show(0).delay(1500).hide(0);
          setTimeout(function () { scrollToBottomOfResults() }, i * 1500);
          var BotResponse = '<img class="botAvatar" src="../static/img/andrew_avatar.png"/><p class="botMsg" id="conversationMsg' + message_count.toString() + '">' + response[i].text + '</p><div class="clearfix"></div>';
          $(BotResponse).appendTo(".chats").hide(0).delay(1500 * (i + 1)).fadeIn(500);
          setTimeout(function () { scrollToBottomOfResults() }, (i + 1) * 1500);
          appendActions(response[i].text, 0, message_count, ranking);
        }

        // check if the response contains "images"
        // if (response[i].hasOwnProperty("image")) {
        //  var BotResponse = '<div class="singleCard">' + '<img class="imgcard" src="' + response[i].image + '">' + '</div><div class="clearfix">';
        //  $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
        // }


        // check if the response contains "buttons" 
        // if (response[i].hasOwnProperty("buttons")) {
        //  addSuggestion(response[i].buttons);
        // }

        // if (response[i].hasOwnProperty("custom")) {

        //     check if the custom payload type is "dropDown"
        //     if (response[i].custom.payload == "dropDown") {
        //      dropDownData = response[i].custom.data;
        //      renderDropDwon(dropDownData);
        //      return;
        //     }

        //     check of the custom payload type is "collapsible"
        //     if (response[i].custom.payload == "collapsible") {
        //      data = (response[i].custom.data);
        //      msg_type=1;
        //         //pass the data variable to createCollapsible function
        //         createCollapsible(data);
        //         botmessage=data;
        //     }
        // }
        var message_id = para + message_count.toString();
        $.ajax({
          url: "/botResponse",
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({ 'message_id': message_id, 'message': botmessage, 'chatroom_id': para, 'message_type': msg_type, 'sender_id': 0 }),
          success: function () {
          }
        });
      }
    }
  }, 500);
}

//===================================== Add the suggestion ===========================================

function addSuggestion(textToAdd) {
  setTimeout(function () {
    var suggestions = textToAdd;
    var suggLength = textToAdd.length;
    var userThinking = '<img class="userAvatar" src=' + "../static/img/userAvatar.jpg" + '><p class="userMsg"> Oh Let me think...</p><div class="clearfix"></div>';
    $(userThinking).appendTo('.chats');
    $(' <div class="singleCard"> <div class="suggestions"><div class="menu"></div></div></div>').appendTo(".chats").hide().fadeIn(1000);
    // Loop through suggestions
    for (i = 0; i < suggLength; i++) {
      $('<div class="menuChips" data-payload="' + (suggestions[i].payload) + '">' + suggestions[i].title + '</div>').appendTo(".menu");
    }
    scrollToBottomOfResults();
  }, 500);
}

// on click of suggestions, get the value and send to rasa
$(document).on("click", ".menu .menuChips", function () {
  var text = this.innerText;
  var payload = this.getAttribute('data-payload');
  console.log("payload: ", this.getAttribute('data-payload'))
  setUserResponse(payload);
  send(payload);


  //delete the suggestions once user click on it
  //$(".suggestions").remove();
});


//====================================== End the conversation =========================================

$("#endConversation").click(function () {
  $('.experience_instruction').remove();
  var codesign_instruction = "<p>  In this section of the codesign, we will replay your conversation with the chatbot, during this process, please help us correct the chatbot by answering the corresponding questions regarding Intents and Responses. <br/>"
  codesign_instruction += " <br/><u><b>Intents</b></u> refer to the goal or intention of any message you send to the chatbot. When you send a message to the chatbot, it will try and detect the correct meaning, or intent, of the message with a certain <u><b>confidence</b></u> as indicated by the confidence score out of 1.00. The example below illustrates how the chatbot detects that a listener is trying to greet them. <br/>"
  codesign_instruction += " <br/><table> <tbody> <tr> <td> Listener: “Hi!” </td> <td> Intent: greeting (confidence score = 0.98) </td> </tr></tbody> </table>"
  codesign_instruction += " <br/><u><b>Responses</b></u> are given by the chatbot based on the intent. For example, if the intent is detected to be greeting, then a reasonable response from the chatbot would be “Hello”. <br/> "
  codesign_instruction += " <br/><table> <tbody> <tr> <td> Listener: greeting </td> <td> Chatbot Response: \"Hello\" </td> </tr></tbody> </table>"
  codesign_instruction += "  <br/>The chatbot isn’t perfect so if it fails to capture your Intent, it will likely provide an inadequate Response to your message. In this section, we will replay your conversations message by message and your task will be to improve the chatbot by choosing the most accurate Intents and reasonable Responses. Please press “Start” to begin.<br/>";
  $(codesign_instruction).appendTo(".instruction");
  $(".startButton").toggle();
  $('#userInput').attr('disabled', true);
  $('#endConversation').addClass('disabled');
  $('#sendButton').attr('disabled', true);
  $('.intentsDictionary').show();
});

//====================================== Start co-design activity =========================================

$("#startCodesign").click(function () {
  $('#feedbackForm').show();
  currentShow++;
  $('#instruction').hide();
  var showDiv = '#msg' + currentShow.toString();
  $(showDiv).show();
  $('#nextButton').show();
  var active = document.getElementById("codesign");
  var de_active = document.getElementById("experience");
  $(active).addClass('active');
  $(de_active).removeClass('active');
  var first = document.getElementById("conversationMsg1");
  first.scrollIntoView()
});

//====================================== Yes and No button for intents ==========================================
function nointent(msgid) {
  $("#yesno" + msgid).val("no");
  var no = document.getElementById("noIntent" + msgid);
  no.style = "background-color:#5a17ee; color: white; border-radius:30px";
  var yes = document.getElementById("yesIntent" + msgid);
  yes.style = "background-color:white; border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee";
  $("#noDesc" + msgid).show();
  $("#intentOption" + msgid).show();
  $("#yesDesc" + msgid).hide();
  $('select').formSelect();
}
function yesintent(msgid) {
  $("#yesno" + msgid).val("yes");
  var yes = document.getElementById("yesIntent" + msgid);
  yes.style = "background-color:#5a17ee; color:white; border-radius:30px";
  var no = document.getElementById("noIntent" + msgid);
  no.style = "background-color:white; border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee";
  $("#yesDesc" + msgid).show();
  $("#noDesc" + msgid).hide();
  $("#intentOption" + msgid).hide();
  $("#otherIntent" + msgid).hide();
}

//====================================== Yes and No button for actions ==========================================
function noaction(msgid) {
  $("#yesno" + msgid).val("no");
  var no = document.getElementById("noAction" + msgid);
  no.style = "background-color:#5a17ee; color: white; border-radius:30px";
  var yes = document.getElementById("yesAction" + msgid);
  yes.style = "background-color:white; border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee";
  $("#actionOption" + msgid).show();
  $("#otherResponseNo" + msgid).show();
  $("#otherResponseYes" + msgid).hide();
  $("#otherResponse" + msgid).show();
  $("#yesGuide" + msgid).hide();
  $("#noGuide" + msgid).show();
  $('select').formSelect();
}
function yesaction(msgid) {
  $("#yesno" + msgid).val("yes");
  var yes = document.getElementById("yesAction" + msgid);
  yes.style = "background-color:#5a17ee; color:white; border-radius:30px";
  var no = document.getElementById("noAction" + msgid);
  no.style = "background-color:white; border-radius:30px; border: 2px solid #5a17ee; color: #5a17ee";
  $("#yesGuide" + msgid).hide();
  $("#noGuide" + msgid).hide();
  $("#otherResponseYes" + msgid).show();
  $("#otherResponseNo" + msgid).hide();
  $("#otherResponse" + msgid).show();
  $("#actionOption" + msgid).hide();
}

//====================================== Toggle chatbot =======================================
// $("#profile_div").click(function() {
//   $(".profile_div").toggle();
//   $(".widget").toggle();
//   $(".endButton").toggle();
// });

//====================================== functions for drop-down menu of the bot  =========================================
function createCardsCarousel(cardsData) {

  var cards = "";

  for (i = 0; i < cardsData.length; i++) {
    title = cardsData[i].name;
    ratings = Math.round((cardsData[i].ratings / 5) * 100) + "%";
    data = cardsData[i];
    item = '<div class="carousel_cards in-left">' + '<img class="cardBackgroundImage" src="' + cardsData[i].image + '"><div class="cardFooter">' + '<span class="cardTitle" title="' + title + '">' + title + "</span> " + '<div class="cardDescription">' + '<div class="stars-outer">' + '<div class="stars-inner" style="width:' + ratings + '" ></div>' + "</div>" + "</div>" + "</div>" + "</div>";

    cards += item;
  }

  var cardContents = '<div id="paginated_cards" class="cards"> <div class="cards_scroller">' + cards + '  <span class="arrow prev fa fa-chevron-circle-left "></span> <span class="arrow next fa fa-chevron-circle-right" ></span> </div> </div>';

  return cardContents;
}

//======================================bot typing animation ======================================
function showBotTyping() {

  var botTyping = '<img class="botAvatar" id="botAvatar" src="../static/img/andrew_avatar.png"/><div class="botTyping">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div>'
  $(botTyping).appendTo(".chats");
  $('.botTyping').show();
  scrollToBottomOfResults();
}

function hideBotTyping() {
  $('#botAvatar').remove();
  $('.botTyping').remove();
}
//=====================================

//====================================== Collapsible =========================================

function createCollapsible(data) {
  //sample data format:
  //var data=[{"title":"abc","description":"xyz"},{"title":"pqr","description":"jkl"}]
  var list = "";
  message_count++;
  var divid = 'msg' + message_count.toString();
  var tempdiv = "<div class='codesign' id='" + divid + "'> </div>";
  $(tempdiv).appendTo(".feedback");
  divid = '#' + divid;
  $(divid).hide();
  for (i = 0; i < data.length; i++) {
    var item = '<li>' +
      '<div class="collapsible-header">' + data[i].title + '</div>' +
      '<div class="collapsible-body"><span>' + data[i].description + '</span></div>' +
      '</li>'
    list += item;
    var hintItem = '<div id="hint' + para + message_count.toString() + i.toString() + '"><ul><li>' +
      '<div class="mentorHint-header">' + data[i].title + '</div>' +
      '<div class="mentorHint-body"><span>' + data[i].description + '</span></div>' +
      '</ul></li></div>';
    hintItem += '<div class="input-field col s6"> <textarea id="textarea2" class="materialize-textarea" data-length="120"></textarea> <label for="textarea2">Please help us improve this hint</label> </div>'
    $(hintItem).appendTo(divid);

  }
  var contents = '<ul class="collapsible">' + list + '</uL>';
  $(contents).appendTo(".chats");
  // initialize the collapsible
  $('.collapsible').collapsible();
  scrollToBottomOfResults();
}
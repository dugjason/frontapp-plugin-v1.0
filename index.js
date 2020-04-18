let globalContext;

Front.contextUpdates.subscribe(context => {

  globalContext = context;

  var displayTeammate = document.getElementById('frontTeammate');
  displayTeammate.innerHTML = 'Hello ' + context.teammate.name.split(' ')[0] + ' 👋';

  console.log('Context:', context);
  switch(context.type) {
    case 'noConversation':
      console.log('No conversation selected');
      break;
    case 'singleConversation':
      //console.log('Selected conversation:', context.conversation);

      try {
        console.log(context.conversation);
        context.listMessages().then((results) => {
          console.log('Results: ', results);
        });
      } catch (error) {
        console.log('Error: ', error);
      }

      break;
    case 'multiConversations':
      console.log('Multiple conversations selected', context.conversations);
      break;
    default:
      console.error(`Unsupported context type: ${context.type}`);
      break;
  }
});


function assign() {
  Front.assign(globalContext.teammate.id);
}

function unassign() {
  Front.assign(null);
}

function insertBasicDraft() {
  Front.createDraft({
        content: {
            body: 'Here\'s a draft!',
            type: 'text'
        },
        replyOptions: {
            type: 'reply',
            originalMessageId: 'msg_bnmrao3'
        }
    });
}

async function insertDraftReply() {
  console.log('called insertDraftReply');
    let messageId = await getMessage();
    await Front.createDraft({
        content: {
            body: 'Here\'s a draft!',
            type: 'text'
        },
        replyOptions: {
            type: 'reply',
            originalMessageId: messageId
        }
    })
}

function openUrl() {
  Front.openUrl('https://frontapp.com');
}

function openUrlInPopup() {
  Front.openUrlInPopup('https://suspicious-wozniak-9e3a7e.netlify.com/popup.html');
}

async function peerReviewDraft() {
  let messages = await Front.listMessages();

  console.log('Fetched messages: ', messages);

  let message = messages.results[messages.results.length - 1];

  Front.createDraft({
    cc: ['kenji@frontapp.com'],
    content: {
      type: 'html',
      body: `🌟Completeness: 👎 <br><br><br>
             🤖 Tone: 👎 <br><br><br>
             💯Correctness: 👍 <br><br><br>`
    },
    replyOptions: {
      type: 'reply',
      originalMessageId: message.id
    }
  });
}



async function getMessage() {
  console.log('Called getMessage()');
  let list = await Front.listMessages();
  console.log('List: ', list);
  let messageId = list.results[0]['id'];
  console.log(`returning message ID `, messageId);
  return messageId;
}





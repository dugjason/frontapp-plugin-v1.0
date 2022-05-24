let globalContext;
const assignButton = document.getElementById('assign');
const updateDraftButton = document.getElementById('updateDraft');
const logDraftButton = document.getElementById('logDraft');
const contextExternalURL = document.getElementById('contextExternalURL');

Front.contextUpdates.subscribe(context => {
  console.log('Context:', context);

  globalContext = context;

  var displayTeammate = document.getElementById('frontTeammate');
  displayTeammate.innerHTML = 'Hello ' + context.teammate.name.split(' ')[0] + ' 👋';

  // This is causing console errors
  //assignButton.removeEventListener('click', _assign);

  switch(context.type) {
    case 'noConversation':
      console.log('No conversation selected');
      break;

    case 'singleConversation':
      console.log('Selected conversation context:', context);

      try {
        console.log('context.conversation:', context.conversation);
        context.listMessages().then((results) => {
          console.log('listMessages(): ', results);
        });
      } catch (error) {
        console.log('Error: ', error);
      }

      assignButton.addEventListener('click', function _assign() {
        Front.assign(context.teammate.id)
      });

      updateDraftButton.addEventListener('click', async () => {
        let draftContent = await fetchDemoData()

        Front.updateDraft(
          context.conversation.draftId, 
          {
            content: {
              body: draftContent.body,
              type: 'text'
            },
            updateMode: 'insert'
          })
      })

      logDraftButton.addEventListener('click', async () => {
        console.log('RUNNING logDraftButton()', context.conversation)
        let draftId = context.conversation.draftId

        if (!draftId){
          console.log('Conversation has no draft')
        } else {
          let draft = await Front.fetchDraft(draftId)
          console.log('DRAFT: ', draft)
        }
      })

      contextExternalURL.addEventListener('click', async () => {
        Front.openUrl(`https://suspicious-wozniak-9e3a7e.netlify.com/popup.html?id=${context.conversation.id}`);
      })

      break;
      
    case 'multiConversations':
      console.log('Multiple conversations selected', context.conversations);
      break;

    default:
      console.error(`Unsupported context type: ${context.type}`);
      break;
  }
});

async function fetchDemoData() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts/1')

  return response.json()
}


function assign(context) {
  console.log('context in assign() method');
  console.log(context);
  Front.assign(context.teammate.id);
}

function unassign() {
  Front.assign(null);
}

function openConfirm() {
  confirm("This is a confirm dialog");
}

function openAlert() {
  alert("This is an alert dialog");
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
  let draft = await Front.createDraft({
      content: {
          body: 'Here\'s a draft!',
          type: 'text'
      },
      replyOptions: {
          type: 'reply',
          originalMessageId: messageId
      }
  });
  console.log('Draft Created: ', draft);
}

async function updateDraft() {

}

async function listTags() {
  let tags = await Front.listTags();
  console.log('List of Tags: ', tags);
}

async function applyTag1() {
  let tagged = Front.tag(['tag_35077']);
  console.log('Tagging result: ', tagged);
}

async function applyTag2() {
  let tagged = globalContext.conversation.tag(['tag_35077']);
  console.log('Tagging result: ', tagged);
}

function openUrl() {
  Front.openUrl('https://frontapp.com');
}

function openUrlInPopup() {
  Front.openUrlInPopup('https://suspicious-wozniak-9e3a7e.netlify.com/popup.html');
}

async function listMessages() {
  let messages = await Front.listMessages();

  console.log('listMessages(): ', messages);
}

async function listRecipients() {
  let recipients = await Front.listRecipients();
  console.log('listRecipients():', recipients);
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

async function search() {
  console.log('Called Front.Search()')
  let results = await Front.search('api');
  console.log('Search results: ', results)  
}

async function downloadAttachment() {
  let messages = await Front.listMessages()
  let message = messages.results[0]
  console.log('message', message)

  const attachmentId = message.content.attachments[0].id

  Front.downloadAttachment(message.id, attachmentId).then((file) => {
    const reader = new FileReader()
    reader.onload = function (pEvent) {
      console.log('1', event.target.result)
      console.log('--')

      console.log('2', JSON.parse(event.target.result))
      console.log('--')

      console.log('3', JSON.parse(reader.result))
    }

    reader.readAsText(file)
  })
}
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
        context.listMessages().then((results: ApplicationMessage) {
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

function openUrl() {
  Front.openUrl('https://frontapp.com');
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

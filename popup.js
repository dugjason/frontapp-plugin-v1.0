console.log('Yes, this file was loaded');

let globalContext;

Front.contextUpdates.subscribe(context => {

  globalContext = context;

  console.log('Context:', context);
  switch(context.type) {
    case 'noConversation':
      console.log('No conversation selected');
      break;
    case 'singleConversation':
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


async function logContext() {
  let messages = await Front.listMessages();

  console.log('Fetched messages: ', messages);
}

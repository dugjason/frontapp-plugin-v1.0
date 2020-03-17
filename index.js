
Front.contextUpdates.subscribe(context => {

  var displayTeammate = document.getElementById("frontTeammate");
  displayTeammate.innerHTML = context.teammate.name;

  console.log('Context:', context);
  switch(context.type) {
    case 'noConversation':
      console.log('No conversation selected');
      break;
    case 'singleConversation':
      console.log('Selected conversation:', context.conversation);
      break;
    case 'multiConversations':
      console.log('Multiple conversations selected', context.conversations);
      break;
    default:
      console.error(`Unsupported context type: ${context.type}`);
      break;
  }
});

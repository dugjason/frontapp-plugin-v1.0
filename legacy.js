// The Front object is loaded through the Front script added in the header of the main HTML.
// This object can be used to listen to conversation event data as it occurs on Front, request information from Front, and perform actions on Front.
// See the full plugin API documentation here: https://dev.frontapp.com/plugin.html

// This keeps track of if Front has returned a conversation to the plugin.
let hasConversation;

// Listen for the `conversation` event from Front and print its contents, then load the contact to the plugin.
Front.on('conversation', function (data) {
  console.log('Event data', data);

  // Set the conversation state.
  hasConversation = true;

  Front.fetchInboxes(function (inboxes) {
    if (!inboxes)
      return;

    console.log('INBOXES: ', inboxes);
    let slugs = inboxes.map(inbox => inbox.alias);
    console.log(slugs);
  });
});

// Listen for the `no_conversation` event.  This can happen when opened to Inbox Zero.
Front.on('no_conversation', function () {
  console.log('No conversation');

  // Set the conversation state.
  hasConversation = false;
});

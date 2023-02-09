class message_data {
  constructor(notion_data) {
    try {
      this.title = notion_data["properties"]["タイトル"]["title"][0]["text"]["content"]
    }
    catch {
      this.title = ""
    }

    try {
      this.date = notion_data["properties"]["日付"]["date"]["start"]
    }
    catch {
      this.date = ""
    }

    try {
      this.context = notion_data["properties"]["内容"]["rich_text"][0]["text"]["content"]
    }
    catch {
      this.context = ""
    }
  }
}


function send_LINE( message, token ) {
  const url = 'https://api.line.me/v2/bot/message/broadcast'
  const payload = {
    messages: [
      { type: 'text', text: message }
    ]
  };
  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
}

function LineReminder(notion_data, token) {
  for(let i = 0; i < notion_data.length; i++){

    message = new message_data(notion_data[i])

    send_message = `タイトル:` + message.title + `
日付:` + message.date +`
` + message.context

    send_LINE(send_message, token)
  }
}


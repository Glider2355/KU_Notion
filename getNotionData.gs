const notion_version = '2022-06-28'

//["results"]以下のJavascriptオジェクトを受け取る
class NotionData {
  constructor (notion_data) {
    try {
      this.id = notion_data["id"]
    }
    catch {
      this.id = ""
    }
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
    try {
      this.remind_date = notion_data["properties"]["リマインド日"]["date"]["start"]
    }
    catch {
      this.remind_date = ""
    }
  }
}

// Notionから今日リマインドするデータを取ってくる
function getNotionData(database_id, token) {

  const url = 'https://api.notion.com/v1/databases/' + database_id + '/query';

  const query = {
      filter: {
        'property': 'リマインド',
        'checkbox': {
          'equals': true
        },
      },
  }

  let headers = {
    'content-type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + token,
    'Notion-Version': notion_version,
  };

  let options = {
    method: 'post',
    headers: headers,
    muteHttpExceptions: true,
    payload: JSON.stringify(query),
  };

  notion_data = UrlFetchApp.fetch(url, options);
  notion_data = JSON.parse(notion_data.getContentText())["results"];

  for (let i = 0; i < notion_data.length; i++){
    notion_data[i] = new NotionData(notion_data[i])
  }

  today_data = today_check(notion_data)
  return today_data
}

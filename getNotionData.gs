const notion_version = '2022-06-28'

function patchCheckbox (token, today_data) {
  const query = {
    'properties': {
      'リマインド': {'checkbox': false }
    },
  }

  let headers = {
    'content-type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + token,
    'Notion-Version': notion_version,
  };

  let options = {
    method: 'patch',
    headers: headers,
    muteHttpExceptions: true,
    payload: JSON.stringify(query)
  };

  for(let i = 0; i < today_data.length; i++){
    id = today_data[i]["id"]
    url = 'https://api.notion.com/v1/pages/' + id
    UrlFetchApp.fetch(url, options);
  }
}

function getNotionData(token, database_id) {

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

  let notion_data = UrlFetchApp.fetch(url, options);
  notion_data = JSON.parse(notion_data.getContentText())["results"];
  today_data = today_check(notion_data)
  patchCheckbox(token, today_data)
  return today_data
}

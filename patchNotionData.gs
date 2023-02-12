// リマインドのチェックボックスを外す
function patchCheckbox (today_data, token) {
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
    id = today_data[i].id
    url = 'https://api.notion.com/v1/pages/' + id
    UrlFetchApp.fetch(url, options);
  }
}

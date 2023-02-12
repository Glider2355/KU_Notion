function main () {
  // notion API
  const notion_token = [notion_token]
  const database_id = [database_id]

  // LINE API
  const line_token = [line_token]

  // notionから今日リマインドするデータを取得する
  notion_data = getNotionData(database_id, notion_token)

  // LINE_APIにデータを送信
  LineReminder(notion_data, line_token)

  // notionのリマインドのチェックボックスを外す
  patchCheckbox(notion_data, notion_token)
}

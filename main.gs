function main () {
  // notion API
  const token = [notion_token]
  const database_id = [database_id]

  // LINE API
  const line_token = [line_token]

  notion_data = getNotionData(token, database_id)
  LineReminder(notion_data, line_token)
}


function today_check (notion_data) {
  const today = new Date();
  const todayStr = Utilities.formatDate(today, 'JST', 'yyyy-MM-dd');
  const today_data = []

  for(let i = 0; i < notion_data.length; i++){
    try {
      remind_date = notion_data[i]["properties"]["リマインド日"]["date"]["start"]
      if( todayStr == remind_date) {
        today_data.push(notion_data[i])
      }
    }
    catch(e) {
      continue
    }
  }
  return today_data
}


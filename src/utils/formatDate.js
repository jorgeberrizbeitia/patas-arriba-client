function formatDate(date, type) {
  //todo add different types for like "event-date", "chat", "member-since", etc...
  const createdAtDate = new Date(date);
  let options;
  if (type === "chat") {
    options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
  } else if (type === "event") {
    options = { weekday: 'long', year: 'numeric', month: 'long',day: 'numeric' }
  } else if (type === "member-since") {
    options = { day: 'numeric', month: 'long', year: "numeric" };
  }
  const formattedDateAndTime = createdAtDate.toLocaleDateString('es-ES', options);  
  return formattedDateAndTime
}

export default formatDate
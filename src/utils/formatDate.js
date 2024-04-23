function formatDate(date) {
  //todo add different types for like "event-date", "chat", "member-since", etc...
  const createdAtDate = new Date(date);
  const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
  const formattedDateAndTime = createdAtDate.toLocaleDateString('es-ES', options);  
  return formattedDateAndTime
}

export default formatDate
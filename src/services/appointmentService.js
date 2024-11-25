const bookAppointment = async (data) => {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to book appointment');
  }
  return result;
};

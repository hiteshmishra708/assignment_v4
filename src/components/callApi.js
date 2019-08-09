const callApi = (url, type, body, isBolb, token) => {
    let data = fetch(url, {
      method: type,
      headers: isBolb? {}: {
        "Content-Type": "application/json",
        // "Authorization": token
      },
      body: isBolb? body: JSON.stringify(body)
    })
    .then((response) => {
      return response.json()
    })
    .then(response => {
      return response
    })
    .catch(error => {
      throw new Error('Something went wrong');
    });
  return data;
}

export default callApi;
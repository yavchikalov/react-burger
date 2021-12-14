export const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(new Error('Error while retrieving data'));
}
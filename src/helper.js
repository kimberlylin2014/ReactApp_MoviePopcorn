export function validateResponse(resp) {
    if(resp.data.Response === "True" && resp.status === 200) {
        return resp.data;
    } else {
        throw new Error(`Error Response Status: ${resp.status}`)
    }
}
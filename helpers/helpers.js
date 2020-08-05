//Returns links found in text
export function getLinksFromText(Text, Extra = null) {
    let links = [];
    Text.split(" ").forEach(word => {
            includesArray(word, ["www", "http", ".com"]) ? links.push(word) : "";
        })
        //Any extra link to add to links
        !includesArray(Extra, ["www.reddit.com", "v.redd.it"]) ? links.push(Extra) : "";
    return links;
}
/**
 * @summary Returns true if the text includes any of the array items
 * @param {*} Text 
 * @param {*} SearchArray 
 */
export function includesArray(Text, SearchArray) {
    let includes = false;
    SearchArray.forEach((search) => {
        if (Text.includes(search)) {
            includes = true;
        }
    })
    return includes;
}
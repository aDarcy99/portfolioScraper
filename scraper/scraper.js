// import {getLinksFromText} from "../helpers/helpers.js";

const axios = require("axios");
const fs = require("fs");
let posts = [];
//posts.forEach((post, postIdx) => {
//    console.log(post.fullLink, postIdx);
// });
// fs.writeFile("./scraper/output.json", JSON.stringify(posts), (err, data) => {});
// webdev creation date: 1232857355
//7 days to seconds: 604800
//startDate

async function getDataBetweenDays(beforeDate, stopDate, Increment = "7") {
    let afterDate = beforeDate - Increment;
    let response = await axios.get(`https://api.pushshift.io/reddit/search/submission/?subreddit=webdev&q="portfolio"&before=${beforeDate}&after=${afterDate}&size=1000`);
    response.data.data.forEach((post) => {
        let _post = {
            showoff: post.link_flair_css_class === "showoff" ? true : false,
            fullLink: post.full_link,
            title: post.title,
            body: post.selftext || "",
            data: post
        }
        posts.push(_post);
    })
    //If beforeDate is less than or equal to stop date continue loop, else stop;  
    if (beforeDate >= stopDate) {
        console.log(beforeDate);
        getDataBetweenDays(beforeDate - Increment, stopDate, Increment);
    } else {
        console.log(posts.length);
        fs.writeFile("./scraper/output.json", JSON.stringify(posts), (err, data) => {});
    }
}

getDataBetweenDays(1596615381, 1232857355, 864000);


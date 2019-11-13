export async function getTweets() {
    const tweets = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    })
    console.log(tweets); 
    return tweets; 
}

export function showTweets(){
    const $root=$('#root');
    $root.html('');
    let x = '';
    const load = async function(){
        let tweetList= await getTweets();
        for(let i=0; i<50; i++){
            x += `<div><strong>` + tweetList.data[i].body + `</strong>` + " - " + tweetList.data[i].author + `</div>`;
        }
        $root.append(x);
    }
    load();
}

export async function create(tweetBody) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: tweetBody, 
        },
    });
    return result; 
}

export async function read(id) {
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id; 
    const result = await axios({
        method: 'get',
        url: tweetURL,
        withCredentials: true,
    });
    return result; 
}

export async function update(id, newBody) {
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id; 
    const result = await axios({
        method: 'put',
        url: tweetURL,
        withCredentials: true,
        data: {
          body: newBody,
        },
    });
    return result; 
}

export async function deleteTweet(id) {
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id; 
    const result = await axios({
        method: 'delete',
        url: tweetURL,
        withCredentials: true,
    });
    return result; 
}

export async function like(id) {
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/like'; 
    const result = await axios({
        method: 'put',
        url: tweetURL,
        withCredentials: true,
    });
    return result; 
}

export async function unlike(id) {
    let tweetURL = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/unlike'; 
    const result = await axios({
        method: 'put',
        url: tweetURL,
        withCredentials: true,
    });
    return result; 
}

$(function () {
    getTweets();
    showTweets();
})
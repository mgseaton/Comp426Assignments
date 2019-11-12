export async function getTweets() {
    const tweets = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    })
    console.log(tweets);
    return tweets; 
}

export async function showTweets(){
    const $root=$('#root');
    $root.html('');
    let x = '';
    let tweetList= await getTweets();
    for(let i = 0;i<50;i++){
        x+=`<div>` + tweetList.data[i] + `</div>`;
    }
    $root.append(x);
}

$(function () {
    getTweets();
    showTweets();
})
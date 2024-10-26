const subredditContainer = document.getElementById('subreddit-container')

const addSubredditBtn = document.getElementById('modalbox-btn')

addSubredditBtn.addEventListener('click',()=> {
    const addSubredditInput = document.getElementById('name-input').value
    const res = fetch(`https://www.reddit.com/r/${addSubredditInput}.json`)
    .then(res => res.json())
    .then(data => addPostsContainer(data.data.children))

})

function addPostsContainer(data) {
    console.log(data[0].data.subreddit)
    const postsHtml = makePostHtml(data)
    subredditContainer.innerHTML += `<div class="posts-container">
                                        <div class="post-head">
                                            <p class="subreddit-name">/r/${data[0].data.subreddit}</p>
                                            <img src="icon/dots.png" alt="" class="option-menu">
                                        </div>
                                        ${postsHtml}`
}




function makePostHtml(data) {
    let postsHtml = ''

    data.forEach(item => {
        postsHtml += `<div class="posts">
                        <p class="post-id">${item.data.ups}</p>
                        <p class="post-name">${item.data.title}</p>
                     </div>`
    })
    return postsHtml

}
















    
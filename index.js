const subredditContainer = document.getElementById('subreddit-container')

const addSubredditBtn = document.getElementById('modalbox-btn')

document.addEventListener('click',(e) => {
    if(e.target.dataset.postmenu) {
        console.log(e.target.dataset.postmenu)
        document.getElementById(e.target.dataset.postmenu).classList.toggle('show')
    } else if(e.target.dataset.post) {
        removeContainer(e.target.dataset.post)
    } else if(e.target.dataset.post && e.target.id == refresh) {
        refreshContainer(e.target.dataset.post)
    }
})

addSubredditBtn.addEventListener('click',async ()=> {
    const data = await getData()
    addPostsContainer(data.data.children)

})

async function getData() {
    console.log('helo')
    const addSubredditInput = document.getElementById('name-input').value
    const res = await fetch(`https://www.reddit.com/r/${addSubredditInput}.json`)
    const data = await res.json()
    return data

}

function addPostsContainer(data) {
    console.log(data[0].data.subreddit)
    const postsHtml = makePostHtml(data)
    subredditContainer.innerHTML += `<div id="${data[0].data.subreddit}" class="posts-container">
                                        <div class="post-head">
                                            <p class="subreddit-name">/r/${data[0].data.subreddit}</p>
                                            <img data-postMenu="${data[0].data.id}" src="icon/dots.png" alt="" class="option-menu">
                                            <div class="menu" id="${data[0].data.id}">
                                                <p class="refresh" id="refresh">Refresh</p>
                                                <p id="remove"  data-post="${data[0].data.subreddit}"  class="remove">Delete</p>
                                            </div>
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

function removeContainer(id) {
    document.getElementById(id).outerHTML = ''
}



function refreshContainer(id) {
    document.getElementById(id).innerHTML = ''
}











    
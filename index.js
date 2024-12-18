const subredditContainer = document.getElementById('subreddit-container')

const addSubredditBtn = document.getElementById('modalbox-btn')

document.addEventListener('click', (e) => {
    if (e.target.dataset.postmenu) {
        console.log(e.target.dataset.postmenu)
        document.getElementById(e.target.dataset.postmenu).classList.toggle('show')      
    } else if (e.target.dataset.post && e.target.id == 'remove') {
        removeContainer(e.target.dataset.post)
    } else if (e.target.dataset.post && e.target.id == 'refresh') {
        refreshContainer(e.target.dataset.post)
    } else if (e.target.id == "show-searchModal") {
        document.getElementById("modal-box").classList.toggle('show')
    }
})

addSubredditBtn.addEventListener('click', async () => {
    const subredditInput = document.getElementById('name-input').value
    if (localStorage.getItem(subredditInput)) {
        document.getElementById('err-fetch').style.display = 'block'
        document.getElementById('err-fetch').textContent = "already exits"
    } else {

        try {
            const data = await getData(subredditInput)
            localStorage.setItem(subredditInput, JSON.stringify(data.data.children))
            addPostsContainer(data.data.children)
            document.getElementById("modal-box").classList.toggle('show')

        } catch {
            document.getElementById('err-fetch').style.display = 'block'
        }
    }

})

async function getData(name) {
    try {
        const res = await fetch(`https://www.reddit.com/r/${name}.json`)
        const data = await res.json()
        document.getElementById('err-fetch').style.display = 'none'
        return data
    }
    catch {
        document.getElementById('err-fetch').style.display = 'block'
    }
}

function addPostsContainer(data) {
    // console.log(data[0].data.subreddit)
    const postsHtml = makePostHtml(data)
    subredditContainer.innerHTML += `<div id="${data[0].data.subreddit}" class="posts-container">
                                        <div class="post-head">
                                            <p class="subreddit-name">/r/${data[0].data.subreddit}</p>
                                            <img data-postMenu="${data[0].data.id}" src="icon/dots.png" alt="" class="option-menu">
                                            <div class="menu" id="${data[0].data.id}">
                                                <p class="refresh" data-post="${data[0].data.subreddit}" id="refresh">Refresh</p>
                                                <p id="remove"  data-post="${data[0].data.subreddit}"  class="remove">Delete</p>
                                            </div>
                                        </div>
                                        ${postsHtml}
                                        </div>`
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
    localStorage.removeItem(id.toLowerCase())
}



async function refreshContainer(id) {
    const postDetails = await getData(id)
    const data = postDetails.data.children
    const postsHtml = makePostHtml(data)
    document.getElementById(id).innerHTML = `<div class="post-head">
                                            <p class="subreddit-name">/r/${data[0].data.subreddit}</p>
                                            <img data-postMenu="${data[0].data.id}" src="icon/dots.png" alt="" class="option-menu">
                                            <div class="menu" id="${data[0].data.id}">
                                                <p class="refresh" data-post="${data[0].data.subreddit}" id="refresh">Refresh</p>
                                                <p id="remove"  data-post="${data[0].data.subreddit}"  class="remove">Delete</p>
                                            </div>
                                        </div>
                                        ${postsHtml}`
}


(function () {
    for (const item in localStorage) {
        if (typeof (localStorage[item]) == "string") {
            const data = JSON.parse(localStorage[item])
            addPostsContainer(data)

        }
    }
})()







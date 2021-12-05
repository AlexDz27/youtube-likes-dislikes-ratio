(async () => {
  const API_KEY = 'YOUR_API_KEY'
  const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=${API_KEY}`
  

  await doLogic()
  window.addEventListener('yt-page-data-updated', doLogic)


  async function doLogic() {
    const videoId = getVideoId()
    const likesToDislikesPercent = await getVideoLikesToDislikesPercent(videoId)

    const viewCountElementSelector = '.view-count.style-scope.ytd-video-view-count-renderer'
    await waitUntilElementExists(viewCountElementSelector)

    const container = document.querySelector('#container #info-text')
    if (document.querySelector('#likesToDislikes')) {
      document.querySelector('#likesToDislikes').remove()
    }
    container.insertAdjacentHTML('beforeend',
      `<progress id="likesToDislikes" value="${likesToDislikesPercent}" style="margin-left: 15px;" max="100"></progress>`
    )
  }

  function getVideoId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const videoId = params.v

    return videoId
  }

  async function waitUntilElementExists(selector) {
    return new Promise((resolve) => {
      const handle = setInterval(() => {
        const element = document.querySelector(selector)
        if (element !== null) {
          clearInterval(handle)
          resolve(element)
        }
      }, 100)
    })
  }

  async function getVideoLikesToDislikesPercent(videoId) {
    let response = await fetch(API_URL + `&id=${videoId}`)
    response = await response.json()

    const { likeCount, dislikeCount } = response.items[0].statistics

    const likesAndDislikesSum = Number(likeCount) + Number(dislikeCount)
    const likesToDislikesPercent = likeCount * 100 / likesAndDislikesSum

    return likesToDislikesPercent
  }
})()
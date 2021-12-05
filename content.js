(async () => {
  const API_KEY = 'AIzaSyBcS5qRg5AJXDrZneCtDYGgibl2LnDB9y4'
  const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=${API_KEY}`
  

  await doLogic()

  window.addEventListener('yt-page-data-updated', doLogic)


  async function doLogic() {
    const videoId = getVideoId()
    const likesToDislikesPercent = await getVideoLikesToDislikesPercent(videoId)
    console.log({likesToDislikesPercent})
    const topButtonsContainer = await selectElementAfterDelay('#buttons', 2000)
    console.log({topButtonsContainer})
    topButtonsContainer.insertAdjacentHTML('beforeend', `<progress value="${likesToDislikesPercent}" style="margin-top: 14px;" max="100"></progress>`)
    console.log('cool123')
  }

  function getVideoId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const videoId = params.v

    return videoId
  }

  async function getVideoLikesToDislikesPercent(videoId) {
    let response = await fetch(API_URL + `&id=${videoId}`)
    response = await response.json()

    const { likeCount, dislikeCount } = response.items[0].statistics

    const likesAndDislikesSum = Number(likeCount) + Number(dislikeCount)
    const likesToDislikesPercent = likeCount * 100 / likesAndDislikesSum

    return likesToDislikesPercent
  }

  async function selectElementAfterDelay(selector, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const element = document.querySelector(selector)

        resolve(element)
      }, delay)
    })
  }
})()
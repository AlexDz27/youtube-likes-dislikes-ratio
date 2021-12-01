document.body.style.backgroundColor = 'blue';

setTimeout(() => {
  const viewsRaw = document.querySelector('.view-count').textContent
  console.log({viewsRaw})
  const views = Number(viewsRaw.replace(/\D/g, ''));

  let likesRaw = document.querySelector('#text.ytd-toggle-button-renderer').textContent
  console.log('likesRaw', likesRaw)
  if (likesRaw.includes('тыс')) {
    likesRaw = likesRaw.replace(/\D/g, '')
    likesRaw += '000'
  }
  if (likesRaw.includes('млн')) {
    likesRaw = likesRaw.replace(/\D/g, '')
    likesRaw += '000000'
  }

  console.log('likesRaw after 000 or 000000: ', likesRaw)
  const likes = Number(likesRaw)

  const ratio = (likes * 100 / views).toFixed(1)
  console.log('Ratio: ', ratio)

  document.querySelector('#text.ytd-toggle-button-renderer').textContent += ` RAT: ${ratio}`
}, 2000)

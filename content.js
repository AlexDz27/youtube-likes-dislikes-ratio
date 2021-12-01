setTimeout(() => {
  const viewsRaw = document.querySelector('.view-count').textContent
  const views = Number(viewsRaw.replace(/\D/g, ''));

  let likesRaw = document.querySelector('#text.ytd-toggle-button-renderer').textContent
  if (likesRaw.includes('тыс')) {
    // if 7,2 тыс.
    if (likesRaw.includes(',')) {
      likesRaw = likesRaw.replace(/\D/g, '')
      likesRaw += '00'
    // if 72 тыс.
    } else {
      likesRaw = likesRaw.replace(/\D/g, '')
      likesRaw += '000'
    }
  }
  if (likesRaw.includes('млн')) {
    // if 7,2 млн.
    if (likesRaw.includes(',')) {
      likesRaw = likesRaw.replace(/\D/g, '')
      likesRaw += '00000'
      // if 72 млн.
    } else {
      likesRaw = likesRaw.replace(/\D/g, '')
      likesRaw += '000000'
    }
  }
  const likes = Number(likesRaw)

  const ratio = (likes * 100 / views).toFixed(1)

  document.querySelector('#text.ytd-toggle-button-renderer').textContent += ` RAT: ${ratio}`
}, 2000)

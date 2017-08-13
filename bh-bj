export default {
  async alpha (posts, url = 'http://www.wlzz.org/') {
    const $ = await url.get().cheer()
    $('article').each(function() {
      posts.push({
        title: $(this).find('h2').text(),
        cover: $(this).find('.thumb').attr('data-original'),
        key: $(this).find('h2 a').attr('href')
      })
    })
    return $('.next-page a').attr('href')
  },
  async bravo (post, pictures, url = post.key) {
    const $ = await url.get().cheer()
    pictures.push({
      src: $('img.size-full').attr('src')
    })
    return $('.article-paging > span').next().attr('href')
  }
}

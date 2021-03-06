export default {
  id: 'moe.impl.dyno.lolibooru',
  name: 'lolibooru',
  version: '0.1',
  author: 'plutonist',
  
  async alpha(posts, url = 'https://lolibooru.moe/pool') {
    const raw = await url.get().raw()
    const covers = raw.match(/Preload.preload\('.*'\);/g).map(l => l.match(/Preload.preload\('(.*)'\);/)[1])
    const $ = raw.cheer()
    const rs = $('table.highlightable tbody tr')
      .filter((i, el) => parseInt($(el).find('td').eq(2).text()) > 0)
      .map((i, el) => ({
        title: $(el).find('a').text(),
        cover: covers[i],
        by: $(el).find('td').eq(1).text(),
        date: $(el).find('td').eq(3).text(),
        url: $(el).find('a').attr('href').relativeTo(url)
      })).get()
    posts.push(...rs)
    const href = $('.nextPage').attr('href')
    if (href) {
      return href.relativeTo(url)
    }
  },
  async bravo(post, pictures, url = post.url) {
    let $ = await url.get().cheer()
    $('.thumb').each(function() {
      pictures.push({
        thumbnail: $(this).find('img').attr('src'),
        url: $(this).attr('href').relativeTo(url)
      })
    })
  },
  async charlie (picture) {
    let $ = await picture.url.get().cheer()
    picture.src = $('.content img').attr('src')
  }
}

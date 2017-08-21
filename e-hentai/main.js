export default {
  id: 'moe.impl.dyno.e-hentai',
  name: 'e-hentai',
  version: '0.1',
  author: 'plutonist',
  
  async search (posts, keyword, url = `https://e-hentai.org/?f_search=${keyword}`, jump) {
    return await this.alpha(posts, url, jump)
  },
  async alpha (posts, url = 'https://e-hentai.org/', jump) {
    if (jump) {
      posts = []
      url = `https://e-hentai.org/?page=${jump}`
    }
    this.html = await url.get().raw()
    let $ = this.html.cheer()
    $('table.itg tr.gtr0,tr.gtr1').each(function() {
      posts.push({
        title: $(this).find('td.itd div div.it5 a').text(),
        cover: $(this).find('td.itd div div.it2')
          .html()
          .expand(/(\/\/|inits?~)(.*?org)[~/]([^~]*\.jpg)[~"]/, 'http://$2/$3'),
        by: $(this).find('td.itu div a').html(),
        date: $(this).find('td.itd[style]').html(),
        key: $(this).find('td.itd div div.it5 a').attr('href'),
        pictures: []
      })
    })
    return $('.ptt td:last-child a').attr('href')
  },
  async bravo (post, pictures, url = post.key) {
    let $ = await url.get().cheer()
    $('.gdtl,.gdtm').each(function() {
      pictures.push({
        thumbnail: $(this).children().first().attr('style').sprite(),
        url: $(this).find('a').attr('href')
      })
    })
    return $('.ptt td:last-child a').attr('href')
  },
  async charlie (picture) {
    let $ = await picture.url.get().cheer()
    picture.src = $('div.sni a img[style]').attr('src')
  }
}

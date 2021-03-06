var express = require('express');
var rp = require('request-promise');
var cheerio = require('cheerio');

var port = process.env.PORT || 18001;

var app = express();
var router = express.Router();

app.use(express.static('./dist'));

router.get("/",function(req,res){
	res.render('index.html',{})
})

router.get('/github-ranking/:lang/:sorts', (req, res) => {
  let language = req.params.lang;
  let sort = req.params.sorts;
  let infos = {
    titles: [],
    descs: [],
    stars: [],
    updateDate: [],
    links: []
  };
  let url = `https://github.com/search?l=${language.replace('#', '%23')}&o=desc&q=${language.replace('#', '%23')}&s=${sort}&type=Repositories&utf8=%E2%9C%93`;
  let options = {
    url,
    transform(body) {
      return cheerio.load(body);
    }
  }
  // 爬虫
  let p = new Promise((resolve, reject) => {
    rp(options)
      .then($ => {
        let $titles = $('a.v-align-middle');

        let $descs = $('.col-12.col-md-9.d-inline-block.text-gray.mb-2.pr-4');
        let $stars = $('.pl-2.pl-md-0.text-right.flex-auto.min-width-0 a');
        let $updateDate = $('.d-flex.flex-wrap .f6.text-gray.mr-3.mb-0.mt-2:last-of-type');

        $titles.each((index, item) => {
          infos.titles.push($(item).text().replace(/\s/g, ''));
          infos.links.push('https://github.com'+$(item).attr('href'));
        });
        $descs.each((index, item) => {
          infos.descs.push($(item).text().trim());
        });
        $stars.each((index, item) => {
          infos.stars.push($(item).text().replace(/[\s\n]/g, ''));
        });
        $updateDate.each((index, item) => {
          infos.updateDate.push($(item).text().trim());
        });
        resolve(infos);
      })
    });
    // 返回数据
    p.then((infos) => {
      res.json(infos)
    });
  });

app.use('/api', router);


module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});

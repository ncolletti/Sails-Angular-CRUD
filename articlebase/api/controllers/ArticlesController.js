/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function(req, res) {
        //res.view('list')
        Articles.find({}).exec(function(err, articles){
          if (err) {
            res.send(500, {
              error: 'Database error'
            });
          }

          res.view('list', {articles:articles})
        });
    },
    add: function(req, res) {
      res.view('add');
    },
    create: function(req, res) {
      var title = req.body.title;
      var body = req.body.body;
      Articles.create({title:title, body:body}).exec(function(err){
        if(err){
          res.send(500, {error:'Database error'})
        }
        res.redirect('/articles/list');
      })
    },
    delete: function(req, res) {
      Articles.destroy({id:req.params.id}).exec(function(err){
        if (err) {
          res.send(500, {
            error: 'Database error'
          })
        }
        res.redirect('/articles/list');
      });

      return false
    },
    edit: function(req, res) {
      Articles.findOne({id:req.params.id}).exec(function(err, article){
        if (err) {
          res.send(500, {
            error: 'Database error'
          })
        }
        res.view('edit', {article:article})
      })
    },
    update: function(req, res) {
      var title = req.body.title;
      var body = req.body.body;
      Articles.update({id: req.params.id},{
        title: title,
        body: body
      }).exec(function (err) {
        if (err) {
          res.send(500, {
            error: 'Database error'
          })
        }
        res.redirect('/articles/list');
      })
      return false
    }
};


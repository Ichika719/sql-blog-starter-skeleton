import { Router } from 'express';

import models from '../models';

const { Article, Tag, ArticleTag, User } = models;

const articleRouter = new Router();

articleRouter.get('/', async (req, res) => {
  let user = null;
  try {
    user = await User.find({ where: { token: req.query.token }});
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    res.status(404).json('QwQ');
  } else{
    try {
      const articles = await Article.findAll({ where: { userId: user.id }});

      res.json(articles);
    } catch (err) {
      console.error(err);
    }
  }
});

articleRouter.get('/:id', async (req, res) => {
  let user = null;
  try {
    user = await User.find({ where: { token: req.query.token }});
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    res.status(404).json('QwQ');
  } else{

    const id = req.params.id;
    const article = await Article.findById(id);
    if (article.userId !== user.id) {
      res.status(404).json('QwQ');
    } else {
      res.json(article);
     }
  }
});

articleRouter.post('/', async (req, res) => {
  const { title, content, tags } = req.body;

  let user = null;
  try {
    user = await User.find({ where: { token: req.query.token }});
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    res.status(404).json('QwQ');
  } else {
    let article = null;
    try {
      article = await Article.create({
        title,
        content,
        userId: user.id,
      });

      for (let i = 0; i < tags.length; i += 1) {
        const [tag] = await Tag.findOrCreate({
          where: {
            name: tags[i],
          },
        });

        // await ArticleTag.create({
        //   articleId: article.id,
        //   tagId: tag.id,
        // });
      }
    } catch (err) {
      console.log(err);
    }

    res.json(article);
  }
});

articleRouter.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body;

  let user = null;
  try {
    user = await User.find({ where: { token: req.query.token }});
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    res.status(404).json('QwQ');
  } else{

    const id = req.params.id;
    await Article.update({
      title,
      content,
    }, {
      where: {
        id,
      },
    });

    // FIXME: tags

    const article = await Article.findById(id);
    res.json(article);
  }
});

articleRouter.delete('/:id', async (req, res) => {

  let user = null;
  try {
    user = await User.find({ where: { token: req.query.token }});
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    res.status(404).json('QwQ');
  } else{

    const id = req.params.id;

    await Article.destroy({
      where: {
        id,
      },
    });

    res.json({
      deletedId: +id,
    });
  }
});

export default articleRouter;

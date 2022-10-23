const app = require('express').Router()
const { models } = require('../db')
const { Sequelize, Op, QueryTypes } = require('sequelize')
const db = require('../db')

/**
 * 
 * @param {*} filters 
 * @param {*} keyword 
 */
 const query = async (filters=null, keyword='') => {
  try {
      const tokens = await models.token.findAll({
          attributes: ['number', 'name', 'image_url'],
          include: [
              {
                attributes: [
                  'name', 'base_image_url', 'desc', 'launch_date',
                  'base_crypto', 'address', 'public_address'
                ],
                model: models.project
              },
              {
                  model: models.attr,
                  attributes: ['key', 'value']
              }
          ],
          where: {}
      }).catch(e => { throw(e) })

      return tokens.map(e => {
        return {
          number: e.getDataValue('number'),
          name: e.getDataValue('name'),
          image_url: e.getDataValue('image_url'),
          project: e.project,
          attr_counts: e.attrs.length,
          attributes: e.attrs
        }
      })
  } catch (error) {
      console.log(`load`, error)
      throw (error)
  }
}

app.get('/', async (req, res, next) => {
  try {
    const { filters, keyword } = req.body;
    const data = await query(filters, keyword).catch(e => { throw(e) });

    res.send(data);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
});


module.exports = app
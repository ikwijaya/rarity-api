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
      const tokens = await models.project.findAll({
          attributes: [
            'name', 'base_image_url', 'desc', 'launch_date',
            'base_crypto', 'address', 'public_address'
          ],
          include: [
            {
                model: models.token,
                attributes: ['token_id', 'name', 'image_url']
            }
          ],
          where: {}
      }).catch(e => { throw(e) })

      return tokens.map(e => {
        return {
          name: e.getDataValue('name'),
          base_image_url: e.getDataValue('base_image_url'),
          desc: e.getDataValue('desc'),
          launch_date: e.getDataValue('launch_date'),
          base_crypto: e.getDataValue('base_crypto'),
          address: e.getDataValue('address'),
          public_address: e.getDataValue('public_address'),
          token_counts: e.tokens.length,
          tokens: e.tokens
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
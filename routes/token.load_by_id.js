const app = require('express').Router()
const { models } = require('../db')
const { Sequelize, Op, QueryTypes } = require('sequelize')
const db = require('../db')

/**
 * 
 * @param {*} filters 
 * @param {*} keyword 
 */
 const query = async (token_id=null) => {
  try {
      const token = await models.token.findOne({
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
          where: {
            token_id: token_id
          }
      }).catch(e => { throw(e) })

      if(token instanceof models.token) 
        token.setDataValue('attr_counts', token.getDataValue('attrs').length)
      
      return token
  } catch (error) {
      console.log(`load`, error)
      throw (error)
  }
}

/**
 * router
 */
app.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await query(id).catch(e => { throw(e) });

    res.send(data);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
});


module.exports = app
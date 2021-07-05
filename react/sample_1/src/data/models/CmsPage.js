import DataType from 'sequelize';
import Model from '../sequelize';

const CmsPage = Model.define('CmsPage', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },

  name: {
    type: DataType.STRING,
    allowNull: false,
  },

  slug: {
    type: DataType.STRING,
    allowNull: false,
  },

  active: {
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },

  lang: {
    type: DataType.STRING(2),
    allowNull: false,
  },

  region: {
    type: DataType.STRING(2),
    allowNull: false,
  },

  seoTitle: {
    type: DataType.STRING,
    allowNull: false,
  },

  seoKeywords: {
    type: DataType.STRING,
    allowNull: false,
  },

  seoDescription: {
    type: DataType.STRING,
    allowNull: false,
  },

  content: {
    type: DataType.TEXT,
    allowNull: false,
  },

});

export default CmsPage;

import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from '@sequelize/core';
import { DataTypes } from '@sequelize/core';
import sequelize from '../db';



// We recommend you declare an interface for the attributes, for stricter typechecking

interface IArticleModel
  extends Model<InferAttributes<IArticleModel>, InferCreationAttributes<IArticleModel>> {
  id: CreationOptional<number>;
  heading: string;
  content: string;
  cover: string;
}
export interface IArticle {
  id: number;
  heading: string;
  content: string;
  cover: string;
}
export const ArticleModel = sequelize.define<IArticleModel>('article', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  heading: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  cover: {
    type: DataTypes.STRING,
  }
});


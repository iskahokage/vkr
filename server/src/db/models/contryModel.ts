import type {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
  } from '@sequelize/core';
  import { DataTypes } from '@sequelize/core';
  import sequelize from '../db';
  
  
  
  // We recommend you declare an interface for the attributes, for stricter typechecking
  
  interface ICountryListModel
    extends Model<InferAttributes<ICountryListModel>, InferCreationAttributes<ICountryListModel>> {
    id: CreationOptional<number>;
    code: string;
    name: string;
  }
  export interface ICountryList {
    id: number;
    code: string;
    name: string;
  }
  export const CountryModel = sequelize.define<ICountryListModel>('countries', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    code: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    }
  });
  


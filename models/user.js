import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define("user", {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email is invalid'
            }
        }
    },
    // add owner to task fait référence à l'id de l'utilisateur
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    // Option pour ne pas avoir les colonnes createdAt et updatedAt
    createdAt: false,
    updatedAt: false
}
)
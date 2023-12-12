import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

export const Task = sequelize.define("task", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN
    },
    // add owner to task fait référence à l'id de l'utilisateur
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ref: {
            model: 'User',
            key: 'id'
        }
    }
},
{
    // Option pour ne pas avoir les colonnes createdAt et updatedAt
    createdAt: false,
    updatedAt: false
}
)
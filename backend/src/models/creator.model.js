const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Creator extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    Creator.init({
            id: {
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: DataTypes.STRING,
            imagePath: DataTypes.STRING,
            link: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Creator',
        });

    return Creator;
};
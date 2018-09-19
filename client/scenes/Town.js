const BaseScene = require('../utilities/base-scene');
// @TODO: move into the shared file.
const DOWN = 'down';
const TOWN = 'Town';
const HOUSE_1 = 'House_1';
const HOUSE_2 = 'House_2';
const MAP_TOWN = 'map-town';
const IMAGE_TOWN = 'town';

class Town extends BaseScene
{

    constructor()
    {
        super(TOWN);
    }

    init(data)
    {
        super.init(this.getPosition(data));
    }

    create()
    {
        super.create(MAP_TOWN, IMAGE_TOWN, false);
    }

    registerCollision()
    {
        // river:
        this.layers[6].setCollisionBetween(0, 1021);
        // house 1:
        this.layers[7].setCollisionBetween(105, 110);
        this.layers[7].setCollisionBetween(125, 130);
        this.layers[7].setCollisionBetween(145, 150);
        this.layers[7].setCollisionBetween(165, 170);
        // house 2:
        this.layers[7].setCollisionBetween(207, 207);
        this.layers[7].setCollisionBetween(226, 228);
        this.layers[7].setCollisionBetween(245, 249);
        this.layers[7].setCollisionBetween(264, 270);
        this.layers[7].setCollisionBetween(284, 290);
        this.layers[7].setCollisionBetween(304, 310);
        this.layers[7].setCollisionBetween(324, 330);
        this.layers[7].setCollisionBetween(344, 350);
        this.layers[7].setCollisionBetween(1661, 1663);
        // camps:
        this.layers[8].setCollisionBetween(5, 25);
        // trees:
        this.layers[9].setCollisionBetween(213, 215);
        this.layers[9].setCollisionBetween(233, 256);
        this.layers[9].setCollisionBetween(273, 296);
        let player = this.player.players[this.player.playerId];
        this.physics.add.collider(player, this.layers[6]);
        this.physics.add.collider(player, this.layers[8]);
        this.physics.add.collider(player, this.layers[9]);
        this.physics.add.collider(player, this.layers[7], (sprite, tile) => {
            if (tile.index === 167) {
                this.nextSceneKey = HOUSE_1;
                this.onChangeScene();
            } else if (tile.index === 1661 || tile.index === 1662) {
                this.nextSceneKey = HOUSE_2;
                this.onChangeScene();
            }
        });
    }

    getPosition(data)
    {
        if (data === HOUSE_1 || Object.getOwnPropertyNames(data).length === 0){
            return { x: 225, y: 280, direction: DOWN };
        } else if(data === HOUSE_2){
            return { x: 655, y: 470, direction: DOWN };
        }
    }

}

module.exports = Town;
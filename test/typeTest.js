var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        physics: {
            arcade: {
                debug: true,
                gravity: { y: 0 }
            },
            matter: {
                debug: true,
                gravity: { y: 0 }
            }
        }
    },
};

var game = new Phaser.Game(config);

function preload ()
{
    var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', function () {

        progress.destroy();

    });

    //  Now let's load a huge stack of files!

    this.load.setPath('https://labs.phaser.io/assets/sprites/');

    this.load.image('fish-136x80');
    this.load.image('flectrum');
    this.load.image('flectrum2');
    this.load.image('fork');
    this.load.image('fruitnveg32wh37');
    this.load.image('fruitnveg64wh37');
    this.load.image('fuji');
    this.load.image('gameboy_seize_color_40x60');
    this.load.image('gem');
    this.load.image('gem-blue-16x16x4');
    this.load.image('gem-green-16x16x4');
    this.load.image('gem-red-16x16x4');
    this.load.image('ghost');
    this.load.image('green_ball');
    this.load.image('healthbar');
    this.load.image('helix');
    this.load.image('hello');
    this.load.image('hotdog');
    this.load.image('humstar');
    this.load.image('ilkke');
    this.load.image('interference_ball_48x48');
    this.load.image('interference_tunnel');
    this.load.image('jets');
    // this.load.image('kirito_by_vali233');
    // this.load.image('lemming');
    // this.load.image('longarrow');
    // this.load.image('longarrow-down');
    // this.load.image('longarrow-white');
    // this.load.image('longarrow2');
    // this.load.image('loop');
    // this.load.image('maggot');
    // this.load.image('magnify-glass-inside');
}

function create ()
{
    var keys = this.textures.getTextureKeys();

    // for (var i = 0; i < keys.length; i++)
    // {
    //     var x = Phaser.Math.Between(0, 800);
    //     var y = Phaser.Math.Between(0, 600);

    //     this.add.image(x, y, keys[i]);
    // }

    let tmpX = [70, 150, 250, 330, 400, 470, 540];
    let tmpY = [100, 200, 300, 400];
    let tmpSize = 45;
    // image, sprite, text, tile sprite, container, notification(explain)
    // normal

    // arcade

    // matter
    

    // image
    this.add.image(tmpX[0], tmpY[0], keys.pop()).setDisplaySize(tmpSize, tmpSize);
    this.physics.add.image(tmpX[0], tmpY[1], keys.pop()).setDisplaySize(tmpSize, tmpSize);
    this.matter.add.image(tmpX[0], tmpY[2], keys.pop()).setDisplaySize(tmpSize, tmpSize);

    // sprite
    this.add.sprite(tmpX[1], tmpY[0], keys.pop()).setDisplaySize(tmpSize, tmpSize);
    this.physics.add.sprite(tmpX[1], tmpY[1], keys.pop()).setDisplaySize(tmpSize, tmpSize);
    this.matter.add.sprite(tmpX[1], tmpY[2], keys.pop()).setDisplaySize(tmpSize, tmpSize);

    // text
    this.add.text(tmpX[2], tmpY[0], keys.pop()).setDisplaySize(tmpSize, tmpSize).setOrigin(1, 0.5);
    let tmpArcade = this.add.text(tmpX[2], tmpY[1], keys.pop()).setDisplaySize(tmpSize, tmpSize).setOrigin(1, 0.5);
    this.physics.world.enable(tmpArcade);
    let tmpMatter = this.add.text(tmpX[2], tmpY[2], keys.pop()).setDisplaySize(tmpSize, tmpSize).setOrigin(1, 0.5);
    this.matter.add.gameObject(tmpMatter);

    // tile sprite
    this.add.tileSprite(tmpX[3], tmpY[0], tmpSize, tmpSize, keys.pop());
    let tmpArcadeTS = this.add.tileSprite(tmpX[3], tmpY[1], tmpSize, tmpSize, keys.pop());
    this.physics.add.existing(tmpArcadeTS, false);
    let tmpMatterTS = this.add.tileSprite(tmpX[3], tmpY[2], tmpSize, tmpSize, keys.pop());
    this.matter.add.gameObject(tmpMatterTS);

    // container
    let tmpNormalCon = this.add.container();
    tmpNormalCon.add(this.add.image(tmpX[4], tmpY[0], keys.pop()).setDisplaySize(tmpSize/2, tmpSize));
    tmpNormalCon.add(this.add.image(tmpX[4]+tmpSize/2+5, tmpY[0], keys.pop()).setDisplaySize(tmpSize/2, tmpSize));

    let tmpArcadeCon = this.add.container();
    tmpArcadeCon.add(this.add.image(tmpX[4], tmpY[1], keys.pop()).setDisplaySize(tmpSize/2, tmpSize));
    tmpArcadeCon.add(this.add.image(tmpX[4]+tmpSize/2+5, tmpY[1], keys.pop()).setDisplaySize(tmpSize/2, tmpSize));
    this.physics.add.existing(tmpArcadeCon, false);

    let tmpMatterCon = this.add.container();
    tmpMatterCon.add(this.add.image(tmpX[4], tmpY[2], keys.pop()).setDisplaySize(tmpSize/2, tmpSize));
    tmpMatterCon.add(this.add.image(tmpX[4]+tmpSize/2+5, tmpY[2], keys.pop()).setDisplaySize(tmpSize/2, tmpSize));
    tmpMatterCon.setSize(tmpSize, tmpSize);
    this.matter.add.gameObject(tmpMatterCon);


    // notifications
    this.add.text(tmpX[0], tmpY[3], 'IMAGE').setOrigin(0.5);
    this.add.text(tmpX[1], tmpY[3], 'SPRITE').setOrigin(0.5);
    this.add.text(tmpX[2], tmpY[3], 'TEXT').setOrigin(0.5);
    this.add.text(tmpX[3], tmpY[3], 'TILE\nSRPITE').setOrigin(0.5);
    this.add.text(tmpX[4], tmpY[3], 'CONTAINER').setOrigin(0.3, 0.5);

    this.add.text(tmpX[6], tmpY[0], 'NORMAL').setOrigin(0.5);
    this.add.text(tmpX[6], tmpY[1], 'ARCADE').setOrigin(0.5);
    this.add.text(tmpX[6], tmpY[2], 'MATTER').setOrigin(0.5);



    PhaserGUIAction(this, {side: false});
}

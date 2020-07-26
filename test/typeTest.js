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
var tmpSpr = {
    self: undefined,
    key: 'LazerSpr',
    url: {
        png: './lazer.png',
        json: './lazer.json'
    },
    animSelf: undefined,
    animKey: 'AnimLazer'
};

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
    this.load.setPath('https://labs.phaser.io/assets/animations/lazer');
    this.load.atlas(tmpSpr.key, tmpSpr.url.png, tmpSpr.url.json);
    this.load.setPath('https://labs.phaser.io/assets/animations/');
    this.load.atlas('cube', './cube.png', './cube.json');
    this.load.spritesheet('mummy', './mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
}

function create () {

    this.anims.create(
        {
            key: tmpSpr.animKey,
            frames: this.anims.generateFrameNames(
                tmpSpr.key, 
                { prefix: 'lazer_', start: 0, end: 22, zeroPad: 2 }
            ),
            repeat: -1 
        }
    );
    this.anims.create(
        {
            key: '1',
            frames: this.anims.generateFrameNames(
                tmpSpr.key, 
                { prefix: 'lazer_', start: 0, end: 22, zeroPad: 2 }
            ),
            repeat: -1 
        }
    );
    this.anims.create(
        {
            key: '2',
            frames: this.anims.generateFrameNames(
                tmpSpr.key, 
                { prefix: 'lazer_', start: 0, end: 22, zeroPad: 2 }
            ),
            repeat: -1 
        }
    );
    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNames('cube', { prefix: 'frame', start: 0, end: 23 }),
        frameRate: 50,
        repeat: -1
    });
    
    anim = this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('mummy'),
        frameRate: 6,
        yoyo: false,
        repeat: -1
    });


    var keys = this.textures.getTextureKeys();

    let tmpX = [70, 150, 250, 330, 400, 470, 540];
    let tmpY = [100, 200, 300, 400];
    let tmpSize = 45;
    // image, sprite, text, tile sprite, container, notification(explain)

    // image
    this.add.image(tmpX[0], tmpY[0], keys.shift()).setDisplaySize(tmpSize, tmpSize);
    this.physics.add.image(tmpX[0], tmpY[1], keys.shift()).setDisplaySize(tmpSize, tmpSize);
    this.matter.add.image(tmpX[0], tmpY[2], keys.shift()).setDisplaySize(tmpSize, tmpSize);

    // sprite
    tmpSpr.self = this.add.sprite(tmpX[1], tmpY[0], keys.pop()).setDisplaySize(tmpSize, tmpSize);
    tmpSpr.self.anims.play('1');
    let tmpArcadeAnim = this.physics.add.sprite(tmpX[1], tmpY[1], keys.pop());
    tmpArcadeAnim.setTexture('cube');
    tmpArcadeAnim.anims.play('spin');
    tmpArcadeAnim.setDisplaySize(tmpSize, tmpSize);
    let tmpMatterAnim = this.matter.add.sprite(tmpX[1], tmpY[2], keys.pop());
    tmpMatterAnim.setTexture('mummy');
    tmpMatterAnim.anims.play('walk');
    tmpMatterAnim.setBody({
        type: 'rectangle',
        width: tmpSize,
        height: tmpSize
    });

    // text
    this.add.text(tmpX[2], tmpY[0], keys.pop()).setDisplaySize(tmpSize, tmpSize).setOrigin(1, 0.5);
    let tmpArcade = this.add.text(tmpX[2], tmpY[1], keys.pop()).setDisplaySize(tmpSize, tmpSize).setOrigin(1, 0.5);
    this.physics.world.enable(tmpArcade);
    let tmpMatter = this.add.text(tmpX[2], tmpY[2], keys.shift()).setDisplaySize(tmpSize, tmpSize).setOrigin(1, 0.5);
    this.matter.add.gameObject(tmpMatter);

    // tile sprite
    this.add.tileSprite(tmpX[3], tmpY[0], tmpSize, tmpSize, keys.shift());
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

    // // particles
    // var particles = this.add.particles(keys.pop());
    // var emitter = particles.createEmitter({
    //     x: tmpX[5],
    //     y: tmpY[0],
    //     angle: { min: 180, max: 360 },
    //     speed: 100,
    //     gravityY: 100,
    //     lifespan: 1000,
    //     quantity: 1,
    //     scale: { start: 0.1, end: 1 },
    //     blendMode: 'ADD'
    // });
    // console.log('particles:', particles);

    // this.add.rope(tmpX[5], tmpY[0], keys.pop(), null, 64);


    // notifications
    this.add.text(tmpX[0], tmpY[3], 'IMAGE').setOrigin(0.5);
    this.add.text(tmpX[1], tmpY[3], 'SPRITE').setOrigin(0.5);
    this.add.text(tmpX[2], tmpY[3], 'TEXT').setOrigin(0.5);
    this.add.text(tmpX[3], tmpY[3], 'TILE\nSRPITE').setOrigin(0.5);
    this.add.text(tmpX[4], tmpY[3], 'CONTAINER').setOrigin(0.3, 0.5);

    this.add.text(tmpX[6], tmpY[0], 'NORMAL').setOrigin(0.5);
    this.add.text(tmpX[6], tmpY[1], 'ARCADE').setOrigin(0.5);
    this.add.text(tmpX[6], tmpY[2], 'MATTER').setOrigin(0.5);

    PhaserGUIAction(this, {side: true});
}


var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        width: 800,
        height: 600
    },
    // physics: {
    //     arcade: {
    //         debug: true
    //     },
    //     matter: {
    //         debug: true,
    //         gravity: {
    //             x: 0,
    //             y: 0
    //         }
    //     }
    // },
    scene: {
        preload: preload,
        create: create,
        // update: update
        physics: {
            arcade: {
                debug: true
            },
            matter: {
                debug: true,
                gravity: {
                    x: 0,
                    y: 0.01
                }
            }
        },
    }
};

var text;
// temp test lazor atlas sprite
var tmpSpr = {
    self: undefined,
    key: 'LazerSpr',
    url: {
        png: './src/lazer.png',
        json: './src/lazer.json'
    },
    animSelf: undefined,
    animKey: 'AnimLazer'
};
var tmpImg = {
    self: undefined,
    key: 'ConsoleImg',
    url: {
        png: './zReadMeSrc/capture_img.png'
    },
};
var game = new Phaser.Game(config);

function preload() {
    this.load.atlas(tmpSpr.key, tmpSpr.url.png, tmpSpr.url.json);
    this.load.atlas('cube', './src/cube.png', './src/cube.json');
    this.load.image(tmpImg.key, tmpImg.url.png);
}

function create() {
    
    /*
    _trying all the Phaser.GameObjects_
    
    /OBJECT LIST                    /DONE RATE
    TEXT(normal, arcade, matter)    2
    IMAGE(")                        O
    SPRITE(")                       O
    TILESPRITE(")                   O
    CONTAINER                       O
    SPINE                           X

    */

    // // TEST__Phaser.Scene restart
    // this.input.on('pointerdown', () => {
    //     console.log('restart scene');
    //     this.scene.restart();
    // });

    // sprite game object
    tmpSpr.self = this.matter.add.sprite(100, 200, tmpSpr.key, 'lazer_00');
    let tmpImg2 = this.physics.add.image(100, 400, tmpSpr.key, 'lazer_00');
    tmpImg2.setScale(0.2);
    // tmpSpr.self.name = 'var_tmpSpr';
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


    tmpSpr.self.anims.play(tmpSpr.animKey);
    tmpSpr.self.setDisplaySize(80, 80);

    // text game object
    var config1 = {
        x: 300,
        y: 300,
        text: 'Text\nGame Object\nCreated from config',
        style: {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#ff00ff',
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 8
            }
        }
    };
    
    var tmpTxt = this.make.text(config1);

    var tmpTw = this.tweens.addCounter({
        from: 300, to: 400,
        ease: 'Linear', duration: 1000, yoyo: true, repeat: -1,
        onUpdate: () => {
            tmpTxt.x = tmpTw.getValue();
        }
    });

    var tmpTileSprite = this.add.tileSprite(200, 300, 100, 100, tmpImg.key);

    var tmpCon = this.add.container();
    tmpCon.name = 'tmpCon';

    tmpCon.add([tmpTxt, tmpTileSprite]);



    // PGInspector.js usage
    PhaserGUIAction(
        this, { side: true }
    );
}

function update() {
    // console.log('this in index.js update:', this);
}

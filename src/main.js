/*
 * Name: Raymond Metzger
 * Project tite: Rocket Patrol Mods
 * Time spent: ~10 hours
 * 
 * Modifications
 *  simultaneous two-player mode            30pts
 *  scoring adds additional time            20pts
 *  smaller, faster ship worth more pts     20pts
 *  mouse controls (for 2nd player)         20pts
 *  display remaining time                  10pts
 *  movement controls after firing          5pts
 * 
 * Total Points:                            105
 * 
 * Capped at 100:                           100
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyW, keyA, keyD;
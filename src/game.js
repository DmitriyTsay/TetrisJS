export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = this.createPlayfield(); // creating playfield copy
    
    activePiece = { // our active tetramine
        x: 0, // coordinates in playfield by horizontal 
        y: 0, // coordinates in playfield by vertical

        blocks: [ // our active piece structure
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],

    };
    
    getState() {

        const playfield = this.createPlayfield();
        
        for (let y = 0; y < this.playfield.length; y++) { // copying playfield
            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }

        for (let y = 0; y < this.activePiece.blocks.length; y++) { // copying actual location of active piece
            for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
                if (this.activePiece.blocks[y][x] != 0) {
                    playfield[y + this.activePiece.y][x + this.activePiece.x] = this.activePiece.blocks[y][x];
                }
            }
        }

        return {
            playfield
        };
    }

    createPlayfield() {
        const playfield = [];
        for (let y = 0; y < 20; y++) {
            playfield[y] = [];
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
                
            }
        }
        return playfield; 
    }


    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const lengthVertical = this.activePiece.blocks.length;
        const lengthHorizontal = this.activePiece.blocks[0].length;

        let temp = [];

        for (let i = 0; i < lengthVertical; i++) {
            temp[i] = new Array(lengthVertical).fill(0);
        }
        
        for (let y = 0; y < lengthVertical; y++) {
            for (let x = 0; x < lengthHorizontal; x++) {
                temp[y][x] = this.activePiece.blocks[lengthVertical - 1 - x][y];
            }
        }

        this.activePiece.blocks = temp;
        
        if (this.isBumping() == true) {
            this.activePiece.blocks = blocks;
        }

        return this.activePiece.blocks;

    }


    movePieceLeft() { // moving piece to the left by reducing X value
        this.activePiece.x -= 1;

        if (this.isBumping() == true) {
            this.activePiece.x += 1;
        }
    }

    movePieceRight() { // moving piece to the right by increasing X value
        this.activePiece.x += 1;

        if (this.isBumping() == true) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() { // moving piece down by increasing Y value
        this.activePiece.y += 1;

        if (this.isBumping() == true) {
            this.activePiece.y -= 1;
            this.lockPiece();
        }
    }

    isBumping() { // check if piece is out of playfield or is bumping into other existing blocks (only active parts (value 1))
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;
        
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] != 0 && 
                    ((this.playfield[y + pieceY] === undefined || this.playfield[y + pieceY][x + pieceX] === undefined) ||
                    (this.playfield[y + pieceY][x + pieceX] != 0))
                ) {
                    return true;
                }
            }
        }
        
        return false;

    }

    lockPiece() { // locking piece in the playfield
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] != 0) {
                    this.playfield[y + pieceY][x + pieceX] = blocks[y][x];
                }
            }
        }
    }

};
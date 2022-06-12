export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0], // 20
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0] // 25 - from 0-25 is invisible for player field (с 0-25 невидимое поле для игрока)
    ];
    
    activePiece = { // our active tetramine
        x: 0, // coordinates in playfield by horizontal 
        y: 0, // coordinates in playfield by vertical

        blocks: [ // our active piece structure
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],

    };

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
export default class Game {
    
    static points = {
        '1': 40,
        '2': 100,
        '3': 300,
        '4': 1200
    }

    score = 0; // setting zero score for start
    lines = 0; // setting amount of fullfiled lines

    get level() {
        return Math.floor(this.lines * 0.1);
    }


    blocksList = [ // list with figures, each figure has different values cause of color detection in view.js
        [
            [0,0,0], // T
            [1,1,1],
            [0,1,0]
        ],
                
        [
            [2,2], // O
            [2,2],
        ],
                
        [
            [0,0,0,0], // I
            [3,3,3,3],
            [0,0,0,0],
            [0,0,0,0]
        ],
                
        [
            [0,4,4], // S
            [4,4,0],
            [0,0,0]
        ],
                
        [
            [5,5,0], // Z
            [0,5,5],
            [0,0,0]
        ],
                
        [
            [6,0,0], // L
            [6,0,0],
            [6,6,0]
        ],
                
        [
            [0,7,0], // J
            [0,7,0],
            [7,7,0]
        ],
    ];

    playfield = this.createPlayfield(); // creating empty playfield
    
    activePiece = this.createPiece(); // creating random piece (tetramino)

    nextPiece = this.createPiece(); // preparing next random piece
    
    getState() { // method to show activePiece on playfield

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

    createPlayfield() { // method to create empty playfield
        const playfield = [];
        for (let y = 0; y < 20; y++) {
            playfield[y] = [];
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
                
            }
        }
        return playfield; 
    }
    
    randomPieceIndex() { // generation of random index for type of tetramino
        return Math.floor(Math.random() * (7 - 0) + 0); 
    }

    createPiece() {
        const pieceIndex = this.randomPieceIndex();
        
        // console.log(pieceIndex);
        // console.log(this.blocksList);
        const generatedBlock = this.blocksList[pieceIndex];
        
        return {
            x: Math.floor((10 - generatedBlock[0].length)/2), // coordinates in playfield by horizontal 
            y: 0, // coordinates in playfield by vertical
            blocks: generatedBlock
        }
    }

    rotatePiece() { // used for rotating piece (only if activepiece is not bumping)
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
            this.lockPiece(); // locking in playfield
            const clearedLines = this.clearLines();
            this.updateScore(clearedLines);
            this.updatePiece(); // changing on next piece by using updatePiece()
        }
    }

    isBumping() { // check if piece is out of playfield or is bumping into other existing blocks (only active parts (value 1))
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;
        
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] != 0 && // checks elements of piece (only choose 1, not 0)
                    ((this.playfield[y + pieceY] === undefined || this.playfield[y + pieceY][x + pieceX] === undefined) || // condition for out of border
                    (this.playfield[y + pieceY][x + pieceX] != 0)) // condition for other pieces
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

    clearLines() { // removing fullfilled lines
        let lines = [];

        for (let y = 19; y >= 0; y--) {
            
            let numberOfBlocks = 0;

            for (let x = 0; x < 10; x++) {
                if (this.playfield[y][x]) {
                    numberOfBlocks += 1;
                }
            }

            if (numberOfBlocks === 0) {
                break;
            }

            else if (numberOfBlocks < 10) {
                continue;
            }

            else if (numberOfBlocks === 10) {
                lines.unshift(y);
            }

        }

        for (let index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(10).fill(0));
        }
        // console.log(lines);

        return lines.length;

    }
    
    updateScore(clearedLines) {
        if (clearedLines > 0) {
            this.score += Game.points[clearedLines] * (this.level * 1);
            this.lines += clearedLines;
            // console.log(this.score, this.lines);
        }
    }

    updatePiece() { // method to change active piece on next piece after lockPiece (used in movePieceDown())
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }

};
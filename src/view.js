export default class View {
    static colors = { // list for selecting color based on index
        '1': 'purple',
        '2': 'yellow',
        '3': 'cyan',
        '4': 'green',
        '5': 'red',
        '6': 'orange',
        '7': 'blue'
    };

    constructor(element, width, height, rows, columns) { // constructor for initiating canvas
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas'); // creating canvas
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.margin = "30px auto";
        
        this.context = this.canvas.getContext('2d');

        this.blockWidth = (this.width / columns);
        this.blockHeight = (this.height / rows);

        this.element.appendChild(this.canvas);
    }

    renderPlayfield(playfield) {

        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                
                if (block != 0) {
                    this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
                }

            }
            
        }
    }
    
    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    
    render ({playfield}) {
        this.clearScreen();
        this.renderPlayfield(playfield);
    }

    

}
export default class View {
    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.margin = "30px auto";
        this.canvas.style.border = "2px solid white";
        
        this.context = this.canvas.getContext('2d');

        this.blockWidth = (this.width / columns);
        this.blockHeight = (this.height / rows);

        this.element.appendChild(this.canvas);

    }

    renderPlayfield({ playfield }) {

        this.context.clearRect(0,0,this.width,this.height);

        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                
                if (block != 0) {
                    this.context.fillStyle = 'red';
                    this.context.strokeStyle = 'white';
                    this.context.lineWidth = 2;

                    this.context.fillRect(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight);
                }

            }
            
        }
    }

    

}
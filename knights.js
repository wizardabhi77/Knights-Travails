
let chessBoard = new Array(8).fill().map(() => Array(8).fill('O'));

let parent = [];



let paths = [];

let Q = [];

class Tile {
    constructor (x,y) {
        this.x = Number(x);
        this.y = Number(y);

        this.possMoves = this.possibleMoves(this.x,this.y);
    }

    possibleMoves(x,y){
        
        let moves = [[x-1,y-2],[x+1,y-2],[x+2,y-1],[x+2,y+1],[x+1,y+2],[x-1,y+2],[x-2,y+1],[x-2,y-1]];

        moves = moves.filter((pos) => {
                [x,y] = pos;

                return (x>=0 && x<8) && (y>=0 && y<8) && chessBoard[x][y] == 'O';
        })

        moves = moves.map((pos) => {
            return pos.toString();
        })
        
        return moves;
    }

    
}

function hashCode(pos){

    let index = Number(pos[0]) * 10 + Number(pos[2]);

    return index;

}

function getPath(pos,start) {

    if(pos === start){
        paths.push(start);
        return null;
    }
    paths.push(pos);

    getPath(parent[hashCode(pos)],start);
}

function knightMoves(start,end){

    let x = Number(start[0]);
    let y = Number(start[2]);

    if(!((x>=0 && x<8) && (y>=0 && y<8))){
        return null;
    }
    
    let startTile = new Tile(start[0],start[2]);

    Q.push(start);
    
    if(start === end){
        
        return 'START AND POSITION ARE SAME!';
    }

    if(startTile.possMoves.includes(end)){
        paths.push(start,end);
    }
  

    while(Q[0] && Q.length<64){
        
        startTile = new Tile(Q[0][0],Q[0][2]);

        Q.push(...startTile.possMoves);
        if(startTile.possMoves.includes(end)){
            getPath(`${startTile.x},${startTile.y}`,start);
            paths = paths.reverse();
            paths.push(end);
            
            break;
       }
       else{
            
            startTile.possMoves.forEach((pos)=> {
                let x = Number(pos[0]);
                let y = Number(pos[2]);
                parent[hashCode(pos)] = `${startTile.x},${startTile.y}`;
                chessBoard[x][y] = 'X';
            })
            
            
            Q.shift();
        } 
        

    }
   
    
    return paths;

    

}



console.log(knightMoves('3,3','4,3'));
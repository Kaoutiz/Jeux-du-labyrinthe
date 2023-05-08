export function labyrinthe(){

    // MES VARIABLES  
    const _GRID = document.getElementById("grid");
    const _RIGHT_BUTTON = document.getElementById("right-button");
    const _LEFT_BUTTON = document.getElementById("left-button");
    const _FORWARD_BUTTON = document.getElementById("forward-button");
    const _SHOOT_BUTTON = document.getElementById("shoot-button");
    const _SCORE_VALUE = document.getElementById("score-value");
    const _FUEL_VALUE = document.getElementById("fuel-value");
    const _FUEL_BAR = document.getElementById("fuel-bar-content");
    const _GAME_OVER = document.getElementById("game-over");
    const _GAME_OVER_BUTTON = document.getElementById("game-over-button");
    const _GAME_OVER_CONTENT = document.getElementById("game-over-content");
    const _RESET_BUTTON = document.getElementById("reset-button");
    const _DISPLAY_SCORE = document.getElementById("display_score");
    const _MAP_SIZE = 225;
    const NB_TREASEAUR = 20;
    const NB_UNBREAKING_TILES = 5;
    const NB_FUEL = 3;

    // LA MAP
    let map = [];

    let tankRotation = "forward";
    let tankPosition = 112;
    let score = 0;
    let fuel = 50;
    let fuelbar = 100;

    // ON DEMARRE LE JEU
    init();

    function init(){
        generateNewMap();
    }

    function generateNewMap(){
        generateTiles(_MAP_SIZE);
        generateTreseaur(NB_TREASEAUR);
        generateUnbreakingTiles(NB_UNBREAKING_TILES);
        generateFuel(NB_FUEL);
        generatePlayer();
        generateMap();
        getTankPosition();
    }

    // ON GENERE LES TUILES
    function generateTiles(_MAP_SIZE){

        for(let i = 0; i < _MAP_SIZE; i++){

            /* On détermine un nombre au hasard entre 1 et 4
            *
            * 1 = Tuile Fragile
            * 2 = Tuile Moyenne
            * 3 = Tuile Solide
            * 4 = Tuile vide
            * 
            * */
            let random_tuile = Math.floor(Math.random() * 4) + 1;

            switch(random_tuile){
                case 1: 
                    map.push(1);
                    break;
                case 2:
                    map.push(2);
                    break;
                case 3:
                    map.push(3);
                    break;
                case 4:
                    map.push(4);
                    break;
                default:
                    console.log('Erreur sur la génération de la tuile.');
                    break;
            }

        }
    }

    // ON GENERE LES TRESORS
    function generateTreseaur(NB_TREASEAUR){

        for(let i = 0; i < NB_TREASEAUR; i++){

            // On détermine une position au hasard dans la map
            let random_position = Math.floor(Math.random() * _MAP_SIZE);

            // Si la position contient déjà un trésor ou un bloc incassable ou un baril d'essence, on détermine une nouvelle position
            if(map[random_position] == 5 || map[random_position] == 7 || map[random_position] == 8){
                random_position = Math.floor(Math.random() * _MAP_SIZE);
            }
            
            // Si la position est au centre de la map, on la redéfinit car cet emplacement est rerservé pour le joueur
            if(random_position == 112){
                random_position = Math.floor(Math.random() * _MAP_SIZE);
            }

            // On remplace la tuile par un trésor
            map.splice(random_position, 1, 5);
        }

    }

    // ON GENERE LES BLOC INCASSABLE
    function generateUnbreakingTiles(NB_UNBREAKING_TILES){

        for(let i = 0; i < NB_UNBREAKING_TILES; i++){

            // On détermine une position au hasard dans la map
            let random_position = Math.floor(Math.random() * _MAP_SIZE);

            // Si la position contient déjà un trésor ou un bloc incassable ou un baril d'essence, on détermine une nouvelle position
            if(map[random_position] == 5 || map[random_position] == 7 || map[random_position] == 8){
                random_position = Math.floor(Math.random() * _MAP_SIZE);
            }
            
            // Si la position est au centre de la map, on la redéfinit car cet emplacement est rerservé pour le joueur
            if(random_position == 112){
                random_position = Math.floor(Math.random() * _MAP_SIZE);
            }

            // On remplace la tuile par un trésor
            map.splice(random_position, 1, 7);
        }

    }

    // ON GENERE LES BLOCS D'ESSENCE
    function generateFuel(NB_FUEL){

        for(let i = 0; i < NB_FUEL; i++){

            // On détermine une position au hasard dans la map
            let random_position = Math.floor(Math.random() * _MAP_SIZE);

            // Si la position contient déjà un trésor ou un bloc incassable ou un baril d'essence, on détermine une nouvelle position
            if(map[random_position] == 5 || map[random_position] == 7 || map[random_position] == 8){
                random_position = Math.floor(Math.random() * _MAP_SIZE);
            }
            
            // Si la position est au centre de la map, on la redéfinit car cet emplacement est rerservé pour le joueur
            if(random_position == 112){
                random_position = Math.floor(Math.random() * _MAP_SIZE);
            }

            // On remplace la tuile par un trésor
            map.splice(random_position, 1, 8);
        }

    }
    

    // ON GENERE LE JOUEUR
    function generatePlayer(){

        // On remplace la tuile au centre de la map par notre joueur
        map.splice(112, 1, 6);

    }

    // ON GENERE LA MAP
    function generateMap(){

        // On parcours la map et on créer la div adéquat en fonction de ce que contient l'index courrant
        for(let i = 0; i < map.length; i++){

            switch(map[i]){
                case 1:
                    let tuile_fragile = document.createElement("div");
                    tuile_fragile.setAttribute("class", "tuile tuile-fragile");
                    let nbr_tuile_fragile = document.createTextNode("1");
                    tuile_fragile.appendChild(nbr_tuile_fragile);
                    _GRID.appendChild(tuile_fragile);
                    break;
                case 2:
                    let tuile_moyenne = document.createElement("div");
                    tuile_moyenne.setAttribute("class", "tuile tuile-moyenne");
                    let nbr_tuile_moyenne = document.createTextNode("2");
                    tuile_moyenne.appendChild(nbr_tuile_moyenne);
                    _GRID.appendChild(tuile_moyenne);
                    break;
                case 3:
                    let tuile_solide = document.createElement("div");
                    tuile_solide.setAttribute("class", "tuile tuile-solide");
                    let nbr_tuile_solide = document.createTextNode("3");
                    tuile_solide.appendChild(nbr_tuile_solide);
                    _GRID.appendChild(tuile_solide);
                    break;
                case 4:
                    let tuile_vide = document.createElement("div");
                    tuile_vide.setAttribute("class", "tuile tuile-vide");
                    _GRID.appendChild(tuile_vide);
                    break;
                case 5:
                    let tresor = document.createElement("div");
                    tresor.setAttribute("class", "tuile tresor");
                    _GRID.appendChild(tresor);
                    break;
                case 6:
                    let tank = document.createElement("div");
                    tank.setAttribute("class", "tuile tank");
                    _GRID.appendChild(tank);
                    break;
                case 7:
                    let tuile_unbreaking = document.createElement("div");
                    tuile_unbreaking.setAttribute("class", "tuile unbreaking");
                    _GRID.appendChild(tuile_unbreaking);
                    break;
                case 8:
                    let essence = document.createElement("div");
                    essence.setAttribute("class", "tuile essence");
                    _GRID.appendChild(essence);    
                    break;
            }

        }
    }

    function getTankPosition(){
        return map.indexOf(6);
    }

    function getTankRotation(){

        // On applique la rotation au tank en fonction de celle qu'il avait
        switch(tankRotation){

            case "forward":
                document.getElementsByClassName("tank")[0].style.transform = "rotate(0deg)";
                break;
            case "right":
                document.getElementsByClassName("tank")[0].style.transform = "rotate(90deg)";
                break;
            case "down":
                document.getElementsByClassName("tank")[0].style.transform = "rotate(180deg)";
                break;
            case "left":
                document.getElementsByClassName("tank")[0].style.transform = "rotate(270deg)";
                break;
        }

    }

    _RIGHT_BUTTON.addEventListener("click", function(){

        switch(tankRotation){
            case "forward":
                tankRotation = "right";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(90deg)";
                break;
            case "right":
                tankRotation = "down";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(180deg)";
                break;
            case "down":
                tankRotation = "left";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(270deg)";
                break;
            case "left":
                tankRotation = "forward";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(0deg)";
                break;
        }

    });

    _LEFT_BUTTON.addEventListener("click", function(){

        switch(tankRotation){
            case "forward":
                tankRotation = "left";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(270deg)";
                break;
            case "left":
                tankRotation = "down";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(180deg)";
                break;
            case "down":
                tankRotation = "right";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(90deg)";
                break;
            case "right":
                tankRotation = "forward";
                document.getElementsByClassName("tank")[0].style.transform = "rotate(0deg)";
                break;
        }
        
    });

    _FORWARD_BUTTON.addEventListener("click", function(){

        if(fuel > 0){

            let cibleContent = map[getCible()];
            let ciblePosition = getCible();
    
            if(cibleContent == 4 || cibleContent == 5 || cibleContent == 8){
    
                // On diminue le fuel
                fuel--;
                _FUEL_VALUE.textContent = fuel + "/50";
               
                // Si la case est un coffre on modifie le score
                if(cibleContent === 5){

                    score += 1000;
                    _SCORE_VALUE.textContent = score;

                }else{
                    score -= 15;
                    _SCORE_VALUE.textContent = score;
                }
    
                // Si la case est un baril d'essence
                if(cibleContent === 8){
                    fuel += 5;

                    // On vérifie que la jauge ne dépassera pas la quantité maximum
                    if(fuel > 45){
                        fuel = 50;
                    }

                    _FUEL_VALUE.textContent = fuel + "/50";
                }
    
                // On remplace la position actuelle par une tuile vide
                map.splice(tankPosition, 1, 4);
    
                // On définit la nouvelle position du tank
                tankPosition = ciblePosition;
    
                // On remplace la tuile vide cible par le tank
                map.splice(tankPosition, 1, 6);
    
                // On clear la map
                clearMap();
    
                // On génère la map actualisé avec notre déplacement
                generateMap();
    
                // On met le tank dans sa bonne rotation
                getTankRotation();

                // On baisse l'affichage du niveau d'essence
                fuelBar(cibleContent, "forward");

                // On verifie si il reste des coffres à trouver
                if(map.includes(5) === false){
                    win();
                }
            }
        }else{
            gameOver();
        }

    });

    function getCible(){

        let ciblePosition = getTankPosition() - 15;

        switch(tankRotation){
            case "forward":
                ciblePosition = getTankPosition() - 15;
                break;
            case "down":
                ciblePosition = getTankPosition() + 15;
                break;
            case "right":
                ciblePosition = getTankPosition() + 1;
                break;
            case "left":
                ciblePosition = getTankPosition() - 1;
                break;
        }

        return ciblePosition;
    }

    function clearMap(){
        while (_GRID.hasChildNodes()) {  
            _GRID.removeChild(_GRID.firstChild);
        }
    }

    _SHOOT_BUTTON.addEventListener("click", function(){

        if(fuel > 0){

            let cibleContent = map[getCible()];
            let ciblePosition = getCible();
    
            switch(cibleContent){
                case 1:
                    cibleContent = 4;
                    fuel--;
                    score -= 10;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    _SCORE_VALUE.textContent = score;
                    fuelBar(cibleContent, "shoot");
                    break;
                case 2:
                    cibleContent = 1;
                    fuel--;
                    score -= 10;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    _SCORE_VALUE.textContent = score;
                    fuelBar(cibleContent, "shoot");
                    break;
                case 3:   
                    cibleContent = 2;
                    fuel--;
                    score -= 10;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    _SCORE_VALUE.textContent = score;
                    fuelBar(cibleContent, "shoot");
                    break;
                case 4:
                    fuel--;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    fuelBar(cibleContent, "shoot");
                    break; 
                case 5:
                    fuel--;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    fuelBar(cibleContent, "shoot");
                    break;
                case 6:
                    fuel--;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    fuelBar(cibleContent, "shoot");
                    break;
                case 7:
                    fuel--;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    fuelBar(cibleContent, "shoot");
                    break;  
                case 8:
                    fuel--;
                    _FUEL_VALUE.textContent = fuel + "/50";
                    fuelBar(cibleContent, "shoot");
                    break;      
            }
            
            map.splice(ciblePosition, 1, cibleContent);
    
            clearMap();
            generateMap();
            getTankRotation();
            
    
        }else{
            gameOver();
        }

    });

    function gameOver(){
        _GAME_OVER.style.display = "flex";
        _GAME_OVER_CONTENT.textContent = "GAME OVER !";
        _DISPLAY_SCORE.textContent = score.toLocaleString();
    }

    function win(){
        _GAME_OVER.style.display = "flex";
        _GAME_OVER_CONTENT.textContent = "WIN !";
        _DISPLAY_SCORE.textContent = score.toLocaleString();
    }

    function fuelBar(cibleContent, action){

        if(cibleContent == 8 && action == "forward"){

            if(fuel === 50){
                fuelbar = 100;
            }else{
                fuelbar = fuelbar + 8;
            }
  
        }else{
            fuelbar = fuelbar - 2;
        }
        
        _FUEL_BAR.style.height = fuelbar + "%";
    }

    _GAME_OVER_BUTTON.addEventListener("click", function(){
        resetGame();
    });

    _RESET_BUTTON.addEventListener("click", function(){
        resetGame();
    });

    function resetGame(){

        map = [];
        tankRotation = "forward";
        tankPosition = 112;
        score = 0;
        fuel = 50;
        fuelbar = 100;

        _SCORE_VALUE.textContent = score;
        _FUEL_VALUE.textContent = fuel + "/50";
        _FUEL_BAR.style.height = "100%";

        clearMap();
        generateNewMap();

        _GAME_OVER.style.display = "none";
    }

}
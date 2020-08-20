/*This funtion is called whenever a user inputs a value
 * it takes three arguments: n the id of the caller object
 * user1, player1's alphabet
 * user2, player2's alphabet
 */
 function did(n,user1,user2){
    //create variable v that counts the number of used tiles
    //variable all that gets all the input elements by their class name
    var v = 0;
    var all = document.getElementsByClassName("inp");
    var t = document.getElementById(n);
    var prevent = Number(document.getElementById("total").innerHTML);
    //Checkpoint Debugger: alert('CallerId: '+n+'\nVar1: '+user1+'\nVar2: '+user2+'\nNew t: '+t.value.toLowerCase());
    //count the number of tiles used and store it in variable v
    for(x = 0;x < all.length;x++){
        if(all[x].value.toLowerCase() != ""){
            v++;
        }
    }
    //check for all input, if they contain the predefined alphabets
    for(x = 0;x < all.length;x++){
        //for input that is not empty
        if(all[x].value.toLowerCase() != ""){
            //Remove value and alert user if an unknown alphabet was found
            if(all[x].value.toLowerCase() != user1.toLowerCase() && all[x].value.toLowerCase() != user2.toLowerCase()){
                all[x].value = '';
                alert('You can only use '+user1.toUpperCase()+' or '+user2.toUpperCase());
                return;
            }
            else{
                //set to uneditable
                all[x].disabled = true;
            }
        }
    }
    //the game not just started
    if(v != 1){
    //check if user played at his right time to play using variable v
    //call currentobj() to get the alphabet of the player2
    //set value to null and disabled if it is not his right time
    if(v%2 == 0 && t.value.toLowerCase() != currentobj(user1.toLowerCase(),user2.toLowerCase())){
        t.value = '';
        t.disabled = false;
        alert('You can\'t play twice,\nSecond player should play now');
        return ;
    }
    else if(v%2 != 0 && t.value.toLowerCase() == currentobj(user1.toLowerCase(),user2.toLowerCase())){
        t.value = '';
        t.disabled = false;
        alert('You can\'t play twice,\nSecond player should play now');
        return ;
    }
    }
    //check if the first player in the previous game did not start the game now
    else {
        if(t.value.toLowerCase() == currentobj(user1.toLowerCase(),user2.toLowerCase())){
            t.value = '';
            t.disabled = false;
            alert('The second player is expected to start the game now');
            return;
        }
    }
    //call score to check if there is an instance of winning
    score(v,user1,user2);
    //if it is versus computer, call the random() for computer to play next
    if(!(Number(document.getElementById("total").innerHTML) == prevent + 1)){
        if(user2.toLowerCase() == '$'||user1.toLowerCase() == '$'){random();}
        score(v,user1,user2);
    }
}
function score(v,user1,user2){
    var all = document.getElementsByClassName("inp");
    var id;
    if(all[0].value.toLowerCase() == all[4].value.toLowerCase() && all[4].value.toLowerCase() == all[8].value.toLowerCase() && all[0].value.toLowerCase() == all[8].value.toLowerCase()){
        //alert('Read me score();\n'+all[0].value.toLowerCase()+'\n'+all[4].value.toLowerCase()+'\n'+all[8].value.toLowerCase());
        clearall(0,4,8,user1,user2);
    }
    else if(all[0].value.toLowerCase() == all[2].value.toLowerCase()&&all[0].value.toLowerCase() == all[1].value.toLowerCase() && all[1].value.toLowerCase() == all[2].value.toLowerCase()){
        clearall(0,1,2,user1,user2);
    }
    else if(all[3].value.toLowerCase() == all[4].value.toLowerCase()&&all[3].value.toLowerCase() == all[5].value.toLowerCase() && all[4].value.toLowerCase() == all[5].value.toLowerCase()){
        clearall(3,4,5,user1,user2);
    }
    else if(all[6].value.toLowerCase() == all[7].value.toLowerCase()&&all[6].value.toLowerCase() == all[8].value.toLowerCase() && all[7].value.toLowerCase() == all[8].value.toLowerCase()){
        clearall(6,7,8,user1,user2);
    }
    else if(all[0].value.toLowerCase() == all[3].value.toLowerCase()&&all[0].value.toLowerCase() == all[6].value.toLowerCase() && all[3].value.toLowerCase() == all[6].value.toLowerCase()){
        clearall(0,3,6,user1,user2);
    }
    else if(all[1].value.toLowerCase() == all[4].value.toLowerCase()&&all[1].value.toLowerCase() == all[7].value.toLowerCase() && all[4].value.toLowerCase() == all[7].value.toLowerCase()){
        clearall(1,4,7,user1,user2);
    }
    else if(all[2].value.toLowerCase() == all[5].value.toLowerCase()&&all[2].value.toLowerCase() == all[8].value.toLowerCase() && all[5].value.toLowerCase() == all[8].value.toLowerCase()){
        clearall(2,5,8,user1,user2);
    }
    else if(all[2].value.toLowerCase() == all[4].value.toLowerCase()&&all[2].value.toLowerCase() == all[6].value.toLowerCase() && all[4].value.toLowerCase() == all[6].value.toLowerCase()){
        clearall(2,4,6,user1,user2);
    }
    else {
        if(v!=9)return;
        var d = document.getElementById("draw").innerHTML;
        var dd = document.getElementById("total").innerHTML;
        document.getElementById("draw").innerHTML = Number(d) + 1;
        document.getElementById("total").innerHTML = Number(dd) + 1;
        restart(0,0,0,user1,user2);
    }
}
function clearall(val1,val2,val3,user1,user2){
    var all = document.getElementsByClassName("inp");
    if(all[val1].value.toLowerCase() == ''||all[val2].value.toLowerCase() == ''||all[val3].value.toLowerCase() == '') /*alert('Not true')*/return;
    //alert('Called clearall() by ('+val1+val2+val3+')');
    var id;
    all[val1].style.backgroundColor = 'red';
    all[val2].style.backgroundColor = 'red';
    all[val3].style.backgroundColor = 'red';
    var dd = document.getElementById("total").innerHTML;
    document.getElementById("total").innerHTML = Number(dd) + 1;
    id = all[val1].value.toLowerCase();
    if(id == user1.toLowerCase())id = 'x';
    else if(id == user2.toLowerCase())id = 'o';
    document.getElementById(id).innerHTML = Number(document.getElementById(id).innerHTML) + 1;
    if(confirm('Do you wish to continue playing?'))restart(val1,val2,val3,user1,user2);
    else return;
}
function restart(val1,val2,val3,user1,user2){
    setTimeout(function(){
    var all = document.getElementsByClassName("inp");
    all[val1].style.backgroundColor = (val1%2)==0?'blue':'white';
    all[val2].style.backgroundColor = (val2%2)==0?'blue':'white';
    all[val3].style.backgroundColor = (val3%2)==0?'blue':'white';
    for(d=0;d<all.length;d++){
        all[d].value = '';
        all[d].disabled = false;
    }
    //alert('Second player now is: '+currentobj(document.getElementById('px').value.toLowerCase(),document.getElementById('po').value.toLowerCase()));
    if(user2.toLowerCase() == '$'||user1.toLowerCase() == '$'){if(currentobj(document.getElementById('px').value.toLowerCase(),document.getElementById('po').value.toLowerCase()) != '$'){random();}}
    },2000);
}
function currentobj(val1,val2){
    currentob = Number(document.getElementById("total").innerHTML);
    //alert(currentob+'\n'+(currentob%2));
    if((currentob % 2) != 0)return val1;
    else return val2;
}
function register(){
    //this registers players' alphabets to hidden input
    //create an array that stores temporarily the players' alphabet
    var user = ['','','']
    //create a string of a-z alphabet
    var accept = 'abcdefghijklmnopqrstuvwxyz';
    //prompt the plyers consecutively for their alphabets and store it into the array
    for(x=0;x<2;x++){
        user[x] = prompt('Player '+(x+1)+' should choose a letter from the alphabets\nType random to play with computer');
        //if user inputs random, change the players name to Computer and represent his variable with $
        if(user[x] == 'random'){user[x] = '$';document.getElementsByTagName('th')[x].innerHTML = 'Computer';continue;}
        //if 
        else if(user[x].length != 1){x = x - 1;alert('Choose only one ALPHABET');continue;}
        else if(accept.indexOf(user[x].toLowerCase()) == -1){x = x - 1;alert('Choose from A-Z of the alphabets');continue;}
        else if(user[0].toLowerCase() == user[1].toLowerCase()){x=x-1;alert('Player 1 already chose this, choose another alphabet.');continue;}
    }
    //alert(accept.indexOf(user[0].toLowerCase())+"\n"+accept.indexOf(user[1].toLowerCase()));
    document.getElementById("px").value = user[0];
    document.getElementById("po").value = user[1];
    if(user[0] == '$'){random();}
}
//computer controller: random()
function random(){
    user1 = document.getElementById('px').value;
    user2 = document.getElementById('po').value;
    var mypos = [];
    all = document.getElementsByClassName('inp');
    var lent = 22;
    var playfirst = '4834024684574024684142';
    var playsecond = '4508462386042120684754';
    var v = 0, act, count = 0;
    for(x = 0;x < all.length;x++){
        if(all[x].value.toLowerCase() != ""){
            v++;
        }
    }
    function rndnum(lnt,arr){
        var i = true;
        var all = document.getElementsByClassName('inp');
        var num;
        while(i == true){
            num = Math.floor(Math.random() * lnt);
            //alert('num is:'+num);
            chk = parseInt(arr.charAt(num));
            if(!(all[chk].value))break;
        }
        return chk;
    }
    if(v < 3){
        //alert('v is:'+v);
        if(v%2 == 0)act = rndnum(lent,playsecond);
        else act = rndnum(lent,playfirst);
    }
    else if(v < 8){
        function checkboard(ada){
            var count = 0;
            var mypos = [];
            for(x = 0;x < all.length;x++){
                if(all[x].value == ada){
                    mypos[count] = x;
                    //alert("mypos is: "+mypos);
                    count++;
                }
            }
            a = mypos.indexOf(0) != -1;
            b = mypos.indexOf(1) != -1;
            c = mypos.indexOf(2) != -1;
            d = mypos.indexOf(3) != -1;
            e = mypos.indexOf(4) != -1;
            f = mypos.indexOf(5) != -1;
            g = mypos.indexOf(6) != -1;
            h = mypos.indexOf(7) != -1;
            i = mypos.indexOf(8) != -1;
            //alert("All: "+a+", "+b+", "+c+", "+d+", "+e+", "+f+", "+g+", "+h+", "+i+".");
            if(a&&b&&!all[2].value)act = 2;
            else if(a&&c&&!all[1].value)act = 1;
            else if(b&&c&&!all[0].value)act = 0;
            else if(d&&e&&!all[5].value)act = 5;
            else if(d&&f&&!all[4].value)act = 4;
            else if(e&&f&&!all[3].value)act = 3;
            else if(g&&h&&!all[8].value)act = 8;
            else if(g&&i&&!all[7].value)act = 7;
            else if(h&&i&&!all[6].value)act = 6;
            else if(a&&d&&!all[6].value)act = 6;
            else if(a&&g&&!all[3].value)act = 3;
            else if(d&&g&&!all[0].value)act = 0;
            else if(b&&e&&!all[7].value)act = 7;
            else if(b&&h&&!all[4].value)act = 4;
            else if(e&&h&&!all[1].value)act = 1;
            else if(c&&f&&!all[8].value)act = 8;
            else if(c&&i&&!all[5].value)act = 5;
            else if(f&&i&&!all[2].value)act = 2;
            else if(a&&e&&!all[8].value)act = 8;
            else if(a&&i&&!all[4].value)act = 4;
            else if(e&&i&&!all[0].value)act = 0;
            else if(c&&e&&!all[6].value)act = 6;
            else if(c&&g&&!all[4].value)act = 4;
            else if(e&&g&&!all[2].value)act = 2;
            else act = 'no place';
        }
        checkboard('$');
        if(act == 'no place'){
            if(user1 != '$')checkboard(user1);
            else if(user2 != '$')checkboard(user2);
            if(act == 'no place')act = rndnum(9,'012345678');
        }
        //alert('act is: '+act);
    }
    else if(v < 10){
        var remain = [];
        for(x=0;x<all.length;x++){
            if(all[x].value == ""){
                remain[count] = x;
                count++;
            }
        }
        act = rndnum(remain.length,remain.join(''));
        //alert(act+", "+remain.join());
    }
    //initialize varible all in local scope
    //genrate a random tile from the tile board
    //check if tile is not occupied: recall random() if occupied
    all[act].value = '$';
    all[act].disabled = true;
    draw = 0;
    for(z=0;z<all.length;z++){
        if(all[z].value)draw++;
    }
    if(draw == 9){
        var d = document.getElementById("draw").innerHTML;
        var dd = document.getElementById("total").innerHTML;
        document.getElementById("draw").innerHTML = Number(d) + 1;
        document.getElementById("total").innerHTML = Number(dd) + 1;
        restart(0,0,0,user1,user2);
    }
}
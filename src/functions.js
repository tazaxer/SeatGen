function randomizeArray(array) {
    let arrIndex = array.length;

    while (0 !== arrIndex) { 
        let randomIndex = Math.floor(Math.random() * arrIndex);

        arrIndex -= 1;

        let tmp = array[arrIndex];

        array[arrIndex] = array[randomIndex];
        array[randomIndex] = tmp;
    }

    return array;
}

function groupStudents(paidia) {
    let groups = [];

    for (let i = 0; i < paidia.length; i++) {
        if (paidia.at(i+1) != null) {
            const gp = [paidia.at(i), paidia.at(i+1)];
            groups[i] = gp;
            i++;
        }
        else {
            const gpx = [paidia.at(i)];
            groups[i] = gpx;
        }
        
    }
    
    return groups;
}

function mapDesks(gpList, dc) {
    let deskMap = new Map();

    gpList.every(element => {
        if (dc === 0) {
            console.log("Desks are not enough for everyone!");
            return false;
        }
        deskMap.set(dc, element);
        dc -=1;
            return true
        
    });

    return Array.from(deskMap).reverse();
}

function calcTh(all, pd) {
    let temp = all;
    let th = Math.floor(pd/2) + pd%2;
    let remainder = temp - th;
    if (remainder < 0) {
        th = temp;
    }
    
    return th;
}

function calcRm(all, pd) {
    let temp = all;
    let th = Math.floor(pd/2) + pd%2;
    let remainder = temp - th;
    if (remainder < 0) {
        th = temp;
    }
    
    return remainder;
}

function createElements(th) {
    let columns = Math.floor(th/2) + th%2;
    let left = th-columns;
    
    for (i = 1; i < (th+1); i++) {
        document.getElementById("out_desks").innerHTML +=
                ('<div id="cl_' + i + '" class="columns"><div id="' + i + '" class="column">' + "Thranio " + i + '</div></div>');
            document.getElementById("cl_" + i).innerHTML +=
                ('<div id="' + (i + 1) + '" class="column">' + "Thranio " + (i + 1) + '</div></div>');
            i++;
    }

    if (left == 1)  {
        let index = columns + left;
        document.getElementById("out_desks").innerHTML +=
        ('<div class="columns"><div id="' + index +'" class="column">' + "Thranio " + index + '</div><div class="column"></div></div>');
    }
}   

function logResult(map, remainder) {
    map.forEach(([key, value]) => {
        console.log("Thranio noumero " + key + ": " + value);

        document.getElementById(key).innerHTML += ("<br /> " + value);
    })

    if (remainder !== 0 && remainder > 0) {
        console.log("There " + ((remainder === 1) ? "is " : "are ") + remainder + ((remainder === 1) ? " desk" : " desks") +" left over!");
    }

    if (remainder < 0) {
        console.log("You need " + Math.abs(remainder) + " more " + ((Math.abs(remainder) === 1) ? "desk" : "desks") + "!");
    }
}



function start(thrania, paidia) {
    //Randomize the list of students, twice
    const rK = randomizeArray(paidia);
    randomizeArray(rK);

    //Group them to sets
    let gp = groupStudents(rK);

    //Find needed and remaining desks
    let th = calcTh(thrania, paidia.length);
    let rm = calcRm(thrania, paidia.length);

    //Map them
    let mp = mapDesks(gp, th);

    //Print
    createElements(th);
    logResult(mp, rm);
}

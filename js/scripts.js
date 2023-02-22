//on level-up
//level 0 is default
//level 1 :
//document.getElementById("phone").style.backgroundImage = "url('../images/s-l500.png')";
//document.getElementById("computer").style.backgroundImage = "url('../images/pc_lvl1.png')";
//document.getElementById("computer").style.backgroundImage = "url('../images/pc_lvl2.png')";
//document.getElementById("computer").style.backgroundImage = "url('../images/pc_lvl3.png')";
//document.getElementById("table").style.backgroundImage = "url('../images/modern_table.png')";
//document.getElementById("phone").style.backgroundImage = "url('../images/iPhone14ProMax.png')";
setTimeout(function() {
    document.getElementById("video").style.display = 'none';
    new Audio('../music/Musique libre de droits La Grande Table - Delnica.mp3').play();
},5000)

let username = "Player"
var data
var numbers = []
var randomQuestionsList = []
let playerData = {name: "Player", reput: 0, max: 100, level: 0, avatar: 0}
var currentQuestion = ""

document.addEventListener("keydown", function(e) {
    if (e.code == "KeyD") {
        console.log(data)
    }
})

const object = {
    computer: [
        {bottom: 378, left:992, texture:"url('../images/pc_lvl0.png')", width:290, height: 215,},
        {bottom: 366, left:980, texture:"url('../images/pc_lvl1.png')", width:290, height: 215,},
        {bottom: 382, left:966, texture:"url('../images/pc_lvl2.png')", width:300, height: 215,},
        {bottom: 390, left:972, texture:"url('../images/pc_lvl3.png')", width:310, height: 215,},
    ],
    table: [
        {bottom: 41, left:565, texture:"url('../images/table_bois.png')", width:785, height: 870,},
        {bottom: 90, left:565, texture:"url('../images/modern_table.png')", width:835, height: 435,},
    ],
    phone: [
        {bottom: 376, left:787, texture:"url('../images/nokia-3310-noir.jpeg')", width:108, height: 120,},
        {bottom: 390, left:765, texture:"url('../images/s-l500.png')", width:108, height: 110,},
        {bottom: 390, left:787, texture:"url('../images/apple_iph7.png')", width:81, height: 110,},
        {bottom: 390, left:787, texture:"url('../images/iPhone14ProMax.png')", width:81, height: 110,},
    ],
    plant: [
        {bottom: 200, left:40, texture:"url('../images/plant_lvl0.png')", width:112, height: 163,},
        {bottom: 200, left:40, texture:"url('../images/plant_lvl1.png')", width:112, height: 163,},
        {bottom: 200, left:40, texture:"url('../images/plant_lvl2.png')", width:112, height: 197,},
        {bottom: 200, left:40, texture:"url('../images/plant_lvl3.png')", width:112, height: 247,},
        {bottom: 200, left:40, texture:"url('../images/plant_lvl4.png')", width:112, height: 287,},
    ]
}
//object.computer[0]
for (let i = 0; i < document.querySelectorAll('.avatar').length; i++) {
    document.querySelectorAll('.avatar')[i].addEventListener('click', function() {
        console.log("You chose avatar number :", username+1)
        //username = (document.getElementById("username").value != "")? document.getElementById("username").value : "Player";
        //document.getElementById("profileName").innerText = username;
        playerData.name = (document.getElementById("username").value != "")? document.getElementById("username").value : "Player";
        document.getElementById("profileName").innerText = playerData.name;
        removeSelection(i)
        startGame()
    })
}

function removeSelection(i) {
    document.getElementById('profilePicture').style.backgroundImage = "url(\"../images/avatar" + (i+1) + ".png\")";
    document.getElementById('profilePicture').style.backgroundSize = "cover";
    document.getElementById('avatarSelection').style.display = "none";
}

fetch('../js/questions.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json['Niveau 0']);
        data = json;
        //console.log(getRandomQuestionList(data, 2))
    })
    .catch((error) => {
        console.error('Error fetching questions:', error);
    });

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomQuestion(data, max) {
    return data[getRandomInt(max)];
}

/*
function getRandomQuestionList(data, max) {
    for (let i = 0; i < max; i++) {
        numbers.push(i);
    }
    numbers = shuffle(numbers);
    for (let j = 0; j < numbers.length; j++) {
        randomQuestionsList.push(data[numbers[j]]);
    }
    numbers = [];
    return questionsList;
}
*/

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

var choices = 0;
var hasBeenClicked = false;
// Start quizz game, prepare each interaction and display questions
function startGame() {
    refreshPlayerData()
    getRandomQuestionListByLevel(playerData.level)
    console.log(question)
    displayQuestion(question)
    assignObjects(0);
    for (let i = 0; i < choices; i++) {
        document.querySelectorAll('.answer')[i].addEventListener('click', function() {
            console.log(1)
            if (!hasBeenClicked) {
                console.log(2)
                verifyAnswer(i+1)
                hasBeenClicked = true;
            }
        });
    }
}

// Display updated player's information on the screen
function refreshPlayerData() {
    if (playerData.reput >= playerData.max && playerData.level != 4) {
        //gainContract();
        levelUp();
    } else if (playerData.reput >= playerData.max && playerData.level == 4) {
        end();
    }
    document.getElementById("reputation").style.background = "linear-gradient(35deg, rgba(250,0,255,1) "+playerData.reput+"%, rgba(126,0,0,0) "+playerData.reput+"%)"
    //document.getElementById("reputation").innerText = "Réputation: "+ playerData.reput + "/100"
    /*let contract
    switch (playerData.level) {
        default : break;
        case 1: break;
        case 2: break;
        case 3: break;
        case 4: break;
    }
    document.getElementById("profileContract").innerText = contract*/
}

function displayQuestion() {
    console.log(randomQuestionsList)
    let questionData = randomQuestionsList[getRandomInt(randomQuestionsList.length)];
    currentQuestion = questionData.Question;
    document.getElementById("questionText").innerText = questionData.Question;
    for (let i = 1; i <= 4; i++) {
        document.querySelectorAll('.answer')[i-1].style.display = 'block';
        if (questionData['Choix '+i] != undefined) {
            document.getElementById("choice"+i).innerText = questionData['Choix '+i];
            choices++;
        } else {
            document.querySelectorAll('.answer')[i-1].style.display = 'none';
        }
    }
    answer = questionData['Réponse'];
    for (let i = 1; i <= 4; i++) {
        if (answer == questionData['Choix '+i]) {
            answer = i;
            break
        }
    }
}

function verifyAnswer(currentChoice) {
    if (currentChoice == answer) {
        playerData.reput += 20;
        for (let i = 0; i < randomQuestionsList.length; i++) {
            if (randomQuestionsList[i].Question == currentQuestion) {
                randomQuestionsList.splice(i, 1);
            }
        }
    } else {
        if (playerData.reput >= 10) {
            playerData.reput -= 10;
        }
    }
    refreshPlayerData();
    checkAnswer();
    setTimeout(() => {
        displayQuestion();
        refreshColors();
        hasBeenClicked = false;
        for (let i = 0; i < choices; i++) {
            document.querySelectorAll('.answer')[i].addEventListener('click', function() {
                if (!hasBeenClicked) {
                    verifyAnswer(i+1)
                    hasBeenClicked = true;
                }
            });
        }
    }, 3000)
}

// Fetch a question by a given difficulty level
function getRandomQuestionByLevel(level) {
    let restrictedList = []
    for (let k = 0; k < 13; k++) {
        restrictedList.push(data["Niveau "+level][k])
    }
    return restrictedList[getRandomInt(restrictedList.length)]
}

function getRandomQuestionListByLevel(level) {
    randomQuestionsList = []
    for (let k = 0; k < 13; k++) {
        randomQuestionsList.push(data["Niveau "+level][k])
    }
    return randomQuestionsList
}


function checkAnswer() {
    for (let i = 0; i < 4; i++) {
        if (i+1 == answer) {
            document.querySelectorAll('.answer')[i].style.background = 'green';
        } else {
            document.querySelectorAll('.answer')[i].style.background = 'red';
        }
    }
}

function refreshColors() {
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.answer')[i].style.background = '#00A99D';
    }
}

var currentAvatar = 1
var answer = 0

var $caroussel = $('#caroussel');
var faces = $caroussel.find('figure');
var panelSize = faces.outerWidth(true);
var numberOfPanels = faces.length;
var ty = 360 / numberOfPanels;
var rad = Math.round( ( panelSize / 2) / Math.tan( Math.PI / numberOfPanels ) );
var y = 0;

faces.each(function(i,e){
  $(e).css({'transform' : 'rotateY('+(i*ty)+'deg) translateZ('+rad+'px)'});
});

$caroussel.click(function(){
	y += ty*-1;
    if (currentAvatar >= 10) {
        currentAvatar -= 10;
    }
    currentAvatar++;
    //console.log(currentAvatar)
	$caroussel.css({
		'transform': 'translateZ(-'+rad+'px) rotateY(' + y + 'deg)'
	})
});

$caroussel.css({
		'transform': 'translateZ(-'+panelSize+'px)'
	})

document.getElementById("selectAvatar").addEventListener('click', function() {
    playerData.avatar = currentAvatar;
    playerData.name = (document.getElementById("usernameSelect").value != "")? document.getElementById("usernameSelect").value : "Player";
    document.getElementById("profileName").innerText = playerData.name;
    document.getElementById('profilePicture').style.backgroundImage = "url(\"../images/avatar" + (currentAvatar) + ".png\")";
    document.getElementById('profilePicture').style.backgroundSize = "cover";
    document.querySelector('.container').style.display = "none";
    startGame();
})

function levelUp() {
    if (playerData.level != 4) {
        playerData.level += 1;
        playerData.reput = 0;
        document.getElementById('level').innerText = "Niveau "+playerData.level;
        document.getElementById('levelUpWindow').style.backgroundImage = "url(\"../images/levelUp" + (playerData.level) + ".png\")";
        document.getElementById('levelUpWindow').style.display = 'block';
    } else {
        document.getElementById('reputation').style.animation = 'rainbow 1s infinite';
    }
    getRandomQuestionListByLevel(playerData.level)
    assignObjects(playerData.level);
}

function assignObjects(level) {
    document.getElementById('level').style.backgroundImage = "url(\"../images/niveau" + (level) + ".png\")";
    if (level == 2) {
        document.getElementById('fakePlant').style.display = 'block';
    } else if (level == 3) {
        document.getElementById('bigPainting').style.display = 'block';
        document.getElementById('fakePlant').style.display = 'none';
        document.getElementById('fakePlant2').style.display = 'block';
    } else if (level == 4) {
        document.getElementById('bigPainting').style.display = 'none';
        document.getElementById('paintingSet').style.display = 'block';
        document.getElementById('statue').style.display = 'block';
        document.getElementById('vases').style.display = 'block';
    }
    level -= 1;
    let plant = document.getElementById('plant');
    let plantElements = object.plant[level+1];
    plant.style.bottom = plantElements.bottom;
    plant.style.left = plantElements.left;
    plant.style.backgroundImage = plantElements.texture;
    plant.style.width = plantElements.width;
    plant.style.height = plantElements.height;
    if (level != -1) {
        let computer = document.getElementById('computer');
        let computerElements = object.computer[level];
        computer.style.bottom = computerElements.bottom;
        computer.style.left = computerElements.left;
        computer.style.backgroundImage = computerElements.texture;
        computer.style.width = computerElements.width;
        computer.style.height = computerElements.height;
        let phone = document.getElementById('phone');
        let phoneElements = object.phone[level];
        phone.style.bottom = phoneElements.bottom;
        phone.style.left = phoneElements.left;
        phone.style.backgroundImage = phoneElements.texture;
        phone.style.width = phoneElements.width;
        phone.style.height = phoneElements.height;
    }
    if (level == 3) {
        let table = document.getElementById('table');
        let tableElements = object.table[1];
        table.style.bottom = tableElements.bottom;
        table.style.left = tableElements.left;
        table.style.backgroundImage = tableElements.texture;
        table.style.width = tableElements.width;
        table.style.height = tableElements.height;
    }

}

//{bottom: 378, left:992, texture:"url('../images/pc_lvl0.png')", width:290, height: 215,},

document.getElementById('eyeIcon').addEventListener('click', function() {
    if (document.getElementById('questions').style.display == 'block') {
        document.getElementById('questions').style.display = 'none';
    } else {
        document.getElementById('questions').style.display = 'block';
        for (let i = 0; i < choices; i++) {
            document.querySelectorAll('.answer')[i].addEventListener('click', function() {
                if (!hasBeenClicked) {
                    verifyAnswer(i+1)
                    hasBeenClicked = true;
                }
            });
        }
    }
})

document.getElementById('levelUpWindow').addEventListener('click', function() {
    document.getElementById('levelUpWindow').style.display = 'none';
})

function end() {
    document.getElementById('videoEnd').style.display = 'block';
    document.getElementById('videoEnd').play();
    setTimeout(function() {
        document.getElementById('videoEnd').style.display = 'none';
        document.querySelector('main').innerHTML = "";
        document.body.style.background = 'black';
        document.getElementById('replayButton').style.display = 'block';
    },5000)
}

document.getElementById('replayButton').addEventListener('click', function() {
    location.reload();
})
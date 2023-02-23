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
            document.getElementById('circle'+i).style.display = 'block';
            choices++;
        } else {
            document.querySelectorAll('.answer')[i-1].style.display = 'none';
            document.getElementById('circle'+i).style.display = 'none';
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
    displayQuestion();
    assignObjects(playerData.level);
}

function assignObjects(level) {
    document.getElementById('level').style.backgroundImage = "url(\"../images/niveau" + (level) + ".png\")";
    if (level == 0) {
        unblur("selectTable1");
        unblur("selectChair1");
        document.getElementById("selectTable1").style.backgroundColor = "green";
        document.getElementById("selectChair1").style.backgroundColor = "green";
    } else if (level == 1) {
        document.getElementById('phone').style.display = 'flex';
        unblur("selectPhone1");
        unblur("selectComputer1");
        document.getElementById("selectPhone1").style.backgroundColor = "green";
        document.getElementById("selectComputer1").style.backgroundColor = "green";
    } else if (level == 2) {
        document.getElementById('fakePlant').style.display = 'block';
        unblur("selectDecoration1");
        unblur("selectPhone2");
        unblur("selectComputer2");
        document.getElementById("selectDecoration1").style.backgroundColor = "green";
        document.getElementById("selectPhone2").style.backgroundColor = "green";
        document.getElementById("selectComputer2").style.backgroundColor = "green";
        document.getElementById("selectPhone1").classList.remove('active');
        document.getElementById("selectPhone1").style.backgroundColor = "grey";
        document.getElementById("selectComputer1").classList.remove('active');
        document.getElementById("selectComputer1").style.backgroundColor = "grey";
    } else if (level == 3) {
        document.getElementById('bigPainting').style.display = 'block';
        document.getElementById('fakePlant').style.display = 'none';
        document.getElementById('fakePlant2').style.display = 'block';
        unblur("selectDecoration2");
        unblur("selectDecoration3");
        unblur("selectPhone3");
        unblur("selectComputer3");
        document.getElementById("selectDecoration2").style.backgroundColor = "green";
        document.getElementById("selectDecoration3").style.backgroundColor = "green";
        document.getElementById("selectPhone3").style.backgroundColor = "green";
        document.getElementById("selectComputer3").style.backgroundColor = "green";
        document.getElementById("selectPhone2").classList.remove('active');
        document.getElementById("selectPhone2").style.backgroundColor = "grey";
        document.getElementById("selectComputer2").classList.remove('active');
        document.getElementById("selectComputer2").style.backgroundColor = "grey";
    } else if (level == 4) {
        document.getElementById('bigPainting').style.display = 'none';
        document.getElementById('paintingSet').style.display = 'block';
        document.getElementById('statue').style.display = 'block';
        document.getElementById('vases').style.display = 'block';
        unblur("selectDecoration4");
        unblur("selectDecoration5");
        unblur("selectDecoration6");
        unblur("selectPhone4");
        unblur("selectComputer4");
        unblur("selectTable2");
        document.getElementById("selectDecoration4").style.backgroundColor = "green";
        document.getElementById("selectDecoration5").style.backgroundColor = "green";
        document.getElementById("selectDecoration6").style.backgroundColor = "green";
        document.getElementById("selectPhone4").style.backgroundColor = "green";
        document.getElementById("selectComputer4").style.backgroundColor = "green";
        document.getElementById("selectTable2").style.backgroundColor = "green";
        document.getElementById("selectDecoration3").classList.remove('active');
        document.getElementById("selectDecoration3").style.backgroundColor = "grey";
        document.getElementById("selectPhone3").classList.remove('active');
        document.getElementById("selectPhone3").style.backgroundColor = "grey";
        document.getElementById("selectComputer3").classList.remove('active');
        document.getElementById("selectComputer3").style.backgroundColor = "grey";
        document.getElementById("selectTable1").classList.remove('active');
        document.getElementById("selectTable1").style.backgroundColor = "grey";
        document.getElementById("certificate").style.display = "block";
        document.getElementById("profileContract").innerText = "Expert SEO";
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

document.getElementById('catalogueButton').addEventListener('click', function() {
    if (document.getElementById('catalogue').style.display != 'flex') {
        document.getElementById('catalogue').style.display = 'flex';
    } else {
        document.getElementById('catalogue').style.display = 'none';
    }
})

function unblur(item) {
    document.getElementById(item).style.filter = 'blur(0px)';
    document.getElementById(item).classList.add('unlocked');
    document.getElementById(item).classList.add('active');
}

document.getElementById('selectChair1').addEventListener('click', function() {
    if (document.getElementById('selectChair1').classList.contains('unlocked') && !document.getElementById('selectChair1').classList.contains('active')) {
        document.getElementById('chair').style.display = 'flex';
        document.getElementById('selectChair1').style.backgroundColor = 'green';
        document.getElementById('selectChair1').classList.add('active');
    } else if (document.getElementById('selectChair1').classList.contains('active')) {
        document.getElementById('chair').style.display = 'none';
        document.getElementById('selectChair1').style.backgroundColor = 'grey';
        document.getElementById('selectChair1').classList.remove('active');
    }
})

document.getElementById('selectPhone1').addEventListener('click', function() {
    if (document.getElementById('selectPhone1').classList.contains('unlocked') && !document.getElementById('selectPhone1').classList.contains('active')) {
        document.getElementById('phone').style.display = 'flex';
        document.getElementById('selectPhone1').style.backgroundColor = 'green';
        document.getElementById('selectPhone2').style.backgroundColor = 'grey';
        document.getElementById('selectPhone3').style.backgroundColor = 'grey';
        document.getElementById('selectPhone4').style.backgroundColor = 'grey';
        let phone = document.getElementById('phone');
        let phoneElements = object.phone[0];
        phone.style.bottom = phoneElements.bottom;
        phone.style.left = phoneElements.left;
        phone.style.backgroundImage = phoneElements.texture;
        phone.style.width = phoneElements.width;
        phone.style.height = phoneElements.height;
        document.getElementById('selectPhone1').classList.add('active');
        document.getElementById('selectPhone2').classList.remove('active');
        document.getElementById('selectPhone3').classList.remove('active');
        document.getElementById('selectPhone4').classList.remove('active');
    } else if (document.getElementById('selectPhone1').classList.contains('active')) {
        document.getElementById('phone').style.display = 'none';
        document.getElementById('selectPhone1').style.backgroundColor = 'grey';
        document.getElementById('selectPhone1').classList.remove('active');
    }
})

document.getElementById('selectPhone2').addEventListener('click', function() {
    if (document.getElementById('selectPhone2').classList.contains('unlocked') && !document.getElementById('selectPhone2').classList.contains('active')) {
        document.getElementById('phone').style.display = 'flex';
        document.getElementById('selectPhone1').style.backgroundColor = 'grey';
        document.getElementById('selectPhone2').style.backgroundColor = 'green';
        document.getElementById('selectPhone3').style.backgroundColor = 'grey';
        document.getElementById('selectPhone4').style.backgroundColor = 'grey';
        let phone = document.getElementById('phone');
        let phoneElements = object.phone[1];
        phone.style.bottom = phoneElements.bottom;
        phone.style.left = phoneElements.left;
        phone.style.backgroundImage = phoneElements.texture;
        phone.style.width = phoneElements.width;
        phone.style.height = phoneElements.height;
        document.getElementById('selectPhone1').classList.remove('active');
        document.getElementById('selectPhone2').classList.add('active');
        document.getElementById('selectPhone3').classList.remove('active');
        document.getElementById('selectPhone4').classList.remove('active');
    } else if (document.getElementById('selectPhone2').classList.contains('active')) {
        document.getElementById('phone').style.display = 'none';
        document.getElementById('selectPhone2').style.backgroundColor = 'grey';
        document.getElementById('selectPhone2').classList.remove('active');
    }
})

document.getElementById('selectPhone3').addEventListener('click', function() {
    if (document.getElementById('selectPhone3').classList.contains('unlocked') && !document.getElementById('selectPhone3').classList.contains('active')) {
        document.getElementById('phone').style.display = 'flex';
        document.getElementById('selectPhone1').style.backgroundColor = 'grey';
        document.getElementById('selectPhone2').style.backgroundColor = 'grey';
        document.getElementById('selectPhone3').style.backgroundColor = 'green';
        document.getElementById('selectPhone4').style.backgroundColor = 'grey';
        let phone = document.getElementById('phone');
        let phoneElements = object.phone[2];
        phone.style.bottom = phoneElements.bottom;
        phone.style.left = phoneElements.left;
        phone.style.backgroundImage = phoneElements.texture;
        phone.style.width = phoneElements.width;
        phone.style.height = phoneElements.height;
        document.getElementById('selectPhone1').classList.remove('active');
        document.getElementById('selectPhone2').classList.remove('active');
        document.getElementById('selectPhone3').classList.add('active');
        document.getElementById('selectPhone4').classList.remove('active');
    } else if (document.getElementById('selectPhone3').classList.contains('active')) {
        document.getElementById('phone').style.display = 'none';
        document.getElementById('selectPhone3').style.backgroundColor = 'grey';
        document.getElementById('selectPhone3').classList.remove('active');
    }
})

document.getElementById('selectPhone4').addEventListener('click', function() {
    if (document.getElementById('selectPhone4').classList.contains('unlocked') && !document.getElementById('selectPhone4').classList.contains('active')) {
        document.getElementById('phone').style.display = 'flex';
        document.getElementById('selectPhone1').style.backgroundColor = 'grey';
        document.getElementById('selectPhone2').style.backgroundColor = 'grey';
        document.getElementById('selectPhone3').style.backgroundColor = 'grey';
        document.getElementById('selectPhone4').style.backgroundColor = 'green';
        let phone = document.getElementById('phone');
        let phoneElements = object.phone[3];
        phone.style.bottom = phoneElements.bottom;
        phone.style.left = phoneElements.left;
        phone.style.backgroundImage = phoneElements.texture;
        phone.style.width = phoneElements.width;
        phone.style.height = phoneElements.height;
        document.getElementById('selectPhone1').classList.remove('active');
        document.getElementById('selectPhone2').classList.remove('active');
        document.getElementById('selectPhone3').classList.remove('active');
        document.getElementById('selectPhone4').classList.add('active');
    } else if (document.getElementById('selectPhone4').classList.contains('active')) {
        document.getElementById('phone').style.display = 'none';
        document.getElementById('selectPhone4').style.backgroundColor = 'grey';
        document.getElementById('selectPhone4').classList.remove('active');
    }
})

document.getElementById('selectComputer1').addEventListener('click', function() {
    if (document.getElementById('selectComputer1').classList.contains('unlocked') && !document.getElementById('selectComputer1').classList.contains('active')) {
        document.getElementById('computer').style.display = 'flex';
        document.getElementById('selectComputer1').style.backgroundColor = 'green';
        document.getElementById('selectComputer2').style.backgroundColor = 'grey';
        document.getElementById('selectComputer3').style.backgroundColor = 'grey';
        document.getElementById('selectComputer4').style.backgroundColor = 'grey';
        let computer = document.getElementById('computer');
        let computerElements = object.computer[0];
        computer.style.bottom = computerElements.bottom;
        computer.style.left = computerElements.left;
        computer.style.backgroundImage = computerElements.texture;
        computer.style.width = computerElements.width;
        computer.style.height = computerElements.height;
        document.getElementById('selectComputer1').classList.add('active');
        document.getElementById('selectComputer2').classList.remove('active');
        document.getElementById('selectComputer3').classList.remove('active');
        document.getElementById('selectComputer4').classList.remove('active');
    } else if (document.getElementById('selectComputer1').classList.contains('active')) {
        document.getElementById('computer').style.display = 'none';
        document.getElementById('selectComputer1').style.backgroundColor = 'grey';
        document.getElementById('selectComputer1').classList.remove('active');
    }
})

document.getElementById('selectComputer2').addEventListener('click', function() {
    if (document.getElementById('selectComputer2').classList.contains('unlocked') && !document.getElementById('selectComputer2').classList.contains('active')) {
        document.getElementById('computer').style.display = 'flex';
        document.getElementById('selectComputer1').style.backgroundColor = 'grey';
        document.getElementById('selectComputer2').style.backgroundColor = 'green';
        document.getElementById('selectComputer3').style.backgroundColor = 'grey';
        document.getElementById('selectComputer4').style.backgroundColor = 'grey';
        let computer = document.getElementById('computer');
        let computerElements = object.computer[1];
        computer.style.bottom = computerElements.bottom;
        computer.style.left = computerElements.left;
        computer.style.backgroundImage = computerElements.texture;
        computer.style.width = computerElements.width;
        computer.style.height = computerElements.height;
        document.getElementById('selectComputer1').classList.remove('active');
        document.getElementById('selectComputer2').classList.add('active');
        document.getElementById('selectComputer3').classList.remove('active');
        document.getElementById('selectComputer4').classList.remove('active');
    } else if (document.getElementById('selectComputer2').classList.contains('active')) {
        document.getElementById('computer').style.display = 'none';
        document.getElementById('selectComputer2').style.backgroundColor = 'grey';
        document.getElementById('selectComputer2').classList.remove('active');
    }
})

document.getElementById('selectComputer3').addEventListener('click', function() {
    if (document.getElementById('selectComputer3').classList.contains('unlocked') && !document.getElementById('selectComputer3').classList.contains('active')) {
        document.getElementById('computer').style.display = 'flex';
        document.getElementById('selectComputer1').style.backgroundColor = 'grey';
        document.getElementById('selectComputer2').style.backgroundColor = 'grey';
        document.getElementById('selectComputer3').style.backgroundColor = 'green';
        document.getElementById('selectComputer4').style.backgroundColor = 'grey';
        let computer = document.getElementById('computer');
        let computerElements = object.computer[2];
        computer.style.bottom = computerElements.bottom;
        computer.style.left = computerElements.left;
        computer.style.backgroundImage = computerElements.texture;
        computer.style.width = computerElements.width;
        computer.style.height = computerElements.height;
        document.getElementById('selectComputer1').classList.remove('active');
        document.getElementById('selectComputer2').classList.remove('active');
        document.getElementById('selectComputer3').classList.add('active');
        document.getElementById('selectComputer4').classList.remove('active');
    } else if (document.getElementById('selectComputer3').classList.contains('active')) {
        document.getElementById('computer').style.display = 'none';
        document.getElementById('selectComputer3').style.backgroundColor = 'grey';
        document.getElementById('selectComputer3').classList.remove('active');
    }
})

document.getElementById('selectComputer4').addEventListener('click', function() {
    if (document.getElementById('selectComputer4').classList.contains('unlocked') && !document.getElementById('selectComputer4').classList.contains('active')) {
        document.getElementById('computer').style.display = 'flex';
        document.getElementById('selectComputer1').style.backgroundColor = 'grey';
        document.getElementById('selectComputer2').style.backgroundColor = 'grey';
        document.getElementById('selectComputer3').style.backgroundColor = 'grey';
        document.getElementById('selectComputer4').style.backgroundColor = 'green';
        let computer = document.getElementById('computer');
        let computerElements = object.computer[3];
        computer.style.bottom = computerElements.bottom;
        computer.style.left = computerElements.left;
        computer.style.backgroundImage = computerElements.texture;
        computer.style.width = computerElements.width;
        computer.style.height = computerElements.height;
        document.getElementById('selectComputer1').classList.remove('active');
        document.getElementById('selectComputer2').classList.remove('active');
        document.getElementById('selectComputer3').classList.remove('active');
        document.getElementById('selectComputer4').classList.add('active');
    } else if (document.getElementById('selectComputer4').classList.contains('active')) {
        document.getElementById('computer').style.display = 'none';
        document.getElementById('selectComputer4').style.backgroundColor = 'grey';
        document.getElementById('selectComputer4').classList.remove('active');
    }
})

document.getElementById('selectTable1').addEventListener('click', function() {
    if (document.getElementById('selectTable1').classList.contains('unlocked') && !document.getElementById('selectTable1').classList.contains('active')) {
        document.getElementById('table').style.display = 'flex';
        document.getElementById('selectTable1').style.backgroundColor = 'green';
        document.getElementById('selectTable2').style.backgroundColor = 'grey';
        let table = document.getElementById('table');
        let tableElements = object.table[0];
        table.style.bottom = tableElements.bottom;
        table.style.left = tableElements.left;
        table.style.backgroundImage = tableElements.texture;
        table.style.width = tableElements.width;
        table.style.height = tableElements.height;
        document.getElementById('selectTable1').classList.add('active');
        document.getElementById('selectTable2').classList.remove('active');
    }
})

document.getElementById('selectTable2').addEventListener('click', function() {
    if (document.getElementById('selectTable2').classList.contains('unlocked') && !document.getElementById('selectTable2').classList.contains('active')) {
        document.getElementById('table').style.display = 'flex';
        document.getElementById('selectTable1').style.backgroundColor = 'grey';
        document.getElementById('selectTable2').style.backgroundColor = 'green';
        let table = document.getElementById('table');
        let tableElements = object.table[1];
        table.style.bottom = tableElements.bottom;
        table.style.left = tableElements.left;
        table.style.backgroundImage = tableElements.texture;
        table.style.width = tableElements.width;
        table.style.height = tableElements.height;
        document.getElementById('selectTable1').classList.remove('active');
        document.getElementById('selectTable2').classList.add('active');
    }
})

document.getElementById('selectDecoration1').addEventListener('click', function() {
    if (document.getElementById('selectDecoration1').classList.contains('unlocked') && !document.getElementById('selectDecoration1').classList.contains('active')) {
        document.getElementById('fakePlant').style.display = 'flex';
        document.getElementById('selectDecoration1').style.backgroundColor = 'green';
        document.getElementById('selectDecoration1').classList.add('active');
    } else if (document.getElementById('selectDecoration1').classList.contains('active')) {
        document.getElementById('fakePlant').style.display = 'none';
        document.getElementById('selectDecoration1').style.backgroundColor = 'grey';
        document.getElementById('selectDecoration1').classList.remove('active');
    }
})

document.getElementById('selectDecoration2').addEventListener('click', function() {
    if (document.getElementById('selectDecoration2').classList.contains('unlocked') && !document.getElementById('selectDecoration2').classList.contains('active')) {
        document.getElementById('fakePlant2').style.display = 'flex';
        document.getElementById('selectDecoration2').style.backgroundColor = 'green';
        document.getElementById('selectDecoration2').classList.add('active');
    } else if (document.getElementById('selectDecoration2').classList.contains('active')) {
        document.getElementById('fakePlant2').style.display = 'none';
        document.getElementById('selectDecoration2').style.backgroundColor = 'grey';
        document.getElementById('selectDecoration2').classList.remove('active');
    }
})

document.getElementById('selectDecoration3').addEventListener('click', function() {
    if (document.getElementById('bigPainting').style.display != 'flex' && document.getElementById('selectDecoration3').classList.contains('unlocked')) {
        document.getElementById('paintingSet').style.display = 'none';
        document.getElementById('bigPainting').style.display = 'flex';
        document.getElementById('selectDecoration3').style.backgroundColor = 'green';
        document.getElementById('selectDecoration4').style.backgroundColor = 'grey';
    } else {
        document.getElementById('bigPainting').style.display = 'none';
        document.getElementById('selectDecoration3').style.backgroundColor = 'grey';
    }
})

document.getElementById('selectDecoration4').addEventListener('click', function() {
    if (document.getElementById('paintingSet').style.display != 'flex' && document.getElementById('selectDecoration4').classList.contains('unlocked')) {
        document.getElementById('bigPainting').style.display = 'none';
        document.getElementById('paintingSet').style.display = 'flex';
        document.getElementById('selectDecoration3').style.backgroundColor = 'grey';
        document.getElementById('selectDecoration4').style.backgroundColor = 'green';
    } else {
        document.getElementById('paintingSet').style.display = 'none';
        document.getElementById('selectDecoration4').style.backgroundColor = 'grey';
    }
})

document.getElementById('selectDecoration5').addEventListener('click', function() {
    if (document.getElementById('selectDecoration5').classList.contains('unlocked') && !document.getElementById('selectDecoration5').classList.contains('active')) {
        document.getElementById('statue').style.display = 'flex';
        document.getElementById('selectDecoration5').style.backgroundColor = 'green';
        document.getElementById('selectDecoration5').classList.add('active');
    } else if (document.getElementById('selectDecoration5').classList.contains('active')) {
        document.getElementById('statue').style.display = 'none';
        document.getElementById('selectDecoration5').style.backgroundColor = 'grey';
        document.getElementById('selectDecoration5').classList.remove('active');
    }
})

document.getElementById('selectDecoration6').addEventListener('click', function() {
    if (document.getElementById('selectDecoration6').classList.contains('unlocked') && !document.getElementById('selectDecoration6').classList.contains('active')) {
        document.getElementById('vases').style.display = 'flex';
        document.getElementById('selectDecoration6').style.backgroundColor = 'green';
        document.getElementById('selectDecoration6').classList.add('active');
    } else if (document.getElementById('selectDecoration6').classList.contains('active')) {
        document.getElementById('vases').style.display = 'none';
        document.getElementById('selectDecoration6').style.backgroundColor = 'grey';
        document.getElementById('selectDecoration6').classList.remove('active');
    }
})

document.getElementById('categoryAll').addEventListener('click', function() {
    for (let i = 0; i < document.querySelectorAll('.catalogueItem').length; i++) {
        document.querySelectorAll('.catalogueItem')[i].style.display = 'flex';
    }
})

document.getElementById('categoryPhone').addEventListener('click', function() {
    for (let i = 0; i < document.querySelectorAll('.catalogueItem').length; i++) {
        document.querySelectorAll('.catalogueItem')[i].style.display = 'none';
    }
    for (let i = 0; i < document.querySelectorAll('.phone').length; i++) {
        document.querySelectorAll('.phone')[i].style.display = 'flex';
    }
})

document.getElementById('categoryComputer').addEventListener('click', function() {
    for (let i = 0; i < document.querySelectorAll('.catalogueItem').length; i++) {
        document.querySelectorAll('.catalogueItem')[i].style.display = 'none';
    }
    for (let i = 0; i < document.querySelectorAll('.computer').length; i++) {
        document.querySelectorAll('.computer')[i].style.display = 'flex';
    }
})

document.getElementById('categoryTable').addEventListener('click', function() {
    for (let i = 0; i < document.querySelectorAll('.catalogueItem').length; i++) {
        document.querySelectorAll('.catalogueItem')[i].style.display = 'none';
    }
    for (let i = 0; i < document.querySelectorAll('.table').length; i++) {
        document.querySelectorAll('.table')[i].style.display = 'flex';
    }
})

document.getElementById('categoryChair').addEventListener('click', function() {
    for (let i = 0; i < document.querySelectorAll('.catalogueItem').length; i++) {
        document.querySelectorAll('.catalogueItem')[i].style.display = 'none';
    }
    for (let i = 0; i < document.querySelectorAll('.chair').length; i++) {
        document.querySelectorAll('.chair')[i].style.display = 'flex';
    }
})

document.getElementById('categoryDecorations').addEventListener('click', function() {
    for (let i = 0; i < document.querySelectorAll('.catalogueItem').length; i++) {
        document.querySelectorAll('.catalogueItem')[i].style.display = 'none';
    }
    for (let i = 0; i < document.querySelectorAll('.decoration').length; i++) {
        document.querySelectorAll('.decoration')[i].style.display = 'flex';
    }
})

function addReputation() {
    playerData.reput += 20;
    refreshPlayerData();
}

var allowedKeys = {
    67: 'c',
    72: 'h',
    69: 'e',
    65: 'a',
    84: 't'
  };
  
  var cheatCode = ['c', 'h', 'e', 'a', 't'];
  
  var cheatCodePosition = 0;
  
  document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = cheatCode[cheatCodePosition];
  
    if (key == requiredKey) {
  
      cheatCodePosition++;
  
      if (cheatCodePosition == cheatCode.length) {
        activateCheats();
        cheatCodePosition = 0;
      }
    } else {
        cheatCodePosition = 0;
    }
  });
  
  function activateCheats() {
    document.getElementById('cheatButtonLevel').style.display = 'flex';
    document.getElementById('cheatButtonReputation').style.display = 'flex';
  }
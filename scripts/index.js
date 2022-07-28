let userInput, terminalOutput;
const baseTime=80;
let canType=false;
let skipped=false;

const app = () => {
    window.userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
    const GREETING=`Hello. What's your name?`;
    greetingMsg(GREETING, baseTime);
};

window.onscroll = function () {
    skipped=true;
}

const presetNames = {
    johnston:
        'Nice try buddy.',
    "your mom":
        'No.'
};

const execute = function executeCommand(input) {
    originalInput = input;
    input = input.toLowerCase();

    if (input.length === 0) {
        return;
    }
    document.getElementById('userInput').classList.remove('user-input');
    canType=false;


    if (!COMMANDS.hasOwnProperty(input)) {
        let GREETING;
        let NAME;
        if(presetNames.hasOwnProperty(input)) {
            GREETING="";
            NAME=presetNames[input];
        } else {
            GREETING=getGreeting();
            NAME=`${originalInput}.`;
        }
        
        let greeting="";
        let name="";
        Array.from(GREETING).forEach(function(char, index) {
            let time=index*baseTime;
            setTimeout(function() {
                greeting+=char;
                terminalOutput.innerHTML = `<div class="terminal-line"><div class="terminal-line">${greeting}<span class="output">${name}</span></div></div>`;
            }, time);
        });

        let correctionIndex=GREETING.length;
        Array.from(NAME).forEach(function(char, index) {
            let time=(index+correctionIndex)*baseTime;
            setTimeout(function() {
                name+=char;
                terminalOutput.innerHTML = `<div class="terminal-line"><div class="terminal-line">${greeting}<span class="output">${name}</span></div></div>`;
                if (time==(NAME.length-1+correctionIndex)*baseTime) {
                    setTimeout(function() {
                        //document.getElementById('userInput').classList.toggle('user-input');
                        document.getElementById('nextPage').scrollIntoView({behavior: 'smooth'});
                    }, 250)
                }
            }, time);
        });
    }
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

function greetingMsg(GREETING, baseTime) {
    let greeting="";
    Array.from(GREETING).forEach(function(char, index) {
        let time=index*baseTime;
        setTimeout(function() {
            greeting+=char;
            terminalOutput.innerHTML = `<div class="terminal-line"><div class="terminal-line">${greeting}</div></div>`;
            if (time==(GREETING.length-1)*baseTime) {
                canType=true;
                setTimeout(function() {
                    document.getElementById('userInput').classList.toggle('user-input');
                }, 250)
            }
        }, time);
    });
}

function getGreeting() {
    const d = new Date();
    let time=d.getHours();
    if (time < 12) {
        return 'Good morning, ';
    }else if (time < 18) {
        return 'Good afternoon, ';
    }else {
        return 'Good evening, ';
    }
}

/* scrapped
function trimName(name) {
    let trimmedName="";
    for(let i=0; i<name.length; ++i) {
        let char=name.chatAt(i);
        if (char==" ") {
            return trimmedName+".";
        }
        if (char==".") { 
            return trimmedName;
        }
        trimmedName+=char;
    }
    return trimmedName+".";
}
*/

const key = function keyEvent(e) {
    if (!canType) {
        return;
    }
    userInput = document.getElementById("userInput");
    const input = window.userInput.innerHTML;

    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }

    if (e.key === "Enter") {
        execute(input);
        userInput.innerHTML = "";
        return;
    }

    userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(
        0,
        userInput.innerHTML.length - 1
    );
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
app();

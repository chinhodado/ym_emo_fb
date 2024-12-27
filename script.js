// ==UserScript==
// @name         ym_emo_fb
// @namespace    https://github.com/chinhodado/ym_emo_fb
// @version      0.1
// @description  View Yahoo Messenger emoticons on Facebook
// @include      http://facebook.com/*
// @include      http://*.facebook.com/*
// @include      https://facebook.com/*
// @include      https://*.facebook.com/*
// @include      https://www.messenger.com/*
// @copyright    2013, Chin
// @run-at       document-end
// ==/UserScript==


function walk(node) {
    let child, next;
    switch (node.nodeType)  {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
            handleText(node);
            break;
    }
}

const emojis = {
    base: {
        happy: ['Happy', `:)`],
        sad: ['Sad', `:(`],
        winking: ['Winking', `;)`],
        grin: ['Big grin', `:D`],
        batting: ['Batting eyelashes', `;;)`],
        confused: ['Confused', `:-/`],
        love: ['Love struck', `:x`],
        blushing: ['Blushing', `:">`],
        tongue: ['Tongue', `:P`],
        kiss: ['Kiss', `:-*`],
        surprised: ['Surprised', `:-O`],
        angry: ['Angry', `x(`],
        smug: ['Smug', `:>`],
        cool: ['Cool', `B-)`],
        worried: ['Worried', `:-s`],
        devil: ['Devil', `>:)`],
        crying: ['Crying', `:((`],
        laughing: ['Laughing', `:))`],
        straight: ['Straight face', `:|`],
        raised: ['Raised eyebrows', `/:)`],
        angel: ['Angel', `O:-)`],
        nerd: ['Nerd', `:-B`],
        talkhand: ['Talk to the hand', `=;`],
        sleepy: ['Sleepy', `I-)`],
        rollingeyes: ['Rolling eyes', `8-|`],
        sick: ['Sick', `:-&`],
        donttell: ["Don't tell", `:-$`],
        notalking: ['No talking', `[-(`],
        clown: ['Clown', `:O)`],
        silly: ['Silly', `8-}`],
        yawn: ['Yawn', `(:|`],
        drooling: ['Drooling', `=P~`],
        thinking: ['Thinking', `:-?`],
        doh: ["D'oh", `#-o`],
        applause: ['Applause', `=D>`],
        pig: ['Pig', `:@)`],
        cow: ['Cow', `3:-O`],
        monkey: ['Monkey', `:(|)`],
        chicken: ['Chicken', `~:>`],
        rose: ['Rose', `@};-`],
        goodluck: ['Good luck', `%%-`],
        flag: ['Flag', `**==`],
        pumpkin: ['Pumpkin', `(~~)`],
        coffee: ['Coffee', `~O)`],
        idea: ['Idea', `*-:)`],
        skull: ['Skull', `8-X`],
        bug: ['Bug', `=:)`],
        alien: ['Alien', `>-)`],
        frustrated: ['Frustrated', `:-L`],
        cowboy: ['Cowboy', `<):)`],
        praying: ['Praying', `[-O<`],
        hipno: ['Hypnotized', `@-)`],
        money: ['Money eyes', `$-)`],
        whistling: ['Whistling', `:-"`],
        liar: ['Liar', `:^o`],
        beatup: ['Punch', `b-(`],
        peace: ['Peace sign', `:)>-`],
        shame: ['Shame on you', `[-X`],
        dancing: ['Dancing', `\\:D/`],
        hug: ['Big hug', `>:D<`],
    },
    fighter: {
        hiro: ['Hiro', `o->`],
        billy: ['Billy', `o=>`],
        april: ['April', `o-+`],
        yinyang: ['Yinyang', `(%)`],
    },
    version6: {
        broken: ['Broken heart', `=((`],
        whew: ['Whew!', `#:-S`],
        rolling: ['Rolling on the floor', `=))`],
        loser: ['Loser', `L-)`],
        party: ['Party', `<:-P`],
        nail: ['Nail biting', `:-ss`],
        waiting: ['Waiting', `:-w`],
        sigh: ['Sigh', `:-<`],
        phbbt: ['phbbbbt', `>:P`],
        bringit: ['Bring it on', `>:/`],
        hehe: ['Hee hee', `;))`],
        chatterbox: ['Chatterbox', `:-@`],
        notworthy: ['Not worthy', `^:)^`],
        ohgoon: ['Oh go on', `:-j`],
        star: ['Star', `(*)`],
    },
    version7: {
        phone: ['On the phone', `:)]`],
        callme: ['Call me', `:-c`],
        witsend: ["At wit's end", `~X(`],
        bye: ['Wave', `:-h`],
        timeout: ['Timeout', `:-t`],
        daydreaming: ['Daydreaming', `8->`],
        dontknow: ["I don't know", `:-??`],
        notlistening: ['Not listening', `%-(`],
    },
    version8: {
        puppy: ['Puppy', `:o3`],
    },
    version9: {
        dontsee: ["I don't want to see", `X_X`],
        hurryup: ['Hurry up', `:!!`],
        rockon: ['Rock on', `\\m/`],
        thumbdown: ['Thumbs down', `:-q`],
        thumbup: ['Thumbs up', `:-bd`],
        wasnotme: ["It wasn't me!", `^#(^`],
        bee: ['Bee', `:bz`],
    },
    version11: {
        cheer: ['Cheer', `~^o^~`],
        dizzy: ['Dizzy', `'@^@|||`],
        cook: ['Cook', `[]---`],
        eat: ['Eat', `^o^||3`],
        giveup: ['Give up', `:-(||>`],
        cold: ['Cold', `'+_+`],
        hot: ['Hot', `:::^^:::`],
        music: ['Music', `o|^_^|o`],
        vomit: ['Vomit', `:puke!`],
        sing: ['Sing', `o|\\~`],
        catch: ['Catch', `o|:-)`],
        exercise: ['Exercise', `[]==[]`],
        highfive: ['High Five!', `:-)/\\:-)`],
        gaming: ['Gaming', `:(game)`],
        searchme: ['Search me', `'@-@`],
        spooky: ['Spooky', `:->~~`],
        studying: ['Studying', `?@_@?`],
        tv: ['TV', `:(tv)`],
        gift: ['Gift', `&[]`],
        unlucky: ['Unlucky', `%||:-{`],
        downonluck: ['Down on luck', `%*-{`],
        fight: ['Fight', `:(fight)`],
    },
    web: {
        pirate: ['Pirate', `:ar!`],
        transformer: ['Transformer', `[..]`],
    }
}

const allEmojis = [];
for (let category in emojis) {
    for (let emoji in emojis[category]) {
        allEmojis.push([emoji, ...emojis[category][emoji]]);
    }
}

const emojiMap = {};
for (const emoji of allEmojis) {
    emojiMap[emoji[2].toLowerCase()] = emoji;
}

allEmojis.sort((a, b) => b[2].length - a[2].length);
let metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;
let patterns = [];
for (let emoji of allEmojis) {
    patterns.push('(' + emoji[2].replace(metachars, "\\$&") + ')');
}
let regexp = new RegExp(patterns.join('|'), 'gi');
var ymEmoFbEnv;

function handleText(textNode) {
    if (textNode.nodeValue.match(regexp)) {
        const parent = textNode.parentNode;
        let newTxt = textNode.nodeValue.replace(regexp, function(code) {
            let emoji = emojiMap[code.toLowerCase()];
            if (ymEmoFbEnv !== undefined) {
                return `images/${emoji[0]}.gif`;
            }
            else {
                return chrome.runtime.getURL(`images/${emoji[0]}.gif`);
            }
        });

        const newImg = document.createElement("img");
        newImg.src = newTxt;
        newImg.alt = '';
        newImg.classList.add('ym_emo_fb');
        parent.replaceChild(newImg, textNode);
    }
}

if (ymEmoFbEnv === undefined) {
    // This is slow (35ms messenger), also risk processing wrong nodes)
    // console.time("body")
    // walk(document.body);
    // console.timeEnd("body");

    // This is faster (0.13ms messenger), but risk breaking if FB changes their code
    console.time("selector")
    let nodes = document.querySelectorAll('.html-div[dir="auto"]');
    nodes.forEach(node => {walk(node)});
    console.timeEnd("selector")

    // select the target node for mutation observation
    const target = document.body;

    // create an observer instance
    const observer = new MutationObserver(function (mutations) { // mutations: an array of MutationRecord objects
        mutations.forEach(function (mutation) {
            const addedList = mutation.addedNodes;
            for (let i = 0; i < addedList.length; ++i) {
                const item = addedList[i];  // Calling myNodeList.item(i) isn't necessary in JavaScript
                walk(item);
            }
        });
    });

    // configuration of the observer:
    const config = {attributes: true, childList: true, characterData: true, subtree: true};

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

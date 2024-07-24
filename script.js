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

const laughing     = "<span class='myemo laughing'></span>";
const crying       = "<span class='myemo crying'></span>";
const ohgoon       = "<span class='myemo ohgoon'></span>";
const rolling      = "<span class='myemo rolling'></span>";
const hehe         = "<span class='myemo hehe'></span>";
const angry        = "<span class='myemo angry'></span>";
const batting      = "<span class='myemo batting'></span>";
const blushing     = "<span class='myemo blushing'></span>";
const broken       = "<span class='myemo broken'></span>";
const devil        = "<span class='myemo devil'></span>";
const hug          = "<span class='myemo hug'></span>";
const love         = "<span class='myemo love'></span>";
const smug         = "<span class='myemo smug'></span>";
const whew         = "<span class='myemo whew'></span>";
const worried      = "<span class='myemo worried'></span>";
const bye          = "<span class='myemo bye'></span>";
const callme       = "<span class='myemo callme'></span>";
const clown        = "<span class='myemo clown'></span>";
const daydreaming  = "<span class='myemo daydreaming'></span>";
const donttell     = "<span class='myemo donttell'></span>";
const loser        = "<span class='myemo loser'></span>";
const nerd         = "<span class='myemo nerd'></span>";
const notalking    = "<span class='myemo notalking'></span>";
const phone        = "<span class='myemo phone'></span>";
const raised       = "<span class='myemo raised'></span>";
const sick         = "<span class='myemo sick'></span>";
const silly        = "<span class='myemo silly'></span>";
const sleepy       = "<span class='myemo sleepy'></span>";
const straight     = "<span class='myemo straight'></span>";
const talkhand     = "<span class='myemo talkhand'></span>";
const timeout      = "<span class='myemo timeout'></span>";
const witsend      = "<span class='myemo witsend'></span>";
const applause     = "<span class='myemo applause'></span>";
const beatup       = "<span class='myemo beatup'></span>";
const bringit      = "<span class='myemo bringit'></span>";
const dancing      = "<span class='myemo dancing'></span>";
const doh          = "<span class='myemo doh'></span>";
const dontknow     = "<span class='myemo dontknow'></span>";
const dontsee      = "<span class='myemo dontsee'></span>";
const drooling     = "<span class='myemo drooling'></span>";
const frustrated   = "<span class='myemo frustrated'></span>";
const hipno        = "<span class='myemo hipno'></span>";
const liar         = "<span class='myemo liar'></span>";
const money        = "<span class='myemo money'></span>";
const nail         = "<span class='myemo nail'></span>";
const notworthy    = "<span class='myemo notworthy'></span>";
const party        = "<span class='myemo party'></span>";
const peace        = "<span class='myemo peace'></span>";
const phbbt        = "<span class='myemo phbbt'></span>";
const praying      = "<span class='myemo praying'></span>";
const rockon       = "<span class='myemo rockon'></span>";
const shame        = "<span class='myemo shame'></span>";
const sigh         = "<span class='myemo sigh'></span>";
const thinking     = "<span class='myemo thinking'></span>";
const thumbdown    = "<span class='myemo thumbdown'></span>";
const thumbup      = "<span class='myemo thumbup'></span>";
const waiting      = "<span class='myemo waiting'></span>";
const whistling    = "<span class='myemo whistling'></span>";
const yawn         = "<span class='myemo yawn'></span>";

function handleText(textNode) {
    if (textNode.nodeValue.match(/:\)\)|:\(\(|:-j|=\)\)|=]]|;\)\)|x\(|;;\)|:">|=\(\(|>:\)|>:D<|:x|:>|#:-s|:-s|:-h|:-c|:O\)|8->|:-\$|L-\)|:-B|\[-\(|:\)\]|\/:\)|:-&|8-\}|I-\)|:\||=;|:-t|~X\(|=D>|b-\(|>:\/|\\:D\/|#-o|:-\?\?|X_X|=P~|:-L|@-\)|:\^o|\$-\)|:-ss|\^:\)\^|<:-P|:\)>-|>:P|\[-O<|\\m\/|\[-X|:-<|:-\?|:-q|:-bd|:-w|:-"|\(:\|/i)) {
        const parent = textNode.parentNode;
        textNode.nodeValue = textNode.nodeValue.replace(/:-ss/gi, nail);
        textNode.nodeValue = textNode.nodeValue.replace(/:-bd/gi, thumbup);
        textNode.nodeValue = textNode.nodeValue.replace(/\(:\|/gi, yawn);
        textNode.nodeValue = textNode.nodeValue.replace(/:\)\)/g, laughing);
        textNode.nodeValue = textNode.nodeValue.replace(/:\(\(/g, crying);
        textNode.nodeValue = textNode.nodeValue.replace(/:-j/g, ohgoon);
        textNode.nodeValue = textNode.nodeValue.replace(/=\)\)/g, rolling);
        textNode.nodeValue = textNode.nodeValue.replace(/=]]/g, rolling);
        textNode.nodeValue = textNode.nodeValue.replace(/;\)\)/g, hehe);
        textNode.nodeValue = textNode.nodeValue.replace(/~X\(/gi, witsend);
        textNode.nodeValue = textNode.nodeValue.replace(/x\(/gi, angry);
        textNode.nodeValue = textNode.nodeValue.replace(/;;\)/g, batting);
        textNode.nodeValue = textNode.nodeValue.replace(/:">/g, blushing);
        textNode.nodeValue = textNode.nodeValue.replace(/=\(\(/g, broken);
        textNode.nodeValue = textNode.nodeValue.replace(/>:\)/g, devil);
        textNode.nodeValue = textNode.nodeValue.replace(/>:D</gi, hug);
        textNode.nodeValue = textNode.nodeValue.replace(/:x/gi, love);
        textNode.nodeValue = textNode.nodeValue.replace(/:>/g, smug);
        textNode.nodeValue = textNode.nodeValue.replace(/#:-S/gi, whew);
        textNode.nodeValue = textNode.nodeValue.replace(/:-s/gi, worried);
        textNode.nodeValue = textNode.nodeValue.replace(/:-h/gi, bye);
        textNode.nodeValue = textNode.nodeValue.replace(/:-c/gi, callme);
        textNode.nodeValue = textNode.nodeValue.replace(/:O\)/gi, clown);
        textNode.nodeValue = textNode.nodeValue.replace(/8->/gi, daydreaming);
        textNode.nodeValue = textNode.nodeValue.replace(/:-\$/gi, donttell);
        textNode.nodeValue = textNode.nodeValue.replace(/L-\)/gi, loser);
        textNode.nodeValue = textNode.nodeValue.replace(/:-B/gi, nerd);
        textNode.nodeValue = textNode.nodeValue.replace(/\[-\(/gi, notalking);
        textNode.nodeValue = textNode.nodeValue.replace(/:\)\]/gi, phone);
        textNode.nodeValue = textNode.nodeValue.replace(/\/:\)/gi, raised);
        textNode.nodeValue = textNode.nodeValue.replace(/:-&/gi, sick);
        textNode.nodeValue = textNode.nodeValue.replace(/8-\}/gi, silly);
        textNode.nodeValue = textNode.nodeValue.replace(/I-\)/gi, sleepy);
        textNode.nodeValue = textNode.nodeValue.replace(/:\|/gi, straight);
        textNode.nodeValue = textNode.nodeValue.replace(/=;/gi, talkhand);
        textNode.nodeValue = textNode.nodeValue.replace(/:-t/gi, timeout);
        textNode.nodeValue = textNode.nodeValue.replace(/=D>/gi, applause);
        textNode.nodeValue = textNode.nodeValue.replace(/b-\(/gi, beatup);
        textNode.nodeValue = textNode.nodeValue.replace(/>:\//gi, bringit);
        textNode.nodeValue = textNode.nodeValue.replace(/\\:D\//gi, dancing);
        textNode.nodeValue = textNode.nodeValue.replace(/#-o/gi, doh);
        textNode.nodeValue = textNode.nodeValue.replace(/:-\?\?/gi, dontknow);
        textNode.nodeValue = textNode.nodeValue.replace(/X_X/gi, dontsee);
        textNode.nodeValue = textNode.nodeValue.replace(/=P~/gi, drooling);
        textNode.nodeValue = textNode.nodeValue.replace(/:-L/gi, frustrated);
        textNode.nodeValue = textNode.nodeValue.replace(/@-\)/gi, hipno);
        textNode.nodeValue = textNode.nodeValue.replace(/:\^o/gi, liar);
        textNode.nodeValue = textNode.nodeValue.replace(/\$-\)/gi, money);        
        textNode.nodeValue = textNode.nodeValue.replace(/\^:\)\^/gi, notworthy);
        textNode.nodeValue = textNode.nodeValue.replace(/<:-P/gi, party);
        textNode.nodeValue = textNode.nodeValue.replace(/:\)>-/gi, peace);
        textNode.nodeValue = textNode.nodeValue.replace(/>:P/gi, phbbt);
        textNode.nodeValue = textNode.nodeValue.replace(/\[-O</gi, praying);
        textNode.nodeValue = textNode.nodeValue.replace(/\\m\//gi, rockon);
        textNode.nodeValue = textNode.nodeValue.replace(/\[-X/gi, shame);
        textNode.nodeValue = textNode.nodeValue.replace(/:-</gi, sigh);
        textNode.nodeValue = textNode.nodeValue.replace(/:-\?/gi, thinking);
        textNode.nodeValue = textNode.nodeValue.replace(/:-q/gi, thumbdown);        
        textNode.nodeValue = textNode.nodeValue.replace(/:-w/gi, waiting);
        textNode.nodeValue = textNode.nodeValue.replace(/:-"/gi, whistling);

        const newSpan = document.createElement('span');
        newSpan.innerHTML = textNode.nodeValue;
        parent.replaceChild(newSpan, textNode);
    }
}

walk(document.body);

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
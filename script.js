// ==UserScript==
// @name         ym_emo_fb
// @namespace    https://github.com/chinhodado/ym_emo_fb
// @version      0.1
// @description  View Yahoo Messenger emoticons on Facebook
// @include      http://facebook.com/*
// @include      http://*.facebook.com/*
// @include      https://facebook.com/*
// @include      https://*.facebook.com/*
// @copyright    2013, Chin
// @run-at       document-end
// ==/UserScript==


function walk(node) {      
    var child, next;
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

var laughing = "<span class='myemo laughing'></span>";
var crying   = "<span class='myemo crying'></span>";
var ohgoon   = "<span class='myemo ohgoon'></span>";
var rolling  = "<span class='myemo rolling'></span>";
var hehe     = "<span class='myemo hehe'></span>";

function handleText(textNode) {
    if (textNode.nodeValue.match(/(:\)\))|(=\)\))|(;\)\))|(:\(\()|(:-j)/)) {
        var parent = textNode.parentNode;
        var replacement = "<span class='myemo laughing'></span>";  
        textNode.nodeValue = textNode.nodeValue.replace(/:\)\)/g, laughing);
        textNode.nodeValue = textNode.nodeValue.replace(/=\)\)/g, rolling);
        textNode.nodeValue = textNode.nodeValue.replace(/;\)\)/g, hehe);
        textNode.nodeValue = textNode.nodeValue.replace(/:\(\(/g, crying);
        textNode.nodeValue = textNode.nodeValue.replace(/:-j/g, ohgoon);
        var newSpan = document.createElement('span');
        newSpan.innerHTML = textNode.nodeValue;
        parent.appendChild(newSpan);
        textNode.parentNode.removeChild(textNode);
    }
}

var fileref=document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", "https://rawgithub.com/chinhodado/ym_emo_fb/master/emo_style.css");
document.getElementsByTagName("head")[0].appendChild(fileref);
               
walk(document.body);

document.addEventListener('DOMNodeInserted', function() { walk(document.body) }, false);
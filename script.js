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
var angry    = "<span class='myemo angry'></span>";
var batting  = "<span class='myemo batting'></span>";
var blushing = "<span class='myemo blushing'></span>";
var broken   = "<span class='myemo broken'></span>";
var devil    = "<span class='myemo devil'></span>";
var hug      = "<span class='myemo hug'></span>";
var love     = "<span class='myemo love'></span>";
var smug     = "<span class='myemo smug'></span>";
var whew     = "<span class='myemo whew'></span>";
var worried  = "<span class='myemo worried'></span>";

function handleText(textNode) {
    if (textNode.nodeValue.match(/:\)\)|:\(\(|:-j|=\)\)|;\)\)|x\(|;;\)|:">|=\(\(|>:\(|>:D<|:x|:>|#:-s|:-s/i)) {
        var parent = textNode.parentNode;
        textNode.nodeValue = textNode.nodeValue.replace(/:\)\)/g, laughing);
        textNode.nodeValue = textNode.nodeValue.replace(/:\(\(/g, crying);
        textNode.nodeValue = textNode.nodeValue.replace(/:-j/g, ohgoon);
        textNode.nodeValue = textNode.nodeValue.replace(/=\)\)/g, rolling);
        textNode.nodeValue = textNode.nodeValue.replace(/;\)\)/g, hehe);
        textNode.nodeValue = textNode.nodeValue.replace(/x\(/gi, angry);
        textNode.nodeValue = textNode.nodeValue.replace(/;;\)/g, batting);
        textNode.nodeValue = textNode.nodeValue.replace(/:">/g, blushing);
        textNode.nodeValue = textNode.nodeValue.replace(/=\(\(/g, broken);
        textNode.nodeValue = textNode.nodeValue.replace(/>:\(/g, devil);
        textNode.nodeValue = textNode.nodeValue.replace(/>:D</gi, hug);
        textNode.nodeValue = textNode.nodeValue.replace(/:x/gi, love);
        textNode.nodeValue = textNode.nodeValue.replace(/:>/g, smug);
        textNode.nodeValue = textNode.nodeValue.replace(/#:-S/gi, whew);
        textNode.nodeValue = textNode.nodeValue.replace(/:-s/gi, worried);
        var newSpan = document.createElement('span');
        newSpan.innerHTML = textNode.nodeValue;
        parent.replaceChild(newSpan, textNode);
    }
}

var fileref=document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", "https://rawgithub.com/chinhodado/ym_emo_fb/master/emo_style.css");
document.getElementsByTagName("head")[0].appendChild(fileref);
               
walk(document.body);

document.addEventListener('DOMNodeInserted', function() { walk(document.body) }, false);

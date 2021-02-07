// ==UserScript==
// @name         Moyenne VieScolaire
// @namespace    none
// @version      1.0
// @description  Un script qui permet d'afficher la moyenne générale sur l'ENT VieScolaire.
// @author       Maxan Fournier
// @match        https://lyceepaullapie92.la-vie-scolaire.fr/portail/NOTES
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

    window.onload = await awaitForContent();

    async function awaitForContent() {
        if (document.getElementsByTagName("iframe")[0] == undefined) {
            setTimeout(function() {
                awaitForContent();
            }, 100)
        } else if (document.getElementsByTagName("iframe")[0].contentDocument.getElementById("content")) {
            startScript();
        } else {
            setTimeout(function() {
                awaitForContent();
            }, 100)
        }
    }

    async function startScript() {
        const iframe = document.getElementsByTagName("iframe")[0].contentDocument;
        const content = iframe.getElementById("content");

        gatherText(content);
    }

    async function gatherText(content) {
        let marksArray = [];
        let coeffArray = [];
        let numberOfMarks = content.textContent.split("coeff").length;
        
        for (let i = 1; i < numberOfMarks; i++) {
            let textContent = content.textContent;
            let getCoeff = textContent.split("coeff. ")[i].split(")")[0];
            let getMark = textContent.split(") : ")[i].split("/20")[0];
            
            if (!isNaN(parseFloat(getCoeff)) && !isNaN(parseFloat(getMark))) {
                marksArray.push(parseInt(getMark) * parseInt(getCoeff));
                coeffArray.push(parseInt(getCoeff));
            }
        }

        calculate(marksArray, coeffArray);
    }

    async function calculate(marks, coeff) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let marksSum = marks.reduce(reducer);
        let coeffSum = coeff.reduce(reducer);

        let average = +(Math.round((marksSum / coeffSum) + "e+2") + "e-2");

        display(average);
    }

    async function display(average) {
        let getLocation = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByClassName("tableReleve")[0];

        let tr = document.createElement("tr");
        tr.className = "odd";
        getLocation.appendChild(tr);

        let leftElement = document.createElement("td");
        leftElement.className = "tdReleveLeft";
        leftElement.textContent = "Moyenne générale";
        leftElement.style.fontWeight = "bold";
        tr.appendChild(leftElement);

        let rightElement = document.createElement("td");
        rightElement.className = "tdReleveRight";
        rightElement.textContent = average;
        tr.appendChild(rightElement);
    }
})();

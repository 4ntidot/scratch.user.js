// ==UserScript==
// @name         Improved scratch experience
// @namespace    https://github.com/Ma15fo43/Improved-Scratch-Experience
// @version      1.8
// @description  For a better Scratch experience
// @author       Mazz3015
// @match        https://scratch.mit.edu/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /* FORUM BUTTON PART */
    var oldNavbarVersion = document.getElementById("pagewrapper");

    if (oldNavbarVersion == undefined) { // new version of the navbar
        document.getElementsByTagName("li")[4].innerHTML = '<a href="/discuss/15">Forum</a>';
    } else { // fallback for the old version of the navbar
        document.getElementsByTagName("li")[3].innerHTML = '<a href="/discuss/15">Forum</a>';
    }

    /* FOLLOWERS/FOLLOWING PART */
    let i = 0;
    let y = 0;
    let tabName = document.title.toString().split(" ")[0];

    if (document.title !== `${tabName} on Scratch`) {
        return;
    }

    window.onload = showIDRequest();
    window.onload = followingRequest();
    window.onload = followersRequest();

    async function showIDRequest() {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var parsed = JSON.parse(this.responseText);
                var locationToAdd = document.getElementsByClassName("location")[0].innerText.toString();
                document.getElementsByClassName("location")[0].innerHTML = `${locationToAdd} - ID: ${parsed.id}`;
            }
        }
        xhttp.open("GET", `https://api.scratch.mit.edu/users/${tabName}`, true);
        xhttp.send();
    }

    async function followingRequest() {
        var xhttp = new XMLHttpRequest();
        var parser = new DOMParser();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let parsed = parser.parseFromString(this.responseText, "text/html");
                let followingCounter = parsed.getElementsByTagName("h2")[0].innerText.toString();
                let croppedFollowing = followingCounter.split("(")[1];

                followingH2Checker();

                document.getElementsByTagName("h4")[y].innerHTML = `Following (${croppedFollowing}`;
            }
        };

        xhttp.open("GET", `https://scratch.mit.edu/users/${tabName}/following`, true);
        xhttp.send();
    }

    async function followersRequest() {
        var xhttp = new XMLHttpRequest();
        var parser = new DOMParser();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let parsed = parser.parseFromString(this.responseText, "text/html");
                let followersCounter = parsed.getElementsByTagName("h2")[0].innerText.toString();
                let croppedFollowers = followersCounter.split("(")[1];

                followersH2Checker();

                document.getElementsByTagName("h4")[i].innerHTML = `Followers (${croppedFollowers}`;

            }
        };

        xhttp.open("GET", `https://scratch.mit.edu/users/${tabName}/followers`, true);
        xhttp.send();
    }

    function followingH2Checker() {
        while (document.getElementsByTagName("h4")[y].innerText != "Following" && document.getElementsByTagName("h4")[y].innerText != "Ceux que je suis") {
            y++;
            return followingH2Checker();
        }
    }

    function followersH2Checker() {
        while (document.getElementsByTagName("h4")[i].innerText != "Followers" && document.getElementsByTagName("h4")[i].innerText != "Ceux qui me suivent") {
            i++;
            return followersH2Checker();
        }
    }
})();

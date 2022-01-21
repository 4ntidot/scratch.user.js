// ==UserScript==
// @name         Improved scratch experience
// @namespace    https://github.com/fowled/scratch.user.js
// @version      3.0
// @description  For a better Scratch experience
// @author       fowled
// @match        https://scratch.mit.edu/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

    const oldNavbarVersion = document.getElementById("pagewrapper");
    const user = document.title.split(" ")[0];
    const url = window.location.href;

    if (!oldNavbarVersion) {
        document.getElementsByTagName("li")[4].innerHTML = '<a href="/discuss/15">Forum</a>';
    } else {
        document.getElementsByTagName("li")[3].innerHTML = '<a href="/discuss/15">Forum</a>';
    }

    if (url.includes("/users/")) {
        showID(user);
        followersCount(user);
    }

    async function showID(user) {
        fetch(`https://scratchdb.lefty.one/v3/user/info/${user}`)
            .then(response => response.json())
            .then(data => {
                const location = data.country;
                const id = data.id;

                document.getElementsByClassName("location")[0].innerHTML = `${location} • ${id}`;
            });
    }

    async function followersCount(user) {
        fetch(`https://scratchdb.lefty.one/v3/user/info/${user}`)
            .then(response => response.json())
            .then(data => {
                const followingCount = data.statistics.following;
                const followersCount = data.statistics.followers;

                document.getElementsByClassName("box-head")[5].innerHTML = `<h4>Following (${followingCount})</h4>`;
                document.getElementsByClassName("box-head")[6].innerHTML = `<h4>Followers (${followersCount})</h4>`;
            });
    }
})();

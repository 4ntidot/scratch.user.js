# Improved-Scratch-Experience
A useful userscript, made to improve your experience on the Scratch website.

## What does it do?
For the moment, the userscript displays the Scratcher ID on his profile, and also shows the number of followers and number of persons he's following (scroll down to the screenshots ↓ or simply click [here](https://github.com/Ma15fo43/Improved-Scratch-Experience/tree/master#screenshots-of-the-project).<br>
Also, the "forum" button that directly goes to ~space~ the forums is back on the navbar 👌🏻

## How to install it?
First, you have to download a Userscript manager extension such as Tampermonkey (I personally use it and love it) on your favorite browser (Brave, Firefox 🦊, Chrome...). <br>
Then go [here](https://github.com/Ma15fo43/improved-scratch-experience/raw/master/userscript.user.js) and Tampermonkey/your Userscript manager extension will ask you if you want to install my script... You just have to accept and you're ready to go 😉

## How to make a "custom navbar button"?
Are you tired of seeing the boring text "Forum" on the navbar? Don't worry, we can change that too! Simply edit the script step by step, I'll show you...

1. Go to the **Dashboard** of your *Userscript manager extension*<br>
![image](https://user-images.githubusercontent.com/37367577/74733969-c805bc80-524d-11ea-9c9c-684a27bbe1bd.png)

2. **Click** on my script to *edit* it:<br>
![image](https://user-images.githubusercontent.com/37367577/74734410-c5579700-524e-11ea-933e-7bdc1969b783.png)
a
3. **Edit** the following *1* and *2* with your custom URL and the name of your cool button:
```js
// ==UserScript==
// @name         Scratch navbar button userscript
// @namespace    none
// @version      1.2
// @description  Script to make a brand new and custom button that is appearing on the Scratch website navbar.
// @author       you :)
// @match        https://scratch.mit.edu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var oldNavbarVersion = document.getElementById("pagewrapper");

    if (oldNavbarVersion == undefined) {
        document.getElementsByTagName("li")[4].innerHTML = '<a href="**1- CUSTOM URL**">**2- CUSTOM NAME**</a>';
    } else {
        document.getElementsByTagName("li")[3].innerHTML = '<a href="**1- CUSTOM URL**">**2- CUSTOM NAME**</a>';
    }
})();
```
4. Apply changes, and you're done! Enjoy your custom button.

## Screenshots of the project
![image](https://user-images.githubusercontent.com/37367577/74733499-be2f8980-524c-11ea-8793-1264909b79fd.png)<br>
![image](https://user-images.githubusercontent.com/37367577/74733566-dd2e1b80-524c-11ea-9544-9acae76cccea.png)<br>
![image](https://user-images.githubusercontent.com/37367577/74861334-7858eb00-534a-11ea-99fd-f662813125e6.png) <br>
![image](https://user-images.githubusercontent.com/37367577/74861390-8d357e80-534a-11ea-8f5f-dea44c76ff88.png)

## Still having trouble?
Do you need help, or do you have a question? I can answer it, just create an issue on this repository! <br>
Click here: https://github.com/mazzlabs/scratch.user.js/issues/new <br>

## To Do list
- [x] Go to "forum" button
- [x] Show followers on user's page
- [x] Display ID on user's profile

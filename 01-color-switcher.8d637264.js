!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");function d(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}e.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,n.style.background=d(),e.disabled=!1,timerId=setInterval((function(){n.style.background=d()}),1e3)})),e.addEventListener("click",(function(){clearInterval(timerId),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.8d637264.js.map

// declaraction of document.ready() function.
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();


document.ready(
    // toggleTheme function.
    // this script shouldn't be changed.
    () => {
        var _Blog = window._Blog || {};
        // debugger
        // const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        // const isDark = currentTheme === 'dark';
        const pageBody = document.getElementsByTagName('body')[0]
        const mobileToggleTheme = document.getElementById("mobile-toggle-theme");
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const isDarkMode = darkModeMediaQuery.matches;

        if (isDarkMode) {
            pageBody.classList.add('dark-theme');
            document.getElementById("switch_default").checked = true;
            // mobile
            mobileToggleTheme.innerText = "· Dark"
        } else {
            pageBody.classList.remove('dark-theme');
            document.getElementById("switch_default").checked = false;
            // mobile
            mobileToggleTheme.innerText = "· Light"
        }

        const darkModeChangeListener = () => {
            if (pageBody.classList.contains('dark-theme')) {
                pageBody.classList.remove('dark-theme');
                // mobile
                mobileToggleTheme.innerText = "· Light"
                setTimeout(() => {
                    document.getElementById("switch_default").checked = false;
                })
            } else {
                pageBody.classList.add('dark-theme');
                // mobile
                mobileToggleTheme.innerText = "· Dark"

                setTimeout(() => {
                    document.getElementById("switch_default").checked = true;
                })
            }
        };

        _Blog.toggleTheme = function () {
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => darkModeChangeListener())
            // // moblie
            document.getElementById('mobile-toggle-theme').addEventListener('click', () => darkModeChangeListener())
        };
        _Blog.toggleTheme();
        darkModeMediaQuery.addEventListener("change", ev => darkModeChangeListener());
        // ready function.
    }
);

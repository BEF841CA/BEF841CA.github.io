// declaraction of document.ready() function.
;(function () {
    var ie = !!(window.attachEvent && !window.opera)
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && RegExp.$1 < 525
    var fn = []
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]()
    }
    var d = document
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false)
        if (fn.push(f) > 1) return
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left')
                    run()
                } catch (err) {
                    setTimeout(arguments.callee, 0)
                }
            })()
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run()
            }, 0)
    }
})()

document.ready(
    // toggleTheme function.
    // this script shouldn't be changed.
    () => {
        const _Blog = window._Blog || {}
        // debugger
        // const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        // const isDark = currentTheme === 'dark';
        const pageBody = document.getElementsByTagName('body')[0]
        const mobileToggleTheme = document.getElementById('mobile-toggle-theme')
        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)',
        )
        const isDarkMode = darkModeMediaQuery.matches

        const vs2015Link = document.createElement('link')
        const intellijLink = document.createElement('link')
        const avatarLight = document.getElementById('avatar-light')
        const avatarDark = document.getElementById('avatar-dark')
        const switchDefault = document.getElementById('switch_default')

        vs2015Link.setAttribute('rel', 'stylesheet')
        vs2015Link.setAttribute('type', 'text/css')
        vs2015Link.setAttribute(
            'href',
            'https://jsd.onmicrosoft.cn/gh/highlightjs/cdn-release@latest/build/styles/vs2015.min.css',
        )
        intellijLink.setAttribute('rel', 'stylesheet')
        intellijLink.setAttribute('type', 'text/css')
        intellijLink.setAttribute(
            'href',
            'https://jsd.onmicrosoft.cn/gh/highlightjs/cdn-release@latest/build/styles/intellij-light.min.css',
        )

        const dark = function () {
            pageBody.classList.add('dark-theme')

            if (avatarLight && avatarDark) {
                avatarLight.style.display = 'none'
                avatarDark.style.display = 'block'
            }

            setTimeout(() => {
                switchDefault.checked = true
            })

            // code
            document.head.appendChild(vs2015Link)

            if (document.head.contains(intellijLink)) {
                document.head.removeChild(intellijLink)
            }

            // mobile
            mobileToggleTheme.innerText = '· Dark'
        }

        const light = function () {
            pageBody.classList.remove('dark-theme')

            if (avatarLight && avatarDark) {
                avatarLight.style.display = 'block'
                avatarDark.style.display = 'none'
            }

            setTimeout(() => {
                switchDefault.checked = false
            })

            // code
            if (document.head.contains(vs2015Link)) {
                document.head.removeChild(vs2015Link)
            }
            document.head.appendChild(intellijLink)

            // mobile
            mobileToggleTheme.innerText = '· Light'
        }

        if (isDarkMode) {
            dark()
        } else {
            light()
        }

        const darkModeChangeListener = () => {
            if (pageBody.classList.contains('dark-theme')) {
                light()
            } else {
                dark()
            }
        }

        _Blog.toggleTheme = function () {
            document
                .getElementsByClassName('toggleBtn')[0]
                .addEventListener('click', () => darkModeChangeListener())
            // // moblie
            document
                .getElementById('mobile-toggle-theme')
                .addEventListener('click', () => darkModeChangeListener())
        }
        _Blog.toggleTheme()
        darkModeMediaQuery.addEventListener('change', (ev) =>
            darkModeChangeListener(),
        )
        // ready function.
    },
)

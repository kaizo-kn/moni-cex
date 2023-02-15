/**
 * Selectize (v0.15.2)
 * https://selectize.dev
 *
 * Copyright (c) 2013-2015 Brian Reavis & contributors
 * Copyright (c) 2020-2022 Selectize Team & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 * @author Ris Adams <selectize@risadams.com>
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.Selectize = factory(root.jQuery);
    }
}(this, function($) {
    'use strict';
    var highlight = function(t, e) {
            var r, a;
            if ("string" != typeof e || e.length) return r = "string" == typeof e ? new RegExp(e, "i") : e, a = function(t) {
                var e = 0;
                if (3 === t.nodeType) {
                    var n, i, o = t.data.search(r);
                    0 <= o && 0 < t.data.length && (i = t.data.match(r), (n = document.createElement("span")).className = "highlight", (o = t.splitText(o)).splitText(i[0].length), i = o.cloneNode(!0), n.appendChild(i), o.parentNode.replaceChild(n, o), e = 1)
                } else if (1 === t.nodeType && t.childNodes && !/(script|style)/i.test(t.tagName) && ("highlight" !== t.className || "SPAN" !== t.tagName))
                    for (var s = 0; s < t.childNodes.length; ++s) s += a(t.childNodes[s]);
                return e
            }, t.each(function() { a(this) })
        },
        MicroEvent = ($.fn.removeHighlight = function() {
            return this.find("span.highlight").each(function() {
                this.parentNode.firstChild.nodeName;
                var t = this.parentNode;
                t.replaceChild(this.firstChild, this), t.normalize()
            }).end()
        }, function() {}),
        MicroPlugin = (MicroEvent.prototype = {
            on: function(t, e) { this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(e) },
            off: function(t, e) { var n = arguments.length; return 0 === n ? delete this._events : 1 === n ? delete this._events[t] : (this._events = this._events || {}, void(t in this._events != !1 && this._events[t].splice(this._events[t].indexOf(e), 1))) },
            trigger: function(t) {
                var e = this._events = this._events || {};
                if (t in e != !1)
                    for (var n = 0; n < e[t].length; n++) e[t][n].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        }, MicroEvent.mixin = function(t) { for (var e = ["on", "off", "trigger"], n = 0; n < e.length; n++) t.prototype[e[n]] = MicroEvent.prototype[e[n]] }, {}),
        utils = (MicroPlugin.mixin = function(o) {
            o.plugins = {}, o.prototype.initializePlugins = function(t) {
                var e, n, i, o = this,
                    s = [];
                if (o.plugins = { names: [], settings: {}, requested: {}, loaded: {} }, utils.isArray(t))
                    for (e = 0, n = t.length; e < n; e++) "string" == typeof t[e] ? s.push(t[e]) : (o.plugins.settings[t[e].name] = t[e].options, s.push(t[e].name));
                else if (t)
                    for (i in t) t.hasOwnProperty(i) && (o.plugins.settings[i] = t[i], s.push(i));
                for (; s.length;) o.require(s.shift())
            }, o.prototype.loadPlugin = function(t) {
                var e = this,
                    n = e.plugins,
                    i = o.plugins[t];
                if (!o.plugins.hasOwnProperty(t)) throw new Error('Unable to find "' + t + '" plugin');
                n.requested[t] = !0, n.loaded[t] = i.fn.apply(e, [e.plugins.settings[t] || {}]), n.names.push(t)
            }, o.prototype.require = function(t) {
                var e = this,
                    n = e.plugins;
                if (!e.plugins.loaded.hasOwnProperty(t)) {
                    if (n.requested[t]) throw new Error('Plugin has circular dependency ("' + t + '")');
                    e.loadPlugin(t)
                }
                return n.loaded[t]
            }, o.define = function(t, e) { o.plugins[t] = { name: t, fn: e } }
        }, { isArray: Array.isArray || function(t) { return "[object Array]" === Object.prototype.toString.call(t) } }),
        Sifter = function(t, e) { this.items = t, this.settings = e || { diacritics: !0 } },
        cmp = (Sifter.prototype.tokenize = function(t, e) {
            if (!(t = trim(String(t || "").toLowerCase())) || !t.length) return [];
            for (var n, i, o = [], s = t.split(/ +/), r = 0, a = s.length; r < a; r++) {
                if (n = escape_regex(s[r]), this.settings.diacritics)
                    for (i in DIACRITICS) DIACRITICS.hasOwnProperty(i) && (n = n.replace(new RegExp(i, "g"), DIACRITICS[i]));
                e && (n = "\\b" + n), o.push({ string: s[r], regex: new RegExp(n, "i") })
            }
            return o
        }, Sifter.prototype.iterator = function(t, e) {
            var n = is_array(t) ? Array.prototype.forEach || function(t) { for (var e = 0, n = this.length; e < n; e++) t(this[e], e, this) } : function(t) { for (var e in this) this.hasOwnProperty(e) && t(this[e], e, this) };
            n.apply(t, [e])
        }, Sifter.prototype.getScoreFunction = function(t, e) {
            function o(t, e) { var n; return !t || -1 === (n = (t = String(t || "")).search(e.regex)) ? 0 : (e = e.string.length / t.length, 0 === n && (e += .5), e) }
            var s, r = (t = this.prepareSearch(t, e)).tokens,
                a = t.options.fields,
                l = r.length,
                p = t.options.nesting,
                c = (s = a.length) ? 1 === s ? function(t, e) { return o(getattr(e, a[0], p), t) } : function(t, e) { for (var n = 0, i = 0; n < s; n++) i += o(getattr(e, a[n], p), t); return i / s } : function() { return 0 };
            return l ? 1 === l ? function(t) { return c(r[0], t) } : "and" === t.options.conjunction ? function(t) {
                for (var e, n = 0, i = 0; n < l; n++) {
                    if ((e = c(r[n], t)) <= 0) return 0;
                    i += e
                }
                return i / l
            } : function(t) { for (var e = 0, n = 0; e < l; e++) n += c(r[e], t); return n / l } : function() { return 0 }
        }, Sifter.prototype.getSortFunction = function(t, n) {
            var e, i, o, s, r, a, l, p = this,
                c = !(t = p.prepareSearch(t, n)).query && n.sort_empty || n.sort,
                u = function(t, e) { return "$score" === t ? e.score : getattr(p.items[e.id], t, n.nesting) },
                d = [];
            if (c)
                for (e = 0, i = c.length; e < i; e++) !t.query && "$score" === c[e].field || d.push(c[e]);
            if (t.query) {
                for (l = !0, e = 0, i = d.length; e < i; e++)
                    if ("$score" === d[e].field) { l = !1; break }
                l && d.unshift({ field: "$score", direction: "desc" })
            } else
                for (e = 0, i = d.length; e < i; e++)
                    if ("$score" === d[e].field) { d.splice(e, 1); break } for (a = [], e = 0, i = d.length; e < i; e++) a.push("desc" === d[e].direction ? -1 : 1);
            return (s = d.length) ? 1 === s ? (o = d[0].field, r = a[0], function(t, e) { return r * cmp(u(o, t), u(o, e)) }) : function(t, e) {
                for (var n, i = 0; i < s; i++)
                    if (n = d[i].field, n = a[i] * cmp(u(n, t), u(n, e))) return n;
                return 0
            } : null
        }, Sifter.prototype.prepareSearch = function(t, e) { var n, i, o; return "object" == typeof t ? t : (n = (e = extend({}, e)).fields, i = e.sort, o = e.sort_empty, n && !is_array(n) && (e.fields = [n]), i && !is_array(i) && (e.sort = [i]), o && !is_array(o) && (e.sort_empty = [o]), { options: e, query: String(t || "").toLowerCase(), tokens: this.tokenize(t, e.respect_word_boundaries), total: 0, items: [] }) }, Sifter.prototype.search = function(t, n) {
            var i, o, e = this,
                s = this.prepareSearch(t, n);
            return n = s.options, t = s.query, o = n.score || e.getScoreFunction(s), t.length ? e.iterator(e.items, function(t, e) { i = o(t), (!1 === n.filter || 0 < i) && s.items.push({ score: i, id: e }) }) : e.iterator(e.items, function(t, e) { s.items.push({ score: 1, id: e }) }), (t = e.getSortFunction(s, n)) && s.items.sort(t), s.total = s.items.length, "number" == typeof n.limit && (s.items = s.items.slice(0, n.limit)), s
        }, function(t, e) { return "number" == typeof t && "number" == typeof e ? e < t ? 1 : t < e ? -1 : 0 : (t = asciifold(String(t || "")), (e = asciifold(String(e || ""))) < t ? 1 : t < e ? -1 : 0) }),
        extend = function(t, e) {
            for (var n, i, o = 1, s = arguments.length; o < s; o++)
                if (i = arguments[o])
                    for (n in i) i.hasOwnProperty(n) && (t[n] = i[n]);
            return t
        },
        getattr = function(t, e, n) { if (t && e) { if (!n) return t[e]; for (var i = e.split("."); i.length && (t = t[i.shift()]);); return t } },
        trim = function(t) { return (t + "").replace(/^\s+|\s+$|/g, "") },
        escape_regex = function(t) { return (t + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") },
        is_array = Array.isArray || "undefined" != typeof $ && $.isArray || function(t) { return "[object Array]" === Object.prototype.toString.call(t) },
        DIACRITICS = { a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]", b: "[b␢βΒB฿𐌁ᛒ]", c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]", d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]", e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]", f: "[fƑƒḞḟ]", g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]", h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]", i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]", j: "[jȷĴĵɈɉʝɟʲ]", k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]", l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]", n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]", o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]", p: "[pṔṕṖṗⱣᵽƤƥᵱ]", q: "[qꝖꝗʠɊɋꝘꝙq̃]", r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]", s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]", t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]", u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]", v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]", w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]", x: "[xẌẍẊẋχ]", y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]", z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]" },
        asciifold = function() {
            var t, e, n, i, o = "",
                s = {};
            for (n in DIACRITICS)
                if (DIACRITICS.hasOwnProperty(n))
                    for (o += i = DIACRITICS[n].substring(2, DIACRITICS[n].length - 1), t = 0, e = i.length; t < e; t++) s[i.charAt(t)] = n;
            var r = new RegExp("[" + o + "]", "g");
            return function(t) { return t.replace(r, function(t) { return s[t] }).toLowerCase() }
        }();

    function uaDetect(t, e) { return navigator.userAgentData ? t === navigator.userAgentData.platform : e.test(navigator.userAgent) }
    var IS_MAC = uaDetect("macOS", /Mac/),
        KEY_A = 65,
        KEY_COMMA = 188,
        KEY_RETURN = 13,
        KEY_ESC = 27,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_P = 80,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        KEY_N = 78,
        KEY_BACKSPACE = 8,
        KEY_DELETE = 46,
        KEY_SHIFT = 16,
        KEY_CMD = IS_MAC ? 91 : 17,
        KEY_CTRL = IS_MAC ? 18 : 17,
        KEY_TAB = 9,
        TAG_SELECT = 1,
        TAG_INPUT = 2,
        SUPPORTS_VALIDITY_API = !uaDetect("Android", /android/i) && !!document.createElement("input").validity,
        isset = function(t) { return void 0 !== t },
        hash_key = function(t) { return null == t ? null : "boolean" == typeof t ? t ? "1" : "0" : t + "" },
        escape_html = function(t) { return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") },
        escape_replace = function(t) { return (t + "").replace(/\$/g, "$$$$") },
        hook = {
            before: function(t, e, n) {
                var i = t[e];
                t[e] = function() { return n.apply(t, arguments), i.apply(t, arguments) }
            },
            after: function(e, t, n) {
                var i = e[t];
                e[t] = function() { var t = i.apply(e, arguments); return n.apply(e, arguments), t }
            }
        },
        once = function(t) { var e = !1; return function() { e || (e = !0, t.apply(this, arguments)) } },
        debounce = function(n, i) {
            var o;
            return function() {
                var t = this,
                    e = arguments;
                window.clearTimeout(o), o = window.setTimeout(function() { n.apply(t, e) }, i)
            }
        },
        debounce_events = function(e, n, t) {
            var i, o = e.trigger,
                s = {};
            for (i in e.trigger = function() {
                    var t = arguments[0];
                    if (-1 === n.indexOf(t)) return o.apply(e, arguments);
                    s[t] = arguments
                }, t.apply(e, []), e.trigger = o, s) s.hasOwnProperty(i) && o.apply(e, s[i])
        },
        watchChildEvent = function(n, t, e, i) { n.on(t, e, function(t) { for (var e = t.target; e && e.parentNode !== n[0];) e = e.parentNode; return t.currentTarget = e, i.apply(this, [t]) }) },
        getInputSelection = function(t) { var e, n, i = {}; return void 0 === t ? console.warn("WARN getInputSelection cannot locate input control") : "selectionStart" in t ? (i.start = t.selectionStart, i.length = t.selectionEnd - i.start) : document.selection && (t.focus(), e = document.selection.createRange(), n = document.selection.createRange().text.length, e.moveStart("character", -t.value.length), i.start = e.text.length - n, i.length = n), i },
        transferStyles = function(t, e, n) {
            var i, o, s = {};
            if (n)
                for (i = 0, o = n.length; i < o; i++) s[n[i]] = t.css(n[i]);
            else s = t.css();
            e.css(s)
        },
        measureString = function(t, e) { return t ? (Selectize.$testInput || (Selectize.$testInput = $("<span />").css({ position: "absolute", width: "auto", padding: 0, whiteSpace: "pre" }), $("<div />").css({ position: "absolute", width: 0, height: 0, overflow: "hidden" }).append(Selectize.$testInput).appendTo("body")), Selectize.$testInput.text(t), transferStyles(e, Selectize.$testInput, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]), Selectize.$testInput.width()) : 0 },
        autoGrow = function(s) {
            function t(t, e) {
                var n, i, o;
                e = e || {}, (t = t || window.event || {}).metaKey || t.altKey || !e.force && !1 === s.data("grow") || (e = s.val(), t.type && "keydown" === t.type.toLowerCase() && (n = 48 <= (i = t.keyCode) && i <= 57 || 65 <= i && i <= 90 || 96 <= i && i <= 111 || 186 <= i && i <= 222 || 32 === i, i === KEY_DELETE || i === KEY_BACKSPACE ? (o = getInputSelection(s[0])).length ? e = e.substring(0, o.start) + e.substring(o.start + o.length) : i === KEY_BACKSPACE && o.start ? e = e.substring(0, o.start - 1) + e.substring(o.start + 1) : i === KEY_DELETE && void 0 !== o.start && (e = e.substring(0, o.start) + e.substring(o.start + 1)) : n && (i = t.shiftKey, o = String.fromCharCode(t.keyCode), e += o = i ? o.toUpperCase() : o.toLowerCase())), t = (n = s.attr("placeholder")) ? measureString(n, s) + 4 : 0, (i = Math.max(measureString(e, s), t) + 4) === r) || (r = i, s.width(i), s.triggerHandler("resize"))
            }
            var r = null;
            s.on("keydown keyup update blur", t), t()
        },
        domToString = function(t) { var e = document.createElement("div"); return e.appendChild(t.cloneNode(!0)), e.innerHTML },
        logError = function(t, e) {
            e = e || {};
            console.error("Selectize: " + t), e.explanation && (console.group && console.group(), console.error(e.explanation), console.group) && console.groupEnd()
        },
        isJSON = function(t) { try { JSON.parse(str) } catch (t) { return !1 } return !0 },
        Selectize = function(t, e) {
            var n, i, o = this,
                s = t[0],
                r = (s.selectize = o, window.getComputedStyle && window.getComputedStyle(s, null));
            if (r = (r ? r.getPropertyValue("direction") : s.currentStyle && s.currentStyle.direction) || t.parents("[dir]:first").attr("dir") || "", $.extend(o, { order: 0, settings: e, $input: t, tabIndex: t.attr("tabindex") || "", tagType: "select" === s.tagName.toLowerCase() ? TAG_SELECT : TAG_INPUT, rtl: /rtl/i.test(r), eventNS: ".selectize" + ++Selectize.count, highlightedValue: null, isBlurring: !1, isOpen: !1, isDisabled: !1, isRequired: t.is("[required]"), isInvalid: !1, isLocked: !1, isFocused: !1, isInputHidden: !1, isSetup: !1, isShiftDown: !1, isCmdDown: !1, isCtrlDown: !1, ignoreFocus: !1, ignoreBlur: !1, ignoreHover: !1, hasOptions: !1, currentResults: null, lastValue: "", lastValidValue: "", lastOpenTarget: !1, caretPos: 0, loading: 0, loadedSearches: {}, isDropdownClosing: !1, $activeOption: null, $activeItems: [], optgroups: {}, options: {}, userOptions: {}, items: [], renderCache: {}, onSearchChange: null === e.loadThrottle ? o.onSearchChange : debounce(o.onSearchChange, e.loadThrottle) }), o.sifter = new Sifter(this.options, { diacritics: e.diacritics }), o.settings.options) {
                for (n = 0, i = o.settings.options.length; n < i; n++) o.registerOption(o.settings.options[n]);
                delete o.settings.options
            }
            if (o.settings.optgroups) {
                for (n = 0, i = o.settings.optgroups.length; n < i; n++) o.registerOptionGroup(o.settings.optgroups[n]);
                delete o.settings.optgroups
            }
            o.settings.mode = o.settings.mode || (1 === o.settings.maxItems ? "single" : "multi"), "boolean" != typeof o.settings.hideSelected && (o.settings.hideSelected = "multi" === o.settings.mode), o.initializePlugins(o.settings.plugins), o.setupCallbacks(), o.setupTemplates(), o.setup()
        };
    MicroEvent.mixin(Selectize), MicroPlugin.mixin(Selectize), $.extend(Selectize.prototype, {
        setup: function() {
            var e = this,
                t = e.settings,
                n = e.eventNS,
                i = $(window),
                o = $(document),
                s = e.$input,
                r = e.settings.mode,
                a = s.attr("class") || "",
                l = $("<div>").addClass(t.wrapperClass).addClass(a + " selectize-control").addClass(r),
                p = $("<div>").addClass(t.inputClass + " selectize-input items").appendTo(l),
                c = $('<input type="select-one" autocomplete="new-password" autofill="no" />').appendTo(p).attr("tabindex", s.is(":disabled") ? "-1" : e.tabIndex),
                u = $(t.dropdownParent || l),
                r = $("<div>").addClass(t.dropdownClass).addClass(r + " selectize-dropdown").hide().appendTo(u),
                u = $("<div>").addClass(t.dropdownContentClass + " selectize-dropdown-content").attr("tabindex", "-1").appendTo(r),
                d = ((d = s.attr("id")) && (c.attr("id", d + "-selectized"), $("label[for='" + d + "']").attr("for", d + "-selectized")), e.settings.copyClassesToDropdown && r.addClass(a), l.css({ width: s[0].style.width }), e.plugins.names.length && (d = "plugin-" + e.plugins.names.join(" plugin-"), l.addClass(d), r.addClass(d)), (null === t.maxItems || 1 < t.maxItems) && e.tagType === TAG_SELECT && s.attr("multiple", "multiple"), e.settings.placeholder && c.attr("placeholder", t.placeholder), e.settings.search || (c.attr("readonly", !0), c.attr("inputmode", "none"), p.css("cursor", "pointer")), !e.settings.splitOn && e.settings.delimiter && (a = e.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), e.settings.splitOn = new RegExp("\\s*" + a + "+\\s*")), s.attr("autocorrect") && c.attr("autocorrect", s.attr("autocorrect")), s.attr("autocapitalize") && c.attr("autocapitalize", s.attr("autocapitalize")), s.is("input") && (c[0].type = s[0].type), e.$wrapper = l, e.$control = p, e.$control_input = c, e.$dropdown = r, e.$dropdown_content = u, r.on("mouseenter mousedown mouseup click", "[data-disabled]>[data-selectable]", function(t) { t.stopImmediatePropagation() }), r.on("mouseenter", "[data-selectable]", function() { return e.onOptionHover.apply(e, arguments) }), r.on("mouseup click", "[data-selectable]", function() { return e.onOptionSelect.apply(e, arguments) }), watchChildEvent(p, "mouseup", "*:not(input)", function() { return e.onItemSelect.apply(e, arguments) }), autoGrow(c), p.on({ mousedown: function() { return e.onMouseDown.apply(e, arguments) }, click: function() { return e.onClick.apply(e, arguments) } }), c.on({ mousedown: function(t) { "" === e.$control_input.val() && !e.settings.openOnFocus || t.stopPropagation() }, keydown: function() { return e.onKeyDown.apply(e, arguments) }, keypress: function() { return e.onKeyPress.apply(e, arguments) }, input: function() { return e.onInput.apply(e, arguments) }, resize: function() { e.positionDropdown.apply(e, []) }, focus: function() { return e.ignoreBlur = !1, e.onFocus.apply(e, arguments) }, paste: function() { return e.onPaste.apply(e, arguments) } }), o.on("keydown" + n, function(t) { e.isCmdDown = t[IS_MAC ? "metaKey" : "ctrlKey"], e.isCtrlDown = t[IS_MAC ? "altKey" : "ctrlKey"], e.isShiftDown = t.shiftKey }), o.on("keyup" + n, function(t) { t.keyCode === KEY_CTRL && (e.isCtrlDown = !1), t.keyCode === KEY_SHIFT && (e.isShiftDown = !1), t.keyCode === KEY_CMD && (e.isCmdDown = !1) }), o.on("mousedown" + n, function(t) {
                    if (e.isFocused) {
                        if (t.target === e.$dropdown[0] || t.target.parentNode === e.$dropdown[0]) return !1;
                        e.$dropdown.has(t.target).length || t.target === e.$control[0] || e.blur(t.target)
                    }
                }), i.on(["scroll" + n, "resize" + n].join(" "), function() { e.isOpen && e.positionDropdown.apply(e, arguments) }), i.on("mousemove" + n, function() { e.ignoreHover = e.settings.ignoreHover }), $("<div></div>")),
                a = s.children().detach();
            s.replaceWith(d), d.replaceWith(s), this.revertSettings = { $children: a, tabindex: s.attr("tabindex") }, s.attr("tabindex", -1).hide().after(e.$wrapper), Array.isArray(t.items) && (e.lastValidValue = t.items, e.setValue(t.items), delete t.items), SUPPORTS_VALIDITY_API && s.on("invalid" + n, function(t) { t.preventDefault(), e.isInvalid = !0, e.refreshState() }), e.updateOriginalInput(), e.refreshItems(), e.refreshState(), e.updatePlaceholder(), e.isSetup = !0, s.is(":disabled") && e.disable(), e.on("change", this.onChange), s.data("selectize", e), s.addClass("selectized"), e.trigger("initialize"), !0 === t.preload && e.onSearchChange("")
        },
        setupTemplates: function() {
            var t = this,
                i = t.settings.labelField,
                o = t.settings.valueField,
                n = t.settings.optgroupLabelField;
            t.settings.render = $.extend({}, { optgroup: function(t) { return '<div class="optgroup">' + t.html + "</div>" }, optgroup_header: function(t, e) { return '<div class="optgroup-header">' + e(t[n]) + "</div>" }, option: function(t, e) { var n = t.classes ? " " + t.classes : ""; return n += "" === t[o] ? " selectize-dropdown-emptyoptionlabel" : "", "<div" + (t.styles ? ' style="' + t.styles + '"' : "") + ' class="option' + n + '">' + e(t[i]) + "</div>" }, item: function(t, e) { return '<div class="item">' + e(t[i]) + "</div>" }, option_create: function(t, e) { return '<div class="create">Add <strong>' + e(t.input) + "</strong>&#x2026;</div>" } }, t.settings.render)
        },
        setupCallbacks: function() { var t, e, n = { initialize: "onInitialize", change: "onChange", item_add: "onItemAdd", item_remove: "onItemRemove", clear: "onClear", option_add: "onOptionAdd", option_remove: "onOptionRemove", option_clear: "onOptionClear", optgroup_add: "onOptionGroupAdd", optgroup_remove: "onOptionGroupRemove", optgroup_clear: "onOptionGroupClear", dropdown_open: "onDropdownOpen", dropdown_close: "onDropdownClose", type: "onType", load: "onLoad", focus: "onFocus", blur: "onBlur", dropdown_item_activate: "onDropdownItemActivate", dropdown_item_deactivate: "onDropdownItemDeactivate" }; for (t in n) n.hasOwnProperty(t) && (e = this.settings[n[t]]) && this.on(t, e) },
        onClick: function(t) { this.isDropdownClosing || this.isFocused && this.isOpen || (this.focus(), t.preventDefault()) },
        onMouseDown: function(t) {
            var e = this,
                n = t.isDefaultPrevented();
            $(t.target);
            if (e.isFocused || n || window.setTimeout(function() { e.focus() }, 0), t.target !== e.$control_input[0] || "" === e.$control_input.val()) return "single" === e.settings.mode ? e.isOpen ? e.close() : e.open() : (n || e.setActiveItem(null), e.settings.openOnFocus || (e.isOpen && t.target === e.lastOpenTarget ? (e.close(), e.lastOpenTarget = !1) : (e.isOpen || (e.refreshOptions(), e.open()), e.lastOpenTarget = t.target))), !1
        },
        onChange: function() { "" !== this.getValue() && (this.lastValidValue = this.getValue()), this.$input.trigger("input"), this.$input.trigger("change") },
        onPaste: function(t) {
            var o = this;
            o.isFull() || o.isInputHidden || o.isLocked ? t.preventDefault() : o.settings.splitOn && setTimeout(function() {
                var t = o.$control_input.val();
                if (t.match(o.settings.splitOn))
                    for (var e = t.trim().split(o.settings.splitOn), n = 0, i = e.length; n < i; n++) o.createItem(e[n])
            }, 0)
        },
        onKeyPress: function(t) { var e; return this.isLocked ? t && t.preventDefault() : (e = String.fromCharCode(t.keyCode || t.which), this.settings.create && "multi" === this.settings.mode && e === this.settings.delimiter ? (this.createItem(), t.preventDefault(), !1) : void 0) },
        onKeyDown: function(t) {
            t.target, this.$control_input[0];
            var e, n = this;
            if (n.isLocked) t.keyCode !== KEY_TAB && t.preventDefault();
            else {
                switch (t.keyCode) {
                    case KEY_A:
                        if (n.isCmdDown) return void n.selectAll();
                        break;
                    case KEY_ESC:
                        return void(n.isOpen && (t.preventDefault(), t.stopPropagation(), n.close()));
                    case KEY_N:
                        if (!t.ctrlKey || t.altKey) break;
                    case KEY_DOWN:
                        return !n.isOpen && n.hasOptions ? n.open() : n.$activeOption && (n.ignoreHover = !0, (e = n.getAdjacentOption(n.$activeOption, 1)).length) && n.setActiveOption(e, !0, !0), void t.preventDefault();
                    case KEY_P:
                        if (!t.ctrlKey || t.altKey) break;
                    case KEY_UP:
                        return n.$activeOption && (n.ignoreHover = !0, (e = n.getAdjacentOption(n.$activeOption, -1)).length) && n.setActiveOption(e, !0, !0), void t.preventDefault();
                    case KEY_RETURN:
                        return void(n.isOpen && n.$activeOption && (n.onOptionSelect({ currentTarget: n.$activeOption }), t.preventDefault()));
                    case KEY_LEFT:
                        return void n.advanceSelection(-1, t);
                    case KEY_RIGHT:
                        return void n.advanceSelection(1, t);
                    case KEY_TAB:
                        return n.settings.selectOnTab && n.isOpen && n.$activeOption && (n.onOptionSelect({ currentTarget: n.$activeOption }), n.isFull() || t.preventDefault()), void(n.settings.create && n.createItem() && n.settings.showAddOptionOnCreate && t.preventDefault());
                    case KEY_BACKSPACE:
                    case KEY_DELETE:
                        return void n.deleteSelection(t)
                }!n.isFull() && !n.isInputHidden || (IS_MAC ? t.metaKey : t.ctrlKey) || t.preventDefault()
            }
        },
        onInput: function(t) {
            var e = this,
                n = e.$control_input.val() || "";
            e.lastValue !== n && (e.lastValue = n, e.onSearchChange(n), e.refreshOptions(), e.trigger("type", n))
        },
        onSearchChange: function(e) {
            var n = this,
                i = n.settings.load;
            i && !n.loadedSearches.hasOwnProperty(e) && (n.loadedSearches[e] = !0, n.load(function(t) { i.apply(n, [e, t]) }))
        },
        onFocus: function(t) {
            var e = this,
                n = e.isFocused;
            if (e.isDisabled) return e.blur(), t && t.preventDefault(), !1;
            e.ignoreFocus || (e.isFocused = !0, "focus" === e.settings.preload && e.onSearchChange(""), n || e.trigger("focus"), e.$activeItems.length || (e.showInput(), e.setActiveItem(null), e.refreshOptions(!!e.settings.openOnFocus)), e.refreshState())
        },
        onBlur: function(t, e) {
            var n, i = this;
            i.isFocused && (i.isFocused = !1, i.ignoreFocus || (n = function() { i.close(), i.setTextboxValue(""), i.setActiveItem(null), i.setActiveOption(null), i.setCaret(i.items.length), i.refreshState(), e && e.focus && e.focus(), i.isBlurring = !1, i.ignoreFocus = !1, i.trigger("blur") }, i.isBlurring = !0, i.ignoreFocus = !0, i.settings.create && i.settings.createOnBlur ? i.createItem(null, !1, n) : n()))
        },
        onOptionHover: function(t) { this.ignoreHover || this.setActiveOption(t.currentTarget, !1) },
        onOptionSelect: function(t) {
            var e, n = this;
            t.preventDefault && (t.preventDefault(), t.stopPropagation()), (e = $(t.currentTarget)).hasClass("create") ? n.createItem(null, function() { n.settings.closeAfterSelect && n.close() }) : void 0 !== (e = e.attr("data-value")) && (n.lastQuery = null, n.setTextboxValue(""), n.addItem(e), n.settings.closeAfterSelect ? n.close() : !n.settings.hideSelected && t.type && /mouse/.test(t.type) && n.setActiveOption(n.getOption(e)))
        },
        onItemSelect: function(t) { this.isLocked || "multi" === this.settings.mode && (t.preventDefault(), this.setActiveItem(t.currentTarget, t)) },
        load: function(t) {
            var e = this,
                n = e.$wrapper.addClass(e.settings.loadingClass);
            e.loading++, t.apply(e, [function(t) { e.loading = Math.max(e.loading - 1, 0), t && t.length && (e.addOption(t), e.refreshOptions(e.isFocused && !e.isInputHidden)), e.loading || n.removeClass(e.settings.loadingClass), e.trigger("load", t) }])
        },
        getTextboxValue: function() { return this.$control_input.val() },
        setTextboxValue: function(t) {
            var e = this.$control_input;
            e.val() !== t && (e.val(t).triggerHandler("update"), this.lastValue = t)
        },
        getValue: function() { return this.tagType === TAG_SELECT && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter) },
        setValue: function(t, e) {
            (Array.isArray(t) ? t : [t]).join("") !== this.items.join("") && debounce_events(this, e ? [] : ["change"], function() { this.clear(e), this.addItems(t, e) })
        },
        setMaxItems: function(t) { this.settings.maxItems = t = 0 === t ? null : t, this.settings.mode = this.settings.mode || (1 === this.settings.maxItems ? "single" : "multi"), this.refreshState() },
        setActiveItem: function(t, e) {
            var n, i, o, s, r, a, l = this;
            if ("single" !== l.settings.mode)
                if ((t = $(t)).length) {
                    if ("mousedown" === (n = e && e.type.toLowerCase()) && l.isShiftDown && l.$activeItems.length) {
                        for (a = l.$control.children(".active:last"), a = Array.prototype.indexOf.apply(l.$control[0].childNodes, [a[0]]), (o = Array.prototype.indexOf.apply(l.$control[0].childNodes, [t[0]])) < a && (r = a, a = o, o = r), i = a; i <= o; i++) s = l.$control[0].childNodes[i], -1 === l.$activeItems.indexOf(s) && ($(s).addClass("active"), l.$activeItems.push(s));
                        e.preventDefault()
                    } else "mousedown" === n && l.isCtrlDown || "keydown" === n && this.isShiftDown ? t.hasClass("active") ? (r = l.$activeItems.indexOf(t[0]), l.$activeItems.splice(r, 1), t.removeClass("active")) : l.$activeItems.push(t.addClass("active")[0]) : ($(l.$activeItems).removeClass("active"), l.$activeItems = [t.addClass("active")[0]]);
                    l.hideInput(), this.isFocused || l.focus()
                } else $(l.$activeItems).removeClass("active"), l.$activeItems = [], l.isFocused && l.showInput()
        },
        setActiveOption: function(t, e, n) {
            var i, o, s, r, a = this;
            a.$activeOption && (a.$activeOption.removeClass("active"), a.trigger("dropdown_item_deactivate", a.$activeOption.attr("data-value"))), a.$activeOption = null, (t = $(t)).length && (a.$activeOption = t.addClass("active"), a.isOpen && a.trigger("dropdown_item_activate", a.$activeOption.attr("data-value")), !e && isset(e) || (t = a.$dropdown_content.height(), i = a.$activeOption.outerHeight(!0), e = a.$dropdown_content.scrollTop() || 0, r = (s = o = a.$activeOption.offset().top - a.$dropdown_content.offset().top + e) - t + i, t + e < o + i ? a.$dropdown_content.stop().animate({ scrollTop: r }, n ? a.settings.scrollDuration : 0) : o < e && a.$dropdown_content.stop().animate({ scrollTop: s }, n ? a.settings.scrollDuration : 0)))
        },
        selectAll: function() { var t = this; "single" !== t.settings.mode && (t.$activeItems = Array.prototype.slice.apply(t.$control.children(":not(input)").addClass("active")), t.$activeItems.length && (t.hideInput(), t.close()), t.focus()) },
        hideInput: function() { this.setTextboxValue(""), this.$control_input.css({ opacity: 0, position: "absolute", left: this.rtl ? 1e4 : 0 }), this.isInputHidden = !0 },
        showInput: function() { this.$control_input.css({ opacity: 1, position: "relative", left: 0 }), this.isInputHidden = !1 },
        focus: function() { var t = this; return t.isDisabled || (t.ignoreFocus = !0, t.$control_input[0].focus(), window.setTimeout(function() { t.ignoreFocus = !1, t.onFocus() }, 0)), t },
        blur: function(t) { return this.$control_input[0].blur(), this.onBlur(null, t), this },
        getScoreFunction: function(t) { return this.sifter.getScoreFunction(t, this.getSearchOptions()) },
        getSearchOptions: function() {
            var t = this.settings,
                e = t.sortField;
            return { fields: t.searchField, conjunction: t.searchConjunction, sort: e = "string" == typeof e ? [{ field: e }] : e, nesting: t.nesting, filter: t.filter, respect_word_boundaries: t.respect_word_boundaries }
        },
        search: function(t) {
            var e, n, i, o = this,
                s = o.settings,
                r = this.getSearchOptions();
            if (s.score && "function" != typeof(i = o.settings.score.apply(this, [t]))) throw new Error('Selectize "score" setting must be a function that returns a function');
            if (t !== o.lastQuery ? (s.normalize && (t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "")), o.lastQuery = t, n = o.sifter.search(t, $.extend(r, { score: i })), o.currentResults = n) : n = $.extend(!0, {}, o.currentResults), s.hideSelected)
                for (e = n.items.length - 1; 0 <= e; e--) - 1 !== o.items.indexOf(hash_key(n.items[e].id)) && n.items.splice(e, 1);
            return n
        },
        refreshOptions: function(t) {
            void 0 === t && (t = !0);
            var e, n, i, o, s, r, a, l, p, c, u, d, h, g = this,
                f = g.$control_input.val().trim(),
                v = g.search(f),
                m = g.$dropdown_content,
                y = g.$activeOption && hash_key(g.$activeOption.attr("data-value")),
                w = v.items.length;
            for ("number" == typeof g.settings.maxOptions && (w = Math.min(w, g.settings.maxOptions)), o = {}, s = [], e = 0; e < w; e++)
                for (r = g.options[v.items[e].id], a = g.render("option", r), O = r[g.settings.optgroupField] || "", n = 0, i = (l = Array.isArray(O) ? O : [O]) && l.length; n < i; n++) {
                    var C, O = l[n];
                    g.optgroups.hasOwnProperty(O) || "function" != typeof g.settings.optionGroupRegister || (C = g.settings.optionGroupRegister.apply(g, [O])) && g.registerOptionGroup(C), g.optgroups.hasOwnProperty(O) || (O = ""), o.hasOwnProperty(O) || (o[O] = document.createDocumentFragment(), s.push(O)), o[O].appendChild(a)
                }
            for (this.settings.lockOptgroupOrder && s.sort(function(t, e) { return (g.optgroups[t] && g.optgroups[t].$order || 0) - (g.optgroups[e] && g.optgroups[e].$order || 0) }), p = document.createDocumentFragment(), e = 0, w = s.length; e < w; e++) g.optgroups.hasOwnProperty(O = s[e]) && o[O].childNodes.length ? ((c = document.createDocumentFragment()).appendChild(g.render("optgroup_header", g.optgroups[O])), c.appendChild(o[O]), p.appendChild(g.render("optgroup", $.extend({}, g.optgroups[O], { html: domToString(c), dom: c })))) : p.appendChild(o[O]);
            if (m.html(p), g.settings.highlight && (m.removeHighlight(), v.query.length) && v.tokens.length)
                for (e = 0, w = v.tokens.length; e < w; e++) highlight(m, v.tokens[e].regex);
            if (!g.settings.hideSelected)
                for (g.$dropdown.find(".selected").removeClass("selected"), e = 0, w = g.items.length; e < w; e++) g.getOption(g.items[e]).addClass("selected");
            "auto" !== g.settings.dropdownSize.sizeType && g.isOpen && g.setupDropdownHeight(), (u = g.canCreate(f)) && g.settings.showAddOptionOnCreate && (m.prepend(g.render("option_create", { input: f })), h = $(m[0].childNodes[0])), g.hasOptions = 0 < v.items.length || u && g.settings.showAddOptionOnCreate || g.settings.setFirstOptionActive, g.hasOptions ? (0 < v.items.length ? (f = y && g.getOption(y), "" !== v.query && g.settings.setFirstOptionActive ? d = m.find("[data-selectable]:first") : "" !== v.query && f && f.length ? d = f : "single" === g.settings.mode && g.items.length && (d = g.getOption(g.items[0])), d && d.length || (d = h && !g.settings.addPrecedence ? g.getAdjacentOption(h, 1) : m.find("[data-selectable]:first"))) : d = h, g.setActiveOption(d), t && !g.isOpen && g.open()) : (g.setActiveOption(null), t && g.isOpen && g.close())
        },
        addOption: function(t) {
            var e, n, i, o = this;
            if (Array.isArray(t))
                for (e = 0, n = t.length; e < n; e++) o.addOption(t[e]);
            else(i = o.registerOption(t)) && (o.userOptions[i] = !0, o.lastQuery = null, o.trigger("option_add", i, t))
        },
        registerOption: function(t) { var e = hash_key(t[this.settings.valueField]); return null != e && !this.options.hasOwnProperty(e) && (t.$order = t.$order || ++this.order, this.options[e] = t, e) },
        registerOptionGroup: function(t) { var e = hash_key(t[this.settings.optgroupValueField]); return !!e && (t.$order = t.$order || ++this.order, this.optgroups[e] = t, e) },
        addOptionGroup: function(t, e) { e[this.settings.optgroupValueField] = t, (t = this.registerOptionGroup(e)) && this.trigger("optgroup_add", t, e) },
        removeOptionGroup: function(t) { this.optgroups.hasOwnProperty(t) && (delete this.optgroups[t], this.renderCache = {}, this.trigger("optgroup_remove", t)) },
        clearOptionGroups: function() { this.optgroups = {}, this.renderCache = {}, this.trigger("optgroup_clear") },
        updateOption: function(t, e) {
            var n, i, o, s = this;
            if (t = hash_key(t), n = hash_key(e[s.settings.valueField]), null !== t && s.options.hasOwnProperty(t)) {
                if ("string" != typeof n) throw new Error("Value must be set in option data");
                o = s.options[t].$order, n !== t && (delete s.options[t], -1 !== (i = s.items.indexOf(t))) && s.items.splice(i, 1, n), e.$order = e.$order || o, s.options[n] = e, i = s.renderCache.item, o = s.renderCache.option, i && (delete i[t], delete i[n]), o && (delete o[t], delete o[n]), -1 !== s.items.indexOf(n) && (i = s.getItem(t), o = $(s.render("item", e)), i.hasClass("active") && o.addClass("active"), i.replaceWith(o)), s.lastQuery = null, s.isOpen && s.refreshOptions(!1)
            }
        },
        removeOption: function(t, e) {
            var n = this,
                i = (t = hash_key(t), n.renderCache.item),
                o = n.renderCache.option;
            i && delete i[t], o && delete o[t], delete n.userOptions[t], delete n.options[t], n.lastQuery = null, n.trigger("option_remove", t), n.removeItem(t, e)
        },
        clearOptions: function(t) {
            var n = this,
                i = (n.loadedSearches = {}, n.userOptions = {}, n.renderCache = {}, n.options);
            $.each(n.options, function(t, e) {-1 == n.items.indexOf(t) && delete i[t] }), n.options = n.sifter.items = i, n.lastQuery = null, n.trigger("option_clear"), n.clear(t)
        },
        getOption: function(t) { return this.getElementWithValue(t, this.$dropdown_content.find("[data-selectable]")) },
        getFirstOption: function() { var t = this.$dropdown.find("[data-selectable]"); return 0 < t.length ? t.eq(0) : $() },
        getAdjacentOption: function(t, e) {
            var n = this.$dropdown.find("[data-selectable]"),
                t = n.index(t) + e;
            return 0 <= t && t < n.length ? n.eq(t) : $()
        },
        getElementWithValue: function(t, e) {
            if (null != (t = hash_key(t)))
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n].getAttribute("data-value") === t) return $(e[n]);
            return $()
        },
        getElementWithTextContent: function(t, e, n) {
            if (null != (t = hash_key(t)))
                for (var i = 0, o = n.length; i < o; i++) { var s = n[i].textContent; if (1 == e && (s = null !== s ? s.toLowerCase() : null, t = t.toLowerCase()), s === t) return $(n[i]) }
            return $()
        },
        getItem: function(t) { return this.getElementWithValue(t, this.$control.children()) },
        getFirstItemMatchedByTextContent: function(t, e) { return this.getElementWithTextContent(t, e = null !== e && !0 === e, this.$dropdown_content.find("[data-selectable]")) },
        addItems: function(t, e) {
            this.buffer = document.createDocumentFragment();
            for (var n = this.$control[0].childNodes, i = 0; i < n.length; i++) this.buffer.appendChild(n[i]);
            for (var o = Array.isArray(t) ? t : [t], i = 0, s = o.length; i < s; i++) this.isPending = i < s - 1, this.addItem(o[i], e);
            t = this.$control[0];
            t.insertBefore(this.buffer, t.firstChild), this.buffer = null
        },
        addItem: function(s, r) {
            debounce_events(this, r ? [] : ["change"], function() {
                var t, e, n, i = this,
                    o = i.settings.mode;
                s = hash_key(s), -1 !== i.items.indexOf(s) ? "single" === o && i.close() : i.options.hasOwnProperty(s) && ("single" === o && i.clear(r), "multi" === o && i.isFull() || (t = $(i.render("item", i.options[s])), n = i.isFull(), i.items.splice(i.caretPos, 0, s), i.insertAtCaret(t), i.isPending && (n || !i.isFull()) || i.refreshState(), i.isSetup && (n = i.$dropdown_content.find("[data-selectable]"), i.isPending || (e = i.getOption(s), e = i.getAdjacentOption(e, 1).attr("data-value"), i.refreshOptions(i.isFocused && "single" !== o), e && i.setActiveOption(i.getOption(e))), !n.length || i.isFull() ? i.close() : i.isPending || i.positionDropdown(), i.updatePlaceholder(), i.trigger("item_add", s, t), i.isPending || i.updateOriginalInput({ silent: r }))))
            })
        },
        removeItem: function(t, e) {
            var n, i, o = this,
                s = t instanceof $ ? t : o.getItem(t);
            t = hash_key(s.attr("data-value")), -1 !== (n = o.items.indexOf(t)) && (o.trigger("item_before_remove", t, s), s.remove(), s.hasClass("active") && (s.removeClass("active"), i = o.$activeItems.indexOf(s[0]), o.$activeItems.splice(i, 1), s.removeClass("active")), o.items.splice(n, 1), o.lastQuery = null, !o.settings.persist && o.userOptions.hasOwnProperty(t) && o.removeOption(t, e), n < o.caretPos && o.setCaret(o.caretPos - 1), o.refreshState(), o.updatePlaceholder(), o.updateOriginalInput({ silent: e }), o.positionDropdown(), o.trigger("item_remove", t, s))
        },
        createItem: function(t, n) {
            var i = this,
                o = i.caretPos,
                s = (t = t || (i.$control_input.val() || "").trim(), arguments[arguments.length - 1]);
            if ("function" != typeof s && (s = function() {}), "boolean" != typeof n && (n = !0), !i.canCreate(t)) return s(), !1;
            i.lock();
            var e = "function" == typeof i.settings.create ? this.settings.create : function(t) {
                    var e = {},
                        t = e[i.settings.labelField] = t;
                    if (!i.settings.formatValueToKey || "function" != typeof i.settings.formatValueToKey || null != (t = i.settings.formatValueToKey.apply(this, [t])) && "object" != typeof t && "function" != typeof t) return e[i.settings.valueField] = t, e;
                    throw new Error('Selectize "formatValueToKey" setting must be a function that returns a value other than object or function.')
                },
                r = once(function(t) { var e; return i.unlock(), !t || "object" != typeof t || "string" != typeof(e = hash_key(t[i.settings.valueField])) ? s() : (i.setTextboxValue(""), i.addOption(t), i.setCaret(o), i.addItem(e), i.refreshOptions(n && "single" !== i.settings.mode), void s(t)) }),
                e = e.apply(this, [t, r]);
            return void 0 !== e && r(e), !0
        },
        refreshItems: function(t) { this.lastQuery = null, this.isSetup && this.addItem(this.items, t), this.refreshState(), this.updateOriginalInput({ silent: t }) },
        refreshState: function() { this.refreshValidityState(), this.refreshClasses() },
        refreshValidityState: function() {
            if (!this.isRequired) return !1;
            var t = !this.items.length;
            this.isInvalid = t, this.$control_input.prop("required", t), this.$input.prop("required", !t)
        },
        refreshClasses: function() {
            var t = this,
                e = t.isFull(),
                n = t.isLocked;
            t.$wrapper.toggleClass("rtl", t.rtl), t.$control.toggleClass("focus", t.isFocused).toggleClass("disabled", t.isDisabled).toggleClass("required", t.isRequired).toggleClass("invalid", t.isInvalid).toggleClass("locked", n).toggleClass("full", e).toggleClass("not-full", !e).toggleClass("input-active", t.isFocused && !t.isInputHidden).toggleClass("dropdown-active", t.isOpen).toggleClass("has-options", !$.isEmptyObject(t.options)).toggleClass("has-items", 0 < t.items.length), t.$control_input.data("grow", !e && !n)
        },
        isFull: function() { return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems },
        updateOriginalInput: function(t) {
            var e, n, i, o, s, r, a = this;
            t = t || {}, a.tagType === TAG_SELECT ? (o = a.$input.find("option"), e = [], n = [], i = [], r = [], o.get().forEach(function(t) { e.push(t.value) }), a.items.forEach(function(t) { s = a.options[t][a.settings.labelField] || "", r.push(t), -1 == e.indexOf(t) && n.push('<option value="' + escape_html(t) + '" selected="selected">' + escape_html(s) + "</option>") }), i = e.filter(function(t) { return r.indexOf(t) < 0 }).map(function(t) { return 'option[value="' + t + '"]' }), e.length - i.length + n.length !== 0 || a.$input.attr("multiple") || n.push('<option value="" selected="selected"></option>'), a.$input.find(i.join(", ")).remove(), a.$input.append(n.join(""))) : (a.$input.val(a.getValue()), a.$input.attr("value", a.$input.val())), a.isSetup && !t.silent && a.trigger("change", a.$input.val())
        },
        updatePlaceholder: function() {
            var t;
            this.settings.placeholder && (t = this.$control_input, this.items.length ? t.removeAttr("placeholder") : t.attr("placeholder", this.settings.placeholder), t.triggerHandler("update", { force: !0 }))
        },
        open: function() {
            var t = this;
            t.isLocked || t.isOpen || "multi" === t.settings.mode && t.isFull() || (t.focus(), t.isOpen = !0, t.refreshState(), t.$dropdown.css({ visibility: "hidden", display: "block" }), t.setupDropdownHeight(), t.positionDropdown(), t.$dropdown.css({ visibility: "visible" }), t.trigger("dropdown_open", t.$dropdown))
        },
        close: function() {
            var t = this,
                e = t.isOpen;
            "single" === t.settings.mode && t.items.length && (t.hideInput(), t.isBlurring) && t.$control_input[0].blur(), t.isOpen = !1, t.$dropdown.hide(), t.setActiveOption(null), t.refreshState(), e && t.trigger("dropdown_close", t.$dropdown)
        },
        positionDropdown: function() {
            var t = this.$control,
                e = "body" === this.settings.dropdownParent ? t.offset() : t.position(),
                t = (e.top += t.outerHeight(!0), t[0].getBoundingClientRect().width);
            this.settings.minWidth && this.settings.minWidth > t && (t = this.settings.minWidth), this.$dropdown.css({ width: t, top: e.top, left: e.left })
        },
        setupDropdownHeight: function() {
            if ("object" == typeof this.settings.dropdownSize && "auto" !== this.settings.dropdownSize.sizeType) {
                var t = this.settings.dropdownSize.sizeValue;
                if ("numberItems" === this.settings.dropdownSize.sizeType) {
                    for (var e = this.$dropdown_content.find("*").not(".optgroup, .highlight").not(this.settings.ignoreOnDropwdownHeight), n = 0, i = 0, o = 0, s = 0, r = 0; r < t; r++) {
                        var a = $(e[r]);
                        if (0 === a.length) break;
                        n += a.outerHeight(!0), void 0 === a.data("selectable") && (a.hasClass("optgroup-header") && (a = window.getComputedStyle(a.parent()[0], ":before")) && (i = a.marginTop ? Number(a.marginTop.replace(/\W*(\w)\w*/g, "$1")) : 0, o = a.marginBottom ? Number(a.marginBottom.replace(/\W*(\w)\w*/g, "$1")) : 0, s = a.borderTopWidth ? Number(a.borderTopWidth.replace(/\W*(\w)\w*/g, "$1")) : 0), t++)
                    }
                    t = n + (this.$dropdown_content.css("padding-top") ? Number(this.$dropdown_content.css("padding-top").replace(/\W*(\w)\w*/g, "$1")) : 0) + (this.$dropdown_content.css("padding-bottom") ? Number(this.$dropdown_content.css("padding-bottom").replace(/\W*(\w)\w*/g, "$1")) : 0) + i + o + s + "px"
                } else if ("fixedHeight" !== this.settings.dropdownSize.sizeType) return void console.warn('Selectize.js - Value of "sizeType" must be "fixedHeight" or "numberItems');
                this.$dropdown_content.css({ height: t, maxHeight: "none" })
            }
        },
        clear: function(t) {
            var e = this;
            e.items.length && (e.$control.children(":not(input)").remove(), e.items = [], e.lastQuery = null, e.setCaret(0), e.setActiveItem(null), e.updatePlaceholder(), e.updateOriginalInput({ silent: t }), e.refreshState(), e.showInput(), e.trigger("clear"))
        },
        insertAtCaret: function(t) {
            var e = Math.min(this.caretPos, this.items.length),
                t = t[0],
                n = this.buffer || this.$control[0];
            0 === e ? n.insertBefore(t, n.firstChild) : n.insertBefore(t, n.childNodes[e]), this.setCaret(e + 1)
        },
        deleteSelection: function(t) {
            var e, n, i, o, s, r = this,
                a = t && t.keyCode === KEY_BACKSPACE ? -1 : 1,
                l = getInputSelection(r.$control_input[0]);
            if (r.$activeOption && !r.settings.hideSelected && (o = ("string" == typeof r.settings.deselectBehavior && "top" === r.settings.deselectBehavior ? r.getFirstOption() : r.getAdjacentOption(r.$activeOption, -1)).attr("data-value")), i = [], r.$activeItems.length) {
                for (s = r.$control.children(".active:" + (0 < a ? "last" : "first")), s = r.$control.children(":not(input)").index(s), 0 < a && s++, e = 0, n = r.$activeItems.length; e < n; e++) i.push($(r.$activeItems[e]).attr("data-value"));
                t && (t.preventDefault(), t.stopPropagation())
            } else(r.isFocused || "single" === r.settings.mode) && r.items.length && (a < 0 && 0 === l.start && 0 === l.length ? i.push(r.items[r.caretPos - 1]) : 0 < a && l.start === r.$control_input.val().length && i.push(r.items[r.caretPos]));
            if (!i.length || "function" == typeof r.settings.onDelete && !1 === r.settings.onDelete.apply(r, [i])) return !1;
            for (void 0 !== s && r.setCaret(s); i.length;) r.removeItem(i.pop());
            return r.showInput(), r.positionDropdown(), r.refreshOptions(!0), o && (t = r.getOption(o)).length && r.setActiveOption(t), !0
        },
        advanceSelection: function(t, e) {
            var n, i, o, s = this;
            0 !== t && (s.rtl && (t *= -1), n = 0 < t ? "last" : "first", o = getInputSelection(s.$control_input[0]), s.isFocused && !s.isInputHidden ? (i = s.$control_input.val().length, (t < 0 ? 0 !== o.start || 0 !== o.length : o.start !== i) || i || s.advanceCaret(t, e)) : (o = s.$control.children(".active:" + n)).length && (i = s.$control.children(":not(input)").index(o), s.setActiveItem(null), s.setCaret(0 < t ? i + 1 : i)))
        },
        advanceCaret: function(t, e) {
            var n, i = this;
            0 !== t && (i.isShiftDown ? (n = i.$control_input[0 < t ? "next" : "prev"]()).length && (i.hideInput(), i.setActiveItem(n), e) && e.preventDefault() : i.setCaret(i.caretPos + t))
        },
        setCaret: function(t) {
            var e = this;
            if (t = "single" === e.settings.mode ? e.items.length : Math.max(0, Math.min(e.items.length, t)), !e.isPending)
                for (var n, i = e.$control.children(":not(input)"), o = 0, s = i.length; o < s; o++) n = $(i[o]).detach(), o < t ? e.$control_input.before(n) : e.$control.append(n);
            e.caretPos = t
        },
        lock: function() { this.close(), this.isLocked = !0, this.refreshState() },
        unlock: function() { this.isLocked = !1, this.refreshState() },
        disable: function() { this.$input.prop("disabled", !0), this.$control_input.prop("disabled", !0).prop("tabindex", -1), this.isDisabled = !0, this.lock() },
        enable: function() {
            var t = this;
            t.$input.prop("disabled", !1), t.$control_input.prop("disabled", !1).prop("tabindex", t.tabIndex), t.isDisabled = !1, t.unlock()
        },
        destroy: function() {
            var t = this,
                e = t.eventNS,
                n = t.revertSettings;
            t.trigger("destroy"), t.off(), t.$wrapper.remove(), t.$dropdown.remove(), t.$input.html("").append(n.$children).removeAttr("tabindex").removeClass("selectized").attr({ tabindex: n.tabindex }).show(), t.$control_input.removeData("grow"), t.$input.removeData("selectize"), 0 == --Selectize.count && Selectize.$testInput && (Selectize.$testInput.remove(), Selectize.$testInput = void 0), $(window).off(e), $(document).off(e), $(document.body).off(e), delete t.$input[0].selectize
        },
        render: function(t, e) {
            var n, i, o = "",
                s = !1,
                r = this;
            return (s = "option" !== t && "item" !== t ? s : !!(n = hash_key(e[r.settings.valueField]))) && (isset(r.renderCache[t]) || (r.renderCache[t] = {}), r.renderCache[t].hasOwnProperty(n)) ? r.renderCache[t][n] : (o = $(r.settings.render[t].apply(this, [e, escape_html])), "option" === t || "option_create" === t ? e[r.settings.disabledField] || o.attr("data-selectable", "") : "optgroup" === t && (i = e[r.settings.optgroupValueField] || "", o.attr("data-group", i), e[r.settings.disabledField]) && o.attr("data-disabled", ""), "option" !== t && "item" !== t || o.attr("data-value", n || ""), s && (r.renderCache[t][n] = o[0]), o[0])
        },
        clearCache: function(t) { void 0 === t ? this.renderCache = {} : delete this.renderCache[t] },
        canCreate: function(t) { var e; return !!this.settings.create && (e = this.settings.createFilter, t.length) && ("function" != typeof e || e.apply(this, [t])) && ("string" != typeof e || new RegExp(e).test(t)) && (!(e instanceof RegExp) || e.test(t)) }
    }), Selectize.count = 0, Selectize.defaults = { options: [], optgroups: [], plugins: [], delimiter: ",", splitOn: null, persist: !0, diacritics: !0, create: !1, showAddOptionOnCreate: !0, createOnBlur: !1, createFilter: null, highlight: !0, openOnFocus: !0, maxOptions: 1e3, maxItems: null, hideSelected: null, addPrecedence: !1, selectOnTab: !0, preload: !1, allowEmptyOption: !1, showEmptyOptionInDropdown: !1, emptyOptionLabel: "--", setFirstOptionActive: !1, closeAfterSelect: !1, closeDropdownThreshold: 250, scrollDuration: 60, deselectBehavior: "previous", loadThrottle: 300, loadingClass: "loading", dataAttr: "data-data", optgroupField: "optgroup", valueField: "value", labelField: "text", disabledField: "disabled", optgroupLabelField: "label", optgroupValueField: "value", lockOptgroupOrder: !1, sortField: "$order", searchField: ["text"], searchConjunction: "and", respect_word_boundaries: !0, mode: null, wrapperClass: "", inputClass: "", dropdownClass: "", dropdownContentClass: "", dropdownParent: null, copyClassesToDropdown: !0, dropdownSize: { sizeType: "auto", sizeValue: "auto" }, normalize: !1, ignoreOnDropwdownHeight: "img, i", search: !0, render: {} }, $.fn.selectize = function(c) {
        function u(t, o) {
            function e(t, e) {
                t = $(t);
                var n, i = hash_key(t.val());
                (i || v.allowEmptyOption) && (l.hasOwnProperty(i) ? e && ((n = l[i][O]) ? Array.isArray(n) ? n.push(e) : l[i][O] = [n, e] : l[i][O] = e) : ((n = p(t) || {})[y] = n[y] || t.text(), n[w] = n[w] || i, n[C] = n[C] || t.prop("disabled"), n[O] = n[O] || e, n.styles = t.attr("style") || "", n.classes = t.attr("class") || "", l[i] = n, a.push(n), t.is(":selected") && o.items.push(i)))
            }
            var n, i, s, r, a = o.options,
                l = {},
                p = function(t) {
                    var e = m && t.attr(m),
                        t = t.data(),
                        n = {};
                    return "string" == typeof e && e.length && (isJSON(e) ? Object.assign(n, JSON.parse(e)) : n[e] = e), Object.assign(n, t), n || null
                };
            for (o.maxItems = t.attr("multiple") ? null : 1, n = 0, i = (r = t.children()).length; n < i; n++)
                if ("optgroup" === (s = r[n].tagName.toLowerCase())) { g = h = d = u = c = void 0; var c, u, d, h, g, f = r[n]; for ((d = (f = $(f)).attr("label")) && ((h = p(f) || {})[_] = d, h[b] = d, h[C] = f.prop("disabled"), o.optgroups.push(h)), c = 0, u = (g = $("option", f)).length; c < u; c++) e(g[c], d) } else "option" === s && e(r[n])
        }
        var d = $.fn.selectize.defaults,
            v = $.extend({}, d, c),
            m = v.dataAttr,
            y = v.labelField,
            w = v.valueField,
            C = v.disabledField,
            O = v.optgroupField,
            _ = v.optgroupLabelField,
            b = v.optgroupValueField;
        return this.each(function() {
            if (!this.selectize) {
                var t = $(this),
                    e = this.tagName.toLowerCase(),
                    n = t.attr("placeholder") || t.attr("data-placeholder"),
                    i = (n || v.allowEmptyOption || (n = t.children('option[value=""]').text()), v.allowEmptyOption && v.showEmptyOptionInDropdown && !t.children('option[value=""]').length && (l = t.html(), i = escape_html(v.emptyOptionLabel || "--"), t.html('<option value="">' + i + "</option>" + l)), { placeholder: n, options: [], optgroups: [], items: [] });
                if ("select" === e) u(t, i);
                else {
                    var o, s, r, a, l = t,
                        p = i,
                        n = l.attr(m);
                    if (n)
                        for (p.options = JSON.parse(n), o = 0, s = p.options.length; o < s; o++) p.items.push(p.options[o][w]);
                    else {
                        n = (l.val() || "").trim();
                        if (v.allowEmptyOption || n.length) {
                            for (o = 0, s = (r = n.split(v.delimiter)).length; o < s; o++)(a = {})[y] = r[o], a[w] = r[o], p.options.push(a);
                            p.items = r
                        }
                    }
                }
                new Selectize(t, $.extend(!0, {}, d, i, c)).settings_user = c
            }
        })
    }, $.fn.selectize.defaults = Selectize.defaults, $.fn.selectize.support = { validity: SUPPORTS_VALIDITY_API }, Selectize.define("auto_position", function() {
        const o = { top: "top", bottom: "bottom" };
        this.positionDropdown = function() {
            var t = this.$control,
                e = "body" === this.settings.dropdownParent ? t.offset() : t.position(),
                n = (e.top += t.outerHeight(!0), this.$dropdown.prop("scrollHeight") + 5),
                n = this.$control.get(0).getBoundingClientRect().top + n + this.$wrapper.height() > window.innerHeight ? o.top : o.bottom,
                i = { width: t.outerWidth(), left: e.left };
            n === o.top ? (n = { bottom: e.top, top: "unset" }, "body" === this.settings.dropdownParent && (n.top = e.top - this.$dropdown.outerHeight(!0) - t.outerHeight(!0), n.bottom = "unset"), Object.assign(i, n), this.$dropdown.addClass("selectize-position-top"), this.$control.addClass("selectize-position-top")) : (Object.assign(i, { top: e.top, bottom: "unset" }), this.$dropdown.removeClass("selectize-position-top"), this.$control.removeClass("selectize-position-top")), this.$dropdown.css(i)
        }
    }), Selectize.define("auto_select_on_type", function(t) {
        var n, i = this;
        i.onBlur = (n = i.onBlur, function(t) { var e = i.getFirstItemMatchedByTextContent(i.lastValue, !0); return void 0 !== e.attr("data-value") && i.getValue() !== e.attr("data-value") && i.setValue(e.attr("data-value")), n.apply(this, arguments) })
    }), Selectize.define("autofill_disable", function(t) {
        var e, n = this;
        n.setup = (e = n.setup, function() { e.apply(n, arguments), n.$control_input.attr({ autocomplete: "new-password", autofill: "no" }) })
    }), Selectize.define("clear_button", function(e) {
        var t, n = this;
        e = $.extend({ title: "Clear", className: "clear", label: "×", html: function(t) { return '<a class="' + t.className + '" title="' + t.title + '"> ' + t.label + "</a>" } }, e), n.setup = (t = n.setup, function() { t.apply(n, arguments), n.$button_clear = $(e.html(e)), "single" === n.settings.mode && n.$wrapper.addClass("single"), n.$wrapper.append(n.$button_clear), "" !== n.getValue() && 0 !== n.getValue().length || n.$wrapper.find("." + e.className).css("display", "none"), n.on("change", function() { "" === n.getValue() || 0 === n.getValue().length ? n.$wrapper.find("." + e.className).css("display", "none") : n.$wrapper.find("." + e.className).css("display", "") }), n.$wrapper.on("click", "." + e.className, function(t) { t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), n.isLocked || (n.clear(), n.$wrapper.find("." + e.className).css("display", "none")) }) })
    }), Selectize.define("drag_drop", function(t) {
        if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        var i, e, n, o;
        "multi" === this.settings.mode && ((i = this).lock = (e = i.lock, function() { var t = i.$control.data("sortable"); return t && t.disable(), e.apply(i, arguments) }), i.unlock = (n = i.unlock, function() { var t = i.$control.data("sortable"); return t && t.enable(), n.apply(i, arguments) }), i.setup = (o = i.setup, function() {
            o.apply(this, arguments);
            var n = i.$control.sortable({
                items: "[data-value]",
                forcePlaceholderSize: !0,
                disabled: i.isLocked,
                start: function(t, e) { e.placeholder.css("width", e.helper.css("width")), n.addClass("dragging") },
                stop: function() {
                    n.removeClass("dragging");
                    var t = i.$activeItems ? i.$activeItems.slice() : null,
                        e = [];
                    n.children("[data-value]").each(function() { e.push($(this).attr("data-value")) }), i.isFocused = !1, i.setValue(e), i.isFocused = !0, i.setActiveItem(t), i.positionDropdown()
                }
            })
        }))
    }), Selectize.define("dropdown_header", function(t) {
        var e, n = this;
        t = $.extend({ title: "Untitled", headerClass: "selectize-dropdown-header", titleRowClass: "selectize-dropdown-header-title", labelClass: "selectize-dropdown-header-label", closeClass: "selectize-dropdown-header-close", html: function(t) { return '<div class="' + t.headerClass + '"><div class="' + t.titleRowClass + '"><span class="' + t.labelClass + '">' + t.title + '</span><a href="javascript:void(0)" class="' + t.closeClass + '">&#xd7;</a></div></div>' } }, t), n.setup = (e = n.setup, function() { e.apply(n, arguments), n.$dropdown_header = $(t.html(t)), n.$dropdown.prepend(n.$dropdown_header), n.$dropdown_header.find("." + t.closeClass).on("click", function() { n.close() }) })
    }), Selectize.define("optgroup_columns", function(r) {
        function t() {
            var t, e, n, i, o = $("[data-group]", a.$dropdown_content),
                s = o.length;
            if (s && a.$dropdown_content.width()) {
                if (r.equalizeHeight) {
                    for (t = e = 0; t < s; t++) e = Math.max(e, o.eq(t).height());
                    o.css({ height: e })
                }
                r.equalizeWidth && (i = a.$dropdown_content.innerWidth() - l(), n = Math.round(i / s), o.css({ width: n }), 1 < s) && (i = i - n * (s - 1), o.eq(s - 1).css({ width: i }))
            }
        }
        var i, a = this,
            l = (r = $.extend({ equalizeWidth: !0, equalizeHeight: !0 }, r), this.getAdjacentOption = function(t, e) {
                var n = t.closest("[data-group]").find("[data-selectable]"),
                    t = n.index(t) + e;
                return 0 <= t && t < n.length ? n.eq(t) : $()
            }, this.onKeyDown = (i = a.onKeyDown, function(t) {
                var e, n;
                if (!this.isOpen || t.keyCode !== KEY_LEFT && t.keyCode !== KEY_RIGHT) return i.apply(this, arguments);
                a.ignoreHover = !0, e = (n = this.$activeOption.closest("[data-group]")).find("[data-selectable]").index(this.$activeOption), (n = (n = (n = t.keyCode === KEY_LEFT ? n.prev("[data-group]") : n.next("[data-group]")).find("[data-selectable]")).eq(Math.min(n.length - 1, e))).length && this.setActiveOption(n)
            }), function() {
                var t, e = l.width,
                    n = document;
                return void 0 === e && ((t = n.createElement("div")).innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>', t = t.firstChild, n.body.appendChild(t), e = l.width = t.offsetWidth - t.clientWidth, n.body.removeChild(t)), e
            });
        (r.equalizeHeight || r.equalizeWidth) && (hook.after(this, "positionDropdown", t), hook.after(this, "refreshOptions", t))
    }), Selectize.define("remove_button", function(t) {
        var s, e, n, i, r;
        "single" !== this.settings.mode && (t = $.extend({ label: "&#xd7;", title: "Remove", className: "remove", append: !0 }, t), i = s = this, r = '<a href="javascript:void(0)" class="' + (e = t).className + '" tabindex="-1" title="' + escape_html(e.title) + '">' + e.label + "</a>", s.setup = (n = i.setup, function() {
            var o;
            e.append && (o = i.settings.render.item, i.settings.render.item = function(t) { return e = o.apply(s, arguments), n = r, i = e.search(/(<\/[^>]+>\s*)$/), e.substring(0, i) + n + e.substring(i); var e, n, i }), n.apply(s, arguments), s.$control.on("click", "." + e.className, function(t) { if (t.preventDefault(), !i.isLocked) return t = $(t.currentTarget).parent(), i.setActiveItem(t), i.deleteSelection() && i.setCaret(i.items.length), !1 })
        }))
    }), Selectize.define("restore_on_backspace", function(n) {
        var i, t = this;
        n.text = n.text || function(t) { return t[this.settings.labelField] }, this.onKeyDown = (i = t.onKeyDown, function(t) {
            var e;
            if (!(t.keyCode === KEY_BACKSPACE && "" === this.$control_input.val() && !this.$activeItems.length && 0 <= (e = this.caretPos - 1) && e < this.items.length)) return i.apply(this, arguments);
            e = this.options[this.items[e]], this.deleteSelection(t) && (this.setTextboxValue(n.text.apply(this, [e])), this.refreshOptions(!0)), t.preventDefault()
        })
    }), Selectize.define("select_on_focus", function(t) {
        var n, e, i = this;
        i.on("focus", (n = i.onFocus, function(t) { var e = i.getItem(i.getValue()).text(); return i.clear(), i.setTextboxValue(e), i.$control_input.select(), setTimeout(function() { i.settings.selectOnTab && i.setActiveOption(i.getFirstItemMatchedByTextContent(e)), i.settings.score = null }, 0), n.apply(this, arguments) })), i.onBlur = (e = i.onBlur, function(t) { return "" === i.getValue() && i.lastValidValue !== i.getValue() && i.setValue(i.lastValidValue), setTimeout(function() { i.settings.score = function() { return function() { return 1 } } }, 0), e.apply(this, arguments) }), i.settings.score = function() { return function() { return 1 } }
    }), Selectize.define("tag_limit", function(o) {
        const t = this;
        o.tagLimit = o.tagLimit, this.onBlur = function() {
            const i = t.onBlur;
            return function(t) {
                if (i.apply(this, t), t) {
                    var t = this.$control,
                        e = t.find(".item");
                    const n = o.tagLimit;
                    void 0 === n || e.length <= n || (e.toArray().forEach(function(t, e) { e < n || $(t).hide() }), t.append("<span><b>" + (e.length - n) + "</b></span>"))
                }
            }
        }(), this.onFocus = function() { const e = t.onFocus; return function(t) { e.apply(this, t), t && ((t = this.$control).find(".item").show(), t.find("span").remove()) } }()
    });
    return Selectize;
}));
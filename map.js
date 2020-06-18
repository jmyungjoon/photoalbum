(function() {
    var e, t, i, n, o, s, r, a, l, h = [].slice, d = {}.hasOwnProperty;
    a = function() {}
    ,
    t = function() {
        function e() {}
        return e.prototype.addEventListener = e.prototype.on,
        e.prototype.on = function(e, t) {
            return this._callbacks = this._callbacks || {},
            this._callbacks[e] || (this._callbacks[e] = []),
            this._callbacks[e].push(t),
            this
        }
        ,
        e.prototype.emit = function() {
            var e, t, i, n, o;
            if (i = arguments[0],
            e = 2 <= arguments.length ? h.call(arguments, 1) : [],
            this._callbacks = this._callbacks || {},
            t = this._callbacks[i])
                for (n = 0,
                o = t.length; n < o; n++)
                    t[n].apply(this, e);
            return this
        }
        ,
        e.prototype.removeListener = e.prototype.off,
        e.prototype.removeAllListeners = e.prototype.off,
        e.prototype.removeEventListener = e.prototype.off,
        e.prototype.off = function(e, t) {
            var i, n, o, s;
            if (!this._callbacks || 0 === arguments.length)
                return this._callbacks = {},
                this;
            if (!(i = this._callbacks[e]))
                return this;
            if (1 === arguments.length)
                return delete this._callbacks[e],
                this;
            for (n = o = 0,
            s = i.length; o < s; n = ++o)
                if (i[n] === t) {
                    i.splice(n, 1);
                    break
                }
            return this
        }
        ,
        e
    }(),
    (e = function(e) {
        var n, o;
        function s(e, t) {
            var i, o, r, a;
            if (this.element = e,
            this.version = s.version,
            this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""),
            this.clickableElements = [],
            this.listeners = [],
            this.files = [],
            "string" == typeof this.element && (this.element = document.querySelector(this.element)),
            !this.element || null == this.element.nodeType)
                throw new Error("Invalid dropzone element.");
            if (this.element.dropzone)
                throw new Error("Dropzone already attached.");
            if (s.instances.push(this),
            this.element.dropzone = this,
            i = null != (r = s.optionsForElement(this.element)) ? r : {},
            this.options = n({}, this.defaultOptions, i, null != t ? t : {}),
            this.options.forceFallback || !s.isBrowserSupported())
                return this.options.fallback.call(this);
            if (null == this.options.url && (this.options.url = this.element.getAttribute("action")),
            !this.options.url)
                throw new Error("No URL provided.");
            if (this.options.acceptedFiles && this.options.acceptedMimeTypes)
                throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
            this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes,
            delete this.options.acceptedMimeTypes),
            null != this.options.renameFilename && (this.options.renameFile = (a = this,
            function(e) {
                return a.options.renameFilename.call(a, e.name, e)
            }
            )),
            this.options.method = this.options.method.toUpperCase(),
            (o = this.getExistingFallback()) && o.parentNode && o.parentNode.removeChild(o),
            !1 !== this.options.previewsContainer && (this.options.previewsContainer ? this.previewsContainer = s.getElement(this.options.previewsContainer, "previewsContainer") : this.previewsContainer = this.element),
            this.options.clickable && (!0 === this.options.clickable ? this.clickableElements = [this.element] : this.clickableElements = s.getElements(this.options.clickable, "clickable")),
            this.init()
        }
        return function(e, t) {
            for (var i in t)
                d.call(t, i) && (e[i] = t[i]);
            function n() {
                this.constructor = e
            }
            n.prototype = t.prototype,
            e.prototype = new n,
            e.__super__ = t.prototype
        }(s, t),
        s.prototype.Emitter = t,
        s.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"],
        s.prototype.defaultOptions = {
            url: null,
            method: "post",
            withCredentials: !1,
            timeout: 3e4,
            parallelUploads: 10,
            uploadMultiple: !1,
            maxFilesize: 40,
            paramName: "file",
            createImageThumbnails: !0,
            maxThumbnailFilesize: 10,
            thumbnailWidth: 240,
            thumbnailHeight: 180,
            thumbnailMethod: "crop",
            resizeWidth: 1e3,
            resizeHeight: null,
            resizeMimeType: null,
            resizeQuality: .8,
            resizeMethod: "contain",
            filesizeBase: 900,
            maxFiles: null,
            params: {},
            headers: null,
            clickable: "#selectbutton",
            ignoreHiddenFiles: !0,
            acceptedFiles: "image/jpeg",
            acceptedMimeTypes: null,
            autoProcessQueue: !0,
            autoQueue: !0,
            addRemoveLinks: !1,
            previewsContainer: "#slideshow",
            hiddenInputContainer: "body",
            capture: null,
            renameFilename: null,
            renameFile: null,
            forceFallback: !1,
            dictDefaultMessage: "Drop files here to upload",
            dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
            dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
            dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
            dictInvalidFileType: "You can't upload files of this type.",
            dictResponseError: "Server responded with {{statusCode}} code.",
            dictCancelUpload: "Cancel upload",
            dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
            dictRemoveFile: "Remove file",
            dictRemoveFileConfirmation: null,
            dictMaxFilesExceeded: "You can not upload any more files.",
            dictFileSizeUnits: {
                tb: "TB",
                gb: "GB",
                mb: "MB",
                kb: "KB",
                b: "b"
            },
            init: function() {
                return a
            },
            accept: function(e, t) {
                return t()
            },
            fallback: function() {
                var e, t, i, n, o, r;
                for (this.element.className = this.element.className + " dz-browser-not-supported",
                t = 0,
                i = (o = this.element.getElementsByTagName("div")).length; t < i; t++)
                    e = o[t],
                    /(^| )dz-message($| )/.test(e.className) && (n = e,
                    e.className = "dz-message");
                return n || (n = s.createElement('<div class="dz-message"><span></span></div>'),
                this.element.appendChild(n)),
                (r = n.getElementsByTagName("span")[0]) && (null != r.textContent ? r.textContent = this.options.dictFallbackMessage : null != r.innerText && (r.innerText = this.options.dictFallbackMessage)),
                this.element.appendChild(this.getFallbackForm())
            },
            resize: function(e, t, i, n) {
                var o, s, r;
                if (o = {
                    srcX: 0,
                    srcY: 0,
                    srcWidth: e.width,
                    srcHeight: e.height
                },
                s = e.width / e.height,
                null == t && null == i ? (t = o.srcWidth,
                i = o.srcHeight) : null == t ? t = i * s : null == i && (i = t / s),
                r = (t = Math.min(t, o.srcWidth)) / (i = Math.min(i, o.srcHeight)),
                o.srcWidth > t || o.srcHeight > i)
                    if ("crop" === n)
                        s > r ? (o.srcHeight = e.height,
                        o.srcWidth = o.srcHeight * r) : (o.srcWidth = e.width,
                        o.srcHeight = o.srcWidth / r);
                    else {
                        if ("contain" !== n)
                            throw new Error("Unknown resizeMethod '" + n + "'");
                        s > r ? i = t / s : t = i * s
                    }
                return o.srcX = (e.width - o.srcWidth) / 2,
                o.srcY = (e.height - o.srcHeight) / 2,
                o.trgWidth = t,
                o.trgHeight = i,
                o
            },
            transformFile: function(e, t) {
                return (this.options.resizeWidth || this.options.resizeHeight) && e.type.match(/image.*/) ? this.resizeImage(e, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, t) : t(e)
            },
            previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">Processing photos, please wait...</div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" xmlns:sketch="https://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n </div>',
            drop: function(e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragstart: a,
            dragend: function(e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragenter: function(e) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragover: function(e) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragleave: function(e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            paste: a,
            reset: function() {
                return this.element.classList.remove("dz-started")
            },
            addedfile: function(e) {
                var t, i, n, o, r, a, l, h, d, u, c, p, f;
                if (this.element === this.previewsContainer && this.element.classList.add("dz-started"),
                this.previewsContainer) {
                    for (e.previewElement = s.createElement(this.options.previewTemplate.trim()),
                    e.previewTemplate = e.previewElement,
                    this.previewsContainer.appendChild(e.previewElement),
                    t = 0,
                    o = (l = e.previewElement.querySelectorAll("[data-dz-name]")).length; t < o; t++)
                        l[t].textContent = e.upload.filename;
                    for (i = 0,
                    r = (h = e.previewElement.querySelectorAll("[data-dz-size]")).length; i < r; i++)
                        h[i].innerHTML = this.filesize(e.size);
                    for (this.options.addRemoveLinks && (e._removeLink = s.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"),
                    e.previewElement.appendChild(e._removeLink)),
                    f = this,
                    u = function(t) {
                        return t.preventDefault(),
                        t.stopPropagation(),
                        e.status === s.UPLOADING ? s.confirm(f.options.dictCancelUploadConfirmation, function() {
                            return f.removeFile(e)
                        }) : f.options.dictRemoveFileConfirmation ? s.confirm(f.options.dictRemoveFileConfirmation, function() {
                            return f.removeFile(e)
                        }) : f.removeFile(e)
                    }
                    ,
                    p = [],
                    n = 0,
                    a = (d = e.previewElement.querySelectorAll("[data-dz-remove]")).length; n < a; n++)
                        c = d[n],
                        p.push(c.addEventListener("click", u));
                    return p
                }
            },
            removedfile: function(e) {
                var t;
                return e.previewElement && null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement),
                this._updateMaxFilesReachedClass()
            },
            thumbnail: function(e, t) {
                var i, n, o, s;
                if (e.previewElement) {
                    for (e.previewElement.classList.remove("dz-file-preview"),
                    i = 0,
                    n = (o = e.previewElement.querySelectorAll("[data-dz-thumbnail]")).length; i < n; i++)
                        (s = o[i]).alt = e.name,
                        s.src = t;
                    return setTimeout(function() {
                        return e.previewElement.classList.add("dz-image-preview")
                    }, 1)
                }
            },
            error: function(e, t) {
                var i, n, o, s, r;
                if (e.previewElement) {
                    for (e.previewElement.classList.add("dz-error"),
                    "String" != typeof t && t.error && (t = t.error),
                    r = [],
                    i = 0,
                    n = (s = e.previewElement.querySelectorAll("[data-dz-errormessage]")).length; i < n; i++)
                        o = s[i],
                        r.push(o.textContent = t);
                    return r
                }
            },
            errormultiple: a,
            processing: function(e) {
                if (e.previewElement && (e.previewElement.classList.add("dz-processing"),
                e._removeLink))
                    return e._removeLink.textContent = this.options.dictCancelUpload
            },
            processingmultiple: a,
            uploadprogress: function(e, t, i) {
                var n, o, s, r, a;
                if (e.previewElement) {
                    for (a = [],
                    n = 0,
                    o = (r = e.previewElement.querySelectorAll("[data-dz-uploadprogress]")).length; n < o; n++)
                        "PROGRESS" === (s = r[n]).nodeName ? a.push(s.value = t) : a.push(s.style.width = t + "%");
                    return a
                }
            },
            totaluploadprogress: a,
            sending: a,
            sendingmultiple: a,
            success: function(e) {
                if (e.previewElement)
                    return e.previewElement.classList.add("dz-success")
            },
            successmultiple: a,
            canceled: function(e) {
                return this.emit("error", e, "Upload canceled.")
            },
            canceledmultiple: a,
            complete: function(e) {
                if (e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile),
                e.previewElement)
                    return e.previewElement.classList.add("dz-complete")
            },
            completemultiple: a,
            maxfilesexceeded: a,
            maxfilesreached: a,
            queuecomplete: a,
            addedfiles: a
        },
        n = function() {
            var e, t, i, n, o, s, r;
            for (s = arguments[0],
            e = 0,
            i = (o = 2 <= arguments.length ? h.call(arguments, 1) : []).length; e < i; e++) {
                n = o[e];
                for (t in n)
                    r = n[t],
                    s[t] = r
            }
            return s
        }
        ,
        s.prototype.getAcceptedFiles = function() {
            var e, t, i, n, o;
            for (o = [],
            t = 0,
            i = (n = this.files).length; t < i; t++)
                (e = n[t]).accepted && o.push(e);
            return o
        }
        ,
        s.prototype.getRejectedFiles = function() {
            var e, t, i, n, o;
            for (o = [],
            t = 0,
            i = (n = this.files).length; t < i; t++)
                (e = n[t]).accepted || o.push(e);
            return o
        }
        ,
        s.prototype.getFilesWithStatus = function(e) {
            var t, i, n, o, s;
            for (s = [],
            i = 0,
            n = (o = this.files).length; i < n; i++)
                (t = o[i]).status === e && s.push(t);
            return s
        }
        ,
        s.prototype.getQueuedFiles = function() {
            return this.getFilesWithStatus(s.QUEUED)
        }
        ,
        s.prototype.getUploadingFiles = function() {
            return this.getFilesWithStatus(s.UPLOADING)
        }
        ,
        s.prototype.getAddedFiles = function() {
            return this.getFilesWithStatus(s.ADDED)
        }
        ,
        s.prototype.getActiveFiles = function() {
            var e, t, i, n, o;
            for (o = [],
            t = 0,
            i = (n = this.files).length; t < i; t++)
                (e = n[t]).status !== s.UPLOADING && e.status !== s.QUEUED || o.push(e);
            return o
        }
        ,
        s.prototype.init = function() {
            var e, t, i, n, o, r, a, l, h, d, u, c, p, f, m, g, _, v, y;
            for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"),
            this.element.classList.contains("dropzone") && this.element.querySelector(".dz-message"),
            this.clickableElements.length && (l = this,
            (a = function() {
                return l.hiddenFileInput && l.hiddenFileInput.parentNode.removeChild(l.hiddenFileInput),
                l.hiddenFileInput = document.createElement("input"),
                l.hiddenFileInput.setAttribute("type", "file"),
                (null == l.options.maxFiles || l.options.maxFiles > 1) && l.hiddenFileInput.setAttribute("multiple", "multiple"),
                l.hiddenFileInput.className = "dz-hidden-input",
                null != l.options.acceptedFiles && l.hiddenFileInput.setAttribute("accept", l.options.acceptedFiles),
                null != l.options.capture && l.hiddenFileInput.setAttribute("capture", l.options.capture),
                l.hiddenFileInput.style.visibility = "hidden",
                l.hiddenFileInput.style.position = "absolute",
                l.hiddenFileInput.style.top = "0",
                l.hiddenFileInput.style.left = "0",
                l.hiddenFileInput.style.height = "0",
                l.hiddenFileInput.style.width = "0",
                document.querySelector(l.options.hiddenInputContainer).appendChild(l.hiddenFileInput),
                l.hiddenFileInput.addEventListener("change", function() {
                    var e, t, i, n;
                    if ((t = l.hiddenFileInput.files).length)
                        for (i = 0,
                        n = t.length; i < n; i++)
                            e = t[i],
                            l.addFile(e);
                    return l.emit("addedfiles", t),
                    a()
                })
            }
            )()),
            this.URL = null != (o = window.URL) ? o : window.webkitURL,
            t = 0,
            i = (r = this.events).length; t < i; t++)
                e = r[t],
                this.on(e, this.options[e]);
            return this.on("uploadprogress", (h = this,
            function() {
                return h.updateTotalUploadProgress()
            }
            )),
            this.on("removedfile", (d = this,
            function() {
                return d.updateTotalUploadProgress()
            }
            )),
            this.on("canceled", (u = this,
            function(e) {
                return u.emit("complete", e)
            }
            )),
            this.on("complete", (c = this,
            function(e) {
                if (0 === c.getAddedFiles().length && 0 === c.getUploadingFiles().length && 0 === c.getQueuedFiles().length)
                    return setTimeout(function() {
                        return c.emit("queuecomplete")
                    }, 0)
            }
            )),
            n = function(e) {
                return e.stopPropagation(),
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }
            ,
            this.listeners = [{
                element: this.element,
                events: {
                    dragstart: (v = this,
                    function(e) {
                        return v.emit("dragstart", e)
                    }
                    ),
                    dragenter: (_ = this,
                    function(e) {
                        return n(e),
                        _.emit("dragenter", e)
                    }
                    ),
                    dragover: (g = this,
                    function(e) {
                        var t;
                        try {
                            t = e.dataTransfer.effectAllowed
                        } catch (e) {}
                        return e.dataTransfer.dropEffect = "move" === t || "linkMove" === t ? "move" : "copy",
                        n(e),
                        g.emit("dragover", e)
                    }
                    ),
                    dragleave: (m = this,
                    function(e) {
                        return m.emit("dragleave", e)
                    }
                    ),
                    drop: (f = this,
                    function(e) {
                        return n(e),
                        f.drop(e)
                    }
                    ),
                    dragend: (p = this,
                    function(e) {
                        return p.emit("dragend", e)
                    }
                    )
                }
            }],
            this.clickableElements.forEach((y = this,
            function(e) {
                return y.listeners.push({
                    element: e,
                    events: {
                        click: function(t) {
                            return (e !== y.element || t.target === y.element || s.elementInside(t.target, y.element.querySelector(".dz-message"))) && y.hiddenFileInput.click(),
                            !0
                        }
                    }
                })
            }
            )),
            this.enable(),
            this.options.init.call(this)
        }
        ,
        s.prototype.destroy = function() {
            var e;
            return this.disable(),
            this.removeAllFiles(!0),
            (null != (e = this.hiddenFileInput) ? e.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),
            this.hiddenFileInput = null),
            delete this.element.dropzone,
            s.instances.splice(s.instances.indexOf(this), 1)
        }
        ,
        s.prototype.updateTotalUploadProgress = function() {
            var e, t, i, n, o, s, r;
            if (s = 0,
            o = 0,
            this.getActiveFiles().length) {
                for (t = 0,
                i = (n = this.getActiveFiles()).length; t < i; t++)
                    s += (e = n[t]).upload.bytesSent,
                    o += e.upload.total;
                r = 100 * s / o
            } else
                r = 100;
            return this.emit("totaluploadprogress", r, o, s)
        }
        ,
        s.prototype._getParamName = function(e) {
            return "function" == typeof this.options.paramName ? this.options.paramName(e) : this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" : "")
        }
        ,
        s.prototype._renameFile = function(e) {
            return "function" != typeof this.options.renameFile ? e.name : this.options.renameFile(e)
        }
        ,
        s.prototype.getFallbackForm = function() {
            var e, t, i, n;
            return (e = this.getExistingFallback()) ? e : (i = '<div class="dz-fallback">',
            this.options.dictFallbackText && (i += "<p>" + this.options.dictFallbackText + "</p>"),
            i += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>',
            t = s.createElement(i),
            "FORM" !== this.element.tagName ? (n = s.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>')).appendChild(t) : (this.element.setAttribute("enctype", "multipart/form-data"),
            this.element.setAttribute("method", this.options.method)),
            null != n ? n : t)
        }
        ,
        s.prototype.getExistingFallback = function() {
            var e, t, i, n, o, s;
            for (t = function(e) {
                var t, i, n;
                for (i = 0,
                n = e.length; i < n; i++)
                    if (t = e[i],
                    /(^| )fallback($| )/.test(t.className))
                        return t
            }
            ,
            i = 0,
            n = (o = ["div", "form"]).length; i < n; i++)
                if (s = o[i],
                e = t(this.element.getElementsByTagName(s)))
                    return e
        }
        ,
        s.prototype.setupEventListeners = function() {
            var e, t, i, n, o, s, r;
            for (r = [],
            i = 0,
            n = (s = this.listeners).length; i < n; i++)
                e = s[i],
                r.push(function() {
                    var i, n;
                    i = e.events,
                    n = [];
                    for (t in i)
                        o = i[t],
                        n.push(e.element.addEventListener(t, o, !1));
                    return n
                }());
            return r
        }
        ,
        s.prototype.removeEventListeners = function() {
            var e, t, i, n, o, s, r;
            for (r = [],
            i = 0,
            n = (s = this.listeners).length; i < n; i++)
                e = s[i],
                r.push(function() {
                    var i, n;
                    i = e.events,
                    n = [];
                    for (t in i)
                        o = i[t],
                        n.push(e.element.removeEventListener(t, o, !1));
                    return n
                }());
            return r
        }
        ,
        s.prototype.disable = function() {
            var e, t, i, n, o;
            for (this.clickableElements.forEach(function(e) {
                return e.classList.remove("dz-clickable")
            }),
            this.removeEventListeners(),
            o = [],
            t = 0,
            i = (n = this.files).length; t < i; t++)
                e = n[t],
                o.push(this.cancelUpload(e));
            return o
        }
        ,
        s.prototype.enable = function() {
            return this.clickableElements.forEach(function(e) {
                return e.classList.add("dz-clickable")
            }),
            this.setupEventListeners()
        }
        ,
        s.prototype.filesize = function(e) {
            var t, i, n, o, s, r, a;
            if (o = 0,
            s = "b",
            e > 0) {
                for (t = i = 0,
                n = (a = ["tb", "gb", "mb", "kb", "b"]).length; i < n; t = ++i)
                    if (r = a[t],
                    e >= Math.pow(this.options.filesizeBase, 4 - t) / 10) {
                        o = e / Math.pow(this.options.filesizeBase, 4 - t),
                        s = r;
                        break
                    }
                o = Math.round(10 * o) / 10
            }
            return "<strong>" + o + "</strong> " + this.options.dictFileSizeUnits[s]
        }
        ,
        s.prototype._updateMaxFilesReachedClass = function() {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files),
            this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
        }
        ,
        s.prototype.drop = function(e) {
            var t, i;
            e.dataTransfer && (this.emit("drop", e),
            t = e.dataTransfer.files,
            this.emit("addedfiles", t),
            t.length && ((i = e.dataTransfer.items) && i.length && null != i[0].webkitGetAsEntry ? this._addFilesFromItems(i) : this.handleFiles(t)))
        }
        ,
        s.prototype.paste = function(e) {
            var t, i;
            if (null != (null != e && null != (i = e.clipboardData) ? i.items : void 0))
                return this.emit("paste", e),
                (t = e.clipboardData.items).length ? this._addFilesFromItems(t) : void 0
        }
        ,
        s.prototype.handleFiles = function(e) {
            var t, i, n, o;
            for (o = [],
            i = 0,
            n = e.length; i < n; i++)
                t = e[i],
                o.push(this.addFile(t));
            return o
        }
        ,
        s.prototype._addFilesFromItems = function(e) {
            var t, i, n, o, s;
            for (s = [],
            n = 0,
            o = e.length; n < o; n++)
                null != (i = e[n]).webkitGetAsEntry && (t = i.webkitGetAsEntry()) ? t.isFile ? s.push(this.addFile(i.getAsFile())) : t.isDirectory ? s.push(this._addFilesFromDirectory(t, t.name)) : s.push(void 0) : null != i.getAsFile && (null == i.kind || "file" === i.kind) ? s.push(this.addFile(i.getAsFile())) : s.push(void 0);
            return s
        }
        ,
        s.prototype._addFilesFromDirectory = function(e, t) {
            var i, n, o, s;
            return i = e.createReader(),
            n = function(e) {
                return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(e) : void 0
            }
            ,
            s = this,
            (o = function() {
                return i.readEntries(function(e) {
                    var i, n, r;
                    if (e.length > 0) {
                        for (n = 0,
                        r = e.length; n < r; n++)
                            (i = e[n]).isFile ? i.file(function(e) {
                                if (!s.options.ignoreHiddenFiles || "." !== e.name.substring(0, 1))
                                    return e.fullPath = t + "/" + e.name,
                                    s.addFile(e)
                            }) : i.isDirectory && s._addFilesFromDirectory(i, t + "/" + i.name);
                        o()
                    }
                    return null
                }, n)
            }
            )()
        }
        ,
        s.prototype.accept = function(e, t) {
            return e.size > 1024 * this.options.maxFilesize * 1024 ? t(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : s.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)),
            this.emit("maxfilesexceeded", e)) : this.options.accept.call(this, e, t) : t(this.options.dictInvalidFileType)
        }
        ,
        s.prototype.addFile = function(e) {
            return e.upload = {
                progress: 0,
                total: e.size,
                bytesSent: 0,
                filename: this._renameFile(e)
            },
            this.files.push(e),
            e.status = s.ADDED,
            this.emit("addedfile", e),
            this._enqueueThumbnail(e),
            this.accept(e, (t = this,
            function(i) {
                return i ? (e.accepted = !1,
                t._errorProcessing([e], i)) : (e.accepted = !0,
                t.options.autoQueue && t.enqueueFile(e)),
                t._updateMaxFilesReachedClass()
            }
            ));
            var t
        }
        ,
        s.prototype.enqueueFiles = function(e) {
            var t, i, n;
            for (i = 0,
            n = e.length; i < n; i++)
                t = e[i],
                this.enqueueFile(t);
            return null
        }
        ,
        s.prototype.enqueueFile = function(e) {
            if (e.status !== s.ADDED || !0 !== e.accepted)
                throw new Error("This file can't be queued because it has already been processed or was rejected.");
            if (e.status = s.QUEUED,
            this.options.autoProcessQueue)
                return setTimeout((t = this,
                function() {
                    return t.processQueue()
                }
                ), 0);
            var t
        }
        ,
        s.prototype._thumbnailQueue = [],
        s.prototype._processingThumbnail = !1,
        s.prototype._enqueueThumbnail = function(e) {
            if (this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024)
                return this._thumbnailQueue.push(e),
                setTimeout((t = this,
                function() {
                    return t._processThumbnailQueue()
                }
                ), 0);
            var t
        }
        ,
        s.prototype._processThumbnailQueue = function() {
            var e, t;
            if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length)
                return this._processingThumbnail = !0,
                e = this._thumbnailQueue.shift(),
                this.createThumbnail(e, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, !0, (t = this,
                function(i) {
                    return t.emit("thumbnail", e, i),
                    t._processingThumbnail = !1,
                    t._processThumbnailQueue()
                }
                ))
        }
        ,
        s.prototype.removeFile = function(e) {
            if (e.status === s.UPLOADING && this.cancelUpload(e),
            this.files = l(this.files, e),
            this.emit("removedfile", e),
            0 === this.files.length)
                return this.emit("reset")
        }
        ,
        s.prototype.removeAllFiles = function(e) {
            var t, i, n, o;
            for (null == e && (e = !1),
            i = 0,
            n = (o = this.files.slice()).length; i < n; i++)
                ((t = o[i]).status !== s.UPLOADING || e) && this.removeFile(t);
            return null
        }
        ,
        s.prototype.resizeImage = function(e, t, n, o, r) {
            return this.createThumbnail(e, t, n, o, !1, (a = this,
            function(t, n) {
                var o, l;
                return null === n ? r(e) : (null == (o = a.options.resizeMimeType) && (o = e.type),
                l = n.toDataURL(o, a.options.resizeQuality),
                "image/jpeg" !== o && "image/jpg" !== o || (l = i.restore(e.dataURL, l)),
                r(s.dataURItoBlob(l)))
            }
            ));
            var a
        }
        ,
        s.prototype.createThumbnail = function(e, t, i, n, o, s) {
            var r, a;
            return (r = new FileReader).onload = (a = this,
            function() {
                if (e.dataURL = r.result,
                "image/svg+xml" !== e.type)
                    return a.createThumbnailFromUrl(e, t, i, n, o, s);
                null != s && s(r.result)
            }
            ),
            r.readAsDataURL(e)
        }
        ,
        s.prototype.createThumbnailFromUrl = function(e, t, i, n, o, s, a) {
            var l, h;
            return l = document.createElement("img"),
            a && (l.crossOrigin = a),
            l.onload = (h = this,
            function() {
                var a;
                return a = function(e) {
                    return e(1)
                }
                ,
                "undefined" != typeof EXIF && null !== EXIF && o && (a = function(e) {
                    return EXIF.getData(l, function() {
                        return e(EXIF.getTag(this, "Orientation"))
                    })
                }
                ),
                a(function(o) {
                    var a, d, u, c, p, f, m, g;
                    switch (e.width = l.width,
                    e.height = l.height,
                    m = h.options.resize.call(h, e, t, i, n),
                    d = (a = document.createElement("canvas")).getContext("2d"),
                    a.width = m.trgWidth,
                    a.height = m.trgHeight,
                    o > 4 && (a.width = m.trgHeight,
                    a.height = m.trgWidth),
                    o) {
                    case 2:
                        d.translate(a.width, 0),
                        d.scale(-1, 1);
                        break;
                    case 3:
                        d.translate(a.width, a.height),
                        d.rotate(Math.PI);
                        break;
                    case 4:
                        d.translate(0, a.height),
                        d.scale(1, -1);
                        break;
                    case 5:
                        d.rotate(.5 * Math.PI),
                        d.scale(1, -1);
                        break;
                    case 6:
                        d.rotate(.5 * Math.PI),
                        d.translate(0, -a.height);
                        break;
                    case 7:
                        d.rotate(.5 * Math.PI),
                        d.translate(a.width, -a.height),
                        d.scale(-1, 1);
                        break;
                    case 8:
                        d.rotate(-.5 * Math.PI),
                        d.translate(-a.width, 0)
                    }
                    if (r(d, l, null != (u = m.srcX) ? u : 0, null != (c = m.srcY) ? c : 0, m.srcWidth, m.srcHeight, null != (p = m.trgX) ? p : 0, null != (f = m.trgY) ? f : 0, m.trgWidth, m.trgHeight),
                    g = a.toDataURL("image/png"),
                    null != s)
                        return s(g, a)
                })
            }
            ),
            null != s && (l.onerror = s),
            l.src = e.dataURL
        }
        ,
        s.prototype.processQueue = function() {
            var e, t, i, n;
            if (t = this.options.parallelUploads,
            e = i = this.getUploadingFiles().length,
            !(i >= t) && (n = this.getQueuedFiles()).length > 0) {
                if (this.options.uploadMultiple)
                    return this.processFiles(n.slice(0, t - i));
                for (; e < t; ) {
                    if (!n.length)
                        return;
                    this.processFile(n.shift()),
                    e++
                }
            }
        }
        ,
        s.prototype.processFile = function(e) {
            return this.processFiles([e])
        }
        ,
        s.prototype.processFiles = function(e) {
            var t, i, n;
            for (i = 0,
            n = e.length; i < n; i++)
                (t = e[i]).processing = !0,
                t.status = s.UPLOADING,
                this.emit("processing", t);
            return this.options.uploadMultiple && this.emit("processingmultiple", e),
            this.uploadFiles(e)
        }
        ,
        s.prototype._getFilesWithXhr = function(e) {
            var t;
            return function() {
                var i, n, o, s;
                for (s = [],
                i = 0,
                n = (o = this.files).length; i < n; i++)
                    (t = o[i]).xhr === e && s.push(t);
                return s
            }
            .call(this)
        }
        ,
        s.prototype.cancelUpload = function(e) {
            var t, i, n, o, r, a, l;
            if (e.status === s.UPLOADING) {
                for (n = 0,
                r = (i = this._getFilesWithXhr(e.xhr)).length; n < r; n++)
                    (t = i[n]).status = s.CANCELED;
                for (e.xhr.abort(),
                o = 0,
                a = i.length; o < a; o++)
                    t = i[o],
                    this.emit("canceled", t);
                this.options.uploadMultiple && this.emit("canceledmultiple", i)
            } else
                (l = e.status) !== s.ADDED && l !== s.QUEUED || (e.status = s.CANCELED,
                this.emit("canceled", e),
                this.options.uploadMultiple && this.emit("canceledmultiple", [e]));
            if (this.options.autoProcessQueue)
                return this.processQueue()
        }
        ,
        o = function() {
            var e, t;
            return t = arguments[0],
            e = 2 <= arguments.length ? h.call(arguments, 1) : [],
            "function" == typeof t ? t.apply(this, e) : t
        }
        ,
        s.prototype.uploadFile = function(e) {
            return this.uploadFiles([e])
        }
        ,
        s.prototype.uploadFiles = function(e) {
            var t, i, r, a, l, h, d, u, c, p, f, m, g, _, v, y, w, L, b, x, C, M, k, T, E, F, S, z, A, P, O, D, I, B, R, Z, U, H, N;
            for (Z = new XMLHttpRequest,
            g = 0,
            w = e.length; g < w; g++)
                (r = e[g]).xhr = Z;
            M = o(this.options.method, e),
            B = o(this.options.url, e),
            Z.open(M, B, !0),
            Z.timeout = o(this.options.timeout, e),
            Z.withCredentials = !!this.options.withCredentials,
            O = null,
            U = this,
            l = function() {
                var t, i, n;
                for (n = [],
                t = 0,
                i = e.length; t < i; t++)
                    r = e[t],
                    n.push(U._errorProcessing(e, O || U.options.dictResponseError.replace("{{statusCode}}", Z.status), Z));
                return n
            }
            ,
            H = this,
            I = function(t) {
                var i, n, o, s, a, l, h, d, u;
                if (null != t)
                    for (d = 100 * t.loaded / t.total,
                    n = 0,
                    s = e.length; n < s; n++)
                        (r = e[n]).upload = {
                            progress: d,
                            total: t.total,
                            bytesSent: t.loaded
                        };
                else {
                    for (i = !0,
                    d = 100,
                    o = 0,
                    a = e.length; o < a; o++)
                        100 === (r = e[o]).upload.progress && r.upload.bytesSent === r.upload.total || (i = !1),
                        r.upload.progress = d,
                        r.upload.bytesSent = r.upload.total;
                    if (i)
                        return
                }
                for (u = [],
                h = 0,
                l = e.length; h < l; h++)
                    r = e[h],
                    u.push(H.emit("uploadprogress", r, d, r.upload.bytesSent));
                return u
            }
            ,
            Z.onload = (N = this,
            function(t) {
                var i;
                if (e[0].status !== s.CANCELED && 4 === Z.readyState) {
                    if (O = Z.responseText,
                    Z.getResponseHeader("content-type") && ~Z.getResponseHeader("content-type").indexOf("application/json"))
                        try {
                            O = JSON.parse(O)
                        } catch (e) {
                            t = e,
                            O = "Invalid JSON response from server."
                        }
                    return I(),
                    200 <= (i = Z.status) && i < 300 ? N._finished(e, O, t) : l()
                }
            }
            ),
            Z.onerror = function() {
                if (e[0].status !== s.CANCELED)
                    return l()
            }
            ,
            (null != (E = Z.upload) ? E : Z).onprogress = I,
            u = {
                Accept: "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            },
            this.options.headers && n(u, this.options.headers);
            for (h in u)
                (d = u[h]) && Z.setRequestHeader(h, d);
            if (a = new FormData,
            this.options.params) {
                F = this.options.params;
                for (v in F)
                    R = F[v],
                    a.append(v, R)
            }
            for (_ = 0,
            L = e.length; _ < L; _++)
                r = e[_],
                this.emit("sending", r, Z, a);
            if (this.options.uploadMultiple && this.emit("sendingmultiple", e, Z, a),
            "FORM" === this.element.tagName)
                for (y = 0,
                b = (S = this.element.querySelectorAll("input, textarea, select, button")).length; y < b; y++)
                    if (f = (p = S[y]).getAttribute("name"),
                    m = p.getAttribute("type"),
                    "SELECT" === p.tagName && p.hasAttribute("multiple"))
                        for (C = 0,
                        x = (z = p.options).length; C < x; C++)
                            (T = z[C]).selected && a.append(f, T.value);
                    else
                        (!m || "checkbox" !== (A = m.toLowerCase()) && "radio" !== A || p.checked) && a.append(f, p.value);
            for (t = 0,
            D = [],
            c = k = 0,
            P = e.length - 1; 0 <= P ? k <= P : k >= P; c = 0 <= P ? ++k : --k)
                i = function(i) {
                    return function(n, o, s) {
                        return function(n) {
                            if (a.append(o, n, s),
                            ++t === e.length)
                                return i.submitRequest(Z, a, e)
                        }
                    }
                }(this),
                D.push(this.options.transformFile.call(this, e[c], i(e[c], this._getParamName(c), e[c].upload.filename)));
            return D
        }
        ,
        s.prototype.submitRequest = function(e, t, i) {
            return e.send(t)
        }
        ,
        s.prototype._finished = function(e, t, i) {
            var n, o, r;
            for (o = 0,
            r = e.length; o < r; o++)
                (n = e[o]).status = s.SUCCESS,
                this.emit("success", n, t, i),
                this.emit("complete", n);
            if (this.options.uploadMultiple && (this.emit("successmultiple", e, t, i),
            this.emit("completemultiple", e)),
            this.options.autoProcessQueue)
                return this.processQueue()
        }
        ,
        s.prototype._errorProcessing = function(e, t, i) {
            var n, o, r;
            for (o = 0,
            r = e.length; o < r; o++)
                (n = e[o]).status = s.ERROR,
                this.emit("error", n, t, i),
                this.emit("complete", n);
            if (this.options.uploadMultiple && (this.emit("errormultiple", e, t, i),
            this.emit("completemultiple", e)),
            this.options.autoProcessQueue)
                return this.processQueue()
        }
        ,
        s
    }()).version = "5.1.0",
    e.options = {},
    e.optionsForElement = function(t) {
        return t.getAttribute("id") ? e.options[n(t.getAttribute("id"))] : void 0
    }
    ,
    e.instances = [],
    e.forElement = function(e) {
        if ("string" == typeof e && (e = document.querySelector(e)),
        null == (null != e ? e.dropzone : void 0))
            throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return e.dropzone
    }
    ,
    e.autoDiscover = !0,
    e.discover = function() {
        var t, i, n, o, s, r;
        for (document.querySelectorAll ? n = document.querySelectorAll(".dropzone") : (n = [],
        (t = function(e) {
            var t, i, o, s;
            for (s = [],
            i = 0,
            o = e.length; i < o; i++)
                t = e[i],
                /(^| )dropzone($| )/.test(t.className) ? s.push(n.push(t)) : s.push(void 0);
            return s
        }
        )(document.getElementsByTagName("div")),
        t(document.getElementsByTagName("form"))),
        r = [],
        o = 0,
        s = n.length; o < s; o++)
            i = n[o],
            !1 !== e.optionsForElement(i) ? r.push(new e(i)) : r.push(void 0);
        return r
    }
    ,
    e.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i],
    e.isBrowserSupported = function() {
        var t, i, n, o;
        if (t = !0,
        window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)
            if ("classList"in document.createElement("a"))
                for (i = 0,
                n = (o = e.blacklistedBrowsers).length; i < n; i++)
                    o[i].test(navigator.userAgent) && (t = !1);
            else
                t = !1;
        else
            t = !1;
        return t
    }
    ,
    e.dataURItoBlob = function(e) {
        var t, i, n, o, s, r, a;
        for (i = atob(e.split(",")[1]),
        r = e.split(",")[0].split(":")[1].split(";")[0],
        t = new ArrayBuffer(i.length),
        o = new Uint8Array(t),
        n = s = 0,
        a = i.length; 0 <= a ? s <= a : s >= a; n = 0 <= a ? ++s : --s)
            o[n] = i.charCodeAt(n);
        return new Blob([t],{
            type: r
        })
    }
    ,
    l = function(e, t) {
        var i, n, o, s;
        for (s = [],
        n = 0,
        o = e.length; n < o; n++)
            (i = e[n]) !== t && s.push(i);
        return s
    }
    ,
    n = function(e) {
        return e.replace(/[\-_](\w)/g, function(e) {
            return e.charAt(1).toUpperCase()
        })
    }
    ,
    e.createElement = function(e) {
        var t;
        return (t = document.createElement("div")).innerHTML = e,
        t.childNodes[0]
    }
    ,
    e.elementInside = function(e, t) {
        if (e === t)
            return !0;
        for (; e = e.parentNode; )
            if (e === t)
                return !0;
        return !1
    }
    ,
    e.getElement = function(e, t) {
        var i;
        if ("string" == typeof e ? i = document.querySelector(e) : null != e.nodeType && (i = e),
        null == i)
            throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return i
    }
    ,
    e.getElements = function(e, t) {
        var i, n, o, s, r, a, l;
        if (e instanceof Array) {
            n = [];
            try {
                for (o = 0,
                r = e.length; o < r; o++)
                    i = e[o],
                    n.push(this.getElement(i, t))
            } catch (e) {
                e,
                n = null
            }
        } else if ("string" == typeof e)
            for (n = [],
            s = 0,
            a = (l = document.querySelectorAll(e)).length; s < a; s++)
                i = l[s],
                n.push(i);
        else
            null != e.nodeType && (n = [e]);
        if (null == n || !n.length)
            throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return n
    }
    ,
    e.confirm = function(e, t, i) {
        return window.confirm(e) ? t() : null != i ? i() : void 0
    }
    ,
    e.isValidFile = function(e, t) {
        var i, n, o, s, r;
        if (!t)
            return !0;
        for (t = t.split(","),
        i = (s = e.type).replace(/\/.*$/, ""),
        n = 0,
        o = t.length; n < o; n++)
            if ("." === (r = (r = t[n]).trim()).charAt(0)) {
                if (-1 !== e.name.toLowerCase().indexOf(r.toLowerCase(), e.name.length - r.length))
                    return !0
            } else if (/\/\*$/.test(r)) {
                if (i === r.replace(/\/.*$/, ""))
                    return !0
            } else if (s === r)
                return !0;
        return !1
    }
    ,
    "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function(t) {
        return this.each(function() {
            return new e(this,t)
        })
    }
    ),
    "undefined" != typeof module && null !== module ? module.exports = e : window.Dropzone = e,
    e.ADDED = "added",
    e.QUEUED = "queued",
    e.ACCEPTED = e.QUEUED,
    e.UPLOADING = "uploading",
    e.PROCESSING = e.UPLOADING,
    e.CANCELED = "canceled",
    e.ERROR = "error",
    e.SUCCESS = "success",
    s = function(e) {
        var t, i, n, o, s, r, a, l;
        for (e.naturalWidth,
        s = e.naturalHeight,
        (t = document.createElement("canvas")).width = 1,
        t.height = s,
        (i = t.getContext("2d")).drawImage(e, 0, 0),
        n = i.getImageData(1, 0, 1, s).data,
        l = 0,
        o = s,
        r = s; r > l; )
            0 === n[4 * (r - 1) + 3] ? o = r : l = r,
            r = o + l >> 1;
        return 0 === (a = r / s) ? 1 : a
    }
    ,
    r = function(e, t, i, n, o, r, a, l, h, d) {
        var u;
        return u = s(t),
        e.drawImage(t, i, n, o, r, a, l, h, d / u)
    }
    ,
    i = function() {
        function e() {}
        return e.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        e.encode64 = function(e) {
            var t, i, n, o, s, r, a, l, h;
            for (h = "",
            t = void 0,
            i = void 0,
            n = "",
            o = void 0,
            s = void 0,
            r = void 0,
            a = "",
            l = 0; o = (t = e[l++]) >> 2,
            s = (3 & t) << 4 | (i = e[l++]) >> 4,
            r = (15 & i) << 2 | (n = e[l++]) >> 6,
            a = 63 & n,
            isNaN(i) ? r = a = 64 : isNaN(n) && (a = 64),
            h = h + this.KEY_STR.charAt(o) + this.KEY_STR.charAt(s) + this.KEY_STR.charAt(r) + this.KEY_STR.charAt(a),
            t = i = n = "",
            o = s = r = a = "",
            l < e.length; )
                ;
            return h
        }
        ,
        e.restore = function(e, t) {
            var i, n, o;
            return e.match("data:image/jpeg;base64,") ? (n = this.decode64(e.replace("data:image/jpeg;base64,", "")),
            o = this.slice2Segments(n),
            i = this.exifManipulation(t, o),
            "data:image/jpeg;base64," + this.encode64(i)) : t
        }
        ,
        e.exifManipulation = function(e, t) {
            var i, n;
            return i = this.getExifArray(t),
            n = this.insertExif(e, i),
            new Uint8Array(n)
        }
        ,
        e.getExifArray = function(e) {
            var t, i;
            for (t = void 0,
            i = 0; i < e.length; ) {
                if (255 === (t = e[i])[0] & 225 === t[1])
                    return t;
                i++
            }
            return []
        }
        ,
        e.insertExif = function(e, t) {
            var i, n, o, s, r;
            return o = e.replace("data:image/jpeg;base64,", ""),
            r = (n = this.decode64(o)).indexOf(255, 3),
            s = n.slice(0, r),
            i = n.slice(r),
            s.concat(t).concat(i)
        }
        ,
        e.slice2Segments = function(e) {
            var t, i, n, o;
            for (i = 0,
            o = []; !(255 === e[i] & 218 === e[i + 1] || (255 === e[i] & 216 === e[i + 1] ? i += 2 : (t = i + (256 * e[i + 2] + e[i + 3]) + 2,
            n = e.slice(i, t),
            o.push(n),
            i = t),
            i > e.length)); )
                ;
            return o
        }
        ,
        e.decode64 = function(e) {
            var t, i, n, o, s, r, a, l;
            for ("",
            i = void 0,
            n = void 0,
            o = "",
            void 0,
            s = void 0,
            r = void 0,
            a = "",
            l = 0,
            t = [],
            /[^A-Za-z0-9\+\/\=]/g.exec(e) && console.warning("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i = this.KEY_STR.indexOf(e.charAt(l++)) << 2 | (s = this.KEY_STR.indexOf(e.charAt(l++))) >> 4,
            n = (15 & s) << 4 | (r = this.KEY_STR.indexOf(e.charAt(l++))) >> 2,
            o = (3 & r) << 6 | (a = this.KEY_STR.indexOf(e.charAt(l++))),
            t.push(i),
            64 !== r && t.push(n),
            64 !== a && t.push(o),
            i = n = o = "",
            s = r = a = "",
            l < e.length; )
                ;
            return t
        }
        ,
        e
    }(),
    o = function(e, t) {
        var i, n, o, s, r, a, l, h, d;
        if (o = !1,
        d = !0,
        n = e.document,
        h = n.documentElement,
        i = n.addEventListener ? "addEventListener" : "attachEvent",
        l = n.addEventListener ? "removeEventListener" : "detachEvent",
        a = n.addEventListener ? "" : "on",
        s = function(i) {
            if ("readystatechange" !== i.type || "complete" === n.readyState)
                return ("load" === i.type ? e : n)[l](a + i.type, s, !1),
                !o && (o = !0) ? t.call(e, i.type || i) : void 0
        }
        ,
        r = function() {
            try {
                h.doScroll("left")
            } catch (e) {
                return e,
                void setTimeout(r, 50)
            }
            return s("poll")
        }
        ,
        "complete" !== n.readyState) {
            if (n.createEventObject && h.doScroll) {
                try {
                    d = !e.frameElement
                } catch (e) {}
                d && r()
            }
            return n[i](a + "DOMContentLoaded", s, !1),
            n[i](a + "readystatechange", s, !1),
            e[i](a + "load", s, !1)
        }
    }
    ,
    e._autoDiscoverFunction = function() {
        if (e.autoDiscover)
            return e.discover()
    }
    ,
    o(window, e._autoDiscoverFunction)
}
).call(this),
function(e) {
    e.Zebra_Tooltips = function(t, i) {
        var n, o, s, r, a = {
            animation_speed: 300,
            animation_offset: 20,
            background_color: "#505050",
            close_on_click: !0,
            color: "#FFF",
            content: !1,
            default_position: "above",
            hide_delay: 100,
            keep_visible: !0,
            max_width: 250,
            opacity: ".95",
            position: "center",
            prerender: !1,
            show_delay: 100,
            vertical_offset: 0,
            onBeforeHide: null,
            onHide: null,
            onBeforeShow: null,
            onShow: null
        }, l = this;
        l.settings = {},
        l.hide = function(t, i) {
            t.each(function() {
                var t = e(this)
                  , n = t.data("Zebra_Tooltip");
                n && (n.sticky = !1,
                i && (n.destroy = !0),
                t.data("Zebra_Tooltip", n),
                d(t))
            })
        }
        ,
        l.show = function(t, i) {
            t.each(function() {
                var t = e(this)
                  , n = t.data("Zebra_Tooltip");
                n && (n.sticky = !0,
                n.muted = !1,
                i && (n.destroy = !0),
                t.data("Zebra_Tooltip", n),
                u(t))
            })
        }
        ;
        var h = function(t) {
            var i = t.data("Zebra_Tooltip");
            if (!i.tooltip) {
                var a = jQuery("<div>", {
                    class: "Zebra_Tooltip",
                    css: {
                        opacity: 0,
                        display: "block"
                    }
                })
                  , h = jQuery("<div>", {
                    class: "Zebra_Tooltip_Message",
                    css: {
                        "max-width": l.settings.max_width,
                        "background-color": l.settings.background_color,
                        color: l.settings.color
                    }
                }).html(l.settings.content ? l.settings.content : i.content).appendTo(a)
                  , c = jQuery("<div>", {
                    class: "Zebra_Tooltip_Arrow"
                }).appendTo(a)
                  , p = jQuery("<div>").appendTo(c);
                l.settings.keep_visible && (a.bind("mouseleave" + (l.settings.close_on_click ? " click" : ""), function() {
                    d(t)
                }),
                a.bind("mouseenter", function() {
                    u(t)
                })),
                a.appendTo("body");
                var f = a.outerWidth()
                  , m = a.outerHeight()
                  , g = p.outerWidth()
                  , _ = p.outerHeight()
                  , v = h.outerWidth()
                  , y = h.outerHeight();
                i = {
                    tooltip: a,
                    tooltip_width: f,
                    tooltip_height: m + _ / 2,
                    message: h,
                    arrow_container: c,
                    arrow_width: g,
                    arrow_height: _,
                    arrow: p
                },
                a.css({
                    width: i.tooltip_width,
                    height: i.tooltip_height
                }),
                i.tooltip_width = i.tooltip_width + (h.outerWidth() - v),
                i.tooltip_height = i.tooltip_height + (h.outerHeight() - y),
                a.css({
                    width: i.tooltip_width,
                    height: i.tooltip_height,
                    display: "none"
                }),
                i = e.extend(t.data("Zebra_Tooltip"), i),
                t.data("Zebra_Tooltip", i)
            }
            if (i.sticky && !i.close && (jQuery("<a>", {
                class: "Zebra_Tooltip_Close",
                href: "javascript:void(0)"
            }).html("x").bind("click", function(e) {
                e.preventDefault();
                var i = t.data("Zebra_Tooltip");
                i.sticky = !1,
                t.data("Zebra_Tooltip", i),
                d(t)
            }).appendTo(i.message),
            i.close = !0,
            i = e.extend(t.data("Zebra_Tooltip"), i),
            t.data("Zebra_Tooltip", i)),
            i.window_resized || i.window_scrolled) {
                var w = e(window);
                if (i.window_resized) {
                    n = w.width(),
                    o = w.height();
                    var L = t.offset();
                    e.extend(i, {
                        element_left: L.left,
                        element_top: L.top,
                        element_width: t.outerWidth(),
                        element_height: t.outerHeight()
                    })
                }
                r = w.scrollTop(),
                s = w.scrollLeft();
                var b = "left" == l.settings.position ? i.element_left - i.tooltip_width + i.arrow_width : "right" == l.settings.position ? i.element_left + i.element_width - i.arrow_width : i.element_left + (i.element_width - i.tooltip_width) / 2
                  , x = i.element_top - i.tooltip_height
                  , C = "left" == l.settings.position ? i.tooltip_width - i.arrow_width - i.arrow_width / 2 : "right" == l.settings.position ? i.arrow_width / 2 : (i.tooltip_width - i.arrow_width) / 2;
                b + i.tooltip_width > n + s && (C -= n + s - (b + i.tooltip_width) - 6,
                b = n + s - i.tooltip_width - 6,
                C + i.arrow_width > i.tooltip_width - 6 && (C = i.tooltip_width - 6 - i.arrow_width),
                b + C + i.arrow_width / 2 < i.element_left && (C = -1e4)),
                s > b && (C -= s - b,
                b = s + 2,
                0 > C && (C = i.arrow_width / 2),
                b + C + i.arrow_width / 2 > i.element_left + i.element_width && (C = -1e4)),
                i.arrow_container.removeClass("Zebra_Tooltip_Arrow_Top"),
                i.arrow_container.addClass("Zebra_Tooltip_Arrow_Bottom"),
                i.message.css("margin-top", ""),
                i.arrow.css("borderColor", l.settings.background_color + " transparent transparent"),
                r > x || "below" == l.settings.default_position && i.element_top + i.element_height + l.settings.vertical_offset + i.tooltip_height + i.animation_offset < o + r ? (x = i.element_top + i.element_height - l.settings.vertical_offset,
                i.animation_offset = Math.abs(i.animation_offset),
                i.message.css("margin-top", i.arrow_height / 2),
                i.arrow_container.removeClass("Zebra_Tooltip_Arrow_Bottom"),
                i.arrow_container.addClass("Zebra_Tooltip_Arrow_Top"),
                i.arrow.css("borderColor", "transparent transparent " + l.settings.background_color)) : (i.animation_offset = -Math.abs(i.animation_offset),
                x += l.settings.vertical_offset),
                i.arrow_container.css("left", C),
                i.tooltip.css({
                    left: b,
                    top: x
                }),
                e.extend(i, {
                    tooltip_left: b,
                    tooltip_top: x,
                    arrow_left: C
                }),
                i.window_resized = !1,
                i.window_scrolled = !1,
                i = e.extend(t.data("Zebra_Tooltip"), i),
                t.data("Zebra_Tooltip", i)
            }
            return i
        }
          , d = function(t) {
            var i = t.data("Zebra_Tooltip");
            clearTimeout(i.hide_timeout),
            i.sticky || (clearTimeout(i.show_timeout),
            i.hide_timeout = setTimeout(function() {
                i.tooltip && (l.settings.onBeforeHide && "function" == typeof l.settings.onBeforeHide && l.settings.onBeforeHide(t, i.tooltip),
                i.close = !1,
                i.destroy && (i.muted = !0),
                t.data("Zebra_Tooltip", i),
                e("a.Zebra_Tooltip_Close", i.tooltip).remove(),
                i.tooltip.stop(),
                i.tooltip.animate({
                    opacity: 0,
                    top: i.tooltip_top + i.animation_offset
                }, l.settings.animation_speed, function() {
                    e(this).css("display", "none"),
                    l.settings.onHide && "function" == typeof l.settings.onHide && l.settings.onHide(t, i.tooltip)
                }))
            }, l.settings.hide_delay))
        }
          , u = function(e) {
            var t = e.data("Zebra_Tooltip");
            clearTimeout(t.show_timeout),
            t.muted || (clearTimeout(t.hide_timeout),
            t.show_timeout = setTimeout(function() {
                t = h(e),
                l.settings.onBeforeShow && "function" == typeof l.settings.onBeforeShow && l.settings.onBeforeShow(e, t.tooltip),
                "block" != t.tooltip.css("display") && t.tooltip.css({
                    top: t.tooltip_top + t.animation_offset
                }),
                t.tooltip.css("display", "block"),
                t.tooltip.stop(),
                t.tooltip.animate({
                    top: t.tooltip_top,
                    opacity: l.settings.opacity
                }, l.settings.animation_speed, function() {
                    l.settings.onShow && "function" == typeof l.settings.onShow && l.settings.onShow(e, t.tooltip)
                })
            }, l.settings.show_delay))
        };
        l.settings = e.extend({}, a, i),
        t.each(function() {
            var t = e(this)
              , i = t.attr("title")
              , n = t.data("zebra-tooltip");
            (i && "" !== i || n && "" !== n || void 0 !== l.settings.content) && (t.bind({
                mouseenter: function() {
                    u(t)
                },
                mouseleave: function() {
                    d(t)
                }
            }),
            t.data("Zebra_Tooltip", {
                tooltip: null,
                content: n || i || "",
                window_resized: !0,
                window_scrolled: !0,
                show_timeout: null,
                hide_timeout: null,
                animation_offset: l.settings.animation_offset,
                sticky: !1,
                destroy: !1,
                muted: !1
            }),
            t.attr("title", ""),
            l.settings.prerender && h(t))
        }),
        e(window).bind("scroll resize", function(i) {
            t.each(function() {
                var t = e(this).data("Zebra_Tooltip");
                t && ("scroll" == i.type ? t.window_scrolled = !0 : t.window_resized = !0,
                e(this).data("Zebra_Tooltip", t))
            })
        })
    }
}(jQuery),
function(e, t, i, n) {
    var o = i("html")
      , s = i(e)
      , r = i(t)
      , a = i.fancybox = function() {
        a.open.apply(this, arguments)
    }
      , l = navigator.userAgent.match(/msie/i)
      , h = null
      , d = t.createTouch !== n
      , u = function(e) {
        return e && e.hasOwnProperty && e instanceof i
    }
      , c = function(e) {
        return e && "string" === i.type(e)
    }
      , p = function(e) {
        return c(e) && 0 < e.indexOf("%")
    }
      , f = function(e, t) {
        var i = parseInt(e, 10) || 0;
        return t && p(e) && (i *= a.getViewport()[t] / 100),
        Math.ceil(i)
    }
      , m = function(e, t) {
        return f(e, t) + "px"
    };
    i.extend(a, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !d,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(e, t) {
            return e && (i.isPlainObject(t) || (t = {}),
            !1 !== a.close(!0)) ? (i.isArray(e) || (e = u(e) ? i(e).get() : [e]),
            i.each(e, function(o, s) {
                var r, l, h, d, p, f = {};
                "object" === i.type(s) && (s.nodeType && (s = i(s)),
                u(s) ? (f = {
                    href: s.data("fancybox-href") || s.attr("href"),
                    title: s.data("fancybox-title") || s.attr("title"),
                    isDom: !0,
                    element: s
                },
                i.metadata && i.extend(!0, f, s.metadata())) : f = s),
                r = t.href || f.href || (c(s) ? s : null),
                l = t.title !== n ? t.title : f.title || "",
                !(d = (h = t.content || f.content) ? "html" : t.type || f.type) && f.isDom && ((d = s.data("fancybox-type")) || (d = (d = s.prop("class").match(/fancybox\.(\w+)/)) ? d[1] : null)),
                c(r) && (d || (a.isImage(r) ? d = "image" : a.isSWF(r) ? d = "swf" : "#" === r.charAt(0) ? d = "inline" : c(s) && (d = "html",
                h = s)),
                "ajax" === d && (r = (p = r.split(/\s+/, 2)).shift(),
                p = p.shift())),
                h || ("inline" === d ? r ? h = i(c(r) ? r.replace(/.*(?=#[^\s]+$)/, "") : r) : f.isDom && (h = s) : "html" === d ? h = r : !d && !r && f.isDom && (d = "inline",
                h = s)),
                i.extend(f, {
                    href: r,
                    type: d,
                    content: h,
                    title: l,
                    selector: p
                }),
                e[o] = f
            }),
            a.opts = i.extend(!0, {}, a.defaults, t),
            t.keys !== n && (a.opts.keys = !!t.keys && i.extend({}, a.defaults.keys, t.keys)),
            a.group = e,
            a._start(a.opts.index)) : void 0
        },
        cancel: function() {
            var e = a.coming;
            e && !1 !== a.trigger("onCancel") && (a.hideLoading(),
            a.ajaxLoad && a.ajaxLoad.abort(),
            a.ajaxLoad = null,
            a.imgPreload && (a.imgPreload.onload = a.imgPreload.onerror = null),
            e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(),
            a.coming = null,
            a.current || a._afterZoomOut(e))
        },
        close: function(e) {
            a.cancel(),
            !1 !== a.trigger("beforeClose") && (a.unbindEvents(),
            a.isActive && (a.isOpen && !0 !== e ? (a.isOpen = a.isOpened = !1,
            a.isClosing = !0,
            i(".fancybox-item, .fancybox-nav").remove(),
            a.wrap.stop(!0, !0).removeClass("fancybox-opened"),
            a.transitions[a.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),
            a._afterZoomOut())))
        },
        play: function(e) {
            var t = function() {
                clearTimeout(a.player.timer)
            }
              , i = function() {
                t(),
                a.current && a.player.isActive && (a.player.timer = setTimeout(a.next, a.current.playSpeed))
            }
              , n = function() {
                t(),
                r.unbind(".player"),
                a.player.isActive = !1,
                a.trigger("onPlayEnd")
            };
            !0 === e || !a.player.isActive && !1 !== e ? a.current && (a.current.loop || a.current.index < a.group.length - 1) && (a.player.isActive = !0,
            r.bind({
                "onCancel.player beforeClose.player": n,
                "onUpdate.player": i,
                "beforeLoad.player": t
            }),
            i(),
            a.trigger("onPlayStart")) : n()
        },
        next: function(e) {
            var t = a.current;
            t && (c(e) || (e = t.direction.next),
            a.jumpto(t.index + 1, e, "next"))
        },
        prev: function(e) {
            var t = a.current;
            t && (c(e) || (e = t.direction.prev),
            a.jumpto(t.index - 1, e, "prev"))
        },
        jumpto: function(e, t, i) {
            var o = a.current;
            o && (e = f(e),
            a.direction = t || o.direction[e >= o.index ? "next" : "prev"],
            a.router = i || "jumpto",
            o.loop && (0 > e && (e = o.group.length + e % o.group.length),
            e %= o.group.length),
            o.group[e] !== n && (a.cancel(),
            a._start(e)))
        },
        reposition: function(e, t) {
            var n, o = a.current, s = o ? o.wrap : null;
            s && (n = a._getPosition(t),
            e && "scroll" === e.type ? (delete n.position,
            s.stop(!0, !0).animate(n, 200)) : (s.css(n),
            o.pos = i.extend({}, o.dim, n)))
        },
        update: function(e) {
            var t = e && e.type
              , i = !t || "orientationchange" === t;
            i && (clearTimeout(h),
            h = null),
            a.isOpen && !h && (h = setTimeout(function() {
                var n = a.current;
                n && !a.isClosing && (a.wrap.removeClass("fancybox-tmp"),
                (i || "load" === t || "resize" === t && n.autoResize) && a._setDimension(),
                "scroll" === t && n.canShrink || a.reposition(e),
                a.trigger("onUpdate"),
                h = null)
            }, i && !d ? 0 : 300))
        },
        toggle: function(e) {
            a.isOpen && (a.current.fitToView = "boolean" === i.type(e) ? e : !a.current.fitToView,
            d && (a.wrap.removeAttr("style").addClass("fancybox-tmp"),
            a.trigger("onUpdate")),
            a.update())
        },
        hideLoading: function() {
            r.unbind(".loading"),
            i("#fancybox-loading").remove()
        },
        showLoading: function() {
            var e, t;
            a.hideLoading(),
            e = i('<div id="fancybox-loading"><div></div></div>').click(a.cancel).appendTo("body"),
            r.bind("keydown.loading", function(e) {
                27 === (e.which || e.keyCode) && (e.preventDefault(),
                a.cancel())
            }),
            a.defaults.fixed || (t = a.getViewport(),
            e.css({
                position: "absolute",
                top: .5 * t.h + t.y,
                left: .5 * t.w + t.x
            }))
        },
        getViewport: function() {
            var t = a.current && a.current.locked || !1
              , i = {
                x: s.scrollLeft(),
                y: s.scrollTop()
            };
            return t ? (i.w = t[0].clientWidth,
            i.h = t[0].clientHeight) : (i.w = d && e.innerWidth ? e.innerWidth : s.width(),
            i.h = d && e.innerHeight ? e.innerHeight : s.height()),
            i
        },
        unbindEvents: function() {
            a.wrap && u(a.wrap) && a.wrap.unbind(".fb"),
            r.unbind(".fb"),
            s.unbind(".fb")
        },
        bindEvents: function() {
            var e, t = a.current;
            t && (s.bind("orientationchange.fb" + (d ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), a.update),
            (e = t.keys) && r.bind("keydown.fb", function(o) {
                var s = o.which || o.keyCode
                  , r = o.target || o.srcElement;
                return (27 !== s || !a.coming) && void (o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || r && (r.type || i(r).is("[contenteditable]")) || i.each(e, function(e, r) {
                    return 1 < t.group.length && r[s] !== n ? (a[e](r[s]),
                    o.preventDefault(),
                    !1) : -1 < i.inArray(s, r) ? (a[e](),
                    o.preventDefault(),
                    !1) : void 0
                }))
            }),
            i.fn.mousewheel && t.mouseWheel && a.wrap.bind("mousewheel.fb", function(e, n, o, s) {
                for (var r = i(e.target || null), l = !1; r.length && !l && !r.is(".fancybox-skin") && !r.is(".fancybox-wrap"); )
                    l = r[0] && !(r[0].style.overflow && "hidden" === r[0].style.overflow) && (r[0].clientWidth && r[0].scrollWidth > r[0].clientWidth || r[0].clientHeight && r[0].scrollHeight > r[0].clientHeight),
                    r = i(r).parent();
                0 !== n && !l && 1 < a.group.length && !t.canShrink && (s > 0 || o > 0 ? a.prev(s > 0 ? "down" : "left") : (0 > s || 0 > o) && a.next(0 > s ? "up" : "right"),
                e.preventDefault())
            }))
        },
        trigger: function(e, t) {
            var n, o = t || a.coming || a.current;
            if (o) {
                if (i.isFunction(o[e]) && (n = o[e].apply(o, Array.prototype.slice.call(arguments, 1))),
                !1 === n)
                    return !1;
                o.helpers && i.each(o.helpers, function(t, n) {
                    n && a.helpers[t] && i.isFunction(a.helpers[t][e]) && a.helpers[t][e](i.extend(!0, {}, a.helpers[t].defaults, n), o)
                }),
                r.trigger(e)
            }
        },
        isImage: function(e) {
            return c(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(e) {
            return c(e) && e.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(e) {
            var t, n, o = {};
            if (e = f(e),
            !(t = a.group[e] || null))
                return !1;
            if (t = (o = i.extend(!0, {}, a.opts, t)).margin,
            n = o.padding,
            "number" === i.type(t) && (o.margin = [t, t, t, t]),
            "number" === i.type(n) && (o.padding = [n, n, n, n]),
            o.modal && i.extend(!0, o, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            }),
            o.autoSize && (o.autoWidth = o.autoHeight = !0),
            "auto" === o.width && (o.autoWidth = !0),
            "auto" === o.height && (o.autoHeight = !0),
            o.group = a.group,
            o.index = e,
            a.coming = o,
            !1 === a.trigger("beforeLoad"))
                a.coming = null;
            else {
                if (n = o.type,
                t = o.href,
                !n)
                    return a.coming = null,
                    !(!a.current || !a.router || "jumpto" === a.router) && (a.current.index = e,
                    a[a.router](a.direction));
                if (a.isActive = !0,
                ("image" === n || "swf" === n) && (o.autoHeight = o.autoWidth = !1,
                o.scrolling = "visible"),
                "image" === n && (o.aspectRatio = !0),
                "iframe" === n && d && (o.scrolling = "scroll"),
                o.wrap = i(o.tpl.wrap).addClass("fancybox-" + (d ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + o.wrapCSS).appendTo(o.parent || "body"),
                i.extend(o, {
                    skin: i(".fancybox-skin", o.wrap),
                    outer: i(".fancybox-outer", o.wrap),
                    inner: i(".fancybox-inner", o.wrap)
                }),
                i.each(["Top", "Right", "Bottom", "Left"], function(e, t) {
                    o.skin.css("padding" + t, m(o.padding[e]))
                }),
                a.trigger("onReady"),
                "inline" === n || "html" === n) {
                    if (!o.content || !o.content.length)
                        return a._error("content")
                } else if (!t)
                    return a._error("href");
                "image" === n ? a._loadImage() : "ajax" === n ? a._loadAjax() : "iframe" === n ? a._loadIframe() : a._afterLoad()
            }
        },
        _error: function(e) {
            i.extend(a.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: e,
                content: a.coming.tpl.error
            }),
            a._afterLoad()
        },
        _loadImage: function() {
            var e = a.imgPreload = new Image;
            e.onload = function() {
                this.onload = this.onerror = null,
                a.coming.width = this.width / a.opts.pixelRatio,
                a.coming.height = this.height / a.opts.pixelRatio,
                a._afterLoad()
            }
            ,
            e.onerror = function() {
                this.onload = this.onerror = null,
                a._error("image")
            }
            ,
            e.src = a.coming.href,
            !0 !== e.complete && a.showLoading()
        },
        _loadAjax: function() {
            var e = a.coming;
            a.showLoading(),
            a.ajaxLoad = i.ajax(i.extend({}, e.ajax, {
                url: e.href,
                error: function(e, t) {
                    a.coming && "abort" !== t ? a._error("ajax", e) : a.hideLoading()
                },
                success: function(t, i) {
                    "success" === i && (e.content = t,
                    a._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var e = a.coming
              , t = i(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", d ? "auto" : e.iframe.scrolling).attr("src", e.href);
            i(e.wrap).bind("onReset", function() {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (e) {}
            }),
            e.iframe.preload && (a.showLoading(),
            t.one("load", function() {
                i(this).data("ready", 1),
                d || i(this).bind("load.fb", a.update),
                i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),
                a._afterLoad()
            })),
            e.content = t.appendTo(e.inner),
            e.iframe.preload || a._afterLoad()
        },
        _preloadImages: function() {
            var e, t, i = a.group, n = a.current, o = i.length, s = n.preload ? Math.min(n.preload, o - 1) : 0;
            for (t = 1; s >= t; t += 1)
                e = i[(n.index + t) % o],
                "image" === e.type && e.href && ((new Image).src = e.href)
        },
        _afterLoad: function() {
            var e, t, n, o, s, r = a.coming, l = a.current;
            if (a.hideLoading(),
            r && !1 !== a.isActive)
                if (!1 === a.trigger("afterLoad", r, l))
                    r.wrap.stop(!0).trigger("onReset").remove(),
                    a.coming = null;
                else {
                    switch (l && (a.trigger("beforeChange", l),
                    l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),
                    a.unbindEvents(),
                    e = r.content,
                    t = r.type,
                    n = r.scrolling,
                    i.extend(a, {
                        wrap: r.wrap,
                        skin: r.skin,
                        outer: r.outer,
                        inner: r.inner,
                        current: r,
                        previous: l
                    }),
                    o = r.href,
                    t) {
                    case "inline":
                    case "ajax":
                    case "html":
                        r.selector ? e = i("<div>").html(e).find(r.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", i('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),
                        e = e.show().detach(),
                        r.wrap.bind("onReset", function() {
                            i(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                        }));
                        break;
                    case "image":
                        e = r.tpl.image.replace("{href}", o);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>',
                        s = "",
                        i.each(r.swf, function(t, i) {
                            e += '<param name="' + t + '" value="' + i + '"></param>',
                            s += " " + t + '="' + i + '"'
                        }),
                        e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + s + "></embed></object>"
                    }
                    (!u(e) || !e.parent().is(r.inner)) && r.inner.append(e),
                    a.trigger("beforeShow"),
                    r.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n),
                    a._setDimension(),
                    a.reposition(),
                    a.isOpen = !1,
                    a.coming = null,
                    a.bindEvents(),
                    a.isOpened ? l.prevMethod && a.transitions[l.prevMethod]() : i(".fancybox-wrap").not(r.wrap).stop(!0).trigger("onReset").remove(),
                    a.transitions[a.isOpened ? r.nextMethod : r.openMethod](),
                    a._preloadImages()
                }
        },
        _setDimension: function() {
            var e, t, n, o, s, r, l, h, d, u = a.getViewport(), c = 0, g = !1, _ = !1, v = (g = a.wrap,
            a.skin), y = a.inner, w = a.current, L = (_ = w.width,
            w.height), b = w.minWidth, x = w.minHeight, C = w.maxWidth, M = w.maxHeight, k = w.scrolling, T = w.scrollOutside ? w.scrollbarWidth : 0, E = w.margin, F = f(E[1] + E[3]), S = f(E[0] + E[2]);
            if (g.add(v).add(y).width("auto").height("auto").removeClass("fancybox-tmp"),
            t = F + (E = f(v.outerWidth(!0) - v.width())),
            n = S + (e = f(v.outerHeight(!0) - v.height())),
            o = p(_) ? (u.w - t) * f(_) / 100 : _,
            s = p(L) ? (u.h - n) * f(L) / 100 : L,
            "iframe" === w.type) {
                if (d = w.content,
                w.autoHeight && 1 === d.data("ready"))
                    try {
                        d[0].contentWindow.document.location && (y.width(o).height(9999),
                        r = d.contents().find("body"),
                        T && r.css("overflow-x", "hidden"),
                        s = r.outerHeight(!0))
                    } catch (e) {}
            } else
                (w.autoWidth || w.autoHeight) && (y.addClass("fancybox-tmp"),
                w.autoWidth || y.width(o),
                w.autoHeight || y.height(s),
                w.autoWidth && (o = y.width()),
                w.autoHeight && (s = y.height()),
                y.removeClass("fancybox-tmp"));
            if (_ = f(o),
            L = f(s),
            h = o / s,
            b = f(p(b) ? f(b, "w") - t : b),
            C = f(p(C) ? f(C, "w") - t : C),
            x = f(p(x) ? f(x, "h") - n : x),
            r = C,
            l = M = f(p(M) ? f(M, "h") - n : M),
            w.fitToView && (C = Math.min(u.w - t, C),
            M = Math.min(u.h - n, M)),
            t = u.w - F,
            S = u.h - S,
            w.aspectRatio ? (_ > C && (L = f((_ = C) / h)),
            L > M && (_ = f((L = M) * h)),
            b > _ && (L = f((_ = b) / h)),
            x > L && (_ = f((L = x) * h))) : (_ = Math.max(b, Math.min(_, C)),
            w.autoHeight && "iframe" !== w.type && (y.width(_),
            L = y.height()),
            L = Math.max(x, Math.min(L, M))),
            w.fitToView)
                if (y.width(_).height(L),
                g.width(_ + E),
                u = g.width(),
                F = g.height(),
                w.aspectRatio)
                    for (; (u > t || F > S) && _ > b && L > x && !(19 < c++); )
                        L = Math.max(x, Math.min(M, L - 10)),
                        _ = f(L * h),
                        b > _ && (_ = b,
                        L = f(_ / h)),
                        _ > C && (_ = C,
                        L = f(_ / h)),
                        y.width(_).height(L),
                        g.width(_ + E),
                        u = g.width(),
                        F = g.height();
                else
                    _ = Math.max(b, Math.min(_, _ - (u - t))),
                    L = Math.max(x, Math.min(L, L - (F - S)));
            T && "auto" === k && s > L && t > _ + E + T && (_ += T),
            y.width(_).height(L),
            g.width(_ + E),
            u = g.width(),
            F = g.height(),
            g = (u > t || F > S) && _ > b && L > x,
            _ = w.aspectRatio ? r > _ && l > L && o > _ && s > L : (r > _ || l > L) && (o > _ || s > L),
            i.extend(w, {
                dim: {
                    width: m(u),
                    height: m(F)
                },
                origWidth: o,
                origHeight: s,
                canShrink: g,
                canExpand: _,
                wPadding: E,
                hPadding: e,
                wrapSpace: F - v.outerHeight(!0),
                skinSpace: v.height() - L
            }),
            !d && w.autoHeight && L > x && M > L && !_ && y.height("auto")
        },
        _getPosition: function(e) {
            var t = a.current
              , i = a.getViewport()
              , n = t.margin
              , o = a.wrap.width() + n[1] + n[3]
              , s = a.wrap.height() + n[0] + n[2];
            n = {
                position: "absolute",
                top: n[0],
                left: n[3]
            };
            return t.autoCenter && t.fixed && !e && s <= i.h && o <= i.w ? n.position = "fixed" : t.locked || (n.top += i.y,
            n.left += i.x),
            n.top = m(Math.max(n.top, n.top + (i.h - s) * t.topRatio)),
            n.left = m(Math.max(n.left, n.left + (i.w - o) * t.leftRatio)),
            n
        },
        _afterZoomIn: function() {
            var e = a.current;
            e && (a.isOpen = a.isOpened = !0,
            a.wrap.css("overflow", "visible").addClass("fancybox-opened"),
            a.update(),
            (e.closeClick || e.nextClick && 1 < a.group.length) && a.inner.css("cursor", "pointer").bind("click.fb", function(t) {
                !i(t.target).is("a") && !i(t.target).parent().is("a") && (t.preventDefault(),
                a[e.closeClick ? "close" : "next"]())
            }),
            e.closeBtn && i(e.tpl.closeBtn).appendTo(a.skin).bind("click.fb", function(e) {
                e.preventDefault(),
                a.close()
            }),
            e.arrows && 1 < a.group.length && ((e.loop || 0 < e.index) && i(e.tpl.prev).appendTo(a.outer).bind("click.fb", a.prev),
            (e.loop || e.index < a.group.length - 1) && i(e.tpl.next).appendTo(a.outer).bind("click.fb", a.next)),
            a.trigger("afterShow"),
            e.loop || e.index !== e.group.length - 1 ? a.opts.autoPlay && !a.player.isActive && (a.opts.autoPlay = !1,
            a.play()) : a.play(!1))
        },
        _afterZoomOut: function(e) {
            e = e || a.current,
            i(".fancybox-wrap").trigger("onReset").remove(),
            i.extend(a, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }),
            a.trigger("afterClose", e)
        }
    }),
    a.transitions = {
        getOrigPosition: function() {
            var e = a.current
              , t = e.element
              , i = e.orig
              , n = {}
              , o = 50
              , s = 50
              , r = e.hPadding
              , l = e.wPadding
              , h = a.getViewport();
            return !i && e.isDom && t.is(":visible") && ((i = t.find("img:first")).length || (i = t)),
            u(i) ? (n = i.offset(),
            i.is("img") && (o = i.outerWidth(),
            s = i.outerHeight())) : (n.top = h.y + (h.h - s) * e.topRatio,
            n.left = h.x + (h.w - o) * e.leftRatio),
            ("fixed" === a.wrap.css("position") || e.locked) && (n.top -= h.y,
            n.left -= h.x),
            {
                top: m(n.top - r * e.topRatio),
                left: m(n.left - l * e.leftRatio),
                width: m(o + l),
                height: m(s + r)
            }
        },
        step: function(e, t) {
            var i, n, o = t.prop, s = (n = a.current).wrapSpace, r = n.skinSpace;
            ("width" === o || "height" === o) && (i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start),
            a.isClosing && (i = 1 - i),
            n = e - (n = "width" === o ? n.wPadding : n.hPadding),
            a.skin[o](f("width" === o ? n : n - s * i)),
            a.inner[o](f("width" === o ? n : n - s * i - r * i)))
        },
        zoomIn: function() {
            var e = a.current
              , t = e.pos
              , n = e.openEffect
              , o = "elastic" === n
              , s = i.extend({
                opacity: 1
            }, t);
            delete s.position,
            o ? (t = this.getOrigPosition(),
            e.openOpacity && (t.opacity = .1)) : "fade" === n && (t.opacity = .1),
            a.wrap.css(t).animate(s, {
                duration: "none" === n ? 0 : e.openSpeed,
                easing: e.openEasing,
                step: o ? this.step : null,
                complete: a._afterZoomIn
            })
        },
        zoomOut: function() {
            var e = a.current
              , t = e.closeEffect
              , i = "elastic" === t
              , n = {
                opacity: .1
            };
            i && (n = this.getOrigPosition(),
            e.closeOpacity && (n.opacity = .1)),
            a.wrap.animate(n, {
                duration: "none" === t ? 0 : e.closeSpeed,
                easing: e.closeEasing,
                step: i ? this.step : null,
                complete: a._afterZoomOut
            })
        },
        changeIn: function() {
            var e, t = a.current, i = t.nextEffect, n = t.pos, o = {
                opacity: 1
            }, s = a.direction;
            n.opacity = .1,
            "elastic" === i && (e = "down" === s || "up" === s ? "top" : "left",
            "down" === s || "right" === s ? (n[e] = m(f(n[e]) - 200),
            o[e] = "+=200px") : (n[e] = m(f(n[e]) + 200),
            o[e] = "-=200px")),
            "none" === i ? a._afterZoomIn() : a.wrap.css(n).animate(o, {
                duration: t.nextSpeed,
                easing: t.nextEasing,
                complete: a._afterZoomIn
            })
        },
        changeOut: function() {
            var e = a.previous
              , t = e.prevEffect
              , n = {
                opacity: .1
            }
              , o = a.direction;
            "elastic" === t && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=200px"),
            e.wrap.animate(n, {
                duration: "none" === t ? 0 : e.prevSpeed,
                easing: e.prevEasing,
                complete: function() {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    },
    a.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !d,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: i("html"),
        create: function(e) {
            e = i.extend({}, this.defaults, e),
            this.overlay && this.close(),
            this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(a.coming ? a.coming.parent : e.parent),
            this.fixed = !1,
            e.fixed && a.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"),
            this.fixed = !0)
        },
        open: function(e) {
            var t = this;
            e = i.extend({}, this.defaults, e),
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e),
            this.fixed || (s.bind("resize.overlay", i.proxy(this.update, this)),
            this.update()),
            e.closeClick && this.overlay.bind("click.overlay", function(e) {
                return i(e.target).hasClass("fancybox-overlay") ? (a.isActive ? a.close() : t.close(),
                !1) : void 0
            }),
            this.overlay.css(e.css).show()
        },
        close: function() {
            var e, t;
            s.unbind("resize.overlay"),
            this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"),
            e = s.scrollTop(),
            t = s.scrollLeft(),
            this.el.removeClass("fancybox-lock"),
            s.scrollTop(e).scrollLeft(t)),
            i(".fancybox-overlay").remove().hide(),
            i.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var e, i = "100%";
            this.overlay.width(i).height("100%"),
            l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth),
            r.width() > e && (i = r.width())) : r.width() > s.width() && (i = r.width()),
            this.overlay.width(i).height(r.height())
        },
        onReady: function(e, t) {
            var n = this.overlay;
            i(".fancybox-overlay").stop(!0, !0),
            n || this.create(e),
            e.locked && this.fixed && t.fixed && (n || (this.margin = r.height() > s.height() && i("html").css("margin-right").replace("px", "")),
            t.locked = this.overlay.append(t.wrap),
            t.fixed = !1),
            !0 === e.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(e, t) {
            var n, o;
            t.locked && (!1 !== this.margin && (i("*").filter(function() {
                return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"),
            this.el.addClass("fancybox-margin")),
            n = s.scrollTop(),
            o = s.scrollLeft(),
            this.el.addClass("fancybox-lock"),
            s.scrollTop(n).scrollLeft(o)),
            this.open(e)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(e) {
            this.overlay && !a.coming && this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this))
        }
    },
    a.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(e) {
            var t = a.current
              , n = t.title
              , o = e.type;
            if (i.isFunction(n) && (n = n.call(t.element, t)),
            c(n) && "" !== i.trim(n)) {
                switch (t = i('<div class="fancybox-title fancybox-title-' + o + '-wrap">' + n + "</div>"),
                o) {
                case "inside":
                    o = a.skin;
                    break;
                case "outside":
                    o = a.wrap;
                    break;
                case "over":
                    o = a.inner;
                    break;
                default:
                    o = a.skin,
                    t.appendTo("body"),
                    l && t.width(t.width()),
                    t.wrapInner('<span class="child"></span>'),
                    a.current.margin[2] += Math.abs(f(t.css("margin-bottom")))
                }
                t["top" === e.position ? "prependTo" : "appendTo"](o)
            }
        }
    },
    i.fn.fancybox = function(e) {
        var t, n = i(this), o = this.selector || "", s = function(s) {
            var r, l, h = i(this).blur(), d = t;
            !(s.ctrlKey || s.altKey || s.shiftKey || s.metaKey || h.is(".fancybox-wrap")) && (r = e.groupAttr || "data-fancybox-group",
            (l = h.attr(r)) || (r = "rel",
            l = h.get(0)[r]),
            l && "" !== l && "nofollow" !== l && (d = (h = (h = o.length ? i(o) : n).filter("[" + r + '="' + l + '"]')).index(this)),
            e.index = d,
            !1 !== a.open(h, e) && s.preventDefault())
        };
        return t = (e = e || {}).index || 0,
        o && !1 !== e.live ? r.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", s) : n.unbind("click.fb-start").bind("click.fb-start", s),
        this.filter("[data-fancybox-start=1]").trigger("click"),
        this
    }
    ,
    r.ready(function() {
        var t, s;
        if (i.scrollbarWidth === n && (i.scrollbarWidth = function() {
            var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body")
              , t = (t = e.children()).innerWidth() - t.height(99).innerWidth();
            return e.remove(),
            t
        }
        ),
        i.support.fixedPosition === n) {
            t = i.support;
            var r = 20 === (s = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"))[0].offsetTop || 15 === s[0].offsetTop;
            s.remove(),
            t.fixedPosition = r
        }
        i.extend(a.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        }),
        t = i(e).width(),
        o.addClass("fancybox-lock-test"),
        s = i(e).width(),
        o.removeClass("fancybox-lock-test"),
        i("<style type='text/css'>.fancybox-margin{margin-right:" + (s - t) + "px;}</style>").appendTo("head")
    })
}(window, document, jQuery),
$(document).ready(function() {
    var e, t, i, n, o = !1;
    function s() {
        o = !0;
        var e, t, i, n, s = document.createElement("script");
        s.src = "https://www.pic2map.com/js/leaflet.js",
        $("head").append(s),
        e = this,
        t = function(e) {
            "use strict";
            var t = L.MarkerClusterGroup = L.FeatureGroup.extend({
                options: {
                    maxClusterRadius: 80,
                    iconCreateFunction: null,
                    clusterPane: L.Marker.prototype.options.pane,
                    spiderfyOnMaxZoom: !0,
                    showCoverageOnHover: !0,
                    zoomToBoundsOnClick: !0,
                    singleMarkerMode: !1,
                    disableClusteringAtZoom: null,
                    removeOutsideVisibleBounds: !0,
                    animate: !0,
                    animateAddingMarkers: !1,
                    spiderfyDistanceMultiplier: 1,
                    spiderLegPolylineOptions: {
                        weight: 1.5,
                        color: "#222",
                        opacity: .5
                    },
                    chunkedLoading: !1,
                    chunkInterval: 200,
                    chunkDelay: 50,
                    chunkProgress: null,
                    polygonOptions: {}
                },
                initialize: function(e) {
                    L.Util.setOptions(this, e),
                    this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction),
                    this._featureGroup = L.featureGroup(),
                    this._featureGroup.addEventParent(this),
                    this._nonPointGroup = L.featureGroup(),
                    this._nonPointGroup.addEventParent(this),
                    this._inZoomAnimation = 0,
                    this._needsClustering = [],
                    this._needsRemoving = [],
                    this._currentShownBounds = null,
                    this._queue = [],
                    this._childMarkerEventHandlers = {
                        dragstart: this._childMarkerDragStart,
                        move: this._childMarkerMoved,
                        dragend: this._childMarkerDragEnd
                    };
                    var t = L.DomUtil.TRANSITION && this.options.animate;
                    L.extend(this, t ? this._withAnimation : this._noAnimation),
                    this._markerCluster = t ? L.MarkerCluster : L.MarkerClusterNonAnimated
                },
                addLayer: function(e) {
                    if (e instanceof L.LayerGroup)
                        return this.addLayers([e]);
                    if (!e.getLatLng)
                        return this._nonPointGroup.addLayer(e),
                        this.fire("layeradd", {
                            layer: e
                        }),
                        this;
                    if (!this._map)
                        return this._needsClustering.push(e),
                        this.fire("layeradd", {
                            layer: e
                        }),
                        this;
                    if (this.hasLayer(e))
                        return this;
                    this._unspiderfy && this._unspiderfy(),
                    this._addLayer(e, this._maxZoom),
                    this.fire("layeradd", {
                        layer: e
                    }),
                    this._topClusterLevel._recalculateBounds(),
                    this._refreshClustersIcons();
                    var t = e
                      , i = this._zoom;
                    if (e.__parent)
                        for (; t.__parent._zoom >= i; )
                            t = t.__parent;
                    return this._currentShownBounds.contains(t.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(e, t) : this._animationAddLayerNonAnimated(e, t)),
                    this
                },
                removeLayer: function(e) {
                    return e instanceof L.LayerGroup ? this.removeLayers([e]) : e.getLatLng ? this._map ? e.__parent ? (this._unspiderfy && (this._unspiderfy(),
                    this._unspiderfyLayer(e)),
                    this._removeLayer(e, !0),
                    this.fire("layerremove", {
                        layer: e
                    }),
                    this._topClusterLevel._recalculateBounds(),
                    this._refreshClustersIcons(),
                    e.off(this._childMarkerEventHandlers, this),
                    this._featureGroup.hasLayer(e) && (this._featureGroup.removeLayer(e),
                    e.clusterShow && e.clusterShow()),
                    this) : this : (!this._arraySplice(this._needsClustering, e) && this.hasLayer(e) && this._needsRemoving.push({
                        layer: e,
                        latlng: e._latlng
                    }),
                    this.fire("layerremove", {
                        layer: e
                    }),
                    this) : (this._nonPointGroup.removeLayer(e),
                    this.fire("layerremove", {
                        layer: e
                    }),
                    this)
                },
                addLayers: function(e, t) {
                    if (!L.Util.isArray(e))
                        return this.addLayer(e);
                    var i, n = this._featureGroup, o = this._nonPointGroup, s = this.options.chunkedLoading, r = this.options.chunkInterval, a = this.options.chunkProgress, l = e.length, h = 0, d = !0;
                    if (this._map) {
                        var u = (new Date).getTime()
                          , c = L.bind(function() {
                            for (var p = (new Date).getTime(); l > h; h++) {
                                if (s && 0 == h % 200)
                                    if ((new Date).getTime() - p > r)
                                        break;
                                if ((i = e[h])instanceof L.LayerGroup)
                                    d && (e = e.slice(),
                                    d = !1),
                                    this._extractNonGroupLayers(i, e),
                                    l = e.length;
                                else if (i.getLatLng) {
                                    if (!this.hasLayer(i) && (this._addLayer(i, this._maxZoom),
                                    t || this.fire("layeradd", {
                                        layer: i
                                    }),
                                    i.__parent && 2 === i.__parent.getChildCount())) {
                                        var f = i.__parent.getAllChildMarkers()
                                          , m = f[0] === i ? f[1] : f[0];
                                        n.removeLayer(m)
                                    }
                                } else
                                    o.addLayer(i),
                                    t || this.fire("layeradd", {
                                        layer: i
                                    })
                            }
                            a && a(h, l, (new Date).getTime() - u),
                            h === l ? (this._topClusterLevel._recalculateBounds(),
                            this._refreshClustersIcons(),
                            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(c, this.options.chunkDelay)
                        }, this);
                        c()
                    } else
                        for (var p = this._needsClustering; l > h; h++)
                            i = e[h],
                            i instanceof L.LayerGroup ? (d && (e = e.slice(),
                            d = !1),
                            this._extractNonGroupLayers(i, e),
                            l = e.length) : i.getLatLng ? this.hasLayer(i) || p.push(i) : o.addLayer(i);
                    return this
                },
                removeLayers: function(e) {
                    var t, i, n = e.length, o = this._featureGroup, s = this._nonPointGroup, r = !0;
                    if (!this._map) {
                        for (t = 0; n > t; t++)
                            i = e[t],
                            i instanceof L.LayerGroup ? (r && (e = e.slice(),
                            r = !1),
                            this._extractNonGroupLayers(i, e),
                            n = e.length) : (this._arraySplice(this._needsClustering, i),
                            s.removeLayer(i),
                            this.hasLayer(i) && this._needsRemoving.push({
                                layer: i,
                                latlng: i._latlng
                            }),
                            this.fire("layerremove", {
                                layer: i
                            }));
                        return this
                    }
                    if (this._unspiderfy) {
                        this._unspiderfy();
                        var a = e.slice()
                          , l = n;
                        for (t = 0; l > t; t++)
                            i = a[t],
                            i instanceof L.LayerGroup ? (this._extractNonGroupLayers(i, a),
                            l = a.length) : this._unspiderfyLayer(i)
                    }
                    for (t = 0; n > t; t++)
                        i = e[t],
                        i instanceof L.LayerGroup ? (r && (e = e.slice(),
                        r = !1),
                        this._extractNonGroupLayers(i, e),
                        n = e.length) : i.__parent ? (this._removeLayer(i, !0, !0),
                        this.fire("layerremove", {
                            layer: i
                        }),
                        o.hasLayer(i) && (o.removeLayer(i),
                        i.clusterShow && i.clusterShow())) : (s.removeLayer(i),
                        this.fire("layerremove", {
                            layer: i
                        }));
                    return this._topClusterLevel._recalculateBounds(),
                    this._refreshClustersIcons(),
                    this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds),
                    this
                },
                clearLayers: function() {
                    return this._map || (this._needsClustering = [],
                    this._needsRemoving = [],
                    delete this._gridClusters,
                    delete this._gridUnclustered),
                    this._noanimationUnspiderfy && this._noanimationUnspiderfy(),
                    this._featureGroup.clearLayers(),
                    this._nonPointGroup.clearLayers(),
                    this.eachLayer(function(e) {
                        e.off(this._childMarkerEventHandlers, this),
                        delete e.__parent
                    }, this),
                    this._map && this._generateInitialClusters(),
                    this
                },
                getBounds: function() {
                    var e = new L.LatLngBounds;
                    this._topClusterLevel && e.extend(this._topClusterLevel._bounds);
                    for (var t = this._needsClustering.length - 1; t >= 0; t--)
                        e.extend(this._needsClustering[t].getLatLng());
                    return e.extend(this._nonPointGroup.getBounds()),
                    e
                },
                eachLayer: function(e, t) {
                    var i, n, o, s = this._needsClustering.slice(), r = this._needsRemoving;
                    for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(s),
                    n = s.length - 1; n >= 0; n--) {
                        for (i = !0,
                        o = r.length - 1; o >= 0; o--)
                            if (r[o].layer === s[n]) {
                                i = !1;
                                break
                            }
                        i && e.call(t, s[n])
                    }
                    this._nonPointGroup.eachLayer(e, t)
                },
                getLayers: function() {
                    var e = [];
                    return this.eachLayer(function(t) {
                        e.push(t)
                    }),
                    e
                },
                getLayer: function(e) {
                    var t = null;
                    return e = parseInt(e, 10),
                    this.eachLayer(function(i) {
                        L.stamp(i) === e && (t = i)
                    }),
                    t
                },
                hasLayer: function(e) {
                    if (!e)
                        return !1;
                    var t, i = this._needsClustering;
                    for (t = i.length - 1; t >= 0; t--)
                        if (i[t] === e)
                            return !0;
                    for (t = (i = this._needsRemoving).length - 1; t >= 0; t--)
                        if (i[t].layer === e)
                            return !1;
                    return !(!e.__parent || e.__parent._group !== this) || this._nonPointGroup.hasLayer(e)
                },
                zoomToShowLayer: function(e, t) {
                    "function" != typeof t && (t = function() {}
                    );
                    var i = function() {
                        !e._icon && !e.__parent._icon || this._inZoomAnimation || (this._map.off("moveend", i, this),
                        this.off("animationend", i, this),
                        e._icon ? t() : e.__parent._icon && (this.once("spiderfied", t, this),
                        e.__parent.spiderfy()))
                    };
                    e._icon && this._map.getBounds().contains(e.getLatLng()) ? t() : e.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", i, this),
                    this._map.panTo(e.getLatLng())) : (this._map.on("moveend", i, this),
                    this.on("animationend", i, this),
                    e.__parent.zoomToBounds())
                },
                onAdd: function(e) {
                    var t, i, n;
                    if (this._map = e,
                    !isFinite(this._map.getMaxZoom()))
                        throw "Map has no maxZoom specified";
                    for (this._featureGroup.addTo(e),
                    this._nonPointGroup.addTo(e),
                    this._gridClusters || this._generateInitialClusters(),
                    this._maxLat = e.options.crs.projection.MAX_LATITUDE,
                    t = 0,
                    i = this._needsRemoving.length; i > t; t++)
                        n = this._needsRemoving[t],
                        n.newlatlng = n.layer._latlng,
                        n.layer._latlng = n.latlng;
                    for (t = 0,
                    i = this._needsRemoving.length; i > t; t++)
                        n = this._needsRemoving[t],
                        this._removeLayer(n.layer, !0),
                        n.layer._latlng = n.newlatlng;
                    this._needsRemoving = [],
                    this._zoom = Math.round(this._map._zoom),
                    this._currentShownBounds = this._getExpandedVisibleBounds(),
                    this._map.on("zoomend", this._zoomEnd, this),
                    this._map.on("moveend", this._moveEnd, this),
                    this._spiderfierOnAdd && this._spiderfierOnAdd(),
                    this._bindEvents(),
                    i = this._needsClustering,
                    this._needsClustering = [],
                    this.addLayers(i, !0)
                },
                onRemove: function(e) {
                    e.off("zoomend", this._zoomEnd, this),
                    e.off("moveend", this._moveEnd, this),
                    this._unbindEvents(),
                    this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""),
                    this._spiderfierOnRemove && this._spiderfierOnRemove(),
                    delete this._maxLat,
                    this._hideCoverage(),
                    this._featureGroup.remove(),
                    this._nonPointGroup.remove(),
                    this._featureGroup.clearLayers(),
                    this._map = null
                },
                getVisibleParent: function(e) {
                    for (var t = e; t && !t._icon; )
                        t = t.__parent;
                    return t || null
                },
                _arraySplice: function(e, t) {
                    for (var i = e.length - 1; i >= 0; i--)
                        if (e[i] === t)
                            return e.splice(i, 1),
                            !0
                },
                _removeFromGridUnclustered: function(e, t) {
                    for (var i = this._map, n = this._gridUnclustered, o = Math.floor(this._map.getMinZoom()); t >= o && n[t].removeObject(e, i.project(e.getLatLng(), t)); t--)
                        ;
                },
                _childMarkerDragStart: function(e) {
                    e.target.__dragStart = e.target._latlng
                },
                _childMarkerMoved: function(e) {
                    if (!this._ignoreMove && !e.target.__dragStart) {
                        var t = e.target._popup && e.target._popup.isOpen();
                        this._moveChild(e.target, e.oldLatLng, e.latlng),
                        t && e.target.openPopup()
                    }
                },
                _moveChild: function(e, t, i) {
                    e._latlng = t,
                    this.removeLayer(e),
                    e._latlng = i,
                    this.addLayer(e)
                },
                _childMarkerDragEnd: function(e) {
                    var t = e.target.__dragStart;
                    delete e.target.__dragStart,
                    t && this._moveChild(e.target, t, e.target._latlng)
                },
                _removeLayer: function(e, t, i) {
                    var n = this._gridClusters
                      , o = this._gridUnclustered
                      , s = this._featureGroup
                      , r = this._map
                      , a = Math.floor(this._map.getMinZoom());
                    t && this._removeFromGridUnclustered(e, this._maxZoom);
                    var l, h = e.__parent, d = h._markers;
                    for (this._arraySplice(d, e); h && (h._childCount--,
                    h._boundsNeedUpdate = !0,
                    !(h._zoom < a)); )
                        t && h._childCount <= 1 ? (l = h._markers[0] === e ? h._markers[1] : h._markers[0],
                        n[h._zoom].removeObject(h, r.project(h._cLatLng, h._zoom)),
                        o[h._zoom].addObject(l, r.project(l.getLatLng(), h._zoom)),
                        this._arraySplice(h.__parent._childClusters, h),
                        h.__parent._markers.push(l),
                        l.__parent = h.__parent,
                        h._icon && (s.removeLayer(h),
                        i || s.addLayer(l))) : h._iconNeedsUpdate = !0,
                        h = h.__parent;
                    delete e.__parent
                },
                _isOrIsParent: function(e, t) {
                    for (; t; ) {
                        if (e === t)
                            return !0;
                        t = t.parentNode
                    }
                    return !1
                },
                fire: function(e, t, i) {
                    if (t && t.layer instanceof L.MarkerCluster) {
                        if (t.originalEvent && this._isOrIsParent(t.layer._icon, t.originalEvent.relatedTarget))
                            return;
                        e = "cluster" + e
                    }
                    L.FeatureGroup.prototype.fire.call(this, e, t, i)
                },
                listens: function(e, t) {
                    return L.FeatureGroup.prototype.listens.call(this, e, t) || L.FeatureGroup.prototype.listens.call(this, "cluster" + e, t)
                },
                _defaultIconCreateFunction: function(e) {
                    var t = e.getChildCount()
                      , i = " marker-cluster-";
                    return i += 10 > t ? "small" : 100 > t ? "medium" : "large",
                    new L.DivIcon({
                        html: "<div><span>" + t + "</span></div>",
                        className: "marker-cluster" + i,
                        iconSize: new L.Point(40,40)
                    })
                },
                _bindEvents: function() {
                    var e = this._map
                      , t = this.options.spiderfyOnMaxZoom
                      , i = this.options.showCoverageOnHover
                      , n = this.options.zoomToBoundsOnClick;
                    (t || n) && this.on("clusterclick", this._zoomOrSpiderfy, this),
                    i && (this.on("clustermouseover", this._showCoverage, this),
                    this.on("clustermouseout", this._hideCoverage, this),
                    e.on("zoomend", this._hideCoverage, this))
                },
                _zoomOrSpiderfy: function(e) {
                    for (var t = e.layer, i = t; 1 === i._childClusters.length; )
                        i = i._childClusters[0];
                    i._zoom === this._maxZoom && i._childCount === t._childCount && this.options.spiderfyOnMaxZoom ? t.spiderfy() : this.options.zoomToBoundsOnClick && t.zoomToBounds(),
                    e.originalEvent && 13 === e.originalEvent.keyCode && this._map._container.focus()
                },
                _showCoverage: function(e) {
                    var t = this._map;
                    this._inZoomAnimation || (this._shownPolygon && t.removeLayer(this._shownPolygon),
                    e.layer.getChildCount() > 2 && e.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),
                    t.addLayer(this._shownPolygon)))
                },
                _hideCoverage: function() {
                    this._shownPolygon && (this._map.removeLayer(this._shownPolygon),
                    this._shownPolygon = null)
                },
                _unbindEvents: function() {
                    var e = this.options.spiderfyOnMaxZoom
                      , t = this.options.showCoverageOnHover
                      , i = this.options.zoomToBoundsOnClick
                      , n = this._map;
                    (e || i) && this.off("clusterclick", this._zoomOrSpiderfy, this),
                    t && (this.off("clustermouseover", this._showCoverage, this),
                    this.off("clustermouseout", this._hideCoverage, this),
                    n.off("zoomend", this._hideCoverage, this))
                },
                _zoomEnd: function() {
                    this._map && (this._mergeSplitClusters(),
                    this._zoom = Math.round(this._map._zoom),
                    this._currentShownBounds = this._getExpandedVisibleBounds())
                },
                _moveEnd: function() {
                    if (!this._inZoomAnimation) {
                        var e = this._getExpandedVisibleBounds();
                        this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, e),
                        this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), e),
                        this._currentShownBounds = e
                    }
                },
                _generateInitialClusters: function() {
                    var e = Math.ceil(this._map.getMaxZoom())
                      , t = Math.floor(this._map.getMinZoom())
                      , i = this.options.maxClusterRadius
                      , n = i;
                    "function" != typeof i && (n = function() {
                        return i
                    }
                    ),
                    null !== this.options.disableClusteringAtZoom && (e = this.options.disableClusteringAtZoom - 1),
                    this._maxZoom = e,
                    this._gridClusters = {},
                    this._gridUnclustered = {};
                    for (var o = e; o >= t; o--)
                        this._gridClusters[o] = new L.DistanceGrid(n(o)),
                        this._gridUnclustered[o] = new L.DistanceGrid(n(o));
                    this._topClusterLevel = new this._markerCluster(this,t - 1)
                },
                _addLayer: function(e, t) {
                    var i, n, o = this._gridClusters, s = this._gridUnclustered, r = Math.floor(this._map.getMinZoom());
                    for (this.options.singleMarkerMode && this._overrideMarkerIcon(e),
                    e.on(this._childMarkerEventHandlers, this); t >= r; t--) {
                        i = this._map.project(e.getLatLng(), t);
                        var a = o[t].getNearObject(i);
                        if (a)
                            return a._addChild(e),
                            void (e.__parent = a);
                        if (a = s[t].getNearObject(i)) {
                            var l = a.__parent;
                            l && this._removeLayer(a, !1);
                            var h = new this._markerCluster(this,t,a,e);
                            o[t].addObject(h, this._map.project(h._cLatLng, t)),
                            a.__parent = h,
                            e.__parent = h;
                            var d = h;
                            for (n = t - 1; n > l._zoom; n--)
                                d = new this._markerCluster(this,n,d),
                                o[n].addObject(d, this._map.project(a.getLatLng(), n));
                            return l._addChild(d),
                            void this._removeFromGridUnclustered(a, t)
                        }
                        s[t].addObject(e, i)
                    }
                    this._topClusterLevel._addChild(e),
                    e.__parent = this._topClusterLevel
                },
                _refreshClustersIcons: function() {
                    this._featureGroup.eachLayer(function(e) {
                        e instanceof L.MarkerCluster && e._iconNeedsUpdate && e._updateIcon()
                    })
                },
                _enqueue: function(e) {
                    this._queue.push(e),
                    this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300))
                },
                _processQueue: function() {
                    for (var e = 0; e < this._queue.length; e++)
                        this._queue[e].call(this);
                    this._queue.length = 0,
                    clearTimeout(this._queueTimeout),
                    this._queueTimeout = null
                },
                _mergeSplitClusters: function() {
                    var e = Math.round(this._map._zoom);
                    this._processQueue(),
                    this._zoom < e && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(),
                    this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()),
                    this._animationZoomIn(this._zoom, e)) : this._zoom > e ? (this._animationStart(),
                    this._animationZoomOut(this._zoom, e)) : this._moveEnd()
                },
                _getExpandedVisibleBounds: function() {
                    return this.options.removeOutsideVisibleBounds ? L.Browser.mobile ? this._checkBoundsMaxLat(this._map.getBounds()) : this._checkBoundsMaxLat(this._map.getBounds().pad(1)) : this._mapBoundsInfinite
                },
                _checkBoundsMaxLat: function(e) {
                    var t = this._maxLat;
                    return void 0 !== t && (e.getNorth() >= t && (e._northEast.lat = 1 / 0),
                    e.getSouth() <= -t && (e._southWest.lat = -1 / 0)),
                    e
                },
                _animationAddLayerNonAnimated: function(e, t) {
                    if (t === e)
                        this._featureGroup.addLayer(e);
                    else if (2 === t._childCount) {
                        t._addToMap();
                        var i = t.getAllChildMarkers();
                        this._featureGroup.removeLayer(i[0]),
                        this._featureGroup.removeLayer(i[1])
                    } else
                        t._updateIcon()
                },
                _extractNonGroupLayers: function(e, t) {
                    var i, n = e.getLayers(), o = 0;
                    for (t = t || []; o < n.length; o++)
                        i = n[o],
                        i instanceof L.LayerGroup ? this._extractNonGroupLayers(i, t) : t.push(i);
                    return t
                },
                _overrideMarkerIcon: function(e) {
                    return e.options.icon = this.options.iconCreateFunction({
                        getChildCount: function() {
                            return 1
                        },
                        getAllChildMarkers: function() {
                            return [e]
                        }
                    })
                }
            });
            L.MarkerClusterGroup.include({
                _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0,-1 / 0),new L.LatLng(1 / 0,1 / 0))
            }),
            L.MarkerClusterGroup.include({
                _noAnimation: {
                    _animationStart: function() {},
                    _animationZoomIn: function(e, t) {
                        this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e),
                        this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()),
                        this.fire("animationend")
                    },
                    _animationZoomOut: function(e, t) {
                        this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e),
                        this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()),
                        this.fire("animationend")
                    },
                    _animationAddLayer: function(e, t) {
                        this._animationAddLayerNonAnimated(e, t)
                    }
                },
                _withAnimation: {
                    _animationStart: function() {
                        this._map._mapPane.className += " leaflet-cluster-anim",
                        this._inZoomAnimation++
                    },
                    _animationZoomIn: function(e, t) {
                        var i, n = this._getExpandedVisibleBounds(), o = this._featureGroup, s = Math.floor(this._map.getMinZoom());
                        this._ignoreMove = !0,
                        this._topClusterLevel._recursively(n, e, s, function(s) {
                            var r, a = s._latlng, l = s._markers;
                            for (n.contains(a) || (a = null),
                            s._isSingleParent() && e + 1 === t ? (o.removeLayer(s),
                            s._recursivelyAddChildrenToMap(null, t, n)) : (s.clusterHide(),
                            s._recursivelyAddChildrenToMap(a, t, n)),
                            i = l.length - 1; i >= 0; i--)
                                r = l[i],
                                n.contains(r._latlng) || o.removeLayer(r)
                        }),
                        this._forceLayout(),
                        this._topClusterLevel._recursivelyBecomeVisible(n, t),
                        o.eachLayer(function(e) {
                            e instanceof L.MarkerCluster || !e._icon || e.clusterShow()
                        }),
                        this._topClusterLevel._recursively(n, e, t, function(e) {
                            e._recursivelyRestoreChildPositions(t)
                        }),
                        this._ignoreMove = !1,
                        this._enqueue(function() {
                            this._topClusterLevel._recursively(n, e, s, function(e) {
                                o.removeLayer(e),
                                e.clusterShow()
                            }),
                            this._animationEnd()
                        })
                    },
                    _animationZoomOut: function(e, t) {
                        this._animationZoomOutSingle(this._topClusterLevel, e - 1, t),
                        this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()),
                        this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e, this._getExpandedVisibleBounds())
                    },
                    _animationAddLayer: function(e, t) {
                        var i = this
                          , n = this._featureGroup;
                        n.addLayer(e),
                        t !== e && (t._childCount > 2 ? (t._updateIcon(),
                        this._forceLayout(),
                        this._animationStart(),
                        e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),
                        e.clusterHide(),
                        this._enqueue(function() {
                            n.removeLayer(e),
                            e.clusterShow(),
                            i._animationEnd()
                        })) : (this._forceLayout(),
                        i._animationStart(),
                        i._animationZoomOutSingle(t, this._map.getMaxZoom(), this._zoom)))
                    }
                },
                _animationZoomOutSingle: function(e, t, i) {
                    var n = this._getExpandedVisibleBounds()
                      , o = Math.floor(this._map.getMinZoom());
                    e._recursivelyAnimateChildrenInAndAddSelfToMap(n, o, t + 1, i);
                    var s = this;
                    this._forceLayout(),
                    e._recursivelyBecomeVisible(n, i),
                    this._enqueue(function() {
                        if (1 === e._childCount) {
                            var r = e._markers[0];
                            this._ignoreMove = !0,
                            r.setLatLng(r.getLatLng()),
                            this._ignoreMove = !1,
                            r.clusterShow && r.clusterShow()
                        } else
                            e._recursively(n, i, o, function(e) {
                                e._recursivelyRemoveChildrenFromMap(n, o, t + 1)
                            });
                        s._animationEnd()
                    })
                },
                _animationEnd: function() {
                    this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")),
                    this._inZoomAnimation--,
                    this.fire("animationend")
                },
                _forceLayout: function() {
                    L.Util.falseFn(document.body.offsetWidth)
                }
            }),
            L.markerClusterGroup = function(e) {
                return new L.MarkerClusterGroup(e)
            }
            ;
            var i = L.MarkerCluster = L.Marker.extend({
                options: L.Icon.prototype.options,
                initialize: function(e, t, i, n) {
                    L.Marker.prototype.initialize.call(this, i ? i._cLatLng || i.getLatLng() : new L.LatLng(0,0), {
                        icon: this,
                        pane: e.options.clusterPane
                    }),
                    this._group = e,
                    this._zoom = t,
                    this._markers = [],
                    this._childClusters = [],
                    this._childCount = 0,
                    this._iconNeedsUpdate = !0,
                    this._boundsNeedUpdate = !0,
                    this._bounds = new L.LatLngBounds,
                    i && this._addChild(i),
                    n && this._addChild(n)
                },
                getAllChildMarkers: function(e, t) {
                    e = e || [];
                    for (var i = this._childClusters.length - 1; i >= 0; i--)
                        this._childClusters[i].getAllChildMarkers(e);
                    for (var n = this._markers.length - 1; n >= 0; n--)
                        t && this._markers[n].__dragStart || e.push(this._markers[n]);
                    return e
                },
                getChildCount: function() {
                    return this._childCount
                },
                zoomToBounds: function(e) {
                    for (var t, i = this._childClusters.slice(), n = this._group._map, o = n.getBoundsZoom(this._bounds), s = this._zoom + 1, r = n.getZoom(); i.length > 0 && o > s; ) {
                        s++;
                        var a = [];
                        for (t = 0; t < i.length; t++)
                            a = a.concat(i[t]._childClusters);
                        i = a
                    }
                    o > s ? this._group._map.setView(this._latlng, s) : r >= o ? this._group._map.setView(this._latlng, r + 1) : this._group._map.fitBounds(this._bounds, e)
                },
                getBounds: function() {
                    var e = new L.LatLngBounds;
                    return e.extend(this._bounds),
                    e
                },
                _updateIcon: function() {
                    this._iconNeedsUpdate = !0,
                    this._icon && this.setIcon(this)
                },
                createIcon: function() {
                    return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this),
                    this._iconNeedsUpdate = !1),
                    this._iconObj.createIcon()
                },
                createShadow: function() {
                    return this._iconObj.createShadow()
                },
                _addChild: function(e, t) {
                    this._iconNeedsUpdate = !0,
                    this._boundsNeedUpdate = !0,
                    this._setClusterCenter(e),
                    e instanceof L.MarkerCluster ? (t || (this._childClusters.push(e),
                    e.__parent = this),
                    this._childCount += e._childCount) : (t || this._markers.push(e),
                    this._childCount++),
                    this.__parent && this.__parent._addChild(e, !0)
                },
                _setClusterCenter: function(e) {
                    this._cLatLng || (this._cLatLng = e._cLatLng || e._latlng)
                },
                _resetBounds: function() {
                    var e = this._bounds;
                    e._southWest && (e._southWest.lat = 1 / 0,
                    e._southWest.lng = 1 / 0),
                    e._northEast && (e._northEast.lat = -1 / 0,
                    e._northEast.lng = -1 / 0)
                },
                _recalculateBounds: function() {
                    var e, t, i, n, o = this._markers, s = this._childClusters, r = 0, a = 0, l = this._childCount;
                    if (0 !== l) {
                        for (this._resetBounds(),
                        e = 0; e < o.length; e++)
                            i = o[e]._latlng,
                            this._bounds.extend(i),
                            r += i.lat,
                            a += i.lng;
                        for (e = 0; e < s.length; e++)
                            t = s[e],
                            t._boundsNeedUpdate && t._recalculateBounds(),
                            this._bounds.extend(t._bounds),
                            i = t._wLatLng,
                            n = t._childCount,
                            r += i.lat * n,
                            a += i.lng * n;
                        this._latlng = this._wLatLng = new L.LatLng(r / l,a / l),
                        this._boundsNeedUpdate = !1
                    }
                },
                _addToMap: function(e) {
                    e && (this._backupLatlng = this._latlng,
                    this.setLatLng(e)),
                    this._group._featureGroup.addLayer(this)
                },
                _recursivelyAnimateChildrenIn: function(e, t, i) {
                    this._recursively(e, this._group._map.getMinZoom(), i - 1, function(e) {
                        var i, n, o = e._markers;
                        for (i = o.length - 1; i >= 0; i--)
                            n = o[i],
                            n._icon && (n._setPos(t),
                            n.clusterHide())
                    }, function(e) {
                        var i, n, o = e._childClusters;
                        for (i = o.length - 1; i >= 0; i--)
                            n = o[i],
                            n._icon && (n._setPos(t),
                            n.clusterHide())
                    })
                },
                _recursivelyAnimateChildrenInAndAddSelfToMap: function(e, t, i, n) {
                    this._recursively(e, n, t, function(o) {
                        o._recursivelyAnimateChildrenIn(e, o._group._map.latLngToLayerPoint(o.getLatLng()).round(), i),
                        o._isSingleParent() && i - 1 === n ? (o.clusterShow(),
                        o._recursivelyRemoveChildrenFromMap(e, t, i)) : o.clusterHide(),
                        o._addToMap()
                    })
                },
                _recursivelyBecomeVisible: function(e, t) {
                    this._recursively(e, this._group._map.getMinZoom(), t, null, function(e) {
                        e.clusterShow()
                    })
                },
                _recursivelyAddChildrenToMap: function(e, t, i) {
                    this._recursively(i, this._group._map.getMinZoom() - 1, t, function(n) {
                        if (t !== n._zoom)
                            for (var o = n._markers.length - 1; o >= 0; o--) {
                                var s = n._markers[o];
                                i.contains(s._latlng) && (e && (s._backupLatlng = s.getLatLng(),
                                s.setLatLng(e),
                                s.clusterHide && s.clusterHide()),
                                n._group._featureGroup.addLayer(s))
                            }
                    }, function(t) {
                        t._addToMap(e)
                    })
                },
                _recursivelyRestoreChildPositions: function(e) {
                    for (var t = this._markers.length - 1; t >= 0; t--) {
                        var i = this._markers[t];
                        i._backupLatlng && (i.setLatLng(i._backupLatlng),
                        delete i._backupLatlng)
                    }
                    if (e - 1 === this._zoom)
                        for (var n = this._childClusters.length - 1; n >= 0; n--)
                            this._childClusters[n]._restorePosition();
                    else
                        for (var o = this._childClusters.length - 1; o >= 0; o--)
                            this._childClusters[o]._recursivelyRestoreChildPositions(e)
                },
                _restorePosition: function() {
                    this._backupLatlng && (this.setLatLng(this._backupLatlng),
                    delete this._backupLatlng)
                },
                _recursivelyRemoveChildrenFromMap: function(e, t, i, n) {
                    var o, s;
                    this._recursively(e, t - 1, i - 1, function(e) {
                        for (s = e._markers.length - 1; s >= 0; s--)
                            o = e._markers[s],
                            n && n.contains(o._latlng) || (e._group._featureGroup.removeLayer(o),
                            o.clusterShow && o.clusterShow())
                    }, function(e) {
                        for (s = e._childClusters.length - 1; s >= 0; s--)
                            o = e._childClusters[s],
                            n && n.contains(o._latlng) || (e._group._featureGroup.removeLayer(o),
                            o.clusterShow && o.clusterShow())
                    })
                },
                _recursively: function(e, t, i, n, o) {
                    var s, r, a = this._childClusters, l = this._zoom;
                    if (l >= t && (n && n(this),
                    o && l === i && o(this)),
                    t > l || i > l)
                        for (s = a.length - 1; s >= 0; s--)
                            r = a[s],
                            r._boundsNeedUpdate && r._recalculateBounds(),
                            e.intersects(r._bounds) && r._recursively(e, t, i, n, o)
                },
                _isSingleParent: function() {
                    return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
                }
            });
            L.Marker.include({
                clusterHide: function() {
                    var e = this.options.opacity;
                    return this.setOpacity(0),
                    this.options.opacity = e,
                    this
                },
                clusterShow: function() {
                    return this.setOpacity(this.options.opacity)
                }
            }),
            L.DistanceGrid = function(e) {
                this._cellSize = e,
                this._sqCellSize = e * e,
                this._grid = {},
                this._objectPoint = {}
            }
            ,
            L.DistanceGrid.prototype = {
                addObject: function(e, t) {
                    var i = this._getCoord(t.x)
                      , n = this._getCoord(t.y)
                      , o = this._grid
                      , s = o[n] = o[n] || {}
                      , r = s[i] = s[i] || []
                      , a = L.Util.stamp(e);
                    this._objectPoint[a] = t,
                    r.push(e)
                },
                updateObject: function(e, t) {
                    this.removeObject(e),
                    this.addObject(e, t)
                },
                removeObject: function(e, t) {
                    var i, n, o = this._getCoord(t.x), s = this._getCoord(t.y), r = this._grid, a = r[s] = r[s] || {}, l = a[o] = a[o] || [];
                    for (delete this._objectPoint[L.Util.stamp(e)],
                    i = 0,
                    n = l.length; n > i; i++)
                        if (l[i] === e)
                            return l.splice(i, 1),
                            1 === n && delete a[o],
                            !0
                },
                eachObject: function(e, t) {
                    var i, n, o, s, r, a, l, h = this._grid;
                    for (i in h) {
                        r = h[i];
                        for (n in r)
                            for (a = r[n],
                            o = 0,
                            s = a.length; s > o; o++)
                                l = e.call(t, a[o]),
                                l && (o--,
                                s--)
                    }
                },
                getNearObject: function(e) {
                    var t, i, n, o, s, r, a, l, h = this._getCoord(e.x), d = this._getCoord(e.y), u = this._objectPoint, c = this._sqCellSize, p = null;
                    for (t = d - 1; d + 1 >= t; t++)
                        if (o = this._grid[t])
                            for (i = h - 1; h + 1 >= i; i++)
                                if (s = o[i])
                                    for (n = 0,
                                    r = s.length; r > n; n++)
                                        a = s[n],
                                        l = this._sqDist(u[L.Util.stamp(a)], e),
                                        (c > l || c >= l && null === p) && (c = l,
                                        p = a);
                    return p
                },
                _getCoord: function(e) {
                    var t = Math.floor(e / this._cellSize);
                    return isFinite(t) ? t : e
                },
                _sqDist: function(e, t) {
                    var i = t.x - e.x
                      , n = t.y - e.y;
                    return i * i + n * n
                }
            },
            L.QuickHull = {
                getDistant: function(e, t) {
                    var i = t[1].lat - t[0].lat;
                    return (t[0].lng - t[1].lng) * (e.lat - t[0].lat) + i * (e.lng - t[0].lng)
                },
                findMostDistantPointFromBaseLine: function(e, t) {
                    var i, n, o, s = 0, r = null, a = [];
                    for (i = t.length - 1; i >= 0; i--)
                        n = t[i],
                        o = this.getDistant(n, e),
                        o > 0 && (a.push(n),
                        o > s && (s = o,
                        r = n));
                    return {
                        maxPoint: r,
                        newPoints: a
                    }
                },
                buildConvexHull: function(e, t) {
                    var i = []
                      , n = this.findMostDistantPointFromBaseLine(e, t);
                    return n.maxPoint ? i = (i = i.concat(this.buildConvexHull([e[0], n.maxPoint], n.newPoints))).concat(this.buildConvexHull([n.maxPoint, e[1]], n.newPoints)) : [e[0]]
                },
                getConvexHull: function(e) {
                    var t, i = !1, n = !1, o = !1, s = !1, r = null, a = null, l = null, h = null, d = null, u = null;
                    for (t = e.length - 1; t >= 0; t--) {
                        var c = e[t];
                        (!1 === i || c.lat > i) && (r = c,
                        i = c.lat),
                        (!1 === n || c.lat < n) && (a = c,
                        n = c.lat),
                        (!1 === o || c.lng > o) && (l = c,
                        o = c.lng),
                        (!1 === s || c.lng < s) && (h = c,
                        s = c.lng)
                    }
                    return n !== i ? (u = a,
                    d = r) : (u = h,
                    d = l),
                    [].concat(this.buildConvexHull([u, d], e), this.buildConvexHull([d, u], e))
                }
            },
            L.MarkerCluster.include({
                getConvexHull: function() {
                    var e, t, i = this.getAllChildMarkers(), n = [];
                    for (t = i.length - 1; t >= 0; t--)
                        e = i[t].getLatLng(),
                        n.push(e);
                    return L.QuickHull.getConvexHull(n)
                }
            }),
            L.MarkerCluster.include({
                _2PI: 2 * Math.PI,
                _circleFootSeparation: 25,
                _circleStartAngle: 0,
                _spiralFootSeparation: 28,
                _spiralLengthStart: 11,
                _spiralLengthFactor: 5,
                _circleSpiralSwitchover: 9,
                spiderfy: function() {
                    if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                        var e, t = this.getAllChildMarkers(null, !0), i = this._group._map.latLngToLayerPoint(this._latlng);
                        this._group._unspiderfy(),
                        this._group._spiderfied = this,
                        t.length >= this._circleSpiralSwitchover ? e = this._generatePointsSpiral(t.length, i) : (i.y += 10,
                        e = this._generatePointsCircle(t.length, i)),
                        this._animationSpiderfy(t, e)
                    }
                },
                unspiderfy: function(e) {
                    this._group._inZoomAnimation || (this._animationUnspiderfy(e),
                    this._group._spiderfied = null)
                },
                _generatePointsCircle: function(e, t) {
                    var i, n, o = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + e) / this._2PI, s = this._2PI / e, r = [];
                    for (o = Math.max(o, 35),
                    r.length = e,
                    i = 0; e > i; i++)
                        n = this._circleStartAngle + i * s,
                        r[i] = new L.Point(t.x + o * Math.cos(n),t.y + o * Math.sin(n))._round();
                    return r
                },
                _generatePointsSpiral: function(e, t) {
                    var i, n = this._group.options.spiderfyDistanceMultiplier, o = n * this._spiralLengthStart, s = n * this._spiralFootSeparation, r = n * this._spiralLengthFactor * this._2PI, a = 0, l = [];
                    for (l.length = e,
                    i = e; i >= 0; i--)
                        e > i && (l[i] = new L.Point(t.x + o * Math.cos(a),t.y + o * Math.sin(a))._round()),
                        a += s / o + 5e-4 * i,
                        o += r / a;
                    return l
                },
                _noanimationUnspiderfy: function() {
                    var e, t, i = this._group, n = i._map, o = i._featureGroup, s = this.getAllChildMarkers(null, !0);
                    for (i._ignoreMove = !0,
                    this.setOpacity(1),
                    t = s.length - 1; t >= 0; t--)
                        e = s[t],
                        o.removeLayer(e),
                        e._preSpiderfyLatlng && (e.setLatLng(e._preSpiderfyLatlng),
                        delete e._preSpiderfyLatlng),
                        e.setZIndexOffset && e.setZIndexOffset(0),
                        e._spiderLeg && (n.removeLayer(e._spiderLeg),
                        delete e._spiderLeg);
                    i.fire("unspiderfied", {
                        cluster: this,
                        markers: s
                    }),
                    i._ignoreMove = !1,
                    i._spiderfied = null
                }
            }),
            L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
                _animationSpiderfy: function(e, t) {
                    var i, n, o, s, r = this._group, a = r._map, l = r._featureGroup, h = this._group.options.spiderLegPolylineOptions;
                    for (r._ignoreMove = !0,
                    i = 0; i < e.length; i++)
                        s = a.layerPointToLatLng(t[i]),
                        n = e[i],
                        o = new L.Polyline([this._latlng, s],h),
                        a.addLayer(o),
                        n._spiderLeg = o,
                        n._preSpiderfyLatlng = n._latlng,
                        n.setLatLng(s),
                        n.setZIndexOffset && n.setZIndexOffset(1e6),
                        l.addLayer(n);
                    this.setOpacity(.3),
                    r._ignoreMove = !1,
                    r.fire("spiderfied", {
                        cluster: this,
                        markers: e
                    })
                },
                _animationUnspiderfy: function() {
                    this._noanimationUnspiderfy()
                }
            }),
            L.MarkerCluster.include({
                _animationSpiderfy: function(e, t) {
                    var i, n, o, s, r, a, l = this, h = this._group, d = h._map, u = h._featureGroup, c = this._latlng, p = d.latLngToLayerPoint(c), f = L.Path.SVG, m = L.extend({}, this._group.options.spiderLegPolylineOptions), g = m.opacity;
                    for (void 0 === g && (g = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),
                    f ? (m.opacity = 0,
                    m.className = (m.className || "") + " leaflet-cluster-spider-leg") : m.opacity = g,
                    h._ignoreMove = !0,
                    i = 0; i < e.length; i++)
                        n = e[i],
                        a = d.layerPointToLatLng(t[i]),
                        o = new L.Polyline([c, a],m),
                        d.addLayer(o),
                        n._spiderLeg = o,
                        f && (s = o._path,
                        r = s.getTotalLength() + .1,
                        s.style.strokeDasharray = r,
                        s.style.strokeDashoffset = r),
                        n.setZIndexOffset && n.setZIndexOffset(1e6),
                        n.clusterHide && n.clusterHide(),
                        u.addLayer(n),
                        n._setPos && n._setPos(p);
                    for (h._forceLayout(),
                    h._animationStart(),
                    i = e.length - 1; i >= 0; i--)
                        a = d.layerPointToLatLng(t[i]),
                        n = e[i],
                        n._preSpiderfyLatlng = n._latlng,
                        n.setLatLng(a),
                        n.clusterShow && n.clusterShow(),
                        f && (o = n._spiderLeg,
                        s = o._path,
                        s.style.strokeDashoffset = 0,
                        o.setStyle({
                            opacity: g
                        }));
                    this.setOpacity(.3),
                    h._ignoreMove = !1,
                    setTimeout(function() {
                        h._animationEnd(),
                        h.fire("spiderfied", {
                            cluster: l,
                            markers: e
                        })
                    }, 200)
                },
                _animationUnspiderfy: function(e) {
                    var t, i, n, o, s, r, a = this, l = this._group, h = l._map, d = l._featureGroup, u = e ? h._latLngToNewLayerPoint(this._latlng, e.zoom, e.center) : h.latLngToLayerPoint(this._latlng), c = this.getAllChildMarkers(null, !0), p = L.Path.SVG;
                    for (l._ignoreMove = !0,
                    l._animationStart(),
                    this.setOpacity(1),
                    i = c.length - 1; i >= 0; i--)
                        t = c[i],
                        t._preSpiderfyLatlng && (t.closePopup(),
                        t.setLatLng(t._preSpiderfyLatlng),
                        delete t._preSpiderfyLatlng,
                        r = !0,
                        t._setPos && (t._setPos(u),
                        r = !1),
                        t.clusterHide && (t.clusterHide(),
                        r = !1),
                        r && d.removeLayer(t),
                        p && (n = t._spiderLeg,
                        o = n._path,
                        s = o.getTotalLength() + .1,
                        o.style.strokeDashoffset = s,
                        n.setStyle({
                            opacity: 0
                        })));
                    l._ignoreMove = !1,
                    setTimeout(function() {
                        var e = 0;
                        for (i = c.length - 1; i >= 0; i--)
                            t = c[i],
                            t._spiderLeg && e++;
                        for (i = c.length - 1; i >= 0; i--)
                            t = c[i],
                            t._spiderLeg && (t.clusterShow && t.clusterShow(),
                            t.setZIndexOffset && t.setZIndexOffset(0),
                            e > 1 && d.removeLayer(t),
                            h.removeLayer(t._spiderLeg),
                            delete t._spiderLeg);
                        l._animationEnd(),
                        l.fire("unspiderfied", {
                            cluster: a,
                            markers: c
                        })
                    }, 200)
                }
            }),
            L.MarkerClusterGroup.include({
                _spiderfied: null,
                unspiderfy: function() {
                    this._unspiderfy.apply(this, arguments)
                },
                _spiderfierOnAdd: function() {
                    this._map.on("click", this._unspiderfyWrapper, this),
                    this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this),
                    this._map.on("zoomend", this._noanimationUnspiderfy, this),
                    L.Browser.touch || this._map.getRenderer(this)
                },
                _spiderfierOnRemove: function() {
                    this._map.off("click", this._unspiderfyWrapper, this),
                    this._map.off("zoomstart", this._unspiderfyZoomStart, this),
                    this._map.off("zoomanim", this._unspiderfyZoomAnim, this),
                    this._map.off("zoomend", this._noanimationUnspiderfy, this),
                    this._noanimationUnspiderfy()
                },
                _unspiderfyZoomStart: function() {
                    this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
                },
                _unspiderfyZoomAnim: function(e) {
                    L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this),
                    this._unspiderfy(e))
                },
                _unspiderfyWrapper: function() {
                    this._unspiderfy()
                },
                _unspiderfy: function(e) {
                    this._spiderfied && this._spiderfied.unspiderfy(e)
                },
                _noanimationUnspiderfy: function() {
                    this._spiderfied && this._spiderfied._noanimationUnspiderfy()
                },
                _unspiderfyLayer: function(e) {
                    e._spiderLeg && (this._featureGroup.removeLayer(e),
                    e.clusterShow && e.clusterShow(),
                    e.setZIndexOffset && e.setZIndexOffset(0),
                    this._map.removeLayer(e._spiderLeg),
                    delete e._spiderLeg)
                }
            }),
            L.MarkerClusterGroup.include({
                refreshClusters: function(e) {
                    return e ? e instanceof L.MarkerClusterGroup ? e = e._topClusterLevel.getAllChildMarkers() : e instanceof L.LayerGroup ? e = e._layers : e instanceof L.MarkerCluster ? e = e.getAllChildMarkers() : e instanceof L.Marker && (e = [e]) : e = this._topClusterLevel.getAllChildMarkers(),
                    this._flagParentsIconsNeedUpdate(e),
                    this._refreshClustersIcons(),
                    this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(e),
                    this
                },
                _flagParentsIconsNeedUpdate: function(e) {
                    var t, i;
                    for (t in e)
                        for (i = e[t].__parent; i; )
                            i._iconNeedsUpdate = !0,
                            i = i.__parent
                },
                _refreshSingleMarkerModeMarkers: function(e) {
                    var t, i;
                    for (t in e)
                        i = e[t],
                        this.hasLayer(i) && i.setIcon(this._overrideMarkerIcon(i))
                }
            }),
            L.Marker.include({
                refreshIconOptions: function(e, t) {
                    var i = this.options.icon;
                    return L.setOptions(i, e),
                    this.setIcon(i),
                    t && this.__parent && this.__parent._group.refreshClusters(this),
                    this
                }
            }),
            e.MarkerClusterGroup = t,
            e.MarkerCluster = i
        }
        ,
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e.Leaflet = e.Leaflet || {},
        e.Leaflet.markercluster = e.Leaflet.markercluster || {})),
        i = function(e) {
            var t = e.Control.extend({
                includes: e.Evented ? e.Evented.prototype : e.Mixin.Events,
                options: {
                    position: "bottomright",
                    toggleDisplay: !1,
                    zoomLevelOffset: -5,
                    zoomLevelFixed: !1,
                    centerFixed: !1,
                    zoomAnimation: !1,
                    autoToggleDisplay: !1,
                    minimized: !1,
                    width: 150,
                    height: 150,
                    collapsedWidth: 19,
                    collapsedHeight: 19,
                    aimingRectOptions: {
                        color: "#ff7800",
                        weight: 1,
                        clickable: !1
                    },
                    shadowRectOptions: {
                        color: "#000000",
                        weight: 1,
                        clickable: !1,
                        opacity: 0,
                        fillOpacity: 0
                    },
                    strings: {
                        hideText: "Hide MiniMap",
                        showText: "Show MiniMap"
                    },
                    mapOptions: {}
                },
                initialize: function(t, i) {
                    e.Util.setOptions(this, i),
                    this.options.aimingRectOptions.clickable = !1,
                    this.options.shadowRectOptions.clickable = !1,
                    this._layer = t
                },
                onAdd: function(t) {
                    this._mainMap = t,
                    this._container = e.DomUtil.create("div", "leaflet-control-minimap"),
                    this._container.style.width = this.options.width + "px",
                    this._container.style.height = this.options.height + "px",
                    e.DomEvent.disableClickPropagation(this._container),
                    e.DomEvent.on(this._container, "mousewheel", e.DomEvent.stopPropagation);
                    var i = {
                        attributionControl: !1,
                        dragging: !this.options.centerFixed,
                        zoomControl: !1,
                        zoomAnimation: this.options.zoomAnimation,
                        autoToggleDisplay: this.options.autoToggleDisplay,
                        touchZoom: this.options.centerFixed ? "center" : !this._isZoomLevelFixed(),
                        scrollWheelZoom: this.options.centerFixed ? "center" : !this._isZoomLevelFixed(),
                        doubleClickZoom: this.options.centerFixed ? "center" : !this._isZoomLevelFixed(),
                        boxZoom: !this._isZoomLevelFixed(),
                        crs: t.options.crs
                    };
                    return i = e.Util.extend(this.options.mapOptions, i),
                    this._miniMap = new e.Map(this._container,i),
                    this._miniMap.addLayer(this._layer),
                    this._mainMapMoving = !1,
                    this._miniMapMoving = !1,
                    this._userToggledDisplay = !1,
                    this._minimized = !1,
                    this.options.toggleDisplay && this._addToggleButton(),
                    this._miniMap.whenReady(e.Util.bind(function() {
                        this._aimingRect = e.rectangle(this._mainMap.getBounds(
                        ), this.options.aimingRectOptions).addTo(this._miniMap),
                        this._shadowRect = e.rectangle(this._mainMap.getBounds(), this.options.shadowRectOptions).addTo(this._miniMap),
                        this._mainMap.on("moveend", this._onMainMapMoved, this),
                        this._mainMap.on("move", this._onMainMapMoving, this),
                        this._miniMap.on("movestart", this._onMiniMapMoveStarted, this),
                        this._miniMap.on("move", this._onMiniMapMoving, this),
                        this._miniMap.on("moveend", this._onMiniMapMoved, this)
                    }, this)),
                    this._container
                },
                addTo: function(t) {
                    e.Control.prototype.addTo.call(this, t);
                    var i = this.options.centerFixed || this._mainMap.getCenter();
                    return this._miniMap.setView(i, this._decideZoom(!0)),
                    this._setDisplay(this.options.minimized),
                    this
                },
                onRemove: function(e) {
                    this._mainMap.off("moveend", this._onMainMapMoved, this),
                    this._mainMap.off("move", this._onMainMapMoving, this),
                    this._miniMap.off("moveend", this._onMiniMapMoved, this),
                    this._miniMap.removeLayer(this._layer)
                },
                changeLayer: function(e) {
                    this._miniMap.removeLayer(this._layer),
                    this._layer = e,
                    this._miniMap.addLayer(this._layer)
                },
                _addToggleButton: function() {
                    this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton("", this._toggleButtonInitialTitleText(), "leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-" + this.options.position, this._container, this._toggleDisplayButtonClicked, this) : void 0,
                    this._toggleDisplayButton.style.width = this.options.collapsedWidth + "px",
                    this._toggleDisplayButton.style.height = this.options.collapsedHeight + "px"
                },
                _toggleButtonInitialTitleText: function() {
                    return this.options.minimized ? this.options.strings.showText : this.options.strings.hideText
                },
                _createButton: function(t, i, n, o, s, r) {
                    var a = e.DomUtil.create("a", n, o);
                    a.innerHTML = t,
                    a.href = "#",
                    a.title = i;
                    var l = e.DomEvent.stopPropagation;
                    return e.DomEvent.on(a, "click", l).on(a, "mousedown", l).on(a, "dblclick", l).on(a, "click", e.DomEvent.preventDefault).on(a, "click", s, r),
                    a
                },
                _toggleDisplayButtonClicked: function() {
                    this._userToggledDisplay = !0,
                    this._minimized ? this._restore() : this._minimize()
                },
                _setDisplay: function(e) {
                    e !== this._minimized && (this._minimized ? this._restore() : this._minimize())
                },
                _minimize: function() {
                    this.options.toggleDisplay ? (this._container.style.width = this.options.collapsedWidth + "px",
                    this._container.style.height = this.options.collapsedHeight + "px",
                    this._toggleDisplayButton.className += " minimized-" + this.options.position,
                    this._toggleDisplayButton.title = this.options.strings.showText) : this._container.style.display = "none",
                    this._minimized = !0,
                    this._onToggle()
                },
                _restore: function() {
                    this.options.toggleDisplay ? (this._container.style.width = this.options.width + "px",
                    this._container.style.height = this.options.height + "px",
                    this._toggleDisplayButton.className = this._toggleDisplayButton.className.replace("minimized-" + this.options.position, ""),
                    this._toggleDisplayButton.title = this.options.strings.hideText) : this._container.style.display = "block",
                    this._minimized = !1,
                    this._onToggle()
                },
                _onMainMapMoved: function(e) {
                    if (this._miniMapMoving)
                        this._miniMapMoving = !1;
                    else {
                        var t = this.options.centerFixed || this._mainMap.getCenter();
                        this._mainMapMoving = !0,
                        this._miniMap.setView(t, this._decideZoom(!0)),
                        this._setDisplay(this._decideMinimized())
                    }
                    this._aimingRect.setBounds(this._mainMap.getBounds())
                },
                _onMainMapMoving: function(e) {
                    this._aimingRect.setBounds(this._mainMap.getBounds())
                },
                _onMiniMapMoveStarted: function(e) {
                    if (!this.options.centerFixed) {
                        var t = this._aimingRect.getBounds()
                          , i = this._miniMap.latLngToContainerPoint(t.getSouthWest())
                          , n = this._miniMap.latLngToContainerPoint(t.getNorthEast());
                        this._lastAimingRectPosition = {
                            sw: i,
                            ne: n
                        }
                    }
                },
                _onMiniMapMoving: function(t) {
                    this.options.centerFixed || !this._mainMapMoving && this._lastAimingRectPosition && (this._shadowRect.setBounds(new e.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw),this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne))),
                    this._shadowRect.setStyle({
                        opacity: 1,
                        fillOpacity: .3
                    }))
                },
                _onMiniMapMoved: function(e) {
                    this._mainMapMoving ? this._mainMapMoving = !1 : (this._miniMapMoving = !0,
                    this._mainMap.setView(this._miniMap.getCenter(), this._decideZoom(!1)),
                    this._shadowRect.setStyle({
                        opacity: 0,
                        fillOpacity: 0
                    }))
                },
                _isZoomLevelFixed: function() {
                    var e = this.options.zoomLevelFixed;
                    return this._isDefined(e) && this._isInteger(e)
                },
                _decideZoom: function(e) {
                    if (this._isZoomLevelFixed())
                        return e ? this.options.zoomLevelFixed : this._mainMap.getZoom();
                    if (e)
                        return this._mainMap.getZoom() + this.options.zoomLevelOffset;
                    var t, i = this._miniMap.getZoom() - this._mainMap.getZoom(), n = this._miniMap.getZoom() - this.options.zoomLevelOffset;
                    return i > this.options.zoomLevelOffset && this._mainMap.getZoom() < this._miniMap.getMinZoom() - this.options.zoomLevelOffset ? this._miniMap.getZoom() > this._lastMiniMapZoom ? (t = this._mainMap.getZoom() + 1,
                    this._miniMap.setZoom(this._miniMap.getZoom() - 1)) : t = this._mainMap.getZoom() : t = n,
                    this._lastMiniMapZoom = this._miniMap.getZoom(),
                    t
                },
                _decideMinimized: function() {
                    return this._userToggledDisplay ? this._minimized : this.options.autoToggleDisplay ? !!this._mainMap.getBounds().contains(this._miniMap.getBounds()) : this._minimized
                },
                _isInteger: function(e) {
                    return "number" == typeof e
                },
                _isDefined: function(e) {
                    return void 0 !== e
                },
                _onToggle: function() {
                    e.Util.requestAnimFrame(function() {
                        e.DomEvent.on(this._container, "transitionend", this._fireToggleEvents, this),
                        e.Browser.any3d || e.Util.requestAnimFrame(this._fireToggleEvents, this)
                    }, this)
                },
                _fireToggleEvents: function() {
                    e.DomEvent.off(this._container, "transitionend", this._fireToggleEvents, this);
                    var t = {
                        minimized: this._minimized
                    };
                    this.fire(this._minimized ? "minimize" : "restore", t),
                    this.fire("toggle", t)
                }
            });
            return e.Map.mergeOptions({
                miniMapControl: !1
            }),
            e.Map.addInitHook(function() {
                this.options.miniMapControl && (this.miniMapControl = (new t).addTo(this))
            }),
            t
        }
        ,
        n = window,
        "function" == typeof define && define.amd ? define(["leaflet"], i) : "object" == typeof exports && (module.exports = i(require("leaflet"))),
        void 0 !== n && n.L && (n.L.Control.MiniMap = i(L),
        n.L.control.minimap = function(e, t) {
            return new n.L.Control.MiniMap(e,t)
        }
        ),
        $(initialize),
        setTimeout(function() {
            $("#photo-map-default").css("background-image", "none"),
            $("#photo-map").css("background-image", "none")
        }, 2e3)
    }
    Dropzone.options.photodropzone = {
        init: function() {
            this.on("addedfile", function(e) {
                $("#dzarea").hide(),
                $("#slideshow").show()
            }),
            this.on("queuecomplete", function(e, t) {
                $(location).attr("href", "redirect.php")
            })
        }
    },
    setInterval(function() {
        $("#slideshow >div").length > 1 && $("#slideshow > div:first").fadeOut(600).next().fadeIn(600).appendTo("#slideshow")
    }, 3e3),
    null !== document.getElementById("photo-map") && !0 !== o && (s(),
    o = !0),
    $("#photo-map-default").one("mouseenter", function() {
        !0 !== o && (s(),
        o = !0)
    }),
    $(window).one("scroll", function() {
        !0 !== o && (s(),
        o = !0)
    }),
    $.ajax({
        type: "POST",
        url: "https://www.pic2map.com/js/eu.php",
        success: function(e) {
            if ("true" == e) {
                var t = document.createElement("script");
                t.type = "text/javascript",
                t.id = "cookiebanner",
                t.src = "https://www.pic2map.com/js/cookiebanner.min.js",
                $("head").append(t)
            }
        }
    }),
    new $.Zebra_Tooltips($(".tooltip")),
    $("#show_photo").fancybox({
        closeClick: "true",
        openEffect: "elastic",
        closeEffect: "elastic",
        padding: 8
    }),
    $(".photo_details").click(function() {
        return $("html, body").animate({
            scrollTop: "+=" + $("#midpage").offset().top + "px"
        }, 900),
        !1
    }),
    $(".photo_delete").click(function() {
        if (confirm("Are you sure you want to delete this photo?")) {
            var e = this.id;
            return $.ajax({
                type: "POST",
                url: "includes/del.php",
                data: {
                    imgid: e
                },
                success: function(e) {
                    $(this).fancybox({
                        autoScale: !0,
                        content: '<div id="removed"><h1>The photo has been deleted</h1><a href="https://www.pic2map.com"><div id="selectbutton">Return to Main Page</div></a></div>',
                        openEffect: "elastic",
                        closeEffect: "elastic",
                        closeBtn: !1,
                        autoDimensions: !0,
                        overlayShow: !0,
                        centerOnScroll: !0
                    }).click(),
                    $("#wrapper").addClass("blur")
                }
            }),
            !1
        }
    }),
    $(".album_delete").click(function() {
        if (confirm("This will delete all photos in the album. Are you sure you want to continue?")) {
            var e = this.id;
            return $.ajax({
                type: "POST",
                url: "includes/delalbum.php",
                data: {
                    imgid: e
                },
                success: function(e) {
                    $(this).fancybox({
                        autoScale: !0,
                        content: '<div id="removed"><h1>The album has been deleted</h1><a href="https://www.pic2map.com"><div id="selectbutton">Return to Main Page</div></a></div>',
                        openEffect: "elastic",
                        closeEffect: "elastic",
                        closeBtn: !1,
                        autoDimensions: !0,
                        overlayShow: !0,
                        centerOnScroll: !0
                    }).click(),
                    $("#wrapper").addClass("blur")
                }
            }),
            !1
        }
    }),
    $('[class*=" lefticon"]').each(function() {
        $(this).on("click", function() {
            var e = $(this).data("id");
            markers[e].fire("lclick")
        })
    }),
    $("a[rel*=social]").click(function() {
        return window.open(this.href, "newWindow", "left=20,top=20,width=500,height=460,toolbar=0,resizable=1"),
        !1
    }),
    $(window).scroll(function() {
        $(this).scrollTop() > 20 ? $(".scrollup").fadeIn() : $(".scrollup").fadeOut()
    }),
    $(".scrollup").click(function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 600),
        !1
    })
});

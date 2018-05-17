//document.onclick=function(ev){
//    var oEvent=ev||event;
//    var oLeft=oEvent.clientX+'px';
//    var oTop=oEvent.clientY+'px'
//    alert(oLeft+','+oTop)
//}

function hideProgressMM() {
    var elem = getElementById('progressBar');
    elem.style.visibility = 'hidden';
}

function displayProgressMM(mm, nn, percent) {
    var elem = getElementById('progressBar');
    elem.style.visibility = 'visible';
}

function showProgressMm1(mm, nn, percent) {
    var meas = meas_pos[mm - meas_start];
    var pos = meas.pos;
    var notes = meas.notes;
    var w = pos.w;
    var x = notes[nn]; //+w*percent;
    if (nn < notes.length - 1) {
        x += (notes[nn + 1] - x) * percent;
    } else {
        x += (pos.x + w - x) * percent;
    }
    var elem = getElementById('progressBar');
    elem.x.baseVal.value = x;
    elem.y.baseVal.value = pos.y;
    elem.width.baseVal.value = 10;
    elem.height.baseVal.value = pos.h;
    elem.style.fill = "rgb(153,205,248)";
}

function theProgressBarElem() {
    var elem = window.progressBarElem;
    if (!elem) {
        if (window.showOneLine) {
            elem = getElementById('progressOneLineBar');
            //            elem=getElementById('progressBar');
            //            elem.style.fill="url(#cursor_blue)"
            //            elem.width.baseVal.value=300*window.scale;
        } else {
            elem = getElementById('progressBar');
            elem.style.fill = "rgb(153,205,248)";
            elem.width.baseVal.value = 10 * window.scale;
        }
        window.progressBarElem = elem;
    }
    return elem
}

function showProgressMm(mm, nn, percent) {
    if (window.lineoffset) {
        showProgressLineMmInternal(mm, nn, percent);
        return;
    }
    var meas = meas_pos[mm - meas_start];
    var pos = meas.pos;
    var notes = meas.notes;
    var w = pos.w;
    var x = 0;
    if (nn < 0) {
        x = notes[0];
    } else {
        x = notes[nn];
    }
    var y = pos.y + yOfLine(meas);

    if (nn < 0) {
        x += (pos.x + w - x) * percent;
    } else if (nn < notes.length - 1) {
        x += (notes[nn + 1] - x) * percent;
    } else if (window.showOneLine && mm < meas_pos.length - 1) {
        mm += 1;
        while (mm < meas_pos.length) {
            var nextMeas = meas_pos[mm];
            if (nextMeas.notes.length > 0) {
                x += (nextMeas.notes[0] - x) * percent;
                break;
            }
            mm += 1;
        }
    } else {
        x += (pos.x + w - x) * percent;
    }
    if (page_pos && meas.page < page_pos.length) {
        x += page_pos[meas.page].x;
        y += page_pos[meas.page].y;
    }
    var elem = theProgressBarElem();
    if (window.showOneLine) {
        //        elem.x.baseVal.value=x-100;
        //        elem.y.baseVal.value=y-70;
        //        elem.height.baseVal.value=pos.h+160;
        y -= 44
        elem.setAttributeNS(null, 'transform', "translate(" + x + ", " + y + ")");

        window.compatScrollTo(x * window.scale - 1260, 0);
        return;
    }
    elem.x.baseVal.value = x;
    elem.y.baseVal.value = y;
    elem.height.baseVal.value = pos.h;
    var screenh = document.body.clientHeight;
    if (y < window.compatPageYOffset() + 0 || y > window.compatPageYOffset() + screenh * 0.7) {
        var to = y * window.scale - 30;
        window.compatScrollTo(0, to);
    }
}

function startScrollTo(tox) {
    window.scrollToX = tox;
    if (window.scrollX > tox + 5) {
        window.scrollDelta = (window.scrollX - tox) / 20;
    } else if (tox > window.scrollX + 5) {
        window.scrollDelta = (tox - window.scrollX) / 20;
    } else {
        window.compatScrollTo(tox, 0);
        return;
    }
    scrollTox();
}

function scrollTox() {
    var tox = window.scrollToX;
    var delta = window.scrollDelta;
    if (window.scrollX > tox + delta) {
        window.compatScrollTo(window.scrollX - delta, 0);
    } else if (window.scrollX < tox - delta) {
        window.compatScrollTo(window.scrollX + delta, 0);
    } else {
        window.compatScrollTo(tox, 0);
        return;
    }
    setTimeout("scrollTox()", 15);
}

function showProgressMeaure(mm, percent) {
    var meas = meas_pos[mm - meas_start];
    var pos = meas.pos;
    var x = pos.x + pos.w * percent

    showCursor(x, pos.y, pos.h, meas);
}

function showProgressLineMm(mm, nn, percent) {
    if (typeof (supportNotFullAreaProgress) == 'function') {
        supportNotFullAreaProgress(mm)
    }
    window.hybridMm = mm
    window.hybridNn = nn
    if (!window.lineoffset) {
        showProgressMm(mm, nn, percent);
        return;
    }
    showProgressLineMmInternal(mm, nn, percent);
}

function showProgressLineMmInternal(mm, nn, percent) {
    var meas = meas_pos[mm - meas_start];
    var pos = meas.pos;
    var notes = meas.notes;
    var w = pos.w;
    var x = 0;

    if (nn < 0) {
        if (notes.length > 0) {
            x = notes[0]
            x += (pos.x + w - x) * percent
        } else {
            x = pos.x + w * percent
        }
    } else if (nn < notes.length) {
        x = notes[nn];
        if (nn < notes.length - 1) {
            x += (notes[nn + 1] - x) * percent;
        } else {
            x += (pos.x + w - x) * percent;
        }
    } else {
        x = pos.x + w
    }
    showCursor(x, pos.y, pos.h, meas);
}

function showCursor(x, y, h, meas) {

    if (window.scale) {
        x = x * window.scale
        y = y * window.scale
        h = h * window.scale
    }

    var line = meas.line;
    var linePos = window.lineoffset[line];
    if (linePos) {
        x += linePos.x;
        y += linePos.y;
    }

    if (linePos && line < window.lineoffset.length - 1) {
        var screenw = document.body.clientWidth;
        var screenx = document.body.clientleft;
        var pagesPerScreen = 2;
        //如果是自定义显示区域
        if (isSupportProgress()) {
            pagesPerScreen = 2;
        } else {
            if (screenw >= 1920 * 2) {
                pagesPerScreen = 4;
            }
        }
        if (pagesPerScreen == 4) {
            if (x < window.compatPageXOffset() + screenw * 0.25 || x > window.compatPageXOffset() + screenw * 0.75) {
                var to = 0
                if (line > 0) {
                    linePos = window.lineoffset[line - 1];
                    to = linePos.x;
                }
                window.compatScrollTo(to, 0);
            }
        } else {
            if (x < window.compatPageXOffset() + 0 || x > window.compatPageXOffset() + screenw / 2) {
                var to = linePos.x;
                window.compatScrollTo(to, 0);
            }
        }
    } else {
        var inX = x;
        setTimeout(function () {
            if (window.curPage != undefined && window.curPage * 2 < pageNumber()) {
                window.compatScrollTo(page_pos[window.curPage * 2].x, 0)
            } else {
                var x = 0;
                if (typeof (page_pos[window.curPage + 1]) != "undefined") {
                    x = page_pos[window.curPage + 1].x;
                } else {
                    x = inX;
                }
                if (currentPage() < page_pos.length - 2 && page_pos.length - 2 > 1) {
                    window.compatScrollTo(x, 0)
                }
            }
        }, 10);
    }
    var elem = theProgressBarElem();
    elem.x.baseVal.value = x;
    elem.y.baseVal.value = y;
    //    elem.width.baseVal.value=10;
    elem.height.baseVal.value = h;
    //    elem.style.fill="rgb(153,205,248)";
}

function showProgressBarXY(x, y) {
    var elem = theProgressBarElem();
    elem.x.baseVal.value = x;
    elem.y.baseVal.value = y;
    //    elem.width.baseVal.value=10;
    //    elem.height.baseVal.value=pos.h;
}

function showProgressBar(x, y, w, h) {
    var elem = getElementById('progressBar');
    elem.setAttributeNS(null, 'x', x);
    elem.setAttributeNS(null, 'y', y);
    elem.setAttributeNS(null, 'width', w);
    elem.setAttributeNS(null, 'height', h);
    elem.setAttributeNS(null, 'style', "fill:rgb(153,205,248)");
}

function setElementColor(identify, color) {
    var elem = getElementById(identify);
    if (elem) {
        //        elem.setAttributeNS (null, 'style',"fill:"+color);
        elem.setAttributeNS(null, 'fill', color);
    }
}

function highlightMeasure(from, to) {
    for (var i = meas_start + meas_pos.length - 1; i >= 0; i--) {
        var elem = getElementById('m' + i);
        if (to > from && i >= from && i < to) {
            console.log(elem);
            elem.style.fill = "rgba(220, 220, 220, 0.4)";
        } else {
            elem.style.fill = "rgba(0, 0, 0, 0)";
        }
    };
}

function informApp(msg) {
    //document.location=msg;
}

function touchedMeasure(x, y) {
    for (var mm = meas_pos.length - 1; mm >= 0; mm--) {
        var m_pos = meas_pos[mm - meas_start];
        var pos = m_pos.pos;
        var mx = pos.x;
        var my = pos.y + m_pos.liney;
        if (window.lineoffset) {
            var line = m_pos.line;
            var linePos = window.lineoffset[line];
            if (linePos) {
                mx += linePos.x;
                my += linePos.y;
            }
        }

        if (x > mx && x < mx + pos.w && y > my && y < my + pos.h) {
            return mm;
        }
    }
    return -1;
}

function clickDocument(event) {
    var ev = event || window.event;
    if (ev.target.nodeName == "BUTTON") {
        return;
    }
    var x = 0;
    var y = 0; //ev.offsetY;
    if (ev.touches && ev.touches.length > 0) {
        var touch = ev.touches[0];
        x = touch.pageX;
        y = touch.pageY;
        //把元素放在手指所在的位置
        //showMessage(" x="+touch.pageX+" y="+touch.pageY+" x="+touch.clientX+" y="+touch.clientY,100,450);
    } else {
        //showMessage("event.touches.length="+event.touches.length,200,100);
        x = ev.pageX; ///window.scale;
        y = ev.pageY;
    }
    x = x / window.scale;
    y = y / window.scale;

    var mm = touchedMeasure(x, y);
    if (mm >= 0) {
        var notes = meas_pos[mm - meas_start].notes;
        var num = notes.length;
        var nn = 0;

        if (num > 0 && x >= notes[0]) {
            for (; nn < num; nn++) {
                if (nn == num - 1) {
                    break;
                } else if (x >= notes[nn] && x < notes[nn + 1]) {
                    break;
                }
            };
        }
        //showProgressMm(mm,nn,0);
        informApp("?clickmm=" + mm + "&nn=" + nn);
        showPopMenu(mm, nn);
    }
}

function initload() {
    //document.onclick=clickDocument;
    document.addEventListener('touchstart', clickDocument, false);
    //document.addEventListener('click',clickDocument, false);
}
initload();

var hiddenPopviewTimer = null;

function clickMeasure(mm) {
    var ev = event || window.event;
    //highlightMeasure(mm);
    var x = ev.offsetX;
    var y = ev.offsetY;
    var pos = meas_pos[mm - meas_start].pos;
    var notes = meas_pos[mm - meas_start].notes;
    var num = notes.length;
    var nn = 0;
    if (num > 0 && x >= notes[0]) {
        for (; nn < num; nn++) {
            if (nn == num - 1) {
                break;
            } else if (x >= notes[nn] && x < notes[nn + 1]) {
                break;
            }
        };
    }
    //alert("?clickmm="+mm+"&nn="+nn);
    //document.location="?clickmm="+mm+"&nn="+nn;
    showProgressMm(mm, nn, 0);
    informApp("?clickmm=" + mm + "&nn=" + nn);
    showPopMenu(mm, nn);
}

function yOfLine(m_pos) {
    var liney = m_pos.liney
    if (window.lineoffset) {
        var line = m_pos.line;
        var linePos = window.lineoffset[line];
        if (linePos) {
            liney = linePos.y;
        }
    }
    return liney
}

function showPopMenu(mm, nn) {
    var m_pos = meas_pos[mm - meas_start];
    var pos = meas_pos[mm - meas_start].pos;
    var x = pos.x;
    var y = pos.y + m_pos.liney;
    if (window.lineoffset) {
        var line = m_pos.line;
        var linePos = window.lineoffset[line];
        if (linePos) {
            x += linePos.x;
            y += linePos.y;
        }
    }
    //show pop view
    if (window.showTapButton == "comment") {
        var popview = getElementById("addcomment");
        if (!popview) {
            var xmlns = 'http://www.w3.org/2000/svg';
            popview = document.createElementNS(xmlns, 'div');
            document.body.appendChild(popview);
            popview.setAttributeNS(null, 'style', 'border:none; width:280px;position:absolute;visibility:hidden;background:none');
            popview.setAttributeNS(null, 'id', 'addcomment');
        }
        popview.style.visibility = "visible";
        if (pos.x > 1024 - 280) {
            popview.style.left = pos.x + pos.w - 280;
        } else {
            popview.style.left = pos.x;
        }
        popview.style.top = pos.y - 20;
        popview.value = mm;
        var loopA = getElementById("commentA");
        if (!loopA) {
            var xmlns = 'http://www.w3.org/2000/svg';
            loopA = document.createElementNS(xmlns, 'button');
            document.body.appendChild(loopA);
            loopA.setAttributeNS(null, 'style', 'width:130px;height:30px;background:#FEFBEB;color:#27ae60;font-size:medium');
            loopA.setAttributeNS(null, 'id', 'commentA');
        }
        loopA.onclick = function () {
            // alert(mm+" "+pos.x+" "+pos.y+" "+pos.h);
            informApp("?commenta=" + mm + "&nn=" + nn);
            clearTimeout(hiddenPopviewTimer);
            popview.style.visibility = 'hidden';
        }
        if (hiddenPopviewTimer) {
            clearTimeout(hiddenPopviewTimer);
        };
        hiddenPopviewTimer = setTimeout("addcomment.style.visibility='hidden';", 6000);
        return;
    }
    if (window.showTapButton == "loopab") {
        var liney = yOfLine(m_pos)
        var popview = getElementById("popview");
        popview.style.visibility = "visible";
        if (pos.x > 1024 - 280) {
            popview.style.left = (pos.x + pos.w - 280);
        } else {
            popview.style.left = pos.x;
        }
        popview.style.top = pos.y + liney - 20;
        popview.value = mm;
        var loopA = getElementById("loopA");
        loopA.onclick = function () {
            // alert(mm+" "+pos.x+" "+pos.y+" "+pos.h);
            showLoopCursor(popview, true, pos.x - 5, pos.y + liney, pos.h);
            informApp("?loopa=" + mm);
        }
        var loopB = getElementById("loopB");
        loopB.onclick = function () {
            showLoopCursor(popview, false, pos.x + pos.w + 0, pos.y + liney, pos.h);
            // alert(mm);
            informApp("?loopb=" + mm);
        }
        if (hiddenPopviewTimer) {
            clearTimeout(hiddenPopviewTimer);
        };
        hiddenPopviewTimer = setTimeout("popview.style.visibility='hidden';", 6000);
    }
}

function showLoopAB(mm, isStart) {
    var meas = meas_pos[mm - meas_start];
    var pos = meas.pos;
    var y = pos.y + yOfLine(meas);
    var x = pos.x;
    var h = pos.h;

    if (window.lineoffset) {
        var line = meas.line;
        var linePos = window.lineoffset[line];
        if (linePos) {
            x = linePos.x + pos.x * window.scale;
        }
        if (!isStart) {
            x += pos.w * window.scale;
        }
        h *= window.scale;
    } else {
        if (!isStart) {
            x += pos.w
        }
    }
    showLoopCursor(null, isStart, x, y, h);
}

function showLoopCursor(popview, isStart, x, y, h) {
    var elem_id = (isStart) ? 'playloopA' : 'playloopB';
    var elem = getElementById(elem_id);
    elem.style.visibility = 'visible';
    elem.x.baseVal.value = x;
    elem.y.baseVal.value = y;
    elem.width.baseVal.value = 10 * window.scale;
    elem.height.baseVal.value = h;
    elem.style.fill = (isStart) ? '#27ae60' : '#c0392b';
    //elem.style.fill="rgb(153,205,248)";
    if (popview) {
        clearTimeout(hiddenPopviewTimer);
        popview.style.visibility = 'hidden';
    }
}

function cancelLoopAB() {
    //alert('cancelLoopAB');
    var elem = getElementById('playloopA');
    elem.style.visibility = 'hidden';
    elem = getElementById('playloopB');
    elem.style.visibility = 'hidden';
    informApp("?loopc");

    var popview = getElementById("popview");
    clearTimeout(hiddenPopviewTimer);
    popview.style.visibility = 'hidden';
    highlightMeasure(0, 0);
}

function removeAllTempNotes() {
    var c = getElementById('tempNoteGroup');
    if (c) {
        c.parentNode.removeChild(c);
    }
}

function removeAllFlags() {
    var c = getElementById('tempFlagsGroup');
    if (c) {
        c.parentNode.removeChild(c);
    }
}

function removeNoteLine(index) {
    var elem = getElementById('tempNote' + index);
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
}

function addNote(index, x, y, style) {
    var elem = getElementById('tempNote' + index);
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        var noteGroup = document.createElementNS(xmlns, 'g');
        noteGroup.setAttributeNS(null, 'id', 'tempNoteGroup');
        c.appendChild(noteGroup);

        elem = document.createElementNS(xmlns, 'circle');
        noteGroup.appendChild(elem);

        elem.setAttributeNS(null, 'id', 'tempNote' + index);
    }
    elem.setAttributeNS(null, 'cx', x);
    elem.setAttributeNS(null, 'cy', y);
    elem.setAttributeNS(null, 'r', '5');
    elem.setAttributeNS(null, 'style', style);
}

function addNoteLine(index, line, x, y, fillcolor, alter) {
    var elem = getElementById('tempNote' + index);
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var noteGroup = getElementById('tempNoteGroup')
        if (noteGroup == null) {
            var c = getElementById('svg');
            var noteGroup = document.createElementNS(xmlns, 'g');
            noteGroup.setAttributeNS(null, 'id', 'tempNoteGroup');
            c.appendChild(noteGroup);
        }
        //<text id='0_0_0' x='123.2' y='-4.2' font-size='16' style="font-family: 'Aloisen New';" fill='black'>&#x174;</text>
        elem = document.createElementNS(xmlns, 'text');
        //        elem=document.createElementNS(xmlns, 'circle');
        noteGroup.appendChild(elem);

        elem.setAttributeNS(null, 'id', 'tempNote' + index);
        elem.setAttributeNS(null, 'font-size', '16');
        elem.setAttributeNS(null, 'style', "font-family: 'Aloisen New';");
        //elem.setAttributeNS (null, 'fill','black');
        if (alter > 0) {
            elem.textContent = "#\u0174";
            x -= 10;
        } else if (alter < 0) {
            elem.textContent = "b\u0174";
            x -= 10;
        } else {
            elem.textContent = "\u0174";
        }
    }
    if (window.lineoffset && line < window.lineoffset.length) {
        var linePos = window.lineoffset[line];
        x += linePos.x;
        y += linePos.y;
    }
    elem.setAttributeNS(null, 'x', x);
    elem.setAttributeNS(null, 'y', y);
    elem.setAttributeNS(null, 'fill', fillcolor);
}

function addNoteLineMM(index, mm, nn, y, fillcolor, alter) {
    var elem = getElementById('tempNote' + index);
    var x = 0;
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var noteGroup = getElementById('tempNoteGroup')
        if (noteGroup == null) {
            var c = getElementById('svg');
            var noteGroup = document.createElementNS(xmlns, 'g');
            noteGroup.setAttributeNS(null, 'id', 'tempNoteGroup');
            c.appendChild(noteGroup);
        }
        elem = document.createElementNS(xmlns, 'text');
        noteGroup.appendChild(elem);

        elem.setAttributeNS(null, 'id', 'tempNote' + index);
        elem.setAttributeNS(null, 'font-size', '16');
        elem.setAttributeNS(null, 'style', "font-family: 'Aloisen New';");
        if (alter > 0) {
            elem.textContent = "#\u0174";
            x -= 10;
        } else if (alter < 0) {
            elem.textContent = "b\u0174";
            x -= 10;
        } else {
            elem.textContent = "\u0174";
        }
    }
    var pos = meas_pos[mm];
    var line = pos.line;
    var notes = pos.notes;
    x += notes[nn];

    if (window.lineoffset && line < window.lineoffset.length) {
        if (window.scale) {
            x = x * window.scale;
            y = y * window.scale;
        }
        var linePos = window.lineoffset[line];
        x += linePos.x;
        y += linePos.y;
    } else if (window.showOneLine) {
        x = x;
        y = y + 70;
    }
    elem.setAttributeNS(null, 'x', x - 10);
    elem.setAttributeNS(null, 'y', y);
    elem.setAttributeNS(null, 'fill', fillcolor);
}


function showFlag(mm, nn, text) {
    var elem = getElementById('flags_' + mm + "_" + nn);
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        var noteGroup = getElementById('tempFlagsGroup');
        if (noteGroup == null) {
            noteGroup = document.createElementNS(xmlns, 'g');
            noteGroup.setAttributeNS(null, 'id', 'tempFlagsGroup');
            c.appendChild(noteGroup);
        }

        elem = document.createElementNS(xmlns, 'circle');
        noteGroup.appendChild(elem);
        //        c.appendChild(elem);

        elem.setAttributeNS(null, 'id', 'flags_' + mm + "_" + nn);
    }
    elem.setAttributeNS(null, 'style', "fill:rgba(200, 100, 100, 0.8)");
    var notes = meas_pos[mm].notes;
    y = meas_pos[mm].pos.y - 35;
    x = notes[nn];

    elem.setAttributeNS(null, 'cx', x);
    elem.setAttributeNS(null, 'cy', y);
    elem.setAttributeNS(null, 'r', '10');

    text = text.replace(/kongge/ig, " ");
    text = text.replace(/huanhang/ig, "\n");

    elem.onclick = function () {
        showCommentMessage(text, mm, nn);
    }
}

function showCountDown(mm, nn, text) {
    var notes = meas_pos[mm].notes;
    y = meas_pos[mm].pos.y - 50;
    x = notes[nn];
    var elem = getElementById('countdown');
    if (text == null) {
        if (elem) {
            elem.parentNode.removeChild(c);
        }
        return;
    }
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        elem = document.createElementNS(xmlns, 'text');
        c.appendChild(elem);
        elem.setAttributeNS(null, 'id', 'countdown');
        elem.setAttributeNS(null, 'text-anchor', 'middle');
        elem.setAttributeNS(null, 'font-size', '50');
        elem.setAttributeNS(null, 'style', 'fill:rgb(0,0,200);');
    }

    elem.setAttributeNS(null, 'x', x);
    elem.setAttributeNS(null, 'y', y);
    var data = elem.lastChild;
    if (data == null) {
        data = document.createTextNode('tt');
        elem.appendChild(data);
    }
    data.textContent = text;
}

function showCommentMessage(text, mm, nn) {
    var notes = meas_pos[mm].notes;
    y = meas_pos[mm].pos.y - 50;
    x = notes[nn];
    var elem = getElementById('comment');
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        elem = document.createElementNS(xmlns, 'text');
        c.appendChild(elem);
        elem.setAttributeNS(null, 'id', 'comment');
        elem.setAttributeNS(null, 'text-anchor', 'middle');
        elem.setAttributeNS(null, 'font-size', '20');
        elem.setAttributeNS(null, 'style', 'fill:rgb(0,0,0);');
    }
    elem.setAttributeNS(null, 'x', x);
    elem.setAttributeNS(null, 'y', y);
    var data = elem.lastChild;
    if (data == null) {
        data = document.createTextNode('tt');
        elem.appendChild(data);
        data.textContent = text;
    } else {
        elem.removeChild(data);
    }
}

function showVoiceFlag(mm, nn, voiceMessage) {
    var elem = getElementById('flags_' + mm + "_" + nn);
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        var noteGroup = document.createElementNS(xmlns, 'g');
        noteGroup.setAttributeNS(null, 'id', 'tempFlagsGroup');
        c.appendChild(noteGroup);

        elem = document.createElementNS(xmlns, 'circle');
        noteGroup.appendChild(elem);
        //        c.appendChild(elem);

        elem.setAttributeNS(null, 'id', 'flags_' + mm + "_" + nn);
    }
    elem.setAttributeNS(null, 'style', "fill:rgba(127, 255, 212, 0.8)");
    var notes = meas_pos[mm].notes;
    y = meas_pos[mm].pos.y - 40;
    x = notes[nn];

    elem.setAttributeNS(null, 'cx', x);
    elem.setAttributeNS(null, 'cy', y);
    elem.setAttributeNS(null, 'r', '10');

    //voice elem
    var voice = getElementById('audioPlay_' + mm + "_" + nn);
    if (voice == null) {
        var c = getElementById('tempFlagsGroup');
        voice = document.createElement('audio');
        c.appendChild(voice);
        voice.setAttribute('id', 'audioPlay_' + mm + "_" + nn);
        voice.setAttribute('type', 'audio/caf');
    }
    voice.setAttribute('src', voiceMessage);

    elem.onclick = function () {
        var voice = getElementById('audioPlay_' + mm + "_" + nn);
        voice.play();
    }
}

function showMessage(text, x, y) {
    var elem = getElementById('score');
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        elem = document.createElementNS(xmlns, 'text');
        c.appendChild(elem);
        elem.setAttributeNS(null, 'id', 'score');
        //        elem.setAttributeNS (null, 'text-anchor','middle');
        elem.setAttributeNS(null, 'font-size', '25');
        elem.setAttributeNS(null, 'style', 'fill:rgb(100,200,10);');
    }
    elem.setAttributeNS(null, 'x', x);
    elem.setAttributeNS(null, 'y', y);
    var data = elem.lastChild;
    if (data == null) {
        data = document.createTextNode('tt');
        elem.appendChild(data);
    }
    data.textContent = text;
}

function showScore(totalScore, x, score_y) {
    var elem = getElementById('score');
    if (elem == null) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        elem = document.createElementNS(xmlns, 'text');
        c.appendChild(elem);
        elem.setAttributeNS(null, 'id', 'score');
        elem.setAttributeNS(null, 'text-anchor', 'middle');
        elem.setAttributeNS(null, 'font-size', '45');
        elem.setAttributeNS(null, 'style', 'fill:rgb(100,200,10);');
    }
    elem.setAttributeNS(null, 'x', x);
    elem.setAttributeNS(null, 'y', score_y);
    var data = elem.lastChild;
    if (data == null) {
        data = document.createTextNode('tt');
        elem.appendChild(data);
    }
    data.textContent = totalScore;
}

function removeScore() {
    var elem = getElementById('score');
    if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
}

function drawVelocities(fromM, toM, velocities) {
    //var count=0;
    var vel_count = velocities.length;
    var path = "";
    var base_y, x;
    //    console.log("velocities:"+velocities);
    for (var m = fromM; m < toM && m - fromM < vel_count; m++) {
        var notes = meas_pos[m].notes;
        var len = notes.length;
        var velsInMeasure = velocities[m - fromM];

        base_y = meas_pos[m].pos.y + 50;
        for (var i = 0; i < len && i < velsInMeasure.length; i++) {
            // console.log("i:"+i);
            var v = velsInMeasure[i];
            if (v > 0) {
                x = notes[i] + 8;
                var y = base_y - velsInMeasure[i];
                path += "L" + x + "," + y + " ";
            }
        };
    };
    //console.log(path);

    drawVelocityLine(fromM, path, x, base_y);
}

//path: q50,-100 100,0 q50,+50 100,0 q50,-20 100,0
function drawVelocityLine(fromM, path, end_x, base_y) {
    var elem = getElementById('vline_' + fromM);
    if (!elem) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var c = getElementById('svg');
        elem = document.createElementNS(xmlns, 'path');
        elem.setAttributeNS(null, 'id', 'vline_' + fromM);
        elem.setAttributeNS(null, 'stroke', 'rgba(200, 200, 210, 0.8)');
        elem.setAttributeNS(null, 'stroke-width', '2');
        elem.setAttributeNS(null, 'fill', 'rgba(200, 200, 210, 0.4)');
        c.appendChild(elem);
    }
    var pos1 = meas_pos[fromM].pos;
    var newPath = "M" + pos1.x + "," + base_y + " " + path + " L" + end_x + "," + base_y;
    elem.setAttributeNS(null, 'd', newPath);
    // alert(newPath);
}

function createPage(parent, index, x, y, w, h) {
    createPageColor(parent, index, x, y, w, h, window.pageBackColor);
    if (window.useBgImage) {
        setPageImage(parent, index, x, y, w, h);
    }
}

function createPageColor(parent, index, x, y, w, h, bgcolor) {
    var pageElem = getElementById("page_" + index);
    if (!pageElem) {
        var xmlns = 'http://www.w3.org/2000/svg';
        var pageElem = document.createElementNS(xmlns, 'rect');
        pageElem.setAttributeNS(null, 'id', "page_" + index);
        if (window.useBgImage) {
            if (index == 0) {
                bgcolor = "rgba(232,192,156,0.3)"
            } else {
                var i = index % 4;
                if (i == 1 || i == 2) {
                    bgcolor = "rgba(182,238,184,0.3)"
                } else {
                    bgcolor = "rgba(232,192,156,0.3)"
                }
            }
        } else if (bgcolor == "auto") {
            if (index == 0) {
                bgcolor = "#fff"
            } else {
                var i = index % 4;
                if (i == 1 || i == 2) {
                    bgcolor = "#fff4d8"
                } else {
                    bgcolor = "#e9fffc"
                }
            }
        }
        pageElem.setAttributeNS(null, 'style', 'fill:' + bgcolor + ';stroke:#AAA;stroke-width:0;');
        parent.appendChild(pageElem);
    }
    var scale = window.scale //w/1024
    pageElem.setAttributeNS(null, 'x', x + 10 * scale);
    pageElem.setAttributeNS(null, 'y', 0);
    pageElem.setAttributeNS(null, 'width', w - 30 * scale);
    pageElem.setAttributeNS(null, 'height', h);
}

function pageNumber() {
    return page_pos.length
}

function setPageColor(page, color) {
    var pageElem = getElementById("page_" + page);
    if (pageElem) {
        pageElem.setAttributeNS(null, 'style', 'fill:' + color + ';');
    }
}

function showPageWithId(index, show) {
    var elem = getElementById("page_" + index);
    if (elem) {
        if (show) {
            elem.style.visibility = 'visible';
            //            elem.style.display='block';
        } else {
            elem.style.visibility = 'hidden';
            //            elem.style.display='none';
        }
    }
}

function setSvgPageSizeJianpu(lw, h, hormode, hideTitle) {
    setSvgPageLineSize(lw, h, hormode, "JianpuLine_", hideTitle);
}

function showElemWithId(elemId, show) {
    var elem1 = getElementById(elemId);
    if (elem1) {
        if (show) {
            style = 'visibility:visible;'
        } else {
            style = 'visibility:hidden;'
        }
        elem1.setAttributeNS(null, 'style', style);
    }
}

function showJianpu(show) {
    showElemWithId('jianpu', show);
    showElemWithId('wuxianpu', !show);
}

function setSvgPageBackColor(color) {
    window.pageBackColor = color;
}

function setSvgPageSize(lw, h, hormode, hideTitle) {
    setSvgPageLineSize(lw, h, hormode, "line_", hideTitle);
    var svg = getElementById("svg");
    svg.setAttributeNS(null, 'style', "visibility:visible;");
}

function setChildTextFontSize(elemname, size) {
    var mainTitle = getElementById(elemname);
    if (mainTitle) {
        var texts = mainTitle.getElementsByTagName("text");
        var top = 0
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];
            if (i == 0) {
                top = Number(text.getAttributeNS(null, 'y', size));
            } else {
                top += size * 1.2;
                text.setAttributeNS(null, 'y', top);
            }
            text.setAttributeNS(null, 'font-size', size);
            //text.setAttributeNS(null, 'style',"font-family: '娃娃体-简','Aloisen New','Arial','Times New Roman';");
        }
    }
}
//hormode: true: scroll from left to right. false: scroll from top to bottom
function setSvgPageLineSize(lw, h, hormode, linePrefix, hideTitle) {
    window.pageSize = {
        width: lw,
        height: h
    }
    var backElem = getElementById("tempgroup");

    if (!window.pageBackColor) {
        window.pageBackColor = "auto";
    }
    if (!window.pageWidth) {
        window.pageWidth = 1024
    }

    var scale = lw / window.pageWidth
    window.scale = scale
    var x = 0;
    var staffHeight = lw / 7.7;
    if (!hormode) {
        staffHeight = lw / 7.0;
    }
    var lineHeight = lw / 4.1; //1024: 240
    if (h < 1000) {
        lineHeight = lw / 4.5;
    };
    var topMargin = 90; //lineHeight*0.4;//80;
    var y = topMargin; //lineHeight;
    // var w=1024;
    var pageY = 0; //10;//topMargin/4;
    var pageW = lw; //-10*scale;

    var titlePage;
    if (linePrefix == "JianpuLine_") {
        titlePage = getElementById("jianpu_page_title");
    } else {
        titlePage = getElementById("page_title");
    }
    if (titlePage) {
        if (hideTitle) {
            titlePage.setAttributeNS(null, 'style', "visibility:hidden;");
        } else {
            titlePage.setAttributeNS(null, 'style', "visibility:visible;");
            var offy = 240;
            if (h < 400) {
                offy = 140;
            }
            titlePage.setAttributeNS(null, 'transform', "translate(0, " + offy + ") scale(" + scale + "," + scale + ")");
        }
    }
    //    setChildTextFontSize("main_title", "45")
    //    setChildTextFontSize("main_subtitle", "35")
    //    setChildTextFontSize("main_composer", "30")

    var page = 0;
    if (hormode) {
        page_pos = new Array();
        if (!hideTitle) {
            page_pos[page] = {
                "x": 0,
                "y": 0
            };
            createPage(backElem, page, x, pageY, pageW, h);
            page++;
            x += lw;
        }

        page_pos[page] = {
            "x": x,
            "y": 0
        };
        createPage(backElem, page, x, pageY, pageW, h);
        page++;
    } else {
        y += 180;
    }

    window.lineoffset = new Array();
    for (var i = 0; i < line_num; i++) {
        var staves = lines[i].staves;
        lineHeight = staffHeight * staves;
        if (staves == 3) {
            lineHeight *= 1.2;
        }
        window.lineoffset[i] = {
            "x": x,
            "y": y
        };
        var lineElem = getElementById(linePrefix + i);
        lineElem.setAttributeNS(null, 'transform', "translate(" + x + ", " + y + ") scale(" + scale + "," + scale + ")");
        if (i < line_num - 1) {
            if (hormode) {
                // console.log('x='+x+' y='+y+' w='+w);
                if (y + 1.6 * lineHeight > h || staves >= 4) {
                    y = topMargin;
                    x += lw;
                    // w+=1024;
                    var meas_index = 0;
                    for (var m = 0; m < meas_pos.length; m++) {
                        var meas = meas_pos[m];
                        if (meas.line == i + 1) {
                            meas_index = m;
                            break;
                        }
                    }
                    page_pos[page] = {
                        "x": x,
                        "y": 0,
                        "m": meas_index
                    };
                    // page_pos[page]={"x":x,"y":0};
                    createPage(backElem, page, x, pageY, pageW, h);

                    page++;
                } else {
                    y += lineHeight;
                }
            } else {
                y += lineHeight;
            }
        }
    }
    // console.log('w='+w);
    y += lineHeight;
    // w+=1024;

    var svgElem = getElementById("svg");
    if (hormode) {
        //        if(page<4){
        x += lw;
        page_pos[page] = {
            "x": x,
            "y": 0
        };
        createPage(backElem, page, x, pageY, pageW, h);
        page++;
        //        }
        if (page < 4) {
            x += lw;
            page_pos[page] = {
                "x": x,
                "y": 0
            };
            createPage(backElem, page, x, pageY, pageW, h);
            page++;
        }
        lw -= 10;
        svgElem.setAttributeNS(null, 'width', x + lw + 'px');
        svgElem.setAttributeNS(null, 'height', h + 'px');
    } else {
        svgElem.setAttributeNS(null, 'width', lw + 'px');
        svgElem.setAttributeNS(null, 'height', y + 'px');
    }
    return page;
}

function currentPage() {
    for (var i = page_pos.length - 1; i >= 0; i--) {
        var curx = window.compatPageXOffset();
        var pagex = page_pos[i].x;
        if (curx >= pagex - 80 && curx < pagex + 300) {
            return i;
            break;
        }
    }
    return 0;
}

function movePage(num, pagex, delta) {
    if (num != 0) {
        var index = 0;
        var moveToX;
        if (delta > 0) {
            moveToX = (pagex - document.body.clientWidth / 4) + (11 - num) * document.body.clientWidth / 4 / 10;
        } else {
            moveToX = (pagex + document.body.clientWidth / 4) - (11 - num) * document.body.clientWidth / 4 / 10;
        }
        index = num - 1;
        window.compatScrollTo(moveToX, 0);
        setTimeout("movePage(" + index + "," + pagex + "," + delta + ")", 20);
    }
}
//function turnPage(delta) {
//    var move = 1;
//    var curPage = currentPage();
//    pagex=page_pos[curPage].x;
//    if(pagex==0 && delta<0){
//        move = 0;
//    }
//    var topage=curPage+delta;
//    if (topage>page_pos.length - 1) {
//        topage=page_pos.length - 1;
//    }else if (topage<0) {
//        topage=0;
//    }
//    //delta = delta;
//    pagex=page_pos[topage].x;
//    if(move!=0){
//        setTimeout("movePage(10,"+pagex+","+delta+")",20);
//    }
//}
function turnPage(delta) {
    if (delta == -1 && document.body.clientWidth < 3840 && currentPage() == 1) {
        if (page_pos[0].m == undefined) {
            window.compatScrollTo(0, 0);
            return page_pos[0].x;
        }
        return page_pos[0].m;
    }
    if (delta == 1 && document.body.clientWidth < 3840 && currentPage() + 1 >= pageNumber() - 2) {
        return page_pos[page_pos.length - 2].m;
    }
    var curPage = currentPage();

    var move = 1;
    pagex = page_pos[curPage].x;
    if ((pagex == 0 && delta < 0) || (curPage >= page_pos.length - 2 && delta > 0)) {
        move = 0;
        return;
    }
    var topage = curPage + delta;
    if (topage > page_pos.length - 1) {
        topage = page_pos.length - 1;
    } else if (topage < 0) {
        topage = 0;
    }
    //    delta = delta;
    pagex = page_pos[topage].x;
    if (move != 0) {
        //        if(topage==0){
        //            window.compatScrollTo(pagex, 0);
        //        }else{
        //            startScrollTo(pagex);
        //        }
        setTimeout("movePage(10," + pagex + "," + delta + ")", 20);
    }
    if (topage + 1 < page_pos.length) {
        window.curPage = topage + 1;
        return page_pos[topage + 1].m;
    }
    window.curPage = topage;
    return page_pos[topage].m;
}

function pageNumber() {
    return page_pos.length
}

function setPageColor(page, color) {
    var pageElem = getElementById("page_" + page);
    if (pageElem) {
        pageElem.setAttributeNS(null, 'style', 'fill:' + color + ';');
    }
}

function setBackgroundImage() {
    window.pageBackColor = 'rgba(0,0,0,0)';
    document.body.setAttributeNS(null, 'style', 'background-image: url(scorebg.png);');
    window.useBgImage = true;
    //setPageImage(0, pageW, pageH);
}

function setPageImage(parent, page, x, y, pageW, pageH) {
    var xmlns = 'http://www.w3.org/2000/svg';
    if (page == 0) {
        createImageElem(parent, "page_" + page + "_topleft", 10, 0, 440, 400, 'bg_topleft_pic.png');
        if (pageH > 600) {
            createImageElem(parent, "page_" + page + "_topright", pageW - 403 - 10, pageH - 253, 403, 253, 'bg_topright_pic.png');
        }
    } else {
        //        var x0 = x+(pageW-178)/2;
        //        createImageElem(parent, "page_"+page+"_scoretop", x0, 0, 178, 52, 'bg_lower_pic.png');
        //
        //        var y0 = pageH-52;
        //        var elem = createImageElem(parent, "page_"+page+"_scorelower", x0, y0, 178, 52, 'bg_lower_pic.png');
        //        elem.setAttributeNS(null, 'transform',"rotate(180 "+x0+" "+y0+"),translate(-178,-52)");
        var w = 106;
        var h = 107;
        var left = x + 10;
        var elem = createScoreImageElem(parent, "page_" + page + "_scoretopleft", left, 0, w, h);
        elem.setAttributeNS(null, 'transform', "rotate(90 " + left + " 0),translate(0,-" + w + ")");

        var right = x + pageW - 10;
        elem = createScoreImageElem(parent, "page_" + page + "_scoretopright", right, 0, w, h);
        elem.setAttributeNS(null, 'transform', "rotate(180 " + right + " " + 0 + "),translate(0,-" + w + ")");

        //if(pageH>600)
        {
            createScoreImageElem(parent, "page_" + page + "_scorebottomleft", left, pageH - h, w, h);

            elem = createScoreImageElem(parent, "page_" + page + "_scorebottomright", right, pageH, w, h);
            elem.setAttributeNS(null, 'transform', "rotate(-90 " + right + " " + pageH + "),translate(0,-" + w + ")");
        }
    }
}

function createScoreImageElem(parent, id, x, y, w, h) {
    //var elem = createImageElem(parent, id, x, y, 159, 161, 'bg_lowerright_pic.png');
    var elem = createImageElem(parent, id, x, y, w, h, 'bg_lowerright_pic.png');
    return elem;
}

function createImageElem(parent, id, x, y, w, h, imgname) {
    var elem = getElementById(id);
    if (elem == null) {
        elem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        elem.setAttributeNS(null, 'id', id);
        elem.setAttributeNS(null, 'x', x);
        elem.setAttributeNS(null, 'y', y);
        elem.setAttributeNS(null, 'width', w);
        elem.setAttributeNS(null, 'height', h);
        elem.setAttributeNS("http://www.w3.org/1999/xlink", 'href', imgname);
        parent.appendChild(elem);
    };
    if (x != 0) {
        elem.setAttributeNS(null, 'x', x);
    }
    if (y != 0) {
        elem.setAttributeNS(null, 'y', y);
    }
    return elem;
}

function setOnePage(width) {
    //    setSvgPageSize(width,1024,false);
    //    setSvgPageSizeJianpu(width,1024,false);
    window.scale = 1;
    window.showTapButton = "loopab";
    var svg = getElementById("svg");
    var w = svg.clientWidth;
    if (w > 0) {
        window.scale = width / w;
        document.body.style.zoom = width / w;
    }
    svg.setAttributeNS(null, 'style', "visibility:visible;");
}

function setOneLine(bigger) {
    window.showOneLine = true;

    var line = lines[0];
    var staves = line.staves;
    if (staves > 3) {
        window.scale = 0.6;
    } else if (staves == 3) {
        window.scale = 0.8;
    } else {
        window.scale = 1;
    }
    if (bigger) {
        window.scale *= 2.0;
    }
    document.body.style.zoom = window.scale;
    window.showTapButton = "loopab";
    var svg = getElementById("svg");
    svg.setAttributeNS(null, 'style', "visibility:visible;");
    document.body.style.backgroundColor = "rgb(225,245,225)"; //"rgba(182,238,184,0.3)";
}
//setOnePage(800)
//setBackgroundImage();
//setSvgPageSizeJianpu(1920/2,1080,true);
//setSvgPageSize(640,720,true);
//setSvgPageSize(1920/2,1080,true);
//showJianpu(true);
//setSvgPageSize(1024,1024*4/3,true);

//document.body.style.overlfow='hidden';
//document.documentElement.style.overflow='hidden';
//setSvgPageSize(1920/2,1080,true);
//showProgressLineMm(2,2,0);

var LocString = String(window.document.location.href);

function getQueryStr(str) {
    var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString),
        tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
}

function checkParams() {
    var jianpu = getQueryStr("jianpu");
    if (jianpu != null && jianpu == "1") {
        showElemWithId('jianpu', true);
        showElemWithId('jianpufixdo', false);
        showElemWithId('wuxianpu', false);
    } else if (jianpu != null && jianpu == "2") {
        showElemWithId('jianpu', false);
        showElemWithId('jianpufixdo', true);
        showElemWithId('wuxianpu', false);
    } else {
        showElemWithId('jianpu', false);
        showElemWithId('jianpufixdo', false);
        showElemWithId('wuxianpu', true);
    }
    var mode = getQueryStr("mode");
    if (mode != null && mode == "0") {
        setOnePage(768); //ipad: 2048x1536 -> 1024x768
    } else if (mode != null && mode == "1") {
        setSvgPageSize(1920 / 2, 1080, true);
        setSvgPageSizeJianpu(1920 / 2, 1080, true);
    } else if (mode != null && mode == "2") {
        //setBackgroundImage();
        setSvgPageSize(1920 / 2, 1080 / 2, true);
        setSvgPageSizeJianpu(1920 / 2, 1080 / 2, true);
    } else if (mode != null && mode == "3") {
        setOnePage(414); //iphone6 plus: 1920x1080 -> 736x414
    } else if (mode != null && mode == "4") {
        setOnePage(375); //iphone6: 1334x750 -> 667x375
    } else if (mode != null && mode == "5") {
        setOnePage(320); //iphone5: 1136x640 -> 568x320
    } else if (mode != null && mode == "6") {
        setOneLine(false);
    } else {
        //setBackgroundImage();
        setSvgPageSizeJianpu(1920 / 2, 1080, true);
        setSvgPageSize(1920 / 2, 1080, true);
    }
}
//checkParams()

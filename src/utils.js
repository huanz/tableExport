exports.getText = function (el) {
    var s = el.textContent || el.innerText;
    return s == null ? "" : s.replace(/^\s*(.*?)\s+$/, "$1");
    
};

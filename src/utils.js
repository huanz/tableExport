exports.getText = function (el) {
    var s = el.textContent || el.innerText;
    return s == null ? "" : s.replace(/^\s*(.*?)\s+$/, "$1");
};

exports.template = function (s, c) {
    return s.replace(/{{(\w+)}}/g, function (m, p) {
        return c[p];
    });
};
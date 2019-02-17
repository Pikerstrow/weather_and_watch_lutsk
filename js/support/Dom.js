/*Dom element class*/
export default class Dom {
    static createElement(tagName, innerText = null, className = null) {
        let node = document.createElement(tagName);
        if (innerText) {
            node.innerHTML = innerText;
        }
        if (className) {
            node.className = className;
        }
        return node;
    }

    static getByClass(className, first = true) {
        if (first) {
            return document.getElementsByClassName(className)[0];
        }
        return document.getElementsByClassName(className);
    }

    static getByTag(tagName, first = true) {
        if (first) {
            return document.getElementsByTagName(tagName)[0];
        }
        return document.getElementsByTagName(tagName);
    }
}

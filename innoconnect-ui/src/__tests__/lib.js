import escapeRegExp from "lodash.escaperegexp";

function toRegex(value) {
    return new RegExp(escapeRegExp(value), "i")
}

export { toRegex }
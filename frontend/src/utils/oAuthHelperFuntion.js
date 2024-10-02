import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';

function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
}


function base64urlencode(a) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export const getSHA512Hash = async (cv) => {
    return sha512(cv);
}

export const text2Binary = (code_verifier) => {
    return code_verifier.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}

export const challenge_from_verifier = async (v) => {
    let hashed = sha256(v);
    return hashed;
}

export const generateRandomString = (length) => {
    var array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}
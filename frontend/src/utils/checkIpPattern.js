let ipv4_pattern = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$/);
let ipv6_pattern = new RegExp(/^([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})\:([A-Fa-f0-9]{1,4})$/);
let domain_pattern = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);
let endpoint_pattern = new RegExp(/^(http|https):\/\/(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);

export const checkIpPattern = (input) => {
    if (ipv4_pattern.test(input) || ipv6_pattern.test(input) || domain_pattern.test(input) || input === "localhost") {
        return true;
    } else {
        return false;
    }
}

export const checkIPAddressPattern = (input) => {
    if (ipv4_pattern.test(input) || ipv6_pattern.test(input)) {
        return true;
    } else {
        return false;
    }
}

export const checkIpHostPattern = (input) => {
    if (input === "") return true;
    return checkIpPattern(input); 
}

export const checkEndpointPattern = (input) => {
    if (endpoint_pattern.test(input) || input === "localhost") {
        return true;
    } else {
        return false;
    }
}

export const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}
export function getDomain(url: string) {
    const newUrl = new URL(url);

    return newUrl.hostname;
}

export function getCleanDomain(url: string) {
    const newUrl = new URL(url);
    let domain = newUrl.hostname;

    if (domain.startsWith("www")) {
        domain = domain.replace("www.", "");
    }

    const domainParts = domain.split(".");
    let domainWithoutCom = domainParts.slice(0, -1);

    return domainWithoutCom.join(".");
}
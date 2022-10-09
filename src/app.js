/* eslint-disable */
const { pronouns, adjetives, nouns, tlds } = require("./variables");

function applyDomainHack(domain) {
  let counter = 0;
  let domainHacks = [];
  for (let i = 0; i < tlds.length; i++) {
    const tld = tlds[i];
    let j = domain.length - 1;

    for (let k = tld.length - 1; k >= 0; k--) {
      const tldCharacter = tld[k];
      if (domain[j] === tldCharacter) {
        counter++;
        j--;
      }
    }
    if (counter === tld.length) {
      const domainSliced = domain.slice(0, domain.length - tld.length);
      const domainHack = domainSliced + "." + tld;
      domainHacks.push(domainHack);
    } else {
      domainHacks.push(domain + "." + tld);
    }

    counter = 0;
  }

  return domainHacks;
}

function domainGenerator() {
  let domains = [];
  for (let i = 0; i < pronouns.length; i++) {
    const pronoun = pronouns[i];
    for (let j = 0; j < adjetives.length; j++) {
      const adjetive = adjetives[j];
      for (let k = 0; k < nouns.length; k++) {
        const noun = nouns[k];
        const domainWithoutTLD = pronoun + adjetive + noun;
        const domain = applyDomainHack(domainWithoutTLD);
        domains.push(domain);
      }
    }
  }

  return domains;
}

function printDomains(domainsInput, numberOfDomainsToPrint) {
  const length = numberOfDomainsToPrint
    ? numberOfDomainsToPrint
    : domainsInput.length;
  for (let i = 0; i < length; i++) {
    console.log(domainsInput[i]);
  }
}

printDomains(domainGenerator());

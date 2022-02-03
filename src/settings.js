export default {
  closedBeta: true,
  withMenu: false,
  withSidbar: false,
  options: {
    Swap: false,
    OTC: false
  },
  mock: {
    bank: {
      Contact: {
        Name: "Banque Cantonale de Neuchâtel",
        Address1: "Place Pury 4",
        Address2: "Case postale 1836",
        Address3: "2001 Neuchâtel"
      }
    },
    sepa: {
      IBANs: {
        CHF: {
          BIC: "BCNNCH22",
          IBAN: "CH15 0076 6000 1035 3829 0",
          Contact: {
            Name: "Condensat technologies",
            Address1: "rue des Beaux Arts, 8",
            Address2: "c/o LEAX avocats sàrl",
            Address3: "2000 Neuchâtel"
          }
        },
        EUR: {
          BIC: "BCNNCH22",
          IBAN: "CH15 0076 6000 1035 3829 0",
          Contact: {
            Name: "Condensat technologies",
            Address1: "rue des Beaux Arts, 8",
            Address2: "c/o LEAX avocats sàrl",
            Address3: "2000 Neuchâtel"
          }
        }
      }
    }
  }
};

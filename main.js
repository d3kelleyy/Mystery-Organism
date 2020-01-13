// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(orgOther) {
      const similar = this.dna.reduce((acc, cur, idx, src) => {
        if (src[idx] === orgOther.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const sharedPercentOfDNA = (similar / this.dna.length) * 100;
      const percentWith2Decimal = sharedPercentOfDNA.toFixed(2);
      console.log(
        `Specimen ${this.specimenNum} and specimen ${orgOther.specimenNum} have ${percentWith2Decimal} DNA in common`
      );
    },
    willLikelySurvive() {
      const baseCG = this.dna.filter(el => el === "C" || el === "G");
      return baseCG.length / this.dna.length >= 0.6;
    }
  };
};

const survivedSpecimens = [];
let specimenCounter = 1;

while (survivedSpecimens.length < 30) {
  let newOrganism = pAequorFactory(specimenCounter, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    survivedSpecimens.push(newOrganism);
  }
  specimenCounter++;
}

// Returns a list of 30 surviving specimens in which 60% or more of the DNA strand is made up of "C" base or "G" base.
console.log(survivedSpecimens);

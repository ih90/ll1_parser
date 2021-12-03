class Grammar {
  nonTerminals;
  terminals;
  startingSymbol;
  productions;

  constructor(fileContent) {
    this.nonTerminals = [];
    this.terminals = [];
    this.productions = new Map();
    this.initialization(fileContent);
  }

  // returns the production of a given non terminal
  getForGivenNonTerminal(nonTerminal) {
    if (this.nonTerminals.includes(nonTerminal)) {
      return this.productions.get(nonTerminal);
    }
    return [];
  }

  getNonTerminals() {
    return this.nonTerminals;
  }

  getTerminals() {
    return this.terminals;
  }

  getStartingSymbol() {
    return this.startingSymbol;
  }

  getProductions() {
    return this.productions;
  }

  // checks if the startingSymbol is in the productions map
  validateStartingSymbol() {
    if (!this.nonTerminals.includes(this.startingSymbol)) {
      throw new Error(
        `Invalid starting symbol. ${this.startingSymbol} was not found in the non terminals list`
      );
    }
  }

  // checks if the key of every production is a nonTerminal
  // A -> a , a = { V U e }* A belongs to V
  validateProduction() {
    for (let mapEntry in this.productions) {
      for (let nonTerminal in this.nonTerminals) {
        if (!this.productions.has(nonTerminal)) {
          throw new Error(
            `Invalid production. ${nonTerminal} is not a nonTerminal.`
          );
        }
      }
    }
  }

  // method that gets as input the lines from the fine and does the initialization of the fields
  initialization(lines) {
    this.nonTerminals = lines[0].split(" ");
    this.terminals = lines[1].split(" ");
    this.startingSymbol = lines[2];
    for (let i = 3; i < lines.length; i++) {
      const currentLine = lines[i];
      const values = currentLine.split("- ")[1];
      const finalValues = this.splitAndRemoveDelimiter(values);
      this.productions.set(currentLine[0], finalValues);
    }
  }

  // splits the right-hand side of a production by spaces and drops delimiters "|"
  splitAndRemoveDelimiter(values) {
    const splittedByDelimiter = values.split("|");
    return splittedByDelimiter.map((entry) => [entry.trim()]);
  }
}

export default Grammar;

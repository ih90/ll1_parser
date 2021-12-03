import prompt from "prompt";
import * as fs from "fs";
import Grammar from "./src/Grammar.js";

const menu =
  "0.Exit\n" +
  "1.Display nonTerminals\n" +
  "2.Display terminals\n" +
  "3.Display starting symbol\n" +
  "4.Display productions\n" +
  "5.Display for specific production\n" +
  "6.Check production\n" +
  "Input>>";
console.log(menu);
prompt.start();

const fileContent = fs.readFileSync("src/g1.in", "utf8").toString().split("\n");

const grammar = new Grammar(fileContent);

const display = () => {
  prompt.get(["option"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    console.log("input received:");
    const option = parseInt(result.option, 10);
    console.log("  Option: ", option);
    switch (option) {
      case 1:
        console.log("nonTerminals: ", grammar.nonTerminals);
        display();
        break;
      case 2:
        console.log("terminals: ", grammar.terminals);
        display();
        break;
      case 3:
        console.log("starting symbol: ", grammar.startingSymbol);
        display();
        break;
      case 4:
        console.log("productions: ", grammar.productions);
        display();
        break;
      case 5:
        prompt.get(["nonTerminal"], function (err, result) {
          if (err) {
            return onErr(err);
          }
          const nonTerminal = result.nonTerminal;
          console.log(grammar.getForGivenNonTerminal(nonTerminal));
          display();
        });

        break;
      case 6:
        grammar.validateProduction();
        console.log("is CFG");
        display();
        break;
      case 0:
        console.log("Done");
        break;
      default:
        break;
    }
  });
};

display();

function onErr(err) {
  console.log(err);
  return 1;
}

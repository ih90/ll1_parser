import prompt from "prompt";
import * as fs from "fs";
import Grammar from "./src/Grammar.js";
import ParserGenerator from "./src/ParserGenerator.js";
import SetsGenerator from "./src/SetsGenerator.js";

const menu =
  "0.Exit\n" +
  "9.Parse\n" +
  "1.Display nonTerminals\n" +
  "2.Display terminals\n" +
  "3.Display starting symbol\n" +
  "4.Display productions\n" +
  "5.Print Table\n" +
  "6.Prediction sets\n" +
  "7.First sets\n" +
  "8.Follow sets\n" +
  "Input>>";
console.log(menu);
prompt.start();

const fileContent = fs.readFileSync("src/g1.in", "utf8").toString().split("\n");

const parserGenerator = new ParserGenerator(fileContent);
const parser = parserGenerator.generate();

const display = () => {
  const grammar = new Grammar(fileContent);
  const setsGenerator = new SetsGenerator(grammar);
  prompt.get(["option"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    console.log("input received:");
    const option = parseInt(result.option, 10);
    console.log("  Option: ", option);
    switch (option) {
      case 1:
        console.log("nonTerminals: ", grammar.getNonTerminals());
        display();
        break;
      case 2:
        console.log("terminals: ", grammar.getTerminals());
        display();
        break;
      case 3:
        console.log("starting symbol: ", grammar._startSymbol);
        display();
        break;
      case 4:
        console.log("productions: ", grammar._grammar);
        display();
        break;
      case 5:
        console.log("Table: ", parserGenerator.printTable());
        display();
        break;
      case 6:
        console.log("Prediction sets: ", setsGenerator.getPredictSets());
        display();
        break;
      case 7:
        console.log("First sets: ", setsGenerator.getFirstSets());
        display();
        break;
      case 8:
        console.log("Follow sets: ", setsGenerator.getFollowSets());
        display();
        break;
      case 9:
        console.log("Parse: ");
        parser.parse(`abacca`);
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

import Pattern from "./Pattern";
import PatternBody from "./PatternBody";

export default interface PatternBuilder {
  start: Pattern;
  body: PatternBody[];
  end: Pattern;
  generatedPattern?:string;
  sampleText?:string;
}

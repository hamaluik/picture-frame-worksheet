import Fraction from "fraction.js";
import { parseVulgars } from "vulgar-fractions";

export default class Dimension {
    #input: string = "0";
    #isError: boolean = false;
    #value: Fraction = new Fraction(0);

    constructor(val: string | number | Fraction) {
        if(val === null || val === undefined) return;

        const set = (inp: string) => {
                this.#input = inp;
                try {
                    this.#value = new Fraction(inp.trim());
                    this.#isError = false;
                }
                catch {
                    this.#value = new Fraction(0);
                    this.#isError = true;
                }
        };

        switch(typeof val) {
            case "string": {
                set(val);
            };
            break;
            case "number": {
                set(val.toString());
            };
            break;
            case "object": {
                if(val instanceof Fraction) {
                    this.#value = val;
                    this.#isError = false;
                    this.#input = val.toFraction(true);
                }
                else {
                    console.error("Invalid type to set Dimension value with", val);
                }
            };
            break;
            default: {
                console.error("Invalid type to set Dimension value with", val);
            };
        };
    }

    get input(): string {
        return this.#input;
    }

    get isError(): boolean {
        return this.#isError;
    }

    get display(): string {
        if(this.#isError) {
            return this.#input;
        }
        else {
            return parseVulgars(this.#value.toFraction(true));
        }
    }

    get decimal(): number {
        if(this.#isError) return 0.0;
        return this.#value.valueOf();
    }

    public add(other: Dimension): Dimension {
        const newDim =  new Dimension(this.#value.add(other.#value));
        newDim.#isError = this.isError || other.isError;
        return newDim;
    }

    public sub(other: Dimension): Dimension {
        const newDim = new Dimension(this.#value.sub(other.#value));
        newDim.#isError = this.isError || other.isError;
        return newDim;
    }

    public mul(multiplier: number): Dimension {
        const newDim = new Dimension(this.#value.mul(multiplier));
        newDim.#isError = this.isError;
        return newDim;
    }
};


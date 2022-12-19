import { Injectable } from "@nestjs/common";

@Injectable()
export class RandomGenerator {

    public generateRandomChars(length: number): string {
        if (length <= 0) {
            throw new Error('length is invalid');
        }
        return this.generate(length);
    }

    private generate(length: number): string {
        const chars = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "A",
            "b",
            "B",
            "c",
            "C",
            "d",
            "D",
            "e",
            "E",
            "f",
            "F",
            "g",
            "G",
            "h",
            "H",
            "i",
            "I",
            "j",
            "J",
            "l",
            "L",
            "m",
            "M",
            "n",
            "N",
            "o",
            "O",
            "p",
            "P",
            "q",
            "Q",
            "r",
            "R",
            "s",
            "S",
            "t",
            "T",
            "u",
            "U",
            "v",
            "V",
            "w",
            "W",
            "x",
            "X",
            "y",
            "Y",
            "z",
            "Z",
        ];

        let text = ''
        for (let i = 0; i < length; i++) {
            text += chars[Math.floor(Math.random() * chars.length)];
        }

        return text
    }

}
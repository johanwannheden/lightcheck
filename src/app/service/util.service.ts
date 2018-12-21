export class Util {
    private constructor() {
    }

    public static rotate(data: number[], index: number): number[] {
        const left = data.slice(index, data.length);
        const right = data.slice(0, index);

        return [...left, ...right];
    }
}

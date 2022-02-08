import {shallowEqual} from "shallow-equal-object";
import {Stringified} from "../types/Stringified";

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class AbstractVO<T extends ValueObjectProps> {
    public readonly props: T;

    constructor(props: T) {
        this.props = Object.freeze(props);
    }

    public equals(vo?: AbstractVO<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return shallowEqual(this.props, vo.props)
    }

    public stringify(): Stringified {
        return JSON.stringify(this.props);
    }
}
import {AbstractVO} from './AbstractVO';
import {Stringified} from "../types/Stringified";

interface WeightProps {
    readonly value: number;
}

export class WeightVO extends AbstractVO<WeightProps> {
    get value(): number {
        return this.props.value;
    }

    private constructor(props: WeightProps) {
        super(props);
    }

    public add(weightVO: WeightVO): WeightVO {
        return WeightVO.create(this.value + weightVO.value);
    }

    public static create(value: number): WeightVO {
        if (value >= 0) {
            return new WeightVO({value})
        } else {
            throw new Error('Weight value can not be lower than zero')
        }
    }

    public stringify(): Stringified {
        return this.value;
    }
}
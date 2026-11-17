import {
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OptionalStringPipe implements PipeTransform {
    transform(value: unknown): string | undefined {
        if (typeof value === 'string' || value === undefined) {
            return value;
        }

        throw new BadRequestException(
            'Query parameter must be a single string'
        );
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe
(
    {
        name: 'numberPipe',
        standalone: true
    }
)
export class NumberPipe implements PipeTransform
{

    transform(value: number | string | undefined | null): string
    {
        if (value === null || value === undefined || value === '') return '0';
    
        const num = typeof value === 'string' ? parseFloat(value) : value;

        if (isNaN(num)) return '0';

        return num.toLocaleString('id-ID');
    }

}

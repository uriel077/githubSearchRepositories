import { Pipe, PipeTransform } from '@angular/core'; 
 
import * as consts from 'src/shared/config/consts'; 
 
/** 
 * Custom truncate pipe. 
 */ 
@Pipe({ name: 'truncate' }) 
export class TruncatePipe implements PipeTransform 
{ 
    /** 
     * Pipe for truncate string based on our helper methods. 
     * @param value The value being transformed. 
     * @param args Optional param for the max length (default is local). 
     */ 
    public transform(value: string, args?: any[]): string 
    { 
        if (!args) 
        { 
            args = []; 
        } 
 
        const limit = args.length > 0 ? parseInt(args[0], 10) : consts.THIRTY; 
        const trail = args.length > 1 ? args[1] : '...'; 
 
        return (value.length > limit ? value.substring(0, limit) + trail : value); 
    } 
}
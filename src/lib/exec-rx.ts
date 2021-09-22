import { exec, ExecOptions } from "child_process";
import { BaseEncodingOptions } from 'fs';
import { Observable } from "rxjs";

export function execRx(cmd: string, options?: BaseEncodingOptions & ExecOptions, emitStdErr=true): Observable<any> {
    return new Observable((observer) => {
        exec(cmd, options, (err, stdout, stderr) => {
            if (err) {
                observer.error(err);
            } else {
                observer.next(`${stdout}${emitStdErr && ` ${stderr}`}`);
                observer.complete();
            }
        });
    });
}
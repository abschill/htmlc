const { exec } = require('child_process');
const { log, warn, error } = console;
const process = exec('python refresh-build.py');

process.stdout.on('data', log);
process.stderr.on('data', error);
process.on('close', (code) => {
    if( code === 0 ) {
        log('Exited with code 0');
    }
    else {
        warn('Exited with code ' + code);
    }
});

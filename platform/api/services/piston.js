const request = require('request-promise');

module.exports = {

    languages: {
        python: 'python',
        javascript: 'javascript',
        ruby: 'ruby',
        go: 'go',
        c: 'c',
        cpp: 'cpp',
        csharp: 'csharp',
        php: 'php',
        swift: 'swift',
        java: 'java'
    },

    async execute(language, source, args) {
        if (!Array.is_array(args)) args = [args];
        args = args.map(arg => '' + arg);
        const timeout = ms => new Promise(res => set_timeout(res, ms));
        try {
            await timeout(constant.is_prod() ? 0 : 1500);  // Delay by 1.5 seconds when using the public api
            let result = await request
                ({
                    method: 'post',
                    url: constant.is_prod()
                        ? 'http://' + sails.config.piston.host + '/execute'
                        : 'https://emkc.org/api/v1/piston/execute',
                    body: {
                        language,
                        source,
                        args
                    },
                    json: true,
                    simple: true
                });

            return typeof result.output === 'string'
                ? result.output.slice(0, 1024)
                : '';
        } catch(e) {
            return '';
        }
    }

};

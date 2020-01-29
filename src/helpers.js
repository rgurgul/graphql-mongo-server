module.exports = {
    get args() {
        const args = process.argv.filter((item) => item.startsWith('-'));
        const argsToObj = args.reduce((acc, arg) => {
            const item = arg.split('=');
            return { ...acc, [item[0].substr(1)]: item[1] }
        }, {})
        return argsToObj;
    }
};

export const replaceAll = (input: string, search: string, replacement: string): string => {
    return input.split(search).join(replacement);
}

export const detectType = (rawValue: string) => {
    const value = rawValue.toLowerCase().trim()
    const booleans = ['true', 'false'];
    let isBoolean = false;
    booleans.forEach((bool: string) => {
        console.log(bool);
        if(bool === value.toLowerCase().trim()){
            isBoolean = true;
        }
    });
    try {
        // check if value just consists of those
        const numberValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
        let testValue = value;
        numberValues.forEach(num => {
            testValue = replaceAll(testValue, num, '');
        });
        const isNumber = testValue.trim() === '';
        if(isNumber){
            return 'number';
        }
    } catch(e: any) {
    }
    if(isBoolean){
        return 'boolean';
    } else {
        return 'string'
    }
    // TODO: Array, urls, number, object
}
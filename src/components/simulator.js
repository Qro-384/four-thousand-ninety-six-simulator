export function simulate4096() {
    let result = 0;
    let isCompleted = false;
    const target = 4096;
    while (!isCompleted) {
        const tryValue = Math.floor(Math.random() * target);
        if (tryValue === 0) {
            isCompleted = true;
        }
        result = result + 1;
    }
    return { result, timestamp: new Date().toLocaleString() };
}
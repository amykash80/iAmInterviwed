class RandomUtils {
    public generateUUID(): string {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] + '';
    }
}
const randomUtils = new RandomUtils();
export default randomUtils;
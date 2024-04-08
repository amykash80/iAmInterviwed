class FileUtils {
    public downloadFile(fileContent: any, fileName: string) {
        var binaryData = [];
        binaryData.push(fileContent);
        const url = window.URL.createObjectURL(new Blob([fileContent]));
        const a = document.createElement("a");
        a.style.visibility = "hidden";
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
const fileUtils = new FileUtils();
export default fileUtils;
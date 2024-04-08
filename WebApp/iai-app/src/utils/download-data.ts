class DownloadDataUtils {
    savetoPC = async (content: string, filename: string) => {
        if (!content) {
            return;
        }
        if (!filename) {
            filename = "export.json";
        }
        if (typeof content === "object") {
            content = JSON.stringify(content, undefined, 2);
        }
        var blob = new Blob([content], { type: "text/json" });
        // FOR IE:
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveOrOpenBlob(blob, filename);
        // } else {
        var e = document.createEvent("MouseEvents"),
            a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        e.initEvent("click", true, false);
        /*  e.initEvent('click', true, false, window,      
                    0, 0, 0, 0, 0, false, false, false, false, 0, null); */
        a.dispatchEvent(e);
        //}
    };
}
const downloadDataUtils = new DownloadDataUtils();
export default downloadDataUtils;
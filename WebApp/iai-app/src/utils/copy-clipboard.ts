import toasterUtils from "../utils/toaster-utils";

class CopyClickboardUtils {
    copy = async (message: string) => {
        var textField = document.createElement('textarea')
        textField.innerText = message
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove();
        toasterUtils.showSuccess("Message Copied.");
    }
}
const copyClickboardUtils = new CopyClickboardUtils();
export default copyClickboardUtils;
// Refresh projects after each site load / new project submission.

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export default clearElement
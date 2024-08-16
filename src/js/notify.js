function notify(type, message) {
    const area = document.getElementById("notification-area");
    const notification = createNotificationElement(type, message);
    area.appendChild(notification);


    setTimeout(() => {
        notification.remove();
        if (area.children.length === 0) {
            area.style.display = "none";
        }
    }, 5000);

    area.style.display = "block";
}

function createNotificationElement(type, message) {
    const notificationId = generateUniqueId();
    const notification = document.createElement("div");
    notification.setAttribute("id", notificationId);
    notification.classList.add("notification", type);

    const typeText = type === "success" ? "Success" : "Error";
    notification.innerHTML = `<div><b>${typeText}</b></div>${message}`;

    const color = createColorElement(type);
    const icon = createIconElement(type);

    notification.appendChild(color);
    notification.appendChild(icon);

    return notification;
}

function createColorElement(type) {
    const colorId = generateUniqueId();
    const color = document.createElement("div");
    color.setAttribute("id", colorId);
    color.classList.add("notification-color", type);
    return color;
}

function createIconElement(type) {
    const iconId = generateUniqueId();
    const icon = document.createElement("a");
    icon.setAttribute("id", iconId);
    icon.classList.add("notification-icon", type);

    const iconClass =
        type === "success"
            ? "fa fa-2x fa-check-circle"
            : "fa fa-2x fa-exclamation-circle";
    icon.innerHTML = `<i class="${iconClass}"></i>`;

    return icon;
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 10);
}

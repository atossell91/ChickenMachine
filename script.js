//const defaultLineSpeed = 91; // moved

//modes were here

//helper funcs were here

var currentMode = undefined;

function buildMode(modeName) {

    const inputObjects = modes[modeName]["inputs"];
    inputObjects.forEach((inputObj) => {
        const elem = createEntryItem(inputObj["label"],
            createInputBox(inputObj["id"], inputObj["type"]), inputObj["default"]
        );

        modeInputRoot.appendChild(elem);
    });

    const fieldObjects = modes[modeName]["fields"];
    fieldObjects.forEach((obj) => {
        const elem = createNoteArea(obj["label"], obj["id"],
            obj["textFunction"]());

        nodeRoot.appendChild(elem);
    });
}

function murderChildren(node) {
    while (node.childElementCount > 0) {
        const child = node.children[0];
        node.removeChild(child);
    }
}

function updateMode(newMode) {
    murderChildren(nodeRoot);
    murderChildren(modeInputRoot);
    buildMode(newMode);
    currentMode = newMode;
}

function updateText() {
    const objs = modes[currentMode]["fields"];

    objs.forEach((obj) => {
        //console.log("ID is " + obj["id"]);
        const elem = document.getElementById(obj["id"]);
        // .value used to be .innerText
        elem.value = obj["textFunction"]();
    });

    //console.log("Text has been updated!");
}

const defaultBackground = "#FFFFFF";
const selectedBackground = "#BEFFBE";
const colourTimeout = 500;

var nodeRoot = null;
var inputRoot = null;
var modeInputRoot = null;

//  ****  For creating the input area  ****
function createInputBox(id, typeStr, changeFunc) {
    const box = document.createElement("input");
    box.setAttribute("class", "input-box");
    box.setAttribute("type", typeStr);
    box.setAttribute("id", id);

    if (changeFunc !== undefined && changeFunc !== "") {
        box.setAttribute("onchange", changeFunc);
    }

    return box;
}

function createDropdownMenu(id, options) {
    const box = document.createElement("select");
    box.setAttribute("id", id);

    options.forEach((option) => {
        const optionBox = document.createElement("option");
        optionBox.setAttribute("value", option["value"]);
        optionBox.innerText = option["name"];
        box.appendChild(optionBox);
    });

    return box;
}

function createEntryItem(label, entryElement, defaultVal) {
    const root = document.createElement("div");
    root.setAttribute("class", "input-item");

    const lbl = document.createElement("p");
    lbl.innerText = label;

    if (defaultVal !== undefined) {
        entryElement.value = defaultVal;
        entryElement.setAttribute("class", "input-field");
    }

    root.appendChild(lbl);
    root.appendChild(entryElement);

    return root;
}

function buildEntryFields() {
    if (inputRoot === null) return;

    const children = [
        createEntryItem("Time", createInputBox("time", "time")),
        createEntryItem("Producer", createInputBox("producer", "text")),
        createEntryItem("Species", createDropdownMenu("species", [
            {
                "name": "Broiler Chickens",
                "value": "Broiler Chickens"
            },
            {
                "name": "Roaster Chickens",
                "value": "Roaster Chickens"
            },
            {
                "name": "Ducks",
                "value": "Ducks"
            },
            {
                "name": "Silkie Chickens",
                "value": "Silkie Chickens"
            },
            {
                "name": "Heavy Fowl",
                "value": "Heavy Fowl"
            },
            {
                "name": "Taiwanese Chickens",
                "value": "Taiwanese Chickens"
            },
            {
                "name": "Cornish Chickens",
                "value": "Cornish Chickens"
            }
        ])),
        createEntryItem("Inspector", createInputBox("inspector", "text")),
    ];

    children.forEach((child) => {
        inputRoot.appendChild(child);
    });

    document.getElementById("time").value = "05:45";
}

function createPageButton(name) {
    const button = document.createElement("button");
    button.setAttribute("class", "c-nav-button")
    button.innerText = name;

    const attrText = "updateMode('" + name + "')";
    button.setAttribute("onclick", attrText);
    return button;
}

function addButtons() {
    var btns = document.getElementById("buttons");

    for (let modeName in modes) {
        console.log(modeName);

        const button = createPageButton(modeName);

        btns.appendChild(button);
    }
}

//  ****  For building the field areas  ****
function createNoteArea(name, textId, text) {
    const elemRoot = document.createElement("div");
    elemRoot.setAttribute("class", "note-area");

    const elemTitle = document.createElement("p");
    elemTitle.setAttribute("class", "note-area-title");
    elemTitle.innerText = name;

    const elem = document.createElement("textarea");
    elem.setAttribute("class", "text");
    elem.setAttribute("onclick","setClipboard(this)");
    elem.setAttribute("id", textId);
    // Was innerText - change it back if it acts weird
    elem.value = text;

    elemRoot.appendChild(elemTitle);
    elemRoot.appendChild(elem);

    return elemRoot;
}

//  ****  Event listeners  ****
addEventListener("DOMContentLoaded", () => {
    nodeRoot = document.getElementById("notes");
    inputRoot = document.getElementById("inputItems");
    modeInputRoot = document.getElementById("mode-input-items");

    addButtons();

    buildEntryFields();
    updateMode("home");
});

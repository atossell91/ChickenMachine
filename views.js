const defaultLineSpeed = 91;

const modes = {
    "home": {
        "inputs": [
            {
                "label": "Date",
                "id": "date",
                "type": "date",
                "default": getTodaysDate()
            },
        ],
        "fields": [
            {
                "id": "weekNo",
                "label": "Current Week Number",
                "textFunction": () => {
                    return getWeekNum();
                }
            },
            {
                "id": "cfiaOfficeAddr",
                "label": "CFIA Office Address",
                "textFunction": () => {
                    return "2447 Townline Road, Abbotsford, V2T 6L6";
                }
            },
            {
                "id": "plantAddr",
                "label": "K&R's Address",
                "textFunction": () => {
                    return "31171 Peardonville Road, Abbotsford, V2T 6K6";
                }
            },
            {
                "id": "plantPhone",
                "label": "K&R's Phone Number",
                "textFunction": () => {
                    return "604-850-5808";
                }
            },
            {
                "id": "cvsEmail",
                "label": "CVS Worksheet e-mail address",
                "textFunction": () => { return "cfia.cvs-svc.acia@inspection.gc.ca"; }
            },
            //cfia.cvs-svc.acia@inspection.gc.ca545
            {
                "id": "cvsEmailText",
                "label": "CVS Email Text",
                "textFunction": () => {
                    return "" +
                    "Hello,\n\n" +
                    "Please see the attached CVS data for fiscal week " +
                    getWeekNum() + ".";
                }
            }
        ]
    },
    "bleeding": {
        "inputs": [],
        "fields": [
            {
                "id": "documents",
                "label": "Document & Record Review",
                "textFunction": () => {
                    const insp = document.getElementById("inspector").value;
                    return getDate() + " at " + getTime() + ": " +
                    "Reviewed the Record #24 (Daily Log-Op Live-end) for the DOA numbers for " +
                    getProducerName() + "'s " + getSpeciesName() + "." +
                    getInspectorName();
                }
            },
            {
                "id": "interviews",
                "label": "Interviews",
                "textFunction": () => {
                    return getDate() + " at " + getTime(5) + ": " +
                    " Interviewed live end supervisor, Mann." +
                    getInspectorName();
                }
            },
            {
                "id": "observations",
                "label": "Observations",
                "textFunction": () => {
                    return getDate() + " at " + getTime(7) + ": " +
                    "Completed Stunning & Bleeding Inspection of "+
                    getProducerName() + "'s " + getSpeciesName() +
                    " at the Live-end. The Stickers were observed. No no compliances were observed." +
                    getInspectorName();
                }
            }
        ]
    },
    "antemortem": {
        "inputs": [
            {
                "label": "Start Date",
                "id": "startDate",
                "type": "date",
                "default": getTodaysDate()
            },
            {
                "label": "Start Time",
                "id": "startTime",
                "type": "time",
                "default": "06:00"
            },
            {
                "label": "Bird Count",
                "id": "birdCount",
                "type": "number",
                "default": 6480
            },
            {
                "label": "Line Speed",
                "id": "lineSpeed",
                "type": "number",
                "default": defaultLineSpeed
            },
            {
                "label": "Last Food Date",
                "id": "lastFoodDate",
                "type": "date",
                "default": getYesterdaysDate()
            },
            {
                "label": "Last Food Time",
                "id": "lastFoodTime",
                "type": "time",
                "default": "20:00:00"
            },
            {
                "label": "Last Water Date",
                "id": "lastWaterDate",
                "type": "date",
                "default": getYesterdaysDate()
            },
            {
                "label": "Last Water Time",
                "id": "lastWaterTime",
                "type": "time",
                "default": "21:30:00"
            },
        ],
        "fields": [
            {
                "id": "documents",
                "label": "Document & Record Review",
                "textFunction": () => {
                    return "Record #51 (Live End Receiving-Flock sheet) for " +
                    getProducerName() + "'s " + getSpeciesName() +
                    ", dated " + getDate() + "." + getInspectorName();
                }
            },
            {
                "id": "interviews",
                "label": "Interviews",
                "textFunction": () => {
                    return getDate() + " at " + getTime() + ": " +
                    "Interviewed live end supervisor, Mann." +
                    getInspectorName();
                }
            },
            {
                "id": "observations",
                "label": "Observations",
                "textFunction": () => {
                    return getDate() + " at " + getTime(2) + ": " +
                    "Completed ante-mortem inspection on " +
                    getProducerName() + "'s " + getSpeciesName() +
                    ". Observed humane handling of birds by Live End " +
                    "employees, from unloading crates from trucks up to " +
                    "hanging of birds to shackles. No non-compliances were observed." +
                    getInspectorName();
                }
            },
            {
                "id": "killTime",
                "label": "Kill End Time",
                "textFunction": () => {
                    return getKillTime();
                }
            },
            {
                "id": "lastFoodPeriod",
                "label": "Time since last food",
                "textFunction": () => { return getTimeSinceFood(); }
            },
            {
                "id": "lastWaterPeriod",
                "label": "Time since last water",
                "textFunction": () => { return getTimeSinceWater(); }
            },
            {
                "id": "1102",
                "label": "1102 Declaration",
                "textFunction": () => {
                    return "Inspector did not observe birds being loaded " +
                    "in the farm or during transportation. Observed " +
                    "humane handling at live end up to hanging of birds. " +
                    "Reviewed the following documents: " +
                    "Live Haul Transportation Report and Final Flock " +
                    "Sheet for " + getProducerName() + "'s " +
                    getSpeciesName() + " dated " + getDate() + ".";
                }
            },
            {
                "id": "1102Email",
                "label": "1102 Form e-mail address",
                "textFunction": () => { return "CVSHTID@inspection.gc.ca"; }
            },
            {
                "id": "1102EmailText",
                "label": "1102 Email Text",
                "textFunction": () => { 
                    return "Hello" + "\n" +
                    "Please see the attached 1102 for " +
                    getProducerName() +"’s " +
                    getSpeciesName() + ", " +
                    "being processed at K&R poultry on " +
                    getDate() + ".";
                    }
            }
        ]
}
}

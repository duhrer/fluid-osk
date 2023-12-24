(function (fluid) {
    "use strict";
    fluid.defaults("osk.ui.toggle", {
        gradeNames: ["osk.templateRenderer"],
        model: {
            checked: true
        },
        markup: {
            container: "<div>Arrow Navigation Only <input type='checkbox' class='osk-toggle'/></div>"
        },
        selectors: {
            toggle: ".osk-toggle"
        },
        modelRelay: [
            {
                source: "{that}.model.dom.toggle.click",
                target: "{that}.model.checked",
                singleTransform: "fluid.transforms.toggle"
            }
        ]
    });
})(fluid);

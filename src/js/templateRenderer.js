(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.templateRenderer", {
        gradeNames: ["fluid.containerRenderingView"],
        markup: {
            container: ""
        },
        model: {},
        invokers: {
            renderMarkup: {
                funcName: "osk.templateRenderer.render",
                args: ["{that}", "{that}.options.markup.container", "{that}.model"]
            }
        }
    });

    osk.templateRenderer.render = function (that, markupTemplate, model) {
        var renderedContent = fluid.stringTemplate(markupTemplate, model);
        return renderedContent;
    };
})(fluid);

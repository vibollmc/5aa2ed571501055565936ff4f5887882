var ModalDirective;
(function (ModalDirective) {
    'use strict';
    (function (ModalRowStyle) {
        ModalRowStyle[ModalRowStyle["LabelText"] = 0] = "LabelText";
        ModalRowStyle[ModalRowStyle["Template"] = 1] = "Template";
    })(ModalDirective.ModalRowStyle || (ModalDirective.ModalRowStyle = {}));
    var ModalRowStyle = ModalDirective.ModalRowStyle;
    var ModalRow = (function () {
        function ModalRow(label, fieldName, objectValue, inputValidation) {
            this.rowType = ModalRowStyle.LabelText;
            this.label = label;
            this.fieldName = fieldName;
            this.objectValue = objectValue;
            this.inputValidation = inputValidation;
        }
        return ModalRow;
    }());
    ModalDirective.ModalRow = ModalRow;
    var ModalRowTemplate = (function () {
        function ModalRowTemplate(content) {
            this.content = content;
            this.rowType = ModalRowStyle.Template;
        }
        return ModalRowTemplate;
    }());
    ModalDirective.ModalRowTemplate = ModalRowTemplate;
    var ModalStyle = (function () {
        function ModalStyle(modalSize, modalLeftStyle, modalRightStyle, confirmButtonStyle, cancelButtonStyle) {
            if (modalSize === void 0) { modalSize = ''; }
            if (modalLeftStyle === void 0) { modalLeftStyle = 'col-lg-4'; }
            if (modalRightStyle === void 0) { modalRightStyle = 'col-lg-8'; }
            if (confirmButtonStyle === void 0) { confirmButtonStyle = 'btn-success'; }
            if (cancelButtonStyle === void 0) { cancelButtonStyle = 'btn-default'; }
            this.modalSize = modalSize;
            this.modalLeftStyle = modalLeftStyle;
            this.modalRightStyle = modalRightStyle;
            this.confirmButtonStyle = confirmButtonStyle;
            this.cancelButtonStyle = cancelButtonStyle;
        }
        return ModalStyle;
    }());
    ModalDirective.ModalStyle = ModalStyle;
    var InputValidation = (function () {
        function InputValidation(inputType, isRequired, validatePattern) {
            if (inputType === void 0) { inputType = 'text'; }
            if (isRequired === void 0) { isRequired = false; }
            if (validatePattern === void 0) { validatePattern = ''; }
            this.isRequired = isRequired;
            this.validatePattern = validatePattern;
            this.inputType = inputType;
        }
        return InputValidation;
    }());
    ModalDirective.InputValidation = InputValidation;
})(ModalDirective || (ModalDirective = {}));

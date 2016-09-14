
module ModalDirective {
    'use strict';

    enum ModalRowStyle {
        LabelText = 0,
        Template = 1
    }

    export class ModalRow {
        label: string;
        fieldName: string;
        rowType: ModalRowStyle;
        inputValidation: InputValidation;
        objectValue: any;

        constructor(label, fieldName, objectValue, inputValidation) {
            this.rowType = ModalRowStyle.LabelText;
            this.label = label;
            this.fieldName = fieldName;
            this.objectValue = objectValue;
            this.inputValidation = inputValidation;
        }
    }

    export class ModalRowTemplate {
        content: string;
        rowType: ModalRowStyle;

        constructor(content) {
            this.content = content;
            this.rowType = ModalRowStyle.Template;
        }
    }

    export class ModalStyle {
        modalSize: string;
        modalLeftStyle: string;
        modalRightStyle: string;
        confirmButtonStyle: string;
        cancelButtonStyle: string;

        constructor(modalSize = 'modal-lg', modalLeftStyle = 'col-lg-4', modalRightStyle = 'col-lg-8', confirmButtonStyle = 'btn-success', cancelButtonStyle = 'btn-default') {
            this.modalSize = modalSize;
            this.modalLeftStyle = modalLeftStyle;
            this.modalRightStyle = modalRightStyle;
            this.confirmButtonStyle = confirmButtonStyle;
            this.cancelButtonStyle = cancelButtonStyle;
        }
    }

    export class InputValidation {
        isRequired: boolean;
        inputType: string;
        validatePattern: string;

        constructor(inputType = 'text', isRequired = false, validatePattern = '') {
            this.isRequired = isRequired;
            this.validatePattern = validatePattern;
            this.inputType = inputType;
        }
    }
}
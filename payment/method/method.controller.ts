
module PaymentMethod {
    'use strict';

    declare var toastr: any;
    declare var angular: any;
    declare var braintree: any;
    //PaymentMethod.Module.Directives.directive("modal", ModalDirective.ModalPopup);

    enum PaymentMethodStatus {
        Undefined = 0,
        Valid = 1,
        SoftLocked = 2,
        HardLocked = 3
    }

    enum ApprovedStatus {
        InProcess = 1,
        Approved = 2,
        Rejected = 3,
    }

    enum PaymentMethodType {
        POSTPAID = 10,
        CREDIT_CARD = 20,
        PAYPAL = 30
    }

    export class MethodController {
        $rootScope: any;
        $scope: any;
        $state: any;
        postpaidModal: any;
        postpaidModel: PostpaidAccountModel;
        braintreeSetup: any;
        methodModel: IMethodModel;
        deletingMethod: any;

        static $inject = ["$rootScope", "$scope", "$state", "MethodModel"];

        constructor($rootScope: any, $scope: any, $state: any, model: IMethodModel) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.methodModel = model;

            this.getNetworkDefaultGatewayId();
            this.getPaymentMethods();
            this.initModal();
            this.test();
        }

        public initModal() {
            this.postpaidModal =
            [
                //new ModalDirective.ModalRow("Role", "Role", [{ text: 'Administrator', value: 'Administrator' }, { text: 'Normal', value: 'Normal' }], new ModalDirective.InputValidation('select', true)),
                new ModalDirective.ModalRow("Company Name", "Name", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Contact Email", "EmailAddress", "", new ModalDirective.InputValidation('email', true)),
                new ModalDirective.ModalRow("Contact Name", "ContactName", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Contact Number", "ContactNumber", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Address Line 1", "Address1", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Address Line 2", "Address2", "", new ModalDirective.InputValidation('text', false)),
                new ModalDirective.ModalRow("City", "City", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Country", "Country", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Postal Code", "PostalCode", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Invoice Attention To", "InvoiceAttentionTo", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Company Registration Number (not required for individuals)", "CompanyAcraRegNumber", "", new ModalDirective.InputValidation('text', false)),
                new ModalDirective.ModalRow("Estimated Number of Deliveries / Month (optional)", "NumberDeliveries", "", new ModalDirective.InputValidation('text', false)),
                new ModalDirective.ModalRow("Additional Comments (optional)", "Reason", "", new ModalDirective.InputValidation('text', false))
            ];
            //this.postpaidModel = new PostpaidAccountModel();
        }

        public test() {
            
        }

        public submitPopup() {
            this.methodModel.savePostPaidAccount(this.postpaidModel).then((data) => {
                if (data.Data) {
                    toastr.success(data.Message, "Success");
                    this.getPaymentMethods();
                } else {
                    toastr.error(data.Message, "Error");
                }
            });
        }

        public hasDefaultGateway() {
            return this.methodModel.networkDefaultGatewayId !== null;
        }

        public getPaymentMethods() {
            this.methodModel.getPaymentMethods()
                .then((data) => {
                });
        }

        public deleteDirectMethod() {
            this.methodModel.deleteDirectAccount(this.deletingMethod.Id)
                .then((data) => {
                    if (data.Data) {
                        this.getPaymentMethods();
                        angular.element("#modal-delete-method").modal('hide');
                        toastr.success(data.Message, "Success");
                    } else {
                        angular.element("#modal-delete-method").modal('hide');
                        toastr.error(data.Message, "Error");
                    }
                });
        }

        public deletePostpaidMethod() {
            this.methodModel.deletePostpaidAccount(this.deletingMethod.Id)
                .then((data) => {
                    if (data.Data) {
                        this.getPaymentMethods();
                        angular.element("#modal-delete-method").modal('hide');
                        toastr.success(data.Message, "Success");
                    } else {
                        angular.element("#modal-delete-method").modal('hide');
                        toastr.error(data.Message, "Error");
                    }
                });
        }

        public onDeletingMethod(method: string) {
            this.deletingMethod = method;
        }

        public addCompanyAccountMethod() {
            this.postpaidModel = new PostpaidAccountModel();
        }

        public editMethod(paymentMethod: PostpaidAccountModel) {
            this.methodModel.getPostpaidMethod(paymentMethod.Id)
                .then((data) => {
                    this.postpaidModel = new PostpaidAccountModel(data.Company);
                });
            
        }

        public getDirectMethodStatus(status: number, paymentMethodType: number) {
            var result = 'Unknown';
            if (status === PaymentMethodStatus.Valid) {
                result = "Valid";
            } else if (status === PaymentMethodStatus.SoftLocked) {
                result = "Attention Needed";
            } else if (status === PaymentMethodStatus.HardLocked) {
                result = "Invalid";
            }

            return result;
        }

        public getPostpaidMethodStatus(status: ApprovedStatus) {
            var result = 'Unknown';
            if (status === ApprovedStatus.InProcess) {
                result = "We are processing your request";
            } else if (status === ApprovedStatus.Approved) {
                result = "Valid";
            } else if (status === ApprovedStatus.Rejected) {
                result = "Rejected";
            }

            return result;
        }

        public getDirectMethodClass(status: number) {
            var statusClass = "label";
            if (status === PaymentMethodStatus.Valid) {
                statusClass += " label-success";
            } else if (status === PaymentMethodStatus.SoftLocked) {
                statusClass += " label-warning";
            } else if (status === PaymentMethodStatus.HardLocked) {
                statusClass += " label-danger";
            }

            return statusClass;
        }

        public getPostpaidMethodClass(status: number) {
            var statusClass = "label";
            if (status === ApprovedStatus.Approved) {
                statusClass += " label-success";
            } else if (status === ApprovedStatus.InProcess) {
                statusClass += " label-warning";
            } else if (status === ApprovedStatus.Rejected) {
                statusClass += " label-danger";
            }

            return statusClass;
        }

        public getNetworkDefaultGatewayId() {
            this.methodModel.getNetworkDefaultGatewayId();
        }

        public addDirectMethod(gatewayId: string) {
            var _that = this;
            if (this.braintreeSetup != null) {
                this.braintreeSetup.teardown(() => {
                    this.braintreeSetup = null;                    
                    // braintree.setup can safely be run again!
                });
            }
            this.methodModel.getClientToken(gatewayId)
                .then((data) => {
                    braintree.setup(data.Data, "dropin", {
                        container: "form-add-direct-method",
                        onReady(integration) {
                            _that.braintreeSetup = integration;
                        },
                        onPaymentMethodReceived(braintreeResponse: any) {
                            _that.addCredit(gatewayId, braintreeResponse.nonce);
                            angular.element("#modal-add-direct-method").modal('hide');
                        }
                    });
                });
        }

        public addCredit(gatewayId: string, nonce: string) {
            this.methodModel.addDirectMethod(gatewayId, nonce)
                .then((data) => {
                    if (data.Data) {
                        this.getPaymentMethods();
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                });
        }

        public showPostPaid(methodType: PaymentMethodType): boolean {
            return methodType === PaymentMethodType.POSTPAID;
        }
    }
    
}
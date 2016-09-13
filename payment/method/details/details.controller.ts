/// <reference path="../../../../../rocketuncle.frontend.main/app/shared/filters/jsondate.filter.ts" />
/// <reference path="../../../../../rocketuncle.frontend.main/app/shared/directives/modal/modal.model.ts" />
/// <reference path="details.model.ts" />


module PaymentMethod {
    'use strict';

    declare var toastr: any;
    declare var angular: any;
    declare var braintree: any;
    declare var moment: any;
    //export class jsonDate {
    //    public static Factory($filter: any) {
    //        return function (input, format): string {
    //            return $filter("date")(parseInt(input ? input.substr(6) : ''), format);
    //        }
    //    }
    //}

    enum CompanyRole {
        Administrator,
        Normal
    }

    enum ApproveStatus {
        InProcess = 1,
        Approved = 2,
        Rejected = 3
    }

    enum CompletionProcessType {
        PhotoId,
        CourierSignatureForCOD,
        Signature,
        SignatureWithPhoto,
        DeliveryOrder
    }

    //PaymentMethod.Module.Filters.filter("jsonDate", ['$filter', Main.jsonDate.Factory]);

    export class PaymentMethodDetailController {
        $rootScope: any;
        $scope: any;
        $state: any;
        $stateParams: any;
        $filter: any;
        braintreeSetup: any;
        methodModel: any;
        companyMembers: any;
        invitationMembers: any;
        deletingMember: any;
        invitationModal: any;
        invitationModel: any;
        invitationModalStyle: ModalDirective.ModalStyle;
        accountInfo: PostpaidAccountModel;
        postpaidModal: any;
        postpaidModel: any;
        role: CompanyRole;
        detailModel: IPaymentMethodDetailModel;
        completeTaskToEdit: any;
        paymentRequestMD: PaymentRequestModel;

        static $inject = ["$rootScope", "$scope", "$state", "$stateParams", "$filter", "PaymentMethodDetailModel", "MethodModel"];

        constructor($rootScope: any, $scope: any, $state: any, $stateParams: any, $filter: any, detailModel: IPaymentMethodDetailModel, methodModel: IMethodModel) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$filter = $filter;
            this.$stateParams = $stateParams;
            this.detailModel = detailModel;
            this.methodModel = methodModel;
            this.initPage();
            this.role = -1;
        }

        public initPage() {
            this.paymentRequestMD = new PaymentRequestModel();
            this.postpaidModal =
            [
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

            this.invitationModal =
            [
                new ModalDirective.ModalRow("Email", "Email", "", new ModalDirective.InputValidation('email', true)),
                new ModalDirective.ModalRow("Name", "Name", "", new ModalDirective.InputValidation('text', true)),
                new ModalDirective.ModalRow("Role", "Role", [{ text: '', value: null }, { text: 'Administrator', value: CompanyRole.Administrator }, { text: 'Normal', value: CompanyRole.Normal }], new ModalDirective.InputValidation('select', true))
            ];

            this.invitationModalStyle = new ModalDirective.ModalStyle('modal-md', 'col-md-2', 'col-md-10');

            this.invitationModel = {};

            this.getPostPaidBankCard(this.$stateParams.methodObj.Id);

            this.methodModel.getPostpaidMethod(this.$stateParams.methodObj.Id)
                .then((data) => {
                    this.accountInfo = new PostpaidAccountModel(data.Company);
                    this.companyMembers = data.Members;
                    this.invitationMembers = data.Invitations;
                    var me = this;
                    data.Members.forEach((data) => {
                        if (data.Me) {
                            this.role = data.Role.Role;
                            return;
                        }
                    });
                });

            this.getPostpaidInvoiceSetting();

            this.detailModel.getCompleteProcessTask(this.$stateParams.methodObj.Id);
        }

        public getPaymentMember() {
            this.methodModel.getPostpaidMethod(this.$stateParams.methodObj.Id)
                .then((data) => {
                    this.companyMembers = data.Members;
                    this.invitationMembers = data.Invitations;
                    var me = this;
                    data.Members.forEach((data) => {
                        if (data.Me) {
                            this.role = data.Role.Role;
                            return;
                        }
                    });
                });
        }

        public getCompleteProcessType(type) {
            var result = "";
            if (type === CompletionProcessType.PhotoId) {
                result = "Collect Photo of ID";
            }
            else if (type === CompletionProcessType.CourierSignatureForCOD) {
                //result = "Collect Cash on Delivery";
                result = "Courier signature for COD";
            }
            else if (type === CompletionProcessType.Signature) {
                result = "Collect Signature";
            }
            else if (type === CompletionProcessType.SignatureWithPhoto) {
                result = "Use PhotoSign Method";
            }
            else if (type === CompletionProcessType.DeliveryOrder) {
                result = "Collect Photo of DO";
            }
            return result;
        }

        public getApproveStatus(accountStatus: number) {
            var result = "We are processing your request";
            if (accountStatus === ApproveStatus.Rejected) {
                result = "Your request has been rejected. Please contact customer support";
            }
            else if (accountStatus === ApproveStatus.Approved) {
                result = "Approved";
            }

            return result;
        }

        public getApproveClass(status: number) {
            var statusClass = "label";
            if (status === ApproveStatus.Approved) {
                statusClass += " label-success";
            } else if (status === ApproveStatus.InProcess) {
                statusClass += " label-warning";
            } else if (status === ApproveStatus.Rejected) {
                statusClass += " label-danger";
            }
            return statusClass;
        }

        public inviteToPostpaidAccount() {
            this.detailModel.inviteToPostpaidAccount(this.accountInfo.Id, this.invitationModel.Name, this.invitationModel.Email, this.invitationModel.Role)
            .then((data) => {
                    if (data.Data) {
                        this.getPaymentMember();
                        toastr.success(data.Message, 'Success');
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                });
        } 

        public savePostpaidAccount() {
            this.methodModel.savePostPaidAccount(this.postpaidModel);
            this.accountInfo = this.postpaidModel;
        }

        public editingProcessTask() {
            this.completeTaskToEdit = angular.copy(this.detailModel.completeProcessTasks);
        }

        public editingPostpaidAccount() {
            this.postpaidModel = angular.copy(this.accountInfo);
        }

        public getDurationDate(fromDate: string) {
            var days = 0;

            if (fromDate) {
                var today = moment().startOf('day');
                days = today.diff(moment(fromDate).startOf('day'), "days");
            }
            if (days === 0) {
                return "Today";
            }
            else if (days === 1) {
                return "Yesterday";
            }
            return days + " days ago";
        }

        public getRole(roleType: CompanyRole) {
            if (roleType === CompanyRole.Administrator) {
                return "Administrator";
            }
            return "Normal";
        }

        public getPostPaidBankCard(methodId: string) {
            this.detailModel.getPostPaidBankCard(methodId);
        }

        public associateCard() {
            var _that = this;
            if (this.braintreeSetup != null) {
                this.braintreeSetup.teardown(() => {
                    this.braintreeSetup = null;
                    // braintree.setup can safely be run again!
                });
            }
            this.detailModel.getClientToken(this.$stateParams.gatewayId)
                .then((data) => {
                    braintree.setup(data.Data, "dropin", {
                        container: "form-add-direct-method",
                        onReady(integration) {
                            _that.braintreeSetup = integration;
                        },
                        onPaymentMethodReceived(braintreeResponse: any) {
                            _that.addPostPaidBankCard(_that.$stateParams.methodObj.Id, _that.$stateParams.gatewayId, braintreeResponse.nonce);
                            angular.element("#modal-add-direct-method").modal('hide');
                        }
                    });
                });
        }

        public removeCard() {
            var _this = this;
            this.detailModel.removeCard(this.$stateParams.methodObj.Id).then((data) => {
                if (data.Data) {
                    _this.detailModel.bankCard = null;
                    toastr.success(data.Message, 'Success');
                } else {
                    toastr.error(data.Message, "Error");
                }
                angular.element("#modal-delete-bankcard").modal('hide');
            });
        }

        public toggleCard(enable: boolean) {
            var _this = this;
            this.detailModel.toggleCard(this.$stateParams.methodObj.Id, enable).then((data) => {
                if (data.Data) {
                    _this.detailModel.bankCard.Enabled = enable;
                } else {
                    toastr.error(data.Message, "Error");
                }
            });
        }

        public addPostPaidBankCard(accountId: string, gatewayId: string, nonce: string) {
            this.detailModel.associateCard(accountId, gatewayId, nonce)
                .then((data) => {
                    if (data.Data) {
                        this.getPostPaidBankCard(accountId);
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                });
        }

        public getPostpaidInvoiceSetting() {
            this.detailModel.getPostpaidInvoiceSetting(this.$stateParams.methodObj.Id);
        }

        public editCompleteProcessTask() {
            var accountId = this.$stateParams.methodObj.Id;
            var arr = new Array<CompleteProccessTask>();

            angular.forEach(this.completeTaskToEdit, (task, index) => {
                arr.push(new CompleteProccessTask(task));
            });
            
            this.detailModel.editCompleteProcessTask(accountId, arr)
                .then((data) => {
                    this.detailModel.completeProcessTasks = this.completeTaskToEdit;
                });
            angular.element('#btnCloseConfirmOption').trigger('click');
        }

        public onDeleteMember(member: any) {
            this.deletingMember = member;
        }

        public deleteMember() {
            this.detailModel.removeMember(this.$stateParams.methodObj.Id, this.deletingMember.User.Id)
                .then((data) => {
                    if (data.Data) {
                        this.getPaymentMember();
                        toastr.success(data.Message, "Success");
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                    angular.element("#modal-delete-member").modal('hide');
                });
        }
        public resendInvitation(ivitationMember:any) {
            this.detailModel.resendInvitation(this.$stateParams.methodObj.Id, ivitationMember.Id)
                .then((data) => {
                    if (data.Data) {
                        toastr.success(data.Message, "Success");
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                });
        }
        public cancelInvitation(ivitationMember: any) {
            this.detailModel.cancelInvitation(ivitationMember.Id)
                .then((data) => {
                    if (data.Data) {
                        this.getPaymentMember();
                        toastr.success(data.Message, "Success");
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                });
        }

        public cancelInvoice() {
            var accountId = this.$stateParams.Id; 
            if (!accountId) {
                accountId = this.$stateParams.methodObj.Id;
            }
            this.detailModel.cancelInvoice(accountId).then((data) => {
                this.accountInfo.CompanyAcraRegNumber = "";
                this.accountInfo.Reason = "";
                this.accountInfo.NumberDeliveries = "";
                this.accountInfo.ApproveStatus = 0;
                if (data.Data) {
                    toastr.success(data.Message, "Success");
                } else {
                    toastr.error(data.Message, "Error");
                }
            });
            angular.element("#modal-cancel-invoice").modal('hide');
        }

        public setInvoicePayment() {
            var accountId = this.$stateParams.Id;
            if (!accountId) {
                accountId = this.$stateParams.methodObj.Id;
            }
            this.detailModel.setInvoicePayment(accountId, this.paymentRequestMD)
                .then((data) => {
                    if (data.Data) {
                        toastr.success(data.Message, "Success");
                        this.methodModel.getPostpaidMethod(this.$stateParams.methodObj.Id)
                            .then((data) => {
                                this.accountInfo = new PostpaidAccountModel(data.Company);
                            });
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                });
            angular.element("#modal-set-payment").modal('hide');
        }
    }
}
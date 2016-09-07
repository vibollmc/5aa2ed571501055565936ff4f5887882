module NewWizard {

    declare var angular: any;
     
    export class PaymentInfo {
        PaymentGateways: Array<PaymentGateway>;
        DirectMethods: Array<PaymentMethodInfo>;
        PostPayMethods: Array<PaymentMethodInfo>;
        constructor(data: any = null) {
            if (data != undefined && data != null) {
                this.PaymentGateways = PaymentGateway.fromJson(data.PaymentGateways);
                this.PostPayMethods = PaymentMethodInfo.fromJson(data.PostPayMethods);
                this.DirectMethods = PaymentMethodInfo.fromJson(data.DirectMethods);
            }
        }
    }

    export class PaymentGateway {
        Id: string;
        Name: string;
        OwnerNetworkId: string;
        GatewayType: number;
        Networks: any;
        Status: number;

        constructor(id: string = '', name: string = '', ownerNetworkId: string = '', gatewayType: number = 0, networks: any = null, status: number = 0) {
            this.Id = id;
            this.Name = name;
            this.OwnerNetworkId = ownerNetworkId;
            this.GatewayType = gatewayType;
            this.Networks = networks;
            this.Status = status;
        }

        static fromJson(jsonData: any): any {
            var result = new Array<PaymentGateway>();
            if (jsonData !== undefined && jsonData != null) {
                for (var i = 0; i < jsonData.length; i++) {
                    var gateway = new PaymentGateway(jsonData[i].Id, jsonData[i].Name, jsonData[i].OwnerNetworkId, jsonData[i].GatewayType, jsonData[i].Networks, jsonData[i].Status);
                    result.push(gateway);
                }
            }
            return result;
        }
    }

    export class PaymentMethodInfo {
        Id: string;
        Name: string;
        ImageUrl: string;
        PaymentMethodType: number;
        Balance: any;
        Status: number;
        AllowDelete: boolean;
        InvoiceStatus: boolean; 
        CompletionProcess: Array<CompletionProcessTask>;

        constructor(id: string = '', name: string = '', imageUrl: string = '', paymentMethodType: number = 0, balance: any = null, status: number = 0, allowDelete: boolean = false, invoiceStatus: boolean = false, completionProcess: Array<CompletionProcessTask> = null) {
            this.Id = id;
            this.Name = name;
            this.ImageUrl = imageUrl;
            this.PaymentMethodType = paymentMethodType;
            this.Balance = balance;
            this.Status = status;
            this.AllowDelete = allowDelete;
            this.InvoiceStatus = invoiceStatus;
            this.CompletionProcess = completionProcess;
        }

        MapCompletionProcess(dataRaw: Array<KeyValue<any>>) {
            if (dataRaw[this.Id] != undefined && dataRaw[this.Id] != null && dataRaw[this.Id].length > 0) { 
                this.CompletionProcess = CompletionProcessTask.fromJson(dataRaw[this.Id]); 
            }
        }

        static fromJson(jsonData: any): any {
            var result = new Array<PaymentMethodInfo>();
            if (jsonData !== undefined && jsonData != null) {
                for (var i = 0; i < jsonData.length; i++) {
                    var paymentMethod = new PaymentMethodInfo(jsonData[i].Id, jsonData[i].Name, jsonData[i].ImageUrl, jsonData[i].PaymentMethodType, jsonData[i].Balance, jsonData[i].Status, jsonData[i].AllowDelete, jsonData[i].InvoiceStatus);
                    result.push(paymentMethod);
                }
            }
            return result;
        }
    }

    export class WzPaymentModel {

        gatewayId: string;

        wizardService: IWizardService;

        paymentInfo: PaymentInfo;

        paymentGateways: Array<PaymentGateway>;

        directMethods: Array<PaymentMethodInfo>;

        postpayMethods: Array<PaymentMethodInfo>;

        static $inject = ["WizardService"];

        constructor(wizardService: IWizardService) {
            this.wizardService = wizardService;
            this.paymentInfo = new PaymentInfo();
            this.paymentGateways = new Array<PaymentGateway>();
            this.directMethods = new Array<PaymentMethodInfo>();
            this.postpayMethods = new Array<PaymentMethodInfo>();
        }

        public loadPaymentInfo(contextId: string): void {

            var handleResponseFunc = (response: ResponseModel) => {
                if (response.Code === ResponseType.Success) {
                    this.paymentInfo = new PaymentInfo(response.Data);
                    this.directMethods = this.paymentInfo.DirectMethods;
                    this.postpayMethods = this.paymentInfo.PostPayMethods;
                    this.paymentGateways = this.paymentInfo.PaymentGateways;
                    var dataRawComletionProcess = response.Data.CompletionProcessIndex;
                    this.directMethods.forEach(x => x.MapCompletionProcess(dataRawComletionProcess));
                    this.postpayMethods.forEach(x => x.MapCompletionProcess(dataRawComletionProcess));
                } else {
                    MessageBox.Message(response.Code, response.Message);  
                }
            };

            this.wizardService.getPaymentInfo(contextId, handleResponseFunc);
        }

        public getClientToken(gatewayId: string, handleResponseFunc: (response: ResponseModel) => void): void {
            return this.wizardService.getClientToken(gatewayId, handleResponseFunc);
        }

        public addPaymentMethod(contextId: string, gatewayId: string, payment_method_nonce: string): void {
            var handleResponseFunc = (response: ResponseModel) => {
                if (response.Code == ResponseType.Success) {
                    this.loadPaymentInfo(contextId);
                } else { 
                    MessageBox.Message(response.Code, response.Message);  
                }
            };

            this.wizardService.addPaymentMethod(gatewayId, payment_method_nonce, handleResponseFunc);
        }

        public confirmPayment(wzModel: IWizardModel, callback: any): void {
            var data: any = {
                contextId: wzModel.contextId,
                comments: wzModel.message,
                paymentMethodId: wzModel.selectedPaymentMethod,
                paymentMethodTypeId: wzModel.selectedPaymentMethodType,
                isCODCollection: wzModel.SelectedServiceInfo.IsCoDCollection,
                codAmount: wzModel.SelectedServiceInfo.CoDAmount,
                customProperties: wzModel.CustomProperties,
                completionProcessList: wzModel.CompletionProcessList
            };

            var handleResponseFunc = (response: ResponseModel) => {
                callback(response);
            };

            this.wizardService.confirmPayment(data, handleResponseFunc);
        }
    }
}
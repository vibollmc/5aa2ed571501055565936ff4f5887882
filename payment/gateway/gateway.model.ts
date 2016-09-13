module Gateway {
    'use strict';

    declare var toastr: any;

    export enum GatewayEnvironment {
        DEVELOPMENT,
        PRODUCTION,
        QA,
        SANDBOX
    }

    export enum PaymentGatewayType {
        BRAINTREE
    }

    export enum NetworkGatewayRefType {
        OWNER = 1,
        REFERENCE = 2
    }

    export class NetworkReference {
        NetworkId: string;
        NetworkPrivateKey: string;
        NetworkName: string;
        ReferenceType: NetworkGatewayRefType;
        ReferenceTypeString: string;
        Type: PaymentGatewayType;
        Currency: string;

        MerchantAccountId: string;

        constructor(networkId: string, privateKey: string, networkName: string, referenceType: NetworkGatewayRefType, type: PaymentGatewayType, currency: string, merchantAccountId: string) {
            this.NetworkId = networkId;
            this.NetworkPrivateKey = privateKey;
            this.NetworkName = networkName;
            this.ReferenceType = referenceType;
            this.ReferenceTypeString = NetworkGatewayRefType[referenceType];
            this.Type = type;
            this.Currency = currency;
            this.MerchantAccountId = merchantAccountId;
        }
    }

    export class BraintreeGatewayData {
        Id: string;
        PublicKey: string;
        PrivateKey: string;
        MerchantId: string;
        Environment: GatewayEnvironment;
        EnvironmentString: string;

        Name: string;
        OwnerNetworkId: string;
        NetworkRefs: NetworkReference[];
        Type: PaymentGatewayType;
        TypeString: string;

        static transformToGateway(gateways: any) {
            var gatewayDatas = new Array<BraintreeGatewayData>();
            for (var i in gateways) {
                var gateway = gateways[i];
                var gatewayData = this.transformGateway(gateway);

                gatewayDatas.push(gatewayData);
            }
            return gatewayDatas;
        }

        static transformGateway(gateway: any) {
            var gatewayData = new BraintreeGatewayData();
            gatewayData.Id = gateway.Id;
            gatewayData.PublicKey = gateway.PublicKey;
            gatewayData.PrivateKey = gateway.PrivateKey;
            gatewayData.MerchantId = gateway.MerchantId;
            gatewayData.Environment = gateway.Environment;
            gatewayData.EnvironmentString = GatewayEnvironment[gateway.Environment];
            gatewayData.Name = gateway.Name;
            gatewayData.OwnerNetworkId = gateway.OwnerNetworkId;
            if (gateway.Networks != null && gateway.Networks.length > 0) {
                gatewayData.NetworkRefs = new Array<NetworkReference>();
                for (var i in gateway.Networks) {
                    var networkRef = new NetworkReference(gateway.Networks[i].NetworkId, gateway.Networks[i].NetworkPrivateKey,
                                                            gateway.Networks[i].NetworkName, gateway.Networks[i].ReferenceType,
                                                            gateway.Networks[i].Type, gateway.Networks[i].Currency, gateway.Networks[i].MerchantAccountId);
                    gatewayData.NetworkRefs.push(networkRef);
                }
            }
            gatewayData.Type = gateway.GatewayType;
            gatewayData.TypeString = PaymentGatewayType[gatewayData.Type];

            return gatewayData;
        }
    }

    export interface IGatewayModel {
        defaultGatewayId: string;
        networkPrivatekey: string;
        ownerGateways: Array<BraintreeGatewayData>;

        selectedGatewayId: string;
        selectedGateway: BraintreeGatewayData;

        getOwnerGateways(): void;
        getNetworkDefaultGateway(): void;
        setDefaultGateway(gatewayId: string): any;
        isOwner(ownerNetworkId: string): boolean;
    }

    export class GatewayModel implements IGatewayModel {
        defaultGatewayId: string;
        networkPrivatekey: string;
        networkId: string;
        ownerGateways: Array<BraintreeGatewayData>;

        selectedGatewayId: string;
        selectedGateway: BraintreeGatewayData;

        $q: any;
        service: IGatewayService;

        static $inject = ["$q", "GatewayService"];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
            this.getNetworkDefaultGateway();
        }

        public getOwnerGateways() {
            this.service.getOwnerGateways()
                .success((data) => {
                    this.ownerGateways = BraintreeGatewayData.transformToGateway(data.Data);
                });
        }

        public getNetworkDefaultGateway() {
            this.service.getNetworkDefaultGateway()
                .success((data) => {
                    this.defaultGatewayId = data.defaultGatewayId;
                    this.networkPrivatekey = data.networkPrivateKey;
                    this.networkId = data.networkId;
                });
        }
        
        public setDefaultGateway(gatewayId: string) {
            this.service.setDefaultGateway(gatewayId)
                .success((data) => {
                    this.getNetworkDefaultGateway();
                });
        }

        public isOwner(ownerNetworkId: string) {
            return this.networkId === ownerNetworkId;
        }
    }
}
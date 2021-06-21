declare namespace google {
    /**
     * Methods available to Google Apps Script
     */
    namespace script {
        interface PublicEndpoints {
            interfaceParamsFunc(params: IParams): void;
        }


        interface IParams {
            attr1: string;
            attr2: number;
            attr3: {
                value: boolean;
            };
        }



    }
}

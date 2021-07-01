declare namespace google {
    /**
     * Methods available to Google Apps Script
     */
    namespace script {
        interface PublicEndpoints {
            interfaceReturnFunc(): IReturn;
        }


        interface IReturn {
            attr1: string;
            attr2: number;
            attr3: {
                value: boolean;
            };
        }



    }
}

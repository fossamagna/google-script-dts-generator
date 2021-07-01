declare namespace google {
    /**
     * Methods available to Google Apps Script
     */
    namespace script {
        interface PublicEndpoints {
            classReturnFunc(): Return;
        }


        interface Return {
            attr1: string;
            attr2: number;
            attr3: {
                value: boolean;
            };
        }



    }
}

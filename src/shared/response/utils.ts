export class Utils {
    public hiddenProperties(entitie: object): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = entitie as any;
        const isArray = Array.isArray(data);

        if (isArray) {
            data.forEach((v) => {
                delete v._doc.__v;
                delete v._doc.updateAt;
                delete v._doc.createAt;
                delete v._doc.password;
                delete v._doc.tokenforgetpassword;
            });

            return;
        }

        delete data._doc.__v;
        delete data._doc.updateAt;
        delete data._doc.createAt;
        delete data._doc.password;
        delete data._doc.tokenforgetpassword;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public sortObj(arr: any[], property: string): any[] {
        const data = arr.sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        });

        return data;
    }
}

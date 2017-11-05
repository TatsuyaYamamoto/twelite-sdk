const Twelite = require('../Twelite');

describe('Twelite', () => {
    describe('#serialPorts', () => {
        it('should return a port data that has manufacture as MONOWIRELESS.', () => {
            return Twelite.serialPorts()
                .then(ports => {
                    expect(ports).toHaveLength(1);
                    ports.forEach(port => {
                        expect(port).toHaveProperty('comName');
                        expect(port).toHaveProperty('locationId');
                        expect(port).toHaveProperty('manufacturer');
                        expect(port).toHaveProperty('pnpId');
                        expect(port).toHaveProperty('productId');
                        expect(port).toHaveProperty('serialNumber');
                        expect(port).toHaveProperty('vendorId');
                    });
                });
        });

        it('should return 3 length ports array that has any manufacture.', () => {
            return Twelite.serialPorts(true)
                .then(ports => {
                    expect(ports).toHaveLength(3);
                    ports.forEach(port => {
                        expect(port).toHaveProperty('comName');
                        expect(port).toHaveProperty('locationId');
                        expect(port).toHaveProperty('manufacturer');
                        expect(port).toHaveProperty('pnpId');
                        expect(port).toHaveProperty('productId');
                        expect(port).toHaveProperty('serialNumber');
                        expect(port).toHaveProperty('vendorId');
                    });
                });
        });
    });

    describe('#open', () => {
        it('can open and change isOpen true.', () => {
            let twelite = null;
            return Twelite.serialPorts()
                .then(([port]) => {
                    twelite = new Twelite(port.comName);
                    expect(twelite.isOpen).toBeFalsy();
                })
                .then(() => twelite.open())
                .then(() => expect(twelite.isOpen).toBeTruthy());
        });
        it('should throw error while opening.', () => {
            let twelite = null;
            return Twelite.serialPorts()
                .then(([port]) => {
                    twelite = new Twelite(port.comName);
                    expect(twelite.isOpen).toBeFalsy();
                })
                .then(() => twelite.open())
                .then(() => twelite.open())
                .then(() => fail('Thrown no error.'))
                .catch((error) => expect(error).not.toBeNull());
        });
    });

    describe('#close', () => {
        it('can close.', () => {
            let twelite = null;
            return Twelite.serialPorts()
                .then(([port]) => {
                    twelite = new Twelite(port.comName);
                    expect(twelite.isOpen).toBeFalsy();
                })
                .then(() => twelite.open())
                .then(() => expect(twelite.isOpen).toBeTruthy())
                .then(() => twelite.close())
                .then(() => expect(twelite.isOpen).toBeFalsy())
        });

        it('should throw error not while opening.', () => {
            let twelite = null;
            return Twelite.serialPorts()
                .then(([port]) => {
                    twelite = new Twelite(port.comName);
                    expect(twelite.isOpen).toBeFalsy();
                })
                .then(() => twelite.close())
                .then(() => fail())
                .catch((error) => expect(error).not.toBeNull());
        });
    });

    // TODO: write testing.
    describe('#write', () => {
        it('should return promise', () => {
            expect(Twelite.serialPorts()).toBeInstanceOf(Promise);
        })
    });
});

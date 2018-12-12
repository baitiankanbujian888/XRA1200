/**
 * makecode XRA1200 digital pressure sensor Package.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */


/**
 * XRA1200 block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="XRA1200"
namespace XRA1200 {
    let XRA1200_I2C_ADDR = 0x40
    let GPIOStatus = 0,
        let OutputControl = 1,
        let InputPolarityInversion = 2,
        let GPIOConfiguration = 3,
        let InputInternalPullupRegister = 4,
        let InputInterruptEnable = 5,
        let OutputThreeStateControl = 6,
        let InputInterruptStatus = 7,
        let InputRisingEdgeInterruptEnable = 8,
        let InputFallingEdgeInterruptEnable = 9,
        let InputFilterEnable = 10,

    //% blockId="XRA1200_SetDirection" block="设置方向"
    //% weight=60 blockGap=8
    export function SetOutput(void): void {
        let buf = pins.createBuffer(2);
        buf[0] = GPIOConfiguration;
        buf[1] = 0xff;
        pins.i2cWriteBuffer(XRA1200_I2C_ADDR, buf);

        buf[0] = InputRisingEdgeInterruptEnable;
        pins.i2cWriteBuffer(XRA1200_I2C_ADDR, buf);

        buf[0] = InputFallingEdgeInterruptEnable;
        pins.i2cWriteBuffer(XRA1200_I2C_ADDR, buf);

        buf[0] = InputInterruptEnable;
        pins.i2cWriteBuffer(XRA1200_I2C_ADDR, buf);


    }

    //% blockId="XRA1200_GetDirection" block="获取方向"
    //% weight=60 blockGap=8
    export function GetDirection(void): number {
        pins.i2cWriteNumber(XRA1200_I2C_ADDR, InputInternalPullupRegister, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(XRA1200_I2C_ADDR, NumberFormat.UInt8BE);
    }

    //% blockId="XRA1200_SetPullup" block="设置上拉 %d"
    //% weight=60 blockGap=8
    export function SetPullup(bitMasks: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = InputInternalPullupRegister;
        buf[1] = bitMasks;
        pins.i2cWriteNumber(XRA1200_I2C_ADDR, buf);

    }

    //% blockId="XRA1200_GetPullup" block="获取上拉"
    //% weight=60 blockGap=8
    export function GetPullup(void): number {
        pins.i2cWriteNumber(XRA1200_I2C_ADDR, InputInternalPullupRegister, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(XRA1200_I2C_ADDR, NumberFormat.Int8LE);
    }

    //% blockId="XRA1200_SetData" block="写入数据 %d"
    //% weight=60 blockGap=8
    export function SetData(data: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = GPIOStatus;
        buf[1] = data;
        pins.i2cWriteNumber(XRA1200_I2C_ADDR, buf);

    }

    //% blockId="XRA1200_GetData" block="读取数据"
    //% weight=60 blockGap=8
    export function GetData(void): number {
        pins.i2cWriteNumber(XRA1200_I2C_ADDR, GPIOStatus, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(XRA1200_I2C_ADDR, NumberFormat.Int8LE);

    }


}

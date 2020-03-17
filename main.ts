//% weight=20 color=#006000 icon="\uf0a4" block="sensor4"

namespace sensor4 {
    export enum linechoose {
        //% block=R1
        R1 = 0x19,
        //% block=R2
        R2 = 0x16,
        //% block=L1
        L1 = 0x14,
        //% block=L2
        L2 = 0x13
    }

    export enum linechooseAD {
        //% block=R1
        R1 = 0x07,
        //% block=R2
        R2 = 0x09,
        //% block=L1
        L1 = 0x05,
        //% block=L2
        L2 = 0x03
    }

    export enum linechoosedb {
        //% block=R1
        R1 = 0x0f,
        //% block=R2
        R2 = 0x11,
        //% block=L1
        L1 = 0x0d,
        //% block=L2
        L2 = 0x0b
    }

    const N76E003AT20_ADDRESS = 0x52;

    function i2cWrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cCmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cRead(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    //% blockId="HaodaBit_calibrateeeee" block="四路巡线传感器自动校准"
    //% weight=90
    //% blockGap=8
    export function calibrateeeee(): void {

        i2cWrite(N76E003AT20_ADDRESS, 0x15, 0x01);
    }

    //% blockId="HaodaBit_set_height" block="设置四路巡线传感器在|%pn|阈值|%heights"
    //% weight=90
    //% blockGap=8
    export function Lineheight(pn: linechoosedb, heights: number): void {

        i2cWrite(N76E003AT20_ADDRESS, pn, heights);
    }

    //% blockId="HaodaBit_read_linead" block="读巡线传感器|%li"
    //% weight=90
    //% blockGap=8
    export function readlinead(li: linechooseAD): number {
        let values = i2cRead(N76E003AT20_ADDRESS, li);
        return values;

    }

    //% blockId="HaodaBit_read_line" block="巡线传感器|%li|是否遇到黑线"
    //% weight=90
    //% blockGap=8
    export function readline(li: linechoose): number {
        let values = i2cRead(N76E003AT20_ADDRESS, li);
        return values;

    }

}
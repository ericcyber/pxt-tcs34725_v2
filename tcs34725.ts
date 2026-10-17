/**
 * TCS34725 RGB Color Sensor extension for micro:bit
 */
//% color="#00AA00" weight=90 icon="\uf1fb"
namespace TCS34725 {

    const TCS34725_ADDR = 0x29
    const TCS34725_COMMAND_BIT = 0x80

    const REG_ENABLE  = 0x00
    const REG_ATIME   = 0x01
    const REG_CONTROL = 0x0F
    const REG_CDATAL  = 0x14

    let initialized = false

    function writeRegister(reg: number, value: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg | TCS34725_COMMAND_BIT
        buf[1] = value
        pins.i2cWriteBuffer(TCS34725_ADDR, buf)
    }

    function readChannel(offset: number): number {
        // Point to the register pair
        let cmd = pins.createBuffer(1)
        cmd[0] = (REG_CDATAL + offset) | TCS34725_COMMAND_BIT
        pins.i2cWriteBuffer(TCS34725_ADDR, cmd)

        let buf = pins.i2cReadBuffer(TCS34725_ADDR, 2)
        return buf[0] | (buf[1] << 8)
    }

    /**
     * Initialize the TCS34725 sensor. Place this in "on start".
     */
    //% blockId=tcs34725_init
    //% block="initialize TCS34725"
    //% weight=100
    export function init(): void {
        writeRegister(REG_ENABLE, 0x03)   // Power ON + ADC enable
        writeRegister(REG_ATIME, 0xC0)    // ~154 ms integration
        writeRegister(REG_CONTROL, 0x02)  // 16x gain
        basic.pause(200)                  // let first integration finish
        initialized = true
    }

    /**
     * Read the red channel value.
     */
    //% blockId=tcs34725_read_red
    //% block="read red"
    //% weight=80
    export function readRed(): number {
        return readChannel(2)
    }

    /**
     * Read the green channel value.
     */
    //% blockId=tcs34725_read_green
    //% block="read green"
    //% weight=79
    export function readGreen(): number {
        return readChannel(4)
    }

    /**
     * Read the blue channel value.
     */
    //% blockId=tcs34725_read_blue
    //% block="read blue"
    //% weight=78
    export function readBlue(): number {
        return readChannel(6)
    }

    /**
     * Read the clear (unfiltered) channel value.
     */
    //% blockId=tcs34725_read_clear
    //% block="read clear"
    //% weight=77
    export function readClear(): number {
        return readChannel(0)
    }
}
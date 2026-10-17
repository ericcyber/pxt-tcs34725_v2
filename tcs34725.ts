/**
 * TCS34725 RGB Color Sensor extension for micro:bit
 */
//% color="#00AA00" weight=90 icon="\uf1fb"
namespace TCS34725 {

    const TCS34725_ADDR = 0x29

    // Helper function to write to a register
    function _write(reg: number, value: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg | 0x80
        buf[1] = value
        pins.i2cWriteBuffer(TCS34725_ADDR, buf)
    }

    // Helper function to read from a register
    function _read(reg: number, length: number): Buffer {
        let cmd = pins.createBuffer(1)
        cmd[0] = reg | 0x80
        pins.i2cWriteBuffer(TCS34725_ADDR, cmd)
        return pins.i2cReadBuffer(TCS34725_ADDR, length)
    }

    /**
     * Initialize the TCS34725 sensor
     */
    //% blockId=tcs34725_init
    //% block="initialize TCS34725"
    //% weight=100
    export function init_sensor(): void {
        _write(0x00, 0x03) // Enable
        _write(0x01, 0xC0) // Integration Time
        _write(0x0F, 0x02) // Gain
    }

    // Internal function to read the 8 bytes and parse the specific channel
    function get_channel(channel_index: number): number {
        // Read all 8 bytes starting at 0x14 (CDATAL)
        let data = _read(0x14, 8)
        
        // channel_index: 0=Clear, 1=Red, 2=Green, 3=Blue
        // Each value is 2 bytes (Low byte, then High byte)
        let lowByte = data[channel_index * 2]
        let highByte = data[channel_index * 2 + 1]
        
        return lowByte | (highByte << 8)
    }

    /**
     * Read the Red value
     */
    //% blockId=tcs34725_read_red
    //% block="read red"
    //% weight=80
    export function readRed(): number {
        return get_channel(1)
    }

    /**
     * Read the Green value
     */
    //% blockId=tcs34725_read_green
    //% block="read green"
    //% weight=79
    export function readGreen(): number {
        return get_channel(2)
    }

    /**
     * Read the Blue value
     */
    //% blockId=tcs34725_read_blue
    //% block="read blue"
    //% weight=78
    export function readBlue(): number {
        return get_channel(3)
    }

    /**
     * Read the Clear value
     */
    //% blockId=tcs34725_read_clear
    //% block="read clear"
    //% weight=77
    export function readClear(): number {
        return get_channel(0)
    }
}
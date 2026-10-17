# pxt-tcs34725

A MakeCode extension for the **TCS34725 RGB Color Sensor** on the BBC micro:bit.

This extension lets you read the Red, Green, Blue, and Clear (RGBC) values from the TCS34725 color sensor over I2C, using simple drag-and-drop blocks.

## 📦 How to Use

1. Open [MakeCode for micro:bit](https://makecode.microbit.org).
2. Click **New Project**.
3. Click the **gear icon (⚙️)** → **Extensions**.
4. Paste the following URL into the search box:
https://github.com/your-username/pxt-tcs34725

text

5. Click the extension card to add it to your project.
6. You will now see a **TCS34725** category in the block palette.

## 🔌 Hardware Connection

Connect the TCS34725 to the micro:bit via I2C. The default I2C address is `0x29`.

| TCS34725 Pin | micro:bit Pin |
|--------------|---------------|
| VCC          | 3V            |
| GND          | GND           |
| SDA          | P20 (SDA)     |
| SCL          | P19 (SCL)     |

> ⚠️ The TCS34725 uses 3.3V logic. Most breakout boards include voltage regulation and level shifting, but check your module's datasheet before connecting.

## 🧩 Blocks

### Read RGB

Reads the Red, Green, Blue, and Clear channel values from the sensor.

```blocks
let color = readRGB()
basic.showNumber(color.r)
Returns an object with four fields:

Field	Description	Range
r	Red channel value	0 – 65535
g	Green channel value	0 – 65535
b	Blue channel value	0 – 65535
c	Clear (unfiltered) channel	0 – 65535
💡 Example
This example reads the sensor every 200 ms and displays the Red value as a bar graph on the LED matrix.

blocks
basic.forever(function () {
    let color = readRGB()
    led.plotBarGraph(color.r, 255)
    basic.pause(200)
})
⚙️ Sensor Configuration
The current version uses these fixed settings (written on every read):

Setting	Register	Value	Meaning
Enable	0x00	0x03	Power ON + ADC enabled
Integration Time	0x01	0xC0	~154 ms integration time
Gain	0x0F	0x02
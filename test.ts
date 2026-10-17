// test.ts
basic.forever(function () {
    let color = readRGB()
    // Print the Red value to the LED matrix as a bar graph
    led.plotBarGraph(color.r, 255)
    basic.pause(100)
})
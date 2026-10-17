TCS34725.init_sensor()
basic.forever(function () {
    let red = TCS34725.readRed()
    led.plotBarGraph(red, 255)
    basic.pause(200)
})